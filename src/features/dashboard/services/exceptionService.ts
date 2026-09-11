import data from "@/data/data.json";
import { Exception } from "@/types/admin.types";

export class ExceptionService {
  private static exceptions: Exception[] = data.exceptions as Exception[];

  public static getExceptions(): Exception[] {
    return this.exceptions;
  }

  public static getExceptionById(id: string): Exception | undefined {
    return this.exceptions.find((e) => e.id === id);
  }

  public static getHighSeverityExceptions(): Exception[] {
    return this.exceptions.filter((e) => e.severity === "high");
  }
}
