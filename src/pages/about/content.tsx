
import ventraLogo from '../../assets/images/ventraip_logo-removebg-preview.png';
import vscodeLogo from '../../assets/images/Visual_Studio_Code_1.35_icon.svg.png';
import lucidLogo from '../../assets/images/3865608556737_8f4ae4a98b36ab6912b3_512-removebg-preview.png';
import officeLogo from '../../assets/images/Microsoft_Outlook-Logo.wine.svg';
import Text from 'components/text';
import { Anchor } from 'components/Anchor';

export const modes = {
  PROFESSIONAL: 'PROFESSIONAL',
  CASUAL: 'CASUAL',
} as const;

type TModes = typeof modes[keyof typeof modes];

const getIntroduction = (mode: TModes) => {
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

  return {
    greetings: getGreetings(mode),
    profileImage: getProfileImage(mode),
    name: getName(mode),
    description: getDescription(mode)
  }
}

const getEmployment = (mode: TModes) => {
  const title = mode === modes.PROFESSIONAL ? 'Employment' : 'Work';
  const description = mode === modes.PROFESSIONAL 
    ? "I am currently employed as a frontend developer at Nexigen Digital, initially joining the company in a technical support capacity. Through my dedication and exceptional performance in technical support, I have had the opportunity to transition into my current role. I primarily work on the VIPControl Dashboard and look forward to thriving in this role."
    : "I'm totally rockin' it as a frontend developer over at Nexigen Digital! Started off in tech support, but hey, my dedication and mad skills totally paid off, and now I'm slayin' it in this gig. My main jam? VIPControl Dashboard, baby! Can't wait to dive in deep and make some serious magic happen. Bring it on!"

  return {
    title,
    description,
    image: ventraLogo
  }
}

const getProgramming = (mode: TModes) => {
  const title = "Programming"
  const description = mode === modes.PROFESSIONAL 
    ? "I have a deep passion for programming, which consumes a significant portion of my spare time. It wouldn't be an exaggeration to estimate that I devoted over 500 hours to coding last year alone, possibly surpassing the time I allocated to gaming. In particular, I am deeply interested in TypeScript, React, Bun (Runtime), and ensuring type safety within my projects."
    : "Hey there! So, programming? Totally my passion! Like, I'm seriously obsessed with it and spend a massive chunk of my free time diving into code. Last year? Oh man, I easily clocked over 500 hours, maybe even more than my gaming time! TypeScript, React, Bun are my favorites. And you know what really gets me hyped? Ensuring type safety in my projects. It's like, my code's gotta be as secure as a magical barrier, you know? UwU";

  return {
    title,
    description,
    image: vscodeLogo
  }
}

const getProjects = (mode: TModes) => {
  const title = 'My Projects';
  const description = mode === modes.PROFESSIONAL
    ? "While consistently working on projects, I've seen clear progression as a programmer in recent endeavors, with improved knowledge of languages, libraries, and programming paradigms. Notably, I crafted a web UI for VirtualBox to address shortcomings and the outdated UI as well as developing a simple drag-and-drop editor and working on my website with significant refactors over the last 8 months."
    : "While I've been immersed in my projects, I've noticed some serious growth as a programmer lately. Like, my skills with languages, libraries, and all that techy stuff have leveled up big time. Oh, and get this—I conjured up a rad web UI for VirtualBox to fix its issues and make it less... well, lame. Plus, I'm tinkering with a simple drag-and-drop editor and giving my website a major upgrade over the past 8 months. It's been quite the adventure in the world of coding!";

  return {
    title,
    description,
    image: lucidLogo
  }
}

const getContact = (mode: TModes) => {
  const title = 'Contact';
  const image = officeLogo;
  const description = <Text className="aboutPage__text">If you have any questions, feedback, or would like to collaborate on a project, please feel free to reach out to me. You can find my contact information on the <Anchor params to="/contact">Contact Me</Anchor> page. Whether it's about my work, a potential opportunity, or just to say hello, I'm always happy to hear from you. Looking forward to connecting!</Text>

  return {
    title,
    image,
    description
  }
}


export const getContent = (mode: TModes) => ({
  introduction: getIntroduction(mode),
  employment: getEmployment(mode),
  programming: getProgramming(mode),
  projects: getProjects(mode),
  contact: getContact(mode)
});