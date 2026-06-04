import * as React from 'react';

import { cn } from '@/lib/utils';
import { README_PROJECTS } from '@/pages/Home/constants';

import { TrackedProjectCard } from './TrackedProjectCard';

const ReadmeProjectCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = React.useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel || carousel.clientWidth === 0) return;

    const nextIndex = Math.round(carousel.scrollLeft / carousel.clientWidth);
    setActiveIndex(
      Math.max(0, Math.min(nextIndex, README_PROJECTS.length - 1))
    );
  }, []);

  const scrollToProject = React.useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollTo({
      left: index * carousel.clientWidth,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="md:hidden">
      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
        role="region"
        aria-label="Selected work projects"
        aria-roledescription="carousel"
      >
        {README_PROJECTS.map((project) => (
          <div
            key={project.title}
            className="min-w-0 shrink-0 grow-0 basis-full snap-center"
            role="group"
            aria-roledescription="slide"
          >
            <TrackedProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {README_PROJECTS.map((project, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={project.title}
              type="button"
              aria-label={`Show ${project.title}`}
              aria-current={isActive}
              className={cn(
                'h-2 rounded-full transition-[width,background-color,opacity] duration-300 ease-out',
                isActive
                  ? 'w-5 bg-foreground/70'
                  : 'w-2 bg-foreground/20 hover:bg-foreground/35'
              )}
              onClick={() => scrollToProject(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export const SelectedWork: React.FC = () => {
  return (
    <section>
      <ReadmeProjectCarousel />

      <div className="hidden gap-4 md:grid md:grid-cols-2">
        {README_PROJECTS.map((project) => (
          <TrackedProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
