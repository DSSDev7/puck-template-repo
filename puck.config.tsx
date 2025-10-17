import type { Config } from "@measured/puck";
import { Button } from "./app/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./app/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./app/components/ui/accordion";
import { Input } from "./app/components/ui/input";
import { Textarea } from "./app/components/ui/textarea";
import { Separator } from "./app/components/ui/separator";

// Helper to apply common styles and classes
const applyStyling = (props: any) => {
  const { className, ...rest } = props;
  const styles: React.CSSProperties = {};
  if (props.backgroundColor) styles.backgroundColor = props.backgroundColor;
  if (props.textColor) styles.color = props.textColor;
  
  const classes = [
    props.paddingTop ? `pt-${props.paddingTop}` : '',
    props.paddingBottom ? `pb-${props.paddingBottom}` : '',
    props.paddingX ? `px-${props.paddingX}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  return { styles, classes, rest };
};

type Props = {
  HeaderBlock: {
    links: { label: string; href: string }[];
  };
  HeroBlock: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
  };
  FeatureGridBlock: {
    features: { icon: string; title: string; description: string }[];
  };
  ProductGridBlock: {
    products: { name: string; price: string; imageUrl: string; description: string }[];
  };
  TestimonialBlock: {
    quote: string;
    author: string;
    role: string;
    imageUrl: string;
  };
  CtaBlock: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  };
  FaqBlock: {
    faqs: { question: string; answer: string }[];
  };
  FooterBlock: {
    brandName: string;
    description: string;
    links: { label: string; href: string }[];
  };
  TextBlock: {
    heading: string;
    text: string;
    align: "left" | "center" | "right";
  };
  ContactFormBlock: {};
};

export const config: Config<Props> = {
  categories: {
    layout: {
      title: "Layout",
      components: ["HeaderBlock", "HeroBlock", "FeatureGridBlock", "ProductGridBlock", "TestimonialBlock", "CtaBlock", "FaqBlock", "FooterBlock", "TextBlock", "ContactFormBlock"],
    },
  },
  components: {
    HeaderBlock: {
      label: "Header",
      fields: {
        links: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            href: { type: "text" },
          },
        },
      },
      defaultProps: {
        links: [
          { label: "Shop", href: "/shop" },
          { label: "Our Process", href: "/our-process" },
          { label: "Subscribe", href: "/subscribe" },
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
        ],
      },
      render: ({ links }) => (
        <header className="bg-[#111111] text-white sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center p-4 border-b border-gray-800">
            <a href="/" className="text-2xl font-bold text-[#9E7FFF]">Bolt</a>
            <nav className="hidden md:flex gap-6 items-center">
              {links?.map((link) => (
                <a key={link.href} href={link.href} className="text-sm hover:text-[#9E7FFF] transition-colors">{link.label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <a href="/account"><Button variant="ghost" size="sm">Account</Button></a>
              <a href="/cart"><Button variant="default" size="sm" style={{ backgroundColor: '#9E7FFF', color: '#FFFFFF' }}>Cart</Button></a>
            </div>
          </div>
        </header>
      ),
    },
    HeroBlock: {
      label: "Hero",
      fields: {
        title: { type: "textarea" },
        subtitle: { type: "text" },
        ctaText: { type: "text" },
        ctaLink: { type: "text" },
        imageUrl: { type: "text" },
      },
      defaultProps: {
        title: "Your Unfair Advantage Is In This Bottle.",
        subtitle: "Ditch the crash. Conquer the day with the smoothest, most powerful cold brew designed for high-achievers.",
        ctaText: "Shop Bolt Cold Brew",
        ctaLink: "/shop",
        imageUrl: "https://images.pexels.com/photos/8599236/pexels-photo-8599236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      render: ({ title, subtitle, ctaText, ctaLink, imageUrl }) => (
        <div className="relative bg-black text-white text-center py-32 px-4 overflow-hidden">
          <div className="absolute inset-0">
            <img src={imageUrl} alt="Bolt Cold Brew" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{title}</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">{subtitle}</p>
            <a href={ctaLink}>
              <Button size="lg" style={{ backgroundColor: '#9E7FFF', color: '#FFFFFF' }}>{ctaText}</Button>
            </a>
          </div>
        </div>
      ),
    },
    FeatureGridBlock: {
      label: "Feature Grid",
      fields: {
        features: {
          type: "array",
          arrayFields: {
            icon: { type: "text" },
            title: { type: "text" },
            description: { type: "textarea" },
          },
        },
      },
      defaultProps: {
        features: [
          { icon: "⏱️", title: "18-Hour Steep", description: "Our meticulous process ensures maximum smoothness and potency, eliminating bitterness." },
          { icon: "🌱", title: "Specialty-Grade Beans", description: "We use only 100% ethically sourced Arabica beans for a rich, complex flavor." },
          { icon: "⚡", title: "Sustained Energy", description: "Zero sugar, zero preservatives. Just pure, powerful, plant-based energy without the crash." },
        ],
      },
      render: ({ features }) => (
        <section className="bg-[#171717] py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white">The Bolt Difference</h2>
              <p className="text-gray-400 mt-2">Why top performers are making the switch.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features?.map((feature, i) => (
                <div key={i} className="bg-[#262626] p-8 rounded-xl border border-[#2F2F2F] text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    ProductGridBlock: {
        label: "Product Grid",
        fields: {
            products: {
                type: "array",
                arrayFields: {
                    name: { type: "text" },
                    price: { type: "text" },
                    imageUrl: { type: "text" },
                    description: { type: "textarea" },
                },
            },
        },
        defaultProps: {
            products: [
                { name: "Original Black", price: "$24.99", imageUrl: "https://images.pexels.com/photos/5946643/pexels-photo-5946643.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Our signature smooth & bold cold brew. 12-pack." },
                { name: "Dark Roast", price: "$24.99", imageUrl: "https://images.pexels.com/photos/8599236/pexels-photo-8599236.jpeg?auto=compress&cs=tinysrgb&w=800", description: "A richer, more intense flavor for the bold. 12-pack." },
                { name: "Vanilla Oat Latte", price: "$29.99", imageUrl: "https://images.pexels.com/photos/8253813/pexels-photo-8253813.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Creamy oat milk with a hint of natural vanilla. 12-pack." },
            ],
        },
        render: ({ products }) => (
            <section className="bg-[#171717] py-20 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {products?.map((product, i) => (
                            <Card key={i} className="bg-[#262626] border-[#2F2F2F] text-white overflow-hidden">
                                <CardHeader className="p-0">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                                    <CardDescription className="text-gray-400 mb-4">{product.description}</CardDescription>
                                    <p className="text-lg font-semibold text-[#9E7FFF] mb-4">{product.price}</p>
                                    <Button className="w-full" style={{ backgroundColor: '#9E7FFF', color: '#FFFFFF' }}>Add to Cart</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        ),
    },
    TestimonialBlock: {
      label: "Testimonial",
      fields: {
        quote: { type: "textarea" },
        author: { type: "text" },
        role: { type: "text" },
        imageUrl: { type: "text" },
      },
      defaultProps: {
        quote: "How do you always have so much energy and stay so focused? Bolt is my secret weapon. I get more done by noon than most people do all day.",
        author: "Alex Chen",
        role: "Founder, Tech Startup",
        imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      render: ({ quote, author, role, imageUrl }) => (
        <section className="bg-[#262626] py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <img src={imageUrl} alt={author} className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-[#9E7FFF]" />
            <blockquote className="text-2xl italic text-white mb-4">"{quote}"</blockquote>
            <p className="font-semibold text-white">{author}</p>
            <p className="text-gray-400">{role}</p>
          </div>
        </section>
      ),
    },
    CtaBlock: {
      label: "Call to Action",
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        ctaText: { type: "text" },
        ctaLink: { type: "text" },
      },
      defaultProps: {
        title: "Ready to Unlock Your Potential?",
        description: "Stop brewing, start doing. Get the fuel you need delivered directly to your door.",
        ctaText: "Fuel Your Focus Now",
        ctaLink: "/shop",
      },
      render: ({ title, description, ctaText, ctaLink }) => (
        <section className="bg-[#111111] py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 mb-8">{description}</p>
            <a href={ctaLink}>
              <Button size="lg" style={{ backgroundColor: '#9E7FFF', color: '#FFFFFF' }}>{ctaText}</Button>
            </a>
          </div>
        </section>
      ),
    },
    FaqBlock: {
      label: "FAQ",
      fields: {
        faqs: {
          type: "array",
          arrayFields: {
            question: { type: "text" },
            answer: { type: "textarea" },
          },
        },
      },
      defaultProps: {
        faqs: [
          { question: "How much caffeine is in each bottle?", answer: "Each bottle of Bolt Cold Brew contains approximately 200mg of caffeine, equivalent to about two standard cups of coffee." },
          { question: "Is your coffee ethically sourced?", answer: "Absolutely. We exclusively use 100% specialty-grade Arabica beans that are ethically and sustainably sourced from our partner farms." },
          { question: "What is the shelf life?", answer: "Our cold brew is fresh and should be refrigerated. It's best enjoyed within 30 days of opening." },
          { question: "Can I modify my subscription?", answer: "Yes! You can easily modify, pause, or cancel your subscription anytime through your account portal." },
        ],
      },
      render: ({ faqs }) => (
        <section className="bg-[#171717] py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs?.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#2F2F2F]">
                  <AccordionTrigger className="text-white hover:no-underline text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ),
    },
    FooterBlock: {
      label: "Footer",
      fields: {
        brandName: { type: "text" },
        description: { type: "text" },
        links: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            href: { type: "text" },
          },
        },
      },
      defaultProps: {
        brandName: "Bolt",
        description: "Rocket fuel for your ambitions.",
        links: [
          { label: "Shop", href: "/shop" },
          { label: "About", href: "/about" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
        ],
      },
      render: ({ brandName, description, links }) => (
        <footer className="bg-black text-gray-400 py-12 px-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold text-[#9E7FFF] mb-2">{brandName}</h3>
              <p className="text-sm">{description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {links?.map(link => <li key={link.href}><a href={link.href} className="text-sm hover:text-[#9E7FFF]">{link.label}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Stay Connected</h4>
              <p className="text-sm mb-4">Get productivity tips and exclusive offers.</p>
              <div className="flex justify-center md:justify-start">
                <Input type="email" placeholder="Enter your email" className="bg-[#262626] border-[#2F2F2F] text-white" />
                <Button type="submit" className="ml-2" style={{ backgroundColor: '#9E7FFF', color: '#FFFFFF' }}>Sign Up</Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-[#2F2F2F]" />
          <p className="text-center text-xs">&copy; {new Date().getFullYear()} {brandName}. All Rights Reserved.</p>
        </footer>
      ),
    },
    TextBlock: {
      label: "Text Block",
      fields: {
        heading: { type: "text" },
        text: { type: "textarea" },
        align: { type: "radio", options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }] },
      },
      defaultProps: {
        heading: "Our Story",
        text: "Bolt was born from a simple problem: the world demands high performance, but traditional energy sources come with a cost—jitters, crashes, and unhealthy ingredients. We knew there had to be a better way. We created Bolt to fuel your ambitions with clean, powerful, and delicious cold brew that works as hard as you do. It's more than coffee; it's the key to unlocking your full potential.",
        align: "left",
      },
      render: ({ heading, text, align }) => (
        <section className="bg-[#171717] py-20 px-4">
          <div className={`container mx-auto max-w-3xl text-${align}`}>
            <h2 className="text-4xl font-bold text-white mb-6">{heading}</h2>
            <div className="text-gray-300 space-y-4 whitespace-pre-wrap">{text}</div>
          </div>
        </section>
      ),
    },
    ContactFormBlock: {
      label: "Contact Form",
      fields: {},
      render: () => (
        <section className="bg-[#171717] py-20 px-4">
          <div className="container mx-auto max-w-xl">
            <Card className="bg-[#262626] border-[#2F2F2F] text-white p-8">
              <CardHeader>
                <CardTitle className="text-3xl">Get In Touch</CardTitle>
                <CardDescription className="text-gray-400">Have a question? We'd love to hear from you.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Name</label>
                  <Input id="name" placeholder="Your Name" className="bg-[#171717] border-[#2F2F2F]" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-[#171717] border-[#2F2F2F]" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message">Message</label>
                  <Textarea id="message" placeholder="Your message..." className="bg-[#171717] border-[#2F2F2F]" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" style={{ backgroundColor: '#9E7FFF', color: '#FFFFFF' }}>Send Message</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      ),
    },
  },
  root: {
    render: ({ children }) => {
      return (
        <div className="bg-[#171717]">
          {children}
        </div>
      );
    },
  },
};
