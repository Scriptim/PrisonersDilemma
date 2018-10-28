const plotCooperationRatio = (prisoner, div) => {
  const cooperated = prisoner.history.filter(x => x).length
  const defected = prisoner.history.filter(x => !x).length

  const data = [{
    values: [cooperated, defected],
    labels: ['Cooperated', 'Defected'],
    type: 'pie',
    marker: {
      colors: ['#86a361', '#a7342d']
    },
    textfont: {
      color: '#ffffff'
    }
  }]

  const layout = {
    height: 400,
    width: 400,
    showlegend: false,
  }

  Plotly.newPlot(div, data, layout, { displayModeBar: false })
}
