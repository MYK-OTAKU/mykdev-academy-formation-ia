import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Lock,
} from 'lucide-react';
import { SECURITY_SHIELDS, DEFI3_SITUATIONS } from '../data/missionData';
import { CharacterBubble } from '../components/CharacterBubble';
import { sound } from '../utils/sound';

interface Challenge3Props {
  savedAnswers: Record<number, 'CAN_DO' | 'BE_CAREFUL'>;
  onSaveAnswers: React.Dispatch<React.SetStateAction<Record<number, 'CAN_DO' | 'BE_CAREFUL'>>>;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const Challenge3SecurityShields: React.FC<Challenge3Props> = ({
  savedAnswers,
  onSaveAnswers,
  onComplete,
  onBack,
  onNext,
}) => {
  const [sitIdx, setSitIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<'CAN_DO' | 'BE_CAREFUL' | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentSit = DEFI3_SITUATIONS[sitIdx];
  const matchedShield = SECURITY_SHIELDS.find((s) => s.id === currentSit.shieldId) || SECURITY_SHIELDS[0];
  const allSolved = Object.keys(savedAnswers).length === DEFI3_SITUATIONS.length;
  const alreadySolvedCurrent = savedAnswers[currentSit.id] === currentSit.answer;

  const handleSelect = (choice: 'CAN_DO' | 'BE_CAREFUL') => {
    setSelectedAns(choice);
    if (choice === currentSit.answer) {
      sound.playSuccess();
      setIsCorrect(true);
      const updated = { ...savedAnswers, [currentSit.id]: choice };
      onSaveAnswers(updated);
      if (Object.keys(updated).length === DEFI3_SITUATIONS.length) {
        onComplete();
      }
    } else {
      sound.playHint();
      setIsCorrect(false);
    }
  };

  const goNextSit = () => {
    sound.playClick();
    if (sitIdx < DEFI3_SITUATIONS.length - 1) {
      setSitIdx(sitIdx + 1);
      setSelectedAns(null);
      setIsCorrect(null);
    }
  };

  const goPrevSit = () => {
    sound.playClick();
    if (sitIdx > 0) {
      setSitIdx(sitIdx - 1);
      setSelectedAns(null);
      setIsCorrect(null);
    }
  };

  return (
    <div className="space-y-6 animate-pop">
      {/* Dialogue Chat + Grenouille */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <CharacterBubble character="chat" speakerName="Le chat malicieux">
          « Oh, une intelligence artificielle ! Je vais lui raconter tous mes secrets et lui donner mon adresse ! »
        </CharacterBubble>
        <CharacterBubble character="kaeloo" speakerName="La grenouille">
          « Attention ! Avant d’utiliser l’IA, il faut activer nos boucliers de protection ! »
        </CharacterBubble>
      </div>

      {/* Affichage des 5 boucliers de protection */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-300 shadow-md">
        <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 mb-3 text-center">
          🛡️ Nos 5 Boucliers de Protection
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {SECURITY_SHIELDS.map((sh) => (
            <div
              key={sh.id}
              className={`rounded-2xl p-3 border-2 text-center ${sh.color}`}
            >
              <div className="text-2xl mb-1">{sh.icon}</div>
              <div className="font-display font-bold text-xs sm:text-sm leading-tight mb-1">
                {sh.id}. {sh.title}
              </div>
              <p className="text-[11px] font-semibold leading-tight opacity-90">
                {sh.shortDesc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Jeu des 8 situations */}
      <section className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-sky-300 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <span className="bg-sky-100 text-sky-900 font-display font-bold text-sm px-4 py-1 rounded-full">
            Défi 3 · Situation {sitIdx + 1} sur {DEFI3_SITUATIONS.length}
          </span>
          <div className="flex gap-1 flex-wrap">
            {DEFI3_SITUATIONS.map((s, idx) => {
              const done = savedAnswers[s.id] === s.answer;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSitIdx(idx);
                    setSelectedAns(null);
                    setIsCorrect(null);
                  }}
                  className={`w-7 h-7 rounded-full font-display font-bold text-xs border-2 transition-all ${
                    idx === sitIdx
                      ? 'bg-sky-600 text-white border-sky-700 scale-110'
                      : done
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {done ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Situation à analyser */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-sky-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 text-center my-4 shadow-inner">
          <div className="text-4xl mb-2">🛡️</div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 max-w-xl mx-auto leading-snug">
            {currentSit.text}
          </h3>
        </div>

        {/* Deux grands boutons : « Je peux le faire » / « Je dois faire attention » */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          <button
            type="button"
            onClick={() => handleSelect('CAN_DO')}
            className={`flex items-center justify-center gap-3 p-5 rounded-2xl border-4 font-display font-bold text-lg sm:text-xl transition-all active:scale-95 ${
              (selectedAns === 'CAN_DO' && isCorrect) ||
              (alreadySolvedCurrent && currentSit.answer === 'CAN_DO')
                ? 'bg-emerald-500 text-white border-emerald-700 shadow-lg scale-[1.02]'
                : selectedAns === 'CAN_DO' && isCorrect === false
                ? 'bg-amber-100 text-amber-900 border-amber-400 animate-wiggle'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300 shadow-sm'
            }`}
          >
            <ShieldCheck className="w-7 h-7 shrink-0" />
            <span>Je peux le faire</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelect('BE_CAREFUL')}
            className={`flex items-center justify-center gap-3 p-5 rounded-2xl border-4 font-display font-bold text-lg sm:text-xl transition-all active:scale-95 ${
              (selectedAns === 'BE_CAREFUL' && isCorrect) ||
              (alreadySolvedCurrent && currentSit.answer === 'BE_CAREFUL')
                ? 'bg-rose-500 text-white border-rose-700 shadow-lg scale-[1.02]'
                : selectedAns === 'BE_CAREFUL' && isCorrect === false
                ? 'bg-amber-100 text-amber-900 border-amber-400 animate-wiggle'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-950 border-rose-300 shadow-sm'
            }`}
          >
            <ShieldAlert className="w-7 h-7 shrink-0" />
            <span>Je dois faire attention</span>
          </button>
        </div>

        {/* Apparition du bouclier correspondant après chaque bonne réponse */}
        {(isCorrect === true || alreadySolvedCurrent) && (
          <div className="bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 sm:p-5 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-pop">
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border-2 border-emerald-400 shrink-0 shadow-sm">
              <span className="text-3xl">{matchedShield.icon}</span>
              <div>
                <div className="text-[11px] font-extrabold uppercase text-emerald-700">
                  Bouclier n°{matchedShield.id}
                </div>
                <div className="font-display font-bold text-sm text-slate-900">
                  {matchedShield.title}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-base sm:text-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Bonne réponse :{' '}
                  {currentSit.answer === 'CAN_DO'
                    ? '« Je peux le faire »'
                    : '« Je dois faire attention »'}
                </span>
              </div>
              <p className="font-bold text-sm sm:text-base mt-1">
                {currentSit.explanation}
              </p>
              {sitIdx < DEFI3_SITUATIONS.length - 1 && (
                <button
                  type="button"
                  onClick={goNextSit}
                  className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-sm shadow"
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
              <div className="font-display font-bold text-lg">Réfléchissons ensemble :</div>
              <p className="font-bold text-sm sm:text-base mt-1">{currentSit.hint}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t-2 border-slate-100">
          <button
            type="button"
            onClick={sitIdx > 0 ? goPrevSit : onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{sitIdx > 0 ? 'Situation précédente' : 'Retour au Défi 2'}</span>
          </button>

          {sitIdx < DEFI3_SITUATIONS.length - 1 && (
            <button
              type="button"
              onClick={goNextSit}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-sm"
            >
              <span>Situation suivante</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Mini-rappel visuel des données à ne jamais transmettre + Message final */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-rose-200 shadow-md">
        <h3 className="font-display font-bold text-lg sm:text-xl text-rose-950 mb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-rose-600" />
          <span>Rappel visuel : les 6 secrets à ne jamais donner à une IA</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 text-center">
          {[
            { icon: '🪪', label: 'Nom complet' },
            { icon: '🏠', label: 'Adresse' },
            { icon: '📞', label: 'Téléphone' },
            { icon: '🔑', label: 'Mots de passe' },
            { icon: '📄', label: 'Documents privés' },
            { icon: '📸', label: 'Photos personnelles' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 font-display font-bold text-xs sm:text-sm text-rose-950"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {allSolved && (
        <section className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 border-4 border-sky-300 shadow-xl animate-pop">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="text-5xl shrink-0">🛡️</div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" /> Badge 3 débloqué !
              </div>
              <p className="font-display font-bold text-lg sm:text-xl leading-snug">
                « Bravo, protecteur de l’IA ! Une information personnelle est précieuse. Avant de partager quelque chose avec une IA, réfléchis et demande conseil à un adulte. »
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
