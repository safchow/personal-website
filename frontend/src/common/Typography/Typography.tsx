import * as React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  as: Component = 'span',
  className = '',
  children,
  ...props
}) => {
  return (
    <Component className={`font-inter ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};

export type { TypographyProps };
