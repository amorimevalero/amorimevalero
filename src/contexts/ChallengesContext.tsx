import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenges {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  experienceTonextLevel: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenges;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: any;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}    

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}
     
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider(
  { children,
    ...rest  
  }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrenceExperience] = useState( rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState( rest.challengesCompleted ?? 0);
    
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)   

    const experienceTonextLevel = Math.pow( (level + 1) * 4, 2 ) 
       
    useEffect(() => {
      Notification.requestPermission();
    }, []); 

    useEffect(() => {
      Cookies.set('level', String(level));
      Cookies.set('currentExperience', String(currentExperience));
      Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [ level, currentExperience, challengesCompleted]);


    function levelUp() {
        setLevel(level + 1); 
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
      setLevel(level + 1);
      setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
      const challenge = randomChallengeIndex;
      
      setActiveChallenge(challenge)

      new Audio('/notification.mp3').play;

      if (Notification.permission == 'granted') {
        new Notification('Novo desafio', {
          body: `Valendo ${challenges.amount} XP` 
        })

      }
    }

    function resetChallenge(challenge) {
        setActiveChallenge(null);
    }

    function completeChallenge() {
      if (!activeChallenge) {
        return;
      }

      const { amount } = activeChallenge

      let finalExperience = currentExperience + amount;

      if (finalExperience >= experienceTonextLevel) {
        finalExperience = finalExperience - experienceTonextLevel;
        levelUp();
      }

      setCurrenceExperience(finalExperience);
      setActiveChallenge(null);
      setChallengesCompleted(challengesCompleted + 1);

    }
    return ( 
      <ChallengesContext.Provider 
        value={{ 
          level, 
          experienceTonextLevel,
          currentExperience, 
          challengesCompleted, 
          activeChallenge,
          levelUp,
          startNewChallenge,
          resetChallenge,
          completeChallenge,
          closeLevelUpModal,
        }}
      >
        {children}
        { isLevelUpModalOpen && <LevelUpModal />}
      </ChallengesContext.Provider>  

    );
}
