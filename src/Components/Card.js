import React, {useEffect, useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import backFace from '../Media/Pregunta.jpg'

function Card({name , number , frontFace,  flipcard, unflippedCards,disabledCards, estadojuego}) {

  const [isFlipped,setisFlipped]=useState(false);//aca false originalmente

  const [hasEvent,setHasevent]=useState(true);
  
 

  useEffect(() => {
    if (unflippedCards.includes(number)) {
      setTimeout(() => setisFlipped(false), 700);
    }
  }, [unflippedCards])

  useEffect(()=>{
    if(disabledCards.includes(number)){
       setHasevent(false)
    }
  },[disabledCards])




  const handleClick = e => {
    const value = flipcard(name, number);
    if (value !== 0) {
      setisFlipped(!isFlipped);
    }
  }

  return (
    
      
      <div className='card'>
       <ReactCardFlip isFlipped={isFlipped}>
          <img className='card-image' src={backFace} alt="back-face" onClick={hasEvent ? handleClick:null}/>
          <img className='card-image' src={frontFace} alt="front-face" onClick={hasEvent ? handleClick:null} />
       </ReactCardFlip>

      </div>
   
  )
}

export default Card