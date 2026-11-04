import React, { useState } from 'react';
import {
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Wand2,
} from 'lucide-react';
import { PROMPT_BUILDER_OPTIONS } from '../data/missionData';
import { CharacterBubble } from '../components/CharacterBubble';
import { sound } from '../utils/sound';

interface Challenge4Props {
  quizDone: boolean;
  onSetQuizDone: (done: boolean) => void;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const Challenge4PromptPower: React.FC<Challenge4Props> = ({
  quizDone,
  onSetQuizDone,
  onComplete,
  onBack,
  onNext,
}) => {
  const [selectedPromptChoice, setSelectedPromptChoice] = useState<'A' | 'B' | null>(
    quizDone ? 'B' : null
  );

  // États du constructeur interactif de prompt (Partie 2)
  const [perso, setPerso] = useState(PROMPT_BUILDER_OPTIONS.personnages[0]);
  const [action, setAction] = useState(PROMPT_BUILDER_OPTIONS.actions[2]); // lire
  const [lieu, setLieu] = useState(PROMPT_BUILDER_OPTIONS.lieux[0]); // forêt
  const [ambiance, setAmbiance] = useState(PROMPT_BUILDER_OPTIONS.ambiances[0]); // joyeuse
  const [style, setStyle] = useState(PROMPT_BUILDER_OPTIONS.styles[0]); // dessin animé
  const [extraIdea, setExtraIdea] = useState('');
  const [copied, setCopied] = useState(false);
  const [builderInteracted, setBuilderInteracted] = useState(false);

  const builtPrompt = `Crée une image ${perso.phrase} ${action.phrase} ${lieu.phrase}, ${ambiance.phrase}, ${style.phrase}${
    extraIdea.trim() ? `, ${extraIdea.trim()}` : ''
  }.`;

  const handleChooseQuiz = (choice: 'A' | 'B') => {
    setSelectedPromptChoice(choice);
    if (choice === 'B') {
      sound.playSuccess();
      onSetQuizDone(true);
      onComplete();
    } else {
      sound.playHint();
    }
  };

  const handleCopyPrompt = () => {
    sound.playSuccess();
    navigator.clipboard?.writeText(builtPrompt);
    setCopied(true);
    setBuilderInteracted(true);
    onComplete();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-pop">
      <CharacterBubble character="kaeloo" speakerName="La grenouille">
        « Je veux que Super IA dessine quelque chose. Mais comment lui expliquer ce que j’imagine ? »
      </CharacterBubble>

      {/* PARTIE 1 : Comparer deux prompts */}
      <section className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-amber-300 shadow-lg">
        <span className="inline-block bg-amber-100 text-amber-900 font-display font-bold text-sm px-4 py-1 rounded-full mb-3">
          Partie 1 · Compare ces deux consignes (Prompts)
        </span>
        <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mb-4">
          Quel prompt aidera le mieux l’IA à comprendre ce que tu veux ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {/* Prompt A */}
          <button
            type="button"
            onClick={() => handleChooseQuiz('A')}
            className={`text-left p-5 rounded-3xl border-4 transition-all active:scale-95 ${
              selectedPromptChoice === 'A'
                ? 'bg-amber-100 border-amber-500 animate-wiggle'
                : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="inline-block bg-slate-700 text-white font-display font-bold text-xs px-3 py-1 rounded-full mb-2">
              Prompt A
            </div>
            <p className="font-display font-bold text-xl text-slate-900">
              « Dessine un animal. »
            </p>
            <p className="text-xs font-bold text-slate-500 mt-2">
              (Seulement 3 mots…)
            </p>
          </button>

          {/* Prompt B */}
          <button
            type="button"
            onClick={() => handleChooseQuiz('B')}
            className={`text-left p-5 rounded-3xl border-4 transition-all active:scale-95 ${
              selectedPromptChoice === 'B' || quizDone
                ? 'bg-emerald-100 border-emerald-500 shadow-md scale-[1.01]'
                : 'bg-slate-50 hover:bg-emerald-50/60 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="inline-block bg-emerald-600 text-white font-display font-bold text-xs px-3 py-1 rounded-full mb-2">
              Prompt B
            </div>
            <p className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-snug">
              « Dessine une petite grenouille verte souriante, avec un sac rouge, devant une école, dans un style cartoon coloré. »
            </p>
            <p className="text-xs font-bold text-emerald-800 mt-2">
              (Personnage + détails + lieu + style !)
            </p>
          </button>
        </div>

        {selectedPromptChoice === 'A' && (
          <div className="bg-amber-100 border-2 border-amber-400 rounded-2xl p-4 text-amber-950 flex items-start gap-3 animate-pop">
            <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-display font-bold text-base">
                Indice : « Dessine un animal » est très vague !
              </div>
              <p className="font-bold text-sm mt-1">
                L’IA ne saura pas quel animal tu veux (un lion ? un poisson ? une grenouille ?), ni où il se trouve. Regarde le Prompt B !
              </p>
            </div>
          </div>
        )}

        {(selectedPromptChoice === 'B' || quizDone) && (
          <div className="bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 sm:p-5 text-emerald-950 flex items-start gap-3 animate-pop">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-display font-bold text-lg">
                Bravo ! La bonne réponse est le Prompt B !
              </div>
              <p className="font-bold text-sm sm:text-base mt-1">
                « Plus tu précises ton idée, plus l’IA dispose d’indications pour essayer de réaliser ce que tu souhaites. Mais elle peut se tromper. »
              </p>
            </div>
          </div>
        )}
      </section>

      {/* PARTIE 2 : Construis ton prompt */}
      <section className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-sky-300 shadow-lg space-y-5">
        <div>
          <span className="inline-block bg-sky-100 text-sky-900 font-display font-bold text-sm px-4 py-1 rounded-full mb-2">
            Partie 2 · Atelier magique de Prompts
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-sky-600" />
            <span>Construis ton propre prompt étape par étape !</span>
          </h2>
          <p className="text-sm font-bold text-slate-600 mt-1">
            Clique sur tes choix ci-dessous et regarde ta phrase se construire toute seule :
          </p>
        </div>

        {/* 1. Personnage */}
        <div>
          <label className="block font-display font-bold text-sm text-slate-800 mb-2">
            1. Choisis un personnage :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PROMPT_BUILDER_OPTIONS.personnages.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setPerso(item);
                  setBuilderInteracted(true);
                  onComplete();
                }}
                className={`p-3 rounded-2xl border-2 font-display font-bold text-sm transition-all ${
                  perso.id === item.id
                    ? 'bg-sky-600 text-white border-sky-800 shadow scale-[1.02]'
                    : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Action */}
        <div>
          <label className="block font-display font-bold text-sm text-slate-800 mb-2">
            2. Choisis une action :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PROMPT_BUILDER_OPTIONS.actions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAction(item);
                  setBuilderInteracted(true);
                  onComplete();
                }}
                className={`p-3 rounded-2xl border-2 font-display font-bold text-sm transition-all ${
                  action.id === item.id
                    ? 'bg-emerald-600 text-white border-emerald-800 shadow scale-[1.02]'
                    : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Lieu */}
        <div>
          <label className="block font-display font-bold text-sm text-slate-800 mb-2">
            3. Choisis un lieu :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PROMPT_BUILDER_OPTIONS.lieux.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setLieu(item);
                  setBuilderInteracted(true);
                  onComplete();
                }}
                className={`p-3 rounded-2xl border-2 font-display font-bold text-sm transition-all ${
                  lieu.id === item.id
                    ? 'bg-amber-500 text-slate-950 border-amber-700 shadow scale-[1.02]'
                    : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Ambiance */}
        <div>
          <label className="block font-display font-bold text-sm text-slate-800 mb-2">
            4. Choisis une ambiance :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PROMPT_BUILDER_OPTIONS.ambiances.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAmbiance(item);
                  setBuilderInteracted(true);
                  onComplete();
                }}
                className={`p-3 rounded-2xl border-2 font-display font-bold text-sm transition-all ${
                  ambiance.id === item.id
                    ? 'bg-purple-600 text-white border-purple-800 shadow scale-[1.02]'
                    : 'bg-slate-50 hover:bg-purple-50 text-slate-800 border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Style */}
        <div>
          <label className="block font-display font-bold text-sm text-slate-800 mb-2">
            5. Choisis un style artistique :
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PROMPT_BUILDER_OPTIONS.styles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setStyle(item);
                  setBuilderInteracted(true);
                  onComplete();
                }}
                className={`p-3 rounded-2xl border-2 font-display font-bold text-sm transition-all ${
                  style.id === item.id
                    ? 'bg-rose-500 text-white border-rose-700 shadow scale-[1.02]'
                    : 'bg-slate-50 hover:bg-rose-50 text-slate-800 border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Champ facultatif : Ajoute ton idée */}
        <div>
          <label
            htmlFor="extra-idea-input"
            className="block font-display font-bold text-sm text-slate-800 mb-1.5"
          >
            6. Ajoute ton idée (facultatif) :
          </label>
          <input
            id="extra-idea-input"
            type="text"
            value={extraIdea}
            onChange={(e) => setExtraIdea(e.target.value)}
            placeholder="Ex : avec un chapeau jaune et un arc-en-ciel"
            className="w-full px-4 py-3 rounded-2xl border-2 border-sky-200 focus:border-sky-500 focus:outline-none font-bold text-slate-900 bg-sky-50/40"
          />
        </div>

        {/* Rappel de sécurité avant copie */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 flex items-center gap-3 text-amber-950 text-xs sm:text-sm font-bold">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            Rappel sécurité : vérifie toujours que ton prompt ne contient ni ton vrai nom, ni ton adresse, ni aucune information personnelle avant de le copier !
          </span>
        </div>

        {/* Résultat du prompt construit */}
        <div className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 border-4 border-sky-400 shadow-inner">
          <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-2">
            ✨ Ton Super Prompt prêt à l’emploi :
          </div>
          <p className="font-display font-bold text-lg sm:text-xl leading-relaxed text-sky-50 mb-4">
            « {builtPrompt} »
          </p>
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold text-base shadow-md transition-transform active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-emerald-800" />
                <span>Prompt copié dans le presse-papiers !</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copier mon prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Message final d'encouragement */}
        {(quizDone || builderInteracted) && (
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌟</span>
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-emerald-700">
                  <Sparkles className="w-3.5 h-3.5" /> Badge 4 débloqué !
                </span>
                <p className="font-display font-bold text-base sm:text-lg text-emerald-950">
                  « Bravo ! Tu sais maintenant donner des instructions à une intelligence artificielle ! »
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onComplete();
                sound.playFanfare();
                onNext();
              }}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>Défi 5 : Crée ta mini-BD</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au Défi 3</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onComplete();
              onNext();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-sm"
          >
            <span>Passer au Défi 5</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
