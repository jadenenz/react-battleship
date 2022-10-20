import React, { useState, useEffect } from "react"
import Selection from "./Selection"
import Grid from "./Grid"

function Battleship() {
  //Initialize the boards for the player and the computer
  //boardNum === 1 for playerBoard, 2 for ComputerBoard
  const initializeBoard = () => {
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
    return board
  }
  const [playerBoard, setPlayerBoard] = useState(initializeBoard)
  const [computerBoard, setComputerBoard] = useState(initializeBoard)
  const [attacksReceived, setAttacksReceived] = useState([])
  const [activeShip, setActiveShip] = useState(null)

  //Initialize the boards for the player and the computer
  //boardNum === 1 for playerBoard, 2 for ComputerBoard
  // const initializeBoard = () => {
  //   console.log("initialize board called")
  //   let board = []
  //   const size = 10

  //   for (let x = 0; x < size; x++) {
  //     let row = []
  //     for (let y = 0; y < size; y++) {
  //       row.push(null)
  //     }
  //     board.push(row)
  //   }
  //   return board
  // if (boardNum === 1) {
  //   setPlayerBoard(board)
  // } else if (boardNum === 2) {
  //   setComputerBoard(board)
  // } else {
  //   throw new Error("invalid board Num")
  // }
  // }

  //given length returns ship object that stores length
  // and # of hits taken
  const shipFactory = (length) => {
    return {
      length: length,
      hitsTaken: 0,
      isSunk: false,
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
      const boardCopy = [...playerBoard]
      for (let i = 0; i < ship.length; i++) {
        if (alignment === "v") {
          boardCopy[x][y + i] = ship
        } else if (alignment === "h") {
          boardCopy[x + i][y] = ship
        }
      }
      setPlayerBoard(boardCopy)
    } else {
      throw new Error("invalid placement")
    }
  }

  //helper function that returns true if an array
  //is contained in another array
  function isArrayinArray(arr, item) {
    const stringifiedItem = JSON.stringify(item)

    const contains = arr.some(function (ele) {
      return JSON.stringify(ele) === stringifiedItem
    })
    return contains
  }

  //takes one of the boards (either player or computer)
  //as its argument to check if all ships placed are sunk
  //returns true or false
  const CheckIfAllSunk = (board) => {
    let allSunk = true
    const boardCopy = [...board]
    boardCopy.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== null) {
          if (cell.isSunk === false) {
            allSunk = false
          }
        }
      })
    })
    return allSunk
  }

  const takeHit = (x, y) => {
    //if the spot has not been attacked before,
    //add it to attacksReceived array
    const target = [x, y]
    if (isArrayinArray(attacksReceived, target)) {
      throw new Error("this location has already been hit")
    }
    setAttacksReceived((prevAttacksReceived) => {
      return [...prevAttacksReceived, [x, y]]
    })
    const boardCopy = [...playerBoard]
    const targetSpot = boardCopy[x][y]
    console.log("targetSpot: ", targetSpot)
    if (targetSpot !== null) {
      targetSpot.hitsTaken += 1
      if (targetSpot.hitsTaken === targetSpot.length) {
        targetSpot.isSunk = true
        if (CheckIfAllSunk(boardCopy)) {
          console.log("you loseded")
        }
      }
    }
    setPlayerBoard(boardCopy)
  }

  const handleClick = () => {
    const submarine = shipFactory(3)
    console.log(submarine)
    placeShip(submarine, "h", 0, 0)
  }

  const handleClick2 = () => {
    const destroyer = shipFactory(5)
    console.log(destroyer)
    placeShip(destroyer, "v", 4, 1)
  }

  const handleTestFire = () => {
    takeHit(1, 0)
    // takeHit(0, 0)
    // takeHit(2, 0)
  }

  const handleMisfire = () => {
    takeHit(6, 7)
  }

  const handleBoardCheck = () => {
    console.log(CheckIfAllSunk(playerBoard))
  }

  useEffect(() => {
    initializeBoard(1)
    initializeBoard(2)
  }, [])

  useEffect(() => {
    console.log("effect ran -- playerBoard updated.")
  }, [playerBoard])

  console.log("playerBoard: ", playerBoard)
  return (
    <div className="battleship">
      <p>battleship</p>
      <Selection setActiveShip={setActiveShip} />
      <button onClick={handleClick}>test placement</button>
      <button onClick={handleClick2}>other ship</button>
      <button onClick={handleTestFire}>test fire1</button>
      <button onClick={handleMisfire}>test misfire</button>
      <button onClick={handleBoardCheck}>test check</button>
      {/* <button onClick={handleTestFire2}></button> */}

      <Grid
        board={playerBoard}
        attacksReceived={attacksReceived}
        isArrayinArray={isArrayinArray}
        takeHit={takeHit}
        activeShip={activeShip}
      />
    </div>
  )
}

//    (DONE)track if all ships on the board have been sunk
//    (DONE)make the div on board interactible by clicking (data attributes?)
// set up the ui for clicking ships and then clicking the board to add them
// make 2 different boards for the player and pc with different display rules
// add a function that makes the computer do a random attack that is hasn't done yet
// set up logic for alternating turns
// set up logic for winning the game

//player turn could potentially be a boolean that flips every time a move is made

//lower components are visual display components

export default Battleship
