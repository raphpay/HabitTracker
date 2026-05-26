export type Habit = {
  id: string
  name: string
  color: string
  icon: string
  frequency: 'daily' | 'weekly' | 'monthly'
  completionsPerDay?: number
  completedDates: string[]
  createdAt: Date
}
