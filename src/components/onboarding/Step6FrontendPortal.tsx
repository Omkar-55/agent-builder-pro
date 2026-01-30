import { Link2, FileText, Upload, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOnboarding } from '@/contexts/OnboardingContext';

export function Step6FrontendPortal() {
  const { formData, updateFormData } = useOnboarding();
  const frontendPortal = formData.frontendPortal;

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData('frontendPortal', {
          type: 'document',
          documentUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Frontend Portal</h2>
        <p className="text-muted-foreground">
          Provide a link to the frontend portal or upload documentation
        </p>
      </div>

      <Tabs
        value={frontendPortal.type}
        onValueChange={(value) =>
          updateFormData('frontendPortal', { type: value as 'link' | 'document' })
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="link" className="gap-2">
            <Link2 className="w-4 h-4" />
            Portal Link
          </TabsTrigger>
          <TabsTrigger value="document" className="gap-2">
            <FileText className="w-4 h-4" />
            Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="link" className="space-y-6 mt-6">
          <div className="p-8 rounded-xl bg-secondary/50 border border-border">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">Frontend Portal URL</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter the URL to your agentic solution's frontend portal
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portalLink">Portal Link</Label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="portalLink"
                    placeholder="https://your-portal.example.com"
                    value={frontendPortal.link}
                    onChange={(e) =>
                      updateFormData('frontendPortal', { link: e.target.value })
                    }
                    className="input-focus bg-background pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="document" className="space-y-6 mt-6">
          <div className="p-8 rounded-xl bg-secondary/50 border border-border">
            <div className="callout mb-6">
              <p className="font-medium text-foreground mb-2">Documentation Guidelines:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Include all frontend screens and navigation flows</li>
                <li>Add design references and UI specifications</li>
                <li>Document user interactions and expected behaviors</li>
                <li>Supported formats: PDF, DOCX, MD</li>
              </ul>
            </div>

            <div className="relative">
              <input
                type="file"
                accept=".pdf,.docx,.md,.doc"
                onChange={handleDocumentUpload}
                className="hidden"
                id="frontend-doc-upload"
              />
              <label
                htmlFor="frontend-doc-upload"
                className="flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >
                {frontendPortal.documentUrl ? (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-success" />
                    </div>
                    <span className="text-foreground font-medium">Document uploaded</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click to replace
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <span className="text-foreground font-medium">
                        Click to upload documentation
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        or drag and drop your file here
                      </p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Completion Message */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Almost Done!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              After completing this step, your agentic solution will be ready for review.
              You can save your progress and return later, or complete the onboarding now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
