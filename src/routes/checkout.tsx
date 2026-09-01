import { createFileRoute } from "@tanstack/react-router";

import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { images } from "@/lib/catalog";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | MEMENTO" },
      {
        name: "description",
        content:
          "Review your personalized keepsakes, enter shipping details and complete your MEMENTO order securely.",
      },
      { property: "og:title", content: "Secure Checkout | MEMENTO" },
      {
        property: "og:description",
        content: "Making this moment last — complete your personalized gift order.",
      },
    ],
  }),
  component: CheckoutPage,
});

const cart = [
  {
    name: "Heritage Leather Album",
    image: images.album,
    details: ["Color: Warm Tan", 'Engraving: "Emma & James"'],
    price: "45.000 KD",
  },
  {
    name: "Walnut Keepsake Box",
    image: images.keepsakeBox,
    details: ["Material: Dark Walnut", "Inlay: Copper"],
    price: "32.500 KD",
  },
];

function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="page-x mx-auto max-w-page py-12 md:py-24">
        <div className="mb-16 text-center md:text-left">
          <h1 className="mb-4 text-display-sm text-primary md:text-display-lg">Secure Checkout</h1>
          <p className="text-headline-md italic text-on-surface-variant">
            &ldquo;Making this moment last...&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-16">
          <div className="space-y-12 lg:col-span-7">
            <div className="mb-8 flex items-center gap-2 text-label-sm text-on-surface-variant">
              <span className="font-bold text-primary">Cart</span>
              <Icon name="chevron_right" className="text-[16px]" />
              <span className="font-bold text-primary">Shipping</span>
              <Icon name="chevron_right" className="text-[16px]" />
              <span>Payment</span>
            </div>

            <section className="rounded-xl bg-surface-lowest p-6 shadow-soft md:p-8">
              <h2 className="mb-6 text-headline-lg text-primary">Shipping Details</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="First Name" placeholder="Emma" />
                  <Field label="Last Name" placeholder="Thompson" />
                </div>
                <Field label="Address" placeholder="123 Memory Lane" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <Field label="City" placeholder="Kuwait City" />
                  </div>
                  <Field label="Block/Street" placeholder="Blk 4, St 12" />
                </div>
                <Field label="Phone Number" placeholder="+965 9999 9999" type="tel" />
              </form>
            </section>

            <section className="rounded-xl bg-surface-lowest p-6 opacity-60 shadow-soft md:p-8">
              <h2 className="mb-6 flex items-center justify-between text-headline-lg text-primary">
                Payment Method
                <Icon name="lock" className="text-outline-variant" />
              </h2>
              <div className="flex cursor-not-allowed items-center gap-4 rounded-lg border border-outline-variant/20 bg-surface-low p-4">
                <Icon name="credit_card" className="text-primary" />
                <span className="text-body-md text-on-surface-variant">
                  Complete shipping to unlock payment
                </span>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-xl bg-surface-lowest p-6 shadow-soft md:p-8">
              <h2 className="mb-6 text-headline-lg text-primary">Order Summary</h2>
              <div className="mb-8 space-y-6">
                {cart.map((item) => (
                  <div key={item.name} className="flex gap-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface-low">
                      <img alt={item.name} src={item.image} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <h3 className="text-body-md font-bold text-primary">{item.name}</h3>
                        {item.details.map((d) => (
                          <p key={d} className="text-label-sm text-on-surface-variant">
                            {d}
                          </p>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-label-sm text-on-surface-variant">Qty: 1</span>
                        <span className="text-body-md text-primary">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-8 space-y-4 border-t border-outline-variant/10 pt-6">
                <div className="flex justify-between text-body-md text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>77.500 KD</span>
                </div>
                <div className="flex justify-between text-body-md text-on-surface-variant">
                  <span>Shipping</span>
                  <span>2.000 KD</span>
                </div>
                <div className="flex justify-between border-t border-outline-variant/10 pt-4 text-headline-md text-primary">
                  <span>Total</span>
                  <span>79.500 KD</span>
                </div>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-label-lg text-on-primary transition-all duration-300 hover:bg-inverse-surface active:scale-95"
              >
                Continue to Payment
                <Icon name="arrow_forward" className="text-[20px]" />
              </button>

              <div className="mt-6 text-center">
                <p className="flex items-center justify-center gap-1 text-label-sm text-on-surface-variant">
                  <Icon name="verified_user" className="text-[16px]" /> Secure SSL Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-label-sm text-on-surface-variant">
        {label}
        <input type={type} placeholder={placeholder} className="field mt-2" />
      </label>
    </div>
  );
}
