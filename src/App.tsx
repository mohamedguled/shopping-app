import useShopping from './hooks/useShopping';
import Item from './features/Item';
import { CategoryType, ItemType } from './data';
import { useEffect } from 'react';
import useTabs, { TabOptions } from './hooks/useTabs';
import useColors from './hooks/useColors';
import DeletedItem from './features/DeletedItem';
import { Toaster } from 'react-hot-toast';
import ControlButtons from './features/ControlButtons';
import Settings from './features/Settings';
import Stats from './features/Stats';

export interface ItemFunctionType {
  updateAmount: (id: number, newAmount: number) => Promise<void>;
  changeCompleted: (id: number, newValue: boolean) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  currentColorMode: boolean | undefined;
}

export interface DeletedItemFunctionType {
  restoreItem: (key: string) => Promise<void>;
}
export interface ItemComponentType {
  id?: number;
  name: string;
  amount: number;
  isCompleted: boolean;
  categoryKey?: string;
  category?: CategoryType;
}

export type ColorModeType = boolean;
export type CombinedType = ItemComponentType & ItemFunctionType;
export type CombinedDeletedType = ItemComponentType & DeletedItemFunctionType;
export type ControlButtonFunctionTypes = {
  setCurrent: React.Dispatch<React.SetStateAction<TabOptions>>;
  Generate: () => void;
  Clear: () => void;
  handleToggleButton: () => void;
};
export type CombinedProps = ControlButtonPropTypes & ControlButtonFunctionTypes;

export type ControlButtonPropTypes = {
  current: TabOptions;
  hasData: boolean;
  currentColorMode: boolean | undefined;
  deletedAmount: number;
  totalAmount: {
    amount: number;
    percentage: number;
  };
};
export default function App() {
  const {
    Clear,
    Generate,
    data,
    updateAmount,
    changeCompleted,
    deleteItem,
    hasData,
    deletedAmount,
    deletedData,
    totalAmount,
    restoreItem,
    stats,
  } = useShopping('shopping', 'categories', 'deleted_shopping');
  const { current, setCurrent } = useTabs();
  const { setColorBlindValue, currentColorMode } = useColors('colorMode');

  const itemFunctions: ItemFunctionType = {
    updateAmount,
    changeCompleted,
    deleteItem,
    currentColorMode,
  };

  const deletedItemFunctions: DeletedItemFunctionType = {
    restoreItem,
  };

  const controlButtonProps: CombinedProps = {
    setCurrent,
    Generate,
    Clear,
    handleToggleButton,
    current,
    hasData,
    currentColorMode,
    deletedAmount,
    totalAmount,
  };

  useEffect(() => {
    if (current === 'Raderade' && deletedAmount === 0) {
      const currentTimer = setTimeout(() => setCurrent('Handlingslista'), 200);
      currentTimer;

      return () => {
        clearTimeout(currentTimer);
      };
    }
  }, [current, deletedAmount]);

  function handleToggleButton() {
    if (current === 'Handlingslista') return setCurrent('Raderade');
    return setCurrent('Handlingslista');
  }

  return (
    <div className="p-8 flex flex-col">
      <Toaster position="top-right" reverseOrder={false} />
      <h1
        className={`text-white text-5xl ${
          current === 'Inställningar' ? 'mb-0' : 'mb-3'
        }`}
      >
        {current === 'Handlingslista' && 'Handlingslista'}
        {current === 'Raderade' && 'Borttagna föremål'}
        {current === 'Inställningar' && 'Inställningar'}
      </h1>

      <section
        style={{ width: 'min(100%, 900px)' }}
        className="flex items-center justify-between mb-2"
      >
        {current !== 'Inställningar' && (
          <ControlButtons {...controlButtonProps} />
        )}

        {stats.total > 0 && current === 'Handlingslista' && (
          <Stats stats={stats} />
        )}
      </section>

      <main>
        {hasData && data && current === 'Handlingslista' && (
          <div className="flex flex-col gap-2">
            {data.map((item: ItemType) => {
              return <Item key={item.name} {...item} {...itemFunctions} />;
            })}
          </div>
        )}

        {deletedData && current === 'Raderade' && (
          <div className="flex flex-col gap-2">
            {deletedData.map((item: ItemType) => {
              return (
                <DeletedItem
                  key={item.name}
                  {...item}
                  {...deletedItemFunctions}
                />
              );
            })}
          </div>
        )}

        {current === 'Inställningar' && (
          <Settings
            currentColorMode={currentColorMode}
            setColorBlindValue={setColorBlindValue}
            setCurrent={setCurrent}
          />
        )}
      </main>
    </div>
  );
}
