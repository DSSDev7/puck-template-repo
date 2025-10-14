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
    // Load from localStorage
    const stored = localStorage.getItem("puck-page:/");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      setData(defaultData);
    }
  }, []);

  if (!data) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  return <PuckRender data={data} />;
}
