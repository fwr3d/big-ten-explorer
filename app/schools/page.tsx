"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// TODO: Replace with real data from /lib/api.ts + College Scorecard API
const WIKI_LOGO = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=200`;
const ESPN_LOGO = (id: number) =>
  `https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`;

type Region = "Midwest" | "East" | "West";
type Size   = "Small" | "Medium" | "Large";
type Type   = "Public" | "Private";

interface School {
  id: string;
  name: string;
  logo: string;
  state: string;
  region: Region;
  type: Type;
  enrollment: number;
  size: Size;
  color: string;
}

const SCHOOLS: School[] = [
  { id: "michigan",       name: "Michigan",       logo: WIKI_LOGO("Michigan_Wolverines_logo.svg"),          state: "Michigan",      region: "Midwest", type: "Public",  enrollment: 47907, size: "Large",  color: "#00274C" },
  { id: "michigan-state", name: "Michigan State", logo: ESPN_LOGO(127),                                      state: "Michigan",      region: "Midwest", type: "Public",  enrollment: 50019, size: "Large",  color: "#18453B" },
  { id: "ohio-state",     name: "Ohio State",     logo: WIKI_LOGO("Ohio_State_Buckeyes_logo.svg"),           state: "Ohio",          region: "Midwest", type: "Public",  enrollment: 61391, size: "Large",  color: "#BB0000" },
  { id: "penn-state",     name: "Penn State",     logo: ESPN_LOGO(213),                                      state: "Pennsylvania",  region: "East",    type: "Public",  enrollment: 46274, size: "Large",  color: "#002D62" },
  { id: "indiana",        name: "Indiana",        logo: WIKI_LOGO("Indiana_Hoosiers_logo.svg"),              state: "Indiana",       region: "Midwest", type: "Public",  enrollment: 43710, size: "Large",  color: "#990000" },
  { id: "purdue",         name: "Purdue",         logo: WIKI_LOGO("Purdue_Boilermakers_logo.svg"),           state: "Indiana",       region: "Midwest", type: "Public",  enrollment: 50090, size: "Large",  color: "#B07C2C" },
  { id: "northwestern",   name: "Northwestern",   logo: WIKI_LOGO("Northwestern_Wildcats_logo.svg"),         state: "Illinois",      region: "Midwest", type: "Private", enrollment: 8285,  size: "Small",  color: "#4E2A84" },
  { id: "illinois",       name: "Illinois",       logo: WIKI_LOGO("Illinois_Fighting_Illini_logo.svg"),      state: "Illinois",      region: "Midwest", type: "Public",  enrollment: 56916, size: "Large",  color: "#E84A27" },
  { id: "wisconsin",      name: "Wisconsin",      logo: WIKI_LOGO("Wisconsin_Badgers_logo.svg"),             state: "Wisconsin",     region: "Midwest", type: "Public",  enrollment: 44411, size: "Large",  color: "#C5050C" },
  { id: "minnesota",      name: "Minnesota",      logo: WIKI_LOGO("Minnesota_Golden_Gophers_logo.svg"),      state: "Minnesota",     region: "Midwest", type: "Public",  enrollment: 54000, size: "Large",  color: "#7A0019" },
  { id: "iowa",           name: "Iowa",           logo: ESPN_LOGO(2294),                                     state: "Iowa",          region: "Midwest", type: "Public",  enrollment: 30015, size: "Medium", color: "#C8A800" },
  { id: "nebraska",       name: "Nebraska",       logo: WIKI_LOGO("Nebraska_Cornhuskers_logo.svg"),          state: "Nebraska",      region: "Midwest", type: "Public",  enrollment: 25000, size: "Medium", color: "#E41C38" },
  { id: "rutgers",        name: "Rutgers",        logo: WIKI_LOGO("Rutgers_Scarlet_Knights_logo.svg"),       state: "New Jersey",    region: "East",    type: "Public",  enrollment: 50762, size: "Large",  color: "#CC0033" },
  { id: "maryland",       name: "Maryland",       logo: WIKI_LOGO("Maryland_Terrapins_logo.svg"),            state: "Maryland",      region: "East",    type: "Public",  enrollment: 40521, size: "Large",  color: "#E03A3E" },
  { id: "usc",            name: "USC",            logo: WIKI_LOGO("USC_Trojans_logo.svg"),                   state: "California",    region: "West",    type: "Private", enrollment: 21000, size: "Medium", color: "#990000" },
  { id: "ucla",           name: "UCLA",           logo: WIKI_LOGO("UCLA_Bruins_logo.svg"),                   state: "California",    region: "West",    type: "Public",  enrollment: 45428, size: "Large",  color: "#2774AE" },
  { id: "oregon",         name: "Oregon",         logo: WIKI_LOGO("Oregon_Ducks_logo.svg"),                  state: "Oregon",        region: "West",    type: "Public",  enrollment: 22640, size: "Medium", color: "#007030" },
  { id: "washington",     name: "Washington",     logo: WIKI_LOGO("Washington_Huskies_logo.svg"),            state: "Washington",    region: "West",    type: "Public",  enrollment: 47400, size: "Large",  color: "#4B2E83" },
];

const REGIONS: ("All" | Region)[] = ["All", "Midwest", "East", "West"];
const SIZES:   ("All" | Size)[]   = ["All", "Small", "Medium", "Large"];
const TYPES:   ("All" | Type)[]   = ["All", "Public", "Private"];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0 },
};

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
      style={{
        backgroundColor: active ? "#0f172a" : "#f1f5f9",
        color: active ? "#ffffff" : "#64748b",
      }}
    >
      {label}
    </button>
  );
}

export default function SchoolsPage() {
  const [search,    setSearch]    = useState("");
  const [region,    setRegion]    = useState<"All" | Region>("All");
  const [size,      setSize]      = useState<"All" | Size>("All");
  const [type,      setType]      = useState<"All" | Type>("All");

  const filtered = SCHOOLS.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (region !== "All" && s.region !== region) return false;
    if (size   !== "All" && s.size   !== size)   return false;
    if (type   !== "All" && s.type   !== type)   return false;
    return true;
  });

  return (
    <main className="min-h-screen px-6 py-12" style={{ backgroundColor: "#f8f9fb", color: "#0f172a" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium flex items-center gap-2 transition-opacity hover:opacity-60"
            style={{ color: "#94a3b8" }}
          >
            ← Home
          </Link>
          <h1 className="text-2xl font-black tracking-tight">All Schools</h1>
          <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>
            {filtered.length} of {SCHOOLS.length}
          </span>
        </div>

        {/* Filters */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 p-5 rounded-2xl"
          style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              backgroundColor: "#f8f9fb",
              border: "1px solid #e2e8f0",
              color: "#0f172a",
            }}
          />

          {/* Filter rows */}
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#cbd5e1" }}>Region</span>
              <div className="flex gap-2 flex-wrap">
                {REGIONS.map((r) => (
                  <FilterPill key={r} label={r} active={region === r} onClick={() => setRegion(r)} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#cbd5e1" }}>Size</span>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((s) => (
                  <FilterPill key={s} label={s} active={size === s} onClick={() => setSize(s)} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#cbd5e1" }}>Type</span>
              <div className="flex gap-2 flex-wrap">
                {TYPES.map((t) => (
                  <FilterPill key={t} label={t} active={type === t} onClick={() => setType(t)} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((school, i) => (
            <motion.div
              key={school.id}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              {/* TODO: Link to /schools/[id] detail page */}
              <div
                className="flex flex-col items-center gap-4 p-6 rounded-2xl cursor-pointer group transition-colors"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
              >
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-sm font-bold leading-tight">{school.name}</span>
                  <span className="text-xs" style={{ color: "#94a3b8" }}>{school.state}</span>
                  <div className="flex gap-1.5 mt-1 flex-wrap justify-center">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}
                    >
                      {school.type}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}
                    >
                      {school.enrollment.toLocaleString()} students
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-20" style={{ color: "#94a3b8" }}>
            <span className="text-4xl">🏟️</span>
            <span className="text-sm font-medium">No schools match your filters</span>
          </div>
        )}

      </div>
    </main>
  );
}
