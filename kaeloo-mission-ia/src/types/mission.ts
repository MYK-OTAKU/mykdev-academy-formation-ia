export type ScreenId =
  | 'home'
  | 'defi1'
  | 'defi2'
  | 'defi3'
  | 'defi4'
  | 'defi5'
  | 'diploma';

export type CharacterId = 'kaeloo' | 'chat' | 'superia' | 'moignon';

export interface HumanMachineQuestion {
  id: number;
  text: string;
  answer: 'HUMAIN' | 'MACHINE';
  explanation: string;
  hint: string;
  icon: string;
}

export type ToolCategory = 'TEXTE' | 'IMAGE' | 'AUDIO' | 'VOIX' | 'VIDEO';

export interface ToolFamilyInfo {
  id: ToolCategory;
  name: string;
  iconName: string;
  objectLabel: string;
  shortDesc: string;
  color: string;
  example: string;
}

export interface ToolMission {
  id: string;
  label: string;
  text: string;
  answer: ToolCategory;
  explanation: string;
  hint: string;
}

export interface SecurityShield {
  id: number;
  title: string;
  shortDesc: string;
  icon: string;
  color: string;
}

export interface SecuritySituation {
  id: number;
  text: string;
  answer: 'CAN_DO' | 'BE_CAREFUL';
  shieldId: number;
  explanation: string;
  hint: string;
}

export interface AdventurePreset {
  id: string;
  title: string;
  subtitle: string;
  defaultComicTitle: string;
  defaultScenes: {
    illustrationId: string;
    description: string;
    dialogue: string;
  }[];
}

export interface ComicScene {
  stepNumber: 1 | 2 | 3;
  stepTitle: string;
  stepPrompt: string;
  illustrationId: string;
  customImageDataUrl?: string;
  description: string;
  dialogue: string;
  generatedPrompt: string;
}

export interface ReflectionAnswers {
  q1Choice: string;
  q2Choice: string;
  q3Choice: string;
  customNote: string;
}

export interface MentorChecklist {
  humanVsMachine: boolean;
  fiveFamilies: boolean;
  sensitiveData: boolean;
  promptFormulation: boolean;
  personalContribution: boolean;
}
