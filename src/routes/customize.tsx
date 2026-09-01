import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { images } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "Customize Your Gift | MEMENTO" },
      {
        name: "description",
        content:
          "Upload a photo, add a name, date and message, then watch your personalized frame come together in a live preview.",
      },
      { property: "og:title", content: "Customize Your Gift | MEMENTO" },
      {
        property: "og:description",
        content: "Design a personalized keepsake frame step by step with a live preview.",
      },
      { property: "og:image", content: images.framePreview },
      { name: "twitter:image", content: images.framePreview },
    ],
  }),
  component: CustomizePage,
});

const styles = [
  { label: "Minimal", swatch: "bg-surface-lowest" },
  { label: "Classic", swatch: "bg-surface-high" },
  { label: "Bold", swatch: "bg-primary" },
];

function CustomizePage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [style, setStyle] = useState("Minimal");
  const [photo, setPhoto] = useState<string | null>(null);

  const formattedDate = (() => {
    if (!date) return "October 14, 2023";
    const d = new Date(date);
    return Number.isNaN(d.getTime())
      ? "October 14, 2023"
      : d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  })();

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="page-x mx-auto grid w-full max-w-page flex-grow grid-cols-1 gap-gutter py-12 lg:grid-cols-12 md:py-20">
        {/* Inputs */}
        <section className="flex flex-col space-y-8 lg:col-span-5">
          <div>
            <h1 className="mb-2 text-headline-lg text-primary">Personalize Your Frame</h1>
            <p className="text-body-md text-on-surface-variant">
              Create a timeless memory. Every detail matters.
            </p>
          </div>

          <div className="rounded-xl bg-surface-lowest p-6 shadow-soft">
            <h2 className="mb-4 flex items-center text-label-lg text-primary">
              <Icon name="image" className="mr-2" /> Step 1: Upload Photo
            </h2>
            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-outline-variant/30 bg-surface-low p-8 text-center transition-colors hover:border-secondary">
              <Icon
                name="cloud_upload"
                className="mb-2 text-4xl text-outline transition-colors group-hover:text-secondary"
              />
              <p className="mb-1 text-body-md text-on-surface-variant">
                Drag and drop your photo here
              </p>
              <p className="text-label-sm text-outline">or click to browse files (JPEG, PNG)</p>
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPhoto(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          <div className="rounded-xl bg-surface-lowest p-6 shadow-soft">
            <h2 className="mb-4 flex items-center text-label-lg text-primary">
              <Icon name="edit_note" className="mr-2" /> Step 2: Personal Message
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="personal-name" className="mb-1 block text-label-sm text-on-surface-variant">
                  Name or Title
                </label>
                <input
                  id="personal-name"
                  type="text"
                  className="field"
                  placeholder="e.g., The Smith Family"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="personal-message" className="mb-1 block text-label-sm text-on-surface-variant">
                  Short Message (Optional)
                </label>
                <textarea
                  id="personal-message"
                  rows={2}
                  className="field resize-none"
                  placeholder="A memory to keep forever..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface-lowest p-6 shadow-soft">
            <h2 className="mb-4 flex items-center text-label-lg text-primary">
              <Icon name="calendar_today" className="mr-2" /> Step 3: Special Date
            </h2>
            <input
              id="special-date"
              type="date"
              aria-label="Special date"
              className="field"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="rounded-xl bg-surface-lowest p-6 shadow-soft">
            <h2 className="mb-4 flex items-center text-label-lg text-primary">
              <Icon name="palette" className="mr-2" /> Step 4: Design Style
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {styles.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setStyle(s.label)}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-lg border p-3 transition-all",
                    style === s.label
                      ? "border-secondary bg-surface-low"
                      : "border-outline/20 bg-surface opacity-70 hover:border-secondary/50 hover:opacity-100",
                  )}
                >
                  <span className={cn("mb-2 block h-6 w-6 rounded-full border border-outline/20", s.swatch)} />
                  <span className="text-label-sm text-primary">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 z-10 flex items-center justify-between border-t border-outline/10 bg-background py-4">
            <div className="flex flex-col">
              <span className="text-label-sm text-on-surface-variant">Total Price</span>
              <span className="text-headline-md font-semibold text-primary">12.500 KD</span>
            </div>
            <Link
              to="/checkout"
              className="hover-lift flex items-center rounded-lg bg-accent px-8 py-4 text-label-lg text-on-accent shadow-soft transition-colors hover:bg-secondary-container"
            >
              Add to Cart <Icon name="arrow_forward" className="ml-2 text-sm" />
            </Link>
          </div>
        </section>

        {/* Live preview */}
        <section className="relative mt-8 flex h-[600px] items-center justify-center overflow-hidden rounded-2xl border border-outline/10 bg-surface-low shadow-soft lg:col-span-7 lg:mt-0 lg:h-auto">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${images.room}')` }}
          />
          <div className="relative z-10 w-full max-w-lg p-8">
            <div className="relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-xl border border-outline/5 bg-surface-lowest p-4 shadow-soft">
              <div className="relative mb-4 flex-grow overflow-hidden rounded-lg bg-surface-low">
                <img
                  alt="Selected photo preview"
                  src={photo ?? images.framePreview}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pb-2 text-center">
                <p className="text-headline-md tracking-tight text-primary">
                  {name || "The Smith Family"}
                </p>
                <p className="mt-1 text-label-sm tracking-widest text-secondary uppercase">
                  {formattedDate}
                </p>
                <p className="mt-2 text-label-sm italic text-on-surface-variant">
                  {message || "A memory to keep forever..."}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex items-center space-x-2 rounded-full border border-outline/10 bg-surface-lowest/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
              <Icon name="visibility" className="text-sm text-secondary" />
              <span className="text-label-sm text-primary">Live Preview</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
