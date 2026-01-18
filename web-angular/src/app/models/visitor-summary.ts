export interface VisitorSummaryDto {
  ipAddress: string;
  visitCount: number;
  firstVisitTime: string;
  lastVisitTime: string;
  isSubscribed: boolean;
  subscriptionName?: string;
  subscriptionEmail?: string;
  subscriptionPhoneNumber?: string;
  subscriptionDate?: string;
}
