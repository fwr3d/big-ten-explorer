// Static metadata for Big Ten schools that isn't available from the College Scorecard API.
// Keyed by College Scorecard unit ID to match what fetchBigTenUniversities() returns.

export type Region = "Midwest" | "East" | "West";

export interface SchoolMeta {
  id: number;
  slug: string;
  logo: string;
  color: string;
  region: Region;
}

const WIKI = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=200`;
const ESPN = (id: number) =>
  `https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`;

export const SCHOOL_META: SchoolMeta[] = [
  { id: 170976, slug: "michigan",       logo: WIKI("Michigan_Wolverines_logo.svg"),         color: "#00274C", region: "Midwest" },
  { id: 171100, slug: "michigan-state", logo: ESPN(127),                                     color: "#18453B", region: "Midwest" },
  { id: 204796, slug: "ohio-state",     logo: WIKI("Ohio_State_Buckeyes_logo.svg"),          color: "#BB0000", region: "Midwest" },
  { id: 214777, slug: "penn-state",     logo: ESPN(213),                                     color: "#002D62", region: "East"    },
  { id: 151351, slug: "indiana",        logo: WIKI("Indiana_Hoosiers_logo.svg"),             color: "#990000", region: "Midwest" },
  { id: 243780, slug: "purdue",         logo: WIKI("Purdue_Boilermakers_logo.svg"),          color: "#B07C2C", region: "Midwest" },
  { id: 147767, slug: "northwestern",   logo: WIKI("Northwestern_Wildcats_logo.svg"),        color: "#4E2A84", region: "Midwest" },
  { id: 145637, slug: "illinois",       logo: WIKI("Illinois_Fighting_Illini_logo.svg"),     color: "#E84A27", region: "Midwest" },
  { id: 240444, slug: "wisconsin",      logo: WIKI("Wisconsin_Badgers_logo.svg"),            color: "#C5050C", region: "Midwest" },
  { id: 174066, slug: "minnesota",      logo: WIKI("Minnesota_Golden_Gophers_logo.svg"),     color: "#7A0019", region: "Midwest" },
  { id: 153658, slug: "iowa",           logo: ESPN(2294),                                    color: "#C8A800", region: "Midwest" },
  { id: 181464, slug: "nebraska",       logo: WIKI("Nebraska_Cornhuskers_logo.svg"),         color: "#E41C38", region: "Midwest" },
  { id: 186380, slug: "rutgers",        logo: WIKI("Rutgers_Scarlet_Knights_logo.svg"),      color: "#CC0033", region: "East"    },
  { id: 163286, slug: "maryland",       logo: WIKI("Maryland_Terrapins_logo.svg"),           color: "#E03A3E", region: "East"    },
  { id: 228723, slug: "usc",            logo: WIKI("USC_Trojans_logo.svg"),                  color: "#990000", region: "West"    },
  { id: 110662, slug: "ucla",           logo: WIKI("UCLA_Bruins_logo.svg"),                  color: "#2774AE", region: "West"    },
  { id: 209551, slug: "oregon",         logo: WIKI("Oregon_Ducks_logo.svg"),                 color: "#007030", region: "West"    },
  { id: 236948, slug: "washington",     logo: WIKI("Washington_Huskies_logo.svg"),           color: "#4B2E83", region: "West"    },
];

// Lookup by ID for easy merging with API data
export const SCHOOL_META_BY_ID = Object.fromEntries(
  SCHOOL_META.map((s) => [s.id, s])
);
