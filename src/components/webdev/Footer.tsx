type FooterItem = string | { name: string; href: string };

const designServices: FooterItem[] = [
  { name: "UI & UX Design", href: "/services/ui-ux-design" },
  { name: "Web Design", href: "/services/web-design" },
  { name: "Mobile App Design", href: "/services/mobile-app-design" },
  { name: "Branding & Identity", href: "/services/branding-identity" },
  { name: "SEO & Growth Marketing", href: "/services/seo-marketing" },
  { name: "Paid Advertising", href: "/services/paid-ads" },
];

const devServices: FooterItem[] = [
  { name: "Web Development", href: "/services/web-development" },
  { name: "WordPress Development", href: "/services/wordpress-development" },
  { name: "Shopify Development", href: "/services/shopify-development" },
  { name: "Webflow Development", href: "/services/webflow-development" },
  { name: "Digital Marketing", href: "/services/digital-marketing" },
  { name: "Content & Influencer", href: "/services/content-marketing" },
];

const company: FooterItem[] = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Our Work", href: "/work" },
  { name: "Admin Portal", href: "/admin" },
];

const socials = ["Dribbble", "Instagram", "Behance", "LinkedIn", "Facebook"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink pt-16 pb-20 lg:pb-6">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="flex items-baseline text-2xl font-semibold tracking-tight">
              six<span className="text-primary">2</span>eight
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A full-service digital growth agency connecting strategy, design, technology, and
              marketing to move businesses forward.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <span
                  key={s}
                  className="pill cursor-pointer border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <FooterCol title="Design & Growth" items={designServices} />
          <FooterCol title="Development & Systems" items={devServices} />
          <FooterCol title="Company" items={company} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026. six2eight. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Privacy Policy
            </span>
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Terms of use
            </span>
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="text-display select-none px-5 pb-6 text-center text-[15vw] leading-none text-foreground/5"
      >
        six2eight
      </p>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => {
          const name = typeof i === "string" ? i : i.name;
          const href = typeof i === "string" ? "#" : i.href;

          return (
            <li key={name}>
              <a
                href={href}
                className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
