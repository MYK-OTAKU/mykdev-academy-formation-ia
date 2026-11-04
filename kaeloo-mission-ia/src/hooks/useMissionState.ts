import { useState } from 'react';
import {
  ScreenId,
  ComicScene,
  ReflectionAnswers,
  MentorChecklist,
} from '../types/mission';
import { ADVENTURE_PRESETS } from '../data/missionData';

const INITIAL_SCENES: ComicScene[] = [
  {
    stepNumber: 1,
    stepTitle: 'Le début',
    stepPrompt: 'Présente ton personnage et ce qu’il veut faire.',
    illustrationId: ADVENTURE_PRESETS[0].defaultScenes[0].illustrationId,
    description: ADVENTURE_PRESETS[0].defaultScenes[0].description,
    dialogue: ADVENTURE_PRESETS[0].defaultScenes[0].dialogue,
    generatedPrompt: '',
  },
  {
    stepNumber: 2,
    stepTitle: 'Le problème',
    stepPrompt: 'Imagine quelque chose d’inattendu qui arrive à ton personnage.',
    illustrationId: ADVENTURE_PRESETS[0].defaultScenes[1].illustrationId,
    description: ADVENTURE_PRESETS[0].defaultScenes[1].description,
    dialogue: ADVENTURE_PRESETS[0].defaultScenes[1].dialogue,
    generatedPrompt: '',
  },
  {
    stepNumber: 3,
    stepTitle: 'La solution',
    stepPrompt:
      'Comment ton personnage utilise-t-il son intelligence ou son imagination pour résoudre le problème ?',
    illustrationId: ADVENTURE_PRESETS[0].defaultScenes[2].illustrationId,
    description: ADVENTURE_PRESETS[0].defaultScenes[2].description,
    dialogue: ADVENTURE_PRESETS[0].defaultScenes[2].dialogue,
    generatedPrompt: '',
  },
];

export function useMissionState() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');

  // Badges et progression conservés uniquement en mémoire pendant la session
  const [completedChallenges, setCompletedChallenges] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // États internes des défis pour ne rien perdre si l'enfant revient en arrière
  const [defi1Answers, setDefi1Answers] = useState<Record<number, 'HUMAIN' | 'MACHINE'>>({});
  const [defi2Answers, setDefi2Answers] = useState<Record<string, string>>({});
  const [defi3Answers, setDefi3Answers] = useState<Record<number, 'CAN_DO' | 'BE_CAREFUL'>>({});
  const [defi4QuizDone, setDefi4QuizDone] = useState<boolean>(false);

  // État Défi 5 (Bande dessinée)
  const [selectedAdventureId, setSelectedAdventureId] = useState<string>('robot-perdu');
  const [customAdventureIdea, setCustomAdventureIdea] = useState<string>('');
  const [comicTitle, setComicTitle] = useState<string>(ADVENTURE_PRESETS[0].defaultComicTitle);
  const [comicScenes, setComicScenes] = useState<ComicScene[]>(INITIAL_SCENES);
  const [reflection, setReflection] = useState<ReflectionAnswers>({
    q1Choice: 'Les idées, l’histoire et les dialogues des personnages',
    q2Choice: 'M’aider à illustrer une scène ou trouver une idée supplémentaire',
    q3Choice: 'Mon vrai nom, mon adresse, mon téléphone, mes mots de passe et mes photos',
    customNote: '',
  });

  // Surnom fictif facultatif pour le diplôme (par défaut : Petit Explorateur)
  const [explorerNickname, setExplorerNickname] = useState<string>('Petit Explorateur');

  // Grille de vérification Espace Accompagnateur (locale à la session)
  const [mentorChecklist, setMentorChecklist] = useState<MentorChecklist>({
    humanVsMachine: false,
    fiveFamilies: false,
    sensitiveData: false,
    promptFormulation: false,
    personalContribution: false,
  });

  const markChallengeComplete = (challengeNumber: 1 | 2 | 3 | 4 | 5) => {
    setCompletedChallenges((prev) => ({ ...prev, [challengeNumber]: true }));
  };

  const resetAllMission = () => {
    setCurrentScreen('home');
    setCompletedChallenges({ 1: false, 2: false, 3: false, 4: false, 5: false });
    setDefi1Answers({});
    setDefi2Answers({});
    setDefi3Answers({});
    setDefi4QuizDone(false);
    setSelectedAdventureId('robot-perdu');
    setCustomAdventureIdea('');
    setComicTitle(ADVENTURE_PRESETS[0].defaultComicTitle);
    setComicScenes(INITIAL_SCENES.map((s) => ({ ...s, customImageDataUrl: undefined })));
    setExplorerNickname('Petit Explorateur');
  };

  return {
    currentScreen,
    setCurrentScreen,
    completedChallenges,
    markChallengeComplete,
    defi1Answers,
    setDefi1Answers,
    defi2Answers,
    setDefi2Answers,
    defi3Answers,
    setDefi3Answers,
    defi4QuizDone,
    setDefi4QuizDone,
    selectedAdventureId,
    setSelectedAdventureId,
    customAdventureIdea,
    setCustomAdventureIdea,
    comicTitle,
    setComicTitle,
    comicScenes,
    setComicScenes,
    reflection,
    setReflection,
    explorerNickname,
    setExplorerNickname,
    mentorChecklist,
    setMentorChecklist,
    resetAllMission,
  };
}
