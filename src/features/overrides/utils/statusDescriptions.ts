export const DEFAULT_STATUS_DESCRIPTIONS: Record<string, string> = {
  picked_up: "Consignment picked up and transferred to departure terminal",
  in_transit: "In Transit: En-route to regional destination hub",
  on_hold: "On Hold: Consignment held temporarily at regional facility",
  customs_hold: "Customs Hold: Under mandatory border customs clearance inspection",
  supporting_documents_needed: "Supporting Documents Needed: Consignee documentation required for clearance",
  seized: "Seized: Consignment detained by regulatory enforcement authority",
  returned: "Consignment returned to sender facility",
  delivered: "Delivered: Consignment safely handed over and signed",
  cancelled: "Consignment booking cancelled by operator",
  order_placed: "Consignment created and entered into ITL network manifest",
  preparing: "Customs documents prepared and freight packed for departure",
  out_for_delivery: "Out for Delivery: Dispatched with final mile courier",
  exception: "Exception Hold: Pending clearance documentation review",
};

export function getDefaultDescription(status: string): string {
  return DEFAULT_STATUS_DESCRIPTIONS[status] || `Status updated to ${status.replace("_", " ")}`;
}

export const getDefaultMilestoneDescription = getDefaultDescription;
