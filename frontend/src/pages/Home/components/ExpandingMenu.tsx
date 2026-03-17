import { motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const ExpandingMenu: React.FC = () => {
  const [activeId, setActiveId] = React.useState(menuItems[0]?.id ?? '');

  return (
    <div className="flex w-full min-h-0 flex-1 overflow-hidden">
      <div className="flex h-full w-full min-h-0 flex-col lg:flex-row gap-2">
        {menuItems.map((item, index) => (
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

const menuItems: MenuItemConfig[] = [
  { id: 'projects', gradientClass: 'expanding-menu-projects' },
  { id: 'experience', gradientClass: 'expanding-menu-experience' },
  { id: 'skills', gradientClass: 'expanding-menu-skills' },
  { id: 'contact', gradientClass: 'expanding-menu-contact' },
];

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
  item: MenuItemConfig;
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
    <motion.div
      className={cn(
        'relative flex w-full min-h-0 flex-col overflow-hidden rounded-xl cursor-pointer',
        item.gradientClass
      )}
      initial={false}
      animate={{
        flex: isActive ? 9 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onMouseEnter={onHover}
    >
      <NoiseOverlay intensity={noiseIntensity} />
      <div className="absolute inset-0 expanding-menu-vignette" />
    </motion.div>
  );
};

export interface MenuItemConfig {
  id: string;
  gradientClass: string;
}
