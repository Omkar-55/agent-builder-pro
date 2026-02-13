import { useRef } from 'react';
import { Upload, X, FileText, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { DocumentUploadItem, DEFAULT_DOCUMENTS } from '@/types/onboarding';

export function Step4AgentNetwork() {
  const { formData, setFormData } = useOnboarding();
  const { documents } = formData.documentUploads;
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const updateDocument = (docId: string, updates: Partial<DocumentUploadItem>) => {
    setFormData((prev) => ({
      ...prev,
      documentUploads: {
        ...prev.documentUploads,
        documents: prev.documentUploads.documents.map((d) =>
          d.id === docId ? { ...d, ...updates } : d
        ),
      },
    }));
  };

  const handleFileSelect = (docId: string, file: File | null) => {
    updateDocument(docId, { fileName: file?.name || null });
  };

  const removeDocument = (docId: string) => {
    setFormData((prev) => ({
      ...prev,
      documentUploads: {
        ...prev.documentUploads,
        documents: prev.documentUploads.documents.filter((d) => d.id !== docId),
      },
    }));
  };

  const addDocument = (template: DocumentUploadItem) => {
    const newDoc: DocumentUploadItem = {
      ...template,
      id: `${template.id}-${crypto.randomUUID().slice(0, 8)}`,
      fileName: null,
      referenceLink: '',
    };
    setFormData((prev) => ({
      ...prev,
      documentUploads: {
        ...prev.documentUploads,
        documents: [...prev.documentUploads.documents, newDoc],
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Document Uploads</h2>
        <p className="text-muted-foreground">
          Upload the required documents for your agentic solution configuration
        </p>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-xl border border-border bg-card space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{doc.label}</span>
                    {doc.isRecommendedTemplate && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Star className="w-3 h-3" />
                        Recommended Template
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Accepted: {doc.acceptedFormats.join(', ')}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeDocument(doc.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* File upload area */}
            <div className="space-y-3">
              <input
                type="file"
                ref={(el) => { fileInputRefs.current[doc.id] = el; }}
                accept={doc.acceptExtensions}
                className="hidden"
                onChange={(e) => handleFileSelect(doc.id, e.target.files?.[0] || null)}
              />

              {doc.fileName ? (
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{doc.fileName}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleFileSelect(doc.id, null);
                      if (fileInputRefs.current[doc.id]) {
                        fileInputRefs.current[doc.id]!.value = '';
                      }
                    }}
                    className="text-muted-foreground hover:text-destructive h-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRefs.current[doc.id]?.click()}
                  className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/50 transition-colors flex flex-col items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload {doc.acceptedFormats.join(' or ')}
                  </span>
                </button>
              )}

              {/* Reference link */}
              {doc.referenceLink && (
                <a
                  href={doc.referenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Reference Template
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Document Buttons */}
      <div className="p-5 rounded-xl border border-dashed border-border bg-secondary/20 space-y-3">
        <Label className="text-sm text-muted-foreground">Add another document:</Label>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_DOCUMENTS.map((template) => (
            <Button
              key={template.id}
              variant="outline"
              size="sm"
              onClick={() => addDocument(template)}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              {template.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
