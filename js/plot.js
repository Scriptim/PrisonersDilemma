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

const plotAlgorithmAnalysis = (algorithm, average) => {
  const data = []

  for (let algorithm2 of algorithmKeys) {
    let trace = {
      x: [],
      y: [],
      mode: 'lines',
      name: algorithm2
    }

    let prisonersDilemma = new PrisonersDilemma({
      algorithm1: algorithm,
      algorithm2
    })

    for (let i = 0; i <= 100; i++) {
      trace.x.push(i)

      if (average) {
        trace.y.push(prisonersDilemma.prisoner1.averageScore())
      } else {
        trace.y.push(prisonersDilemma.prisoner1.score)
      }

      prisonersDilemma.next()
    }

    data.push(trace)
  }

  const layout = {
    title: average ? 'Average' : 'Total',
    xaxis: {
      title: 'Iteration'
    },
    yaxis: {
      title: 'Own Score'
    }
  }

  const div = 'coursePlot' + (average ? 'Avg' : '')
  Plotly.newPlot(div, data, layout, { displayModeBar: false })
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
