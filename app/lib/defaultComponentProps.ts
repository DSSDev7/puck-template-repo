type ComponentProps = Record<string, unknown>;

type DefaultPropsBuilder = () => ComponentProps;

const placeholderImage = "https://via.placeholder.com/800x400";
const placeholderAvatar = "https://via.placeholder.com/80";

const createArrayClone = <T>(values: T[]): T[] => values.map((value) => {
  if (Array.isArray(value)) {
    return createArrayClone(value);
  }
  if (value && typeof value === "object") {
    return { ...(value as Record<string, unknown>) } as T;
  }
  return value;
});

const COMPONENT_PROP_BUILDERS: Record<string, DefaultPropsBuilder> = {
  HeadingBlock: () => ({
    title: "Welcome to your page",
    level: "h2",
  }),
  TextBlock: () => ({
    content: "Start by editing this text to share your message.",
    fontSize: "base",
  }),
  ButtonBlock: () => ({
    text: "Learn More",
    href: "#",
    variant: "default",
    size: "default",
    alignment: "center",
  }),
  BadgeBlock: () => ({
    text: "New",
    variant: "secondary",
  }),
  CardBlock: () => ({
    title: "Card Title",
    description: "Add a supporting description here.",
    content: "Use this area to provide more detail about your card.",
    footerText: "Optional footer",
  }),
  AlertBlock: () => ({
    title: "Heads up!",
    description: "This is an informational alert message.",
    variant: "default",
  }),
  InputBlock: () => ({
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
  }),
  TextareaBlock: () => ({
    label: "Message",
    placeholder: "Share more details here...",
    rows: 4,
  }),
  CheckboxBlock: () => ({
    label: "I agree to the terms",
    defaultChecked: false,
  }),
  SwitchBlock: () => ({
    label: "Enable notifications",
    defaultChecked: true,
  }),
  ContainerBlock: () => ({
    padding: "md",
    maxWidth: "lg",
  }),
  SeparatorBlock: () => ({
    orientation: "horizontal",
  }),
  SkeletonBlock: () => ({
    skeletonWidth: "100%",
    skeletonHeight: "24px",
  }),
  ProgressBlock: () => ({
    value: 60,
    label: "Progress",
  }),
  SpinnerBlock: () => ({
    size: "md",
  }),
  AvatarBlock: () => ({
    src: placeholderAvatar,
    alt: "Avatar preview",
    fallback: "AB",
  }),
  ImageBlock: () => ({
    src: placeholderImage,
    alt: "Placeholder image",
    objectFit: "cover",
  }),
  AccordionBlock: () => ({
    items: createArrayClone([
      { title: "Accordion Item One", content: "Add detailed content for item one." },
      { title: "Accordion Item Two", content: "Provide more information for item two." },
    ]),
  }),
  TabsBlock: () => ({
    tabs: createArrayClone([
      { label: "Tab One", content: "This is the first tab content." },
      { label: "Tab Two", content: "This is the second tab content." },
    ]),
  }),
  ColumnsBlock: () => ({
    columns: 2,
    gap: "md",
    distribution: "equal",
    padding: "md",
  }),
};

const generateComponentInstanceId = (componentId: string): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${componentId}-${crypto.randomUUID()}`;
  }

  const random = Math.random().toString(36).slice(2, 10);
  const timestamp = Date.now().toString(36);
  return `${componentId}-${random}${timestamp}`;
};

export const getDefaultComponentProps = (componentId: string): ComponentProps => {
  const builder = COMPONENT_PROP_BUILDERS[componentId];
  const baseProps = builder ? builder() : {};

  return {
    ...(baseProps as ComponentProps),
  };
};

export const getDefaultComponentPropsWithId = (componentId: string): ComponentProps => {
  const baseProps = getDefaultComponentProps(componentId);

  return {
    ...baseProps,
    id: generateComponentInstanceId(componentId),
  };
};
