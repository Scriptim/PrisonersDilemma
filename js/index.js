const urlParams = new URLSearchParams(window.location.search)

const s1 = document.getElementById('s1')
const s2 = document.getElementById('s2')
const a = document.getElementById('a')
for (let algorithm of algorithmKeys) {
  let option = document.createElement('option')
  option.value = algorithm
  option.innerHTML = algorithm
  option.title = algorithms[algorithm].name
  s1.appendChild(option)
  s2.appendChild(option.cloneNode(true))
  a.appendChild(option.cloneNode(true))
}
s1.value = urlParams.get('s1') || 'RAND'
s2.value = urlParams.get('s2') || 'RAND'
a.value = urlParams.get('a') || 'RAND'

const n = parseInt(urlParams.get('i') || 3)
writeIterations(s1.value, s2.value, n)
document.getElementById('i').value = n

const table = document.getElementById('table')
table.querySelector('h3').after(generateTable())
tableHeatmap(document.getElementById('heatmap'), table.querySelector('table'))

plotAverageScoreIncrease()

if (a.value !== null) {
  plotAlgorithmAnalysis(a.value, false)
  plotAlgorithmAnalysis(a.value, true)

  const heading = document.getElementById('algorithm').querySelector('h2')
  heading.innerHTML += `: ${a.value}`
}
