import * as React from 'react';

export type FontSizePreset =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

export type FontWeightPreset =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold';

export type LineHeightPreset =
  | 'none'
  | 'tight'
  | 'snug'
  | 'normal'
  | 'relaxed'
  | 'loose';

const fontSizeMap: Record<FontSizePreset, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
};

const lineHeightMap: Record<LineHeightPreset, string> = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

const fontWeightMap: Record<FontWeightPreset, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

function getFontSizeClass(value: FontSizePreset | number | string): string {
  if (typeof value === 'number') return `text-[${value}px]`;
  if (typeof value === 'string' && !(value in fontSizeMap))
    return `text-[${value}]`;
  return fontSizeMap[value as FontSizePreset];
}

function getLineHeightClass(
  value: LineHeightPreset | number | string
): string {
  if (typeof value === 'number') return `leading-[${value}]`;
  if (typeof value === 'string' && !(value in lineHeightMap))
    return `leading-[${value}]`;
  return lineHeightMap[value as LineHeightPreset];
}

function getFontWeightClass(
  value: FontWeightPreset | number | string
): string {
  if (typeof value === 'number') return `font-[${value}]`;
  if (typeof value === 'string' && !(value in fontWeightMap))
    return `font-[${value}]`;
  return fontWeightMap[value as FontWeightPreset];
}

interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  fontSize?: FontSizePreset | number | string;
  lineHeight?: LineHeightPreset | number | string;
  fontWeight?: FontWeightPreset | number | string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  as: Component = 'span',
  fontSize = 'base',
  lineHeight = 'normal',
  fontWeight = 'normal',
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'font-inter',
    getFontSizeClass(fontSize),
    getLineHeightClass(lineHeight),
    getFontWeightClass(fontWeight),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export type { TypographyProps };
