import { useState, useEffect, Component, type ReactNode } from "react";
import { useParams } from "react-router";
import type { Data } from "@measured/puck";
import { Puck, Render } from "@measured/puck";
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

const initialData = {
  content: [],
  root: {
    props: {
      title: "New Page",
    },
  },
  zones: {},
};

function Editor({ initialPageData, pagePath }: { initialPageData: Data; pagePath: string }) {
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

  useEffect(() => {
    console.log("PuckSplatRoute mounted", { pathname, isEditorRoute, pagePath });

    // Load from localStorage in SPA mode
    const stored = localStorage.getItem(`puck-page:${pagePath}`);
    console.log("Loading from localStorage with key:", `puck-page:${pagePath}`, "Data:", stored);

    if (stored) {
      setPageData(JSON.parse(stored));
    } else {
      setPageData(initialData);
    }
  }, [pagePath]);

  console.log("Render state:", { pageData, isEditorRoute });

  if (!pageData) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div>
        {isEditorRoute ? (
          <Editor initialPageData={pageData} pagePath={pagePath} />
        ) : (
          <Render config={config} data={pageData} />
        )}
      </div>
    </ErrorBoundary>
  );
}
