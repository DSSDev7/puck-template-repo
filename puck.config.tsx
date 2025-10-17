import type { Config } from "@measured/puck";
import { Button } from "./app/components/ui/button";
import { Badge } from "./app/components/ui/badge";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
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
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "./app/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./app/components/ui/tabs";
import * as React from "react";

// ---------- Shared UI Field Definitions ----------
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

// CSS props type (no default object)
type CssProps = {
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  width?: string;
  height?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  textColor?: string;
  backgroundColor?: string;
  customCss?: string;
};

// ---------- Helpers ----------
const getCssClasses = (props: Partial<CssProps>) => {
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

const getCssStyles = (props: Partial<CssProps>): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  if (props.width) styles.width = props.width;
  if (props.height) styles.height = props.height;
  if (props.textColor) styles.color = props.textColor;
  if (props.backgroundColor) styles.backgroundColor = props.backgroundColor;
  return styles;
};

// ---------- Props ----------
type Props = {
  HeadingBlock: { title: string; level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" } & CssProps;
  ButtonBlock: {
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  } & CssProps;
  BadgeBlock: { text: string; variant?: "default" | "secondary" | "destructive" | "outline" } & CssProps;
  CardBlock: { title: string; description: string; content: string; footerText?: string } & CssProps;
  AlertBlock: { title: string; description: string; variant?: "default" | "destructive" } & CssProps;
  InputBlock: { placeholder?: string; type?: string; label?: string } & CssProps;
  TextBlock: { content: string; fontSize?: "sm" | "base" | "lg" | "xl" | "2xl" } & CssProps;
  ContainerBlock: {
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  } & CssProps;
  TextareaBlock: { label?: string; placeholder?: string; rows?: number } & CssProps;
  CheckboxBlock: { label?: string; defaultChecked?: boolean } & CssProps;
  SwitchBlock: { label?: string; defaultChecked?: boolean } & CssProps;
  SeparatorBlock: { orientation?: "horizontal" | "vertical" } & CssProps;
  SkeletonBlock: { skeletonWidth?: string; skeletonHeight?: string } & CssProps;
  ProgressBlock: { value?: number; label?: string } & CssProps;
  SpinnerBlock: { size?: "sm" | "md" | "lg" } & CssProps;
  AvatarBlock: { src?: string; fallback?: string; alt?: string } & CssProps;
  ImageBlock: { src: string; alt?: string; objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down" } & CssProps;
  AccordionBlock: { items: Array<{ title: string; content: string }> } & CssProps;
  TabsBlock: { tabs: Array<{ label: string; content: string }> } & CssProps;
  ColumnsBlock: {
    columns?: 2 | 3 | 4;
    gap?: "none" | "sm" | "md" | "lg" | "xl";
    distribution?: "equal" | "sidebar-left" | "sidebar-right" | "custom";
    padding?: "none" | "sm" | "md" | "lg" | "xl";
  } & CssProps;
};

// ---------- Config ----------
export const config: Config<Props> = {
  categories: {
    typography: { title: "Typography", components: ["HeadingBlock", "TextBlock"] },
    forms: { title: "Forms", components: ["InputBlock", "TextareaBlock", "CheckboxBlock", "SwitchBlock"] },
    interactive: { title: "Interactive", components: ["ButtonBlock", "AccordionBlock", "TabsBlock"] },
    layout: { title: "Layout", components: ["CardBlock", "ContainerBlock", "SeparatorBlock", "ColumnsBlock"] },
    feedback: { title: "Feedback", components: ["AlertBlock", "BadgeBlock", "ProgressBlock", "SpinnerBlock"] },
    media: { title: "Media", components: ["AvatarBlock", "ImageBlock"] },
    utilities: { title: "Utilities", components: ["SkeletonBlock"] },
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
      render: (props) => {
        const { title, level, ...rest } = props;
        const Tag = (level ?? "h2") as keyof React.JSX.IntrinsicElements;
        return React.createElement(
          Tag,
          { className: `font-bold ${getCssClasses(rest)}`, style: getCssStyles(rest) },
          title
        );
      },
    },

    ButtonBlock: {
      label: "Button",
      fields: {
        text: { type: "text" },
        variant: {
          type: "select", options: [
            { label: "Default", value: "default" }, { label: "Destructive", value: "destructive" },
            { label: "Outline", value: "outline" }, { label: "Secondary", value: "secondary" },
            { label: "Ghost", value: "ghost" }, { label: "Link", value: "link" },
          ]
        },
        size: {
          type: "select", options: [
            { label: "Default", value: "default" }, { label: "Small", value: "sm" },
            { label: "Large", value: "lg" }, { label: "Icon", value: "icon" },
            { label: "Icon Small", value: "icon-sm" }, { label: "Icon Large", value: "icon-lg" },
          ]
        },
        ...cssFields,
      },
      render: ({ text, variant, size, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Button variant={variant ?? "default"} size={size ?? "default"}>{text}</Button>
        </div>
      ),
    },

    BadgeBlock: {
      label: "Badge",
      fields: {
        text: { type: "text" }, variant: {
          type: "select",
          options: [
            { label: "Default", value: "default" }, { label: "Secondary", value: "secondary" },
            { label: "Destructive", value: "destructive" }, { label: "Outline", value: "outline" },
          ],
        }, ...cssFields
      },
      render: ({ text, variant, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Badge variant={variant ?? "default"}>{text}</Badge>
        </div>
      ),
    },

    CardBlock: {
      label: "Card",
      fields: { title: { type: "text" }, description: { type: "textarea" }, content: { type: "textarea" }, footerText: { type: "text" }, ...cssFields },
      render: ({ title, description, content, footerText, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent><p>{content}</p></CardContent>
            {footerText ? <CardFooter>{footerText}</CardFooter> : null}
          </Card>
        </div>
      ),
    },

    AlertBlock: {
      label: "Alert",
      fields: {
        title: { type: "text" }, description: { type: "textarea" }, variant: {
          type: "select", options: [{ label: "Default", value: "default" }, { label: "Destructive", value: "destructive" }],
        }, ...cssFields
      },
      render: ({ title, description, variant, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Alert variant={variant ?? "default"}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>
        </div>
      ),
    },

    InputBlock: {
      label: "Input",
      fields: {
        label: { type: "text" },
        placeholder: { type: "text" },
        type: {
          type: "select", options: [
            { label: "Text", value: "text" }, { label: "Email", value: "email" },
            { label: "Password", value: "password" }, { label: "Number", value: "number" },
          ]
        },
        ...cssFields,
      },
      render: ({ label, placeholder, type, ...rest }) => (
        <div className={`grid gap-2 ${getCssClasses(rest)}`} style={getCssStyles(rest)}>
          {label ? <label className="text-sm font-medium">{label}</label> : null}
          <Input type={type ?? "text"} placeholder={placeholder} />
        </div>
      ),
    },

    TextBlock: {
      label: "Text",
      fields: {
        content: { type: "textarea" },
        fontSize: {
          type: "select", options: [
            { label: "Small", value: "sm" }, { label: "Base", value: "base" },
            { label: "Large", value: "lg" }, { label: "Extra Large", value: "xl" }, { label: "2X Large", value: "2xl" },
          ]
        },
        ...cssFields,
      },
      render: ({ content, fontSize, ...rest }) => {
        const sizeClasses: Record<string, string> = { sm: "text-sm", base: "text-base", lg: "text-lg", xl: "text-xl", "2xl": "text-2xl" };
        const sizeClass = fontSize ? sizeClasses[fontSize] : "";
        return <p className={`${sizeClass} ${getCssClasses(rest)}`} style={getCssStyles(rest)}>{content}</p>;
      },
    },

    ContainerBlock: {
      label: "Container",
      fields: {
        padding: {
          type: "select", options: [
            { label: "None", value: "none" }, { label: "Small", value: "sm" }, { label: "Medium", value: "md" },
            { label: "Large", value: "lg" }, { label: "Extra Large", value: "xl" },
          ]
        },
        maxWidth: {
          type: "select", options: [
            { label: "Small", value: "sm" }, { label: "Medium", value: "md" }, { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" }, { label: "2X Large", value: "2xl" }, { label: "Full Width", value: "full" },
          ]
        },
        ...cssFields,
      },
      render: ({ padding, maxWidth, puck, ...rest }) => {
        const paddingClasses: Record<string, string> = { none: "p-0", sm: "p-4", md: "p-8", lg: "p-12", xl: "p-16" };
        const maxWidthClasses: Record<string, string> = {
          sm: "max-w-screen-sm", md: "max-w-screen-md", lg: "max-w-screen-lg",
          xl: "max-w-screen-xl", "2xl": "max-w-screen-2xl", full: "max-w-full",
        };
        const pad = padding ? paddingClasses[padding] : "";
        const mx = maxWidth ? maxWidthClasses[maxWidth] : "";
        return (
          <div className={`mx-auto ${pad} ${mx} ${getCssClasses(rest)}`} style={getCssStyles(rest)}>
            {puck.renderDropZone({ zone: "container-content" }) as any}
          </div>
        );
      },
    },

    TextareaBlock: {
      label: "Textarea",
      fields: { label: { type: "text" }, placeholder: { type: "text" }, rows: { type: "number" }, ...cssFields },
      render: ({ label, placeholder, rows, ...rest }) => (
        <div className={`grid gap-2 ${getCssClasses(rest)}`} style={getCssStyles(rest)}>
          {label ? <label className="text-sm font-medium">{label}</label> : null}
          <Textarea placeholder={placeholder} rows={rows} />
        </div>
      ),
    },

    CheckboxBlock: {
      label: "Checkbox",
      fields: { label: { type: "text" }, defaultChecked: { type: "radio", options: [{ label: "Checked", value: true }, { label: "Unchecked", value: false }] }, ...cssFields },
      render: ({ label, defaultChecked, ...rest }) => (
        <div className={`flex items-center gap-2 ${getCssClasses(rest)}`} style={getCssStyles(rest)}>
          <Checkbox defaultChecked={Boolean(defaultChecked)} id="checkbox" />
          {label ? <label htmlFor="checkbox" className="text-sm font-medium">{label}</label> : null}
        </div>
      ),
    },

    SwitchBlock: {
      label: "Switch",
      fields: { label: { type: "text" }, defaultChecked: { type: "radio", options: [{ label: "On", value: true }, { label: "Off", value: false }] }, ...cssFields },
      render: ({ label, defaultChecked, ...rest }) => (
        <div className={`flex items-center gap-2 ${getCssClasses(rest)}`} style={getCssStyles(rest)}>
          <Switch defaultChecked={Boolean(defaultChecked)} id="switch" />
          {label ? <label htmlFor="switch" className="text-sm font-medium">{label}</label> : null}
        </div>
      ),
    },

    SeparatorBlock: {
      label: "Separator",
      fields: { orientation: { type: "radio", options: [{ label: "Horizontal", value: "horizontal" }, { label: "Vertical", value: "vertical" }] }, ...cssFields },
      render: ({ orientation, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Separator orientation={orientation ?? "horizontal"} />
        </div>
      ),
    },

    SkeletonBlock: {
      label: "Skeleton",
      fields: { skeletonWidth: { type: "text", label: "Skeleton Width" }, skeletonHeight: { type: "text", label: "Skeleton Height" }, ...cssFields },
      render: ({ skeletonWidth, skeletonHeight, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Skeleton style={{ width: skeletonWidth ?? "100%", height: skeletonHeight ?? "20px" }} />
        </div>
      ),
    },

    ProgressBlock: {
      label: "Progress",
      fields: { value: { type: "number" }, label: { type: "text" }, ...cssFields },
      render: ({ value, label, ...rest }) => (
        <div className={`grid gap-2 ${getCssClasses(rest)}`} style={getCssStyles(rest)}>
          {label ? <label className="text-sm font-medium">{label}</label> : null}
          <Progress value={value ?? 0} />
        </div>
      ),
    },

    SpinnerBlock: {
      label: "Spinner",
      fields: {
        size: {
          type: "select", options: [
            { label: "Small", value: "sm" }, { label: "Medium", value: "md" }, { label: "Large", value: "lg" },
          ]
        }, ...cssFields
      },
      render: ({ size, ...rest }) => {
        const sizeClasses: Record<string, string> = { sm: "size-4", md: "size-6", lg: "size-8" };
        const cls = size ? sizeClasses[size] : sizeClasses["md"];
        return <div className={getCssClasses(rest)} style={getCssStyles(rest)}><Spinner className={cls} /></div>;
      },
    },

    AvatarBlock: {
      label: "Avatar",
      fields: { src: { type: "text" }, alt: { type: "text" }, fallback: { type: "text" }, ...cssFields },
      render: ({ src, alt, fallback, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Avatar>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </div>
      ),
    },

    ImageBlock: {
      label: "Image",
      fields: {
        src: { type: "text" },
        alt: { type: "text" },
        objectFit: {
          type: "select", options: [
            { label: "Contain", value: "contain" }, { label: "Cover", value: "cover" },
            { label: "Fill", value: "fill" }, { label: "None", value: "none" },
            { label: "Scale Down", value: "scale-down" },
          ]
        },
        ...cssFields,
      },
      render: ({ src, alt, objectFit, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <img src={src} alt={alt ?? ""} style={{ objectFit: objectFit ?? "cover", width: "100%", height: "auto" }} />
        </div>
      ),
    },

    AccordionBlock: {
      label: "Accordion",
      fields: { items: { type: "array", arrayFields: { title: { type: "text" }, content: { type: "textarea" } } }, ...cssFields },
      render: ({ items, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Accordion type="single" collapsible>
            {(items ?? []).map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ),
    },

    TabsBlock: {
      label: "Tabs",
      fields: { tabs: { type: "array", arrayFields: { label: { type: "text" }, content: { type: "textarea" } } }, ...cssFields },
      render: ({ tabs, ...rest }) => (
        <div className={getCssClasses(rest)} style={getCssStyles(rest)}>
          <Tabs defaultValue="tab-0">
            <TabsList>
              {(tabs ?? []).map((tab, index) => (
                <TabsTrigger key={index} value={`tab-${index}`}>{tab.label}</TabsTrigger>
              ))}
            </TabsList>
            {(tabs ?? []).map((tab, index) => (
              <TabsContent key={index} value={`tab-${index}`}>{tab.content}</TabsContent>
            ))}
          </Tabs>
        </div>
      ),
    },

    ColumnsBlock: {
      label: "Columns",
      fields: {
        columns: {
          type: "select", options: [
            { label: "2 Columns", value: 2 }, { label: "3 Columns", value: 3 }, { label: "4 Columns", value: 4 },
          ]
        },
        gap: {
          type: "select", options: [
            { label: "None", value: "none" }, { label: "Small", value: "sm" }, { label: "Medium", value: "md" },
            { label: "Large", value: "lg" }, { label: "Extra Large", value: "xl" },
          ]
        },
        distribution: {
          type: "select", options: [
            { label: "Equal Width", value: "equal" }, { label: "Sidebar Left (30/70)", value: "sidebar-left" },
            { label: "Sidebar Right (70/30)", value: "sidebar-right" }, { label: "Custom", value: "custom" },
          ]
        },
        padding: {
          type: "select", options: [
            { label: "None", value: "none" }, { label: "Small", value: "sm" }, { label: "Medium", value: "md" },
            { label: "Large", value: "lg" }, { label: "Extra Large", value: "xl" },
          ]
        },
        ...cssFields,
      },
      render: ({ columns, gap, distribution, padding, puck, ...rest }) => {
        const gapClasses: Record<string, string> = { none: "gap-0", sm: "gap-4", md: "gap-6", lg: "gap-8", xl: "gap-12" };
        const paddingClasses: Record<string, string> = { none: "p-0", sm: "p-4", md: "p-8", lg: "p-12", xl: "p-16" };
        const colCount = columns ?? 2;
        const dist = distribution ?? "equal";
        const getGridClasses = () => {
          if (dist === "sidebar-left" && colCount === 2) return "grid-cols-[30%_70%]";
          if (dist === "sidebar-right" && colCount === 2) return "grid-cols-[70%_30%]";
          const colClasses: Record<number, string> = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
          return colClasses[colCount] ?? "grid-cols-2";
        };
        const isEditing = puck.isEditing;
        const borderClasses = isEditing ? "min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4" : "";
        const g = gap ? gapClasses[gap] : "";
        const p = padding ? paddingClasses[padding] : "";
        return (
          <div className={`${p} ${getCssClasses(rest)}`} style={getCssStyles(rest)}>
            <div className={`grid ${getGridClasses()} ${g}`}>
              {Array.from({ length: colCount }).map((_, index) => (
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
