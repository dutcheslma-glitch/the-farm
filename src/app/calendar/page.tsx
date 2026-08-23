import { PageHeader } from "@/components/PageHeader";
import { ComingSoon } from "@/components/ComingSoon";

export default function ContentCalendarPage() {
  return (
    <>
      <PageHeader eyebrow="Social / The Farm" title="Content calendar" size="large" />
      <ComingSoon note="The three-week grid, drag-to-reschedule, and the post approval modal land here next — the most complex screen, built last once auth and the data layer are in place." />
    </>
  );
}
