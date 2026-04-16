// College Scorecard API
// Docs: https://collegescorecard.ed.gov/data/documentation/
// Base URL: https://api.data.gov/ed/collegescorecard/v1/schools

import { University } from "./models";

const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;
const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

// College Scorecard unit IDs for all 18 Big Ten schools
const BIG_TEN_IDS = [
  170976, // Michigan
  171100, // Michigan State
  204796, // Ohio State
  214777, // Penn State
  151351, // Indiana
  243780, // Purdue
  147767, // Northwestern
  145637, // Illinois
  240444, // Wisconsin
  174066, // Minnesota
  153658, // Iowa
  181464, // Nebraska
  186380, // Rutgers
  163286, // Maryland
  228723, // USC
  110662, // UCLA
  209551, // Oregon
  236948, // Washington
];

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

export async function fetchBigTenUniversities(): Promise<University[]> {
  if (!API_KEY) throw new Error("COLLEGE_SCORECARD_API_KEY is not set in .env.local");

  const ids = BIG_TEN_IDS.join(",");
  const url = `${BASE_URL}?id=${ids}&fields=${FIELDS}&api_key=${API_KEY}&per_page=20`;

  const res = await fetch(url, { next: { revalidate: 86400 } }); // cache for 24h
  if (!res.ok) throw new Error(`College Scorecard API error: ${res.status}`);

  const json = await res.json();

  // TODO: Map the raw API response to the University model
  // Each result is in json.results[]
  // You'll want to transform school.ownership (1/2/3) → "Public"/"Private"
  // and map the fields to the University interface
  return json.results;
}

export async function fetchUniversityById(id: number): Promise<University | null> {
  if (!API_KEY) throw new Error("COLLEGE_SCORECARD_API_KEY is not set in .env.local");

  const url = `${BASE_URL}?id=${id}&fields=${FIELDS}&api_key=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`College Scorecard API error: ${res.status}`);

  const json = await res.json();

  // TODO: Map json.results[0] to the University model
  return json.results[0] ?? null;
}
