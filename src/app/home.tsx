import { NeoButton } from '@/components/neo/neoButton'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { CreateHabitSheet } from '@/components/ui/create-habit-sheet'
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme'
import { useHabitsStore } from '@/store/habit-store'
import BottomSheet from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const [hasInitialized, setHasInitialized] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)
  const habits = useHabitsStore((state) => state.habits)
  const hydrate = useHabitsStore((state) => state.hydrate)

  function openCreateHabit() {
    bottomSheetRef.current?.expand()
  }

  useEffect(() => {
    hydrate()
    setHasInitialized(true)
  }, [hydrate])

  useEffect(() => {
    if (!hasInitialized) return

    if (habits.length === 0) {
      openCreateHabit()
    }
  }, [habits.length, hasInitialized])

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText>Hello</ThemedText>
        <NeoButton onPress={openCreateHabit} title="Commencer maintenant" />

        <CreateHabitSheet ref={bottomSheetRef} />
      </SafeAreaView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    // textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
})
