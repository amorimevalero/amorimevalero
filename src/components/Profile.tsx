import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import style from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return(
        <div className={style.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/69227939?s=400&u=8b941cbf990e2041b9b4614778135f3aa0e9203e&v=4" alt="Amorim e Valero"/>
            <div>
              <strong>Pedro Amorim</strong>
              <p>
                  <img src="icons/level.svg" alt="level"/>
                  level {level}
              </p>
            </div>
            
        </div>
    );
}