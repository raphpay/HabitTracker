import { NeoButton } from '@/components/neo/neoButton'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme'
import { hasSeenOnboarding, setOnboardingDone } from '@/lib/onboarding'
import { router } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Onboarding() {
  function handleStart() {
    console.log('tap')
    setOnboardingDone()
    // TODO: Redirect to create habit if first time
    router.replace('/home')
    console.log('tap', hasSeenOnboarding())
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          {/*<AnimatedIcon />*/}
          <ThemedText type="title" style={styles.title}>
            Suis tes habitudes, simplement.
          </ThemedText>
          <ThemedText type="small" style={styles.subtitle}>
            1 tap par jour.Pas de compte.Pas de distraction.
          </ThemedText>

          <NeoButton onPress={handleStart} title="Commencer maintenant" />
        </ThemedView>
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
