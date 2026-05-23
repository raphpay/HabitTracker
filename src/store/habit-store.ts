import { Habit } from '@/lib/types/habit'
import { create } from 'zustand'

type HabitStore = {
  habits: Habit[]
  addHabit: (habit: Habit) => void
  toggleHabit: (id: string) => void
}

export const useHabitsStore = create<HabitStore>((set) => ({
  habits: [],

  addHabit: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit],
    })),

  toggleHabit: (id) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,

              completedDates: [
                ...habit.completedDates,

                new Date().toISOString(),
              ],
            }
          : habit,
      ),
    })),
}))
