import React, { useState, useEffect, useCallback } from "react"

function Grid({ board, attacksReceived, isArrayinArray, takeHit }) {
  const [gridDivs, setGridDivs] = useState(null)

  //isArrayinArray is NOT returning true at all for the handle click version of the function but calling the function with a button works fine.
  const handleClick = useCallback(
    (e) => {
      const x = parseInt(e.target.dataset.x)
      const y = parseInt(e.target.dataset.y)
      takeHit(x, y)
    },
    [takeHit]
  )

  useEffect(() => {
    function updateGrid() {
      console.log("updating board")
      const gridDivs = board.map((row, index) => {
        const x = index
        return row.map((boardSpace, index) => {
          const y = index
          let classes = "boardSpace"
          const target = [x, y]
          //if target is found in attacksReceived array
          console.log(
            "the target was found in attacksArray",
            isArrayinArray(attacksReceived, target)
          )
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
