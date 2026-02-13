import React, { createContext, useContext, useState, useCallback } from 'react';
import { OnboardingFormData, initialFormData } from '@/types/onboarding';

interface OnboardingContextType {
  formData: OnboardingFormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateFormData: <K extends keyof OnboardingFormData>(
    section: K,
    data: Partial<OnboardingFormData[K]>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  resetForm: () => void;
  saveProgress: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<OnboardingFormData>(() => {
    const saved = localStorage.getItem('rapid-onboarding-form');
    if (saved) {
      const parsed = JSON.parse(saved);
      const merged = { ...initialFormData, ...parsed };
      // Cap evaluations to prevent bloated localStorage data
      if (merged.evaluations && merged.evaluations.length > 5) {
        merged.evaluations = merged.evaluations.slice(0, 5);
      }
      return merged;
    }
    return initialFormData;
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('rapid-onboarding-step');
    return saved ? parseInt(saved, 10) : 1;
  });

  const updateFormData = useCallback(<K extends keyof OnboardingFormData>(
    section: K,
    data: Partial<OnboardingFormData[K]>
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  }, []);

  const saveProgress = useCallback(() => {
    localStorage.setItem('rapid-onboarding-form', JSON.stringify(formData));
    localStorage.setItem('rapid-onboarding-step', currentStep.toString());
  }, [formData, currentStep]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(1);
    localStorage.removeItem('rapid-onboarding-form');
    localStorage.removeItem('rapid-onboarding-step');
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        formData,
        currentStep,
        setCurrentStep,
        updateFormData,
        setFormData,
        resetForm,
        saveProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
