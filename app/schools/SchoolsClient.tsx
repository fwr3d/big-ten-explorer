"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { University } from "../../lib/models"

interface Props {
    schools: University[];
}



type Region = "Midwest" | "East" | "West";
type Size   = "Small" | "Medium" | "Large";
type Type   = "Public" | "Private";





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
function getSize(enrollment: number): Size {
    if(enrollment < 15000)
    {
        return "Small";
    }
    if (enrollment < 35000)
    {
        return "Medium";
    }
    return "Large";
}
export default function SchoolsClient({ schools }:Props) {
  const [search,    setSearch]    = useState("");
  const [region,    setRegion]    = useState<"All" | Region>("All");
  const [size,      setSize]      = useState<"All" | Size>("All");
  const [type,      setType]      = useState<"All" | Type>("All");

  const filtered = schools.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (region !== "All" && s.region !== region) return false;
    if (size   !== "All" && getSize(s.enrollment)   !== size)   return false;
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
            {filtered.length} of {schools.length}
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
              <Link href={`/schools/${school.slug}`}>
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
              </Link>
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
