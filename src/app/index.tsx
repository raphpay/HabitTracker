import { hasSeenOnboarding } from '@/lib/onboarding-storage'
import { Redirect } from 'expo-router'

export default function Index() {
  if (hasSeenOnboarding()) {
    return <Redirect href={'/home'} />
  }

  return <Redirect href={'/onboarding'} />
}
