import { PageHeader } from "@/components/PageHeader";
import { ComingSoon } from "@/components/ComingSoon";

export default function WhereWeGoingPage() {
  return (
    <>
      <PageHeader eyebrow="The road ahead" title="Where we're going." />
      <ComingSoon note="The horizon card, the twelve-month Gantt, cadence chips, and the trajectory chart land here next." />
    </>
  );
}
