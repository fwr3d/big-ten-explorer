// Data models based on the College Scorecard API response shape
// Docs: https://api.data.gov/ed/collegescorecard/v1/

export interface University {
  id: number;
  name: string;
  slug: string;
  state: string;
  city: string;
  type: "Public" | "Private";
  enrollment: number;
  inStateTuition: number;
  outOfStateTuition: number;
  acceptanceRate: number;   // 0–1 (e.g. 0.23 = 23%)
  graduationRate: number;   // 0–1
  logo: string;             // URL
  color: string;            // Hex, for UI accents
  region: "Midwest" | "East" | "West";
}

export interface College {
  id: string;
  universityId: number;
  name: string;             // e.g. "College of Engineering"
  // TODO: Add fields once you explore the API response (programs, degrees, etc.)
}
