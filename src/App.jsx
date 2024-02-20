import { useEffect, useState } from 'react'
import MainLogic from './components/MainLogic'

const App = () => {

  // Choose player
  const [player, setPlayer] = useState("")
  const [enemy, setEnemy] = useState("")
  const [chosen, setChosen] = useState(false)

  useEffect(() => {
    
    setEnemy(player === "X" ? "O" : "X") 
    console.log("Player", player)
    console.log("Enemy", enemy)

  }, [chosen, player, enemy])
  
  const handleChoosePlayer = (value) => {
    setPlayer(value)
    setChosen(true) 
  }

  return (
    <div>
      <div id="parentDiv" className=" z-50 bg-slate-900 p-6 text-white  border-4 border-slate-950 rounded-xl  mx-auto ">
          <MainLogic player={player} enemy={enemy} chosen={chosen} handleChoosePlayer={handleChoosePlayer}></MainLogic>
      </div>
      
    </div>
  )
}

export default App