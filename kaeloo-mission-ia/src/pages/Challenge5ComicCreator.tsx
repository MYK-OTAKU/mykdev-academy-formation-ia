import React, { useState } from 'react';
import {
  Wand2,
  Copy,
  Check,
  Upload,
  Download,
  RotateCcw,
  Edit3,
  Eye,
  Sparkles,
  ArrowLeft,
  Award,
  ShieldAlert,
} from 'lucide-react';
import { ADVENTURE_PRESETS, ILLUSTRATION_LIBRARY } from '../data/missionData';
import { ComicScene, ReflectionAnswers } from '../types/mission';
import { CharacterBubble } from '../components/CharacterBubble';
import { SceneIllustration } from '../assets/CartoonIllustrations';
import { exportComicStripPng } from '../utils/exportPng';
import { sound } from '../utils/sound';

interface Challenge5Props {
  selectedAdventureId: string;
  onSelectAdventureId: (id: string) => void;
  customAdventureIdea: string;
  onChangeCustomIdea: (val: string) => void;
  comicTitle: string;
  onChangeComicTitle: (val: string) => void;
  scenes: ComicScene[];
  onChangeScenes: React.Dispatch<React.SetStateAction<ComicScene[]>>;
  reflection: ReflectionAnswers;
  onChangeReflection: React.Dispatch<React.SetStateAction<ReflectionAnswers>>;
  onComplete: () => void;
  onBack: () => void;
  onFinishMission: () => void;
}

export const Challenge5ComicCreator: React.FC<Challenge5Props> = ({
  selectedAdventureId,
  onSelectAdventureId,
  customAdventureIdea,
  onChangeCustomIdea,
  comicTitle,
  onChangeComicTitle,
  scenes,
  onChangeScenes,
  reflection,
  onChangeReflection,
  onComplete,
  onBack,
  onFinishMission,
}) => {
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [copiedSceneIdx, setCopiedSceneIdx] = useState<number | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleChoosePreset = (presetId: string) => {
    sound.playClick();
    onSelectAdventureId(presetId);
    const found = ADVENTURE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      onChangeComicTitle(found.defaultComicTitle);
      onChangeScenes((prev) =>
        prev.map((sc, i) => ({
          ...sc,
          illustrationId: found.defaultScenes[i].illustrationId,
          description: found.defaultScenes[i].description,
          dialogue: found.defaultScenes[i].dialogue,
          customImageDataUrl: undefined,
        }))
      );
    }
  };

  const updateScene = (idx: number, patch: Partial<ComicScene>) => {
    onChangeScenes((prev) =>
      prev.map((sc, i) => (i === idx ? { ...sc, ...patch } : sc))
    );
  };

  const buildScenePrompt = (idx: number) => {
    sound.playClick();
    const sc = scenes[idx];
    const autoPrompt = `Illustration style dessin animé coloré pour enfants : ${
      sc.description || sc.stepTitle
    }. Ambiance joyeuse et expressive, sans texte personnel.`;
    updateScene(idx, { generatedPrompt: autoPrompt });
  };

  const copyScenePrompt = (idx: number) => {
    const sc = scenes[idx];
    const promptToCopy =
      sc.generatedPrompt ||
      `Illustration style dessin animé coloré : ${sc.description}`;
    navigator.clipboard?.writeText(promptToCopy);
    sound.playSuccess();
    setCopiedSceneIdx(idx);
    setTimeout(() => setCopiedSceneIdx(null), 2200);
  };

  const handleLocalImageUpload = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateScene(idx, { customImageDataUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadComic = async () => {
    setDownloading(true);
    sound.playSuccess();
    try {
      await exportComicStripPng(comicTitle, scenes);
      onComplete();
    } finally {
      setDownloading(false);
    }
  };

  const handleResetComic = () => {
    sound.playClick();
    handleChoosePreset(selectedAdventureId === 'custom' ? 'robot-perdu' : selectedAdventureId);
    setViewMode('edit');
  };

  return (
    <div className="space-y-6 animate-pop">
      <CharacterBubble character="kaeloo" speakerName="La grenouille">
        « Maintenant que tu connais l’IA, invente une aventure en trois images ! C’est toi le créateur de l’histoire. »
      </CharacterBubble>

      {/* ÉTAPE 1 : Choisir une aventure */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-emerald-300 shadow-md space-y-4">
        <span className="inline-block bg-emerald-100 text-emerald-900 font-display font-bold text-sm px-4 py-1 rounded-full">
          Étape 1 · Choisis ton aventure de départ
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {ADVENTURE_PRESETS.map((preset) => {
            const active = selectedAdventureId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleChoosePreset(preset.id)}
                className={`text-left p-4 rounded-2xl border-3 border-2 transition-all ${
                  active
                    ? 'bg-emerald-50 border-emerald-500 shadow-md scale-[1.01]'
                    : 'bg-slate-50 hover:bg-emerald-50/40 border-slate-200'
                }`}
              >
                <div className="font-display font-bold text-base text-slate-900 mb-1">
                  {preset.title}
                </div>
                <p className="text-xs font-bold text-slate-600 leading-snug">
                  {preset.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Option facultative : Inventer ma propre aventure */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectAdventureId('custom');
              onChangeComicTitle('Ma Super Aventure Imaginée');
            }}
            className={`px-4 py-2 rounded-xl border-2 font-display font-bold text-xs sm:text-sm transition-all ${
              selectedAdventureId === 'custom'
                ? 'bg-amber-400 text-slate-950 border-amber-600'
                : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
            }`}
          >
            ✨ Ou clique ici pour « Inventer ma propre aventure »
          </button>

          {selectedAdventureId === 'custom' && (
            <div className="mt-3">
              <input
                type="text"
                value={customAdventureIdea}
                onChange={(e) => onChangeCustomIdea(e.target.value)}
                placeholder="Résume ton idée d'aventure en une courte phrase (sans nom réel)..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 font-bold text-sm bg-amber-50/40"
              />
            </div>
          )}
        </div>

        {/* Titre personnalisé de la BD */}
        <div className="pt-2">
          <label
            htmlFor="comic-title-input"
            className="block font-display font-bold text-sm text-slate-800 mb-1"
          >
            Titre de ta bande dessinée (sans information personnelle) :
          </label>
          <input
            id="comic-title-input"
            type="text"
            value={comicTitle}
            onChange={(e) => onChangeComicTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-sky-200 font-display font-bold text-lg text-slate-900 bg-sky-50/30"
          />
        </div>
      </section>

      {/* ÉTAPES 2 & 3 : Construire les 3 scènes OU Voir la BD complète */}
      {viewMode === 'edit' ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
              🎨 Étapes 2 & 3 · Personnalise tes 3 scènes
            </h2>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewMode('preview');
                onComplete();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-sm shadow"
            >
              <Eye className="w-4 h-4" />
              <span>Voir ma bande dessinée</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {scenes.map((sc, idx) => (
              <div
                key={sc.stepNumber}
                className="bg-white rounded-3xl p-5 border-4 border-sky-200 shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-sky-600 text-white font-display font-bold text-xs px-3 py-1 rounded-full">
                      Image {sc.stepNumber} · {sc.stepTitle}
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-sky-900 bg-sky-50 px-3 py-2 rounded-xl border border-sky-100">
                    💡 {sc.stepPrompt}
                  </p>

                  {/* Aperçu de l'illustration choisie */}
                  <SceneIllustration
                    illustrationId={sc.illustrationId}
                    customImageDataUrl={sc.customImageDataUrl}
                  />

                  {/* Sélecteur dans la bibliothèque locale d'illustrations cartoon */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Choisis un dessin de la bibliothèque :
                    </label>
                    <select
                      value={sc.illustrationId}
                      onChange={(e) =>
                        updateScene(idx, {
                          illustrationId: e.target.value,
                          customImageDataUrl: undefined,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-bold text-xs sm:text-sm bg-slate-50 text-slate-900"
                    >
                      {ILLUSTRATION_LIBRARY.map((lib) => (
                        <option key={lib.id} value={lib.id}>
                          {lib.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description courte */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Courte description de la scène :
                    </label>
                    <textarea
                      rows={2}
                      value={sc.description}
                      onChange={(e) =>
                        updateScene(idx, { description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-bold text-xs sm:text-sm text-slate-900"
                      placeholder="Que se passe-t-il dans cette image ?"
                    />
                  </div>

                  {/* Dialogue */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Bulle de dialogue du personnage :
                    </label>
                    <input
                      type="text"
                      value={sc.dialogue}
                      onChange={(e) =>
                        updateScene(idx, { dialogue: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border-2 border-amber-200 bg-amber-50/40 font-bold text-xs sm:text-sm text-slate-900"
                      placeholder="Que dit ton personnage ?"
                    />
                  </div>
                </div>

                {/* Outils facultatifs : Générer/Copier prompt d'image + Charger illustration locale */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => buildScenePrompt(idx)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>Créer prompt</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => copyScenePrompt(idx)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-bold text-xs"
                    >
                      {copiedSceneIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  {sc.generatedPrompt && (
                    <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-[11px] font-bold text-purple-950">
                      Prompt : « {sc.generatedPrompt} »
                    </div>
                  )}

                  {/* Bouton facultatif pour charger une illustration depuis l'appareil (100% local) */}
                  <label className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Ajouter un dessin depuis l’appareil (facultatif)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLocalImageUpload(idx, e)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 flex items-center gap-3 text-xs sm:text-sm font-bold text-amber-950">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Important : l’ajout d’image reste uniquement dans ton navigateur (aucun envoi vers un serveur). N’utilise jamais de photo de toi ou de tes proches : uniquement des dessins de personnages et décors imaginaires !
            </span>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                sound.playFanfare();
                setViewMode('preview');
                onComplete();
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-display font-bold text-lg shadow-lg inline-flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              <span>Étape 4 : Voir ma bande dessinée complète !</span>
            </button>
          </div>
        </section>
      ) : (
        /* ÉTAPE 4 : Aperçu de la mini-BD en 3 cases + Téléchargement PNG */
        <section className="bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 rounded-3xl p-5 sm:p-8 border-4 border-sky-400 shadow-xl space-y-6 animate-pop">
          <div className="text-center">
            <span className="inline-block bg-amber-300 text-slate-950 font-display font-bold text-xs uppercase px-3 py-1 rounded-full mb-1">
              Étape 4 · Ta Bande Dessinée
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              {comicTitle || 'Ma Mini-Aventure IA'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {scenes.map((sc) => (
              <div
                key={sc.stepNumber}
                className="bg-white rounded-3xl p-4 border-4 border-sky-300 shadow-md flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="bg-sky-600 text-white font-display font-bold text-sm px-3 py-1.5 rounded-xl text-center mb-3">
                    Scène {sc.stepNumber} : {sc.stepTitle}
                  </div>
                  <SceneIllustration
                    illustrationId={sc.illustrationId}
                    customImageDataUrl={sc.customImageDataUrl}
                  />
                  {/* Bulle de dialogue */}
                  <div className="mt-3 bg-amber-100 border-2 border-amber-400 rounded-2xl p-3 text-center relative">
                    <p className="font-display font-bold text-sm text-amber-950">
                      « {sc.dialogue || '...'} »
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-700 text-center bg-slate-50 p-2.5 rounded-xl">
                  {sc.description}
                </p>
              </div>
            ))}
          </div>

          {/* Boutons : Modifier mon histoire / Télécharger ma BD / Recommencer */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-display font-bold text-sm shadow-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>Modifier mon histoire</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadComic}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-display font-bold text-base shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>{downloading ? 'Création de l’image…' : 'Télécharger ma BD (.PNG)'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetComic}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-900 border-2 border-rose-200 font-display font-bold text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Recommencer</span>
            </button>
          </div>
        </section>
      )}

      {/* ÉTAPE 5 : Réflexion finale */}
      <section className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-purple-300 shadow-lg space-y-5">
        <div>
          <span className="inline-block bg-purple-100 text-purple-900 font-display font-bold text-sm px-4 py-1 rounded-full mb-2">
            Étape 5 · Réflexion finale d’explorateur
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
            C’est toi le véritable auteur de ton aventure !
          </h3>
        </div>

        <div className="space-y-4">
          {/* Question 1 */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <label className="block font-display font-bold text-base text-slate-900 mb-2">
              1. Qu’est-ce que tu as imaginé toi-même ?
            </label>
            <select
              value={reflection.q1Choice}
              onChange={(e) =>
                onChangeReflection({ ...reflection, q1Choice: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-purple-200 bg-white font-bold text-sm text-slate-900"
            >
              <option value="Les idées, l’histoire et les dialogues des personnages">
                🌟 Les idées, l’histoire et les dialogues des personnages
              </option>
              <option value="La façon dont le héros résout le problème avec son intelligence">
                🧠 La façon dont le héros résout le problème avec son intelligence
              </option>
              <option value="Le choix des scènes et le message de la bande dessinée">
                🎬 Le choix des scènes et le message de la bande dessinée
              </option>
            </select>
          </div>

          {/* Question 2 */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <label className="block font-display font-bold text-base text-slate-900 mb-2">
              2. Comment une IA pourrait-elle t’aider à améliorer ton histoire ?
            </label>
            <select
              value={reflection.q2Choice}
              onChange={(e) =>
                onChangeReflection({ ...reflection, q2Choice: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-purple-200 bg-white font-bold text-sm text-slate-900"
            >
              <option value="M’aider à illustrer une scène ou trouver une idée supplémentaire">
                🎨 M’aider à illustrer une scène ou trouver une idée supplémentaire
              </option>
              <option value="Corriger les fautes ou proposer des synonymes rigolos">
                📖 Corriger les fautes ou proposer des synonymes rigolos
              </option>
              <option value="Transformer mes phrases en voix de narrateur avec un adulte">
                🎙️ Transformer mes phrases en voix de narrateur avec un adulte
              </option>
            </select>
          </div>

          {/* Question 3 */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <label className="block font-display font-bold text-base text-slate-900 mb-2">
              3. Quelles informations ne dois-tu jamais donner à une IA ?
            </label>
            <select
              value={reflection.q3Choice}
              onChange={(e) =>
                onChangeReflection({ ...reflection, q3Choice: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-purple-200 bg-white font-bold text-sm text-slate-900"
            >
              <option value="Mon vrai nom, mon adresse, mon téléphone, mes mots de passe et mes photos">
                🛡️ Mon vrai nom, mon adresse, mon téléphone, mes mots de passe et mes photos
              </option>
              <option value="Les secrets et les photos de mes camarades ou de ma famille">
                🔒 Les secrets et les photos de mes camarades ou de ma famille
              </option>
            </select>
          </div>

          {/* Petit champ de réponse facultatif */}
          <div>
            <label className="block font-display font-bold text-sm text-slate-700 mb-1">
              Un petit mot à ajouter sur ce que tu as préféré créer ? (facultatif)
            </label>
            <input
              type="text"
              value={reflection.customNote}
              onChange={(e) =>
                onChangeReflection({ ...reflection, customNote: e.target.value })
              }
              placeholder="Ex : J'ai adoré inventer la solution de la scène 3 !"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 font-bold text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au Défi 4</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onComplete();
              sound.playFanfare();
              onFinishMission();
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-display font-bold text-lg shadow-xl flex items-center gap-2"
          >
            <Award className="w-6 h-6" />
            <span>Obtenir mon Diplôme d’Explorateur IA !</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};
