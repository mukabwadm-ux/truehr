import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-content";

export default function PayrollPage() {
  return <ServiceDetailPage service={serviceDetails.payroll} />;
}
