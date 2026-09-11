import { Milestone } from "@/types/tracking.types";
import { MilestoneItem } from "./MilestoneItem";

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  if (!milestones || milestones.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-neutral-400">
        No telemetry events recorded yet.
      </div>
    );
  }

  const sorted = [...milestones].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="py-2">
      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">
        Activity Telemetry Log ({milestones.length} Events)
      </h3>
      <div className="relative pl-1">
        {sorted.map((item, idx) => (
          <MilestoneItem
            key={item.id}
            milestone={item}
            isLatest={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}
