import React, { useState, useEffect } from "react"

function Grid({ board, attacksReceived }) {
  const [gridDivs, setGridDivs] = useState(null)

  //helper function that returns true if an array
  //is contained in another array
  function isArrayinArray(arr, item) {
    const stringifiedItem = JSON.stringify(item)

    const contains = arr.some(function (ele) {
      return JSON.stringify(ele) === stringifiedItem
    })
    return contains
  }

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
          if (isArrayinArray(attacksReceived, target)) {
            classes += " attacked"
          }
          if (boardSpace === null) {
            classes += " empty"
          } else {
            classes += " ship"
          }
          const newDiv = <div className={classes}></div>
          return newDiv
        })
      })
      setGridDivs(gridDivs)
    }
    updateGrid()
  }, [board])

  return <div className="Grid">{gridDivs}</div>
}

export default Grid
