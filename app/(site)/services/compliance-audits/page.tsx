import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-content";

export default function ComplianceAuditsPage() {
  return <ServiceDetailPage service={serviceDetails["compliance-audits"]} />;
}
