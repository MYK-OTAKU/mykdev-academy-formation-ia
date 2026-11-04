import React, { useState } from 'react';
import { useMissionState } from './hooks/useMissionState';
import { HeaderBar } from './components/HeaderBar';
import { AccompagnateurModal } from './components/AccompagnateurModal';
import { HomeScreen } from './pages/HomeScreen';
import { Challenge1HumanMachine } from './pages/Challenge1HumanMachine';
import { Challenge2RightTool } from './pages/Challenge2RightTool';
import { Challenge3SecurityShields } from './pages/Challenge3SecurityShields';
import { Challenge4PromptPower } from './pages/Challenge4PromptPower';
import { Challenge5ComicCreator } from './pages/Challenge5ComicCreator';
import { DiplomaScreen } from './pages/DiplomaScreen';
import { sound } from './utils/sound';
import { ScreenId } from './types/mission';

export const App: React.FC = () => {
  const {
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
  } = useMissionState();

  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [mentorOpen, setMentorOpen] = useState<boolean>(false);

  const navigateTo = (screen: ScreenId) => {
    sound.playClick();
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const nextMuted = !soundMuted;
    sound.muted = nextMuted;
    setSoundMuted(nextMuted);
    if (!nextMuted) sound.playClick();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100/70 via-sky-50 to-emerald-50/70">
      <HeaderBar
        currentScreen={currentScreen}
        onSelectScreen={navigateTo}
        completedChallenges={completedChallenges}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        onOpenMentor={() => setMentorOpen(true)}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartMission={() => navigateTo('defi1')}
            onOpenMentor={() => setMentorOpen(true)}
            completedChallenges={completedChallenges}
          />
        )}

        {currentScreen === 'defi1' && (
          <Challenge1HumanMachine
            savedAnswers={defi1Answers}
            onSaveAnswers={setDefi1Answers}
            onComplete={() => markChallengeComplete(1)}
            onBack={() => navigateTo('home')}
            onNext={() => navigateTo('defi2')}
          />
        )}

        {currentScreen === 'defi2' && (
          <Challenge2RightTool
            savedAnswers={defi2Answers}
            onSaveAnswers={setDefi2Answers}
            onComplete={() => markChallengeComplete(2)}
            onBack={() => navigateTo('defi1')}
            onNext={() => navigateTo('defi3')}
          />
        )}

        {currentScreen === 'defi3' && (
          <Challenge3SecurityShields
            savedAnswers={defi3Answers}
            onSaveAnswers={setDefi3Answers}
            onComplete={() => markChallengeComplete(3)}
            onBack={() => navigateTo('defi2')}
            onNext={() => navigateTo('defi4')}
          />
        )}

        {currentScreen === 'defi4' && (
          <Challenge4PromptPower
            quizDone={defi4QuizDone}
            onSetQuizDone={setDefi4QuizDone}
            onComplete={() => markChallengeComplete(4)}
            onBack={() => navigateTo('defi3')}
            onNext={() => navigateTo('defi5')}
          />
        )}

        {currentScreen === 'defi5' && (
          <Challenge5ComicCreator
            selectedAdventureId={selectedAdventureId}
            onSelectAdventureId={setSelectedAdventureId}
            customAdventureIdea={customAdventureIdea}
            onChangeCustomIdea={setCustomAdventureIdea}
            comicTitle={comicTitle}
            onChangeComicTitle={setComicTitle}
            scenes={comicScenes}
            onChangeScenes={setComicScenes}
            reflection={reflection}
            onChangeReflection={setReflection}
            onComplete={() => markChallengeComplete(5)}
            onBack={() => navigateTo('defi4')}
            onFinishMission={() => navigateTo('diploma')}
          />
        )}

        {currentScreen === 'diploma' && (
          <DiplomaScreen
            nickname={explorerNickname}
            onChangeNickname={setExplorerNickname}
            onReplay={resetAllMission}
          />
        )}
      </main>

      <footer className="bg-white/80 border-t-2 border-sky-200 py-4 px-4 text-center text-xs font-bold text-slate-600">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            🐸 <strong>KAELOO — MISSION IA</strong> · « Réfléchis, protège-toi et crée avec l’intelligence artificielle ! »
          </span>
          <span>
            🔒 100 % local & sans collecte de données · Dimanche 8 novembre 2026
          </span>
        </div>
      </footer>

      <AccompagnateurModal
        isOpen={mentorOpen}
        onClose={() => setMentorOpen(false)}
        checklist={mentorChecklist}
        onChangeChecklist={setMentorChecklist}
      />
    </div>
  );
};

export default App;
