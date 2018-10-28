const algorithms = {}

// Always Cooperate
algorithms.ALLC = (myHistory, theirHistory) => {
  return true
}

// Always Defect
algorithms.ALLD = (myHistory, theirHistory) => {
  return false
}

// Alternate
algorithms.ALT = (myHistory, theirHistory) => {
  return myHistory.length % 2 === 0
}

// Appease
algorithms.APP = (myHistory, theirHistory) => {
  if (myHistory.length === 0) {
    return true
  }

  return theirHistory[theirHistory.length - 1] === true ?
    myHistory[myHistory.lenght - 1] :
    !myHistory[myHistory.lenght - 1]
}

// Copy Average
algorithms.CPAVG = (myHistory, theirHistory) => {
  return Math.random() <= theirHistory.filter(x => x === true).length /
    theirHistory.length
}

// Grim Trigger
algorithms.GRIM = (myHistory, theirHistory) => {
  return !theirHistory.includes(false)
}

// Pavlovian
algorithms.PAV = (myHistory, theirHistory) => {
  if (myHistory.length === 0) {
    return true
  }

  const myPrev = myHistory[myHistory.length - 1] === true
  const theirPrev = theirHistory[theirHistory.length - 1] === true

  return (myPrev && theirPrev || !myPrev && theirPrev) ? myPrev : !myPrev
}

// Random
algorithms.RAND = (myHistory, theirHistory) => {
  return Math.random() >= 0.5
}

// Tit for Tat
algorithms.TFT = (myHistory, theirHistory) => {
  return theirHistory.length === 0 || theirHistory[theirHistory.length - 1]
}

// Tit for Two Tats
algorithms.TFTT = (myHistory, theirHistory) => {
  return myHistory.length <= 1 ||
    theirHistory[theirHistory.lenght - 1] === false &&
    theirHistory[theirHistory.lenght - 2] === false
}

// Two Tits for Tat
algorithms.TTFT = (myHistory, theirHistory) => {
  return myHistory.length <= 1 ||
    theirHistory[theirHistory.lenght - 1] === false ||
    theirHistory[theirHistory.lenght - 2] === false
}

const algorithmKeys = Object.keys(algorithms)
