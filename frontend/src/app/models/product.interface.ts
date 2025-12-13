export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: 'technical' | 'learning' | 'teamwork';
  priceLabel: string;
  imageUrl: string | null;
  features: string[];
  technicalSkills: string[] | null;
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
