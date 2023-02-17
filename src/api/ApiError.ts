import type { ErrorDetails, UserNotification } from "$api/generated";

export class ApiError {
  constructor(exception: any) {
    const data = exception?.response?.data as ErrorDetails;

    if (!data) throw new Error(data as any);

    const { title, detail, traceId, suggestion, fields, notification } = data;

    if (!title || !detail || !traceId) {
      throw new Error(data as any);
    }

    this.title = title;
    this.detail = detail;
    this.traceId = traceId;
    this.suggestion = suggestion || null;
    this.fields = fields || {};
    this.notification = notification || null;
  }
  
  public title: string;
  public detail: string;
  public traceId: string;
  public suggestion: string | null;
  public fields: { [key: string]: string[] };
  public notification: UserNotification | null;
}