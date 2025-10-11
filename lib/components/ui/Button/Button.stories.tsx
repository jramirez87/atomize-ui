import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpIcon, ArrowUpRightIcon, Loader2, Mail } from 'lucide-react';

import { Button } from './Button';

/**
 * Displays a button or a component that looks like a button.
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description:
        'Visual style of the button. Use "default" for primary actions, "destructive" for risky/irreversible actions, "outline"/"secondary" for reduced emphasis, "ghost" for very subtle actions, and "link" for inline textual actions.',
      table: {
        category: 'Appearance',
        type: {
          summary: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        },
        defaultValue: { summary: '"default"' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description:
        'Button size. Use "icon", "icon-sm", and "icon-lg" ONLY for icon-only buttons (no text). Use "default", "sm", and "lg" for buttons with text or text + icon.',
      table: {
        category: 'Appearance',
        type: {
          summary: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
        },
        defaultValue: { summary: '"default"' },
      },
      if: { arg: 'variant', neq: 'link' },
    },
    children: {
      control: 'text',
      description:
        'Content of the button. Accepts text, icons, or any React node. Ignored when using asChild with a custom child element.',
      table: { type: { summary: 'React.ReactNode' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and prevents user interaction.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default form of the button, used for primary actions and commands.
 */
export const Default: Story = {};

/**
 * Use the `outline` button to reduce emphasis on secondary actions, such as
 * canceling or dismissing a dialog.
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

/**
 * Use the `ghost` button is minimalistic and subtle, for less intrusive
 * actions.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

/**
 * Use the `secondary` button to call for less emphasized actions, styled to
 * complement the primary button while being less conspicuous.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

/**
 * Use the `destructive` button to indicate errors, alerts, or the need for
 * immediate attention.
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

/**
 * Use the `link` button to reduce emphasis on tertiary actions, such as
 * hyperlink or navigation, providing a text-only interactive element.
 */
export const Link: Story = {
  args: {
    variant: 'link',
  },
};

/**
 * Use the `icon` size for a button with only an icon.
 */
export const Icon: Story = {
  args: {
    ...Secondary.args,
    size: 'icon',
    'aria-label': 'Mail',
    children: <Mail aria-hidden="true" />,
  },
};

/**
 * Add an icon element to a button to enhance visual communication and
 * providing additional context for the action.
 */
export const WithIcon: Story = {
  args: {
    ...Secondary.args,
  },
  render: (args) => (
    <Button {...args}>
      <Mail aria-hidden="true" /> Login with Email Button
    </Button>
  ),
};

/**
 * Use the `rounded-full` class to make the button rounded.
 */
export const Rounded: Story = {
  args: {
    ...Outline.args,
    size: 'icon',
    className: 'rounded-full',
    'aria-label': 'Scroll to top',
  },
  render: (args) => (
    <Button {...args}>
      <ArrowUpIcon aria-hidden="true" />
    </Button>
  ),
};

/**
 * Add the `disabled` prop to a button to prevent interactions and add a
 * loading indicator, such as a spinner, to signify an in-progress action.
 */
export const Loading: Story = {
  args: {
    ...Outline.args,
    disabled: true,
  },
  render: (args) => (
    <Button {...args}>
      <Loader2 className="animate-spin" />
      Submitting...
    </Button>
  ),
};

/**
 * Use the `sm` size for a smaller button, suitable for interfaces needing
 * compact elements without sacrificing usability.
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Use the `lg` size for a larger button, offering better visibility and
 * easier interaction for users.
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Display all sizes together to compare visual scale and spacing.
 * Helpful for design reviews and selecting the appropriate size.
 */
export const AllSizes: Story = {
  args: {
    ...Outline.args,
  },
  render: (args) => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button {...args} size="sm">
          Small
        </Button>
        <Button {...args} size="icon-sm" aria-label="Open external">
          <ArrowUpRightIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button {...args}>Default</Button>
        <Button {...args} size="icon" aria-label="Open external">
          <ArrowUpRightIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button {...args} size="lg">
          Large
        </Button>
        <Button {...args} size="icon-lg" aria-label="Open external">
          <ArrowUpRightIcon aria-hidden="true" />
        </Button>
      </div>
    </div>
  ),
};

/**
 * Add the `disabled` prop to prevent interactions with the button.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Render the Button as a child element (e.g., an anchor) using `asChild`.
 * Useful when you need semantic <a> or router links with Button styles.
 */
export const AsChildLink: Story = {
  args: {
    asChild: true,
    variant: 'default',
  },
  render: (args) => (
    <Button {...args}>
      <a href="#login">Login</a>
    </Button>
  ),
};
