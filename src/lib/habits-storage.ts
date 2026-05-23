import { Habit } from '@/lib/types/habit'
import { storage } from '@/storage/mmkv'

const KEY = 'habits:v23052026-1'

export function getHabits(): Habit[] {
  const raw = storage.getString(KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveHabits(habits: Habit[]) {
  storage.set(KEY, JSON.stringify(habits))
}
