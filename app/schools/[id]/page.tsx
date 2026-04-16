import { fetchUniversityById, getIdBySlug } from "../../../lib/api";
import { University } from "../../../lib/models";
import Link from "next/link";
const statCard = {
  display: "flex",
  flexDirection: "column" as const,
  background: "#fff",
  border: "2px solid #e2e8f0",
  borderRadius: "12px",
  padding: "1.25rem",
  alignItems: "center",
  gap: "4px"
};
const logo = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const
}
const statNum = { fontSize: "22px", fontWeight: 700, color: "#0f172a" };
const statLabel = { fontSize: "11px", color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.06em" };
export default async function SchoolPage({ params }: { params: Promise<{ id: string }> }) {
    const {id: slug} = await params;
    const id = getIdBySlug(slug);

    if(!id) return <div>School not found</div>
    const university = await fetchUniversityById(id)
    if (!university) return <div>School not found</div>;

    return (
<main style={{ backgroundColor: "#f8f9fb", minHeight: "100vh", padding: "3rem 2rem" }}>
    <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center",}}>
      
        <Link href="/schools" style={{ alignSelf: "flex-start", color: "#94a3b8", fontSize: "13px", marginBottom: "2rem" }}>← All Schools</Link>
        <div style={{ width: "300px", height: "300px", background: `${university.color}15`, border: "1px solid #e2e8f0", borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={university.logo} alt = {university.name} style={logo}/>
        </div>
        <h1>{university.name}</h1>
        <span>{university.state} {university.city}</span>
        <span style={{ backgroundColor: university.color, color: "#fff" }}>{university.type}</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", width: "100%", marginTop: "2rem" }}>
            <div style={statCard}>
                <span style={statNum}>{Math.round(university.acceptanceRate*100)}%</span>
                <span style={statLabel}>Acceptance Rate</span>
            </div>
            <div style={statCard}>
                <span style={statNum}>{Math.round(university.graduationRate*100)}%</span>
                <span style={statLabel}>Graduation Rate</span>
            </div>
            <div style={statCard}>
                <span style={statNum}>{university.enrollment.toLocaleString()}</span>
                <span style={statLabel}> Students</span>
            </div>
            <div style={statCard}>
                <span style={statNum}>${university.inStateTuition.toLocaleString()}</span>
                <span style={statLabel}> In State Tuition</span>
            </div>
            <div style={statCard}>
                <span style={statNum}>${university.outOfStateTuition.toLocaleString()}</span>
                <span style={statLabel}> Out of State Tuition</span>
            </div>
            
            <div style={statCard}>
                <span style={statNum}>{university.region.toLocaleString()}</span>
                <span style={statLabel}>Region</span>
            </div>
        </div>
        <div>
            <Link 
  href={`/compare?school1=${university.slug}`}
  style={{ marginTop: "1.5rem", padding: "12px 32px", borderRadius: "8px", background: "#0f172a", color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
>
  Compare this school
</Link>
        </div>
    </div>
</main>
    );
}