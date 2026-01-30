import { useState } from 'react';
import { Plus, X, Bot, Wrench, ChevronDown, ChevronUp, Crown, Info } from 'lucide-react';
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
import { Agent, Tool, TOOL_CATEGORIES } from '@/types/onboarding';

export function Step4AgentNetwork() {
  const { formData, setFormData, updateFormData } = useOnboarding();
  const { agents, supervisorAgent } = formData.agentNetwork;
  const allFiles = [
    ...formData.dataUpload.structuredData.map((f) => f.fileName),
    ...formData.dataUpload.unstructuredData.map((f) => f.fileName),
    'Web Link',
    'MCP',
  ];

  const [expandedAgents, setExpandedAgents] = useState<Record<string, boolean>>({});
  const [numAgents, setNumAgents] = useState(agents.length);

  const toggleAgent = (agentId: string) => {
    setExpandedAgents((prev) => ({ ...prev, [agentId]: !prev[agentId] }));
  };

  const handleNumAgentsChange = (num: number) => {
    setNumAgents(num);
    const currentCount = agents.length;

    if (num > currentCount) {
      const newAgents: Agent[] = [];
      for (let i = currentCount; i < num; i++) {
        newAgents.push({
          id: crypto.randomUUID(),
          name: `Agent ${i + 1}`,
          instructions: '',
          tools: [],
        });
      }
      setFormData((prev) => ({
        ...prev,
        agentNetwork: {
          ...prev.agentNetwork,
          agents: [...prev.agentNetwork.agents, ...newAgents],
        },
      }));
    } else if (num < currentCount) {
      setFormData((prev) => ({
        ...prev,
        agentNetwork: {
          ...prev.agentNetwork,
          agents: prev.agentNetwork.agents.slice(0, num),
        },
      }));
    }
  };

  const updateAgent = (agentId: string, updates: Partial<Agent>) => {
    setFormData((prev) => ({
      ...prev,
      agentNetwork: {
        ...prev.agentNetwork,
        agents: prev.agentNetwork.agents.map((a) =>
          a.id === agentId ? { ...a, ...updates } : a
        ),
      },
    }));
  };

  const addToolToAgent = (agentId: string) => {
    const newTool: Tool = {
      id: crypto.randomUUID(),
      name: '',
      dataSource: [],
      category: '',
      instructions: '',
    };
    setFormData((prev) => ({
      ...prev,
      agentNetwork: {
        ...prev.agentNetwork,
        agents: prev.agentNetwork.agents.map((a) =>
          a.id === agentId ? { ...a, tools: [...a.tools, newTool] } : a
        ),
      },
    }));
  };

  const updateTool = (agentId: string, toolId: string, updates: Partial<Tool>) => {
    setFormData((prev) => ({
      ...prev,
      agentNetwork: {
        ...prev.agentNetwork,
        agents: prev.agentNetwork.agents.map((a) =>
          a.id === agentId
            ? {
                ...a,
                tools: a.tools.map((t) => (t.id === toolId ? { ...t, ...updates } : t)),
              }
            : a
        ),
      },
    }));
  };

  const removeTool = (agentId: string, toolId: string) => {
    setFormData((prev) => ({
      ...prev,
      agentNetwork: {
        ...prev.agentNetwork,
        agents: prev.agentNetwork.agents.map((a) =>
          a.id === agentId
            ? { ...a, tools: a.tools.filter((t) => t.id !== toolId) }
            : a
        ),
      },
    }));
  };

  const updateSupervisor = (updates: Partial<Agent>) => {
    updateFormData('agentNetwork', {
      supervisorAgent: { ...supervisorAgent, ...updates },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Network of Agents</h2>
        <p className="text-muted-foreground">
          Configure your agents and their respective tools
        </p>
      </div>

      {/* Number of Agents Input */}
      <div className="p-6 rounded-xl bg-secondary/50 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-lg">Number of Agents</Label>
            <p className="text-sm text-muted-foreground mt-1">
              (excluding Supervisor Agent)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNumAgentsChange(Math.max(0, numAgents - 1))}
              disabled={numAgents <= 0}
            >
              -
            </Button>
            <span className="text-2xl font-bold text-primary w-12 text-center">
              {numAgents}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleNumAgentsChange(numAgents + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {/* Agents List */}
      <div className="space-y-4">
        {agents.map((agent, index) => (
          <Collapsible
            key={agent.id}
            open={expandedAgents[agent.id]}
            onOpenChange={() => toggleAgent(agent.id)}
          >
            <div className="rounded-xl border border-border overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 bg-card hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-foreground">
                        {agent.name || `Agent ${index + 1}`}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {agent.tools.length} tool{agent.tools.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  {expandedAgents[agent.id] ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-6 space-y-6 border-t border-border bg-card/50">
                  {/* Agent Details */}
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Agent Name</Label>
                      <Input
                        value={agent.name}
                        onChange={(e) => updateAgent(agent.id, { name: e.target.value })}
                        placeholder="e.g., Route Validator"
                        className="input-focus bg-secondary"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Agent Instructions + Prompt</Label>
                        <div className="group relative">
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-3 rounded-lg bg-popover border border-border text-sm z-50">
                            Provide detailed instructions for how this agent should behave, what it should focus on, and any specific rules it should follow.
                          </div>
                        </div>
                      </div>
                      <Textarea
                        value={agent.instructions}
                        onChange={(e) =>
                          updateAgent(agent.id, { instructions: e.target.value })
                        }
                        placeholder="Describe the agent's role, responsibilities, and behavior..."
                        rows={4}
                        className="input-focus bg-secondary resize-none"
                      />
                    </div>
                  </div>

                  {/* Tools Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Tools</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToolToAgent(agent.id)}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Tool
                      </Button>
                    </div>

                    {agent.tools.map((tool, toolIndex) => (
                      <div
                        key={tool.id}
                        className="p-4 rounded-lg bg-secondary/50 border border-border space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Tool {toolIndex + 1}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTool(agent.id, tool.id)}
                            className="text-muted-foreground hover:text-destructive h-8 w-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Tool Name</Label>
                              <Input
                                value={tool.name}
                                onChange={(e) =>
                                  updateTool(agent.id, tool.id, { name: e.target.value })
                                }
                                placeholder="e.g., Data Fetcher"
                                className="input-focus bg-background"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Category</Label>
                              <Select
                                value={tool.category}
                                onValueChange={(value) =>
                                  updateTool(agent.id, tool.id, { category: value })
                                }
                              >
                                <SelectTrigger className="bg-background">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {TOOL_CATEGORIES.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                      {cat}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Data Source</Label>
                            <Select
                              value={tool.dataSource[0] || ''}
                              onValueChange={(value) =>
                                updateTool(agent.id, tool.id, { dataSource: [value] })
                              }
                            >
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Select data source" />
                              </SelectTrigger>
                              <SelectContent>
                                {allFiles.map((file) => (
                                  <SelectItem key={file} value={file}>
                                    {file}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Tool Instructions</Label>
                            <Textarea
                              value={tool.instructions}
                              onChange={(e) =>
                                updateTool(agent.id, tool.id, { instructions: e.target.value })
                              }
                              placeholder="Describe what this tool does..."
                              rows={2}
                              className="input-focus bg-background resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {agent.tools.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">
                        No tools added yet. Click "Add Tool" to add one.
                      </p>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>

      {/* Supervisor Agent */}
      <div className="rounded-xl border-2 border-primary/30 overflow-hidden">
        <div className="p-4 bg-primary/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Crown className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-semibold text-foreground">Supervisor Agent</span>
            <p className="text-sm text-muted-foreground">
              Coordinates all agents in the network
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4 bg-card">
          <div className="space-y-2">
            <Label>Agent Name</Label>
            <Input
              value={supervisorAgent.name}
              onChange={(e) => updateSupervisor({ name: e.target.value })}
              className="input-focus bg-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label>Instructions + Prompt</Label>
            <Textarea
              value={supervisorAgent.instructions}
              onChange={(e) => updateSupervisor({ instructions: e.target.value })}
              rows={4}
              className="input-focus bg-secondary resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
