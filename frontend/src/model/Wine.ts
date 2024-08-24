export interface Wine {
  name: string;
  year: number;
  type: 'Red' | 'White';
  grapes: string;
  country: string;
  region: string;
  description: string;
  tags: string[];
  used: boolean;
  feedback: number;
  price: number;
}
