"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarSearch, Compass, Zap } from "lucide-react";

const steps = [
  {
    icon: CalendarSearch,
    step: "01",
    title: "Choose Your Era",
    description:
      "Browse our curated collection of historical periods and select the moment that captivates you most.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Customize Your Journey",
    description:
      "Our temporal concierges craft a bespoke itinerary tailored to your interests, preferences, and comfort.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Travel Through Time",
    description:
      "Step into our chrono-chamber and experience history firsthand with full sensory immersion technology.",
  },
];

export function HowItWorks() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="quiz"
      ref={ref}
      className="relative border-y border-border/50 bg-secondary/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs tracking-widest uppercase text-primary">
            The Process
          </p>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-balance">How It Works</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Three simple steps to your most extraordinary journey ever
            conceived.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`group relative rounded-lg border border-border/50 bg-card p-8 transition-all duration-700 hover:border-primary/30 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Step number */}
              <span className="absolute -top-3 right-6 rounded-sm bg-primary px-2.5 py-0.5 font-serif text-xs font-bold text-primary-foreground">
                {s.step}
              </span>

              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-secondary transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mb-3 font-serif text-xl font-bold text-foreground">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>

              {/* Connector line (hidden on last, hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
