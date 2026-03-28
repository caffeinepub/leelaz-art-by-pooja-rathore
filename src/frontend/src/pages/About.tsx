import { motion } from "motion/react";

const timeline = [
  { year: "2018", label: "Started sketching professionally" },
  { year: "2020", label: "First solo exhibition" },
  { year: "2022", label: "Launched online commissions" },
  { year: "2024", label: "500+ artworks created" },
];

const skills = [
  "Graphite",
  "Watercolor",
  "Oil Painting",
  "Acrylic",
  "Ink",
  "Charcoal",
  "Pastel",
  "Digital Sketch",
];

const recentWork = [
  {
    src: "/assets/generated/gallery-portrait-1.dim_600x750.jpg",
    alt: "Portrait sketch",
  },
  {
    src: "/assets/generated/gallery-watercolor-1.dim_600x500.jpg",
    alt: "Watercolor painting",
  },
  {
    src: "/assets/generated/gallery-oil-1.dim_600x700.jpg",
    alt: "Oil painting",
  },
  {
    src: "/assets/generated/gallery-acrylic-1.dim_600x550.jpg",
    alt: "Acrylic painting",
  },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-sans mb-2">
          The Artist
        </p>
        <h1 className="font-serif text-4xl font-bold text-foreground">
          About Pooja Rathore
        </h1>
        <div className="w-12 h-px bg-foreground mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
        {/* Left: Bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-6 mb-8">
            <img
              src="/assets/generated/artist-avatar.dim_300x300.jpg"
              alt="Pooja Rathore"
              className="w-24 h-24 rounded-full object-cover border border-border flex-shrink-0"
            />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Pooja Rathore
              </h2>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                Self-taught Fine Artist · India
              </p>
            </div>
          </div>
          <p className="font-sans text-[oklch(0.40_0_0)] leading-relaxed text-base mb-6">
            Pooja Rathore is a self-taught artist based in India, specializing
            in graphite portraits, watercolors, and oil paintings. With over 6
            years of experience, she has exhibited at galleries across the
            country and completed hundreds of commissioned works.
          </p>
          <p className="font-sans text-[oklch(0.40_0_0)] leading-relaxed text-base">
            Her art captures the quiet beauty in everyday subjects — from human
            faces to natural landscapes. Every piece is a meditation on form,
            light, and the stories hidden in the details.
          </p>
          <div className="mt-10">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-foreground mb-4">
              Mediums &amp; Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 border border-border font-sans text-xs tracking-wider text-muted-foreground uppercase"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: My Process / Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
            My Process
          </h2>
          <p className="font-sans text-[oklch(0.50_0_0)] leading-relaxed mb-10">
            Each commission begins with a conversation. I study your reference
            material carefully, sketch a rough composition for your approval,
            and then proceed with the final artwork — ensuring every piece feels
            personal and true.
          </p>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block relative mt-12">
            <div className="absolute top-5 left-0 right-0 h-px bg-border" />
            <div className="grid grid-cols-4 gap-4 relative">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-3 h-3 rounded-full bg-foreground mx-auto mb-3 relative z-10" />
                  <div className="font-serif text-sm font-bold text-foreground">
                    {item.year}
                  </div>
                  <div className="font-sans text-xs text-muted-foreground mt-1 leading-snug">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden space-y-6 mt-8 relative pl-8">
            <div className="absolute top-0 bottom-0 left-2 w-px bg-border" />
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-foreground" />
                <div className="font-serif text-sm font-bold text-foreground">
                  {item.year}
                </div>
                <div className="font-sans text-xs text-muted-foreground mt-0.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gallery preview strip */}
      <div className="border-t border-border pt-16">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
          Recent Work
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentWork.map((item) => (
            <div
              key={item.src}
              className="gallery-card aspect-square overflow-hidden"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
