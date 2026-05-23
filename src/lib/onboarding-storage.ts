import { storage } from '@/storage/mmkv'

const KEY = 'hasSeenOnboarding'

export function setOnboardingDone() {
  storage.set(KEY, true)
}

export function hasSeenOnboarding() {
  return storage.getBoolean(KEY) ?? false
}

// DEV Only
export function resetOnboarding() {
  storage.set(KEY, false)
}
