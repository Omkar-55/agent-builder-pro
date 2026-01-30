import { useState } from 'react';
import { Upload, Link2, ExternalLink, ImageIcon, Figma } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOnboarding } from '@/contexts/OnboardingContext';

export function Step2BusinessOverview() {
  const { formData, updateFormData } = useOnboarding();
  const businessOverview = formData.businessOverview;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData('businessOverview', {
          type: 'image',
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Business Overview</h2>
        <p className="text-muted-foreground">
          Upload a visual representation of your business process in a real-world setup
        </p>
      </div>

      <Tabs
        value={businessOverview.type}
        onValueChange={(value) =>
          updateFormData('businessOverview', { type: value as 'image' | 'figma' })
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="image" className="gap-2">
            <ImageIcon className="w-4 h-4" />
            Upload Image
          </TabsTrigger>
          <TabsTrigger value="figma" className="gap-2">
            <Figma className="w-4 h-4" />
            Figma Link
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="space-y-6 mt-6">
          {/* Image Specifications */}
          <div className="callout">
            <p className="font-medium text-foreground mb-2">Image Specifications:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Recommended size: 1920 x 1080 pixels (16:9 aspect ratio)</li>
              <li>Formats accepted: PNG, JPG, SVG, WebP</li>
              <li>Maximum file size: 10MB</li>
              <li>Should clearly illustrate the business process flow</li>
            </ul>
          </div>

          {/* Upload Area */}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="business-overview-upload"
            />
            <label
              htmlFor="business-overview-upload"
              className="flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
            >
              {businessOverview.imageUrl ? (
                <img
                  src={businessOverview.imageUrl}
                  alt="Business overview"
                  className="max-h-64 rounded-lg"
                />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="text-foreground font-medium">
                      Click to upload business overview image
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      or drag and drop your file here
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>
        </TabsContent>

        <TabsContent value="figma" className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="figmaLink">Figma Link</Label>
            <div className="relative">
              <Figma className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="figmaLink"
                placeholder="https://www.figma.com/file/..."
                value={businessOverview.figmaLink}
                onChange={(e) =>
                  updateFormData('businessOverview', { figmaLink: e.target.value })
                }
                className="input-focus bg-secondary pl-10"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Reference Link Section */}
      <div className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Reference Materials</h3>
            <p className="text-sm text-muted-foreground">
              Link to past business overview files for reference
            </p>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <a
              href={businessOverview.referenceLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              View References
            </a>
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referenceLink">Reference Link</Label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="referenceLink"
              placeholder="https://drive.google.com/..."
              value={businessOverview.referenceLink}
              onChange={(e) =>
                updateFormData('businessOverview', { referenceLink: e.target.value })
              }
              className="input-focus bg-secondary pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
