// College Scorecard API
// Docs: https://collegescorecard.ed.gov/data/documentation/
// Base URL: https://api.data.gov/ed/collegescorecard/v1/schools

import { University } from "./models";

const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;
const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

// Static metadata not available from the API (logos, colors, slugs, regions)
const WIKI = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=200`;
const ESPN = (id: number) =>
  `https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`;

const SCHOOL_META: Record<number, { slug: string; logo: string; color: string; region: University["region"] }> = {
  170976: { slug: "michigan",       logo: WIKI("Michigan_Wolverines_logo.svg"),         color: "#00274C", region: "Midwest" },
  171100: { slug: "michigan-state", logo: ESPN(127),                                     color: "#18453B", region: "Midwest" },
  204796: { slug: "ohio-state",     logo: WIKI("Ohio_State_Buckeyes_logo.svg"),          color: "#BB0000", region: "Midwest" },
  214777: { slug: "penn-state",     logo: ESPN(213),                                     color: "#002D62", region: "East"    },
  151351: { slug: "indiana",        logo: WIKI("Indiana_Hoosiers_logo.svg"),             color: "#990000", region: "Midwest" },
  243780: { slug: "purdue",         logo: WIKI("Purdue_Boilermakers_logo.svg"),          color: "#B07C2C", region: "Midwest" },
  147767: { slug: "northwestern",   logo: WIKI("Northwestern_Wildcats_logo.svg"),        color: "#4E2A84", region: "Midwest" },
  145637: { slug: "illinois",       logo: WIKI("Illinois_Fighting_Illini_logo.svg"),     color: "#E84A27", region: "Midwest" },
  240444: { slug: "wisconsin",      logo: WIKI("Wisconsin_Badgers_logo.svg"),            color: "#C5050C", region: "Midwest" },
  174066: { slug: "minnesota",      logo: WIKI("Minnesota_Golden_Gophers_logo.svg"),     color: "#7A0019", region: "Midwest" },
  153658: { slug: "iowa",           logo: ESPN(2294),                                    color: "#C8A800", region: "Midwest" },
  181464: { slug: "nebraska",       logo: WIKI("Nebraska_Cornhuskers_logo.svg"),         color: "#E41C38", region: "Midwest" },
  186380: { slug: "rutgers",        logo: WIKI("Rutgers_Scarlet_Knights_logo.svg"),      color: "#CC0033", region: "East"    },
  163286: { slug: "maryland",       logo: WIKI("Maryland_Terrapins_logo.svg"),           color: "#E03A3E", region: "East"    },
  228723: { slug: "usc",            logo: WIKI("USC_Trojans_logo.svg"),                  color: "#990000", region: "West"    },
  110662: { slug: "ucla",           logo: WIKI("UCLA_Bruins_logo.svg"),                  color: "#2774AE", region: "West"    },
  209551: { slug: "oregon",         logo: WIKI("Oregon_Ducks_logo.svg"),                 color: "#007030", region: "West"    },
  236948: { slug: "washington",     logo: WIKI("Washington_Huskies_logo.svg"),           color: "#4B2E83", region: "West"    },
};

// College Scorecard unit IDs for all 18 Big Ten schools
const BIG_TEN_IDS = Object.keys(SCHOOL_META).map(Number);

// Fields to fetch from the API
const FIELDS = [
  "id",
  "school.name",
  "school.state",
  "school.city",
  "school.ownership",           // 1=Public, 2=Private nonprofit, 3=Private for-profit
  "latest.student.size",
  "latest.cost.tuition.in_state",
  "latest.cost.tuition.out_of_state",
  "latest.admissions.admission_rate.overall",
  "latest.completion.completion_rate_4yr_150nt",
].join(",");
interface ScorecardResult {
  id: number;
  "school.name": string;
  "school.state": string;
  "school.city": string;
  "school.ownership": number;
  "latest.student.size": number;
  "latest.cost.tuition.in_state": number;
  "latest.cost.tuition.out_of_state": number;
  "latest.admissions.admission_rate.overall": number;
  "latest.completion.completion_rate_4yr_150nt": number;
}
export async function fetchBigTenUniversities(): Promise<University[]> {
  if (!API_KEY) throw new Error("COLLEGE_SCORECARD_API_KEY is not set in .env.local");

  const ids = BIG_TEN_IDS.join(",");
  const url = `${BASE_URL}?id=${ids}&fields=${FIELDS}&api_key=${API_KEY}&per_page=20`;

  const res = await fetch(url, { next: { revalidate: 86400 } }); // cache for 24h
  if (!res.ok) throw new Error(`College Scorecard API error: ${res.status}`);

  const json = await res.json();

  // TODO: Map json.results[] to University[] using SCHOOL_META for logo/color/slug/region
  return json.results.map((result: ScorecardResult ) => {
    const meta = SCHOOL_META[result.id];
    return{
      id: result.id,
      name: result["school.name"],
      slug: meta.slug,
      state: result["school.state"],
      city: result["school.city"],
      type: result["school.ownership"] === 1 ? "Public" : "Private",
      enrollment: result["latest.student.size"],
      inStateTuition: result["latest.cost.tuition.in_state"],
      outOfStateTuition: result[  "latest.cost.tuition.out_of_state"],
      acceptanceRate: result["latest.admissions.admission_rate.overall"],
      graduationRate: result["latest.completion.completion_rate_4yr_150nt"],
      logo: meta.logo,
      color: meta.color,
      region: meta.region,
    }
  });
}
export function getIdBySlug(slug: string): number | null {
  for (const [id, meta] of Object.entries(SCHOOL_META)) {
    if (meta.slug === slug) {
      return parseInt(id);
    }
  }
  return null;
}
export async function fetchUniversityById(id: number): Promise<University | null> {
  if (!API_KEY) throw new Error("COLLEGE_SCORECARD_API_KEY is not set in .env.local");

  const url = `${BASE_URL}?id=${id}&fields=${FIELDS}&api_key=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`College Scorecard API error: ${res.status}`);

  const json = await res.json();
  const result = json.results[0];
  if(!result) return null
  const meta = SCHOOL_META[result.id];
  return {
      id: result.id,
      name: result["school.name"],
      slug: meta.slug,
      state: result["school.state"],
      city: result["school.city"],
      type: result["school.ownership"] === 1 ? "Public" : "Private",
      enrollment: result["latest.student.size"],
      inStateTuition: result["latest.cost.tuition.in_state"],
      outOfStateTuition: result[  "latest.cost.tuition.out_of_state"],
      acceptanceRate: result["latest.admissions.admission_rate.overall"],
      graduationRate: result["latest.completion.completion_rate_4yr_150nt"],
      logo: meta.logo,
      color: meta.color,
      region: meta.region,
  }
}
