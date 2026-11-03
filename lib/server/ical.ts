export interface CalendarEvent {
  uid: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  location: string;
  url: string;
}

function escapeCalendarText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatUtcDate(value: string) {
  return new Date(value)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export function buildCalendarFile(event: CalendarEvent) {
  const timestamp = formatUtcDate(new Date().toISOString());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TruewardHR//Employer Briefings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${escapeCalendarText(event.uid)}`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${formatUtcDate(event.startsAt)}`,
    `DTEND:${formatUtcDate(event.endsAt)}`,
    `SUMMARY:${escapeCalendarText(event.title)}`,
    `DESCRIPTION:${escapeCalendarText(event.description)}`,
    `LOCATION:${escapeCalendarText(event.location)}`,
    `URL:${escapeCalendarText(event.url)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `${lines.join("\r\n")}\r\n`;
}
