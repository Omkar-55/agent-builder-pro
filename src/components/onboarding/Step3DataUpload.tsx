import { useState } from 'react';
import { Plus, X, Upload, FileSpreadsheet, FileText, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { StructuredFile, UnstructuredFile } from '@/types/onboarding';

export function Step3DataUpload() {
  const { formData, setFormData } = useOnboarding();
  const { structuredData, unstructuredData } = formData.dataUpload;

  const [newStructuredFile, setNewStructuredFile] = useState({ fileName: '', tableName: '' });
  const [newUnstructuredFile, setNewUnstructuredFile] = useState('');

  const addStructuredFile = () => {
    if (newStructuredFile.fileName && newStructuredFile.tableName) {
      const newFile: StructuredFile = {
        id: crypto.randomUUID(),
        fileName: newStructuredFile.fileName,
        tableName: newStructuredFile.tableName,
      };
      setFormData((prev) => ({
        ...prev,
        dataUpload: {
          ...prev.dataUpload,
          structuredData: [...prev.dataUpload.structuredData, newFile],
        },
      }));
      setNewStructuredFile({ fileName: '', tableName: '' });
    }
  };

  const removeStructuredFile = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      dataUpload: {
        ...prev.dataUpload,
        structuredData: prev.dataUpload.structuredData.filter((f) => f.id !== id),
      },
    }));
  };

  const addUnstructuredFile = () => {
    if (newUnstructuredFile) {
      const newFile: UnstructuredFile = {
        id: crypto.randomUUID(),
        fileName: newUnstructuredFile,
      };
      setFormData((prev) => ({
        ...prev,
        dataUpload: {
          ...prev.dataUpload,
          unstructuredData: [...prev.dataUpload.unstructuredData, newFile],
        },
      }));
      setNewUnstructuredFile('');
    }
  };

  const removeUnstructuredFile = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      dataUpload: {
        ...prev.dataUpload,
        unstructuredData: prev.dataUpload.unstructuredData.filter((f) => f.id !== id),
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Data Upload</h2>
        <p className="text-muted-foreground">
          Upload the data files that your agents and tools will access
        </p>
      </div>

      {/* Structured Data Section */}
      <div className="space-y-6 p-6 rounded-xl bg-secondary/50 border border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Structured Data</h3>
            <p className="text-sm text-muted-foreground">CSV, Excel, Database exports</p>
          </div>
        </div>

        <div className="callout">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-info mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Naming Conventions:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                <li>File names should be descriptive (e.g., <code>customer_orders_2024.csv</code>)</li>
                <li>Table names should use snake_case (e.g., <code>customer_orders</code>)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Add New Structured File */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="File name (e.g., orders.csv)"
              value={newStructuredFile.fileName}
              onChange={(e) =>
                setNewStructuredFile((prev) => ({ ...prev, fileName: e.target.value }))
              }
              className="input-focus bg-background"
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Table name (e.g., orders)"
              value={newStructuredFile.tableName}
              onChange={(e) =>
                setNewStructuredFile((prev) => ({ ...prev, tableName: e.target.value }))
              }
              className="input-focus bg-background"
            />
          </div>
          <Button onClick={addStructuredFile} variant="outline" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Structured Files List */}
        <div className="space-y-2">
          {structuredData.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-success" />
                <div>
                  <span className="font-medium text-foreground">{file.fileName}</span>
                  <span className="text-muted-foreground mx-2">→</span>
                  <code className="text-sm text-primary">{file.tableName}</code>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeStructuredFile(file.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {structuredData.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No structured files added yet
            </p>
          )}
        </div>
      </div>

      {/* Unstructured Data Section */}
      <div className="space-y-6 p-6 rounded-xl bg-secondary/50 border border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Unstructured Data</h3>
            <p className="text-sm text-muted-foreground">PDFs, Documents, Text files</p>
          </div>
        </div>

        <div className="callout">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-info mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">File Naming:</p>
              <p className="text-muted-foreground mt-1">
                Use descriptive file names (e.g., <code>product_manual_v2.pdf</code>, <code>compliance_guidelines.docx</code>)
              </p>
            </div>
          </div>
        </div>

        {/* Add New Unstructured File */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="File name (e.g., user_manual.pdf)"
              value={newUnstructuredFile}
              onChange={(e) => setNewUnstructuredFile(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addUnstructuredFile()}
              className="input-focus bg-background"
            />
          </div>
          <Button onClick={addUnstructuredFile} variant="outline" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Unstructured Files List */}
        <div className="space-y-2">
          {unstructuredData.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-warning" />
                <span className="font-medium text-foreground">{file.fileName}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeUnstructuredFile(file.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {unstructuredData.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No unstructured files added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
