import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { TabOptions } from '../hooks/useTabs';
import { Button } from '../stories';

interface Props {
  setCurrent: React.Dispatch<React.SetStateAction<TabOptions>>;
  setColorBlindValue: (value: boolean) => Promise<void>;
  currentColorMode: boolean | undefined;
}
export default function Settings({
  setCurrent,
  setColorBlindValue,
  currentColorMode,
}: Props) {
  const colorCheckboxRef = useRef<HTMLInputElement | null>(null);

  function handleColorChange() {
    if (colorCheckboxRef.current) {
      setColorBlindValue(colorCheckboxRef.current.checked);
    }

    setCurrent('Handlingslista');

    toast.success('Ändrade inställningar', {
      style: {
        background: 'hsl(215, 25%, 20%)',
        color: '#fff',
      },
    });
  }
  function handleCheck(
    elementRef: React.MutableRefObject<HTMLInputElement | null>
  ) {
    if (elementRef.current) {
      const isChecked = elementRef.current.checked;
      elementRef.current.checked = !isChecked;
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="flex items-center gap-5 ml-1"
        onClick={() => handleCheck(colorCheckboxRef)}
      >
        <div className="checkbox_container">
          <input
            className="pointer-events-none"
            id="color_checkbox"
            type="checkbox"
            ref={colorCheckboxRef}
            value="color"
            checked={currentColorMode === true ? true : false}
          />
          <span className="custom_checkbox"></span>
        </div>
        <label htmlFor="color" className="text-xl">
          Färgblindsläge
        </label>
      </div>

      <Button color="gray" onClick={() => setCurrent('Handlingslista')}>
        Gå tillbaka
      </Button>

      <Button
        color={currentColorMode ? 'blue' : 'green'}
        onClick={handleColorChange}
      >
        Verkställ
      </Button>
    </div>
  );
}
