export interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface PackagePiece {
  id: string;
  quantity: number;
  pieceType: string;
  length: number;
  width: number;
  height: number;
  description: string;
}

export interface ConsignmentDetails {
  shipper: ContactPerson;
  receiver: ContactPerson;
  origin: string;
  destination: string;
  carrier: string;
  shipmentType: "international" | "national";
  shipmentMode: "air_freight" | "international_shipping" | "van_move" | "truckload";
  carrierReferenceNumber: string;
  product: string;
  contents: string;
  paymentMode: string;
  freightCost: number;
  expectedDelivery: string;
  pickupDate: string;
  pickupTime: string;
  packagePieces: PackagePiece[];
  totalActualWeight: number;
  totalVolumetricWeight: number;
  totalVolume: number;
}

export interface ConsignmentSummary {
  totalPieces: number;
  totalActualWeight: number;
  totalVolumetricWeight: number;
  totalVolumeCm3: number;
}
