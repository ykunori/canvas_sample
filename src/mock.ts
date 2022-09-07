import { Items } from './types';

export const items: Items = [
  // [
  //   { name: 'A社', id: 0, parent_id: null },
  //   { name: 'B社', id: 0, parent_id: null },
  //   { name: 'C社', id: 0, parent_id: null },
  // ],
  [{ name: 'D社', id: 0, parent_id: null }],
  [
    { name: '0001', id: 1, parent_id: 0, is_bold: true },
    { name: '0002', id: 2, parent_id: 0 },
    { name: '0003', id: 3, parent_id: 0, is_bold: true },
  ],
  [
    { name: '0011', id: 4, parent_id: 1, is_bold: true },
    { name: '0021', id: 5, parent_id: 1, is_bold: true },
    // { name: '0012', id: 6, parent_id: 2 },
    { name: '0013', id: 7, parent_id: 3 },
  ],
  [
    { name: '0111', id: 8, parent_id: 4 },
    { name: '0211', id: 9, parent_id: 4, is_bold: true },
    { name: '0311', id: 10, parent_id: 4, is_bold: true },
    { name: '0411', id: 11, parent_id: 4 },
    { name: '0511', id: 12, parent_id: 4 },
    { name: '0121', id: 13, parent_id: 5 },
    { name: '0221', id: 14, parent_id: 5 },
    // { name: '0112', id: 15, parent_id: 6 },
    { parent_id: 2 },
    { name: '0113', id: 16, parent_id: 7 },
    { name: '0213', id: 17, parent_id: 7 },
    { name: '0313', id: 18, parent_id: 7 },
  ],
];
