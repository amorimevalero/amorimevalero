import { useContext } from 'react';
import { ConuntdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const { 
      minutes, 
      seconds, 
      hasFinished, 
      isActive, 
      startCountdown, 
      resetCountdown 
    } = useContext(ConuntdownContext)
    

    const [minuteleft, minuterigth] = String(minutes).padStart(2, '0').split('');
    const [secondleft, secondrigth] = String(seconds).padStart(2, '0').split('');

    return(
       <div>
         <div className={styles.countdownContainer}>
           <div>
               <span>{minuteleft}</span>
               <span>{minuterigth}</span>               
            </div> 
            <span>:</span>
            <div>
               <span>{secondleft}</span>
               <span>{secondrigth}</span>               
            </div>
          </div>  

          { hasFinished ? (
            <button 
              disabled
              className= {styles.countdownButton}
              >
              Ciclo encerrado.
            </button> 
            ) : (
            <>
              { isActive ? (
               <button 
                  type="button" 
                  className={ `${styles.countdownButton} ${styles.countdownButtonActive}`}
                  onClick={startCountdown}
                  >
                  Abandonar ciclo
                </button>
                ) : (
                <button 
                  type="button" 
                  className={styles.countdownButton}
                  onClick={startCountdown}
                  >
                  Iniciar um ciclo
               </button>

              )}
            </>
          ) } 
       </div>
    );
}