export interface Wine {
  name: string;
  year: number;
  type: 'Red' | 'White';
  tags: string[];
  used: boolean;
  feedback: number;
  price: number;
}
