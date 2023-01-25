import React from 'react';
import { CategoryType } from '../data';
import firstLetter from '../utils/firstLetter';
import { ButtonGroup } from '../stories';
import { OutlineButton } from '../stories/OutlineButton/OutlineButton';
import { BiCheck } from 'react-icons/bi';
import { AiFillDelete, AiFillTags } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { HiPlus, HiMinus } from 'react-icons/hi';
import type { QueryClient } from 'react-query/types/core/queryClient';
import { useMutation } from 'react-query';
import Localbase from 'localbase';

const db = new Localbase('db');
db.config.debug = false;
export default function ItemComponent({
  amount,
  isCompleted,
  name,
  category,
  id,
  queryClient,
}: {
  id: number;
  name: string;
  amount: number;
  isCompleted: boolean;
  categoryKey?: string;
  category?: CategoryType;
  queryClient: QueryClient;
}) {
  const updateAmount = async (newAmount: number) => {
    return await db.collection('shopping').doc({ id: id }).update({
      amount: newAmount,
    });
  };

  const deleteItem = async () => {
    const item = await db.collection('shopping').doc({ id: id }).get();

    if (item) {
      await db.collection('deleted_shopping').add(item, item.name);
      await db.collection('shopping').doc({ id: id }).delete();
    }
  };

  const changeCompleted = async () => {
    await db.collection('shopping').doc({ id: id }).update({
      isCompleted: !isCompleted,
    });
  };
  const updateItemAmountMutation = useMutation(updateAmount, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('shopping');
    },
  });

  const deleteItemMutation = useMutation(deleteItem, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('shopping');
    },
  });
  const changeCompletedMutation = useMutation(changeCompleted, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('shopping');
    },
  });

  return (
    <div
      className={[
        'relative rounded-md flex pr-3 transition-all duration-150',
        `${isCompleted ? 'bg-neutral/60' : 'bg-primary-content'}`,
      ].join(' ')}
      style={{ width: 'min(100%, 900px)' }}
    >
      <div className="flex items-center justify-between gap-x-2 w-full">
        <section className="flex items-center gap-2">
          <div
            style={{
              backgroundImage: `url('/${firstLetter.lowerCase(name)}.jpg')`,
            }}
            className={[
              'w-[110px] aspect-square bg-cover bg-no-repeat bg-center rounded-tl-md rounded-bl-md',
              `${isCompleted ? 'opacity-50' : ''}`,
            ].join(' ')}
          ></div>
          <div className="flex flex-col justify-center ml-2">
            <h3
              className={[
                'text-3xl font-semibold text-white',
                `${isCompleted ? 'line-through text-gray-300' : ''}`,
              ].join(' ')}
            >
              {name}
            </h3>
            {category?.name && (
              <div className="flex items-center">
                <AiFillTags />
                <p>{category.name}</p>
              </div>
            )}
          </div>
        </section>
        <section className="flex items-center gap-x-3 pr-3">
          <div className="flex gap-x-[1px] items-center">
            <button
              disabled={updateItemAmountMutation.isLoading}
              onClick={() => updateItemAmountMutation.mutate(amount - 1)}
              className="btn btn-sm btn-ghost text-sm focus:outline-success px-1"
            >
              <HiMinus />
            </button>

            <input
              className="max-w-[4ch] bg-transparent rounded-sm border border-gray-400 outline-none focus:outline-primary text-center"
              type="number"
              min="1"
              max="100"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateItemAmountMutation.mutate(parseInt(e.currentTarget.value))
              }
            />
            <button
              disabled={updateItemAmountMutation.isLoading}
              onClick={() => updateItemAmountMutation.mutate(amount + 1)}
              className="btn btn-sm btn-ghost text-sm focus:outline-success px-1"
            >
              <HiPlus />
            </button>
          </div>

          <ButtonGroup gap>
            <OutlineButton
              color="blue"
              onClick={() => changeCompletedMutation.mutate()}
              disabled={changeCompletedMutation.isLoading}
            >
              {isCompleted ? <MdClose className="text-lg" /> : <BiCheck />}
            </OutlineButton>

            <OutlineButton
              color="red"
              onClick={() => deleteItemMutation.mutate()}
              disabled={deleteItemMutation.isLoading}
            >
              <AiFillDelete className="text-base" />
            </OutlineButton>
          </ButtonGroup>
        </section>
      </div>
    </div>
  );
}
