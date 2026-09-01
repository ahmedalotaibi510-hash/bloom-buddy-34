import { Link, createFileRoute } from "@tanstack/react-router";

import { Icon, Stars } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { images, occasionFilters, productTypeFilters } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop The Collection | MEMENTO" },
      {
        name: "description",
        content:
          "Browse personalized posters, mugs, phone cases, frames and tees — filter by occasion and product type to find the perfect keepsake.",
      },
      { property: "og:title", content: "Shop The Collection | MEMENTO" },
      {
        property: "og:description",
        content: "Personalized gifts for graduations, birthdays and anniversaries, made to order.",
      },
      { property: "og:image", content: images.poster },
      { name: "twitter:image", content: images.poster },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SiteHeader />
      <main className="page-x mx-auto w-full max-w-page flex-grow py-12 md:py-24">
        <div className="mb-16 text-center">
          <h1 className="mb-8 text-display-sm tracking-tighter text-primary md:text-display-lg">
            The Collection
          </h1>
          <div className="relative mx-auto max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Icon name="search" className="text-outline" />
            </div>
            <input
              type="text"
              placeholder="Search for gifts..."
              aria-label="Search for gifts"
              className="field bg-surface-lowest py-4 pr-4 pl-12 text-body-lg"
            />
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <span className="text-label-sm text-on-surface-variant">Suggested:</span>
              {["Graduation", "Anniversary", "Custom Posters"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="text-label-sm text-secondary transition-colors hover:text-secondary-container"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:flex-row">
          <aside className="w-full flex-shrink-0 md:w-64">
            <div className="sticky top-32 space-y-10">
              <FilterGroup title="Occasions" options={occasionFilters} />
              <FilterGroup title="Product Type" options={productTypeFilters} defaultChecked="Posters" />
            </div>
          </aside>

          <div className="flex-grow">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {/* Feature card */}
              <article className="group col-span-1 flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface-lowest shadow-soft hover-lift sm:col-span-2 sm:flex-row lg:col-span-2">
                <div className="relative aspect-square w-full overflow-hidden bg-surface-container sm:aspect-auto sm:w-1/2">
                  <img
                    alt="The Storyteller Frame"
                    src={images.poster}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-surface/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Icon name="favorite" className="text-primary" />
                  </div>
                </div>
                <div className="flex w-full flex-col justify-center p-8 sm:w-1/2">
                  <Stars rating={4.5} />
                  <h2 className="mb-2 text-headline-md text-primary">The Storyteller Frame</h2>
                  <p className="mb-6 text-body-md text-on-surface-variant">
                    A beautifully crafted custom typography piece that captures your favorite shared
                    memory.
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-body-lg font-medium text-primary">24.50 KD</span>
                    <Link
                      to="/customize"
                      className="rounded-lg border border-primary px-4 py-2 text-label-sm text-primary transition-colors hover:bg-surface-container"
                    >
                      Customize
                    </Link>
                  </div>
                </div>
              </article>

              <CompactCard name="Morning Ritual Mug" price="8.00 KD" rating={4} image={images.mug} />
              <CompactCard name="Monogram Case" price="12.00 KD" rating={5} image={images.phoneCase} />

              {/* Landscape card */}
              <article className="group col-span-1 flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface-lowest shadow-soft hover-lift sm:col-span-2 sm:flex-row">
                <div className="relative aspect-square w-full overflow-hidden bg-surface-container sm:aspect-auto sm:w-2/5">
                  <img
                    alt="Signature Graphic Tee"
                    src={images.tee}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex w-full flex-col justify-center p-8 sm:w-3/5">
                  <Stars rating={4.5} />
                  <h2 className="mb-2 text-headline-md text-primary">Signature Graphic Tee</h2>
                  <p className="mb-6 text-body-md text-on-surface-variant">
                    Wear your memories. Premium cotton tailored for comfort.
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-body-lg font-medium text-primary">15.00 KD</span>
                    <Link
                      to="/customize"
                      className="rounded-lg border border-primary px-4 py-2 text-label-sm text-primary transition-colors hover:bg-surface-container"
                    >
                      Quick Add
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-16 flex justify-center">
              <button
                type="button"
                className="border-b border-primary pb-1 text-label-lg text-primary transition-colors hover:border-secondary hover:text-secondary"
              >
                View More Gifts
              </button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function FilterGroup({
  title,
  options,
  defaultChecked,
}: {
  title: string;
  options: string[];
  defaultChecked?: string;
}) {
  return (
    <div>
      <h3 className="mb-4 border-b border-outline-variant/10 pb-2 text-headline-md text-primary">
        {title}
      </h3>
      <div className="space-y-3">
        {options.map((o) => (
          <label key={o} className="group flex cursor-pointer items-center space-x-3">
            <input
              type="checkbox"
              defaultChecked={o === defaultChecked}
              className="h-5 w-5 rounded border-outline-variant/40 bg-surface-lowest accent-accent"
            />
            <span className="text-body-md text-on-surface-variant transition-colors group-hover:text-primary">
              {o}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function CompactCard({
  name,
  price,
  rating,
  image,
}: {
  name: string;
  price: string;
  rating: number;
  image: string;
}) {
  return (
    <article className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface-lowest shadow-soft hover-lift">
      <div className="relative aspect-square w-full overflow-hidden bg-surface-container">
        <img
          alt={name}
          src={image}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 rounded-full bg-surface/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Icon name="favorite" className="text-primary" />
        </div>
      </div>
      <div className="flex flex-grow flex-col p-6">
        <Stars rating={rating} />
        <h3 className="mb-1 text-body-md font-bold text-primary">{name}</h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-body-md text-on-surface-variant">{price}</span>
          <Icon name="add_circle" className="text-primary transition-colors group-hover:text-accent" />
        </div>
      </div>
    </article>
  );
}
