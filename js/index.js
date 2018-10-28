const urlParams = new URLSearchParams(window.location.search)

const s1 = document.getElementById('s1')
const s2 = document.getElementById('s2')
for (let algorithm of algorithmKeys) {
  let option = document.createElement('option')
  option.value = algorithm
  option.innerHTML = algorithm
  s1.appendChild(option)
  s2.appendChild(option.cloneNode(true))
}
s1.value = urlParams.get('s1') || 'RAND'
s2.value = urlParams.get('s2') || 'RAND'

const n = parseInt(urlParams.get('i') || 3)
writeIterations(s1.value, s2.value, n)
document.getElementById('i').value = n

const table = document.getElementById('table')
table.querySelector('h3').after(generateTable())
