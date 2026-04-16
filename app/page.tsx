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
      className="min-h-screen flex flex-col items-center px-6 py-20"
      style={{ backgroundColor: "#f8f9fb", color: "#0f172a" }}
    >
      <div className="w-full max-w-5xl flex flex-col items-center gap-10">

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "#3b82f6" }}
        >
          Conference Explorer
        </motion.p>

        {/* Headline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.08 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="flex items-center justify-center gap-4">
            <img
              src={`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent("Big_Ten_Conference_logo.svg")}?width=80`}
              alt="Big Ten Conference logo"
              className="h-12 w-auto object-contain"
            />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
              Big{" "}
              <span style={{ color: "#3b82f6" }}>Ten</span>{" "}
              Explorer
            </h1>
          </div>
          <p
            className="mt-4 text-lg max-w-md mx-auto leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            Browse universities, compare colleges, and explore programs
            across the Big Ten Conference.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.16 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-14"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold" style={{ color: "#0f172a" }}>
                {stat.value}
              </span>
              <span className="text-sm" style={{ color: "#94a3b8" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full" style={{ borderTop: "1px solid #e2e8f0" }} />

        {/* School cards grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SCHOOLS.map((school, i) => (
            <motion.div
              key={school.name}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.35, delay: 0.24 + i * 0.04 }}
              className="flex flex-col items-center gap-3 p-3 cursor-pointer"
            >
              {/* School logo via Wikimedia Commons */}
              <img
                src={school.logo}
                alt={`${school.name} logo`}
                className="w-12 h-12 object-contain"
              />
              {/* School name */}
              <span
                className="text-xs font-medium text-center leading-tight"
                style={{ color: "#0f172a" }}
              >
                {school.name}
              </span>
              {/* TODO: Link to /schools/[id] page */}
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4, delay: 0.24 + SCHOOLS.length * 0.04 }}
          className="flex flex-col sm:flex-row gap-3 mt-2"
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
            className="px-7 py-3 rounded-full text-sm font-semibold transition-colors hover:bg-blue-50"
            style={{
              border: "1px solid #e2e8f0",
              color: "#0f172a",
              backgroundColor: "#ffffff",
            }}
          >
            Compare schools
          </button>
        </motion.div>

      </div>
    </main>
  );
}
