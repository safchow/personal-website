import { useNavigate } from '@tanstack/react-router';
import * as React from 'react';

import {
  ACTIVE_CASE_STUDY_SURFACE_CLASS,
  CASE_STUDY_SURFACE_RADIUS_CLASS,
  CASE_STUDY_THEME_CLASSES,
  DESKTOP_HOVER_CASE_STUDY_SURFACE_CLASS,
} from '@/common/CaseStudy/caseStudyThemes';
import { Typography } from '@/common/Typography';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/ui/carousel';
import { cn } from '@/lib/utils';
import {
  CASE_STUDY_MENU_ITEMS,
  type CaseStudyMenuItem,
} from '@/pages/Home/constants';

export const ExpandingMenu: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const carouselApiRef = React.useRef<CarouselApi>(undefined);

  const handleSetApi = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    carouselApiRef.current = api;

    const updateActiveIndex = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    updateActiveIndex();
    api.on('select', updateActiveIndex);
    api.on('reInit', updateActiveIndex);
  }, []);

  return (
    <Carousel
      className="w-full px-0 sm:px-10"
      opts={{ align: 'start' }}
      setApi={handleSetApi}
    >
      <CarouselContent className="-ml-3">
        {CASE_STUDY_MENU_ITEMS.map((item, index) => (
          <CarouselItem key={item.id} className="basis-full pl-3 lg:basis-1/2">
            <MenuItem
              item={item}
              isActive={activeIndex === index}
              onClick={() => {
                if (!item.href) return;
                void navigate({ to: item.href });
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
        {CASE_STUDY_MENU_ITEMS.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to ${item.title}`}
              aria-current={isActive}
              className={cn(
                'h-2 rounded-full transition-[width,background-color,opacity] duration-300 ease-out',
                isActive
                  ? 'w-5 bg-foreground/70'
                  : 'w-2 bg-foreground/20 hover:bg-foreground/35'
              )}
              onClick={() => {
                carouselApiRef.current?.scrollTo(index);
              }}
            />
          );
        })}
      </div>

      <CarouselPrevious className="hidden sm:inline-flex sm:-left-2 sm:top-1/2" />
      <CarouselNext className="hidden sm:inline-flex sm:-right-2 sm:top-1/2" />
    </Carousel>
  );
};

interface MenuItemProps {
  item: CaseStudyMenuItem;
  isActive: boolean;
  onClick: () => void;
}

const MOBILE_INACTIVE_CARD_CLASS =
  'border-border/45 bg-card/55 shadow-none dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none';

const MOBILE_ACTIVE_DESKTOP_RESET_CLASS =
  'lg:border-border/45 lg:bg-card/55 lg:shadow-none lg:dark:border-white/10 lg:dark:bg-white/[0.04] lg:dark:shadow-none';

const MENU_ITEM_BASE_CLASS =
  'relative flex min-h-[16rem] w-full cursor-pointer flex-col justify-end overflow-hidden border p-5 text-left transition-[background-color,border-color,box-shadow] duration-300 ease-out sm:min-h-[18rem] sm:p-6';

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive, onClick }) => {
  const themeClasses = CASE_STUDY_THEME_CLASSES[item.id];
  const mobileActiveSurfaceClass = isActive
    ? cn(
        ACTIVE_CASE_STUDY_SURFACE_CLASS,
        themeClasses.menuActiveSurface,
        MOBILE_ACTIVE_DESKTOP_RESET_CLASS
      )
    : '';
  const menuItemClassName = [
    MENU_ITEM_BASE_CLASS,
    CASE_STUDY_SURFACE_RADIUS_CLASS,
    MOBILE_INACTIVE_CARD_CLASS,
    mobileActiveSurfaceClass,
    DESKTOP_HOVER_CASE_STUDY_SURFACE_CLASS,
    themeClasses.menuDesktopHoverSurface,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={menuItemClassName}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div className="w-[20rem] max-w-full">
        <Typography
          as="p"
          className="text-[hsl(var(--menu-copy-title))] text-lg font-semibold tracking-tight sm:text-xl"
        >
          {item.title}
        </Typography>
        <Typography
          as="p"
          className="mt-2 text-[hsl(var(--menu-copy-description))] text-sm leading-relaxed"
        >
          {item.description}
        </Typography>
      </div>
    </div>
  );
};
