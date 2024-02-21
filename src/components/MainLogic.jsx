import { useEffect, useState} from "react"
import Square from "./Square"

const MainLogic = ({player, handleResetAll, enemy, chosen, handleChoosePlayer, play, playWith, handlePlayWith, player2}) => {
  // Squares' values
  const initialValues = [
    {id: 0, value: ""},
    {id: 1, value: ""},
    {id: 2, value: ""},
    {id: 3, value: ""},
    {id: 4, value: ""},
    {id: 5, value: ""},
    {id: 6, value: ""},
    {id: 7, value: ""},
    {id: 8, value: ""}
  ]
  
  // Check game start stop
  const [game, setGame] = useState(true)
  const [matchFinished, setMatchFinished] = useState(false)
  const [winner, setWinner] = useState("")
 
  // scores 
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  //Player can play 
  const [playerStop, setPlayerStop] = useState(true)
  const [playerStop2, setPlayerStop2] = useState(false)
  const [children, setChildren] = useState(initialValues)

  const resetAll = () => {
    setChildren(initialValues)
    setGame(true)
    setScore1(0)
    setScore2(0)
    setWinner("")
  }

  const randomValue = () => {
    return  Math.floor(Math.random() * children.length) 
  }
  const enemyMove = () => {
    
    let random = randomValue();
    let startDate = Date.now()
    while((children[random]["value"] === 'X' || children[random]["value"] === 'O') && !matchFinished ){
      random = randomValue();

      // If values all taken do search 5ms
      if(Date.now() - startDate > 300 || !matchFinished){
        break
      }
    }
    if(children[random]["value"] === "" && game && !matchFinished){
      setTimeout(() => {
      setChildren(prevChildren => {
        const newChildren = [...prevChildren]
        newChildren[random]["value"] = enemy
        setPlayerStop(true)
        return newChildren
      }) }, 500)
    }else{
      return 
    }
    
    }
  
    const gameOver = (value) => {
        setPlayerStop(true)
        setTimeout(() => {
          setGame(false)
        }, 100)
        
        setMatchFinished(true)
        setWinner(value)
        return 
    }

    //Winning values
  const handleWin = () => {
    if (children.every((child => 
      child.value !== "")) && ( winner !== "X" || winner !== "O")){
        gameOver("")
    }
    for(let i = 0; i <= 6; i+=3){
      if(children[i]["value"] === children[i+1]["value"] && 
      children[i+1]["value"] === children[i+2]["value"] && 
      children[i]["value"] !== ""){
        gameOver(children[i]["value"])
        
      }
    }
    for(let i = 0; i <= 2; i+=1){
      if(children[i]["value"] === children[i+3]["value"] 
      && children[i+3]["value"]  === children[i+6]["value"] && 
      children[i]["value"] !== ""){
        gameOver(children[i]["value"])
       
      }
    }
    if(children[0]["value"] === children[4]["value"] 
    && children[4]["value"]  === children[8]["value"] && 
    children[0]["value"] !== ""){
        gameOver(children[0]["value"])
      
    }
    if(children[2]["value"] === children[4]["value"] 
    && children[4]["value"]  === children[6]["value"] && 
    children[2]["value"] !== ""){
        gameOver(children[2]["value"])
     
    }
  }
 
  const playAgain = () => {
    setGame(true)
    setMatchFinished(false)
    setPlayerStop(true)
    setPlayerStop2(false)
    setChildren(initialValues)
    setWinner("")
  }

  const handleChange = (id) => {
      setChildren(s => {
        return s.map(child => {
        if (child.id === id && child.value === "" && game && playerStop ){
          setPlayerStop(false)
          setPlayerStop2(true)
          return {...child, value: player}
        }
        if (child.id === id && child.value === "" && game && playerStop2 && playWith === "Player" ){
          setPlayerStop(true)
          setPlayerStop2(false)
          return {...child, value: player2}
        }
        return child
      })
    })
  
  }

  const addScore = () => {
    if (winner === "X" && game){
      setScore1(s => s + 1)
    }else if(winner === "O" && game){
      setScore2(s => s + 1)
    }else if(winner === "Draw" && matchFinished){
      setScore1(s => s + 1)
      setScore2(s => s + 1)
    }
  }

  useEffect(() => {
    addScore()
    handleWin()
    if((game && !playerStop && playWith === "Computer") && (winner !== "X" || winner !== "O")){
      enemyMove() 
  }
  }, [children, game, playWith, matchFinished, winner, playerStop, playerStop2])

  return (
    <div>
        <div className=" flex justify-between items-center">
          {chosen && play && playerStop && <p className="text-4xl">Go Player 1 </p>}
          {chosen && play && !playerStop && playWith === "Computer" && <p className="text-4xl">Computer</p>}
          {chosen && play && !playerStop && playWith === "Player" &&<p className="text-4xl">Go Player 2 </p>}
          {chosen && play && <button onClick={() => {resetAll(); handleResetAll()}} className="text-2xl  text-white  rounded-lg hover:border-red-900 border-2 border-transparent focus:border-red-900 my-2 p-4">Reset</button>}
          {chosen && play && <div className="flex justify-evenly space-x-10 text-4xl"><p >X - {score1} </p> <p> O -  {score2}</p></div>}
          
        </div>
        {  chosen && play && <div className={`childrenShow grid grid-cols-3 relative ${matchFinished ? " opacity-10" : ""}`}>
          { children.map(child => (
            <Square key={child.id} value={child.value} onClick={() => handleChange(child.id) && game}></Square>
          ))}
          
           
        </div>}
        {matchFinished && 
        <div className=" text-center">
          <p className=" text-center text-8xl absolute top-1/3 lg:ml-32 mx-auto  items-center ">{ (winner === "" && !game) ? <span className=" lg:ml-24">Draw</span> : <span>Winner {winner}</span>}</p>
          <p className="  text-5xl absolute top-1/2   lg:ml-32  items-center ">Will you play again?</p>
          <button className=" text-5xl absolute top-2/3 " onClick={playAgain}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="   w-20 h-20 hover:scale-110  focus:scale-110 duration-500 ease-in-out">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>}
        {!chosen && play && <div className={`text-center  space-y-10 items-center mt-20 mx-auto space-x-4 `}>
          <h1 className=" text-6xl">Choose player 1</h1>
          <button value="O" className=' p-10 text-8xl text-white border-green-900 border-4 rounded-lg  focus:bg-transparent bg-green-900 hover:bg-transparent ' onClick={() => handleChoosePlayer("O")}>O</button>
          <button value="X" className=' p-10 text-8xl text-white border-blue-900 border-4 rounded-lg  focus:bg-transparent bg-blue-900 hover:bg-transparent ' onClick={() => handleChoosePlayer("X")} >X</button>
        </div>}
        {!chosen && !play && <div className={`text-center  space-y-10 items-center mt-20 mx-auto space-x-4 `}>
          <h1 className=" text-6xl">Choose to play with player or computer</h1>
          <button value="O" className='p-4 text-6xl text-white border-green-900 border-4 rounded-lg  focus:bg-transparent bg-green-900 hover:bg-transparent ' onClick={() => handlePlayWith("Computer")}>Computer</button>
          <button value="X" className=' p-4 text-6xl text-white border-blue-900 border-4 rounded-lg  focus:bg-transparent bg-blue-900 hover:bg-transparent ' onClick={() => handlePlayWith("Player")} >Player</button>
        </div>}
    </div>
  )
}

export default MainLogic
