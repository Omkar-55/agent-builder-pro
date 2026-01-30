import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { number: 1, title: 'Card Details' },
  { number: 2, title: 'Business Overview' },
  { number: 3, title: 'Data Upload' },
  { number: 4, title: 'Agent Network' },
  { number: 5, title: 'Evaluations' },
  { number: 6, title: 'Frontend Portal' },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isPending = currentStep < step.number;

          return (
            <div key={step.number} className="flex items-center">
              <button
                onClick={() => onStepClick?.(step.number)}
                disabled={isPending}
                className={cn(
                  'flex flex-col items-center gap-2 group transition-all duration-300',
                  !isPending && 'cursor-pointer',
                  isPending && 'cursor-not-allowed opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                    isCompleted && 'step-completed text-primary-foreground',
                    isCurrent && 'step-active text-primary-foreground animate-pulse-glow',
                    isPending && 'step-pending text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium whitespace-nowrap hidden md:block transition-colors',
                    isCurrent && 'text-primary',
                    isCompleted && 'text-foreground',
                    isPending && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 w-8 md:w-16 lg:w-24 mx-2 transition-colors duration-300',
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
