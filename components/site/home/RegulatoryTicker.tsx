import { Plus } from "lucide-react";

const reminders = [
  "Housing Levy by the 9th working day",
  "Employment Act, 2007",
  "Data Protection Act, 2019",
  "PAYE and statutory returns",
];

export function RegulatoryTicker() {
  return (
    <div
      aria-label="Payroll and employment law reminders"
      className="overflow-hidden bg-gold text-navy"
      role="region"
    >
      <ul className="container flex min-h-12 items-center justify-between gap-6 overflow-x-auto whitespace-nowrap py-2 text-xs font-bold sm:text-sm">
        {reminders.map((reminder) => (
          <li className="flex shrink-0 items-center gap-6" key={reminder}>
            <span>{reminder}</span>
            <Plus aria-hidden="true" size={14} />
          </li>
        ))}
      </ul>
    </div>
  );
}
