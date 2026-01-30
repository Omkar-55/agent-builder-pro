import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, CheckCircle, FileEdit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RapidLogo } from '@/components/RapidLogo';
import { OnboardingSession } from '@/types/onboarding';

// Mock data for demo purposes
const mockSessions: OnboardingSession[] = [
  {
    id: '1',
    name: 'Route Validation',
    currentStep: 4,
    status: 'in-progress',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    data: {} as OnboardingSession['data'],
  },
  {
    id: '2',
    name: 'Order Processing',
    currentStep: 6,
    status: 'completed',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    data: {} as OnboardingSession['data'],
  },
  {
    id: '3',
    name: 'Customer Support AI',
    currentStep: 2,
    status: 'draft',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    data: {} as OnboardingSession['data'],
  },
];

const statusConfig = {
  draft: {
    label: 'Draft',
    icon: FileEdit,
    className: 'bg-muted text-muted-foreground',
  },
  'in-progress': {
    label: 'In Progress',
    icon: Clock,
    className: 'bg-warning/10 text-warning',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    className: 'bg-success/10 text-success',
  },
};

export default function AdminPage() {
  const [sessions, setSessions] = useState<OnboardingSession[]>(mockSessions);

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-background bg-dots">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <RapidLogo />
            <Button asChild className="gap-2 bg-gradient-primary hover:opacity-90">
              <Link to="/">
                <Plus className="w-4 h-4" />
                New Onboarding
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Onboarding Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your agentic solution onboardings
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="text-3xl font-bold text-foreground">
                {sessions.length}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Total Onboardings</div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="text-3xl font-bold text-warning">
                {sessions.filter((s) => s.status === 'in-progress').length}
              </div>
              <div className="text-sm text-muted-foreground mt-1">In Progress</div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="text-3xl font-bold text-success">
                {sessions.filter((s) => s.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Completed</div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {sessions.map((session) => {
              const status = statusConfig[session.status];
              const StatusIcon = status.icon;
              const progress = Math.round((session.currentStep / 6) * 100);

              return (
                <div
                  key={session.id}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {session.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {session.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {session.updatedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Progress */}
                      <div className="hidden md:block">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">
                            Step {session.currentStep}/6
                          </span>
                          <span className="text-sm font-medium text-primary">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full progress-bar rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${status.className}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to="/">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(session.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {sessions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileEdit className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No onboardings yet</h3>
                <p className="text-muted-foreground mt-1">
                  Start your first agentic solution onboarding
                </p>
                <Button asChild className="mt-4 gap-2 bg-gradient-primary">
                  <Link to="/">
                    <Plus className="w-4 h-4" />
                    Start Onboarding
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
