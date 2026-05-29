import { getDateKey } from '@/helpers/date'
import { getHabits, saveHabits } from '@/lib/habits-storage'
import { Habit } from '@/lib/types/habit'

import { create } from 'zustand'

type Store = {
  habits: Habit[]
  hydrate: () => void

  addHabit: (habit: Habit) => void
  removeHabit: (id: string) => void
  incrementHabit: (id: string) => void
  resetHabit: (id: string) => void

  // DEV ONLY
  resetHabits: () => void
}

export const useHabitsStore = create<Store>((set, get) => ({
  habits: [],

  hydrate: () => {
    set({ habits: getHabits() })
  },

  addHabit: (habit) => {
    const updated = [...get().habits, habit]
    set({ habits: updated })
    saveHabits(updated)
  },

  removeHabit: (id) => {
    const updated = get().habits.filter((h) => h.id !== id)
    set({ habits: updated })
    saveHabits(updated)
  },

  incrementHabit: (id) => {
    const today = getDateKey()

    const updated = get().habits.map((h) => {
      if (h.id !== id) return h

      const current = h.completions[today] ?? 0

      const max = h.completionsPerDay ?? 1

      if (current >= max) return h

      return {
        ...h,

        completions: {
          ...h.completions,

          [today]: current + 1,
        },
      }
    })

    set({ habits: updated })
    saveHabits(updated)
  },

  resetHabit: (id) => {
    const today = getDateKey()

    const updated = get().habits.map((h) => {
      if (h.id !== id) return h

      return {
        ...h,

        completions: {
          ...h.completions,

          [today]: 0,
        },
      }
    })

    set({ habits: updated })
    saveHabits(updated)
  },

  // DEV ONLY
  resetHabits: () => {
    set({ habits: [] })
    saveHabits([])
  },
}))
