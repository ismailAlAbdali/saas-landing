'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Upload } from 'lucide-react';
import IndustrySelector from './IndustrySelector';
import { useTranslation } from 'react-i18next';

interface FormData {
  companyName: string;
  domainName: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  companySize: string;
  position: string;
  companyLogo: File | null;
  industry: string;
}

interface POSOnboardingWizardProps {
  selectedPlan: string | null;
  currentStep: number;
  setStep: (step: number) => void;
}

export default function POSOnboardingWizard({
  selectedPlan,
  currentStep,
  setStep,
}: POSOnboardingWizardProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    domainName: '',
    phoneNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    companySize: '',
    position: '',
    companyLogo: null,
    industry: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else if (name === 'phoneNumber') {
      const phoneValue = value.startsWith('+968') ? value : '+968' + value.replace('+968', '');
      setFormData((prev) => ({ ...prev, [name]: phoneValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 1:
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.domainName) newErrors.domainName = 'Domain name is required';
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!formData.phoneNumber.startsWith('+968')) {
          newErrors.phoneNumber = 'Phone number must start with +968';
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        break;
      case 2:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.companySize) newErrors.companySize = 'Company size is required';
        if (!formData.position) newErrors.position = 'Position is required';
        break;
      case 3:
        if (!formData.industry) newErrors.industry = 'Please select an industry';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateProcessing = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500); // Simulate a 1.5s processing time
    });
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      setIsProcessing(true);
      await simulateProcessing();
      setIsProcessing(false);

      if (currentStep < 4) {
        setStep(currentStep + 1);
      } else {
        // Handle form submission
        console.log('Form submitted:', formData);
        router.push('/dashboard');
      }
    }
  };

  const handleBack = async () => {
    if (currentStep > 1) {
      setIsProcessing(true);
      await simulateProcessing();
      setIsProcessing(false);
      setStep(currentStep - 1);
    }
  };

  const steps = [
    {
      title: 'Business Information',
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter your company name"
              className={errors.companyName ? 'border-red-500' : ''}
              disabled={isProcessing}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500">{errors.companyName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="domainName">Domain Name</Label>
            <Input
              id="domainName"
              name="domainName"
              value={formData.domainName}
              onChange={handleInputChange}
              placeholder="Enter your domain name"
              className={errors.domainName ? 'border-red-500' : ''}
              disabled={isProcessing}
            />
            {errors.domainName && (
              <p className="text-sm text-red-500">{errors.domainName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+968"
              className={errors.phoneNumber ? 'border-red-500' : ''}
              disabled={isProcessing}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'border-red-500' : ''}
              disabled={isProcessing}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Personal Information',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className={errors.firstName ? 'border-red-500' : ''}
                disabled={isProcessing}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className={errors.lastName ? 'border-red-500' : ''}
                disabled={isProcessing}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select 
              onValueChange={(value) => setFormData((prev) => ({ ...prev, companySize: value }))}
              value={formData.companySize}
              disabled={isProcessing}
            >
              <SelectTrigger className={errors.companySize ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201+">201+ employees</SelectItem>
              </SelectContent>
            </Select>
            {errors.companySize && (
              <p className="text-sm text-red-500">{errors.companySize}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Enter your position"
              className={errors.position ? 'border-red-500' : ''}
              disabled={isProcessing}
            />
            {errors.position && (
              <p className="text-sm text-red-500">{errors.position}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyLogo">Company Logo</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="companyLogo"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#0449a9] hover:text-[#0449a9]/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#0449a9]"
                  >
                    <span>Upload a file</span>
                    <input
                      id="companyLogo"
                      name="companyLogo"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleInputChange}
                      disabled={isProcessing}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Industry Selection',
      content: (
        <div className="space-y-4">
          <IndustrySelector
            value={formData.industry}
            onChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
            disabled={isProcessing}
          />
          {errors.industry && (
            <p className="text-sm text-red-500">{errors.industry}</p>
          )}
        </div>
      ),
    },
    {
      title: 'Confirmation',
      content: (
        <div className="space-y-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
          <div>
            <h3 className="text-lg font-medium">Ready to Set Up Your POS System</h3>
            <p className="mt-2 text-sm text-gray-500">
              We'll configure your POS system based on your {formData.industry} industry requirements.
              Click complete to finish the setup process.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">Summary</h4>
            <dl className="mt-2 divide-y divide-gray-200">
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-gray-500">Company</dt>
                <dd className="text-sm text-gray-900">{formData.companyName}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-gray-500">Contact</dt>
                <dd className="text-sm text-gray-900">{formData.email}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-gray-500">Industry</dt>
                <dd className="text-sm text-gray-900">{formData.industry}</dd>
              </div>
            </dl>
          </div>
        </div>
      ),
    },
  ];

  if (isProcessing) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="p-6">
          <div className="min-h-[400px] flex items-center justify-center">
            <Loader text="Processing..." />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  index + 1 <= currentStep
                    ? 'border-[#0449a9] bg-[#0449a9] text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${
                    index + 1 < currentStep ? 'bg-[#0449a9]' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <h2 className="mb-6 text-2xl font-bold">{steps[currentStep - 1].title}</h2>
        {steps[currentStep - 1].content}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isProcessing}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-[#0449a9] hover:bg-[#0449a9]/90 text-white"
            disabled={isProcessing}
          >
            {currentStep === steps.length ? 'Complete Setup' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
}