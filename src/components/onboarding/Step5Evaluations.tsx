import { useState } from 'react';
import { Plus, X, HelpCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Evaluation } from '@/types/onboarding';

export function Step5Evaluations() {
  const { formData, setFormData } = useOnboarding();
  const evaluations = formData.evaluations;
  const agents = formData.agentNetwork.agents;
  const [expandedEvals, setExpandedEvals] = useState<Record<string, boolean>>({});
  const [numEvals, setNumEvals] = useState(evaluations.length);

  const toggleEval = (evalId: string) => {
    setExpandedEvals((prev) => ({ ...prev, [evalId]: !prev[evalId] }));
  };

  const handleNumEvalsChange = (num: number) => {
    if (num < 0) return;
    setNumEvals(num);
    const currentCount = evaluations.length;

    if (num > currentCount) {
      const newEvals: Evaluation[] = [];
      for (let i = currentCount; i < num; i++) {
        newEvals.push({
          id: crypto.randomUUID(),
          question: '',
          expectedResponse: '',
          activeAgents: [],
          activeTools: [],
          logic: '',
        });
      }
      setFormData((prev) => ({
        ...prev,
        evaluations: [...prev.evaluations, ...newEvals],
      }));
    } else if (num < currentCount) {
      setFormData((prev) => ({
        ...prev,
        evaluations: prev.evaluations.slice(0, num),
      }));
    }
  };

  const updateEvaluation = (evalId: string, updates: Partial<Evaluation>) => {
    setFormData((prev) => ({
      ...prev,
      evaluations: prev.evaluations.map((e) =>
        e.id === evalId ? { ...e, ...updates } : e
      ),
    }));
  };

  const removeEvaluation = (evalId: string) => {
    if (evaluations.length <= 0) return;
    setFormData((prev) => ({
      ...prev,
      evaluations: prev.evaluations.filter((e) => e.id !== evalId),
    }));
    setNumEvals((prev) => prev - 1);
  };

  const getToolsForSelectedAgents = (selectedAgentIds: string[]) => {
    return agents
      .filter((a) => selectedAgentIds.includes(a.id))
      .flatMap((a) => a.tools);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Evaluations</h2>
        <p className="text-muted-foreground">
          Define question-answer pairs to help fine-tune agent responses
        </p>
      </div>

      {/* Callout */}
      <div className="callout">
        <div className="flex items-start gap-2">
          <HelpCircle className="w-5 h-5 text-info mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Why Evaluations Matter:</p>
            <p className="text-muted-foreground mt-1">
              Evaluations help AI engineers understand expected responses and fine-tune the
              agent network. A minimum of 4 Q&A pairs are required.
            </p>
          </div>
        </div>
      </div>

      {/* Number of Evals */}
      <div className="p-6 rounded-xl bg-secondary/50 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-lg">Number of Evaluations</Label>
            <p className="text-sm text-muted-foreground mt-1">Minimum 4 required before submission</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNumEvalsChange(Math.max(0, numEvals - 1))}
              disabled={numEvals <= 0}
            >
              -
            </Button>
            <span className="text-2xl font-bold text-primary w-12 text-center">
              {numEvals}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNumEvalsChange(numEvals + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {/* Evaluations List */}
      <div className="space-y-4">
        {evaluations.map((evaluation, index) => (
          <Collapsible
            key={evaluation.id}
            open={expandedEvals[evaluation.id]}
            onOpenChange={() => toggleEval(evaluation.id)}
          >
            <div className="rounded-xl border border-border overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 bg-card hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                      <span className="text-info font-bold">{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-foreground">
                        Evaluation {index + 1}
                      </span>
                      <p className="text-sm text-muted-foreground truncate max-w-md">
                        {evaluation.question || 'No question set'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {evaluation.question && evaluation.expectedResponse && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                    {expandedEvals[evaluation.id] ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-6 space-y-6 border-t border-border bg-card/50">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEvaluation(evaluation.id)}
                      disabled={evaluations.length <= 0}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Question</Label>
                      <Textarea
                        value={evaluation.question}
                        onChange={(e) =>
                          updateEvaluation(evaluation.id, { question: e.target.value })
                        }
                        placeholder="Enter the evaluation question..."
                        rows={2}
                        className="input-focus bg-secondary resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Expected Accurate Response</Label>
                      <Textarea
                        value={evaluation.expectedResponse}
                        onChange={(e) =>
                          updateEvaluation(evaluation.id, {
                            expectedResponse: e.target.value,
                          })
                        }
                        placeholder="Enter the expected response..."
                        rows={4}
                        className="input-focus bg-secondary resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Active Agents</Label>
                        <Select
                          value={evaluation.activeAgents[0] || ''}
                          onValueChange={(value) =>
                            updateEvaluation(evaluation.id, { activeAgents: [value] })
                          }
                        >
                          <SelectTrigger className="bg-secondary">
                            <SelectValue placeholder="Select agents" />
                          </SelectTrigger>
                          <SelectContent>
                            {agents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.id}>
                                {agent.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Active Tools</Label>
                        <Select
                          value={evaluation.activeTools[0] || ''}
                          onValueChange={(value) =>
                            updateEvaluation(evaluation.id, { activeTools: [value] })
                          }
                        >
                          <SelectTrigger className="bg-secondary">
                            <SelectValue placeholder="Select tools" />
                          </SelectTrigger>
                          <SelectContent>
                            {getToolsForSelectedAgents(evaluation.activeAgents).map((tool) => (
                              <SelectItem key={tool.id} value={tool.id}>
                                {tool.name || 'Unnamed Tool'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Logic for the Response</Label>
                      <Textarea
                        value={evaluation.logic}
                        onChange={(e) =>
                          updateEvaluation(evaluation.id, { logic: e.target.value })
                        }
                        placeholder="Explain the logic behind the expected response..."
                        rows={3}
                        className="input-focus bg-secondary resize-none"
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
