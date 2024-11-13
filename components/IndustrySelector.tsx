'use client';

import { 
  Store, 
  Building2, 
  Briefcase, 
  Stethoscope, 
  Truck, 
  Car, 
  Hotel, 
  Dumbbell,
  GraduationCap,
  Home,
  MoreHorizontal,
  Search
} from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';

interface Industry {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const industries: Industry[] = [
  {
    id: 'pos-retail',
    name: 'POS & Retail',
    icon: Store,
    description: 'Online and offline sales, with ready and synchronized POS App.'
  },
  {
    id: 'business-services',
    name: 'Business Services',
    icon: Building2,
    description: 'Manage services and follow-up appointments with auto-reminder.'
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: Briefcase,
    description: 'Easy solution to track your customers\' requests from start to finish.'
  },
  {
    id: 'medical',
    name: 'Medical',
    icon: Stethoscope,
    description: 'Manage health care services, reservations and appointments.'
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: Truck,
    description: 'Managing the accounts of logistic firms and shipping companies.'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: Car,
    description: 'Buying, selling and renting vehicles and managing spare parts inventory.'
  },
  {
    id: 'tourism',
    name: 'Tourism & Hospitality',
    icon: Hotel,
    description: 'Smart rental tools with unit tracking system and online reservations.'
  },
  {
    id: 'fitness',
    name: 'Bodycare & Fitness',
    icon: Dumbbell,
    description: 'Management of memberships, client attendance and online payments.'
  },
  {
    id: 'learning',
    name: 'Learning',
    icon: GraduationCap,
    description: 'Managing accounts, and following up on lists of students and courses.'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Project management, buying, selling and renting real estate units.'
  },
  {
    id: 'other',
    name: 'Other',
    icon: MoreHorizontal,
    description: 'Custom solution for your specific industry needs.'
  }
];

interface IndustrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function IndustrySelector({ value, onChange, disabled = false }: IndustrySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndustries = industries.filter(industry =>
    industry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for your industry"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={disabled}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIndustries.map((industry) => {
          const Icon = industry.icon;
          return (
            <button
              key={industry.id}
              onClick={() => onChange(industry.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                value === industry.id
                  ? 'border-[#0449a9] bg-[#0449a9]/5'
                  : 'border-gray-200 hover:border-[#0449a9]/50'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={disabled}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  value === industry.id
                    ? 'bg-[#0449a9] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {industry.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {industry.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onChange('')}
          className={`text-sm text-[#0449a9] hover:text-[#0449a9]/90 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={disabled}
        >
          Skip, I will configure the system manually →
        </button>
      </div>
    </div>
  );
}