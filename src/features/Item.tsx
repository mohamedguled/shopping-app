import { BiCheck } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { HiPlus, HiMinus } from 'react-icons/hi';
import firstLetter from '../utils/firstLetter';
import { CombinedType } from '../App';
import { OutlineButton } from '../stories/OutlineButton/OutlineButton';
import { ButtonGroup } from '../stories';

export default function Item({
  amount,
  isCompleted,
  name,
  category,
  changeCompleted,
  updateAmount,
  deleteItem,
  id,
  currentColorMode,
}: CombinedType) {
  function handleChange(
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (id) {
      updateAmount(id, parseInt(event.currentTarget.value));
    }
  }
  function handleCompleted(id: number, newValue: boolean) {
    if (id) {
      changeCompleted(id, newValue);
    }
  }

  const incompleteStyle = currentColorMode ? 'blue' : 'green';
  const deleteStyle = currentColorMode ? 'yellow' : 'red';

  return (
    <div
      className={[
        'relative rounded-md flex pr-3',
        `${isCompleted ? 'bg-card-grayed' : 'bg-card-base'}`,
      ].join(' ')}
      style={{ width: 'min(100%, 900px)' }}
    >
      {id && (
        <div className="flex items-center justify-between gap-x-2 w-full">
          <section className="flex items-center gap-2">
            <div
              style={{
                backgroundImage: `url('/placeholders/${firstLetter.lowerCase(name)}.jpg')`,
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
              <p>{category?.name}</p>
            </div>
          </section>
          <section className="flex items-center gap-x-3 pr-3">
            <div className="flex gap-x-[1px] items-center">
              <button
                onClick={() => updateAmount(id, amount - 1)}
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
                  handleChange(id, e)
                }
              />
              <button
                onClick={() => updateAmount(id, amount + 1)}
                className="btn btn-sm btn-ghost text-sm focus:outline-success px-1"
              >
                <HiPlus />
              </button>
            </div>

            <ButtonGroup gap>
              <OutlineButton
                color={incompleteStyle}
                onClick={() => handleCompleted(id, !isCompleted)}
              >
                {isCompleted ? <MdClose className="text-lg" /> : <BiCheck />}
              </OutlineButton>

              <OutlineButton color={deleteStyle} onClick={() => deleteItem(id)}>
                <AiFillDelete className="text-base" />
              </OutlineButton>
            </ButtonGroup>
          </section>
        </div>
      )}
    </div>
  );
}
