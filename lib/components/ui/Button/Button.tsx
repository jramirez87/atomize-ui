import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '../../../utils/utils';
import { ButtonVariantsType, buttonVariants } from './variants';

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<ButtonVariantsType> & {
    asChild?: boolean;
  };

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export { Button };
