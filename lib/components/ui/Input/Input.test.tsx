import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Button } from '../Button/Button';
import { Label } from '../Label/Label';
import { Input } from './Input';

describe('Input', () => {
  let label = 'input-field';

  it('renders without crashing', () => {
    render(<Input aria-label={label} />);
    expect(screen.getByRole('textbox', { name: label })).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    const placeholder = 'Enter text';
    render(<Input placeholder={placeholder} aria-label={label} />);
    const input = screen.getByRole('textbox', { name: label });
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('accepts user input', async () => {
    render(<Input aria-label={label} />);
    const input = screen.getByRole('textbox', { name: label });
    await userEvent.type(input, 'Hello');
    expect((input as HTMLInputElement).value).toBe('Hello');
  });

  it('supports disabling', () => {
    render(<Input disabled aria-label={label} />);
    expect(screen.getByRole('textbox', { name: label })).toBeDisabled();
  });

  it('supports readOnly', () => {
    render(<Input readOnly aria-label={label} />);
    expect(screen.getByRole('textbox', { name: label })).toHaveAttribute('readonly');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" aria-label={label} />);
    expect(screen.getByRole('textbox', { name: label })).toHaveClass('custom-class');
  });

  it('renders with type "password"', () => {
    render(<Input aria-label={label} type="password" />);
    const input = screen.getByLabelText(label, { selector: 'input' });
    expect(input).toHaveAttribute('type', 'password');
  });

  it('supports type "file" with associated label', () => {
    label = 'Picture';
    render(
      <div>
        <Label htmlFor="picture">{label}</Label>
        <Input id="picture" type="file" />
      </div>,
    );
    const input = screen.getByLabelText(label, { selector: 'input' });
    expect(input).toHaveAttribute('type', 'file');
  });

  it('associates Label and Input as in WithLabel', () => {
    label = 'Email';
    render(
      <div>
        <Label htmlFor="email">{label}</Label>
        <Input id="email" placeholder={label} />
      </div>,
    );
    const input = screen.getByLabelText(label, { selector: 'input' });
    expect(input).toHaveAttribute('placeholder', label);
  });

  it('renders helper text as in WithHelperText', () => {
    const helperText = 'Enter your email address.';
    render(
      <div>
        <Label htmlFor="email-2">Email</Label>
        <Input id="email-2" />
        <p className="text-foreground/60 text-sm">{helperText}</p>
      </div>,
    );
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('renders Input with a submit Button as in WithButton', () => {
    render(
      <div className="flex items-center space-x-2">
        <Input aria-label="email" />
        <Button type="submit">Subscribe</Button>
      </div>,
    );
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
  });

  it('marks the field as required', () => {
    label = 'required-input';
    render(<Input aria-label={label} required />);
    const input = screen.getByLabelText(label, { selector: 'input' });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('required');
  });

  it('applies aria-invalid for invalid state', () => {
    label = 'invalid-input';
    render(<Input aria-label={label} aria-invalid />);
    const input = screen.getByLabelText(label, { selector: 'input' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets autoComplete attribute', () => {
    label = 'email';
    render(<Input aria-label={label} autoComplete={label} />);
    const input = screen.getByLabelText(label, { selector: 'input' });
    expect(input).toHaveAttribute('autocomplete', label);
  });

  it('controlled input updates value and reflects UI', async () => {
    const Controlled = () => {
      const [value, setValue] = React.useState('Hello');
      return (
        <div>
          <Label htmlFor="controlled">Controlled</Label>
          <Input id="controlled" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
          <p>Current: {value || '∅'}</p>
        </div>
      );
    };
    render(<Controlled />);
    const input = screen.getByLabelText('Controlled', { selector: 'input' }) as HTMLInputElement;
    expect(input.value).toBe('Hello');
    await userEvent.clear(input);
    await userEvent.type(input, 'World');
    expect(input.value).toBe('World');
    expect(screen.getByText('Current: World')).toBeInTheDocument();
  });

  it('uncontrolled input respects defaultValue', async () => {
    render(<Input aria-label="uncontrolled" defaultValue="Initial" />);
    const input = screen.getByLabelText('uncontrolled', { selector: 'input' }) as HTMLInputElement;
    expect(input.value).toBe('Initial');
    await userEvent.type(input, '123');
    expect(input.value).toBe('Initial123');
  });

  it('number input with constraints', () => {
    render(<Input aria-label="age" type="number" min={0} max={120} step={1} placeholder="0" />);
    const input = screen.getByLabelText('age', { selector: 'input' });
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '120');
    expect(input).toHaveAttribute('step', '1');
    expect(input).toHaveAttribute('placeholder', '0');
  });

  it('search input', () => {
    render(<Input aria-label="search" type="search" placeholder="Search…" />);
    const input = screen.getByLabelText('search', { selector: 'input' });
    expect(input).toHaveAttribute('type', 'search');
  });

  it('telephone input with pattern and inputMode', () => {
    render(
      <Input
        aria-label="phone"
        type="tel"
        placeholder="+1 555 0100"
        pattern={'+?[0-9\\-\\s]+'}
        inputMode="tel"
      />,
    );
    const input = screen.getByLabelText('phone', { selector: 'input' });
    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('pattern', '+?[0-9\\-\\s]+');
    expect(input).toHaveAttribute('inputmode', 'tel');
  });

  it('url input', () => {
    render(<Input aria-label="url" type="url" placeholder="https://example.com" />);
    const input = screen.getByLabelText('url', { selector: 'input' });
    expect(input).toHaveAttribute('type', 'url');
  });

  it.each([['date'], ['time'], ['datetime-local'], ['month'], ['week']] as const)(
    'date/time variant: type="%s"',
    (t) => {
      render(<Input aria-label={`dt-${t}`} type={t} />);
      const input = screen.getByLabelText(`dt-${t}`, { selector: 'input' });
      expect(input).toHaveAttribute('type', t);
    },
  );

  it('interactive flow: invalid then valid email (Like WithButtonInteractive)', async () => {
    const Form = () => {
      const [val, setVal] = React.useState('');
      const [status, setStatus] = React.useState<'initial' | 'error' | 'success'>('initial');
      const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (val && /.+@.+\..+/.test(val)) setStatus('success');
        else setStatus('error');
      };
      return (
        <form onSubmit={onSubmit} noValidate>
          <Label htmlFor="sub-email">Email</Label>
          <Input
            id="sub-email"
            value={val}
            onChange={(e) => setVal(e.currentTarget.value)}
            aria-invalid={status === 'error' ? true : undefined}
          />
          {status === 'error' && <p role="alert">Please enter a valid email.</p>}
          {status === 'success' && <p role="status">Subscribed!</p>}
          <Button type="submit">Subscribe</Button>
        </form>
      );
    };

    render(<Form />);

    const email = screen.getByLabelText('Email', { selector: 'input' });
    // invalid
    await userEvent.type(email, 'exampleemail.com');
    await userEvent.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/please enter a valid email/i);
    expect(email).toHaveAttribute('aria-invalid', 'true');

    // valid
    await userEvent.clear(email);
    await userEvent.type(email, 'example@email.com');
    await userEvent.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(await screen.findByRole('status')).toHaveTextContent(/subscribed!/i);
  });
});
