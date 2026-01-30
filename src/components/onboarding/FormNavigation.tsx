import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  isFirstStep,
  isLastStep,
}: FormNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-8 border-t border-border">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStep}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={onSave}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Save className="w-4 h-4" />
          Save Progress
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <Button
          onClick={onNext}
          className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          {isLastStep ? 'Complete Onboarding' : 'Continue'}
          {!isLastStep && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
