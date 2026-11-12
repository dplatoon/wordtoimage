import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Layout primitives for consistent page rhythm across the app.
 *
 * `Section` provides semantic <section> wrapping with a consistent vertical
 * rhythm and an inner container. `SectionHeading` renders the recurring
 * eyebrow + title + subtitle block used across marketing and content pages.
 *
 * These exist to stop every page from re-implementing its own spacing,
 * container widths, and heading markup (a major source of the prior
 * component duplication).
 */

type SectionSpacing = "sm" | "md" | "lg";
type SectionBackground = "transparent" | "muted" | "card" | "dark";

const spacingMap: Record<SectionSpacing, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

const backgroundMap: Record<SectionBackground, string> = {
  transparent: "",
  muted: "bg-muted/30",
  card: "bg-card/40",
  dark: "bg-gradient-to-b from-background via-background to-[hsl(220_20%_3%)]",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical padding scale. Defaults to "md". */
  spacing?: SectionSpacing;
  /** Background treatment using theme tokens. Defaults to "transparent". */
  background?: SectionBackground;
  /** Constrain the inner container width. Defaults to true. */
  contained?: boolean;
  /** Override the inner container max-width utility (e.g. "max-w-4xl"). */
  containerClassName?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      spacing = "md",
      background = "transparent",
      contained = true,
      containerClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden",
          spacingMap[spacing],
          backgroundMap[background],
          className
        )}
        {...props}
      >
        {contained ? (
          <div
            className={cn(
              "container mx-auto px-4 md:px-6",
              containerClassName
            )}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  }
);
Section.displayName = "Section";

interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  /** Main heading text. */
  title: React.ReactNode;
  /** Supporting copy below the title. */
  subtitle?: React.ReactNode;
  /** Heading level for correct document outline. Defaults to "h2". */
  as?: "h1" | "h2" | "h3";
  /** Text alignment. Defaults to "center". */
  align?: "center" | "left";
  /** Apply the warm gradient treatment to the title. Defaults to false. */
  gradient?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Heading = "h2",
  align = "center",
  gradient = false,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary",
            align === "center" && "justify-center"
          )}
        >
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          "mt-4 font-display font-bold tracking-tight text-foreground",
          Heading === "h1"
            ? "text-4xl sm:text-5xl md:text-6xl"
            : "text-3xl md:text-4xl lg:text-5xl",
          gradient &&
            "bg-gradient-to-r from-primary via-neon-coral to-neon-amber bg-clip-text text-transparent"
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
