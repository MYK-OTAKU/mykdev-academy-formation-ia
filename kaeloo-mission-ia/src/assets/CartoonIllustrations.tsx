import React from 'react';
import { CharacterId } from '../types/mission';

export const CharacterAvatar: React.FC<{
  character: CharacterId;
  size?: number;
  className?: string;
}> = ({ character, size = 64, className = '' }) => {
  if (character === 'kaeloo') {
    // Petite grenouille verte curieuse et souriante (mascotte cartoon originale)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={`shrink-0 drop-shadow-sm ${className}`}
        aria-label="Mascotte Grenouille curieuse"
      >
        <circle cx="50" cy="52" r="44" fill="#DCFCE7" stroke="#22C55E" strokeWidth="3" />
        {/* Yeux de grenouille sur le haut */}
        <circle cx="33" cy="28" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
        <circle cx="67" cy="28" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
        <circle cx="33" cy="28" r="9" fill="#FFFFFF" />
        <circle cx="67" cy="28" r="9" fill="#FFFFFF" />
        <circle cx="35" cy="27" r="5" fill="#0F172A" />
        <circle cx="65" cy="27" r="5" fill="#0F172A" />
        <circle cx="37" cy="25" r="2" fill="#FFFFFF" />
        <circle cx="67" cy="25" r="2" fill="#FFFFFF" />
        {/* Tête verte */}
        <ellipse cx="50" cy="58" rx="34" ry="26" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
        {/* Ventre/Menton clair */}
        <ellipse cx="50" cy="67" rx="22" ry="13" fill="#BBF7D0" />
        {/* Joues roses */}
        <ellipse cx="25" cy="57" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
        <ellipse cx="75" cy="57" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
        {/* Grand sourire curieux */}
        <path
          d="M 33 56 Q 50 72 67 56"
          fill="none"
          stroke="#14532D"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Petite couronne/feuille d'exploratrice */}
        <path d="M 48 32 Q 55 20 62 29 Q 53 33 48 32 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
      </svg>
    );
  }

  if (character === 'chat') {
    // Chat malicieux orange/tigré (mascotte cartoon originale)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={`shrink-0 drop-shadow-sm ${className}`}
        aria-label="Mascotte Chat malicieux"
      >
        <circle cx="50" cy="52" r="44" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3" />
        {/* Oreilles pointues */}
        <polygon points="20,42 26,16 44,32" fill="#FB923C" stroke="#9A3412" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="80,42 74,16 56,32" fill="#FB923C" stroke="#9A3412" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="25,38 28,22 39,32" fill="#FDE68A" />
        <polygon points="75,38 72,22 61,32" fill="#FDE68A" />
        {/* Tête */}
        <ellipse cx="50" cy="58" rx="32" ry="27" fill="#FB923C" stroke="#9A3412" strokeWidth="3" />
        {/* Rayures front */}
        <path d="M 46 34 L 50 42 L 54 34" fill="none" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
        {/* Yeux malicieux */}
        <ellipse cx="37" cy="52" rx="7" ry="8" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.5" />
        <ellipse cx="63" cy="52" rx="7" ry="8" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.5" />
        <circle cx="38" cy="53" r="4" fill="#0F172A" />
        <circle cx="62" cy="53" r="4" fill="#0F172A" />
        {/* Sourcils espiègles */}
        <path d="M 29 42 Q 37 46 43 44" fill="none" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 71 42 Q 63 46 57 44" fill="none" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
        {/* Museau et sourire en coin */}
        <polygon points="46,60 54,60 50,65" fill="#F43F5E" />
        <path d="M 40 68 Q 50 73 62 65" fill="none" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
        {/* Moustaches */}
        <line x1="14" y1="58" x2="27" y2="60" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="14" y1="65" x2="27" y2="64" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="86" y1="58" x2="73" y2="60" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="86" y1="65" x2="73" y2="64" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  // Super IA : Petit robot sympathique bleu/doré
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-label="Mascotte Super IA le petit robot"
    >
      <circle cx="50" cy="52" r="44" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
      {/* Antenne lumineuse */}
      <line x1="50" y1="14" x2="50" y2="27" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="12" r="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
      {/* Oreilles robot */}
      <rect x="14" y="45" width="8" height="18" rx="4" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
      <rect x="78" y="45" width="8" height="18" rx="4" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
      {/* Tête de robot */}
      <rect x="22" y="27" width="56" height="50" rx="16" fill="#FFFFFF" stroke="#0369A1" strokeWidth="3" />
      {/* Écran facial */}
      <rect x="29" y="35" width="42" height="26" rx="9" fill="#0F172A" />
      {/* Yeux numériques souriants */}
      <circle cx="40" cy="48" r="5" fill="#38BDF8" />
      <circle cx="60" cy="48" r="5" fill="#38BDF8" />
      <circle cx="41.5" cy="46.5" r="2" fill="#FFFFFF" />
      <circle cx="61.5" cy="46.5" r="2" fill="#FFFFFF" />
      {/* Bouche souriante */}
      <path d="M 41 68 Q 50 74 59 68" fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// Grande illustration d'accueil spectaculaire et légère
export const HeroCartoonBanner: React.FC = () => (
  <svg
    viewBox="0 0 680 320"
    className="w-full h-auto max-h-72 drop-shadow-md select-none"
    role="img"
    aria-label="Kaeloo la grenouille curieuse, le chat malicieux et le petit robot Super IA dans un village coloré"
  >
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#FEF9C3" />
      </linearGradient>
      <linearGradient id="hillGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#86EFAC" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>
      <linearGradient id="hillGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
    </defs>

    {/* Fond ciel joyeux */}
    <rect x="0" y="0" width="680" height="320" rx="28" fill="url(#skyGrad)" />

    {/* Soleil souriant et nuages doux */}
    <circle cx="95" cy="68" r="34" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
    <g fill="#FFFFFF" opacity="0.9">
      <ellipse cx="220" cy="58" rx="34" ry="18" />
      <ellipse cx="242" cy="52" rx="26" ry="20" />
      <ellipse cx="540" cy="65" rx="38" ry="19" />
      <ellipse cx="566" cy="58" rx="26" ry="18" />
    </g>

    {/* Bulles et étoiles éducatives flottantes */}
    <g>
      <circle cx="155" cy="115" r="22" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2.5" />
      <text x="155" y="123" textAnchor="middle" fontSize="20">💡</text>

      <circle cx="340" cy="55" r="24" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.5" />
      <text x="340" y="63" textAnchor="middle" fontSize="21">🛡️</text>

      <circle cx="485" cy="108" r="22" fill="#FFFFFF" stroke="#A855F7" strokeWidth="2.5" />
      <text x="485" y="116" textAnchor="middle" fontSize="20">🎨</text>

      <text x="68" y="155" fontSize="22">⭐</text>
      <text x="615" y="135" fontSize="24">✨</text>
      <text x="415" y="92" fontSize="19">🌟</text>
    </g>

    {/* Collines verdoyantes du village */}
    <path d="M 0 235 Q 190 175 390 235 T 680 220 L 680 320 L 0 320 Z" fill="url(#hillGrad1)" />
    <path d="M 0 265 Q 260 215 480 260 T 680 250 L 680 320 L 0 320 Z" fill="url(#hillGrad2)" />

    {/* Chemin du village */}
    <path d="M 290 320 Q 335 255 375 235 L 415 235 Q 395 265 375 320 Z" fill="#FDE68A" opacity="0.85" />

    {/* 1. GRENOUILLE CURIEUSE AU PREMIER PLAN (Gauche-Centre) */}
    <g transform="translate(155, 132)">
      {/* Corps */}
      <ellipse cx="65" cy="128" rx="34" ry="32" fill="#22C55E" stroke="#14532D" strokeWidth="3.5" />
      <ellipse cx="65" cy="132" rx="21" ry="22" fill="#BBF7D0" />
      {/* Bras qui salue */}
      <path d="M 33 118 Q 10 95 20 78" fill="none" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" />
      {/* Yeux hauts */}
      <circle cx="46" cy="42" r="17" fill="#4ADE80" stroke="#14532D" strokeWidth="3.5" />
      <circle cx="84" cy="42" r="17" fill="#4ADE80" stroke="#14532D" strokeWidth="3.5" />
      <circle cx="46" cy="42" r="11" fill="#FFFFFF" />
      <circle cx="84" cy="42" r="11" fill="#FFFFFF" />
      <circle cx="48" cy="41" r="6" fill="#0F172A" />
      <circle cx="82" cy="41" r="6" fill="#0F172A" />
      <circle cx="50" cy="39" r="2.5" fill="#FFFFFF" />
      <circle cx="84" cy="39" r="2.5" fill="#FFFFFF" />
      {/* Tête */}
      <ellipse cx="65" cy="78" rx="42" ry="32" fill="#4ADE80" stroke="#14532D" strokeWidth="3.5" />
      <ellipse cx="36" cy="78" rx="7" ry="4.5" fill="#FB7185" opacity="0.75" />
      <ellipse cx="94" cy="78" rx="7" ry="4.5" fill="#FB7185" opacity="0.75" />
      {/* Grand sourire */}
      <path d="M 43 76 Q 65 96 87 76" fill="none" stroke="#14532D" strokeWidth="4" strokeLinecap="round" />
      {/* Sacoche rouge d'explorateur */}
      <path d="M 42 106 L 86 142" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
      <rect x="72" y="130" width="22" height="18" rx="5" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
    </g>

    {/* 2. PETIT ROBOT SYMPATHIQUE "SUPER IA" (Centre-Droite) */}
    <g transform="translate(325, 118)">
      {/* Ombre douce */}
      <ellipse cx="60" cy="168" rx="38" ry="8" fill="#15803D" opacity="0.35" />
      {/* Antenne */}
      <line x1="60" y1="12" x2="60" y2="32" stroke="#0369A1" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="10" r="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
      {/* Corps Robot */}
      <rect x="30" y="96" width="60" height="54" rx="16" fill="#E0F2FE" stroke="#0369A1" strokeWidth="3.5" />
      {/* Coeur / Écran poitrine */}
      <rect x="42" y="108" width="36" height="24" rx="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
      <text x="60" y="126" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0369A1">IA</text>
      {/* Tête Robot */}
      <rect x="20" y="32" width="80" height="60" rx="20" fill="#FFFFFF" stroke="#0369A1" strokeWidth="3.5" />
      <rect x="30" y="42" width="60" height="34" rx="12" fill="#0F172A" />
      {/* Yeux lumineux */}
      <circle cx="46" cy="59" r="7" fill="#38BDF8" />
      <circle cx="74" cy="59" r="7" fill="#38BDF8" />
      <circle cx="48" cy="57" r="2.5" fill="#FFFFFF" />
      <circle cx="76" cy="57" r="2.5" fill="#FFFFFF" />
      {/* Sourire */}
      <path d="M 48 83 Q 60 90 72 83" fill="none" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
    </g>

    {/* 3. CHAT MALICIEUX (Droite) */}
    <g transform="translate(475, 142)">
      {/* Corps */}
      <ellipse cx="55" cy="120" rx="30" ry="28" fill="#FB923C" stroke="#9A3412" strokeWidth="3.5" />
      {/* Oreilles */}
      <polygon points="22,52 28,20 48,38" fill="#FB923C" stroke="#9A3412" strokeWidth="3.5" strokeLinejoin="round" />
      <polygon points="88,52 82,20 62,38" fill="#FB923C" stroke="#9A3412" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Tête */}
      <ellipse cx="55" cy="68" rx="36" ry="30" fill="#FB923C" stroke="#9A3412" strokeWidth="3.5" />
      {/* Yeux */}
      <ellipse cx="41" cy="62" rx="7.5" ry="8.5" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.5" />
      <ellipse cx="69" cy="62" rx="7.5" ry="8.5" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.5" />
      <circle cx="42" cy="63" r="4.5" fill="#0F172A" />
      <circle cx="68" cy="63" r="4.5" fill="#0F172A" />
      {/* Museau */}
      <polygon points="51,71 59,71 55,76" fill="#F43F5E" />
      <path d="M 43 80 Q 55 86 68 77" fill="none" stroke="#7C2D12" strokeWidth="3.2" strokeLinecap="round" />
    </g>
  </svg>
);

// Illustrations de scènes pour le Défi 5 (Bibliothèque locale de BD)
export const SceneIllustration: React.FC<{
  illustrationId: string;
  customImageDataUrl?: string;
  className?: string;
}> = ({ illustrationId, customImageDataUrl, className = '' }) => {
  if (customImageDataUrl) {
    return (
      <img
        src={customImageDataUrl}
        alt="Illustration choisie pour la scène"
        className={`w-full h-48 object-cover rounded-2xl border-2 border-sky-200 ${className}`}
      />
    );
  }

  const scenes: Record<string, { bg: string; sun: string; ground: string; badge: string; title: string }> = {
    'robot-foret': {
      bg: '#DCFCE7',
      sun: '#86EFAC',
      ground: '#16A34A',
      badge: '🤖🌲',
      title: 'Le petit robot dans la forêt',
    },
    'carrefour-mystere': {
      bg: '#FEF3C7',
      sun: '#FDE047',
      ground: '#CA8A04',
      badge: '🪧❓',
      title: 'Le carrefour mystérieux',
    },
    'village-amis': {
      bg: '#E0F2FE',
      sun: '#FACC15',
      ground: '#22C55E',
      badge: '🏡🐸🤖',
      title: 'Retrouvailles au village',
    },
    'chat-machine': {
      bg: '#F3E8FF',
      sun: '#D8B4FE',
      ground: '#7E22CE',
      badge: '🐱✨🤖',
      title: 'Le chat devant la machine',
    },
    'machine-erreur': {
      bg: '#FFE4E6',
      sun: '#FDA4AF',
      ground: '#E11D48',
      badge: '🏰😅',
      title: 'Une drôle de surprise !',
    },
    'bouclier-equipe': {
      bg: '#DBEAFE',
      sun: '#60A5FA',
      ground: '#1D4ED8',
      badge: '🛡️🐸🐱',
      title: 'Le bouclier de sécurité',
    },
    'grenouille-atelier': {
      bg: '#ECFDF5',
      sun: '#6EE7B7',
      ground: '#059669',
      badge: '🐸💡🔧',
      title: 'L’atelier de la grenouille',
    },
    'plan-complique': {
      bg: '#FEF9C3',
      sun: '#FACC15',
      ground: '#D97706',
      badge: '📐🏫🤔',
      title: 'Réflexion sur le plan',
    },
    'jardin-fete': {
      bg: '#DCFCE7',
      sun: '#FDE047',
      ground: '#15803D',
      badge: '🌻🌈🎉',
      title: 'Le jardin fleuri en fête',
    },
    'espace-etoiles': {
      bg: '#1E1B4B',
      sun: '#FACC15',
      ground: '#4338CA',
      badge: '🚀🪐⭐',
      title: 'Aventure dans les étoiles',
    },
  };

  const sc = scenes[illustrationId] || scenes['robot-foret'];
  const isDark = illustrationId === 'espace-etoiles';

  return (
    <svg
      viewBox="0 0 400 220"
      className={`w-full h-48 rounded-2xl border-2 border-sky-200 shadow-inner select-none ${className}`}
      role="img"
      aria-label={sc.title}
    >
      <rect width="400" height="220" fill={sc.bg} />
      <circle cx="335" cy="48" r="28" fill={sc.sun} opacity="0.85" />
      <circle cx="65" cy="45" r="18" fill="#FFFFFF" opacity={isDark ? 0.2 : 0.75} />
      <circle cx="90" cy="42" r="22" fill="#FFFFFF" opacity={isDark ? 0.2 : 0.75} />
      <path d="M 0 165 Q 110 135 220 165 T 400 155 L 400 220 L 0 220 Z" fill={sc.ground} opacity="0.85" />
      {/* Médaillon central illustré */}
      <rect
        x="85"
        y="34"
        width="230"
        height="112"
        rx="24"
        fill="#FFFFFF"
        fillOpacity={isDark ? 0.92 : 0.9}
        stroke={sc.ground}
        strokeWidth="3"
      />
      <text x="200" y="96" textAnchor="middle" fontSize="44">
        {sc.badge}
      </text>
      <text
        x="200"
        y="130"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#0F172A"
        fontFamily="Fredoka, sans-serif"
      >
        {sc.title}
      </text>
    </svg>
  );
};
