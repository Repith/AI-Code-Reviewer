import { AvailabilityIcon } from './AvailabilityIcon';
import { BugIcon } from './BugIcon';
import { CloseIcon } from './CloseIcon';
import { MenuIcon } from './MenuIcon';
import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';
import { SystemIcon } from './SystemIcon';
import { TimeIcon } from './TimeIcon';

const iconComponents = {
  sun: SunIcon,
  moon: MoonIcon,
  system: SystemIcon,
  menu: MenuIcon,
  close: CloseIcon,
  time: TimeIcon,
  bug: BugIcon,
  availability: AvailabilityIcon,
} as const;

export type IconName = keyof typeof iconComponents;

interface IconsProps {
  name: IconName;
  className?: string;
}

export function Icons({ name, className }: IconsProps) {
  const IconComponent = iconComponents[name];
  return <IconComponent className={className} />;
}

export interface IconsDetailsProps {
  className?: string;
}
