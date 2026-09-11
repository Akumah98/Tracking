export const DEFAULT_STATUS_DESCRIPTIONS: Record<string, string> = {
  order_placed: "Consignment created and entered into ITL network manifest",
  preparing: "Customs documents prepared and freight packed for departure",
  picked_up: "Consignment picked up and transferred to departure terminal",
  in_transit: "In Transit: En-route to regional destination hub",
  out_for_delivery: "Out for Delivery: Dispatched with final mile courier",
  delivered: "Delivered: Consignment safely handed over and signed",
  exception: "Exception Hold: Pending clearance documentation review",
  returned: "Consignment returned to sender facility",
};

export function getDefaultDescription(status: string): string {
  return DEFAULT_STATUS_DESCRIPTIONS[status] || `Status updated to ${status.replace("_", " ")}`;
}

export const getDefaultMilestoneDescription = getDefaultDescription;
