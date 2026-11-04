import React from 'react';
import { Play, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroCartoonBanner, CharacterAvatar } from '../assets/CartoonIllustrations';
import { INTRO_DIALOGUES } from '../data/missionData';
import { sound } from '../utils/sound';

interface HomeScreenProps {
  onStartMission: () => void;
  onOpenMentor: () => void;
  completedChallenges: Record<number, boolean>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartMission,
  onOpenMentor,
  completedChallenges,
}) => {
  const completedCount = Object.values(completedChallenges).filter(Boolean).length;

  return (
    <div className="space-y-6 animate-pop">
      {/* Carte Héro principale spectaculaire et lumineuse */}
      <section className="bg-gradient-to-b from-white via-sky-50 to-amber-50 rounded-3xl p-5 sm:p-8 border-4 border-sky-300 shadow-lg text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-400 text-amber-900 font-display font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>« Réfléchis, protège-toi et crée avec l’intelligence artificielle ! »</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-5xl text-sky-950 tracking-tight mb-2">
          KAELOO <span className="text-sky-600">— MISSION IA</span>
        </h1>

        <p className="text-base sm:text-xl font-extrabold text-emerald-800 max-w-2xl mx-auto mb-5">
          5 défis pour devenir un petit expert de l’intelligence artificielle !
        </p>

        {/* Grande illustration cartoon originale */}
        <div className="max-w-2xl mx-auto mb-6">
          <HeroCartoonBanner />
        </div>

        {/* Indication durée + Bouton principal */}
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-white/90 border-2 border-sky-200 px-4 py-1.5 rounded-full text-sm font-extrabold text-sky-900">
            <Clock className="w-4 h-4 text-sky-600" />
            <span>Durée : environ 25 minutes</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playFanfare();
              onStartMission();
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-3xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-display font-bold text-xl sm:text-2xl shadow-xl hover:shadow-2xl border-b-4 border-emerald-700 active:translate-y-0.5 transition-all"
          >
            <Play className="w-7 h-7 fill-white group-hover:scale-110 transition-transform" />
            <span>{completedCount > 0 ? 'Reprendre l’aventure' : 'Commencer l’aventure'}</span>
          </button>

          {/* Message de sécurité important avant de commencer */}
          <div className="max-w-xl bg-amber-100/90 border-2 border-amber-400 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-left shadow-sm mt-1">
            <span className="text-2xl sm:text-3xl shrink-0">🛡️</span>
            <p className="text-xs sm:text-sm font-extrabold text-amber-950 leading-snug">
              Tu peux jouer avec un adulte pour t’accompagner. N’écris jamais ton vrai nom, ton adresse ou ton numéro de téléphone.
            </p>
          </div>
        </div>
      </section>

      {/* L'histoire du village : Dialogues de lancement */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-emerald-300 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
            <span>📖</span> Une mystérieuse machine arrive au village…
          </h2>
          <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            Dimanche 8 novembre 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {INTRO_DIALOGUES.map((dlg, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 ${
                dlg.character === 'kaeloo'
                  ? 'bg-emerald-50 border-emerald-300'
                  : dlg.character === 'chat'
                  ? 'bg-amber-50 border-amber-300'
                  : 'bg-sky-50 border-sky-300'
              }`}
            >
              <CharacterAvatar character={dlg.character} size={56} />
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-0.5">
                  {dlg.speaker}
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {dlg.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aperçu des 5 défis et badges à gagner */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-purple-200 shadow-md">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mb-4 text-center">
          🏅 Tes 5 missions pour gagner ton diplôme
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { num: 1, icon: '🧠', title: 'Défi 1', desc: 'Humain ou machine ?' },
            { num: 2, icon: '🧰', title: 'Défi 2', desc: 'Le bon outil' },
            { num: 3, icon: '🛡️', title: 'Défi 3', desc: 'Les boucliers' },
            { num: 4, icon: '✨', title: 'Défi 4', desc: 'Super Prompts' },
            { num: 5, icon: '🎨', title: 'Défi 5', desc: 'Ta mini-BD' },
          ].map((item) => {
            const done = completedChallenges[item.num];
            return (
              <div
                key={item.num}
                className={`rounded-2xl p-3.5 text-center border-2 transition-all ${
                  done
                    ? 'bg-emerald-50 border-emerald-400'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-3xl mb-1">{done ? '🌟' : item.icon}</div>
                <div className="font-display font-bold text-sm text-slate-900">
                  {item.title}
                </div>
                <div className="text-xs font-bold text-slate-600">{item.desc}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={onOpenMentor}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-sky-700 underline underline-offset-4"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Espace accompagnateur (consignes adultes & grille d’observation)</span>
          </button>
        </div>
      </section>
    </div>
  );
};
