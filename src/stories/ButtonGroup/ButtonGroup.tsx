import { ReactNode } from 'react';
import { Button } from '../Button/Button';
import './buttongroup.css';
interface Props {
  children?: ReactNode;
  gap?: boolean;
}
export const ButtonGroup = ({
  children = (
    <>
      <Button />
      <Button color="blue" />
      <Button color="green" />
      <Button color="red" />
    </>
  ),
  gap,
}: Props) => {
  return (
    <div
      className={[
        'storybook-button_group',
        `${gap && 'storybook-button_group-gap'}`,
      ].join(' ')}
    >
      {children}
    </div>
  );
};
