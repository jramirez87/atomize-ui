import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '../Button/Button';
import { Label } from '../Label/Label';
import { Input } from './Input';

/**
 * Displays a form input field or a component that looks like an input field.
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description:
        'Custom CSS classes to apply to the input element for additional styling or overrides.',
      table: { type: { summary: 'string' } },
    },
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'search',
        'tel',
        'url',
        'number',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
        'file',
      ],
      description:
        'Input field type. Choose the semantic type that matches the expected data.',
      table: {
        type: {
          summary:
            '"text" | "email" | "password" | "search" | "tel" | "url" | "number" | "date" | "time" | "datetime-local" | "month" | "week" | "file"',
        },
        defaultValue: { summary: '"text" (browser default)' },
      },
    },
    placeholder: {
      control: 'text',
      description:
        'Hint text shown when the input is empty. Do not use as a replacement for labels.',
      table: { type: { summary: 'string' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Prevents editing while allowing focus and selection.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input and prevents user interaction.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description:
        'Marks the field as required. Browsers may prevent submission if empty and indicate the requirement.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoComplete: {
      control: 'text',
      description:
        'Hints to the browser the type of data for autofill. Examples: "email", "username", "name", "tel", "organization", "address-line1".',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    className: 'w-96',
    type: 'email',
    placeholder: 'Email',
    disabled: false,
    readOnly: false,
    required: false,
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default form of the input field.
 */
export const Default: Story = {};

/** Shows placeholder-only usage. Use labels for accessibility in production. */
export const Placeholder: Story = {
  args: { placeholder: 'Your email' },
};

/** Use the `file` type to allow users to select and upload files from their
 * device.
 */
export const File: Story = {
  args: {
    type: 'file',
  },
  render: args => (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input {...args} id="picture" />
    </div>
  ),
};

/**
 * Use the `disabled` prop to make the input non-interactive and appears faded,
 * indicating that input is not currently accepted.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/** Use the `password` type to mask the input characters for sensitive data entry,
 * such as passwords.
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
  render: args => (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input {...args} id="password" />
    </div>
  ),
};

/** Use the `readOnly` prop to make the input non-editable while still allowing
 * focus and text selection.
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
};

/** Marks the field as required. */
export const Required: Story = {
  args: {
    required: true,
  },
  render: args => (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="email-required">
        Email
        <span aria-hidden="true" className="text-destructive">
          {' '}
          *
        </span>
      </Label>
      <Input {...args} id="email-required" />
    </div>
  ),
};

/** Presents an invalid state using aria-invalid for accessible styling. */
export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Invalid value',
  },
};

/** Suggests autofill context to the browser. */
export const WithAutocomplete: Story = {
  args: {
    autoComplete: 'email',
    placeholder: 'email@example.com',
  },
};

/** Controlled input example. */
const ControlledExample: React.FC<
  React.ComponentProps<typeof Input>
> = args => {
  const [value, setValue] = React.useState('Hello');
  return (
    <div className="grid w-96 items-center gap-1.5">
      <Label htmlFor="controlled">Controlled</Label>
      <Input
        {...args}
        id="controlled"
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
      />
      <p className="text-foreground/60 text-sm">Current: {value || '∅'}</p>
    </div>
  );
};

/** Controlled input with state reflected in UI. */
export const Controlled: Story = {
  args: {
    placeholder: 'Type something…',
  },
  render: args => <ControlledExample {...args} />,
};

/** Uncontrolled input with defaultValue. */
export const Uncontrolled: Story = {
  args: {
    placeholder: 'Uncontrolled',
  },
  render: args => (
    <div className="grid w-96 items-center gap-1.5">
      <Label htmlFor="uncontrolled">Uncontrolled</Label>
      <Input {...args} id="uncontrolled" defaultValue="Initial" />
    </div>
  ),
};

/** Number input with constraints. */
export const NumberWithConstraints: Story = {
  args: {
    type: 'number',
  },
  render: args => (
    <div className="grid w-64 items-center gap-1.5">
      <Label htmlFor="age">Age</Label>
      <Input {...args} id="age" min={0} max={120} step={1} placeholder="0" />
    </div>
  ),
};

/** Search field variant. */
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search…',
  },
};

/** Telephone field with a pattern hint. */
export const Telephone: Story = {
  args: {
    type: 'tel',
    placeholder: '+1 555 0100',
    pattern: '+?[0-9 -]+',
    inputMode: 'tel',
  },
};

/** URL field. */
export const Url: Story = {
  args: {
    type: 'url',
    placeholder: 'https://example.com',
  },
};

/** Date and time inputs. */
export const DateField: Story = {
  args: {
    type: 'date',
  },
};

/** Time input field. */
export const TimeField: Story = {
  args: {
    type: 'time',
  },
};

/** Local date and time input field. */
export const DateTimeLocalField: Story = {
  args: {
    type: 'datetime-local',
  },
};

/** Month input field. */
export const MonthField: Story = {
  args: {
    type: 'month',
  },
};

/** Week input field. */
export const WeekField: Story = {
  args: {
    type: 'week',
  },
};

/**
 * Use the `Label` component to includes a clear, descriptive label above or
 * alongside the input area to guide users.
 */
export const WithLabel: Story = {
  render: args => (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="email">{args.placeholder}</Label>
      <Input {...args} id="email" />
    </div>
  ),
};

/**
 * Use a text element below the input field to provide additional instructions
 * or information to users.
 */
export const WithHelperText: Story = {
  render: args => (
    <div className="grid items-center gap-1.5">
      <Label htmlFor="email-2">{args.placeholder}</Label>
      <Input {...args} id="email-2" />
      <p className="text-foreground/60 text-sm">Enter your email address.</p>
    </div>
  ),
};

/**
 * Use the `Button` component to indicate that the input field can be submitted
 * or used to trigger an action.
 */
export const WithButton: Story = {
  render: args => (
    <div className="flex items-center space-x-2">
      <Input {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};

/**
 * Interactive example with two scenarios:
 * 1) Submit an invalid email to trigger the error state (shows alert and sets aria-invalid).
 * 2) Correct it with a valid email and submit to show the success message.
 * Demonstrates a small end-to-end flow with Input + Button and accessible feedback.
 */
const WithButtonInteractiveExample: React.FC<
  React.ComponentProps<typeof Input>
> = args => {
  const [value, setValue] = React.useState('');
  const [status, setStatus] = React.useState<'initial' | 'error' | 'success'>(
    'initial'
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (value && /.+@.+\..+/.test(value)) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid w-96 items-center gap-1.5"
    >
      <Label htmlFor="subscribe-email">Email</Label>
      <Input
        {...args}
        id="subscribe-email"
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        aria-invalid={status === 'error' ? true : undefined}
      />
      {status === 'error' && (
        <p role="alert" className="text-destructive text-sm">
          Please enter a valid email.
        </p>
      )}
      {status === 'success' && (
        <p role="status" className="text-primary text-sm">
          Subscribed!
        </p>
      )}
      <div className="pt-1.5">
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  );
};

/** Interactive example with email input and button. */
export const WithButtonInteractive: Story = {
  args: {
    placeholder: 'Email',
    type: 'email',
  },
  render: args => <WithButtonInteractiveExample {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const email = await canvas.findByLabelText(/email/i, { selector: 'input' });

    await step?.('Type an invalid email', async () => {
      await userEvent.type(email, 'exampleemail.com', { delay: 50 });
    });

    await step?.('Submit and show error state', async () => {
      const submit = await canvas.findByRole('button', { name: /subscribe/i });
      await userEvent.click(submit);
      await expect(await canvas.findByRole('alert')).toHaveTextContent(
        /please enter a valid email/i
      );
      await expect(email).toHaveAttribute('aria-invalid', 'true');
    });

    await step?.('Type a valid email', async () => {
      await new Promise(r => setTimeout(r, 1000));
      await userEvent.clear(email);
      await userEvent.type(email, 'example@email.com', { delay: 20 });
    });

    await step?.('Submit the form', async () => {
      const submit = await canvas.findByRole('button', { name: /subscribe/i });
      await userEvent.click(submit);
    });

    await step?.('Shows success message', async () => {
      await expect(await canvas.findByText(/subscribed!/i)).toBeInTheDocument();
    });
  },
};
