import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import * as Crypto from 'expo-crypto'

import { forwardRef, useMemo, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native'

import { NeoButton } from '@/components/neo/neoButton'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { Habit } from '@/lib/types/habit'
import { useHabitsStore } from '@/store/habit-store'

// TODO: Place this in a constant file
const HABIT_COLORS = [
  '#FFD60A',
  '#FF9F1C',
  '#FF5D73',
  '#FF4FA3',
  '#9B5DE5',
  '#3A86FF',
  '#00B8D9',
  '#06D6A0',
]

const HABIT_ICONS = ['📚', '💧', '🏃', '🧘', '💻']

export const CreateHabitSheet = forwardRef<BottomSheet, object>(
  (props, ref) => {
    const snapPoints = useMemo(() => ['85%'], [])

    const [name, setName] = useState('')
    const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0])
    const [selectedIcon, setSelectedIcon] = useState(HABIT_ICONS[0])
    const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>(
      'daily',
    )
    const [completionsPerDay, setCompletionsPerDay] = useState('1')

    const scheme = useColorScheme()
    const colors = Colors[scheme === 'unspecified' ? 'light' : scheme]
    const addHabit = useHabitsStore((state) => state.addHabit)

    function handleCreateHabit() {
      const newHabit: Habit = {
        id: Crypto.randomUUID(),
        name,
        color: selectedColor,
        icon: selectedIcon,
        frequency,
        completedDates: [],
        completionsPerDay:
          frequency === 'daily' ? Number(completionsPerDay) : undefined,
        createdAt: new Date(),
      }

      addHabit(newHabit)

      // Reset states
      resetStates()
      if (ref && 'current' in ref) {
        ref.current?.close()
      }
    }

    function resetStates() {
      setName('')
      setCompletionsPerDay('0')
      setFrequency('daily')
      setSelectedColor(HABIT_COLORS[0])
      setSelectedIcon(HABIT_ICONS[0])
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

          <View style={styles.section}>
            <ThemedText type="smallBold">Color</ThemedText>

            <View style={styles.grid}>
              {HABIT_COLORS.map((color) => {
                const isSelected = selectedColor === color

                return (
                  <Pressable
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.colorItem,
                      {
                        backgroundColor: color,
                        borderWidth: isSelected ? 4 : 2,
                        transform: [{ scale: isSelected ? 1 : 0.9 }],
                      },
                    ]}
                  />
                )
              })}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="smallBold">Icon</ThemedText>

            <View style={styles.grid}>
              {HABIT_ICONS.map((icon) => {
                const isSelected = selectedIcon === icon

                return (
                  <Pressable
                    key={icon}
                    onPress={() => setSelectedIcon(icon)}
                    style={[
                      styles.iconItem,
                      {
                        borderWidth: isSelected ? 4 : 2,
                        transform: [{ scale: isSelected ? 1 : 0.9 }],
                      },
                    ]}
                  >
                    <ThemedText type="medium">{icon}</ThemedText>
                  </Pressable>
                )
              })}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="smallBold">Frequency</ThemedText>

            <View style={styles.frequencyRow}>
              {['daily', 'weekly', 'monthly'].map((item) => {
                const isSelected = frequency === item

                return (
                  <Pressable
                    key={item}
                    onPress={() =>
                      setFrequency(item as 'daily' | 'weekly' | 'monthly')
                    }
                    style={[
                      styles.frequencyButton,
                      {
                        borderWidth: isSelected ? 4 : 2,
                      },
                    ]}
                  >
                    <ThemedText type="smallBold">{item}</ThemedText>
                  </Pressable>
                )
              })}
            </View>
          </View>

          {frequency === 'daily' && (
            <View style={styles.section}>
              <ThemedText type="smallBold">Repetitions per day</ThemedText>

              <TextInput
                value={completionsPerDay}
                onChangeText={setCompletionsPerDay}
                keyboardType="number-pad"
                style={styles.input}
              />
            </View>
          )}

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
  section: {
    gap: 12,
  },

  row: {
    gap: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  colorItem: {
    width: 52,
    height: 52,
    borderRadius: 8,
    borderColor: '#000',
  },

  iconItem: {
    width: 52,
    height: 52,
    borderRadius: 8,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  frequencyRow: {
    flexDirection: 'row',
    gap: 12,
  },

  frequencyButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
})
