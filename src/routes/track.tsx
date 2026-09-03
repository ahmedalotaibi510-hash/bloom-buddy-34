import { Link, createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";

import { ClientOnly } from "@tanstack/react-router";

import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { LngLat } from "@/components/OrderMap";

const OrderMap = lazy(() => import("@/components/OrderMap"));

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order | MEMENTO" },
      {
        name: "description",
        content:
          "Follow your MEMENTO keepsake in real time on the map — from our workshop to your doorstep, with live courier updates.",
      },
      { property: "og:title", content: "Track Your Order | MEMENTO" },
      {
        property: "og:description",
        content: "Live map tracking for your personalized MEMENTO order.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

/** Workshop (Shuwaikh) to customer (Salmiya), Kuwait. */
const ROUTE_PATH: LngLat[] = [
  [47.9235, 29.3405],
  [47.9448, 29.3372],
  [47.9702, 29.3312],
  [47.9905, 29.3288],
  [48.0132, 29.3245],
  [48.0364, 29.3211],
  [48.0521, 29.3178],
  [48.0668, 29.3325],
];

const stages = [
  { key: "confirmed", label: "Order confirmed", detail: "Payment received", icon: "receipt_long" },
  { key: "crafting", label: "In the workshop", detail: "Printing & framing", icon: "handyman" },
  { key: "dispatched", label: "Dispatched", detail: "Left our workshop", icon: "inventory_2" },
  { key: "transit", label: "Out for delivery", detail: "Courier on the way", icon: "local_shipping" },
  { key: "delivered", label: "Delivered", detail: "Enjoy your memory", icon: "home" },
] as const;

function TrackPage() {
  const [stage, setStage] = useState(3);
  const [tick, setTick] = useState(0);

  // Gentle live movement while the order is out for delivery.
  useEffect(() => {
    if (stage !== 3) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 100), 900);
    return () => clearInterval(id);
  }, [stage]);

  const progress = useMemo(() => {
    if (stage < 2) return 0;
    if (stage === 2) return 0.12;
    if (stage === 3) return 0.25 + (tick / 100) * 0.6;
    return 1;
  }, [stage, tick]);

  const eta = stage >= 4 ? "Delivered" : `${Math.max(4, Math.round((1 - progress) * 45))} min`;

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex-grow">
        <section className="page-x mx-auto max-w-page py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-label-sm text-on-surface-variant">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Track order</span>
          </nav>

          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-display-sm text-primary">Track Your Order</h1>
              <p className="mt-2 text-body-lg text-on-surface-variant">
                Order <span className="font-bold text-primary">#MEM-24815</span> · Custom Memory
                Poster & Engraved Mug
              </p>
            </div>
            <div className="rounded-2xl border border-outline-variant/20 bg-surface-lowest px-6 py-4 shadow-soft">
              <p className="text-label-sm text-on-surface-variant">Estimated arrival</p>
              <p className="text-headline-md text-secondary">{eta}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="relative h-[420px] overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-low shadow-soft md:h-[560px]">
              <ClientOnly
                fallback={
                  <div className="flex h-full items-center justify-center text-body-md text-on-surface-variant">
                    Loading map…
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center text-body-md text-on-surface-variant">
                      Loading map…
                    </div>
                  }
                >
                  <OrderMap path={ROUTE_PATH} progress={progress} />
                </Suspense>
              </ClientOnly>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-outline-variant/20 bg-surface-lowest p-6 shadow-soft">
                <h2 className="mb-6 text-headline-md text-primary">Delivery progress</h2>
                <ol className="flex flex-col">
                  {stages.map((s, i) => {
                    const done = i <= stage;
                    return (
                      <li key={s.key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span
                            aria-hidden="true"
                            className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                              done
                                ? "border-secondary bg-secondary text-on-primary"
                                : "border-outline-variant/30 bg-surface-low text-on-surface-variant"
                            }`}
                          >
                            <Icon name={s.icon} className="text-[20px]" />
                          </span>
                          {i < stages.length - 1 && (
                            <span
                              aria-hidden="true"
                              className={`w-px flex-grow ${done ? "bg-secondary" : "bg-outline-variant/30"}`}
                            />
                          )}
                        </div>
                        <div className={`pb-8 ${i === stages.length - 1 ? "pb-0" : ""}`}>
                          <p
                            className={`text-body-md font-bold ${done ? "text-primary" : "text-on-surface-variant"}`}
                          >
                            {s.label}
                            {i === stage && (
                              <span className="ml-2 rounded-full bg-secondary/15 px-2 py-0.5 text-label-sm font-medium text-secondary">
                                Now
                              </span>
                            )}
                          </p>
                          <p className="text-body-md text-on-surface-variant">{s.detail}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="rounded-2xl border border-outline-variant/20 bg-surface-low p-6">
                <h2 className="mb-2 text-label-lg text-primary">Simulate status</h2>
                <p className="mb-4 text-body-md text-on-surface-variant">
                  Move the courier along the route to preview each stage.
                </p>
                <div className="flex flex-wrap gap-2">
                  {stages.map((s, i) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setStage(i)}
                      aria-pressed={i === stage}
                      className={`rounded-lg px-4 py-3 text-label-sm transition-colors ${
                        i === stage
                          ? "bg-primary text-on-primary"
                          : "bg-surface-lowest text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
