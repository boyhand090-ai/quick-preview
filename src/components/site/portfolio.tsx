import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioFilters, projects, type Project } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";

/** Responsive srcset off a single 4K source so retina/4K screens get full detail. */
function srcSet(url: string) {
  const base = url.replace(/&w=\d+/, "");
  return [960, 1440, 1920, 2560, 3840].map((w) => `${base}&w=${w} ${w}w`).join(", ");
}

/**
 * Bento mosaic — 6-column grid, one repeating span pattern that packs the
 * full 8-project list into exactly 4 rows with zero holes. Filtered subsets
 * simply replay the pattern from the top.
 */
const BENTO_SPANS = [
  "lg:col-span-3 lg:row-span-2", // 0 — hero cell (tall)
  "lg:col-span-3", // 1
  "lg:col-span-3", // 2
  "lg:col-span-2", // 3
  "lg:col-span-2", // 4
  "lg:col-span-2", // 5
  "lg:col-span-4", // 6 — wide banner cell
  "lg:col-span-2", // 7
];

function ProjectCard({ p, large, index }: { p: Project; large?: boolean; index?: number }) {
  const numberText =
    p.metric && p.metric !== "—"
      ? p.metric
      : typeof index === "number"
        ? String(index + 1).padStart(2, "0")
        : "01";

  return (
    <article
      className={cn(
        "group glass-card glass-polish hover-lift sheen-hover relative h-full overflow-hidden",
        "aspect-4/3 sm:aspect-16/10 lg:aspect-auto",
      )}
    >
      <img
        src={p.image}
        srcSet={srcSet(p.image)}
        sizes={large ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
        alt={`${p.name} — ${p.categories.join(", ")} concept project`}
        loading="eager"
        decoding="async"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.includes("photo-1523275335684-37898b6baf30")) {
            target.src =
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=90&w=1920";
          }
        }}
        className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] z-0"
      />

      {/* depth wash for text legibility while keeping picture clear and vibrant */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent opacity-65 transition-opacity duration-500 group-hover:opacity-85 z-1" />
      {/* primary glow rising on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120%_90%_at_50%_120%,color-mix(in_oklab,var(--color-primary)_26%,transparent),transparent_65%)] z-1" />

      {/* top meta row */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
        <span className="pill glass-panel px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
          {p.year}
        </span>
        <span className="pill glass-panel flex size-9 items-center justify-center text-foreground transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {p.tools.map((t) => (
            <span
              key={t}
              className="pill border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground sm:px-3 sm:py-1 sm:text-[11px]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <h3
            className={cn(
              "text-display text-2xl leading-tight sm:text-3xl",
              large ? "lg:text-4xl" : "lg:text-2xl",
            )}
          >
            {p.name}
          </h3>
          <div className="shrink-0 text-right">
            <div className="text-display text-2xl leading-none text-primary transition-transform duration-500 group-hover:scale-110 sm:text-3xl">
              {numberText}
            </div>
            {p.metricLabel && (
              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                {p.metricLabel}
              </div>
            )}
          </div>
        </div>

        {large && (
          <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {p.copy}
          </p>
        )}
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-transparent transition-colors duration-500 group-hover:ring-primary/30" />
    </article>
  );
}

export function Portfolio() {
  const [active, setActive] = useState("All");
  const visible =
    active === "All" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <section id="work" className="relative border-t border-border py-20 sm:py-28">
      {/* ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_40%_at_15%_0%,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent_70%),radial-gradient(50%_35%_at_85%_100%,color-mix(in_oklab,var(--color-primary)_8%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#6060603D] px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                <span className="size-2.5 rounded-full bg-[#9AFD0D] shadow-[0_0_12px_#9AFD0D] animate-pulse" />
                Growth concepts
              </span>
            </div>
            <h2 className="text-display mt-3 text-3xl sm:text-5xl">Digital growth portfolio</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Concept projects exploring branding, digital experiences, acquisition, and automation.
              These are demonstrations, not verified client case studies.
            </p>
          </div>
          <Magnetic>
            <a
              href="#contact"
              className="pill press sheen-hover inline-flex w-fit items-center gap-2 border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              Discuss Your Project <ArrowUpRight className="size-4" />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap gap-2" delay={80}>
          {portfolioFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "pill press border px-4 py-2 text-sm transition-all duration-300 cursor-pointer",
                active === f
                  ? "border-primary bg-primary text-primary-foreground scale-105 shadow-[0_10px_30px_-12px_var(--color-primary)]"
                  : "border-border text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-6 lg:auto-rows-[16rem]">
          {visible.map((p, i) => {
            const span = BENTO_SPANS[i % BENTO_SPANS.length] ?? BENTO_SPANS[0]!;
            const large = span.includes("row-span-2") || span.includes("col-span-4");
            return (
              <Reveal
                key={p.name}
                variant={i % 2 === 0 ? "left" : "right"}
                delay={(i % 3) * 90}
                className={cn("h-full", span)}
              >
                <ProjectCard p={p} large={large} index={i} />
              </Reveal>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No concept projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
