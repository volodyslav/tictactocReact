import { useEffect, useState } from 'react'
import MainLogic from './components/MainLogic'


const App = () => {

  // Choose player
  const [player, setPlayer] = useState("")
  const [enemy, setEnemy] = useState("")
  const [player2, setPlayer2] = useState("")

  //Choose AI or Player 2
  const [playWith, setPlayWith] = useState("")
  const [play, setPlay] = useState(false)

  //Chose X or O
  const [chosen, setChosen] = useState(false)


  //Reset ++ all
  const handleResetAll = () => {
    setEnemy("")
    setPlayer("")
    setPlayer2("")
    setPlayWith("")
    setPlay(false)
    setChosen(false)
  }

  useEffect(() => {
    setEnemy(player === "X" ? "O" : "X")
    setPlayer2(player === "X" ? "O" : "X") 
  }, [chosen, player, enemy])
  
  const handleChoosePlayer = (value) => {
    setPlayer(value)
    setChosen(true) 
  }

  const handlePlayWith = (player) => {
    setPlayWith(player)
    setPlay(true)
  }

  return (
    <div>
      <div id="parentDiv" className=" z-50 shadow-2xl bg-slate-900 p-6 text-white  border-4 border-slate-950 rounded-xl  mx-auto ">
          <MainLogic player={player} handleResetAll={handleResetAll} handlePlayWith={handlePlayWith} play={play} playWith={playWith} enemy={enemy} chosen={chosen} handleChoosePlayer={handleChoosePlayer} player2={player2}></MainLogic>
      </div>
      
    </div>
  )
}

export default App