import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { forwardRef, useMemo, useState } from 'react'
import { StyleSheet, TextInput, useColorScheme } from 'react-native'

import { NeoButton } from '@/components/neo/neoButton'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { Habit } from '@/lib/types/habit'
import { useHabitsStore } from '@/store/habit-store'

export const CreateHabitSheet = forwardRef<BottomSheet, object>(
  (props, ref) => {
    const snapPoints = useMemo(() => ['50%'], [])
    const [name, setName] = useState('')
    const scheme = useColorScheme()
    const colors = Colors[scheme === 'unspecified' ? 'light' : scheme]
    const addHabit = useHabitsStore((state) => state.addHabit)

    function handleCreateHabit() {
      const newHabit: Habit = {
        id: '1',
        name,
        color: 'red',
        frequency: 'daily',
        completedDates: [],
        createdAt: new Date(),
      }

      addHabit(newHabit)

      setName('')
      if (ref && 'current' in ref) {
        ref.current?.close()
      }
    }

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetView
          style={[
            styles.content,
            { backgroundColor: colors.backgroundElement },
          ]}
        >
          <ThemedText type="subtitle">Create Habit</ThemedText>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Drink water"
            style={styles.input}
          />

          <NeoButton title="Create" onPress={handleCreateHabit} />
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

CreateHabitSheet.displayName = 'CreateHabitSheet'

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: '100%',
    padding: 24,
    gap: 16,
  },

  input: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
})
