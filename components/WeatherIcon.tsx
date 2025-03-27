import { Platform } from 'react-native';
import { Bone as LucideIcon } from 'lucide-react-native';
import React from 'react';

type WeatherIconProps = {
  icon: typeof LucideIcon;
  size?: number;
  color?: string;
};

export function WeatherIcon({ icon: Icon, size = 24, color = '#212529' }: WeatherIconProps) {
  // On web, we need to prevent the touch event warnings
  const iconProps = Platform.select({
    web: {
      // Remove all touch event handlers on web
      onStartShouldSetResponder: undefined,
    },
    default: {},
  });

  return <Icon size={size} color={color} {...iconProps} />;
}