import React, { useState, useEffect, useCallback } from "react"

function Grid({
  board,
  attacksReceived,
  isArrayinArray,
  takeHit,
  activeShip,
  placeShip,
  setActiveShip,
  setShipsPlaced,
}) {
  const [gridDivs, setGridDivs] = useState(null)

  const handleClick = useCallback(
    (e) => {
      //helper function to set which ship has been placed
      const setCorrectShipPlaced = (activeShip) => {
        if (activeShip.length === 5) {
          setShipsPlaced((prevShipsPlaced) => {
            return {
              ...prevShipsPlaced,
              carrier: true,
            }
          })
        } else if (activeShip.length === 4) {
          setShipsPlaced((prevShipsPlaced) => {
            return {
              ...prevShipsPlaced,
              battleship: true,
            }
          })
        } else if (activeShip.length === 2) {
          setShipsPlaced((prevShipsPlaced) => {
            return {
              ...prevShipsPlaced,
              destroyer: true,
            }
          })
        } else if (activeShip.length === 3) {
          if (activeShip.isCruiser) {
            setShipsPlaced((prevShipsPlaced) => {
              return {
                ...prevShipsPlaced,
                cruiser: true,
              }
            })
          } else {
            setShipsPlaced((prevShipsPlaced) => {
              return {
                ...prevShipsPlaced,
                submarine: true,
              }
            })
          }
        }
      }
      //if there is currently an active ship
      const x = parseInt(e.target.dataset.x)
      const y = parseInt(e.target.dataset.y)
      if (activeShip !== null) {
        placeShip(activeShip, "h", x, y)
        setActiveShip(null)
        setCorrectShipPlaced(activeShip)
      } else {
        takeHit(x, y)
      }
    },
    [takeHit, placeShip, activeShip, setActiveShip, setShipsPlaced]
  )

  useEffect(() => {
    function updateGrid() {
      // console.log("updating board")
      const gridDivs = board.map((row, index) => {
        const x = index
        return row.map((boardSpace, index) => {
          const y = index
          let classes = "boardSpace"
          const target = [x, y]
          //if target is found in attacksReceived array
          // console.log(
          //   "the target was found in attacksArray",
          //   isArrayinArray(attacksReceived, target)
          // )
          if (isArrayinArray(attacksReceived, target)) {
            classes += " attacked"
          }
          if (boardSpace === null) {
            classes += " empty"
          } else {
            classes += " ship"
            if (boardSpace.isSunk) {
              classes += " sunk"
            }
          }
          const newDiv = (
            <div
              onClick={handleClick}
              data-x={x}
              data-y={y}
              className={classes}
              key={target}
            ></div>
          )
          return newDiv
        })
      })
      setGridDivs(gridDivs)
    }
    updateGrid()
  }, [board, attacksReceived, handleClick, isArrayinArray])

  return <div className="Grid">{gridDivs}</div>
}

export default Grid
