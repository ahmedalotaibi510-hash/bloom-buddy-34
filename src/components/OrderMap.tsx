import * as maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";

import "maplibre-gl/dist/maplibre-gl.css";

const MAPTILER_KEY = "Bfiz7qEt41E8T1bU2Jgu";

export type LngLat = [number, number];

type Props = {
  /** Delivery route, from the workshop to the customer. */
  path: LngLat[];
  /** Progress along the route, 0 to 1. */
  progress: number;
};

export default function OrderMap({ path, progress }: Props) {
  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const courier = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    const start = path[0];
    const end = path[path.length - 1];
    const mid = path[Math.floor(path.length / 2)];
    if (!container.current || map.current || !start || !end || !mid) return;

    const m = new maplibregl.Map({
      container: container.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
      center: mid,
      zoom: 11.5,
      attributionControl: { compact: true },
    });
    map.current = m;
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    m.on("load", () => {
      m.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: path },
        },
      });
      m.addLayer({
        id: "route-casing",
        type: "line",
        source: "route",
        paint: { "line-color": "#ffffff", "line-width": 9, "line-opacity": 0.9 },
        layout: { "line-cap": "round", "line-join": "round" },
      });
      m.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: { "line-color": "#b4552f", "line-width": 5 },
        layout: { "line-cap": "round", "line-join": "round" },
      });

      const pin = (label: string, color: string) => {
        const el = document.createElement("div");
        el.className =
          "rounded-full border-2 border-white px-3 py-1 text-[11px] font-bold text-white shadow-lg";
        el.style.background = color;
        el.textContent = label;
        return el;
      };

      new maplibregl.Marker({ element: pin("Workshop", "#3f3a35") })
        .setLngLat(start)
        .addTo(m);
      new maplibregl.Marker({ element: pin("You", "#b4552f") })
        .setLngLat(end)
        .addTo(m);

      const truck = document.createElement("div");
      truck.setAttribute("aria-label", "Courier location");
      truck.className =
        "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#1f6f5c] text-white shadow-xl";
      truck.innerHTML =
        '<span class="material-symbols-outlined" style="font-size:20px">local_shipping</span>';
      courier.current = new maplibregl.Marker({ element: truck })
        .setLngLat(start)
        .addTo(m);

      const bounds = path.reduce(
        (b, p) => b.extend(p),
        new maplibregl.LngLatBounds(start, start),
      );
      m.fitBounds(bounds, { padding: 70, duration: 0 });
    });

    return () => {
      m.remove();
      map.current = null;
      courier.current = null;
    };
  }, [path]);

  useEffect(() => {
    if (!courier.current) return;
    const clamped = Math.min(Math.max(progress, 0), 1);
    const i = clamped * (path.length - 1);
    const a = path[Math.floor(i)] ?? path[0];
    const b = path[Math.min(Math.ceil(i), path.length - 1)] ?? path[0];
    if (!a || !b) return;
    const t = i - Math.floor(i);
    courier.current.setLngLat([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }, [progress, path]);

  return <div ref={container} className="h-full w-full" />;
}
