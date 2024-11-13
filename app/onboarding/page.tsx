'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import POSOnboardingWizard from '@/components/POSOnboardingWizard';

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get('plan');
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <POSOnboardingWizard selectedPlan={selectedPlan} currentStep={step} setStep={setStep} />
    </div>
  );
}