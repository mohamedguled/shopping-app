export type categoryName =
  | 'Frukt/Grönsaker'
  | 'Mejeri/Ägg'
  | 'Drycker'
  | 'Fryst'
  | 'Fisk'
  | 'Bakat';

export type ItemType = {
  id?: number;
  name: string;
  amount: number;
  isCompleted: boolean;
  categoryKey?: string;
  category?: CategoryType;
};

export type FullItemType = {
  id?: number;
  name: string;
  amount: number;
  isCompleted: boolean;
  categoryKey: string;
  category: CategoryType;
};

export type SafeItemType = {
  id: number;
  name: string;
  amount: number;
  isCompleted: boolean;
  categoryKey: string;
  category: CategoryType;
};

export type CategoryType = {
  name: string;
  id: number;
};

export const Äpple = {
  name: 'Äpple',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Frukt/Grönsaker',
};
export const Lök = {
  name: 'Lök',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Frukt/Grönsaker',
};
export const Ananas = {
  name: 'Ananas',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Frukt/Grönsaker',
};
export const Smör = {
  name: 'Smör',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Mejeri/Ägg',
};
export const Cola = {
  name: 'Cola',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Drycker',
};
export const Lax = {
  name: 'Lax',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Fisk',
};
export const Tårta = {
  name: 'Tårta',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Bakat',
};
export const Glass = {
  name: 'Glass',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Fryst',
};
export const Ägg = {
  name: 'Ägg',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Mejeri/Ägg',
};
export const Kanelbulle = {
  name: 'Kanelbulle',
  amount: 1,
  isCompleted: false,
  categoryKey: 'Bakat',
};
export const Items = [
  Äpple,
  Cola,
  Lök,
  Ananas,
  Smör,
  Lax,
  Tårta,
  Glass,
  Ägg,
  Kanelbulle,
];

export const Mejeri_Ägg = {
  name: 'Mejeri/Ägg',
  id: 1,
};
export const Frukt_Grönsaker = {
  name: 'Frukt/Grönsaker',
  id: 2,
};

export const Drycker = {
  name: 'Drycker',
  id: 3,
};

export const Fisk = {
  name: 'Fisk',
  id: 4,
};

export const Bakat = {
  name: 'Bakat',
  id: 5,
};
export const Fryst = {
  name: 'Fryst',
  id: 6,
};

export const Categories = [
  Frukt_Grönsaker,
  Drycker,
  Mejeri_Ägg,
  Fisk,
  Bakat,
  Fryst,
];
