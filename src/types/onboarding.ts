export interface CardDetails {
  processName: string;
  description: string;
  useCases: string[];
  vertical: string;
  practice: string;
  imageUrl: string | null;
}

export interface BusinessOverview {
  type: 'image' | 'figma';
  imageUrl: string | null;
  figmaLink: string;
  referenceLink: string;
}

export interface StructuredFile {
  id: string;
  fileName: string;
  tableName: string;
}

export interface UnstructuredFile {
  id: string;
  fileName: string;
}

export interface DataUpload {
  structuredData: StructuredFile[];
  unstructuredData: UnstructuredFile[];
}

export interface Tool {
  id: string;
  name: string;
  dataSource: string[];
  category: string;
  instructions: string;
}

export interface Agent {
  id: string;
  name: string;
  instructions: string;
  tools: Tool[];
}

export interface AgentNetwork {
  agents: Agent[];
  supervisorAgent: Agent;
}

export interface Evaluation {
  id: string;
  question: string;
  expectedResponse: string;
  activeAgents: string[];
  activeTools: string[];
  logic: string;
}

export interface FrontendPortal {
  type: 'link' | 'document';
  link: string;
  documentUrl: string | null;
}

export interface OnboardingFormData {
  cardDetails: CardDetails;
  businessOverview: BusinessOverview;
  dataUpload: DataUpload;
  agentNetwork: AgentNetwork;
  evaluations: Evaluation[];
  frontendPortal: FrontendPortal;
}

export interface OnboardingSession {
  id: string;
  name: string;
  currentStep: number;
  status: 'draft' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  data: OnboardingFormData;
}

export const VERTICALS = [
  'Supply Chain',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
  'Technology',
  'Energy',
  'Transportation',
] as const;

export const PRACTICES = [
  'Operations',
  'Analytics',
  'Customer Service',
  'Sales',
  'Marketing',
  'HR',
  'IT',
  'Legal',
] as const;

export const TOOL_CATEGORIES = [
  'Data Retrieval',
  'Data Processing',
  'API Integration',
  'Decision Making',
  'Reporting',
  'Communication',
  'Validation',
] as const;

export const initialFormData: OnboardingFormData = {
  cardDetails: {
    processName: '',
    description: '',
    useCases: [],
    vertical: '',
    practice: '',
    imageUrl: null,
  },
  businessOverview: {
    type: 'image',
    imageUrl: null,
    figmaLink: '',
    referenceLink: '',
  },
  dataUpload: {
    structuredData: [],
    unstructuredData: [],
  },
  agentNetwork: {
    agents: [],
    supervisorAgent: {
      id: 'supervisor',
      name: 'Supervisor Agent',
      instructions: 'Coordinates all agents in the network, routes tasks to appropriate specialists, and synthesizes final responses.',
      tools: [],
    },
  },
  evaluations: [],
  frontendPortal: {
    type: 'link',
    link: '',
    documentUrl: null,
  },
};
