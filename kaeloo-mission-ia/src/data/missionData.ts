import {
  HumanMachineQuestion,
  ToolFamilyInfo,
  ToolMission,
  SecurityShield,
  SecuritySituation,
  AdventurePreset,
} from '../types/mission';

export const INTRO_DIALOGUES = [
  {
    speaker: 'Super IA',
    character: 'superia' as const,
    text: '« Bonjour les amis ! Je suis une intelligence artificielle. Je peux vous aider à faire plein de choses ! »',
  },
  {
    speaker: 'Kaeloo la grenouille',
    character: 'kaeloo' as const,
    text: '« C’est génial ! Mais est-ce que tu peux vraiment tout faire ? »',
  },
  {
    speaker: 'Mr Chat',
    character: 'chat' as const,
    text: '« Et si je te donne mon secret, tu vas le garder ? »',
  },
  {
    speaker: 'Super IA',
    character: 'superia' as const,
    text: '« Attention ! Il faut apprendre à bien m’utiliser ! »',
  },
];

export const DEFI1_QUESTIONS: HumanMachineQuestion[] = [
  {
    id: 1,
    text: '« Qui peut effectuer des millions de calculs très rapidement ? »',
    answer: 'MACHINE',
    explanation:
      'Exact ! Une machine calcule à toute vitesse sans se tromper dans les chiffres.',
    hint: 'Pense à une calculatrice géante ultra-rapide ! Est-ce un humain ou une machine ?',
    icon: '🧮',
  },
  {
    id: 2,
    text: '« Qui peut ressentir de la joie ou de la tristesse comme un être humain ? »',
    answer: 'HUMAIN',
    explanation:
      'Bravo ! Les émotions viennent du cœur et du vécu : seuls les êtres vivants les ressentent vraiment.',
    hint: 'Une machine peut afficher un smiley, mais a-t-elle un vrai cœur qui ressent de la joie ?',
    icon: '❤️',
  },
  {
    id: 3,
    text: '« Qui peut analyser automatiquement un très grand nombre de documents ? »',
    answer: 'MACHINE',
    explanation:
      'Bien joué ! Les ordinateurs et l’IA peuvent parcourir des milliers de pages en quelques secondes.',
    hint: 'Qui peut lire automatiquement des milliers de fichiers en un clin d’œil ?',
    icon: '📚',
  },
  {
    id: 4,
    text: '« Qui doit prendre la responsabilité d’une décision importante ? »',
    answer: 'HUMAIN',
    explanation:
      'Très juste ! Une machine n’a ni morale ni responsabilité : c’est toujours l’humain qui choisit et décide.',
    hint: 'Si un choix est important pour des personnes, qui est responsable : un programme ou un humain ?',
    icon: '⚖️',
  },
  {
    id: 5,
    text: '« Qui peut comprendre personnellement ce que signifie aimer sa famille ? »',
    answer: 'HUMAIN',
    explanation:
      'Magnifique ! L’amour pour sa famille et ses amis est une expérience humaine unique.',
    hint: 'Une machine a-t-elle des parents, des frères, des sœurs et de vrais souvenirs d’affection ?',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 6,
    text: '« Qui peut répéter automatiquement une tâche des milliers de fois sans se fatiguer comme un être humain ? »',
    answer: 'MACHINE',
    explanation:
      'Parfait ! L’automatisation permet aux machines de répéter la même action tant qu’elles ont de l’électricité.',
    hint: 'Nous avons besoin de dormir et de nous reposer. Qui peut répéter un calcul 10 000 fois de suite ?',
    icon: '⚙️',
  },
];

export const TOOL_FAMILIES: ToolFamilyInfo[] = [
  {
    id: 'TEXTE',
    name: 'IA Texte',
    iconName: 'BookOpen',
    objectLabel: 'Livre & Feuille',
    shortDesc: 'Pour écrire des histoires, expliquer une leçon ou répondre à des questions.',
    color: 'from-sky-400 to-blue-600',
    example: 'Inventer un conte, résumer un texte ou préparer un quiz.',
  },
  {
    id: 'IMAGE',
    name: 'IA Image',
    iconName: 'Paintbrush',
    objectLabel: 'Pinceau magique',
    shortDesc: 'Pour créer des dessins, des personnages ou des illustrations.',
    color: 'from-emerald-400 to-teal-600',
    example: 'Dessiner un village imaginaire ou une affiche colorée.',
  },
  {
    id: 'AUDIO',
    name: 'IA Audio',
    iconName: 'Music',
    objectLabel: 'Note de musique',
    shortDesc: 'Pour composer une mélodie, un rythme ou des bruitages.',
    color: 'from-amber-400 to-orange-500',
    example: 'Créer une petite musique joyeuse pour une fête.',
  },
  {
    id: 'VOIX',
    name: 'IA Voix',
    iconName: 'Mic',
    objectLabel: 'Microphone',
    shortDesc: 'Pour lire un texte à voix haute et raconter une histoire.',
    color: 'from-purple-400 to-indigo-600',
    example: 'Donner une voix de narrateur à un texte écrit.',
  },
  {
    id: 'VIDEO',
    name: 'IA Vidéo',
    iconName: 'Video',
    objectLabel: 'Caméra',
    shortDesc: 'Pour créer des séquences animées où les personnages bougent.',
    color: 'from-rose-400 to-pink-600',
    example: 'Animer une scène courte avec des personnages en mouvement.',
  },
];

export const DEFI2_MISSIONS: ToolMission[] = [
  {
    id: 'A',
    label: 'Mission A',
    text: '« Je veux inventer une histoire sur une grenouille aventurière. »',
    answer: 'TEXTE',
    explanation:
      'Bravo ! Une histoire s’écrit avec des mots et des phrases : c’est la spécialité de l’IA Texte.',
    hint: 'Cherche l’outil représenté par un livre ou une feuille pour écrire des mots !',
  },
  {
    id: 'B',
    label: 'Mission B',
    text: '« Je veux créer un dessin d’un village imaginaire. »',
    answer: 'IMAGE',
    explanation:
      'Super ! Pour fabriquer un dessin ou une illustration fixe, on choisit l’IA Image et son pinceau.',
    hint: 'De quel outil a-t-on besoin pour peindre ou dessiner un décor ?',
  },
  {
    id: 'C',
    label: 'Mission C',
    text: '« Je veux composer une petite musique pour une fête. »',
    answer: 'AUDIO',
    explanation:
      'Génial ! Pour créer une mélodie ou un rythme musical, on utilise l’IA Audio.',
    hint: 'Regarde la note de musique : quelle famille compose des airs de fête ?',
  },
  {
    id: 'D',
    label: 'Mission D',
    text: '« Je veux transformer un texte en voix qui raconte mon histoire. »',
    answer: 'VOIX',
    explanation:
      'Exactement ! L’IA Voix (avec le microphone) lit un texte écrit comme un conteur.',
    hint: 'Quel outil avec un microphone permet de faire parler un narrateur ?',
  },
  {
    id: 'E',
    label: 'Mission E',
    text: '« Je veux créer une séquence animée avec des personnages qui bougent. »',
    answer: 'VIDEO',
    explanation:
      'Parfait ! Dès que les images s’animent et que les personnages bougent, c’est l’IA Vidéo !',
    hint: 'Quel outil avec une caméra permet de filmer ou d’animer des personnages en mouvement ?',
  },
];

export const SECURITY_SHIELDS: SecurityShield[] = [
  {
    id: 1,
    title: 'Mes informations personnelles',
    shortDesc: 'Je garde secrets mon vrai nom, mon adresse et le numéro de ma famille.',
    icon: '🛡️',
    color: 'bg-sky-100 border-sky-400 text-sky-900',
  },
  {
    id: 2,
    title: 'La vie privée des autres',
    shortDesc: 'Je ne partage jamais la photo, la voix ou le nom d’un camarade sans accord.',
    icon: '🤝',
    color: 'bg-emerald-100 border-emerald-400 text-emerald-900',
  },
  {
    id: 3,
    title: 'L’accompagnement d’un adulte',
    shortDesc: 'J’utilise l’IA avec un parent, un enseignant ou mon formateur.',
    icon: '👨‍🏫',
    color: 'bg-amber-100 border-amber-400 text-amber-900',
  },
  {
    id: 4,
    title: 'Les informations sensibles',
    shortDesc: 'Je ne donne jamais un mot de passe, un code secret ou un document privé.',
    icon: '🔐',
    color: 'bg-purple-100 border-purple-400 text-purple-900',
  },
  {
    id: 5,
    title: 'La vérification des réponses',
    shortDesc: 'Je vérifie toujours les informations importantes avec un adulte ou un livre.',
    icon: '🔎',
    color: 'bg-rose-100 border-rose-400 text-rose-900',
  },
];

export const DEFI3_SITUATIONS: SecuritySituation[] = [
  {
    id: 1,
    text: '« Je demande à l’IA d’inventer une histoire de dragon. »',
    answer: 'CAN_DO',
    shieldId: 1,
    explanation:
      'Bouclier validé ! Une histoire de dragon est 100 % imaginaire et ne dévoile aucun secret personnel.',
    hint: 'Est-ce qu’une histoire de dragon imaginaire contient des informations privées sur toi ?',
  },
  {
    id: 2,
    text: '« Je donne mon adresse personnelle à une IA pour qu’elle la mette dans une histoire. »',
    answer: 'BE_CAREFUL',
    shieldId: 1,
    explanation:
      'Bouclier « Mes informations personnelles » activé ! On n’écrit jamais sa vraie adresse : invente plutôt le nom d’un village imaginaire.',
    hint: 'Ton adresse indique où tu habites dans la vraie vie. Faut-il la donner à une machine ?',
  },
  {
    id: 3,
    text: '« Je partage le mot de passe de mon compte avec un chatbot. »',
    answer: 'BE_CAREFUL',
    shieldId: 4,
    explanation:
      'Bouclier « Informations sensibles » activé ! Un mot de passe est comme la clé de ta maison : on ne le donne jamais.',
    hint: 'Un mot de passe est-il fait pour être partagé avec un robot sur Internet ?',
  },
  {
    id: 4,
    text: '« Je demande à un adulte de m’aider à utiliser une IA. »',
    answer: 'CAN_DO',
    shieldId: 3,
    explanation:
      'Bouclier « Accompagnement d’un adulte » activé ! C’est le meilleur réflexe pour explorer en toute sécurité.',
    hint: 'Se faire accompagner par un parent ou un enseignant est-il une bonne habitude ?',
  },
  {
    id: 5,
    text: '« Je partage la photo de mon camarade sans lui demander son autorisation. »',
    answer: 'BE_CAREFUL',
    shieldId: 2,
    explanation:
      'Bouclier « La vie privée des autres » activé ! On respecte toujours le visage et la vie privée de ses amis.',
    hint: 'As-tu le droit d’envoyer la photo d’un ami sur Internet sans autorisation ?',
  },
  {
    id: 6,
    text: '« L’IA me donne une information importante. Je la vérifie avec mon enseignant ou un adulte. »',
    answer: 'CAN_DO',
    shieldId: 5,
    explanation:
      'Bouclier « Vérification des réponses » activé ! Comme l’IA peut se tromper, vérifier avec un adulte est super intelligent.',
    hint: 'Vérifier une réponse avant de la croire est-il un bon réflexe d’explorateur ?',
  },
  {
    id: 7,
    text: '« Je donne le numéro de téléphone de mes parents à une IA. »',
    answer: 'BE_CAREFUL',
    shieldId: 1,
    explanation:
      'Bouclier « Mes informations personnelles » activé ! Le numéro de téléphone de tes parents est strictement privé.',
    hint: 'Le numéro de téléphone de ta famille est-il une information personnelle à protéger ?',
  },
  {
    id: 8,
    text: '« Je crée un personnage imaginaire et lui invente un prénom. »',
    answer: 'CAN_DO',
    shieldId: 1,
    explanation:
      'Bouclier respecté ! Inventer un personnage fictif te permet de créer librement tout en protégeant ton identité.',
    hint: 'Si le personnage et son prénom sont complètement inventés, y a-t-il un risque pour ta vie privée ?',
  },
];

export const PROMPT_BUILDER_OPTIONS = {
  personnages: [
    { id: 'grenouille', label: '🐸 Une grenouille', phrase: 'd’une petite grenouille curieuse' },
    { id: 'chat', label: '🐱 Un chat', phrase: 'd’un chat malicieux' },
    { id: 'robot', label: '🤖 Un robot', phrase: 'd’un petit robot sympathique' },
    { id: 'elephant', label: '🐘 Un éléphant', phrase: 'd’un jeune éléphant souriant' },
  ],
  actions: [
    { id: 'danser', label: '💃 Danser', phrase: 'qui danse' },
    { id: 'courir', label: '🏃 Courir', phrase: 'qui court' },
    { id: 'lire', label: '📖 Lire', phrase: 'qui lit un grand livre' },
    { id: 'jouer', label: '⚽ Jouer', phrase: 'qui joue' },
  ],
  lieux: [
    { id: 'foret', label: '🌳 Forêt', phrase: 'dans une forêt' },
    { id: 'ecole', label: '🏫 École', phrase: 'devant une école' },
    { id: 'village', label: '🏡 Village', phrase: 'au cœur d’un beau village' },
    { id: 'espace', label: '🚀 Espace', phrase: 'dans l’espace entouré d’étoiles' },
  ],
  ambiances: [
    { id: 'joyeuse', label: '☀️ Joyeuse', phrase: 'avec une ambiance joyeuse' },
    { id: 'magique', label: '✨ Magique', phrase: 'avec une ambiance magique' },
    { id: 'drole', label: '😄 Drôle', phrase: 'avec une ambiance drôle' },
    { id: 'mysterieuse', label: '🌙 Mystérieuse', phrase: 'avec une ambiance mystérieuse' },
  ],
  styles: [
    { id: 'dessin-anime', label: '🎬 Dessin animé', phrase: 'dans un style dessin animé coloré' },
    { id: 'illustration-douce', label: '🎨 Illustration douce', phrase: 'dans un style d’illustration douce à l’aquarelle' },
    { id: 'bande-dessinee', label: '💬 Bande dessinée', phrase: 'dans un style bande dessinée expressif' },
  ],
};

export const ADVENTURE_PRESETS: AdventurePreset[] = [
  {
    id: 'robot-perdu',
    title: 'Aventure 1 : Le robot perdu',
    subtitle: 'Un petit robot se perd dans une forêt et cherche le chemin de son village.',
    defaultComicTitle: 'Le Petit Robot et le Chemin du Village',
    defaultScenes: [
      {
        illustrationId: 'robot-foret',
        description: 'Le petit robot Bip-Bip se promène dans la grande forêt verte et cherche son village.',
        dialogue: 'Oups ! Ma boussole est déréglée, par où est le village ?',
      },
      {
        illustrationId: 'carrefour-mystere',
        description: 'Il arrive devant deux chemins mystérieux : sa batterie clignote et la nuit approche.',
        dialogue: 'Si je choisis au hasard, je risque de tourner en rond !',
      },
      {
        illustrationId: 'village-amis',
        description: 'Grâce aux conseils de Kaeloo qui observe la position du soleil, ils retrouvent ensemble le village !',
        dialogue: 'Merci les amis ! Ensemble, l’observation humaine et mon calcul font une super équipe !',
      },
    ],
  },
  {
    id: 'chat-machine',
    title: 'Aventure 2 : Le chat et la machine magique',
    subtitle: 'Un chat découvre une machine qui prétend réaliser tous ses souhaits.',
    defaultComicTitle: 'Le Chat Malicieux et la Machine Magique',
    defaultScenes: [
      {
        illustrationId: 'chat-machine',
        description: 'Le chat découvre une drôle de boîte lumineuse au milieu de la place du village.',
        dialogue: 'Une machine qui sait tout faire ? Je vais lui demander cent gâteaux !',
      },
      {
        illustrationId: 'machine-erreur',
        description: 'La machine comprend mal sa demande trop vague et dessine cent châteaux de sable !',
        dialogue: 'Mais non ! J’avais dit des gâteaux, et elle me demande aussi mon mot de passe !',
      },
      {
        illustrationId: 'bouclier-equipe',
        description: 'La grenouille l’aide à protéger ses secrets et à formuler une consigne claire et prudente.',
        dialogue: 'J’ai compris : je garde mes secrets et je donne des consignes précises !',
      },
    ],
  },
  {
    id: 'grenouille-inventrice',
    title: 'Aventure 3 : La grenouille inventrice',
    subtitle: 'Une petite grenouille veut inventer une machine pour aider ses amis.',
    defaultComicTitle: 'La Grande Invention de la Petite Grenouille',
    defaultScenes: [
      {
        illustrationId: 'grenouille-atelier',
        description: 'Dans son atelier, la petite grenouille rêve d’un arrosoir solaire pour le jardin de l’école.',
        dialogue: 'J’ai une super idée pour arroser les fleurs sans gaspiller une goutte d’eau !',
      },
      {
        illustrationId: 'plan-complique',
        description: 'Le plan est compliqué à dessiner toute seule et il manque une pièce pour capter le soleil.',
        dialogue: 'Comment expliquer mon idée clairement pour préparer une belle affiche ?',
      },
      {
        illustrationId: 'jardin-fete',
        description: 'Elle utilise l’IA comme assistant pour illustrer son plan, puis construit l’invention avec ses amis !',
        dialogue: 'L’idée vient de notre imagination, et tout le jardin fleurit !',
      },
    ],
  },
];

export const ILLUSTRATION_LIBRARY = [
  { id: 'robot-foret', label: '🤖 Robot dans la forêt' },
  { id: 'carrefour-mystere', label: '🌳 Carrefour de la forêt' },
  { id: 'village-amis', label: '🏡 Village ensoleillé' },
  { id: 'chat-machine', label: '🐱 Chat & Machine' },
  { id: 'machine-erreur', label: '⚡ Machine rigolote' },
  { id: 'bouclier-equipe', label: '🛡️ Bouclier des amis' },
  { id: 'grenouille-atelier', label: '🐸 Grenouille inventrice' },
  { id: 'plan-complique', label: '🏫 École & Idées' },
  { id: 'jardin-fete', label: '🌻 Jardin en fête' },
  { id: 'espace-etoiles', label: '🚀 Voyage dans l’espace' },
];
