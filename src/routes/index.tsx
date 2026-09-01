import { Link, createFileRoute } from "@tanstack/react-router";

import { Icon, Stars } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { featuredProducts, images } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MEMENTO | Turn Your Memories Into Something You Can Keep" },
      {
        name: "description",
        content:
          "Personalized gifts made from your favorite photos, names and memories — posters, mugs, cases and keepsakes crafted to last.",
      },
      { property: "og:title", content: "MEMENTO | Personalized Memory Gifts" },
      {
        property: "og:description",
        content: "Turn your favorite photos and moments into keepsakes crafted with premium materials.",
      },
      { property: "og:image", content: images.hero },
      { name: "twitter:image", content: images.hero },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero */}
        <section className="page-x mx-auto grid max-w-page grid-cols-1 items-center gap-gutter py-12 md:min-h-[80vh] md:grid-cols-2 md:py-24">
          <div className="z-10 flex max-w-xl flex-col gap-6">
            <h1 className="text-display-sm text-primary md:text-display-lg">
              Turn Your Memories Into Something You Can Keep.
            </h1>
            <p className="max-w-md text-body-lg text-on-surface-variant">
              Create personalized gifts from your favorite photos, names, and memories. Thoughtfully
              crafted for the moments that matter.
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/customize"
                className="hover-lift rounded-lg bg-primary px-8 py-4 text-center text-label-lg text-on-primary transition-colors duration-300 hover:bg-inverse-surface"
              >
                Create Your Gift
              </Link>
              <Link
                to="/shop"
                className="hover-lift rounded-lg border border-primary px-8 py-4 text-center text-label-lg text-primary transition-colors duration-300 hover:bg-surface-low"
              >
                Explore Products
              </Link>
            </div>
          </div>
          <div className="group relative h-[500px] w-full overflow-hidden rounded-2xl shadow-soft md:h-[700px]">
            <img
              alt="Framed personalized poster in a sunlit studio"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={images.hero}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </section>

        {/* Curated Collections */}
        <section id="shop" className="page-x mx-auto max-w-page py-section">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-headline-lg text-primary">Curated Collections</h2>
          </div>
          <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              to="/shop"
              className="hover-lift group relative overflow-hidden rounded-2xl bg-surface-low md:col-span-2 md:row-span-2"
            >
              <img alt="Personalized posters" src={images.poster} className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-primary-container/20 to-transparent" />
              <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-8">
                <h3 className="text-headline-md text-surface-lowest">Personalized Posters</h3>
                <span className="flex items-center gap-1 text-label-lg text-secondary-fixed transition-all group-hover:gap-2">
                  Explore <Icon name="arrow_forward" className="text-sm" />
                </span>
              </div>
            </Link>

            <Link to="/shop" className="hover-lift group relative overflow-hidden rounded-2xl bg-surface-low">
              <img alt="Custom mugs" src={images.mug} className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent" />
              <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-6">
                <h3 className="text-headline-md text-surface-lowest">Custom Mugs</h3>
                <span className="flex items-center gap-1 text-label-sm text-secondary-fixed">
                  Explore <Icon name="arrow_forward" className="text-[16px]" />
                </span>
              </div>
            </Link>

            <Link to="/shop" className="hover-lift group relative overflow-hidden rounded-2xl bg-surface-low">
              <img alt="Phone cases" src={images.phoneCase} className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/70 to-transparent" />
              <div className="absolute bottom-0 left-0 flex flex-col gap-1 p-6">
                <h3 className="text-headline-md text-surface-lowest">Phone Cases</h3>
                <span className="flex items-center gap-1 text-label-sm text-secondary-fixed">
                  Explore <Icon name="arrow_forward" className="text-[16px]" />
                </span>
              </div>
            </Link>

            <Link to="/occasions" className="hover-lift group relative h-[300px] overflow-hidden rounded-2xl bg-surface-low md:col-span-3">
              <img alt="Graduation gifts" src={images.tee} className="absolute inset-0 h-full w-full object-cover object-center opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container/80 via-primary-container/40 to-transparent" />
              <div className="absolute bottom-0 left-0 flex h-full max-w-lg flex-col justify-center gap-2 p-8">
                <h3 className="text-headline-md text-surface-lowest">Graduation Gifts</h3>
                <p className="mb-2 text-body-md text-surface-lowest/80">
                  Celebrate their milestones with something truly unique.
                </p>
                <span className="flex w-max items-center gap-1 text-label-lg text-secondary-fixed transition-all group-hover:gap-2">
                  Explore <Icon name="arrow_forward" className="text-sm" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-surface-low py-section">
          <div className="page-x mx-auto max-w-page text-center">
            <h2 className="mb-16 text-headline-lg text-primary">The Art of Giving, Simplified.</h2>
            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="absolute top-12 right-[16%] left-[16%] hidden h-px bg-outline-variant/30 md:block" />
              {[
                {
                  n: "01",
                  t: "Upload",
                  d: "Select your favorite moments from your camera roll or social media.",
                },
                {
                  n: "02",
                  t: "Customize",
                  d: "Add names, dates, or heartfelt messages using our live preview engine.",
                },
                {
                  n: "03",
                  t: "Make It Yours",
                  d: "We craft your memory with premium materials and deliver it to your door.",
                },
              ].map((s) => (
                <div key={s.n} className="relative z-10 flex flex-col items-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-outline-variant/10 bg-surface-lowest text-display-lg text-secondary shadow-soft">
                    {s.n}
                  </div>
                  <h3 className="mb-3 text-headline-md text-primary">{s.t}</h3>
                  <p className="max-w-xs text-center text-body-md text-on-surface-variant">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="page-x mx-auto max-w-page py-section">
          <div className="mb-12 flex items-end justify-between border-b border-outline-variant/10 pb-6">
            <h2 className="text-headline-lg text-primary">Featured Memories</h2>
            <Link to="/shop" className="hidden text-label-lg text-secondary transition-colors hover:text-secondary-container sm:block">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <div key={p.name} className="group flex flex-col overflow-hidden rounded-2xl bg-surface-lowest shadow-soft hover-lift">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-variant">
                  <img alt={p.name} src={p.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <button
                    type="button"
                    aria-label={`Save ${p.name}`}
                    className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface-lowest/80 text-on-surface-variant backdrop-blur transition-colors hover:text-error"
                  >
                    <Icon name="favorite" className="text-[20px]" />
                  </button>
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <Stars rating={p.rating} />
                  <h3 className="mb-1 text-body-md font-bold text-primary">{p.name}</h3>
                  <p className="mb-4 text-body-md text-on-surface-variant">{p.price}</p>
                  <div className="mt-auto">
                    <Link
                      to="/customize"
                      className="block w-full translate-y-2 rounded-lg bg-accent py-3 text-center text-label-lg text-on-accent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-secondary"
                    >
                      Customize
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-outline-variant/10 bg-surface-highest/40 py-24">
          <div className="page-x mx-auto max-w-3xl text-center">
            <Icon name="favorite" filled className="mb-6 block text-4xl text-secondary" />
            <h2 className="mb-6 text-display-sm text-primary md:text-display-lg">
              Your memory deserves more than a camera roll.
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-body-lg text-on-surface-variant">
              Bring your digital moments into the physical world. Crafted with care, meant to last
              forever.
            </p>
            <Link
              to="/customize"
              className="hover-lift inline-block rounded-lg bg-primary px-10 py-4 text-label-lg text-on-primary shadow-soft transition-colors duration-300 hover:bg-inverse-surface"
            >
              Create Your Gift
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
