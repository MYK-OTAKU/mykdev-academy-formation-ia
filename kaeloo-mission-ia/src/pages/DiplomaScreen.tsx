import React from 'react';
import { Download, RotateCcw, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { CharacterAvatar } from '../assets/CartoonIllustrations';
import { exportDiplomaPng } from '../utils/exportPng';
import { sound } from '../utils/sound';

interface DiplomaScreenProps {
  nickname: string;
  onChangeNickname: (val: string) => void;
  onReplay: () => void;
}

const LEARNED_SKILLS = [
  'Je comprends la différence entre humains et machines.',
  'Je connais les différentes familles d’outils d’IA.',
  'Je protège mes informations personnelles.',
  'Je sais écrire un prompt précis.',
  'Je peux inventer une histoire et utiliser l’IA comme assistant.',
];

export const DiplomaScreen: React.FC<DiplomaScreenProps> = ({
  nickname,
  onChangeNickname,
  onReplay,
}) => {
  const handleDownloadDiploma = () => {
    sound.playFanfare();
    exportDiplomaPng(nickname);
  };

  return (
    <div className="space-y-6 animate-pop">
      {/* Bannière de célébration avec étoiles et confettis visuels */}
      <section className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl text-center relative overflow-hidden">
        <div className="text-3xl sm:text-4xl mb-2 tracking-widest select-none">
          🎉 ⭐ 🌟 🏆 🌟 ⭐ 🎉
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl tracking-tight mb-2">
          FÉLICITATIONS ! TU AS RÉUSSI TA MISSION IA !
        </h1>
        <p className="font-bold text-base sm:text-lg text-emerald-50 max-w-2xl mx-auto">
          « J’ai compris comment utiliser l’IA, et maintenant je sais aussi comment me protéger ! »
        </p>
      </section>

      {/* Personnalisation facultative par surnom fictif (sans nom réel) */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-sky-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <label
            htmlFor="nickname-input"
            className="block font-display font-bold text-base text-slate-900"
          >
            Surnom fictif d’explorateur sur le diplôme (facultatif) :
          </label>
          <p className="text-xs font-bold text-slate-500">
            🔒 Sécurité : n’écris pas ton vrai nom ! Laisse « Petit Explorateur » ou choisis un surnom rigolo.
          </p>
        </div>
        <input
          id="nickname-input"
          type="text"
          maxLength={28}
          value={nickname}
          onChange={(e) => onChangeNickname(e.target.value)}
          placeholder="Petit Explorateur"
          className="w-full sm:w-64 px-4 py-2.5 rounded-2xl border-2 border-amber-400 bg-amber-50/50 font-display font-bold text-base text-slate-900 text-center"
        />
      </section>

      {/* DIPLÔME NUMÉRIQUE AU FORMAT PAYSAGE */}
      <section
        aria-label="Diplôme du Petit Explorateur de l'IA"
        className="bg-gradient-to-br from-amber-50 via-white to-sky-50 rounded-3xl p-3 sm:p-5 border-8 border-amber-400 shadow-2xl"
      >
        <div className="border-4 border-sky-500 rounded-2xl p-5 sm:p-8 bg-white/90 relative">
          {/* Mascottes et en-tête */}
          <div className="flex items-center justify-between gap-4 flex-wrap border-b-2 border-amber-200 pb-4 mb-5">
            <CharacterAvatar character="kaeloo" size={62} />
            <div className="text-center flex-1">
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-sky-700 mb-1">
                KAELOO — MISSION IA
              </div>
              <h2 className="font-display font-bold text-xl sm:text-3xl text-slate-950 leading-tight">
                DIPLÔME DU PETIT EXPLORATEUR DE L’INTELLIGENCE ARTIFICIELLE
              </h2>
            </div>
            <CharacterAvatar character="superia" size={62} />
          </div>

          {/* Surnom et Texte officiel */}
          <div className="text-center my-4">
            <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-400 px-6 py-2 rounded-full font-display font-bold text-xl sm:text-2xl text-amber-950 shadow-sm mb-3">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{nickname.trim() || 'Petit Explorateur'}</span>
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <p className="font-bold text-base sm:text-lg text-slate-700">
              « Ce diplôme récompense la réussite des cinq défis de la Mission IA. »
            </p>
          </div>

          {/* Les 5 compétences découvertes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-5 max-w-3xl mx-auto">
            {LEARNED_SKILLS.map((skill, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2.5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 font-bold text-xs sm:text-sm text-emerald-950 ${
                  idx === 4 ? 'sm:col-span-2' : ''
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          {/* Pied du diplôme : Date 8 novembre 2026 & Sceau */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-100 text-sm font-extrabold text-slate-700">
            <div>📅 Date : 8 novembre 2026</div>
            <div className="flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full font-display font-bold shadow">
              <Award className="w-5 h-5" />
              <span>5 / 5 Défis Réussis</span>
            </div>
            <div className="text-sky-800">
              « Réfléchis, protège-toi et crée avec l’IA ! »
            </div>
          </div>
        </div>
      </section>

      {/* Actions finales : Télécharger mon diplôme (PNG) & Rejouer */}
      <div className="flex flex-wrap items-center justify-center gap-4 pb-6">
        <button
          type="button"
          onClick={handleDownloadDiploma}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-display font-bold text-lg sm:text-xl shadow-xl transition-transform active:scale-95"
        >
          <Download className="w-6 h-6" />
          <span>Télécharger mon diplôme (.PNG)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onReplay();
          }}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-display font-bold text-base shadow-sm"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Rejouer</span>
        </button>
      </div>
    </div>
  );
};
