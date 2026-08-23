import { PageHeader } from "@/components/PageHeader";
import { ComingSoon } from "@/components/ComingSoon";

export default function WhatsNewPage() {
  return (
    <>
      <PageHeader eyebrow="Month two · updated August 22, 2026" title="What's new." />
      <ComingSoon note="The checklist, the log, and the weekly reach chart land here next — this is the landing screen, and the first multi-user surface once Supabase auth and realtime are wired in." />
    </>
  );
}
