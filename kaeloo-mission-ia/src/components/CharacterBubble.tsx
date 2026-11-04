import React from 'react';
import { CharacterId } from '../types/mission';
import { CharacterAvatar } from '../assets/CartoonIllustrations';

interface CharacterBubbleProps {
  character: CharacterId;
  speakerName: string;
  children: React.ReactNode;
  variant?: 'green' | 'orange' | 'blue';
}

export const CharacterBubble: React.FC<CharacterBubbleProps> = ({
  character,
  speakerName,
  children,
  variant,
}) => {
  const autoVariant =
    variant ||
    (character === 'kaeloo' ? 'green' : character === 'chat' ? 'orange' : 'blue');

  const colorClasses = {
    green: 'bg-emerald-50 border-emerald-400 text-emerald-950',
    orange: 'bg-amber-50 border-amber-400 text-amber-950',
    blue: 'bg-sky-50 border-sky-400 text-sky-950',
  }[autoVariant];

  const badgeClasses = {
    green: 'bg-emerald-600 text-white',
    orange: 'bg-amber-500 text-slate-950',
    blue: 'bg-sky-600 text-white',
  }[autoVariant];

  return (
    <div
      className={`flex items-center gap-3.5 sm:gap-5 p-4 sm:p-5 rounded-3xl border-3 border-2 shadow-sm animate-pop ${colorClasses}`}
    >
      <CharacterAvatar character={character} size={68} />
      <div className="flex-1 min-w-0">
        <span
          className={`inline-block text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5 ${badgeClasses}`}
        >
          {speakerName}
        </span>
        <div className="text-base sm:text-lg font-bold leading-snug">{children}</div>
      </div>
    </div>
  );
};
