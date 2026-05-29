export type Habit = {
  id: string
  name: string
  color: string
  icon: string
  frequency: 'daily' | 'weekly' | 'monthly'
  completionsPerDay?: number
  completions: Record<string, number>
  createdAt: string // For MMKV. Serialize a date with new Date().toISOString()
}
