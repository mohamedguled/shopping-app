import { useCallback, useEffect, useMemo, useState } from 'react';
import Localbase from 'localbase';

const db = new Localbase('db');

interface Props {
  colorBlindMode: boolean;
  darkMode: boolean;
}
export default function useColors(name: string) {
  const [colorMode, setColorMode] = useState<Props | null>(null);

  useEffect(() => {
    getColors();
  }, [name]);

  async function getColors() {
    const data = await db.collection(name).doc('colorMode').get();
    if (data) return setColorMode(data);
    await db.collection(name).doc('colorMode').set({
      colorBlindMode: false,
      darkMode: true,
    });
    setColorMode(data);
  }
  async function setColorBlindValue(value: boolean) {
    await db.collection(name).doc('colorMode').update({
      colorBlindMode: value,
    });
    getColors();
  }

  // async function setDarkModeValue(value: boolean) {
  //   await db.collection(name).doc('colorMode').update({
  //     darkMode: value,
  //   });
  //   getColors();
  // }

  async function setValue(valueA: boolean, valueB: boolean) {
    const currentValues = await db.collection(name).get();
    const compareThis = [
      {
        colorBlindMode: valueA,
        darkMode: valueB,
      },
    ];

    if (currentValues === compareThis) return;

    await db.collection(name).doc('colorMode').update({
      colorBlindMode: valueA,
      darkMode: valueB,
    });

    getColors();
  }

  const getCurrentColorValues = useCallback(() => {
    if (colorMode) return colorMode;
  }, [colorMode]);

  const currentColorMode = useMemo(() => {
    const current = getCurrentColorValues()?.colorBlindMode;
    return current;
  }, [getCurrentColorValues]);

  const currentDarkMode = useMemo(() => {
    const current = getCurrentColorValues()?.darkMode;
    return current;
  }, [getCurrentColorValues]);

  return {
    setColorMode,
    colorMode,
    setValue,
    setColorBlindValue,
    currentColorMode,
    currentDarkMode,
  };
}
