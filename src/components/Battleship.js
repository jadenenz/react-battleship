import React, { useState, useEffect } from "react"
import Selection from "./Selection"
import Grid from "./Grid"
import Winner from "./Winner"

function Battleship() {
  //Initialize the boards for the player and the computer
  //boardNum === 1 for playerBoard, 2 for ComputerBoard
  const initializeBoard = () => {
    // console.log("initialize board called")
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
  const [attacksReceived, setAttacksReceived] = useState({
    player: [],
    computer: [],
  })
  const [activeShip, setActiveShip] = useState(null)
  const [shipAlignment, setShipAlignment] = useState("h")

  //states for which ships have been placed on the board
  const [shipsPlaced, setShipsPlaced] = useState({
    carrier: false,
    battleship: false,
    cruiser: false,
    submarine: false,
    destroyer: false,
  })

  //state for displaying game winner information
  //true for player win, false for computer win, null for
  //no winner yet
  const [playerWon, setPlayerWon] = useState(null)

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
  const checkPlacement = (ship, alignment, x, y, board) => {
    const verticalMin = y - ship.length
    const horizontalMax = ship.length + x
    for (let i = 0; i < ship.length; i++) {
      if (alignment === "v") {
        if (verticalMin <= 10 && x <= 10 && y <= 10) {
          if (board[x][y - i] !== null) {
            return false
          }
        } else {
          return false
        }
      } else if (alignment === "h") {
        if (horizontalMax <= 10 && y <= 10) {
          if (board[x + i][y] !== null) {
            return false
          }
        } else {
          return false
        }
      }
    }
    return true
  }

  //helper function to get a random xy
  const getRandomXY = () => {
    const max = 10
    let results = {}
    results.x = Math.floor(Math.random() * max)
    results.y = Math.floor(Math.random() * max)

    return results
  }

  const takeRandomHit = () => {
    let random = getRandomXY()
    let target = [random.x, random.y]
    while (isArrayinArray(attacksReceived.player, target)) {
      random = getRandomXY()
      target = [random.x, random.y]
    }

    takeHit(random.x, random.y, 1)
  }

  const placeShip = (ship, alignment, x, y) => {
    if (checkPlacement(ship, alignment, x, y, playerBoard)) {
      const boardCopy = [...playerBoard]
      for (let i = 0; i < ship.length; i++) {
        if (alignment === "v") {
          boardCopy[x][y - i] = ship
        } else if (alignment === "h") {
          boardCopy[x + i][y] = ship
        }
      }
      setPlayerBoard(boardCopy)
    } else {
      throw new Error("invalid placement")
    }
  }

  const placeComputerShip = (ship, alignment, x, y) => {
    if (checkPlacement(ship, alignment, x, y, computerBoard)) {
      const boardCopy = [...computerBoard]
      for (let i = 0; i < ship.length; i++) {
        if (alignment === "v") {
          boardCopy[x][y - i] = ship
        } else if (alignment === "h") {
          boardCopy[x + i][y] = ship
        }
      }
      setComputerBoard(boardCopy)
    } else {
      throw new Error("invalid placement")
    }
  }

  const placeComputerShipRandomly = (ship) => {
    let random = getRandomXY()
    const max = 2
    const rng = Math.floor(Math.random() * max)
    let alignment
    if (rng === 0) {
      alignment = "v"
    } else if (rng === 1) {
      alignment = "h"
    }
    while (
      !checkPlacement(ship, alignment, random.x, random.y, computerBoard)
    ) {
      // console.log("loop")
      random = getRandomXY()
    }
    console.log("x: ", random.x, "y: ", random.y)
    placeComputerShip(ship, alignment, random.x, random.y)
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

  const takeHit = (x, y, board) => {
    //if the spot has not been attacked before,
    //add it to attacksReceived array
    const target = [x, y]
    if (board === 1) {
      if (isArrayinArray(attacksReceived.player, target)) {
        throw new Error("this location has already been hit")
      }
      setAttacksReceived((prevAttacksReceived) => {
        return {
          ...prevAttacksReceived,
          player: [...prevAttacksReceived.player, [x, y]],
        }
      })
    } else if (board === 2) {
      if (isArrayinArray(attacksReceived.computer, target)) {
        throw new Error("this location has already been hit")
      }
      setAttacksReceived((prevAttacksReceived) => {
        return {
          ...prevAttacksReceived,
          computer: [...prevAttacksReceived.computer, [x, y]],
        }
      })
    }

    if (board === 1) {
      const boardCopy = [...playerBoard]
      const targetSpot = boardCopy[x][y]
      // console.log("targetSpot: ", targetSpot)
      if (targetSpot !== null) {
        targetSpot.hitsTaken += 1
        if (targetSpot.hitsTaken === targetSpot.length) {
          targetSpot.isSunk = true
          if (CheckIfAllSunk(boardCopy)) {
            setPlayerWon(false)
          }
        }
      }
      setPlayerBoard(boardCopy)
    } else if (board === 2) {
      const boardCopy = [...computerBoard]
      const targetSpot = boardCopy[x][y]
      // console.log("targetSpot: ", targetSpot)
      if (targetSpot !== null) {
        targetSpot.hitsTaken += 1
        if (targetSpot.hitsTaken === targetSpot.length) {
          targetSpot.isSunk = true
          if (CheckIfAllSunk(boardCopy)) {
            setPlayerWon(true)
          }
        }
      }
      setComputerBoard(boardCopy)
    }
  }

  const setupComputerShips = () => {
    const carrier = shipFactory(5)
    const battleship = shipFactory(4)
    const cruiser = shipFactory(3)
    const submarine = shipFactory(3)
    const destroyer = shipFactory(2)
    cruiser.isCruiser = true

    placeComputerShipRandomly(carrier)
    placeComputerShipRandomly(battleship)
    placeComputerShipRandomly(cruiser)
    placeComputerShipRandomly(submarine)
    placeComputerShipRandomly(destroyer)
  }

  const handleStartGame = () => {
    setupComputerShips()
  }

  useEffect(() => {
    initializeBoard(1)
    initializeBoard(2)
  }, [])

  const handleAlignmentChange = () => {
    shipAlignment === "h" ? setShipAlignment("v") : setShipAlignment("h")
  }

  return (
    <div className="Battleship">
      <div className="Battleship--title">
        <p>Battleship</p>
      </div>

      <div className="Battleship-buttons">
        <button onClick={handleAlignmentChange}>
          Change Alignment: {shipAlignment === "h" ? "Horizontal" : "Vertical"}
        </button>
        <button onClick={handleStartGame}>Start Game</button>
      </div>

      <div className="gamespace--container">
        <Selection setActiveShip={setActiveShip} shipsPlaced={shipsPlaced} />

        <div className="boards-container">
          <div>
            <h2>Your Board</h2>
            <Grid
              board={playerBoard}
              attacksReceived={attacksReceived.player}
              isArrayinArray={isArrayinArray}
              takeHit={takeHit}
              activeShip={activeShip}
              placeShip={placeShip}
              setActiveShip={setActiveShip}
              setShipsPlaced={setShipsPlaced}
              shipAlignment={shipAlignment}
              boardId={1}
            />
          </div>

          <div>
            <h2>Computer Board</h2>
            <Grid
              board={computerBoard}
              attacksReceived={attacksReceived.computer}
              isArrayinArray={isArrayinArray}
              takeHit={takeHit}
              boardId={2}
              takeRandomHit={takeRandomHit}
            />
          </div>
        </div>
        {playerWon !== null && <Winner playerWon={playerWon} />}
      </div>
    </div>
  )
}

//    (DONE)track if all ships on the board have been sunk
//    (DONE)make the div on board interactible by clicking (data attributes?)
//    (DONE)set up the ui for clicking ships and then clicking the board to add them
//    (DONE)make 2 different boards for the player and pc with different display rules
//    (DONE)add a function that makes the computer do a random attack that is hasn't done yet
//    (DONE) set up logic for alternating turns
//    (DONE)set up logic for winning the game
//make it impossible to attack the board before the game has been started
//make start game unavailable until all player ships have been placed down
//make start game button go away once the game has been started

export default Battleship
