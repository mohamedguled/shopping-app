import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CategoryType, SafeItemType } from './data';
import ItemComponent from './features/ItemComponent';
import { TabOptions } from './hooks/useTabs';
import { Button } from './stories';
import { PulseLoader } from 'react-spinners';
import { deleteList, generateList, getData } from './utils/queryFunctions';
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
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    // error,
    data: items,
  } = useQuery('shopping', getData, {
    // select: data => data?.sort((a, b) => a.category.id - b.category.id),
    refetchOnWindowFocus: true,
  });
  const deleteListMutation = useMutation(deleteList, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('shopping');
    },
  });

  const generateListMutation = useMutation(generateList, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('shopping');
    },
  });

  return (
    <div className="p-8">
      {!isLoading && (
        <div className="mb-2">
          {items ? (
            <Button
              disabled={deleteListMutation.isLoading}
              onClick={() => deleteListMutation.mutate()}
              color="red"
            >
              <p>Radera handlingslistan</p>
            </Button>
          ) : (
            <Button
              disabled={generateListMutation.isLoading}
              color="green"
              onClick={() => generateListMutation.mutate()}
            >
              <p>Ny handlingslista</p>
            </Button>
          )}
        </div>
      )}
      {isError ? (
        <div>Ett fel uppstod.</div>
      ) : (
        <main>
          <div>
            <section>
              {items && (
                <div className="flex flex-col gap-y-1">
                  {items.map((item: SafeItemType) => {
                    return (
                      <ItemComponent
                        key={item.name}
                        queryClient={queryClient}
                        {...item}
                      />
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </main>
      )}
    </div>
  );
}
