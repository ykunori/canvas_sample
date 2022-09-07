type Item = {
  name?: string;
  id?: number;
  parent_id?: number | null;
  is_bold?: true | null;
};

export type ItemWithPosition = Item & {
  x: number;
  y: number;
  radius: number;
};

export type Items = Item[][];

export type ItemsWithPosition = ItemWithPosition[];

export type Point = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
};
