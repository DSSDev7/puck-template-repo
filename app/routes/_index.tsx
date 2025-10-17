import { useEffect, useState } from "react";
import { PuckRender } from "~/components/puck-render";
import type { Data } from "@measured/puck";

const defaultData = {
  content: [
    {
      type: "HeadingBlock",
      props: {
        title: "Edit this page by adding /edit to the end of the URL",
        id: "HeadingBlock-1694032984497",
        level: "h1",
      },
    },
  ],
  root: { props: { title: "Puck + React Router 7 demo" } },
  zones: {},
};

export default function IndexRoute() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const response = await fetch(`/database.json?t=${Date.now()}`, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Failed to load database.json: ${response.status} ${response.statusText}`);
        }

        const pages = (await response.json()) as Record<string, Data>;
        const nextData = pages["/"] ?? defaultData;

        if (isMounted) {
          setData(nextData);
        }
      } catch (error) {
        console.error("Error loading home page data:", error);

        if (isMounted) {
          setData(defaultData);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!data) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  return <PuckRender data={data} />;
}
