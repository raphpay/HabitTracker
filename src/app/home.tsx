import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { NeoButton } from '@/components/neo/neoButton'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme'
import { resetOnboarding } from '@/lib/onboarding'

export default function HomeScreen() {
  async function tap() {
    resetOnboarding()
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText>Hello</ThemedText>
        <NeoButton onPress={tap} title="Commencer maintenant" />
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
