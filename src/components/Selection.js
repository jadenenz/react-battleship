import React from "react"

function Selection({ setActiveShip, shipsPlaced }) {
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
  cruiser.isCruiser = true

  //this currently stores the object but i think it needs to be the name of the ship as a string
  const handleClick = (ship) => {
    setActiveShip(ship)
  }

  return (
    <div className="Selection">
      <div className="selection--title">Ships</div>
      <div className="selection--button-container">
        {!shipsPlaced.carrier && (
          <button onClick={() => handleClick(carrier)}>
            Carrier - Length: 5
          </button>
        )}
        {!shipsPlaced.battleship && (
          <button onClick={() => handleClick(battleship)}>
            Battleship - Length: 4
          </button>
        )}
        {!shipsPlaced.cruiser && (
          <button onClick={() => handleClick(cruiser)}>
            Cruiser - Length: 3
          </button>
        )}
        {!shipsPlaced.submarine && (
          <button onClick={() => handleClick(submarine)}>
            Submarine - Length: 3
          </button>
        )}
        {!shipsPlaced.destroyer && (
          <button onClick={() => handleClick(destroyer)}>
            Destroyer - Length: 2
          </button>
        )}
      </div>
    </div>
  )
}

export default Selection
