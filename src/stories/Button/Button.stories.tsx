import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Green = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Green.args = {
  color: 'green',
};

export const Blue = Template.bind({});

Blue.args = {
  color: 'blue',
};
export const Red = Template.bind({});

Red.args = {
  color: 'red',
};
