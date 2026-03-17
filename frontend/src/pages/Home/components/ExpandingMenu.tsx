import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  CASE_STUDY_MENU_ITEMS,
  type CaseStudyMenuItem,
} from '@/pages/Home/constants';

export const ExpandingMenu: React.FC = () => {
  const [activeId, setActiveId] = React.useState(
    CASE_STUDY_MENU_ITEMS[0]?.id ?? ''
  );

  return (
    <div className="flex w-full min-h-0 flex-1 overflow-hidden">
      <div className="flex h-full w-full min-h-0 flex-col lg:flex-row gap-2">
        {CASE_STUDY_MENU_ITEMS.map((item, index) => (
          <MenuItem
            key={item.id}
            item={item}
            index={index}
            isActive={activeId === item.id}
            onHover={() => setActiveId(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const NoiseOverlay: React.FC<{ intensity?: number; className?: string }> = ({
  intensity = 0.4,
  className,
}) => (
  <div
    className={cn(
      'absolute inset-0 mix-blend-overlay pointer-events-none',
      className
    )}
    style={{
      backgroundImage: NOISE_SVG,
      backgroundSize: '150px 150px',
      opacity: intensity,
    }}
  />
);

interface MenuItemProps {
  item: CaseStudyMenuItem;
  index: number;
  isActive: boolean;
  onHover: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  index,
  isActive,
  onHover,
}) => {
  const noiseIntensity = 0.3 + index * 0.05;

  return (
    <div
      className={cn(
        'relative flex min-h-0 w-full basis-0 flex-col overflow-hidden rounded-xl cursor-pointer transition-[flex-grow] duration-300 ease-out',
        isActive ? 'grow-[9]' : 'grow',
        item.gradientClass
      )}
      onMouseEnter={onHover}
    >
      <NoiseOverlay intensity={noiseIntensity} />
      <div className="absolute inset-0 expanding-menu-vignette" />
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 ease-out sm:p-5 md:p-6',
          isActive
            ? 'visible translate-y-0 opacity-100 transition-all duration-200 delay-200'
            : 'invisible translate-y-3 opacity-0 transition-none'
        )}
      >
        <div className="w-[20rem] max-w-full text-left sm:w-[22rem]">
          <p className="text-lg font-semibold tracking-tight sm:text-xl">
            {item.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
