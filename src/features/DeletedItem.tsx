import { MdSettingsBackupRestore } from 'react-icons/md';
import firstLetter from '../utils/firstLetter';
import { CombinedDeletedType } from '../App';
import { OutlineButton } from '../stories/OutlineButton/OutlineButton';

export default function DeletedItem({
  name,
  category,
  id,
  restoreItem,
}: CombinedDeletedType) {
  return (
    <div
      className={['relative rounded-md flex pr-3', 'bg-primary-content'].join(
        ' '
      )}
      style={{ width: 'min(100%, 900px)' }}
    >
      {id && (
        <div className="flex items-center justify-between gap-x-2 w-full">
          <section className="flex items-center gap-2">
            <div
              style={{
                backgroundImage: `url('/${firstLetter.lowerCase(name)}.jpg')`,
              }}
              className={[
                'w-[110px] aspect-square bg-cover bg-no-repeat bg-center rounded-tl-md rounded-bl-md',
              ].join(' ')}
            ></div>
            <div className="flex flex-col justify-center ml-2">
              <h3 className={['text-3xl font-semibold text-white'].join(' ')}>
                {name}
              </h3>
              <p>{category?.name}</p>
            </div>
          </section>
          <section className="flex items-center gap-x-3 pr-3">
            <div className="btn-group items-center gap-x-1">
              <OutlineButton color="blue" onClick={() => restoreItem(name)}>
                <MdSettingsBackupRestore className="text-xl" />
              </OutlineButton>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
