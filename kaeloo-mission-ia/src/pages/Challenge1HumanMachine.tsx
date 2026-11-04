import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { DEFI1_QUESTIONS } from '../data/missionData';
import { CharacterBubble } from '../components/CharacterBubble';
import { sound } from '../utils/sound';

interface Challenge1Props {
  savedAnswers: Record<number, 'HUMAIN' | 'MACHINE'>;
  onSaveAnswers: React.Dispatch<React.SetStateAction<Record<number, 'HUMAIN' | 'MACHINE'>>>;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const Challenge1HumanMachine: React.FC<Challenge1Props> = ({
  savedAnswers,
  onSaveAnswers,
  onComplete,
  onBack,
  onNext,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<'HUMAIN' | 'MACHINE' | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQ = DEFI1_QUESTIONS[currentIdx];
  const allSolved = Object.keys(savedAnswers).length === DEFI1_QUESTIONS.length;

  const handleSelect = (choice: 'HUMAIN' | 'MACHINE') => {
    setSelectedChoice(choice);
    if (choice === currentQ.answer) {
      sound.playSuccess();
      setIsCorrect(true);
      const updated = { ...savedAnswers, [currentQ.id]: choice };
      onSaveAnswers(updated);
      if (Object.keys(updated).length === DEFI1_QUESTIONS.length) {
        onComplete();
      }
    } else {
      sound.playHint();
      setIsCorrect(false);
    }
  };

  const goToNextSituation = () => {
    sound.playClick();
    if (currentIdx < DEFI1_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedChoice(null);
      setIsCorrect(null);
    }
  };

  const goToPrevSituation = () => {
    sound.playClick();
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setSelectedChoice(null);
      setIsCorrect(null);
    }
  };

  const alreadySolvedCurrent = savedAnswers[currentQ.id] === currentQ.answer;

  return (
    <div className="space-y-6 animate-pop">
      {/* Bulle d'introduction de la grenouille */}
      <CharacterBubble character="kaeloo" speakerName="La grenouille">
        « Super IA veut nous montrer ce qu’elle sait faire. Mais certaines choses sont surtout des forces humaines. À toi de jouer ! »
      </CharacterBubble>

      {/* Carte principale du Défi 1 */}
      <section className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-sky-300 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <span className="bg-sky-100 text-sky-900 font-display font-bold text-sm px-4 py-1 rounded-full">
            Défi 1 · Situation {currentIdx + 1} sur {DEFI1_QUESTIONS.length}
          </span>
          <div className="flex gap-1.5">
            {DEFI1_QUESTIONS.map((q, idx) => {
              const solved = savedAnswers[q.id] === q.answer;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrentIdx(idx);
                    setSelectedChoice(null);
                    setIsCorrect(null);
                  }}
                  className={`w-8 h-8 rounded-full font-display font-bold text-xs border-2 transition-all ${
                    idx === currentIdx
                      ? 'bg-sky-600 text-white border-sky-700 scale-110'
                      : solved
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {solved ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carte de situation */}
        <div className="bg-gradient-to-br from-sky-50 via-white to-amber-50 border-3 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 text-center my-4 shadow-inner">
          <div className="text-5xl sm:text-6xl mb-3 animate-float">{currentQ.icon}</div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 max-w-xl mx-auto leading-snug">
            {currentQ.text}
          </h2>
        </div>

        {/* Deux grands boutons tactiles : HUMAIN / MACHINE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          <button
            type="button"
            onClick={() => handleSelect('HUMAIN')}
            className={`flex items-center justify-center gap-3 p-5 rounded-2xl border-4 font-display font-bold text-xl sm:text-2xl transition-all active:scale-95 ${
              (selectedChoice === 'HUMAIN' && isCorrect) ||
              (alreadySolvedCurrent && currentQ.answer === 'HUMAIN')
                ? 'bg-emerald-500 text-white border-emerald-700 shadow-lg scale-[1.02]'
                : selectedChoice === 'HUMAIN' && isCorrect === false
                ? 'bg-amber-100 text-amber-900 border-amber-400 animate-wiggle'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300 shadow-sm'
            }`}
          >
            <span className="text-3xl">🧑‍🤝‍🧑</span>
            <span>HUMAIN</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelect('MACHINE')}
            className={`flex items-center justify-center gap-3 p-5 rounded-2xl border-4 font-display font-bold text-xl sm:text-2xl transition-all active:scale-95 ${
              (selectedChoice === 'MACHINE' && isCorrect) ||
              (alreadySolvedCurrent && currentQ.answer === 'MACHINE')
                ? 'bg-sky-600 text-white border-sky-800 shadow-lg scale-[1.02]'
                : selectedChoice === 'MACHINE' && isCorrect === false
                ? 'bg-amber-100 text-amber-900 border-amber-400 animate-wiggle'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-950 border-sky-300 shadow-sm'
            }`}
          >
            <span className="text-3xl">🤖</span>
            <span>MACHINE</span>
          </button>
        </div>

        {/* Retour immédiat : Bonne réponse ou Indice bienveillant pour corriger */}
        {(isCorrect === true || alreadySolvedCurrent) && (
          <div className="bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 sm:p-5 text-emerald-950 flex items-start gap-3 animate-pop">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-display font-bold text-lg">
                Super ! La réponse est bien : {currentQ.answer} !
              </div>
              <p className="font-bold text-sm sm:text-base mt-1">{currentQ.explanation}</p>
              {currentIdx < DEFI1_QUESTIONS.length - 1 && (
                <button
                  type="button"
                  onClick={goToNextSituation}
                  className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-sm shadow"
                >
                  <span>Situation suivante</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {isCorrect === false && (
          <div className="bg-amber-100 border-2 border-amber-400 rounded-2xl p-4 sm:p-5 text-amber-950 flex items-start gap-3 animate-pop">
            <HelpCircle className="w-7 h-7 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-display font-bold text-lg">
                Presque ! Essaie encore avec cet indice :
              </div>
              <p className="font-bold text-sm sm:text-base mt-1">{currentQ.hint}</p>
              <p className="text-xs font-extrabold text-amber-800 mt-1.5">
                👉 Clique sur l’autre bouton pour corriger ta réponse !
              </p>
            </div>
          </div>
        )}

        {/* Navigation entre les situations */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t-2 border-slate-100">
          <button
            type="button"
            onClick={currentIdx > 0 ? goToPrevSituation : onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentIdx > 0 ? 'Question précédente' : 'Retour à l’accueil'}</span>
          </button>

          {currentIdx < DEFI1_QUESTIONS.length - 1 && (
            <button
              type="button"
              onClick={goToNextSituation}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-sm"
            >
              <span>Question suivante</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Message de félicitations final du Défi 1 */}
      {allSolved && (
        <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl animate-pop">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="text-5xl shrink-0">🏅</div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" /> Badge 1 débloqué !
              </div>
              <p className="font-display font-bold text-lg sm:text-xl leading-snug">
                « Bravo ! Les machines peuvent être très rapides, mais les humains apportent leurs émotions, leurs expériences, leur jugement et leurs responsabilités. Ensemble, ils peuvent accomplir de grandes choses ! »
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playFanfare();
                onNext();
              }}
              className="px-7 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold text-lg shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>Défi suivant</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
