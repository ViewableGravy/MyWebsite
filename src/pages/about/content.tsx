export const modes = {
  PROFESSIONAL: 'PROFESSIONAL',
  CASUAL: 'CASUAL',
} as const;

type TModes = typeof modes[keyof typeof modes];

const getGreetings = (mode: TModes) => mode === modes.PROFESSIONAL ? {
  morning: 'Good morning!',
  afternoon: 'Good afternoon!',
  evening: 'Good evening!',
  night: 'You\'re up late, don\'t stay up for too long!'
} as const : {
  morning: 'Ohayō gozaimasu!',
  afternoon: 'Konnichi wa!',
  evening: 'Konbanwa!',
  night: 'Oyasumi nasai!'
} as const;

const getProfileImage = (mode: TModes) => mode === modes.PROFESSIONAL 
  ? 'https://i.pinimg.com/originals/9c/f4/f0/9cf4f0296dc287ce13c6997004dcf8eb.png'
  : 'https://i.pinimg.com/originals/9c/f4/f0/9cf4f0296dc287ce13c6997004dcf8eb.png';

const getName = (mode: TModes) => mode === modes.PROFESSIONAL ? 'Lleyton Morris' : 'ViewableGravy';

const getDescription = (mode: TModes) => mode === modes.PROFESSIONAL 
  ? `I'm a passionate frontend software engineer with a strong interest in creating composeable and exciting software. In my spare time I enjoy playing video games watching anime and configuring self hosted software, but I also pour my time into side projects just like this one! I'm not a designer so don't expect anything too fancy without a reference design, but building websites is my passion.` 
  : `My name is ${getName(mode)} but online, you can call me Gravy. You might refer to me as a weeb, after all, I love watching anime on a daily basis and have chat GPT set to respond as a, and I quote, "Kawaii UwU Anime Magical Girl", but don't let that put you off. I still leave plenty of time for gaming with friends, coding and configuring self hosted software in my spare time.
`;

export const getContent = (mode: TModes) => ({
  greetings: getGreetings(mode),
  profileImage: getProfileImage(mode),
  name: getName(mode),
  description: getDescription(mode),
});