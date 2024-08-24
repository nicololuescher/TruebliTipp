export interface SommelierQuestion {
  question: string;
  options: [{ answer: string; next: string }];
  recommendation?: string;
}
