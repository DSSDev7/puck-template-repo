import type { Config } from "@measured/puck";
import { Button } from "./app/components/ui/button";
import { Badge } from "./app/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./app/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "./app/components/ui/alert";
import { Input } from "./app/components/ui/input";
import { Textarea } from "./app/components/ui/textarea";
import { Checkbox } from "./app/components/ui/checkbox";
import { Switch } from "./app/components/ui/switch";
import { Separator } from "./app/components/ui/separator";
import { Skeleton } from "./app/components/ui/skeleton";
import { Progress } from "./app/components/ui/progress";
import { Spinner } from "./app/components/ui/spinner";
import { Avatar, AvatarImage, AvatarFallback } from "./app/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./app/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./app/components/ui/tabs";

// Common CSS spacing options
const spacingOptions = [
  { label: "0", value: "0" },
  { label: "1 (0.25rem)", value: "1" },
  { label: "2 (0.5rem)", value: "2" },
  { label: "3 (0.75rem)", value: "3" },
  { label: "4 (1rem)", value: "4" },
  { label: "6 (1.5rem)", value: "6" },
  { label: "8 (2rem)", value: "8" },
  { label: "12 (3rem)", value: "12" },
  { label: "16 (4rem)", value: "16" },
  { label: "Auto", value: "auto" },
];

// Common CSS fields that can be added to any component
const cssFields = {
  marginTop: { type: "select" as const, options: spacingOptions },
  marginBottom: { type: "select" as const, options: spacingOptions },
  marginLeft: { type: "select" as const, options: spacingOptions },
  marginRight: { type: "select" as const, options: spacingOptions },
  paddingTop: { type: "select" as const, options: spacingOptions },
  paddingBottom: { type: "select" as const, options: spacingOptions },
  paddingLeft: { type: "select" as const, options: spacingOptions },
  paddingRight: { type: "select" as const, options: spacingOptions },
  width: { type: "text" as const },
  height: { type: "text" as const },
  textAlign: {
    type: "radio" as const,
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
      { label: "Justify", value: "justify" },
    ],
  },
  textColor: { type: "text" as const },
  backgroundColor: { type: "text" as const },
  customCss: { type: "textarea" as const, label: "Custom CSS Classes" },
};

// Default CSS props
const defaultCssProps = {
  marginTop: "0",
  marginBottom: "0",
  marginLeft: "0",
  marginRight: "0",
  paddingTop: "0",
  paddingBottom: "0",
  paddingLeft: "0",
  paddingRight: "0",
  width: "",
  height: "",
  textAlign: "left",
  textColor: "",
  backgroundColor: "",
  customCss: "",
};

// Helper to generate Tailwind classes
const getCssClasses = (props: any) => {
  const classes: string[] = [];
  if (props.marginTop && props.marginTop !== "0") classes.push(props.marginTop === "auto" ? "mt-auto" : `mt-${props.marginTop}`);
  if (props.marginBottom && props.marginBottom !== "0") classes.push(props.marginBottom === "auto" ? "mb-auto" : `mb-${props.marginBottom}`);
  if (props.marginLeft && props.marginLeft !== "0") classes.push(props.marginLeft === "auto" ? "ml-auto" : `ml-${props.marginLeft}`);
  if (props.marginRight && props.marginRight !== "0") classes.push(props.marginRight === "auto" ? "mr-auto" : `mr-${props.marginRight}`);
  if (props.paddingTop && props.paddingTop !== "0") classes.push(`pt-${props.paddingTop}`);
  if (props.paddingBottom && props.paddingBottom !== "0") classes.push(`pb-${props.paddingBottom}`);
  if (props.paddingLeft && props.paddingLeft !== "0") classes.push(`pl-${props.paddingLeft}`);
  if (props.paddingRight && props.paddingRight !== "0") classes.push(`pr-${props.paddingRight}`);
  if (props.textAlign && props.textAlign !== "left") classes.push(`text-${props.textAlign}`);
  if (props.customCss) classes.push(props.customCss);
  return classes.join(" ");
};

// Helper to generate inline styles
const getCssStyles = (props: any): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  if (props.width) styles.width = props.width;
  if (props.height) styles.height = props.height;
  if (props.textColor) styles.color = props.textColor;
  if (props.backgroundColor) styles.backgroundColor = props.backgroundColor;
  return styles;
};

type CssProps = typeof defaultCssProps;

type Props = {
  HeadingBlock: { title: string; level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" } & CssProps;
  ButtonBlock: {
    text: string;
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  } & CssProps;
  BadgeBlock: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  } & CssProps;
  CardBlock: {
    title: string;
    description: string;
    content: string;
    footerText: string;
  } & CssProps;
  AlertBlock: {
    title: string;
    description: string;
    variant: "default" | "destructive";
  } & CssProps;
  InputBlock: {
    placeholder: string;
    type: string;
    label: string;
  } & CssProps;
  TextBlock: {
    content: string;
    fontSize: "sm" | "base" | "lg" | "xl" | "2xl";
  } & CssProps;
  ContainerBlock: {
    padding: "none" | "sm" | "md" | "lg" | "xl";
    maxWidth: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  } & CssProps;
  TextareaBlock: {
    label: string;
    placeholder: string;
    rows: number;
  } & CssProps;
  CheckboxBlock: {
    label: string;
    defaultChecked: boolean;
  } & CssProps;
  SwitchBlock: {
    label: string;
    defaultChecked: boolean;
  } & CssProps;
  SeparatorBlock: {
    orientation: "horizontal" | "vertical";
  } & CssProps;
  SkeletonBlock: {
    skeletonWidth: string;
    skeletonHeight: string;
  } & CssProps;
  ProgressBlock: {
    value: number;
    label: string;
  } & CssProps;
  SpinnerBlock: {
    size: "sm" | "md" | "lg";
  } & CssProps;
  AvatarBlock: {
    src: string;
    fallback: string;
    alt: string;
  } & CssProps;
  ImageBlock: {
    src: string;
    alt: string;
    objectFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  } & CssProps;
  AccordionBlock: {
    items: Array<{ title: string; content: string }>;
  } & CssProps;
  TabsBlock: {
    tabs: Array<{ label: string; content: string }>;
  } & CssProps;
  ColumnsBlock: {
    columns: 2 | 3 | 4;
    gap: "none" | "sm" | "md" | "lg" | "xl";
    distribution: "equal" | "sidebar-left" | "sidebar-right" | "custom";
    padding: "none" | "sm" | "md" | "lg" | "xl";
  } & CssProps;
};

export const config: Config<Props> = {
  categories: {
    typography: {
      title: "Typography",
      components: ["HeadingBlock", "TextBlock"],
    },
    forms: {
      title: "Forms",
      components: ["InputBlock", "TextareaBlock", "CheckboxBlock", "SwitchBlock"],
    },
    interactive: {
      title: "Interactive",
      components: ["ButtonBlock", "AccordionBlock", "TabsBlock"],
    },
    layout: {
      title: "Layout",
      components: ["CardBlock", "ContainerBlock", "SeparatorBlock", "ColumnsBlock"],
    },
    feedback: {
      title: "Feedback",
      components: ["AlertBlock", "BadgeBlock", "ProgressBlock", "SpinnerBlock"],
    },
    media: {
      title: "Media",
      components: ["AvatarBlock", "ImageBlock"],
    },
    utilities: {
      title: "Utilities",
      components: ["SkeletonBlock"],
    },
  },
  components: {
    HeadingBlock: {
      label: "Heading",
      fields: {
        title: { type: "text" },
        level: {
          type: "select",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        title: "Heading",
        level: "h1",
        ...defaultCssProps,
      },
      render: (props) => {
        const { title, level, ...rest } = props;
        const Tag = level;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <Tag className={`font-bold ${cssClasses}`} style={cssStyles}>
            {title}
          </Tag>
        );
      },
    },
    ButtonBlock: {
      label: "Button",
      fields: {
        text: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Destructive", value: "destructive" },
            { label: "Outline", value: "outline" },
            { label: "Secondary", value: "secondary" },
            { label: "Ghost", value: "ghost" },
            { label: "Link", value: "link" },
          ],
        },
        size: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Small", value: "sm" },
            { label: "Large", value: "lg" },
            { label: "Icon", value: "icon" },
            { label: "Icon Small", value: "icon-sm" },
            { label: "Icon Large", value: "icon-lg" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        text: "Click me",
        variant: "default",
        size: "default",
        ...defaultCssProps,
      },
      render: (props) => {
        const { text, variant, size, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Button variant={variant} size={size}>
              {text}
            </Button>
          </div>
        );
      },
    },
    BadgeBlock: {
      label: "Badge",
      fields: {
        text: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Secondary", value: "secondary" },
            { label: "Destructive", value: "destructive" },
            { label: "Outline", value: "outline" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        text: "Badge",
        variant: "default",
        ...defaultCssProps,
      },
      render: (props) => {
        const { text, variant, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Badge variant={variant}>{text}</Badge>
          </div>
        );
      },
    },
    CardBlock: {
      label: "Card",
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        content: { type: "textarea" },
        footerText: { type: "text" },
        ...cssFields,
      },
      defaultProps: {
        title: "Card Title",
        description: "Card description goes here",
        content: "Card content goes here",
        footerText: "Card footer",
        ...defaultCssProps,
      },
      render: (props) => {
        const { title, description, content, footerText, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{content}</p>
              </CardContent>
              <CardFooter>{footerText}</CardFooter>
            </Card>
          </div>
        );
      },
    },
    AlertBlock: {
      label: "Alert",
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        variant: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Destructive", value: "destructive" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        title: "Alert Title",
        description: "Alert description goes here",
        variant: "default",
        ...defaultCssProps,
      },
      render: (props) => {
        const { title, description, variant, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Alert variant={variant}>
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
            </Alert>
          </div>
        );
      },
    },
    InputBlock: {
      label: "Input",
      fields: {
        label: { type: "text" },
        placeholder: { type: "text" },
        type: {
          type: "select",
          options: [
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
            { label: "Password", value: "password" },
            { label: "Number", value: "number" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        label: "Input Label",
        placeholder: "Enter text...",
        type: "text",
        ...defaultCssProps,
      },
      render: (props) => {
        const { label, placeholder, type, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={`grid gap-2 ${cssClasses}`} style={cssStyles}>
            <label className="text-sm font-medium">{label}</label>
            <Input type={type} placeholder={placeholder} />
          </div>
        );
      },
    },
    TextBlock: {
      label: "Text",
      fields: {
        content: { type: "textarea" },
        fontSize: {
          type: "select",
          options: [
            { label: "Small", value: "sm" },
            { label: "Base", value: "base" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
            { label: "2X Large", value: "2xl" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        content: "Your text goes here",
        fontSize: "base",
        ...defaultCssProps,
      },
      render: (props) => {
        const { content, fontSize, ...rest } = props;
        const sizeClasses = {
          sm: "text-sm",
          base: "text-base",
          lg: "text-lg",
          xl: "text-xl",
          "2xl": "text-2xl",
        };
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <p className={`${sizeClasses[fontSize]} ${cssClasses}`} style={cssStyles}>
            {content}
          </p>
        );
      },
    },
    ContainerBlock: {
      label: "Container",
      fields: {
        padding: {
          type: "select",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ],
        },
        maxWidth: {
          type: "select",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
            { label: "2X Large", value: "2xl" },
            { label: "Full Width", value: "full" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        padding: "md",
        maxWidth: "lg",
        ...defaultCssProps,
      },
      render: (props) => {
        const { padding, maxWidth, puck, ...rest } = props;
        const paddingClasses = {
          none: "p-0",
          sm: "p-4",
          md: "p-8",
          lg: "p-12",
          xl: "p-16",
        };
        const maxWidthClasses = {
          sm: "max-w-screen-sm",
          md: "max-w-screen-md",
          lg: "max-w-screen-lg",
          xl: "max-w-screen-xl",
          "2xl": "max-w-screen-2xl",
          full: "max-w-full",
        };
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        const dropZone = puck.renderDropZone({ zone: "container-content" });
        return (
          <div
            className={`mx-auto ${paddingClasses[padding]} ${maxWidthClasses[maxWidth]} ${cssClasses}`}
            style={cssStyles}
          >
            {dropZone as any}
          </div>
        );
      },
    },
    TextareaBlock: {
      label: "Textarea",
      fields: {
        label: { type: "text" },
        placeholder: { type: "text" },
        rows: { type: "number" },
        ...cssFields,
      },
      defaultProps: {
        label: "Textarea Label",
        placeholder: "Enter text...",
        rows: 4,
        ...defaultCssProps,
      },
      render: (props) => {
        const { label, placeholder, rows, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={`grid gap-2 ${cssClasses}`} style={cssStyles}>
            <label className="text-sm font-medium">{label}</label>
            <Textarea placeholder={placeholder} rows={rows} />
          </div>
        );
      },
    },
    CheckboxBlock: {
      label: "Checkbox",
      fields: {
        label: { type: "text" },
        defaultChecked: { type: "radio", options: [{ label: "Checked", value: true }, { label: "Unchecked", value: false }] },
        ...cssFields,
      },
      defaultProps: {
        label: "Accept terms and conditions",
        defaultChecked: false,
        ...defaultCssProps,
      },
      render: (props) => {
        const { label, defaultChecked, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={`flex items-center gap-2 ${cssClasses}`} style={cssStyles}>
            <Checkbox defaultChecked={defaultChecked} id="checkbox" />
            <label htmlFor="checkbox" className="text-sm font-medium">
              {label}
            </label>
          </div>
        );
      },
    },
    SwitchBlock: {
      label: "Switch",
      fields: {
        label: { type: "text" },
        defaultChecked: { type: "radio", options: [{ label: "On", value: true }, { label: "Off", value: false }] },
        ...cssFields,
      },
      defaultProps: {
        label: "Enable notifications",
        defaultChecked: false,
        ...defaultCssProps,
      },
      render: (props) => {
        const { label, defaultChecked, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={`flex items-center gap-2 ${cssClasses}`} style={cssStyles}>
            <Switch defaultChecked={defaultChecked} id="switch" />
            <label htmlFor="switch" className="text-sm font-medium">
              {label}
            </label>
          </div>
        );
      },
    },
    SeparatorBlock: {
      label: "Separator",
      fields: {
        orientation: {
          type: "radio",
          options: [
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        orientation: "horizontal",
        ...defaultCssProps,
      },
      render: (props) => {
        const { orientation, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Separator orientation={orientation} />
          </div>
        );
      },
    },
    SkeletonBlock: {
      label: "Skeleton",
      fields: {
        skeletonWidth: { type: "text", label: "Skeleton Width" },
        skeletonHeight: { type: "text", label: "Skeleton Height" },
        ...cssFields,
      },
      defaultProps: {
        skeletonWidth: "100%",
        skeletonHeight: "20px",
        ...defaultCssProps,
      },
      render: (props) => {
        const { skeletonWidth, skeletonHeight, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Skeleton style={{ width: skeletonWidth, height: skeletonHeight }} />
          </div>
        );
      },
    },
    ProgressBlock: {
      label: "Progress",
      fields: {
        value: { type: "number" },
        label: { type: "text" },
        ...cssFields,
      },
      defaultProps: {
        value: 50,
        label: "Progress",
        ...defaultCssProps,
      },
      render: (props) => {
        const { value, label, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={`grid gap-2 ${cssClasses}`} style={cssStyles}>
            <label className="text-sm font-medium">{label}</label>
            <Progress value={value} />
          </div>
        );
      },
    },
    SpinnerBlock: {
      label: "Spinner",
      fields: {
        size: {
          type: "select",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        size: "md",
        ...defaultCssProps,
      },
      render: (props) => {
        const { size, ...rest } = props;
        const sizeClasses = {
          sm: "size-4",
          md: "size-6",
          lg: "size-8",
        };
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Spinner className={sizeClasses[size]} />
          </div>
        );
      },
    },
    AvatarBlock: {
      label: "Avatar",
      fields: {
        src: { type: "text" },
        alt: { type: "text" },
        fallback: { type: "text" },
        ...cssFields,
      },
      defaultProps: {
        src: "https://github.com/shadcn.png",
        alt: "Avatar",
        fallback: "CN",
        ...defaultCssProps,
      },
      render: (props) => {
        const { src, alt, fallback, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Avatar>
              <AvatarImage src={src} alt={alt} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          </div>
        );
      },
    },
    ImageBlock: {
      label: "Image",
      fields: {
        src: { type: "text" },
        alt: { type: "text" },
        objectFit: {
          type: "select",
          options: [
            { label: "Contain", value: "contain" },
            { label: "Cover", value: "cover" },
            { label: "Fill", value: "fill" },
            { label: "None", value: "none" },
            { label: "Scale Down", value: "scale-down" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        src: "https://via.placeholder.com/600x400",
        alt: "Placeholder image",
        objectFit: "cover",
        ...defaultCssProps,
      },
      render: (props) => {
        const { src, alt, objectFit, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <img
              src={src}
              alt={alt}
              style={{ objectFit, width: "100%", height: "auto" }}
            />
          </div>
        );
      },
    },
    AccordionBlock: {
      label: "Accordion",
      fields: {
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            content: { type: "textarea" },
          },
        },
        ...cssFields,
      },
      defaultProps: {
        items: [
          { title: "Item 1", content: "Content for item 1" },
          { title: "Item 2", content: "Content for item 2" },
        ],
        ...defaultCssProps,
      },
      render: (props) => {
        const { items, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Accordion type="single" collapsible>
              {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );
      },
    },
    TabsBlock: {
      label: "Tabs",
      fields: {
        tabs: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            content: { type: "textarea" },
          },
        },
        ...cssFields,
      },
      defaultProps: {
        tabs: [
          { label: "Tab 1", content: "Content for tab 1" },
          { label: "Tab 2", content: "Content for tab 2" },
        ],
        ...defaultCssProps,
      },
      render: (props) => {
        const { tabs, ...rest } = props;
        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);
        return (
          <div className={cssClasses} style={cssStyles}>
            <Tabs defaultValue="tab-0">
              <TabsList>
                {tabs.map((tab, index) => (
                  <TabsTrigger key={index} value={`tab-${index}`}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab, index) => (
                <TabsContent key={index} value={`tab-${index}`}>
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        );
      },
    },
    ColumnsBlock: {
      label: "Columns",
      fields: {
        columns: {
          type: "select",
          options: [
            { label: "2 Columns", value: 2 },
            { label: "3 Columns", value: 3 },
            { label: "4 Columns", value: 4 },
          ],
        },
        gap: {
          type: "select",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ],
        },
        distribution: {
          type: "select",
          options: [
            { label: "Equal Width", value: "equal" },
            { label: "Sidebar Left (30/70)", value: "sidebar-left" },
            { label: "Sidebar Right (70/30)", value: "sidebar-right" },
            { label: "Custom", value: "custom" },
          ],
        },
        padding: {
          type: "select",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ],
        },
        ...cssFields,
      },
      defaultProps: {
        columns: 2,
        gap: "md",
        distribution: "equal",
        padding: "md",
        ...defaultCssProps,
      },
      render: (props) => {
        const { columns, gap, distribution, padding, puck, ...rest } = props;
        const gapClasses = {
          none: "gap-0",
          sm: "gap-4",
          md: "gap-6",
          lg: "gap-8",
          xl: "gap-12",
        };

        const paddingClasses = {
          none: "p-0",
          sm: "p-4",
          md: "p-8",
          lg: "p-12",
          xl: "p-16",
        };

        // Generate grid template columns based on distribution
        const getGridClasses = () => {
          if (distribution === "sidebar-left" && columns === 2) {
            return "grid-cols-[30%_70%]";
          }
          if (distribution === "sidebar-right" && columns === 2) {
            return "grid-cols-[70%_30%]";
          }
          // Equal distribution - use complete class names for Tailwind
          const colClasses: Record<number, string> = {
            2: "grid-cols-2",
            3: "grid-cols-3",
            4: "grid-cols-4",
          };
          return colClasses[columns] || "grid-cols-2";
        };

        // Only show border in edit mode
        const isEditing = puck.isEditing;
        const borderClasses = isEditing
          ? "min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4"
          : "";

        const cssClasses = getCssClasses(rest);
        const cssStyles = getCssStyles(rest);

        return (
          <div className={`${paddingClasses[padding]} ${cssClasses}`} style={cssStyles}>
            <div className={`grid ${getGridClasses()} ${gapClasses[gap]}`}>
              {Array.from({ length: columns }).map((_, index) => (
                <div key={index} className={borderClasses}>
                  {puck.renderDropZone({ zone: `column-${index}` }) as any}
                </div>
              ))}
            </div>
          </div>
        );
      },
    },
  },
};
