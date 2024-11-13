'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const tiers = [
  {
    name: 'Starter',
    id: 'starter',
    priceMonthly: '$29',
    description: 'Perfect for small teams and startups.',
    features: [
      'Up to 5 team members',
      '5GB storage',
      'Basic analytics',
      'Email support',
      'API access',
    ],
  },
  {
    name: 'Professional',
    id: 'professional',
    priceMonthly: '$99',
    description: 'Ideal for growing businesses.',
    features: [
      'Up to 20 team members',
      '50GB storage',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
      'Team collaboration tools',
    ],
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    priceMonthly: '$299',
    description: 'For large organizations.',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Custom analytics',
      '24/7 phone support',
      'Advanced API access',
      'Custom integrations',
      'Team collaboration tools',
      'Dedicated account manager',
      'Custom training',
    ],
  },
];

export default function Pricing() {
  const router = useRouter();

  const handleSelectPlan = (tierId: string) => {
    router.push(`/onboarding?plan=${tierId}`);
  };

  return (
    <div id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight">
            Choose the right plan for your business
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 dark:bg-gray-800 dark:ring-gray-700 ${
                tierIdx === 1 ? 'lg:z-10 lg:rounded-b-none' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8">{tier.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.priceMonthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className="mt-8"
                variant={tierIdx === 1 ? 'default' : 'outline'}
                onClick={() => handleSelectPlan(tier.id)}
              >
                Get started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}