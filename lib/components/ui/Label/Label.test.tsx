import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Input } from '../Input/Input';
import { Label } from './Label';

describe('Label', () => {
  it('associates via htmlFor and focuses input on click', async () => {
    render(
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" />
      </div>,
    );
    const label = screen.getByText('Username');
    const input = screen.getByLabelText('Username') as HTMLInputElement;
    expect(label).toHaveAttribute('for', 'username');
    await userEvent.click(label);
    expect(document.activeElement).toBe(input);
  });

  it('applies default Tailwind classes', () => {
    render(<Label htmlFor="input-2">Email</Label>);
    const label = screen.getByText('Email');
    expect(label).toHaveClass('text-sm', 'font-medium', 'select-none');
  });

  it('appends custom className', () => {
    render(
      <Label htmlFor="input-3" className="font-bold text-red-600">
        Email
      </Label>,
    );
    const label = screen.getByText('Email');
    expect(label).toHaveClass('text-red-600', 'font-bold');
  });

  it('passes through native and aria props (id, data-*, aria-*)', () => {
    render(
      <Label htmlFor="input-4" id="custom-label" data-testid="label" aria-describedby="email-help">
        Address
      </Label>,
    );
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('id', 'custom-label');
    expect(label).toHaveAttribute('aria-describedby', 'email-help');
    expect(label).toHaveTextContent('Address');
  });

  it('required indicator is decorative and input is required', () => {
    render(
      <div>
        <Label htmlFor="email-required">
          Email <span aria-hidden="true">*</span>
        </Label>
        <Input id="email-required" required />
      </div>,
    );
    const label = screen.getByText(/email/i);
    const asterisk = label.querySelector('[aria-hidden="true"]');
    expect(asterisk).not.toBeNull();
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeRequired();
  });

  it('visually hidden label uses sr-only and still labels input', () => {
    const { container } = render(
      <div>
        <Label htmlFor="email-sr" className="sr-only">
          Email
        </Label>
        <Input id="email-sr" />
      </div>,
    );
    const label = container.querySelector('label');
    expect(label).toHaveClass('sr-only');
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('label with icon keeps icon decorative', () => {
    render(
      <div>
        <Label htmlFor="email-icon">
          <span aria-hidden="true" /> Email
        </Label>
        <Input id="email-icon" />
      </div>,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    const label = screen.getByText('Email').closest('label');
    expect(label?.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });
});
