import React, {useState, useEffect} from 'react';
import './App.css';
import Card from './Components/Card'
import MenuStart from './Components/MenuStart';
import MenuVictoria from './Components/MenuVictoria';
import converTimer from './Components/ConvertTimer';

import {images} from './Datos';

function App(){
  
  
  const [cards,setCards]=useState([]);
  //creo dos estado para girar la primera y segunda carta
  const [firstCard,setFirstcard]=useState({});
  const [secondCard,setSecondCard]=useState({});
  
  const [unflippedCards,setunflippedCards]=useState([]);
  const [disabledCards,setdisabledCards]=useState([]);
  // INDICA EL ESTADO DEL juego
  const[StateGame,setStateGame]=useState(0)
  //variables de estado para el temporizador
  const [intervakId,setIntervalId]=useState(0);
  const [miliSeconds,setMiliSeconds]=useState(0);
  //contador
  const [contador,setcontador]=useState(0)
 
 

  //para cambiar el estado del juego
  const changeStateGame=(value) =>{
    //0 no iniciado,1 en proceso , 2 finalizado
    setStateGame(value)
    if(value===1)playtimer();

  }
  //reiniciar el juego
  const restart=()=>{
    setStateGame(0)
    //funcion para reinicial el temporizador
    resettimer()
    shuffleArray(images)
  }

  const resettimer=()=>{
    setMiliSeconds(0)
    if(intervakId){
      clearInterval(intervakId)
      setIntervalId(0)
    }
  }
  


  /*useEffect(()=>{
    if(images){
      setCards([images]) esta parte estaba mal
    }
    

  },[])*/

  const flipcard = (name, number) => {
    if (firstCard.name === name && firstCard.number === number) {
      return 0;
    }
    if (!firstCard.name) {
      setFirstcard({ name, number });
    }
    else if (!secondCard.name) {
      setSecondCard({ name, number });
    }
    return 1;
  }




  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }



  useEffect(() => {
    shuffleArray(images);
    setCards(images);
  }, [])
  //aca chequeo si las cartas son iguales
  useEffect(()=>{
     checkForMatch()

  },[secondCard])

  const checkForMatch=()=>{
    if(firstCard.name && secondCard.name){
      const match = firstCard.name===secondCard.name;

      match ? disableCards() : unflipCards();
      
      if(match){
        setcontador(contador+1)
        console.log(contador)
      }
    }
  }

  //funcion para mostrar el contador 
 if(contador===10){
  setStateGame(2)
 }



  const disableCards =()=>{
    setdisabledCards([firstCard.number, secondCard.number]);
    resetCards();
  }
  
  
  const unflipCards = () =>{
    setunflippedCards([firstCard.number, secondCard.number]);
    resetCards();
  }
  
  
  const resetCards=()=>{
    setFirstcard({})
    setSecondCard({})
  }
  

  //funciones para el cronometro
  const playtimer=()=>{
    if(intervakId){
      clearInterval(intervakId)
      setIntervalId(0)
    }

    const newIntevalId=setInterval(()=>{
      //xada segundo se actualiza el crono
      setMiliSeconds(miliSeconds=>miliSeconds+1000)
    },1000)

    setIntervalId(newIntevalId)
  }
  
  
 




  return(
    <div className='app'>
      {StateGame===2?<MenuVictoria />:""}
       <p className='cronometro'>time : {converTimer(miliSeconds)}</p>
      
      
       { StateGame===0 ?<MenuStart  
       setStart={changeStateGame}/>
       :<div className='cards-container'>
       {
          cards.map((card, index) => (
            <Card
              name={card.animal}
              number={index}
              frontFace={card.src}
              flipcard={flipcard}
              unflippedCards={unflippedCards}
              disabledCards={disabledCards}
              estadojuego={StateGame}
              
              
            />
          ))
        }

      </div> }
      <button onClick={restart}className="btn">restart</button>
      
      
      
      
    </div>
  )
}

export default App; 

/*{
            cards.map((card ,index)=>(
             <Card  name={card.animal}frontFace={card.image} />
            ))
          }
          
          {
          cards.map((card, index) => (
            <Card
              name={card.player}
              number={index}
              frontFace={card.src}
              
            />
          ))
        }
          */