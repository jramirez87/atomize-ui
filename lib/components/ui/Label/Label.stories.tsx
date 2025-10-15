import type { Meta, StoryObj } from '@storybook/react-vite';

import { Mail } from 'lucide-react';
import { Input } from '../Input/Input';
import { Label } from './Label';

/**
 * Renders an accessible label associated with controls.
 */
const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    htmlFor: {
      control: { type: 'text' },
      description:
        'ID of the associated form control. When provided, clicking the label focuses the control.',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to style the label.',
      table: { type: { summary: 'string' } },
    },
  },
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Your email address',
    htmlFor: 'email',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default form of the label.
 */
export const Default: Story = {};

/** Associates a label with an input using the htmlFor/id pair. */
export const WithInput: Story = {
  render: args => (
    <div className="grid w-96 items-center gap-1.5">
      <Label {...args} htmlFor="email-basic">
        Email
      </Label>
      <Input id="email-basic" type="email" placeholder="you@example.com" />
    </div>
  ),
};

/** Shows a required indicator in the label. The asterisk is decorative and marked aria-hidden. */
export const RequiredIndicator: Story = {
  render: args => (
    <div className="grid w-96 items-center gap-1.5">
      <Label {...args} htmlFor="email-required">
        Email{' '}
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      </Label>
      <Input
        id="email-required"
        required
        type="email"
        placeholder="you@example.com"
      />
    </div>
  ),
};

/** Demonstrates peer-disabled styling when the associated input is disabled. */
export const DisabledWithPeer: Story = {
  render: args => (
    <div className="grid w-96 items-center gap-1.5">
      <Label {...args} htmlFor="email-disabled-peer">
        Email
      </Label>
      <Input
        id="email-disabled-peer"
        className="peer"
        disabled
        placeholder="Disabled"
      />
    </div>
  ),
};

/** Demonstrates group disabled styling using a group container state. */
export const DisabledWithGroup: Story = {
  render: args => (
    <div
      className="group grid w-96 items-center gap-1.5 data-[disabled=true]:opacity-60"
      data-disabled
    >
      <Label {...args} htmlFor="email-disabled-group">
        Email
      </Label>
      <Input id="email-disabled-group" placeholder="Group disabled" />
    </div>
  ),
};

/** Visually hidden label for cases where the UI uses another visual affordance. Keeps accessibility intact. */
export const VisuallyHidden: Story = {
  render: args => (
    <div className="grid w-96 items-center gap-1.5">
      <Label {...args} htmlFor="email-sr" className="sr-only">
        Email
      </Label>
      <Input id="email-sr" type="email" placeholder="Email" />
    </div>
  ),
};

/** Custom classes to adjust tone/typography. */
export const CustomClasses: Story = {
  render: args => (
    <div className="grid w-96 items-center gap-1.5">
      <Label
        {...args}
        htmlFor="email-custom"
        className="text-foreground/70 tracking-wide uppercase"
      >
        Email
      </Label>
      <Input id="email-custom" type="email" placeholder="you@example.com" />
    </div>
  ),
};

/** Label with an icon alongside text. Icons should be decorative (aria-hidden) unless they convey meaning. */
export const WithIcon: Story = {
  render: args => (
    <div className="grid w-96 items-center gap-1.5">
      <Label {...args} htmlFor="email-icon">
        <Mail aria-hidden="true" /> Email
      </Label>
      <Input id="email-icon" type="email" placeholder="you@example.com" />
    </div>
  ),
};
