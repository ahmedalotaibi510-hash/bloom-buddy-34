import { Link, createFileRoute } from "@tanstack/react-router";

import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { images } from "@/lib/catalog";

export const Route = createFileRoute("/occasions")({
  head: () => ({
    meta: [
      { title: "Gifts By Occasion | MEMENTO" },
      {
        name: "description",
        content:
          "Find personalized keepsakes for graduations, birthdays, anniversaries and weddings — curated by the moment you're celebrating.",
      },
      { property: "og:title", content: "Gifts By Occasion | MEMENTO" },
      {
        property: "og:description",
        content: "Curated personalized gifts for graduations, birthdays, anniversaries and weddings.",
      },
      { property: "og:image", content: images.graduation },
      { name: "twitter:image", content: images.graduation },
    ],
  }),
  component: OccasionsPage,
});

const occasions = [
  {
    title: "Graduation",
    copy: "Celebrate their milestone with a keepsake that outlasts the ceremony.",
    image: images.graduation,
  },
  {
    title: "Anniversary",
    copy: "Mark the years together with engraved albums and framed memories.",
    image: images.album,
  },
  {
    title: "Birthday",
    copy: "Everyday luxuries made personal — mugs, cases and prints.",
    image: images.mug,
  },
  {
    title: "Weddings",
    copy: "Thoughtful favours and keepsake boxes for the whole celebration.",
    image: images.keepsakeBox,
  },
];

function OccasionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="page-x mx-auto w-full max-w-page flex-grow py-12 md:py-24">
        <div className="mb-16 max-w-2xl">
          <h1 className="mb-4 text-display-sm text-primary md:text-display-lg">
            Gifts For Every Occasion
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Start from the moment you're celebrating. We'll help you shape it into something they can
            hold.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {occasions.map((o) => (
            <Link
              key={o.title}
              to="/shop"
              className="hover-lift group relative h-[360px] overflow-hidden rounded-2xl bg-surface-low"
            >
              <img
                alt={o.title}
                src={o.image}
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/85 via-primary-container/25 to-transparent" />
              <div className="absolute bottom-0 left-0 flex max-w-md flex-col gap-2 p-8">
                <h2 className="text-headline-md text-surface-lowest">{o.title}</h2>
                <p className="text-body-md text-surface-lowest/80">{o.copy}</p>
                <span className="flex items-center gap-1 text-label-lg text-secondary-fixed transition-all group-hover:gap-2">
                  Explore <Icon name="arrow_forward" className="text-sm" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-24 rounded-2xl border border-outline-variant/10 bg-surface-low p-10 text-center">
          <h2 className="mb-4 text-headline-lg text-primary">Not sure where to start?</h2>
          <p className="mx-auto mb-8 max-w-xl text-body-md text-on-surface-variant">
            Begin with a photo. Our live personalization studio will guide you through the rest.
          </p>
          <Link
            to="/customize"
            className="hover-lift inline-block rounded-lg bg-primary px-8 py-4 text-label-lg text-on-primary transition-colors hover:bg-inverse-surface"
          >
            Create Your Gift
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
