import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const selectedWorks = [
  {
    id: 1,
    title: "Serene Portrait",
    medium: "Graphite Sketch",
    src: "/assets/generated/gallery-portrait-1.dim_600x750.jpg",
  },
  {
    id: 2,
    title: "Lake Reflections",
    medium: "Watercolor",
    src: "/assets/generated/gallery-watercolor-1.dim_600x500.jpg",
  },
  {
    id: 3,
    title: "Elder's Gaze",
    medium: "Oil on Canvas",
    src: "/assets/generated/gallery-oil-1.dim_600x700.jpg",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0 0) 0%, oklch(0.38 0 0) 100%)",
        }}
        data-ocid="home.section"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-white z-10"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[oklch(0.70_0_0)] mb-4 font-sans">
              Fine Art &amp; Illustration
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Where Every Stroke Tells a Story
            </h1>
            <p className="font-sans text-[oklch(0.75_0_0)] text-lg leading-relaxed mb-10 max-w-md">
              Original sketches &amp; commissioned artwork by Pooja Rathore
              &mdash; from intimate portraits to sweeping landscapes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[oklch(0.92_0_0)] text-[oklch(0.16_0_0)] font-sans text-sm font-semibold tracking-wider uppercase hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
                data-ocid="home.primary_button"
              >
                View Gallery <ArrowRight size={15} />
              </Link>
              <Link
                to="/commissions"
                className="inline-flex items-center gap-2 px-7 py-3 border border-[oklch(0.60_0_0)] text-[oklch(0.85_0_0)] font-sans text-sm font-semibold tracking-wider uppercase hover:border-white hover:text-white hover:-translate-y-0.5 transition-all duration-200"
                data-ocid="home.secondary_button"
              >
                Commission a Piece
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-full h-full border border-[oklch(0.40_0_0)]" />
              <img
                src="/assets/generated/hero-sketch.dim_1200x800.jpg"
                alt="Featured portrait sketch"
                className="relative w-full h-auto object-cover shadow-2xl"
                style={{ maxHeight: 420 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "500+", label: "Artworks Created" },
            { value: "6+", label: "Years of Practice" },
            { value: "100%", label: "Handcrafted" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="font-sans text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Works */}
      <section
        className="max-w-7xl mx-auto px-6 lg:px-12 py-20"
        data-ocid="home.section"
      >
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-sans mb-2">
            Portfolio
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
            Selected Works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {selectedWorks.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="gallery-card"
              data-ocid={`home.item.${i + 1}`}
            >
              <img
                src={work.src}
                alt={work.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <div className="font-serif text-sm font-semibold text-foreground">
                  {work.title}
                </div>
                <div className="font-sans text-xs text-muted-foreground mt-1">
                  {work.medium}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 border border-foreground text-foreground font-sans text-sm font-semibold tracking-wider uppercase hover:bg-foreground hover:text-background hover:-translate-y-0.5 transition-all duration-200"
            data-ocid="home.primary_button"
          >
            Explore Full Gallery <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[oklch(0.22_0_0)] text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Commission a Custom Artwork
          </h2>
          <p className="font-sans text-[oklch(0.70_0_0)] mb-8 leading-relaxed">
            Bring your vision to life. Whether it&apos;s a portrait, a
            landscape, or an abstract piece &mdash; Pooja will create something
            uniquely yours.
          </p>
          <Link
            to="/commissions"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[oklch(0.16_0_0)] font-sans text-sm font-semibold tracking-wider uppercase hover:bg-[oklch(0.92_0_0)] hover:-translate-y-0.5 transition-all duration-200"
            data-ocid="home.primary_button"
          >
            Start Your Commission <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
