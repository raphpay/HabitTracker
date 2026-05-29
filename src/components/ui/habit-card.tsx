import { NeoIconButton } from '@/components/neo/neoIconButton'
import { ThemedText } from '@/components/themed-text'
import { Border, Shadow, Spacing } from '@/constants/theme'
import type { Habit } from '@/lib/types/habit'
import { Check, X } from 'lucide-react-native'
import { StyleSheet, View } from 'react-native'

type Props = {
  habit: Habit
  progress?: number
  target?: number
  onPressCheck?: () => void
}

export function HabitCard({ habit, onPressCheck }: Props) {
  function formatDate(date: Date) {
    return date.toISOString().split('T')[0]
  }

  const today = formatDate(new Date())

  const completionsToday = habit.completedDates.filter(
    (d) => formatDate(new Date(d)) === today,
  ).length

  const target = habit.completionsPerDay ?? 1
  const progress = completionsToday

  function calculateStreak(dates: string[]) {
    const uniqueDays = Array.from(
      new Set(dates.map((d) => formatDate(new Date(d)))),
    ).sort()

    let streak = 0
    let current = new Date()

    while (true) {
      const day = formatDate(current)
      if (uniqueDays.includes(day)) {
        streak += 1
        current.setDate(current.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  const streak = calculateStreak(habit.completedDates)

  const isCompleted = progress >= target

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: habit.color,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.leftContent}>
          <View style={styles.iconContainer}>
            <ThemedText type="subtitle">{habit.icon}</ThemedText>
          </View>

          <View style={styles.titleContainer}>
            <ThemedText type="mediumBold">{habit.name}</ThemedText>
          </View>
        </View>

        <NeoIconButton
          onPress={onPressCheck}
          icon={isCompleted ? <X /> : <Check />}
          style={{ borderRadius: 25 }}
        />
      </View>

      <View style={styles.calendarPlaceholder}>
        <ThemedText type="small">GitHub heatmap coming soon</ThemedText>
      </View>

      <View style={styles.footer}>
        <ThemedText type="smallBold">
          Progress {progress}/{target}
        </ThemedText>

        <View style={styles.streakContainer}>
          <ThemedText type="smallBold">🔥</ThemedText>

          <ThemedText type="smallBold">{streak}</ThemedText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: Border.width,
    borderColor: '#000',
    borderRadius: Border.radius,
    padding: Spacing.four,
    gap: Spacing.four,

    shadowColor: Shadow.color,
    shadowOffset: {
      width: Shadow.offset,
      height: Shadow.offset,
    },
    shadowOpacity: Shadow.opacity,
    shadowRadius: Shadow.radius,

    elevation: 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    flex: 1,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: Border.radius,
    borderWidth: Border.largeWidth,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContainer: {
    flex: 1,
    gap: 4,
  },

  checkButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkButtonCompleted: {
    backgroundColor: '#B6FFB3',
  },

  calendarPlaceholder: {
    minHeight: 120,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.three,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
})
