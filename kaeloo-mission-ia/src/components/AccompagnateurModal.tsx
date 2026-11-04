import React from 'react';
import { X, CheckSquare, Square, ShieldAlert, Sparkles, Clock, Users, BookOpen } from 'lucide-react';
import { MentorChecklist } from '../types/mission';

interface AccompagnateurModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklist: MentorChecklist;
  onChangeChecklist: (updated: MentorChecklist) => void;
}

export const AccompagnateurModal: React.FC<AccompagnateurModalProps> = ({
  isOpen,
  onClose,
  checklist,
  onChangeChecklist,
}) => {
  if (!isOpen) return null;

  const toggleItem = (key: keyof MentorChecklist) => {
    onChangeChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const items: { key: keyof MentorChecklist; label: string }[] = [
    { key: 'humanVsMachine', label: 'L’enfant différencie humain et machine.' },
    { key: 'fiveFamilies', label: 'L’enfant reconnaît les cinq familles d’IA (Texte, Image, Audio, Voix, Vidéo).' },
    { key: 'sensitiveData', label: 'L’enfant identifie des données sensibles et personnelles à ne pas partager.' },
    { key: 'promptFormulation', label: 'L’enfant sait formuler un prompt précis.' },
    { key: 'personalContribution', label: 'L’enfant peut expliquer sa contribution personnelle dans sa création.' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mentor-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-4 border-sky-400 shadow-2xl max-h-[90vh] overflow-y-auto animate-pop">
        <div className="flex items-center justify-between gap-4 border-b-2 border-slate-100 pb-4 mb-5">
          <div>
            <span className="inline-block bg-sky-100 text-sky-800 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-1">
              Guide pédagogique · Sans connexion
            </span>
            <h2 id="mentor-modal-title" className="font-display font-bold text-2xl text-slate-900">
              👨‍🏫 Espace Accompagnateur
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
            aria-label="Fermer l'espace accompagnateur"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-5 text-sm sm:text-base text-slate-700">
          {/* Infos clés */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 flex items-center gap-3">
              <Users className="w-6 h-6 text-sky-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-sky-800 uppercase">Public cible</div>
                <div className="font-extrabold text-slate-900">Enfants 7 à 12 ans</div>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-3">
              <Clock className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase">Durée prévue</div>
                <div className="font-extrabold text-slate-900">20 à 30 minutes</div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-amber-800 uppercase">Date de séance</div>
                <div className="font-extrabold text-slate-900">8 novembre 2026</div>
              </div>
            </div>
          </div>

          {/* Objectifs pédagogiques */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Objectifs & Déroulement des 5 défis
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-700">
              <li>
                <strong>Défi 1 (Humain ou machine) :</strong> Distinguer la vitesse de calcul et d’automatisation de la machine face aux émotions, au jugement et à la responsabilité humaine.
              </li>
              <li>
                <strong>Défi 2 (Le bon outil) :</strong> Associer un besoin créatif à la bonne famille d’IA (Texte, Image, Audio, Voix, Vidéo).
              </li>
              <li>
                <strong>Défi 3 (Boucliers de sécurité) :</strong> Protéger ses informations personnelles, respecter la vie privée d’autrui et vérifier les réponses.
              </li>
              <li>
                <strong>Défi 4 (Le pouvoir des prompts) :</strong> Comprendre l’intérêt d’une consigne précise et construire un prompt complet.
              </li>
              <li>
                <strong>Défi 5 (Mini-aventure illustrée) :</strong> Créer une BD en 3 scènes (Début, Problème, Solution) où l’enfant reste l’auteur principal.
              </li>
            </ul>
          </div>

          {/* Comment accompagner sans répondre à leur place */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <h3 className="font-display font-bold text-lg text-amber-950 mb-1.5">
              💡 Comment accompagner l’enfant sans répondre à sa place ?
            </h3>
            <p className="text-amber-900">
              Posez des questions ouvertes : <em>« Pourquoi penses-tu que c’est une force humaine ? »</em>, <em>« Si tu dis seulement "dessine un animal", que va oublier la machine ? »</em>. Laissez l’enfant essayer et se tromper : chaque erreur affiche un indice bienveillant !
            </p>
          </div>

          {/* Règles de confidentialité */}
          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-base text-rose-950">
                Protection des données personnelles (100 % local)
              </h3>
              <p className="text-rose-900 text-sm">
                Ce site fonctionne sans base de données, sans serveur et sans suivi. Aucune donnée personnelle ni image n’est transmise sur Internet : tout reste en mémoire pendant la session et s’efface à la fermeture.
              </p>
            </div>
          </div>

          {/* Grille de vérification interactive */}
          <div className="bg-emerald-50/70 rounded-2xl p-4 border-2 border-emerald-300">
            <h3 className="font-display font-bold text-lg text-emerald-950 mb-3">
              ✅ Grille d’observation (locale au navigateur)
            </h3>
            <div className="space-y-2.5">
              {items.map((it) => {
                const checked = checklist[it.key];
                return (
                  <button
                    key={it.key}
                    type="button"
                    onClick={() => toggleItem(it.key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left font-bold transition-all ${
                      checked
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <span>{it.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-base shadow-md"
          >
            Fermer le guide
          </button>
        </div>
      </div>
    </div>
  );
};
