import { useState, useEffect, useCallback, Component, type ReactNode } from "react";
import { useParams } from "react-router";
import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";
import { PuckEditorControlled } from "~/components/puck-editor-controlled";

import { config } from "../../puck.config";
import editorStyles from "@measured/puck/puck.css?url";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", color: "red" }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.message}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const DEFAULT_PAGE_DATA: Data = {
  content: [],
  root: {
    props: {
      title: "New Page",
    },
  },
  zones: {},
};

function Editor({
  initialPageData,
  pagePath,
  onPageDataChange,
}: {
  initialPageData: Data;
  pagePath: string;
  onPageDataChange: (data: Data) => void;
}) {
  console.log("Editor rendering with data:", initialPageData);
  console.log("Config:", config);
  console.log("Page path for saving:", pagePath);

  try {
    return (
      <>
        <link rel="stylesheet" href={editorStyles} id="puck-css" />
        <PuckEditorControlled
          initialData={initialPageData}
          pagePath={pagePath}
          onDataChange={onPageDataChange}
        />
      </>
    );
  } catch (error) {
    console.error("Error rendering Puck:", error);
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        <h1>Error rendering Puck editor</h1>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </div>
    );
  }
}

export default function PuckSplatRoute() {
  const params = useParams();
  const pathname = params["*"] ?? "/";
  const isEditorRoute = pathname.endsWith("/edit") || pathname === "edit";

  // Normalize the path - remove trailing /edit and ensure it starts with /
  let pagePath = isEditorRoute ? pathname.replace(/\/edit$/, "").replace(/^edit$/, "") : pathname;
  if (!pagePath || pagePath === "") {
    pagePath = "/";
  }
  if (!pagePath.startsWith("/")) {
    pagePath = "/" + pagePath;
  }

  const [pageData, setPageData] = useState<Data | null>(null);

  const handleEditorDataChange = useCallback(
    (updatedData: Data) => {
      setPageData(updatedData);
    },
    [setPageData]
  );

  useEffect(() => {
    console.log("PuckSplatRoute mounted", { pathname, isEditorRoute, pagePath });

    let isMounted = true;

    const loadPageData = async () => {
      try {
        const response = await fetch(`/database.json?path=${encodeURIComponent(pagePath)}&t=${Date.now()}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to load database.json: ${response.status} ${response.statusText}`);
        }

        const pages = (await response.json()) as Record<string, Data>;
        const nextData = pages[pagePath] ?? DEFAULT_PAGE_DATA;

        if (isMounted) {
          setPageData(nextData);
        }
      } catch (error) {
        console.error("Error loading page data from database.json:", error);

        if (isMounted) {
          setPageData(DEFAULT_PAGE_DATA);
        }
      }
    };

    loadPageData();

    return () => {
      isMounted = false;
    };
  }, [pagePath]);

  console.log("Render state:", { pageData, isEditorRoute });

  if (!pageData) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div>
        {isEditorRoute ? (
          <Editor
            initialPageData={pageData}
            pagePath={pagePath}
            onPageDataChange={handleEditorDataChange}
          />
        ) : (
          <Render config={config} data={pageData} />
        )}
      </div>
    </ErrorBoundary>
  );
}
