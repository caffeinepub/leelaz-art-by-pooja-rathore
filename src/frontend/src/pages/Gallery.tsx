import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Category =
  | "All"
  | "Acrylic Painting"
  | "Landscapes"
  | "Oil Painting"
  | "Water Color"
  | "Abstract"
  | "Sketches";

const CATEGORIES: Category[] = [
  "All",
  "Acrylic Painting",
  "Landscapes",
  "Oil Painting",
  "Water Color",
  "Abstract",
  "Sketches",
];

const galleryItems = [
  {
    id: 1,
    title: "Serene Portrait",
    medium: "Graphite Sketch",
    category: "Sketches",
    src: "/assets/generated/gallery-portrait-1.dim_600x750.jpg",
  },
  {
    id: 2,
    title: "Mountain Vista",
    medium: "Pencil on Paper",
    category: "Landscapes",
    src: "/assets/generated/gallery-landscape-1.dim_600x450.jpg",
  },
  {
    id: 3,
    title: "Fluid Forms",
    medium: "Ink on Paper",
    category: "Abstract",
    src: "/assets/generated/gallery-abstract-1.dim_600x600.jpg",
  },
  {
    id: 4,
    title: "Lake Reflections",
    medium: "Watercolor",
    category: "Water Color",
    src: "/assets/generated/gallery-watercolor-1.dim_600x500.jpg",
  },
  {
    id: 5,
    title: "Elder's Gaze",
    medium: "Oil on Canvas",
    category: "Oil Painting",
    src: "/assets/generated/gallery-oil-1.dim_600x700.jpg",
  },
  {
    id: 6,
    title: "Bloom",
    medium: "Acrylic on Canvas",
    category: "Acrylic Painting",
    src: "/assets/generated/gallery-acrylic-1.dim_600x550.jpg",
  },
  {
    id: 7,
    title: "The Dreamer",
    medium: "Graphite Sketch",
    category: "Sketches",
    src: "/assets/generated/gallery-portrait-1.dim_600x750.jpg",
  },
  {
    id: 8,
    title: "Forest Path",
    medium: "Pencil Sketch",
    category: "Landscapes",
    src: "/assets/generated/gallery-landscape-1.dim_600x450.jpg",
  },
  {
    id: 9,
    title: "Movement Study",
    medium: "Ink Abstract",
    category: "Abstract",
    src: "/assets/generated/gallery-abstract-1.dim_600x600.jpg",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-sans mb-2">
          Portfolio
        </p>
        <h1 className="font-serif text-4xl font-bold text-foreground">
          Portfolio Gallery
        </h1>
        <div className="w-12 h-px bg-foreground mx-auto mt-4" />
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-sans font-medium tracking-wider uppercase transition-all duration-200 ${
              activeCategory === cat
                ? "bg-foreground text-background"
                : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
            data-ocid="gallery.tab"
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="masonry-grid"
        >
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="masonry-item gallery-card"
              data-ocid={`gallery.item.${i + 1}`}
            >
              <div className="overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="font-serif text-sm font-semibold text-foreground">
                  {item.title}
                </div>
                <div className="font-sans text-xs text-muted-foreground mt-0.5">
                  {item.medium}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div
          className="text-center py-24 text-muted-foreground"
          data-ocid="gallery.empty_state"
        >
          <p className="font-serif text-xl">No works found in this category.</p>
        </div>
      )}
    </div>
  );
}
