import React from 'react';
import { Volume2, VolumeX, ShieldCheck, Sparkles, Award, Home } from 'lucide-react';
import { ScreenId } from '../types/mission';

interface HeaderBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  completedChallenges: Record<number, boolean>;
  soundMuted: boolean;
  onToggleSound: () => void;
  onOpenMentor: () => void;
}

const STEPS: { id: ScreenId; label: string; shortLabel: string; badgeIcon: string; num?: number }[] = [
  { id: 'home', label: 'Accueil', shortLabel: 'Accueil', badgeIcon: '🏠' },
  { id: 'defi1', label: 'Défi 1 · Humain/Machine', shortLabel: 'Défi 1', badgeIcon: '🧠', num: 1 },
  { id: 'defi2', label: 'Défi 2 · Bons outils', shortLabel: 'Défi 2', badgeIcon: '🧰', num: 2 },
  { id: 'defi3', label: 'Défi 3 · Boucliers', shortLabel: 'Défi 3', badgeIcon: '🛡️', num: 3 },
  { id: 'defi4', label: 'Défi 4 · Prompts', shortLabel: 'Défi 4', badgeIcon: '✨', num: 4 },
  { id: 'defi5', label: 'Défi 5 · Ma BD', shortLabel: 'Défi 5', badgeIcon: '🎨', num: 5 },
  { id: 'diploma', label: 'Diplôme', shortLabel: 'Diplôme', badgeIcon: '🏆' },
];

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentScreen,
  onSelectScreen,
  completedChallenges,
  soundMuted,
  onToggleSound,
  onOpenMentor,
}) => {
  const completedCount = Object.values(completedChallenges).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-4 border-sky-300 shadow-sm">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5">
        {/* Ligne supérieure : Marque, Progression des badges, Son & Accompagnateur */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onSelectScreen('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
              🐸
            </span>
            <div>
              <span className="font-display font-bold text-lg sm:text-xl text-sky-950 tracking-tight block leading-none">
                KAELOO <span className="text-sky-600">— MISSION IA</span>
              </span>
              <span className="text-xs font-bold text-emerald-700 hidden sm:inline">
                Réfléchis, protège-toi et crée avec l’IA !
              </span>
            </div>
          </button>

          {/* Barre de progression et Badges gagnés */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 bg-sky-50 border-2 border-sky-200 rounded-full px-3 py-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-extrabold text-sky-900">
                Badges : {completedCount} / 5
              </span>
              <div className="w-20 h-2.5 bg-sky-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Bouton Activer/Désactiver les sons */}
            <button
              type="button"
              onClick={onToggleSound}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all ${
                soundMuted
                  ? 'bg-slate-100 border-slate-300 text-slate-600'
                  : 'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200'
              }`}
              title={soundMuted ? 'Activer les sons' : 'Désactiver les sons'}
              aria-label={soundMuted ? 'Activer les sons' : 'Désactiver les sons'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundMuted ? 'Son coupé' : 'Son actif'}</span>
            </button>

            {/* Bouton discret Espace Accompagnateur */}
            <button
              type="button"
              onClick={onOpenMentor}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 text-slate-600 hover:text-sky-900 font-bold text-xs transition-all"
              title="Espace accompagnateur (Guide pédagogique & grille d'observation)"
            >
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span className="hidden sm:inline">Espace accompagnateur</span>
            </button>
          </div>
        </div>

        {/* Navigation par étapes (boutons larges adaptés au tactile) */}
        <nav
          aria-label="Étapes de la mission"
          className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-1 no-scrollbar"
        >
          {STEPS.map((st) => {
            const isActive = currentScreen === st.id;
            const isDone = st.num ? completedChallenges[st.num] : false;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectScreen(st.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-bold text-xs sm:text-sm whitespace-nowrap transition-all shrink-0 border-2 ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-700 shadow-sm scale-[1.02]'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-400 hover:bg-emerald-100'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                <span>{isDone ? '✅' : st.badgeIcon}</span>
                <span className="hidden sm:inline">{st.label}</span>
                <span className="sm:hidden">{st.shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
