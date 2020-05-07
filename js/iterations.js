const iterationTd = (prisoner, prev) => {
  const td = document.createElement('td')
  td.innerHTML = prisoner.score

  td.innerHTML += '&nbsp;'.repeat(4)

  td.innerHTML += prisoner.history[prisoner.history.length - 1] === true ?
    `<span class="badge success" title="cooperated">&#10004;</span>` :
    `<span class="badge danger" title="defected">&#10008;</span>`

  td.innerHTML += '&nbsp;'.repeat(2)

  let diff = prisoner.score - prev
  if (diff >= 0) {
    diff = '+' + diff
  }
  td.innerHTML += `<span class="badge">${diff}</span>`

  return td
}

const writeTbody = (prisonersDilemma, iterations, tbody) => {
  let prev1 = 0
  let prev2 = 0

  for (let i = 1; i <= iterations; i++) {
    prisonersDilemma.next()

    let tr = document.createElement('tr')
    let td = document.createElement('td')

    td.innerHTML = i
    tr.appendChild(td)

    tr.appendChild(iterationTd(prisonersDilemma.prisoner1, prev1))
    tr.appendChild(iterationTd(prisonersDilemma.prisoner2, prev2))

    tbody.appendChild(tr)

    prev1 = prisonersDilemma.prisoner1.score
    prev2 = prisonersDilemma.prisoner2.score
  }
}

const averageScoreFootTd = prisoner => {
  const span = document.createElement('span')
  span.className = 'badge'
  span.innerHTML = Math.round(prisoner.averageScore() * 1000) / 1000

  const td = document.createElement('td')
  td.appendChild(span)

  return td
}

const writeIterations = (algorithm1, algorithm2, iterations) => {
  const game = document.getElementById('game')

  const algorithmElem1 = `<span popover-left="${algorithms[algorithm1].name}">${algorithm1}</span>`
  const algorithmElem2 = `<span popover-right="${algorithms[algorithm2].name}">${algorithm2}</span>`
  game.querySelector('h2').innerHTML = `${algorithmElem1} vs. ${algorithmElem2}`
  const ths = game.querySelectorAll('thead > tr > th')
  ths[1].innerHTML = `${algorithm1}'s score`
  ths[2].innerHTML = `${algorithm2}'s score`

  const prisonersDilemma = new PrisonersDilemma({
    algorithm1,
    algorithm2
  })
  writeTbody(prisonersDilemma, iterations, game.querySelector('tbody'))

  const tfootTr = game.querySelector('tfoot > tr')
  tfootTr.appendChild(averageScoreFootTd(prisonersDilemma.prisoner1))
  tfootTr.appendChild(averageScoreFootTd(prisonersDilemma.prisoner2))

  plotCooperationRatio(prisonersDilemma.prisoner1, 'ratio1')
  plotCooperationRatio(prisonersDilemma.prisoner2, 'ratio2')
}
