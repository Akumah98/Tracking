import data from "@/data/data.json";
import { KPIs, WISMODataPoint, CarrierPerformance } from "@/types/admin.types";

export class DashboardService {
  public static getKPIs(): KPIs {
    return data.kpis;
  }

  public static getWISMOData(): WISMODataPoint[] {
    return data.wismoChartData;
  }

  public static getCarrierPerformance(): CarrierPerformance[] {
    return data.carrierPerformance as CarrierPerformance[];
  }
}
