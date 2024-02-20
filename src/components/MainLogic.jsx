import { useEffect, useState} from "react"
import Square from "./Square"

const MainLogic = ({player, enemy, chosen, handleChoosePlayer, play, playWith, handlePlayWith, player2}) => {
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

  //Player can play 
  const [playerStop, setPlayerStop] = useState(true)
  const [playerStop2, setPlayerStop2] = useState(false)
  const [children, setChildren] = useState(initialValues)

  const resetAll = () => {
    setChildren(initialValues)
    setGame(true)
  }

  const randomValue = () => {
    return  Math.floor(Math.random() * children.length) 
  }
  const enemyMove = () => {
    let random = randomValue();
    let startDate = Date.now()
    while(children[random]["value"] === 'X' || children[random]["value"] === 'O' && game){
      random = randomValue();
      // If values all taken do search 5ms
      if(Date.now() - startDate > 100){
        break
      }
      console.log(random)
    }
    if(children[random]["value"] === "" && game){
      setTimeout(() => {
      setChildren(prevChildren => {
        const newChildren = [...prevChildren]
        newChildren[random]["value"] = enemy
        setPlayerStop(true)
        return newChildren
      }) }, 1000)
    }else{
      return 
    }
    
    }
  
    const gameOver = (value) => {
        console.log(`win ${value}`)
        setPlayerStop(true)
        setGame(false)
        return 
    }
    //Winning values
  const handleWin = () => {
    
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
 

  const handleChange = (id) => {
      setChildren(s => {
        return s.map(child => {
        if (child.id === id && child.value === "" && game && playerStop){
          setPlayerStop(false)
          setPlayerStop2(true)
          return {...child, value: player}
        }
        if (child.id === id && child.value === "" && game && playerStop2 && playWith === "Player"){
          setPlayerStop(true)
          setPlayerStop2(false)
          return {...child, value: player2}
        }
        return child
      })
    })
  
  }

  useEffect(() => {
    
    
    handleWin()
    if(game && !playerStop && playWith === "Computer"){
      enemyMove() 
  }
    console.log(children)
    console.log("Player", playerStop)
    console.log("Game", game)
    console.log("Play with", playWith)
  }, [children, game, playerStop, playWith])

  return (
    <div>
        <div className=" flex justify-between items-center">
          {chosen && play && playerStop && <p className="text-4xl">Go Player 1 </p>}
          {chosen && play && !playerStop && playWith === "Computer" && <p className="text-4xl">Computer</p>}
          {chosen && play && !playerStop && playWith === "Player" &&<p className="text-4xl">Go Player 2 </p>}{chosen && play && <button onClick={() => resetAll()} className="text-2xl  text-white  rounded-lg hover:border-red-900 border-2 border-transparent focus:border-red-900 my-2 p-4">Reset</button>}
        </div>
        {chosen && play && <div className="childrenShow grid grid-cols-3 ">
          { children.map(child => (
            <Square key={child.id} value={child.value} onClick={() => handleChange(child.id) && game}></Square>
          ))}
           
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
