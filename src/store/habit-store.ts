import { getHabits, saveHabits } from '@/lib/habits-storage'
import { Habit } from '@/lib/types/habit'

import { create } from 'zustand'

type Store = {
  habits: Habit[]
  hydrate: () => void

  addHabit: (habit: Habit) => void
  removeHabit: (id: string) => void
  toggleHabit: (id: string) => void
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

  toggleHabit: (id) => {
    const updated = get().habits.map((h) =>
      h.id === id
        ? {
            ...h,
            completedDates: [...h.completedDates, new Date().toISOString()],
          }
        : h,
    )

    set({ habits: updated })
    saveHabits(updated)
  },
}))
