import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SafeItemType } from './data';
import ItemComponent from './features/ItemComponent';
import { Button } from './stories';
import { deleteList, generateList, getData } from './utils/queryFunctions';

export default function App2() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    // error,
    data: items,
  } = useQuery('shopping', getData, {
    select: data => data?.sort((a, b) => a.category.id - b.category.id),
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
              Radera handlingslistan
            </Button>
          ) : (
            <Button
              disabled={generateListMutation.isLoading}
              color="green"
              onClick={() => generateListMutation.mutate()}
            >
              Ny handlingslista
            </Button>
          )}
        </div>
      )}
      {isError ? (
        <div>Ett fel uppstod.</div>
      ) : (
        <main>
          {isLoading ? (
            <p>Laddar...</p>
          ) : (
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
          )}
        </main>
      )}
    </div>
  );
}
