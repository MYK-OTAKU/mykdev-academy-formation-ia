import { ComicScene } from '../types/mission';

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), x, curY);
    curY += lineHeight;
  }
  return curY;
}

const SCENE_THEMES: Record<string, { bg: string; ground: string; badge: string; label: string }> = {
  'robot-foret': { bg: '#DCFCE7', ground: '#16A34A', badge: '🤖 🌲', label: 'Robot dans la forêt' },
  'carrefour-mystere': { bg: '#FEF3C7', ground: '#CA8A04', badge: '🪧 ❓', label: 'Carrefour mystérieux' },
  'village-amis': { bg: '#E0F2FE', ground: '#22C55E', badge: '🏡 🐸 🤖', label: 'Village ensoleillé' },
  'chat-machine': { bg: '#F3E8FF', ground: '#7E22CE', badge: '🐱 ✨ 🤖', label: 'Chat & Machine' },
  'machine-erreur': { bg: '#FFE4E6', ground: '#E11D48', badge: '🏰 😅', label: 'Drôle de surprise' },
  'bouclier-equipe': { bg: '#DBEAFE', ground: '#1D4ED8', badge: '🛡️ 🐸 🐱', label: 'Bouclier des amis' },
  'grenouille-atelier': { bg: '#ECFDF5', ground: '#059669', badge: '🐸 💡 🔧', label: 'Grenouille inventrice' },
  'plan-complique': { bg: '#FEF9C3', ground: '#D97706', badge: '📐 🏫 🤔', label: 'École & Idées' },
  'jardin-fete': { bg: '#DCFCE7', ground: '#15803D', badge: '🌻 🌈 🎉', label: 'Jardin en fête' },
  'espace-etoiles': { bg: '#E0E7FF', ground: '#4338CA', badge: '🚀 🪐 ⭐', label: 'Voyage dans l’espace' },
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function exportComicStripPng(title: string, scenes: ComicScene[]) {
  const canvas = document.createElement('canvas');
  canvas.width = 1380;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Fond général joyeux
  const grad = ctx.createLinearGradient(0, 0, 1380, 760);
  grad.addColorStop(0, '#E0F2FE');
  grad.addColorStop(0.5, '#FEF9C3');
  grad.addColorStop(1, '#DCFCE7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Bordure décorative
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 8;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  // En-tête de la BD
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 34px Fredoka, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title || 'Ma Mini-Aventure IA', canvas.width / 2, 72);

  ctx.fillStyle = '#0369A1';
  ctx.font = 'bold 18px Nunito, sans-serif';
  ctx.fillText('KAELOO — MISSION IA · Bande dessinée en 3 scènes', canvas.width / 2, 104);

  const cardWidth = 400;
  const cardHeight = 550;
  const startX = 55;
  const gap = 35;
  const topY = 135;

  for (let i = 0; i < scenes.length; i++) {
    const sc = scenes[i];
    const x = startX + i * (cardWidth + gap);

    // Carte scène blanche
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(x, topY, cardWidth, cardHeight, 24);
    ctx.fill();
    ctx.stroke();

    // Bandeau numéro de scène
    ctx.fillStyle = i === 0 ? '#0284C7' : i === 1 ? '#D97706' : '#16A34A';
    ctx.beginPath();
    ctx.roundRect(x + 16, topY + 16, cardWidth - 32, 42, 12);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 19px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Scène ${sc.stepNumber} : ${sc.stepTitle}`, x + cardWidth / 2, topY + 43);

    // Zone d'illustration
    const imgX = x + 16;
    const imgY = topY + 72;
    const imgW = cardWidth - 32;
    const imgH = 195;

    if (sc.customImageDataUrl) {
      try {
        const uploadedImg = await loadImage(sc.customImageDataUrl);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(imgX, imgY, imgW, imgH, 16);
        ctx.clip();
        ctx.drawImage(uploadedImg, imgX, imgY, imgW, imgH);
        ctx.restore();
      } catch {
        // Fallback si image invalide
      }
    } else {
      const theme = SCENE_THEMES[sc.illustrationId] || SCENE_THEMES['robot-foret'];
      ctx.fillStyle = theme.bg;
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgW, imgH, 16);
      ctx.fill();

      ctx.fillStyle = theme.ground;
      ctx.fillRect(imgX, imgY + imgH - 42, imgW, 42);

      ctx.font = '54px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(theme.badge, x + cardWidth / 2, imgY + 95);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Nunito, sans-serif';
      ctx.fillText(theme.label, x + cardWidth / 2, imgY + imgH - 15);
    }

    // Bulle de dialogue
    ctx.fillStyle = '#FEF9C3';
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(x + 20, imgY + imgH + 18, cardWidth - 40, 110, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 16px Nunito, sans-serif';
    ctx.textAlign = 'center';
    wrapText(
      ctx,
      `« ${sc.dialogue || '...'} »`,
      x + cardWidth / 2,
      imgY + imgH + 50,
      cardWidth - 68,
      23
    );

    // Description narrative en bas de la case
    ctx.fillStyle = '#334155';
    ctx.font = '15.5px Nunito, sans-serif';
    ctx.textAlign = 'center';
    wrapText(
      ctx,
      sc.description || '',
      x + cardWidth / 2,
      imgY + imgH + 158,
      cardWidth - 48,
      22
    );
  }

  // Pied de page
  ctx.fillStyle = '#475569';
  ctx.font = 'bold 15px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'Créé par un Petit Explorateur de l’IA · KAELOO — MISSION IA (8 novembre 2026)',
    canvas.width / 2,
    725
  );

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'ma-bd-kaeloo-mission-ia.png';
  link.href = dataUrl;
  link.click();
}

export function exportDiplomaPng(nickname: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 960;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Fond paysage lumineux
  const bgGrad = ctx.createLinearGradient(0, 0, 1400, 960);
  bgGrad.addColorStop(0, '#FEFCE8');
  bgGrad.addColorStop(0.5, '#FFFFFF');
  bgGrad.addColorStop(1, '#E0F2FE');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Double cadre doré et bleu
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 14;
  ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 4;
  ctx.strokeRect(52, 52, canvas.width - 104, canvas.height - 104);

  // En-tête
  ctx.fillStyle = '#0284C7';
  ctx.font = 'bold 24px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🐸 KAELOO — MISSION IA 🤖', canvas.width / 2, 125);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 40px Fredoka, sans-serif';
  ctx.fillText(
    'DIPLÔME DU PETIT EXPLORATEUR',
    canvas.width / 2,
    185
  );
  ctx.fillText(
    'DE L’INTELLIGENCE ARTIFICIELLE',
    canvas.width / 2,
    235
  );

  // Ruban Surnom
  const displayName = nickname.trim() || 'Petit Explorateur';
  ctx.fillStyle = '#FEF3C7';
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(410, 270, 580, 74, 37);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#92400E';
  ctx.font = 'bold 34px Fredoka, sans-serif';
  ctx.fillText(`⭐ ${displayName} ⭐`, canvas.width / 2, 318);

  ctx.fillStyle = '#334155';
  ctx.font = '24px Nunito, sans-serif';
  ctx.fillText(
    'Ce diplôme récompense la réussite des cinq défis de la Mission IA.',
    canvas.width / 2,
    395
  );

  // Les 5 compétences validées
  const skills = [
    '✅ Je comprends la différence entre humains et machines.',
    '✅ Je connais les différentes familles d’outils d’IA.',
    '✅ Je protège mes informations personnelles.',
    '✅ Je sais écrire un prompt précis.',
    '✅ Je peux inventer une histoire et utiliser l’IA comme assistant.',
  ];

  ctx.textAlign = 'left';
  ctx.font = 'bold 23px Nunito, sans-serif';
  skills.forEach((skill, idx) => {
    const y = 465 + idx * 54;
    ctx.fillStyle = '#F0FDF4';
    ctx.strokeStyle = '#86EFAC';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(230, y - 32, 940, 44, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#14532D';
    ctx.fillText(skill, 255, y - 2);
  });

  // Date & Sceau officiel
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 22px Nunito, sans-serif';
  ctx.fillText('Date : 8 novembre 2026', 360, 825);

  ctx.fillStyle = '#0369A1';
  ctx.font = 'bold 20px Nunito, sans-serif';
  ctx.fillText('« Réfléchis, protège-toi et crée avec l’intelligence artificielle ! »', canvas.width / 2, 885);

  // Médaille d'or à droite
  ctx.fillStyle = '#FACC15';
  ctx.strokeStyle = '#CA8A04';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(1050, 805, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#713F12';
  ctx.font = 'bold 18px Fredoka, sans-serif';
  ctx.fillText('5 / 5 DÉFIS', 1050, 802);
  ctx.fillText('RÉUSSIS 🏆', 1050, 825);

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'diplome-petit-explorateur-ia.png';
  link.href = dataUrl;
  link.click();
}
