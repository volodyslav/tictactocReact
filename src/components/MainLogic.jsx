import { useEffect, useState} from "react"
import Square from "./Square"

const MainLogic = ({player, enemy, chosen, handleChoosePlayer}) => {
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
      if(Date.now() - startDate > 500){
        break
      }
      console.log(random)
    }
    if(children[random]["value"] === "" && game){
      setChildren(prevChildren => {
        const newChildren = [...prevChildren]
        newChildren[random]["value"] = enemy
        setPlayerStop(true)
        return newChildren
      })
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
          return {...child, value: player}
        }
        return child
      })
    })
  
  }

  useEffect(() => {
    
    
    handleWin()
    if(game && !playerStop){
      enemyMove() 
  }
    console.log(children)
    console.log("Player", playerStop)
    console.log("Game", game)
  }, [children, game, playerStop])

  return (
    <div>
        <div className=" grid grid-cols-3">
        {chosen && children.map(child => (
          <Square key={child.id} value={child.value} onClick={() => handleChange(child.id) && game}></Square>
        ))}
        {chosen && <button onClick={() => resetAll()} className="my-4 bg-red-800 text-white p-2 rounded-lg hover:bg-red-600 focus:bg-red-600">Reset</button>}
        </div>
        {!chosen && <div className=" text-center  space-y-4 items-center my-20 mx-auto space-x-4">
          <h1 className=" text-6xl">Choose player 1</h1>
          <button value="O" className=' p-4 text-white rounded-lg bg-green-500 ' onClick={() => handleChoosePlayer("O")}>O</button>
          <button value="X" className=' p-4 text-white rounded-lg bg-blue-500 ' onClick={() => handleChoosePlayer("X")} >X</button>
        </div>}
    </div>
  )
}

export default MainLogic
