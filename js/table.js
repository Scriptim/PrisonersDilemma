const generateTable = () => {
  const table = document.createElement('table')
  table.className = 'table-hover'

  table.appendChild(thead())

  const { tbody, minValue, maxValue } = tableData()

  table.appendChild(tbody)
  table.setAttribute('data-min', minValue)
  table.setAttribute('data-max', maxValue)

  return table
}

const tableHeatmap = (checkbox, table) => {
  const minValue = table.getAttribute('data-min')
  const maxValue = table.getAttribute('data-max')

  checkbox.onchange = event => {
    for (let td of table.querySelectorAll('td')) {
      if (checkbox.checked) {
        let num = parseFloat(td.innerHTML)
        let alpha = (num - minValue) / (maxValue - minValue)
        td.style.backgroundColor = `rgba(255, 72, 0, ${alpha})`
      } else {
        td.removeAttribute('style')
      }
    }
  }
}

const thead = () => {
  const tr = document.createElement('tr')
  tr.appendChild(document.createElement('th'))
  for (let algorithm of algorithmKeys) {
    let th = document.createElement('th')
    th.innerHTML = algorithm
    tr.appendChild(th)
  }
  const thead = document.createElement('thead')
  thead.appendChild(tr)
  return thead
}

const tableData = () => {
  const tbody = document.createElement('tbody')

  let minValue = Infinity
  let maxValue = -Infinity

  for (let algorithm1 of algorithmKeys) {
    let tr = document.createElement('tr')
    let th = document.createElement('th')
    th.innerHTML = algorithm1
    tr.appendChild(th)

    for (let algorithm2 of algorithmKeys) {
      let prisonersDilemma = new PrisonersDilemma({
        algorithm1,
        algorithm2,
        iterate: 100
      })

      let td = document.createElement('td')
      let value = prisonersDilemma.prisoner2.averageScore()
      td.innerHTML = value

      minValue = Math.min(minValue, value)
      maxValue = Math.max(maxValue, value)

      tr.appendChild(td)
    }

    tbody.appendChild(tr)
  }

  return { tbody, minValue, maxValue }
}
