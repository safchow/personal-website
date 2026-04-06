import { useNavigate } from '@tanstack/react-router';
import * as React from 'react';

import {
  ACTIVE_CASE_STUDY_SURFACE_CLASS,
  CASE_STUDY_SURFACE_RADIUS_CLASS,
  CASE_STUDY_THEME_CLASSES,
} from '@/common/CaseStudy/caseStudyThemes';
import { cn } from '@/lib/utils';
import {
  CASE_STUDY_MENU_ITEMS,
  type CaseStudyMenuItem,
} from '@/pages/Home/constants';

export const ExpandingMenu: React.FC = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = React.useState(
    CASE_STUDY_MENU_ITEMS[0]?.id ?? ''
  );

  return (
    <div className="flex h-full w-full min-h-0 flex-1 overflow-hidden">
      <div className="flex h-full w-full min-h-0 flex-col lg:flex-row gap-2">
        {CASE_STUDY_MENU_ITEMS.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onClick={() => {
              if (!item.href) return;
              void navigate({ to: item.href });
            }}
            onHover={() => setActiveId(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface MenuItemProps {
  item: CaseStudyMenuItem;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isActive,
  onClick,
  onHover,
}) => {
  const themeClasses = CASE_STUDY_THEME_CLASSES[item.id];

  return (
    <div
      className={cn(
        'relative flex min-h-0 w-full basis-0 flex-col overflow-hidden border transition-[flex-grow,background-color,border-color,box-shadow] duration-300 ease-out',
        CASE_STUDY_SURFACE_RADIUS_CLASS,
        isActive
          ? cn('grow-[9]', ACTIVE_CASE_STUDY_SURFACE_CLASS)
          : 'grow border-border/45 bg-card/55 dark:border-white/10 dark:bg-white/[0.04]',
        item.href ? 'cursor-pointer' : 'cursor-default',
        'hover:border-border/70 dark:hover:border-white/16',
        isActive && themeClasses.menuActiveSurface
      )}
      onClick={onClick}
      onMouseEnter={onHover}
      onKeyDown={(event) => {
        if (!item.href) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      role={item.href ? 'link' : undefined}
      tabIndex={item.href ? 0 : undefined}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 ease-out sm:p-5 md:p-6',
          isActive
            ? 'visible translate-y-0 opacity-100 transition-[opacity,transform] duration-200 delay-300'
            : 'invisible translate-y-3 opacity-0 transition-none'
        )}
      >
        <div className="w-[20rem] max-w-full text-left sm:w-[22rem]">
          <p className="text-[hsl(var(--menu-copy-title))] text-lg font-semibold tracking-tight sm:text-xl">
            {item.title}
          </p>
          <p className="mt-2 text-[hsl(var(--menu-copy-description))] text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};
