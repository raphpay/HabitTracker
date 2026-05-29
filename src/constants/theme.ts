/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css'

import { Platform } from 'react-native'

export const Colors = {
  light: {
    principalText: '#111111',
    secondaryText: '#4B4B4B',
    background: '#FFC0CB',
    backgroundElement: '#FFE5EC',
    backgroundSelected: '#E0E1E6',
    button: '#00C2FF',
    orange: '#FF9F1C',
    yellow: '#FFD60A',
    red: '#FF5D73',
    blue: '#00C2FF',
    green: '#06D6A0',
    purple: '#9B5DE5',
    pink: '#FF4FA3',
    cyan: '#00B8D9',
  },
  dark: {
    principalText: '#FFFFFF',
    secondaryText: '#CFCFCF',
    background: '#1A1A1A',
    backgroundElement: '#2B2B2B',
    backgroundSelected: '#2E3135',
    button: '#00C2FF',
    orange: '#FF9F1C',
    yellow: '#FFD60A',
    red: '#FF5D73',
    blue: '#00C2FF',
    green: '#06D6A0',
    purple: '#9B5DE5',
    pink: '#FF4FA3',
    cyan: '#00B8D9',
  },
} as const

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
})

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const

export const Shadow = {
  offset: 4,
  opacity: 1,
  radius: 0,
  color: '#000',
}

export const Border = {
  radius: 8,
  width: 2,
  largeWidth: 4,
}

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0
export const MaxContentWidth = 800
