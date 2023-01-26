import { z } from 'zod';

const categoryNames = z.enum([
  'Frukt & Grönsaker',
  'Mejeri & Ägg',
  'Drycker',
  'Fryst',
  'Fisk',
  'Bröd & Kakor',
  'Kött, Fågel & Fisk',
]);

export const basicItemType = z.object({
  id: z.number().optional(),
  name: z.string(),
  categoryKey: categoryNames,
  category: z.object({ name: z.string(), id: z.number() }).optional(),
  isCompleted: z.boolean().optional(),
  amount: z.number().optional(),
});

export type BasicItemType = z.infer<typeof basicItemType>;

type CategoryName = z.infer<typeof categoryNames>;

// export type BasicItemType = {
//   id?: number;
//   name: string;
//   categoryKey?: CategoryName;
//   category?: CategoryType;
// };

export type ItemType = {
  id?: number;
  name: string;
  amount: number;
  isCompleted: boolean;
  categoryKey?: CategoryName;
  category?: CategoryType;
};

export type FullItemType = {
  id?: number;
  name: string;
  amount: number;
  isCompleted: boolean;
  categoryKey: CategoryName;
  category: CategoryType;
};

export type SafeItemType = {
  id: number;
  name: string;
  amount: number;
  isCompleted: boolean;
  categoryKey: CategoryName;
  category: CategoryType;
};

export type CategoryType = {
  name: CategoryName;
  id: number;
};

// export const Äpple = {
//   name: 'Äpple',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Frukt/Grönsaker',
// };
// export const Lök = {
//   name: 'Lök',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Frukt/Grönsaker',
// };
// export const Ananas = {
//   name: 'Ananas',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Frukt/Grönsaker',
// };
// export const Smör = {
//   name: 'Smör',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Mejeri & Ägg',
// };
// export const Cola = {
//   name: 'Cola',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Drycker',
// };
// export const Lax = {
//   name: 'Lax',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Fisk',
// };
// export const Tårta = {
//   name: 'Tårta',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Bakat',
// };
// export const Glass = {
//   name: 'Glass',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Fryst',
// };
// export const Ägg = {
//   name: 'Ägg',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Mejeri & Ägg',
// };
// export const Kanelbulle = {
//   name: 'Kanelbulle',
//   amount: 1,
//   isCompleted: false,
//   categoryKey: 'Bakat',
// };

// export const Items: BasicItemType[] = [
//   {
//     name: 'Mjölk',
//   },
// ];

export const Items: BasicItemType[] = [
  {
    name: 'Mjölk',
    categoryKey: 'Mejeri & Ägg',
  },
  {
    name: 'Ost',
    categoryKey: 'Mejeri & Ägg',
  },
  {
    name: 'Pålägg',
    categoryKey: 'Kött, Fågel & Fisk',
  },
  {
    name: 'Mjukost',
    categoryKey: 'Mejeri & Ägg',
  },
  // {name: "Kaviar"}
  // {name: "Apelsinmarmelad"}
  { name: 'Smör', categoryKey: 'Mejeri & Ägg' },
  { name: 'Laktosfritt smör', categoryKey: 'Mejeri & Ägg' },
  // { name: 'Citronsyra' },
  // {name: "Te"},
  // {name: "Kaffe"},
  // {name: "Honung"},
  { name: 'Bröd', categoryKey: 'Bröd & Kakor' },
];

export const Categories: CategoryType[] = [
  { name: 'Mejeri & Ägg', id: 1 },
  {
    name: 'Frukt & Grönsaker',
    id: 2,
  },
  {
    name: 'Drycker',
    id: 3,
  },
  {
    name: 'Fisk',
    id: 4,
  },
  {
    name: 'Bröd & Kakor',
    id: 5,
  },
  {
    name: 'Fryst',
    id: 6,
  },
  {
    name: 'Kött, Fågel & Fisk',
    id: 7,
  },
];
