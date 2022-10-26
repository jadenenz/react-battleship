function Winner({ playerWon }) {
  return (
    <div className="Winner">
      {playerWon
        ? "Congratulations, you sunk their battleship!"
        : "Oh no! Your battleship was sunk"}
    </div>
  )
}

export default Winner
