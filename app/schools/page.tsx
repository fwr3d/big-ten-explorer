import { fetchBigTenUniversities } from "../../lib/api";
import SchoolsClient from "./SchoolsClient";

export default async function SchoolsPage() {
  const schools = await fetchBigTenUniversities();
  return <SchoolsClient schools={schools} />;
}