

const Square = ({value, onClick}) => {
  return (
    <input className=" border text-8xl font-bold text-center min-w-40 " type="button" value={value} disabled={value !== ""} onClick={onClick}></input>
  )
}

export default Square