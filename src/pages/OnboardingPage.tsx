import { toast } from 'sonner';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { FormNavigation } from '@/components/onboarding/FormNavigation';
import { Step1CardDetails } from '@/components/onboarding/Step1CardDetails';
import { Step2BusinessOverview } from '@/components/onboarding/Step2BusinessOverview';
import { Step3DataUpload } from '@/components/onboarding/Step3DataUpload';
import { Step4AgentNetwork } from '@/components/onboarding/Step4AgentNetwork';
import { Step5Evaluations } from '@/components/onboarding/Step5Evaluations';
import { Step6FrontendPortal } from '@/components/onboarding/Step6FrontendPortal';
import { RapidLogo } from '@/components/RapidLogo';

const TOTAL_STEPS = 6;

function OnboardingFormContent() {
  const { currentStep, setCurrentStep, saveProgress, formData } = useOnboarding();

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      saveProgress();
    } else {
      // Complete onboarding
      saveProgress();
      toast.success('Onboarding completed successfully!', {
        description: 'Your agentic solution has been submitted for review.',
      });
    }
  };

  const handleSave = () => {
    saveProgress();
    toast.success('Progress saved!', {
      description: 'You can continue from where you left off.',
    });
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CardDetails />;
      case 2:
        return <Step2BusinessOverview />;
      case 3:
        return <Step3DataUpload />;
      case 4:
        return <Step4AgentNetwork />;
      case 5:
        return <Step5Evaluations />;
      case 6:
        return <Step6FrontendPortal />;
      default:
        return <Step1CardDetails />;
    }
  };

  return (
    <div className="min-h-screen bg-background bg-dots">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <RapidLogo />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {formData.cardDetails.processName || 'New Solution'}
              </span>
              <a
                href="/admin"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View All Onboardings
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto">
          <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {renderStep()}

          <FormNavigation
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSave={handleSave}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === TOTAL_STEPS}
          />
        </div>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingFormContent />
    </OnboardingProvider>
  );
}
