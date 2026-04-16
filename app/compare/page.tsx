import { fetchBigTenUniversities, fetchUniversityById, getIdBySlug } from "../../lib/api";
import Link from "next/link";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ school1?: string; school2?: string }> }) {
  const { school1, school2 } = await searchParams;

  const id1 = getIdBySlug(school1 ?? "");
  if (!id1) return <div>Pick a school to compare</div>;
  const university1 = await fetchUniversityById(id1);
  if (!university1) return <div>School not found</div>;

  const id2 = getIdBySlug(school2 ?? "");
  if (!id2) {
    const allSchools = await fetchBigTenUniversities();
    const others = allSchools.filter(s => s.slug !== school1);
    return (
      <main style={{ background: "#f8f9fb", minHeight: "100vh", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Link href="/schools" style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "2rem", display: "block" }}>← All Schools</Link>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "10px", background: `${university1.color}15`, padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <img src={university1.logo} alt={university1.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>{university1.name}</p>
              <p style={{ fontSize: "13px", color: "#94a3b8" }}>{university1.city}, {university1.state}</p>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "#94a3b8", textAlign: "center", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Now pick a school to compare</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {others.map(school => (
              <Link key={school.slug} href={`/compare?school1=${school1}&school2=${school.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "8px", background: `${school.color}15`, padding: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={school.logo} alt={school.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", textAlign: "center", lineHeight: "1.3" }}>{school.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const university2 = await fetchUniversityById(id2);
  if (!university2) return <div>School not found</div>;

  return (
    <main style={{ background: "#f8f9fb", minHeight: "100vh", padding: "2.5rem 2rem" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <Link href="/schools" style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "2rem", display: "block" }}>← All Schools</Link>
        <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8", textAlign: "center", marginBottom: "2rem" }}>Head to head comparison</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1.5rem", alignItems: "center", marginBottom: "2.5rem" }}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "12px", background: `${university1.color}15`, padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={university1.logo} alt={university1.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", textAlign: "center" }}>{university1.name}</span>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{university1.city}, {university1.state}</span>
            <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 12px", borderRadius: "99px", color: "#fff", background: university1.color }}>{university1.type}</span>
          </div>
          <span style={{ fontSize: "18px", fontWeight: 800, color: "#cbd5e1" }}>VS</span>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "12px", background: `${university2.color}15`, padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={university2.logo} alt={university2.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", textAlign: "center" }}>{university2.name}</span>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{university2.city}, {university2.state}</span>
            <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 12px", borderRadius: "99px", color: "#fff", background: university2.color }}>{university2.type}</span>
          </div>
        </div>
        {[
          { label: "Acceptance", v1: `${Math.round(university1.acceptanceRate * 100)}%`, v2: `${Math.round(university2.acceptanceRate * 100)}%`, lower1: university1.acceptanceRate < university2.acceptanceRate },
          { label: "Graduation", v1: `${Math.round(university1.graduationRate * 100)}%`, v2: `${Math.round(university2.graduationRate * 100)}%`, lower1: university1.graduationRate > university2.graduationRate },
          { label: "Students", v1: university1.enrollment.toLocaleString(), v2: university2.enrollment.toLocaleString(), lower1: false },
          { label: "In-State", v1: `$${university1.inStateTuition.toLocaleString()}`, v2: `$${university2.inStateTuition.toLocaleString()}`, lower1: university1.inStateTuition < university2.inStateTuition },
          { label: "Out-of-State", v1: `$${university1.outOfStateTuition.toLocaleString()}`, v2: `$${university2.outOfStateTuition.toLocaleString()}`, lower1: university1.outOfStateTuition < university2.outOfStateTuition },
        ].map((stat) => (
          <div key={stat.label} style={{ display: "grid", gridTemplateColumns: "1fr 120px 1fr", marginBottom: "8px" }}>
            <div style={{ background: stat.lower1 ? "#f0fdf4" : "#fff", border: `1px solid ${stat.lower1 ? "#86efac" : "#e2e8f0"}`, borderRadius: "10px 0 0 10px", borderRight: "none", padding: "0.9rem 1rem", display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: stat.lower1 ? "#16a34a" : "#0f172a" }}>{stat.v1}</span>
            </div>
            <div style={{ background: "#f8f9fb", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{stat.label}</span>
            </div>
            <div style={{ background: !stat.lower1 ? "#f0fdf4" : "#fff", border: `1px solid ${!stat.lower1 ? "#86efac" : "#e2e8f0"}`, borderRadius: "0 10px 10px 0", borderLeft: "none", padding: "0.9rem 1rem", display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: !stat.lower1 ? "#16a34a" : "#0f172a" }}>{stat.v2}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}