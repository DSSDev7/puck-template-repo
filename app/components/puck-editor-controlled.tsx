import { useState, useEffect } from "react";
import { Puck, type Data } from "@measured/puck";
import { config } from "../../puck.config";

interface PuckEditorControlledProps {
  initialData: Data;
  pagePath: string;
  onDataChange?: (data: Data) => void;
}

// Default props for each component type
const DEFAULT_PROPS: Record<string, any> = {
  HeadingBlock: { title: "New Heading", level: "h2" },
  TextBlock: { content: "Your text goes here", fontSize: "base" },
  ButtonBlock: { text: "Click me", variant: "default", size: "default" },
  BadgeBlock: { text: "Badge", variant: "default" },
  CardBlock: {
    title: "Card Title",
    description: "Card description",
    content: "Card content",
    footerText: "Card footer",
  },
  AlertBlock: { title: "Alert Title", description: "Alert description", variant: "default" },
  InputBlock: { label: "Input Label", placeholder: "Enter text...", type: "text" },
  TextareaBlock: { label: "Textarea Label", placeholder: "Enter text...", rows: 4 },
  CheckboxBlock: { label: "Accept terms", defaultChecked: false },
  SwitchBlock: { label: "Enable notifications", defaultChecked: false },
  ContainerBlock: { padding: "md", maxWidth: "lg" },
  SeparatorBlock: { orientation: "horizontal" },
  SkeletonBlock: { skeletonWidth: "100%", skeletonHeight: "20px" },
  ProgressBlock: { value: 50, label: "Progress" },
  SpinnerBlock: { size: "md" },
  AvatarBlock: { src: "https://github.com/shadcn.png", alt: "Avatar", fallback: "CN" },
  ImageBlock: { src: "https://via.placeholder.com/600x400", alt: "Placeholder", objectFit: "cover" },
  AccordionBlock: {
    items: [
      { title: "Item 1", content: "Content for item 1" },
      { title: "Item 2", content: "Content for item 2" },
    ],
  },
  TabsBlock: {
    tabs: [
      { label: "Tab 1", content: "Content for tab 1" },
      { label: "Tab 2", content: "Content for tab 2" },
    ],
  },
  ColumnsBlock: { columns: 2, gap: "md", distribution: "equal", padding: "md" },
};

export function PuckEditorControlled({
  initialData,
  pagePath,
  onDataChange,
}: PuckEditorControlledProps) {
  const [data, setData] = useState<Data>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Handle messages from parent window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "ADD_PUCK_COMPONENT") {
        const { componentType, componentLabel } = event.data;

        console.log(`[Puck] Received ADD_PUCK_COMPONENT: ${componentType}`);

        // Get default props for this component type
        const defaultProps = DEFAULT_PROPS[componentType] || {};

        // Create new component with unique ID
        const newComponent = {
          type: componentType,
          props: {
            ...defaultProps,
            id: `${componentType}-${Date.now()}`,
          },
        };

        // Add component to data
        setData((currentData) => {
          const newData = {
            ...currentData,
            content: [...currentData.content, newComponent],
          };

          // Notify parent
          window.parent.postMessage(
            {
              type: "PUCK_COMPONENT_ADDED",
              componentType,
              componentLabel,
              pagePath,
            },
            "*"
          );

          return newData;
        });
      }
    };

    window.addEventListener("message", handleMessage);

    // Notify parent that Puck is ready
    window.parent.postMessage(
      {
        type: "PUCK_READY",
        config: {
          categories: Object.keys(config.categories || {}),
          components: Object.keys(config.components || {}),
        },
      },
      "*"
    );

    return () => window.removeEventListener("message", handleMessage);
  }, [pagePath]);

  // Notify parent when data changes
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
      "*"
    );
  }, [data, onDataChange, pagePath]);

  return (
    <>
      {/* Hide Puck's built-in component sidebar */}
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
        config={config}
        data={data}
        onPublish={async (newData) => {
          setData(newData);
          alert("Page saved!");
        }}
        onChange={(newData) => {
          // Update data when user edits in canvas
          setData(newData);
        }}
      />
    </>
  );
}
