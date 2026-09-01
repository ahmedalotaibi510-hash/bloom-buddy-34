import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { images } from "@/lib/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MEMENTO | Craft, Shipping & Support" },
      {
        name: "description",
        content:
          "How MEMENTO crafts personalized keepsakes in Kuwait, plus shipping and returns, contact details and our privacy commitment.",
      },
      { property: "og:title", content: "About MEMENTO" },
      {
        property: "og:description",
        content: "Our craft, shipping and returns, contact details and privacy commitment.",
      },
      { property: "og:image", content: images.album },
      { name: "twitter:image", content: images.album },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="page-x mx-auto w-full max-w-page flex-grow py-12 md:py-24">
        <div className="grid grid-cols-1 items-center gap-gutter md:grid-cols-2 md:gap-16">
          <div>
            <h1 className="mb-6 text-display-sm text-primary md:text-display-lg">
              Made slowly, on purpose.
            </h1>
            <p className="mb-4 text-body-lg text-on-surface-variant">
              MEMENTO began with a simple frustration: the moments we care about most live buried in a
              camera roll. We make them physical again — printed, engraved, bound and boxed with
              materials chosen to age well.
            </p>
            <p className="text-body-md text-on-surface-variant">
              Every piece is produced to order in Kuwait and checked by hand before it ships.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img alt="Leather photo album detail" src={images.album} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
          <section className="rounded-xl bg-surface-lowest p-8 shadow-soft">
            <h2 className="mb-4 text-headline-md text-primary">Shipping &amp; Returns</h2>
            <p className="text-body-md text-on-surface-variant">
              Personalized orders are crafted within 3–5 working days and delivered across Kuwait for
              2.000 KD. Because each piece is made for you, personalized items can't be returned — but
              if anything arrives damaged we'll remake it free.
            </p>
          </section>
          <section className="rounded-xl bg-surface-lowest p-8 shadow-soft">
            <h2 className="mb-4 text-headline-md text-primary">Contact Us</h2>
            <p className="text-body-md text-on-surface-variant">
              Questions about a design, an order or a bulk gift? Write to hello@memento.example and
              we'll reply within one working day.
            </p>
          </section>
          <section className="rounded-xl bg-surface-lowest p-8 shadow-soft">
            <h2 className="mb-4 text-headline-md text-primary">Privacy Policy</h2>
            <p className="text-body-md text-on-surface-variant">
              Photos you upload are used only to produce your order and are deleted after fulfilment.
              We never sell your data or share your images.
            </p>
          </section>
        </div>

        <div className="mt-24 text-center">
          <Link
            to="/customize"
            className="hover-lift inline-block rounded-lg bg-primary px-10 py-4 text-label-lg text-on-primary transition-colors hover:bg-inverse-surface"
          >
            Create Your Gift
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
