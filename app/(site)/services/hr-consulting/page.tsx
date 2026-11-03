import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-content";

export default function HrConsultingPage() {
  return <ServiceDetailPage service={serviceDetails["hr-consulting"]} />;
}
