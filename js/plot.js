const plotAverageScoreIncrease = () => {
  const data = []
  for (let algorithm1 of algorithmKeys) {
    let trace = {
      x: algorithmKeys,
      y: [],
      mode: 'markers',
      name: algorithm1
    }

    for (let algorithm2 of algorithmKeys) {
      let prisonersDilemma = new PrisonersDilemma({
        algorithm1,
        algorithm2,
        iterate: 101
      })

      trace.y.push(prisonersDilemma.prisoner2.averageScore())
    }

    data.push(trace)
  }

  const layout = {
    xaxis: {
      title: 'Algorithm'
    },
    yaxis: {
      title: 'Average Score Increase'
    }
  }

  Plotly.newPlot('averagePlot', data, layout, { displayModeBar: false })
}

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
