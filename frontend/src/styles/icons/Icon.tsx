import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';
import { SystemIcon } from './SystemIcon';

const iconComponents = {
  sun: SunIcon,
  moon: MoonIcon,
  system: SystemIcon,
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
