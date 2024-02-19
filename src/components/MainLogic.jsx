import { useEffect, useState} from "react"
import Square from "./Square"

const MainLogic = () => {
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

  const [player, setPlayer] = useState("X")
  const [playerStop, setPlayerStop] = useState(true)

  const [enemy, setEnemy] = useState("")
  const [children, setChildren] = useState(initialValues)

  const randomValue = () => {
    return  Math.floor(Math.random() * initialValues.length) 
  }
  const enemyMove = () => {
    let random = randomValue();
    
    while(children[random]["value"] === 'X' || children[random]["value"] === 'O'){
      random = randomValue();
      console.log(random)
    }
      setChildren(prevChildren => {
        const newChildren = [...prevChildren]
        newChildren[random]["value"] = enemy
        return newChildren
      })
    }
  

    const gameOver = (value) => {
        console.log(`win ${value}`)
        setPlayerStop(false)
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
        if (child.id === id && child.value === "" && game){
          return {...child, value: player}
        }
        return child
      })
    })
   
    setTimeout(() => {
        if(game){
            enemyMove() 
        }
        
    }, 2000) 

    console.log(game)
  }

  useEffect(() => {
    
    setEnemy(player === "X" ? "O" : "X")  
    handleWin()
    console.log(children)
  }, [children, game])

  return (
    <div>
      <div id="parentDiv" className=" bg-slate-900 p-4 text-white grid grid-cols-3 border-4 border-slate-950 rounded-xl min-w-40 mx-auto min-h-16">
        {children.map(child => (
          <Square key={child.id} value={child.value} onClick={() => handleChange(child.id) && game}></Square>
        ))}
        
      </div>
      <button className="my-4 bg-red-800 text-white p-2 rounded-lg hover:bg-red-600 focus:bg-red-600">Reset</button>
    </div>
  )
}

export default MainLogic
