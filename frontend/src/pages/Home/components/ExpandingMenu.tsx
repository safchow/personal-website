import { useNavigate } from '@tanstack/react-router';
import * as React from 'react';

import { Typography } from '@/common/Typography';
import { Card, CardContent } from '@/components/ui/ui/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
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
    <div className="w-full">
      <Carousel
        className="mx-auto w-full max-w-3xl"
        opts={{ align: 'start' }}
        setApi={handleSetApi}
      >
        <CarouselContent>
          {CASE_STUDY_MENU_ITEMS.map((item) => (
            <CarouselItem key={item.id}>
              <MenuItem
                item={item}
                onClick={() => {
                  if (!item.href) return;
                  void navigate({ to: item.href });
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-2">
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
    </div>
  );
};

interface MenuItemProps {
  item: CaseStudyMenuItem;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onClick }) => {
  return (
    <Card
      className="flex min-h-[16rem] cursor-pointer flex-col rounded-2xl border-border/60 bg-card shadow-none transition-colors duration-200 hover:border-border/85 sm:min-h-[18rem]"
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
      <CardContent className="mt-auto p-6 sm:p-8">
        <div className="max-w-[32rem]">
          <Typography
            as="p"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            {item.title}
          </Typography>
          <Typography
            as="p"
            className="mt-4 text-base leading-relaxed text-foreground/72"
          >
            {item.description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
