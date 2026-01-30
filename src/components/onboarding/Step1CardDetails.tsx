import { useState } from 'react';
import { Plus, X, Upload, ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { VERTICALS, PRACTICES } from '@/types/onboarding';
import { CardPreview } from './CardPreview';

export function Step1CardDetails() {
  const { formData, updateFormData } = useOnboarding();
  const [newUseCase, setNewUseCase] = useState('');
  const cardDetails = formData.cardDetails;

  const handleAddUseCase = () => {
    if (newUseCase.trim() && !cardDetails.useCases.includes(newUseCase.trim())) {
      updateFormData('cardDetails', {
        useCases: [...cardDetails.useCases, newUseCase.trim()],
      });
      setNewUseCase('');
    }
  };

  const handleRemoveUseCase = (useCase: string) => {
    updateFormData('cardDetails', {
      useCases: cardDetails.useCases.filter((uc) => uc !== useCase),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData('cardDetails', { imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      {/* Form Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Card Details for Rapid</h2>
          <p className="text-muted-foreground">
            Configure how your solution appears on the Rapid platform
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="processName">Name of the Process</Label>
            <Input
              id="processName"
              placeholder="e.g., Route Validation"
              value={cardDetails.processName}
              onChange={(e) =>
                updateFormData('cardDetails', { processName: e.target.value })
              }
              className="input-focus bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">One-line Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what your solution does in one line..."
              value={cardDetails.description}
              onChange={(e) =>
                updateFormData('cardDetails', { description: e.target.value })
              }
              className="input-focus bg-secondary resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Use Cases (Tags)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a use case..."
                value={newUseCase}
                onChange={(e) => setNewUseCase(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUseCase())}
                className="input-focus bg-secondary"
              />
              <Button
                type="button"
                onClick={handleAddUseCase}
                variant="outline"
                size="icon"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {cardDetails.useCases.map((useCase) => (
                <span key={useCase} className="tag-pill flex items-center gap-2">
                  {useCase}
                  <button
                    onClick={() => handleRemoveUseCase(useCase)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vertical</Label>
              <Select
                value={cardDetails.vertical}
                onValueChange={(value) =>
                  updateFormData('cardDetails', { vertical: value })
                }
              >
                <SelectTrigger className="bg-secondary">
                  <SelectValue placeholder="Select vertical" />
                </SelectTrigger>
                <SelectContent>
                  {VERTICALS.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Practice</Label>
              <Select
                value={cardDetails.practice}
                onValueChange={(value) =>
                  updateFormData('cardDetails', { practice: value })
                }
              >
                <SelectTrigger className="bg-secondary">
                  <SelectValue placeholder="Select practice" />
                </SelectTrigger>
                <SelectContent>
                  {PRACTICES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Card Image</Label>
            <div className="callout-warning callout text-sm mb-3">
              <p className="font-medium">Image Requirements:</p>
              <ul className="list-disc list-inside mt-1 text-muted-foreground">
                <li>Recommended size: 1200 x 630 pixels</li>
                <li>Formats: PNG, JPG, WebP</li>
                <li>Max file size: 5MB</li>
              </ul>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="card-image-upload"
              />
              <label
                htmlFor="card-image-upload"
                className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >
                {cardDetails.imageUrl ? (
                  <img
                    src={cardDetails.imageUrl}
                    alt="Card preview"
                    className="max-h-32 rounded"
                  />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Click to upload card image
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Card Preview</h3>
        </div>
        <CardPreview cardDetails={cardDetails} />
      </div>
    </div>
  );
}
