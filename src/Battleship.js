import React from "react"

function Battleship() {
  const [playerBoard, setPlayerBoard] = React.useState(null)
  const [computerBoard, setComputerBoard] = React.useState(null)

  //Initialize the boards for the player and the computer
  //boardNum === 1 for playerBoard, 2 for ComputerBoard
  const initializeBoard = (boardNum) => {
    console.log("initialize board called")
    let board = []
    const size = 10

    for (let x = 0; x < size; x++) {
      let row = []
      for (let y = 0; y < size; y++) {
        row.push(null)
      }
      board.push(row)
    }
    if (boardNum === 1) {
      setPlayerBoard(board)
    } else if (boardNum === 2) {
      setComputerBoard(board)
    } else {
      throw new Error("invalid board Num")
    }
  }

  //given length returns ship object that stores length
  // and # of hits taken
  const shipFactory = (length) => {
    return {
      length: length,
      hitsTaken: 0,
    }
  }

  //helper function that cheks for valid positioning of ships
  const checkPlacement = (ship, alignment, x, y) => {
    const verticalMax = ship.length + y
    const horizontalMax = ship.length + x
    for (let i = 0; i < ship.length; i++) {
      if (alignment === "v") {
        if (verticalMax <= 9 && x <= 9) {
          if (playerBoard[x][y + i] !== null) {
            return false
          }
        } else {
          return false
        }
      } else if (alignment === "h") {
        if (horizontalMax <= 9 && y <= 9) {
          if (playerBoard[x + i][y] !== null) {
            return false
          }
        } else {
          return false
        }
      }
    }
    return true
  }

  const placeShip = (ship, alignment, x, y) => {
    if (checkPlacement(ship, alignment, x, y)) {
      const boardCopy = playerBoard
      for (let i = 0; i < ship.length; i++) {
        if (alignment === "v") {
          boardCopy[x][y + i] = ship
        } else if (alignment === "h") {
          boardCopy[x + i][y] = ship
        }
      }
      setPlayerBoard(boardCopy)
    }
  }

  const handleClick = () => {
    const submarine = shipFactory(3)
    console.log(submarine)
    placeShip(submarine, "h", 0, 0)
  }

  React.useEffect(() => {
    initializeBoard(1)
    initializeBoard(2)
  }, [])

  React.useEffect(() => {
    console.log("playerBoard: ", playerBoard)
    console.log("computerBoard: ", computerBoard)
  }, [playerBoard, computerBoard])

  return (
    <div className="battleship">
      <p>battleship</p>
      <button onClick={handleClick}>test placement</button>
    </div>
  )
}

//initial thoughts on how to approach:

//most of the game logic is held at the top level.

//one state for each gameboard (two dimensional array)

//helper function that creates and places ship objects (objects that store
//ship length, # of hits taken, and isSunk boolean)

//player turn could potentially be a boolean that flips every time a move is made

//lower components are visual display components

export default Battleship
