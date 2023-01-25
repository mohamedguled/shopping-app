import { useState } from 'react';

export type TabOptions =
  | 'Handlingslista'
  | 'Raderade'
  | 'Inställningar';

export default function useTabs() {
  const [current, setCurrent] =
    useState<TabOptions>('Handlingslista');

  return { current, setCurrent };
}
