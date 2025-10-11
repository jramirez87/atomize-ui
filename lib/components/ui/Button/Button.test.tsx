import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

const textSizes = ['default', 'sm', 'lg'] as const;
const iconSizes = ['icon', 'icon-sm', 'icon-lg'] as const;

describe('Button', () => {
  it.each(variants)('renders variant "%s" with visible label', (variant) => {
    const label = `Action: ${variant}`;
    render(<Button variant={variant}>{label}</Button>);

    // Accessible name comes from visible text
    const btn = screen.getByRole('button', { name: label });
    expect(btn).toBeInTheDocument();
  });

  it.each(textSizes)('applies size "%s" for text buttons', (size) => {
    const label = `Size: ${size}`;
    render(
      <Button variant="secondary" size={size}>
        {label}
      </Button>,
    );
    const btn = screen.getByRole('button', { name: label });
    // Check a key class per size from cva definition
    if (size === 'default') expect(btn).toHaveClass('h-9');
    if (size === 'sm') expect(btn).toHaveClass('h-8');
    if (size === 'lg') expect(btn).toHaveClass('h-10');
  });

  it.each(iconSizes)(
    'applies icon size "%s" and requires aria-label for icon-only buttons',
    (size) => {
      const label = 'Open';
      render(
        <Button variant="secondary" size={size} aria-label={label}>
          {/* decorative child for icon-only */}
          <span aria-hidden="true" />
        </Button>,
      );
      // Accessible name must come from aria-label
      const btn = screen.getByRole('button', { name: label });
      expect(btn).toBeInTheDocument();
      // Check a key class per icon size from cva definition
      if (size === 'icon') expect(btn).toHaveClass('size-9');
      if (size === 'icon-sm') expect(btn).toHaveClass('size-8');
      if (size === 'icon-lg') expect(btn).toHaveClass('size-10');
    },
  );

  it('WithIcon story: text provides accessible name; icon is decorative', () => {
    render(
      <Button variant="secondary">
        <span aria-hidden="true" /> Login with Email Button
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /login with email button/i });
    expect(btn).toBeInTheDocument();
    // Ensure our decorative icon is in the tree and marked aria-hidden
    const icon = btn.querySelector('[aria-hidden="true"]');
    expect(icon).not.toBeNull();
  });

  it('Rounded story: icon-only with rounded-full class', () => {
    render(
      <Button variant="outline" size="icon" className="rounded-full" aria-label="Scroll to top">
        <span aria-hidden="true" />
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /scroll to top/i });
    expect(btn).toHaveClass('rounded-full');
  });

  it('Loading story: disabled button with spinner child', () => {
    render(
      <Button variant="outline" disabled>
        <span className="animate-spin" aria-hidden="true" /> Submitting...
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /submitting/i });
    expect(btn).toBeDisabled();
    expect(btn.querySelector('.animate-spin')).not.toBeNull();
  });

  it('Disabled story: prevents click interactions', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /save/i });
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('Outline variant applies border style', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole('button', { name: /outline/i });
    expect(btn).toHaveClass('border');
  });

  it('Link variant applies underline-offset-4 style', () => {
    render(<Button variant="link">Link</Button>);
    const btn = screen.getByRole('button', { name: /link/i });
    expect(btn).toHaveClass('underline-offset-4');
  });

  it('Clicks story: calls onClick handler', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(btn);
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('AsChildLink story: renders anchor with link semantics and button styles', () => {
    render(
      <Button asChild>
        <a href="#login">Login</a>
      </Button>,
    );

    // Semantics: should be a link, not a button
    const link = screen.getByRole('link', { name: /login/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#login');
    expect(screen.queryByRole('button', { name: /login/i })).toBeNull();

    // Styles: default variant + default size classes applied to the anchor
    expect(link).toHaveClass('bg-primary');
    expect(link).toHaveClass('text-primary-foreground');
    expect(link).toHaveClass('h-9');
    expect(link).toHaveClass('px-4');
  });
});
