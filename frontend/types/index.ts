export type Item = {
  id: number;
  tags: string;
  name: string;
  sku: string;
  manufacturer: string;
  releaseDate: string;
  listPrice: number;
};

export type FilterSet = {
  id: string;
  condition: string;
  type: string;
  tagString?: string;
  filters: Filter[];
};

export type Filter = {
  checkbox: boolean;
  targetColumn: { label: string, value: string } | null;
  searchString?: string;
  range?: { start: number, end: number };
  tag?: string;
};
