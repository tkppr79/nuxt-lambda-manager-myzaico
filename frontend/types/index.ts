export type Item = {
  id: number;
  tags: string;
  name: string;
  sku: string;
  manufacturer: string;
  releaseDate: string;
  listPrice: number;
  [key: string]: number | string;
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
  targetColumn?: { label: string, value: string } | null;
  searchString?: string;
  range?: Range;
  tag?: string;
};

export type Range = {
  start: number;
  end: number;
};
