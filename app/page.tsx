"use client";

import { motion } from "framer-motion";

// TODO: Replace with real data fetched from /lib/api.ts
// Logos: Wikimedia Commons where available, ESPN CDN fallback where Wikimedia lacks the actual athletic mark
const WIKI_LOGO = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=200`;
const ESPN_LOGO = (id: number) =>
  `https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`;

const SCHOOLS = [
  { name: "Michigan",       logo: WIKI_LOGO("Michigan_Wolverines_logo.svg")     },
  { name: "Michigan State", logo: ESPN_LOGO(127)                                 }, // no Spartan head on Wikimedia
  { name: "Ohio State",     logo: WIKI_LOGO("Ohio_State_Buckeyes_logo.svg")     },
  { name: "Penn State",     logo: ESPN_LOGO(213)                                 }, // only wordmarks on Wikimedia
  { name: "Indiana",        logo: WIKI_LOGO("Indiana_Hoosiers_logo.svg")        },
  { name: "Purdue",         logo: WIKI_LOGO("Purdue_Boilermakers_logo.svg")     },
  { name: "Northwestern",   logo: WIKI_LOGO("Northwestern_Wildcats_logo.svg")   },
  { name: "Illinois",       logo: WIKI_LOGO("Illinois_Fighting_Illini_logo.svg") },
  { name: "Wisconsin",      logo: WIKI_LOGO("Wisconsin_Badgers_logo.svg")       },
  { name: "Minnesota",      logo: WIKI_LOGO("Minnesota_Golden_Gophers_logo.svg") },
  { name: "Iowa",           logo: ESPN_LOGO(2294)                                }, // Hawkeye_Logo.svg is Marvel/Disney+
  { name: "Nebraska",       logo: WIKI_LOGO("Nebraska_Cornhuskers_logo.svg")    },
  { name: "Rutgers",        logo: WIKI_LOGO("Rutgers_Scarlet_Knights_logo.svg") },
  { name: "Maryland",       logo: WIKI_LOGO("Maryland_Terrapins_logo.svg")      },
  { name: "USC",            logo: WIKI_LOGO("USC_Trojans_logo.svg")             },
  { name: "UCLA",           logo: WIKI_LOGO("UCLA_Bruins_logo.svg")             },
  { name: "Oregon",         logo: WIKI_LOGO("Oregon_Ducks_logo.svg")            },
  { name: "Washington",     logo: WIKI_LOGO("Washington_Huskies_logo.svg")      },
];

const STATS = [
  { value: "18",    label: "Universities" },
  { value: "200+",  label: "Colleges" },
  { value: "900K+", label: "Students" },
  { value: "14",    label: "States" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center py-20"
      style={{ backgroundColor: "#f8f9fb", color: "#0f172a" }}
    >
      <div className="w-full max-w-5xl flex flex-col items-center gap-12 px-6">

        {/* Eyebrow pill */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
          style={{ backgroundColor: "#e0eaff", color: "#3b82f6" }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#3b82f6" }} />
          2024–25 Season
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.08 }}
          className="flex flex-col items-center text-center gap-5"
        >
          <h1 className="flex items-center justify-center gap-5 text-6xl sm:text-7xl font-black tracking-tighter leading-none">
            <img
              src={`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent("Big_Ten_Conference_logo.svg")}?width=200`}
              alt="Big Ten Conference logo"
              className="h-14 sm:h-16 w-auto object-contain"
            />
            Explorer
          </h1>
          <p
            className="text-base sm:text-lg max-w-sm mx-auto leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            18 universities. 900,000+ students. One conference.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.16 }}
          className="flex flex-wrap justify-center gap-10 sm:gap-16"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black tracking-tight" style={{ color: "#0f172a" }}>
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "#cbd5e1" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* School marquee — full bleed with tinted background */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.4, delay: 0.24 }}
        className="w-full py-10 mt-8"
        style={{ backgroundColor: "#f1f5f9" }}
      >
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {/* Duplicate schools for seamless loop */}
          <div
            className="flex gap-12"
            style={{ animation: "marquee 35s linear infinite", width: "max-content" }}
          >
            {[...SCHOOLS, ...SCHOOLS].map((school, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 cursor-pointer"
                style={{ width: "88px" }}
              >
                {/* TODO: Link to /schools/[id] page */}
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  className="w-20 h-20 object-contain"
                />
                <span
                  className="text-xs font-medium text-center leading-tight"
                  style={{ color: "#64748b" }}
                >
                  {school.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-5xl flex flex-col items-center px-6">

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 mt-8"
        >
          {/* TODO: Link to /schools */}
          <button
            className="px-7 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#0f172a" }}
          >
            Explore all schools
          </button>
          {/* TODO: Link to /compare */}
          <button
            className="px-7 py-3 rounded-full text-sm font-semibold transition-colors hover:opacity-80"
            style={{
              border: "1px solid #e2e8f0",
              color: "#0f172a",
              backgroundColor: "#e9edf2",
            }}
          >
            Compare schools
          </button>
        </motion.div>

      </div>
    </main>
  );
}
