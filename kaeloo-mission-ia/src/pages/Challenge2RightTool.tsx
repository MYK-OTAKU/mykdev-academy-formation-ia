import React, { useState } from 'react';
import {
  BookOpen,
  Paintbrush,
  Music,
  Mic,
  Video,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { TOOL_FAMILIES, DEFI2_MISSIONS } from '../data/missionData';
import { ToolCategory } from '../types/mission';
import { CharacterBubble } from '../components/CharacterBubble';
import { sound } from '../utils/sound';

interface Challenge2Props {
  savedAnswers: Record<string, string>;
  onSaveAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const Challenge2RightTool: React.FC<Challenge2Props> = ({
  savedAnswers,
  onSaveAnswers,
  onComplete,
  onBack,
  onNext,
}) => {
  const [missionIdx, setMissionIdx] = useState<number>(0);
  const [selectedTool, setSelectedTool] = useState<ToolCategory | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentMission = DEFI2_MISSIONS[missionIdx];
  const allSolved = Object.keys(savedAnswers).length === DEFI2_MISSIONS.length;
  const alreadySolvedCurrent = savedAnswers[currentMission.id] === currentMission.answer;

  const renderFamilyIcon = (iconName: string, className = 'w-7 h-7') => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Paintbrush':
        return <Paintbrush className={className} />;
      case 'Music':
        return <Music className={className} />;
      case 'Mic':
        return <Mic className={className} />;
      default:
        return <Video className={className} />;
    }
  };

  const handleSelectTool = (toolId: ToolCategory) => {
    setSelectedTool(toolId);
    if (toolId === currentMission.answer) {
      sound.playSuccess();
      setIsCorrect(true);
      const updated = { ...savedAnswers, [currentMission.id]: toolId };
      onSaveAnswers(updated);
      if (Object.keys(updated).length === DEFI2_MISSIONS.length) {
        onComplete();
      }
    } else {
      sound.playHint();
      setIsCorrect(false);
    }
  };

  const goNextMission = () => {
    sound.playClick();
    if (missionIdx < DEFI2_MISSIONS.length - 1) {
      setMissionIdx(missionIdx + 1);
      setSelectedTool(null);
      setIsCorrect(null);
    }
  };

  const goPrevMission = () => {
    sound.playClick();
    if (missionIdx > 0) {
      setMissionIdx(missionIdx - 1);
      setSelectedTool(null);
      setIsCorrect(null);
    }
  };

  return (
    <div className="space-y-6 animate-pop">
      <CharacterBubble character="superia" speakerName="Super IA">
        « Nous avons cinq missions à réaliser. Peux-tu choisir le bon type d’IA ? Un même outil peut parfois avoir plusieurs fonctions, mais chaque besoin correspond à une spécialité ! »
      </CharacterBubble>

      <section className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-purple-300 shadow-lg">
        {/* Barre d'état des 5 missions */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <span className="bg-purple-100 text-purple-900 font-display font-bold text-sm px-4 py-1 rounded-full">
            Défi 2 · {currentMission.label} ({missionIdx + 1} / {DEFI2_MISSIONS.length})
          </span>
          <div className="flex gap-1.5">
            {DEFI2_MISSIONS.map((m, i) => {
              const done = savedAnswers[m.id] === m.answer;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setMissionIdx(i);
                    setSelectedTool(null);
                    setIsCorrect(null);
                  }}
                  className={`px-3 py-1 rounded-full font-display font-bold text-xs border-2 transition-all ${
                    i === missionIdx
                      ? 'bg-purple-600 text-white border-purple-700 scale-105'
                      : done
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {done ? `✓ ${m.id}` : m.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Énoncé de la mission */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-sky-50 border-2 border-purple-200 rounded-3xl p-6 text-center my-4 shadow-inner">
          <span className="inline-block bg-amber-300 text-slate-950 font-display font-bold text-xs uppercase px-3 py-1 rounded-full mb-2">
            {currentMission.label}
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 max-w-xl mx-auto">
            {currentMission.text}
          </h2>
        </div>

        {/* Les 5 cartes d'outils avec icône et intitulé */}
        <p className="text-center text-sm font-extrabold text-slate-600 mb-3">
          👇 Clique sur la famille d’IA qui correspond le mieux à cette mission :
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-4">
          {TOOL_FAMILIES.map((fam) => {
            const isChosenCorrect =
              (selectedTool === fam.id && isCorrect) ||
              (alreadySolvedCurrent && currentMission.answer === fam.id);
            const isChosenWrong = selectedTool === fam.id && isCorrect === false;

            return (
              <button
                key={fam.id}
                type="button"
                onClick={() => handleSelectTool(fam.id)}
                className={`flex flex-col items-center justify-between p-4 rounded-2xl border-4 text-center transition-all active:scale-95 ${
                  isChosenCorrect
                    ? 'bg-emerald-500 text-white border-emerald-700 shadow-lg scale-105'
                    : isChosenWrong
                    ? 'bg-amber-100 text-amber-950 border-amber-400 animate-wiggle'
                    : 'bg-slate-50 hover:bg-sky-50 text-slate-900 border-slate-200 hover:border-sky-400 shadow-sm'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 text-white bg-gradient-to-br ${fam.color} shadow`}
                >
                  {renderFamilyIcon(fam.iconName, 'w-7 h-7')}
                </div>
                <div className="font-display font-bold text-base leading-tight">
                  {fam.name}
                </div>
                <div
                  className={`text-xs font-bold mt-1 ${
                    isChosenCorrect ? 'text-emerald-50' : 'text-slate-500'
                  }`}
                >
                  {fam.objectLabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback bonne réponse ou indice */}
        {(isCorrect === true || alreadySolvedCurrent) && (
          <div className="bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 sm:p-5 text-emerald-950 flex items-start gap-3 animate-pop">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-display font-bold text-lg">
                Bravo ! C’est bien : IA {currentMission.answer} !
              </div>
              <p className="font-bold text-sm sm:text-base mt-1">
                {currentMission.explanation}
              </p>
              {missionIdx < DEFI2_MISSIONS.length - 1 && (
                <button
                  type="button"
                  onClick={goNextMission}
                  className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-sm shadow"
                >
                  <span>Mission suivante</span>
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
              <div className="font-display font-bold text-lg">Indice pour t’aider :</div>
              <p className="font-bold text-sm sm:text-base mt-1">{currentMission.hint}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t-2 border-slate-100">
          <button
            type="button"
            onClick={missionIdx > 0 ? goPrevMission : onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{missionIdx > 0 ? 'Mission précédente' : 'Retour au Défi 1'}</span>
          </button>

          {missionIdx < DEFI2_MISSIONS.length - 1 && (
            <button
              type="button"
              onClick={goNextMission}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-sm"
            >
              <span>Mission suivante</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Récapitulatif final des 5 familles une fois les 5 missions réussies */}
      {allSolved && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-xl space-y-5 animate-pop">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🧰</span>
            <div>
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-0.5 rounded-full uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Badge 2 débloqué !
              </span>
              <h3 className="font-display font-bold text-2xl text-slate-900">
                Récapitulatif des 5 grandes familles d’IA
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {TOOL_FAMILIES.map((f) => (
              <div
                key={f.id}
                className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between"
              >
                <div>
                  <div className="font-display font-bold text-base text-slate-900 mb-1">
                    {f.name}
                  </div>
                  <p className="text-xs font-bold text-slate-600">{f.shortDesc}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] font-extrabold text-sky-800">
                  Ex : {f.example}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                sound.playFanfare();
                onNext();
              }}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-display font-bold text-lg shadow-lg flex items-center gap-2"
            >
              <span>Défi suivant : Les boucliers de sécurité</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
