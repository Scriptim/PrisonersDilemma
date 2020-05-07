const algorithms = {}

// Always Cooperate
algorithms.ALLC = {
  name: 'Always Cooperate',
  description: 'Cooperate every move.',
  turn: (myHistory, theirHistory) => true
}

// Always Defect
algorithms.ALLD = {
  name: 'Always Defect',
  description: 'Defect every move.',
  turn: (myHistory, theirHistory) => false
}

// Alternate
algorithms.ALT = {
  name: 'Alterante',
  description: 'Start by cooperating, then cooperate and defect alternately.',
  turn: (myHistory, theirHistory) => {
    return myHistory.length % 2 === 0
  }
}

// Appease
algorithms.APP = {
  name: 'Appease',
  description: 'Start by cooperating, then repeat your previous move if the other player has cooperated or do the opposite if they have defected.',
  turn: (myHistory, theirHistory) => {
    if (myHistory.length === 0) {
      return true
    }

    return theirHistory[theirHistory.length - 1] === true ?
      myHistory[myHistory.length - 1] :
      !myHistory[myHistory.length - 1]
  }
}

// Copy Average
algorithms.CPAVG = {
  name: 'Copy Average',
  description: 'Choose a random move, but with a probability distribution that matches the other player\'s move distribution. In other words, if the other player has cooperated for 20% of the time, cooperate with a probability of 20%.',
  turn: (myHistory, theirHistory) => {
    return Math.random() <= theirHistory.filter(x => x === true).length /
      theirHistory.length
  }
}

// Grim Trigger
algorithms.GRIM = {
  name: 'Grim Trigger',
  description: 'Cooperate until the other player defects, after that always defect.',
  turn: (myHistory, theirHistory) => {
    return !theirHistory.includes(false)
  }
}

// Pavlovian
algorithms.PAV = {
  name: 'Pavlovian',
  description: 'Start by cooperating, then repeat the previous move if had a positive outcome or do the opposite otherwise.',
  turn: (myHistory, theirHistory) => {
    if (myHistory.length === 0) {
      return true
    }

    const myPrev = myHistory[myHistory.length - 1] === true
    const theirPrev = theirHistory[theirHistory.length - 1] === true

    return (myPrev && theirPrev || !myPrev && theirPrev) ? myPrev : !myPrev
  }
}

// Random
algorithms.RAND = {
  name: 'Random',
  description: 'Make a random move.',
  turn: (myHistory, theirHistory) => {
    return Math.random() >= 0.5
  }
}

// Tit for Tat
algorithms.TFT = {
  name: 'Tit for Tat',
  description: 'Start by cooperating, then copy the other player\'s moves.',
  turn: (myHistory, theirHistory) => {
    return theirHistory.length === 0 || theirHistory[theirHistory.length - 1]
  }
}

// Tit for Two Tats
algorithms.TFTT = {
  name: 'Tit for Two Tats',
  description: 'Always cooperate, unless the other player has defected the last two times.',
  turn: (myHistory, theirHistory) => {
    return myHistory.length <= 1 ||
      theirHistory[theirHistory.length - 1] === true ||
      theirHistory[theirHistory.length - 2] === true
  }
}

// Two Tits for Tat
algorithms.TTFT = {
  name: 'Two Tits for Tat',
  description: 'Always cooperate, unless the other player has betrayed at least once in the last two moves.',
  turn: (myHistory, theirHistory) => {
    return myHistory.length <= 1 ||
      theirHistory[theirHistory.length - 1] === false ||
      theirHistory[theirHistory.length - 2] === false
  }
}

const algorithmKeys = Object.keys(algorithms)

const tableBody = document.querySelector('#algorithms tbody')
for (let algorithm of algorithmKeys) {
  const tr = document.createElement('tr')
  const tdName = document.createElement('td')
  tdName.innerHTML = `${algorithms[algorithm].name} (${algorithm})`
  tr.appendChild(tdName)
  const tdDesc = document.createElement('td')
  tdDesc.innerHTML = algorithms[algorithm].description
  tr.appendChild(tdDesc)
  tableBody.appendChild(tr)
}
