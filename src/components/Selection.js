import React from "react"

function Selection({ setActiveShip }) {
  //given length returns ship object that stores length
  // and # of hits taken
  const shipFactory = (length) => {
    return {
      length: length,
      hitsTaken: 0,
      isSunk: false,
    }
  }

  const carrier = shipFactory(5)
  const battleship = shipFactory(4)
  const cruiser = shipFactory(3)
  const submarine = shipFactory(3)
  const destroyer = shipFactory(2)

  //this currently stores the object but i think it needs to be the name of the ship as a string
  const handleClick = (ship) => {
    setActiveShip(ship)
  }

  return (
    <div className="Selection">
      <div className="selection--title">Ships</div>
      <div className="selection--button-container">
        <button onClick={() => handleClick(carrier)}>Carrier</button>
        {/* <button onClick={handleClick(battleship)}>Battleship</button>
        <button onClick={handleClick(cruiser)}>Cruiser</button>
        <button onClick={handleClick(submarine)}>Submarine</button>
        <button onClick={handleClick(destroyer)}>Destroyer</button> */}
      </div>
    </div>
  )
}

export default Selection
