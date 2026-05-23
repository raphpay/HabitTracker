export type Habit = {
  id: string
  name: string
  color: string
  frequency: 'daily' | 'weekly' | 'monthly'
  completedDates: string[]
  createdAt: Date
}
