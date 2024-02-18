import { useEffect, useState} from "react"
import Square from "./components/Square"

const App = () => {
  // Sign O or X
  const initialValues = [
    {id: 1, value: ""},
    {id: 2, value: ""},
    {id: 3, value: ""},
    {id: 4, value: ""},
    {id: 5, value: ""},
    {id: 6, value: ""},
    {id: 7, value: ""},
    {id: 8, value: ""},
    {id: 9, value: ""},
  ]
  const [player, setPlayer] = useState("X")
  const [enemy, setEnemy] = useState("")
  const [children, setChildren] = useState(initialValues)

  const handleChange = (id) => {
      setChildren(s => {
        return s.map(child => {
        if (child.id === id){
          return {...child, value: player}
        }
        return child
      })
    })
  }

  useEffect(() => {
    setEnemy(player === "X" ? "O" : "X")
  }, [])

  console.log("P", player)
  console.log("E", enemy)
  return (
    <div>
      <div id="parentDiv" className=" bg-slate-900 p-4 text-white grid grid-cols-3 border-4 border-slate-950 rounded-xl min-w-40 mx-auto min-h-16">
        {children.map(child => (
          <Square key={child.id} value={child.value} onClick={() => handleChange(child.id)}></Square>
        ))}
        
      </div>
      <button className="my-4 bg-red-800 text-white p-2 rounded-lg hover:bg-red-600 focus:bg-red-600">Reset</button>
    </div>
  )
}

export default App
