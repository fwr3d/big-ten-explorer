"use client";

import { motion } from "framer-motion";

// TODO: Replace with real data fetched from /lib/api.ts
const SCHOOLS = [
  { name: "Michigan",       initials: "UM",  color: "#00274C" },
  { name: "Michigan State", initials: "MSU", color: "#18453B" },
  { name: "Ohio State",     initials: "OSU", color: "#BB0000" },
  { name: "Penn State",     initials: "PSU", color: "#002D62" },
  { name: "Indiana",        initials: "IU",  color: "#990000" },
  { name: "Purdue",         initials: "PU",  color: "#B07C2C" },
  { name: "Northwestern",   initials: "NU",  color: "#4E2A84" },
  { name: "Illinois",       initials: "ILL", color: "#E84A27" },
  { name: "Wisconsin",      initials: "UW",  color: "#C5050C" },
  { name: "Minnesota",      initials: "UMN", color: "#7A0019" },
  { name: "Iowa",           initials: "UI",  color: "#C8A800" },
  { name: "Nebraska",       initials: "UNL", color: "#E41C38" },
  { name: "Rutgers",        initials: "RU",  color: "#CC0033" },
  { name: "Maryland",       initials: "UMD", color: "#E03A3E" },
  { name: "USC",            initials: "USC", color: "#990000" },
  { name: "UCLA",           initials: "UCLA",color: "#2774AE" },
  { name: "Oregon",         initials: "UO",  color: "#007030" },
  { name: "Washington",     initials: "UW",  color: "#4B2E83" },
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
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
            Big{" "}
            <span style={{ color: "#3b82f6" }}>Ten</span>{" "}
            Explorer
          </h1>
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
              whileHover={{
                y: -4,
                boxShadow: "0 0 0 2px #3b82f6, 0 8px 24px rgba(59,130,246,0.12)",
              }}
              className="flex flex-col items-center gap-3 rounded-2xl p-5 cursor-pointer"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
            >
              {/* Initials avatar */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                style={{ backgroundColor: school.color }}
              >
                {school.initials}
              </div>
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
