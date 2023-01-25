import { ReactNode } from 'react';
import { RiFileList3Fill } from 'react-icons/ri';
import { AiFillDelete, AiFillSetting } from 'react-icons/ai';
import { CombinedProps } from '../App';
import { Button, ButtonGroup } from '../stories';

export default function ControlButtons({
  current,
  setCurrent,
  hasData,
  Generate,
  currentColorMode,
  Clear,
  handleToggleButton,
  deletedAmount,
  totalAmount,
}: CombinedProps) {
  function handleGenerate() {
    Generate();
    setCurrent('Handlingslista');
  }

  function handleClear() {
    Clear();
    setCurrent('Handlingslista');
  }

  if (hasData === false) {
    return (
      <Wrapper>
        <Button
          onClick={handleGenerate}
          color={currentColorMode ? 'blue' : 'green'}
        >
          <RiFileList3Fill className="text-2xl" />
          <h3>Ny handlingslista</h3>
        </Button>
      </Wrapper>
    );
  }

  if (hasData === true) {
    return (
      <Wrapper>
        <Button
          onClick={handleClear}
          color={currentColorMode ? 'yellow' : 'red'}
        >
          <h3>Radera handlingslista</h3>
        </Button>

        {deletedAmount > 0 && (
          <Button
            onClick={handleToggleButton}
            color="dark"
            className="indicator"
          >
            <div className="indicator-item bg-neutral py-[6px] px-[8px] leading-none rounded-full text-neutral-content">
              {current === 'Handlingslista'
                ? deletedAmount
                : totalAmount.amount}
            </div>

            {current === 'Handlingslista' ? (
              <AiFillDelete className="text-xl" />
            ) : (
              <RiFileList3Fill className="text-xl" />
            )}
          </Button>
        )}

        <Button color="blue" onClick={() => setCurrent('Inställningar')}>
          <AiFillSetting className="text-xl" />
        </Button>
      </Wrapper>
    );
  }

  return <></>;
}

interface WrapperProps {
  children: ReactNode;
}
function Wrapper({ children }: WrapperProps) {
  return <ButtonGroup>{children}</ButtonGroup>;
}
