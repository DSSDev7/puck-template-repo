import React, { useState, useEffect, useRef, useCallback } from "react";
import { Puck, type Data, type Config } from "@measured/puck";
import { config as baseConfig } from "../../puck.config";
import { getDefaultComponentPropsWithId } from "../lib/defaultComponentProps";
import {
  categories as libraryCategories,
  components as libraryComponents,
  registry as componentRegistry,
  type ComponentId,
} from "@digitalsupsystems/puck-components";

interface PuckEditorControlledProps {
  initialData: Data;
  pagePath: string;
  onDataChange?: (data: Data) => void;
}

const readyCategories = libraryCategories.map((category) => ({
  id: category.id,
  title: category.title,
  components: [...category.components],
}));

const readyComponents = Object.entries(libraryComponents).reduce<
  Record<string, { id: string; label: string; description?: string; previewImage?: string; moduleId?: string }>
>((acc, [id, meta]) => {
  acc[id] = {
    id,
    label: meta?.label ?? id,
    description: meta?.description,
    previewImage: meta?.previewImage,
    moduleId: meta?.moduleId,
  };
  return acc;
}, {});

const componentCategoryLookup = readyCategories.reduce<Record<string, string>>((acc, category) => {
  category.components.forEach((componentId) => {
    acc[componentId] = category.id;
  });
  return acc;
}, {});

export function PuckEditorControlled({ initialData, pagePath, onDataChange }: PuckEditorControlledProps) {
  const [data, setData] = useState<Data>(initialData);
  const [puckConfig, setPuckConfig] = useState<Config<any>>(baseConfig as Config<any>);
  const configRef = useRef<Config<any>>(baseConfig as Config<any>);

  const ensureComponentLoaded = useCallback(
    async (componentId: string): Promise<boolean> => {
      if (configRef.current.components?.[componentId]) {
        return true;
      }

      const loader = componentRegistry[componentId as ComponentId];

      if (!loader) {
        console.warn(`[Puck] No loader registered for component ${componentId}`);
        return false;
      }

      try {
        const mod = await loader();
        const Component = mod?.default;

        if (!Component) {
          console.warn(`[Puck] Component ${componentId} did not provide a default export`);
          return false;
        }

        const meta = libraryComponents[componentId as ComponentId];
        const existingComponents = (configRef.current.components ?? {}) as Record<string, any>;

        const nextComponents: Record<string, any> = {
          ...existingComponents,
          [componentId]: {
            ...(existingComponents[componentId] ?? {}),
            label: meta?.label ?? componentId,
            description: meta?.description,
            fields: {},
            render: (props: Record<string, unknown>) => <Component {...props} />,
          },
        };

        const nextCategories = { ...(configRef.current.categories ?? {}) } as Record<
          string,
          { title: string; components: string[] }
        >;
        const categoryId = componentCategoryLookup[componentId];

        if (categoryId) {
          const baseCategory = libraryCategories.find((category) => category.id === categoryId);
          const currentCategory = nextCategories[categoryId] ?? {
            title: baseCategory?.title ?? categoryId,
            components: [...(baseCategory?.components ?? [])],
          };

          if (!currentCategory.components.includes(componentId)) {
            currentCategory.components = [...currentCategory.components, componentId];
          }

          nextCategories[categoryId] = currentCategory;
        }

        const nextConfig: Config<any> = {
          ...configRef.current,
          components: nextComponents,
          categories: nextCategories,
        };

        configRef.current = nextConfig;
        setPuckConfig(nextConfig);
        return true;
      } catch (error) {
        console.error(`[Puck] Failed to dynamically load component ${componentId}`, error);
        return false;
      }
    },
    [],
  );

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "ADD_PUCK_COMPONENT") {
        const { componentType, componentLabel, defaultProps } = event.data;

        void (async () => {
          const loaded = await ensureComponentLoaded(componentType);

          if (!loaded) {
            console.warn(`[Puck] Skipping add; component ${componentType} failed to load.`);
            return;
          }

          const fallbackProps = getDefaultComponentPropsWithId(componentType);
          const resolvedProps =
            defaultProps && typeof defaultProps === "object"
              ? { ...defaultProps }
              : { ...fallbackProps };

          if (typeof resolvedProps.id !== "string" || resolvedProps.id.length === 0) {
            resolvedProps.id = fallbackProps.id;
          }

          const newComponent = {
            type: componentType,
            props: resolvedProps,
          };

          setData((currentData) => {
            const newData = {
              ...currentData,
              content: [...currentData.content, newComponent],
            };

            window.parent.postMessage(
              {
                type: "PUCK_COMPONENT_ADDED",
                componentType,
                componentLabel,
                pagePath,
              },
              "*",
            );

            return newData;
          });
        })();
      }
    };

    window.addEventListener("message", handleMessage);

    window.parent.postMessage(
      {
        type: "PUCK_READY",
        config: {
          categories: readyCategories,
          components: readyComponents,
        },
      },
      "*",
    );

    return () => window.removeEventListener("message", handleMessage);
  }, [ensureComponentLoaded, pagePath]);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(data);
    }

    window.parent.postMessage(
      {
        type: "PUCK_DATA_CHANGED",
        data,
        pagePath,
      },
      "*",
    );
  }, [data, onDataChange, pagePath]);

  return (
    <>
      <style>{`
        .Puck-leftSidebar {
          display: none !important;
        }
        .Puck-frame {
          margin-left: 0 !important;
        }
        .Puck {
          --puck-frame-left: 0px !important;
        }
      `}</style>

      <Puck
        config={puckConfig}
        ui={{
          leftSideBarVisible: false,
          //@ts-ignore
          viewports: {
            controlsVisible: false,
          },
        }}
        data={data}
        onPublish={async (newData) => {
          setData(newData);
          window.parent.postMessage(
            {
              type: "PUCK_PUBLISH",
              data: newData,
              pagePath,
            },
            "*",
          );
          alert("Page saved!");
        }}
        renderHeader={() => <></>}
        onChange={(newData) => {
          setData(newData);
        }}
      />
    </>
  );
}
