import './styles.css'
import { Chart } from 'chart.js/auto'
import { csvParse } from 'd3'

Chart.defaults.color = 'white' // sets default font color

async function loadAndChartData() {
  const response = await fetch('data/police_shootings_wide.csv')
	const csvText = await response.text()
	const data = csvParse(csvText)
	
  const ctx = document.getElementById('chart')
  const ctx2 = document.getElementById('chart2')
	console.log(ctx)

  new Chart(
    ctx, 
    {
      type: 'line',
      data: {
        labels: data.map(d => d.Year),
				datasets: [
          {
					label: 'Fatal Police Shootings in the US',
					data: data.map(d => d['Fatal police shootings (US)']),
					borderColor: 'red',
					fill: false
				  },
          {
            label: 'Fatal Police Shootings in Canada',
            data: data.map(d => d['Fatal police shootings (Canada)']),
            borderColor: 'orange',
            fill: false
          }
        ]
      },
			options: {
				plugins: {
					legend: {
						labels: {
							font: {
								size: 16,
								weight: 'bold'
							}
						}
					}
				},
				responsive: true,
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Number of Incidents',
							font: {
								size: 16,
								weight: 'bold'
							}
						}
					},
					x: {
						title: {
							display: true,
							text: 'Year',
							font: {
								size: 16,
								weight: 'bold'
							}
						}
					}
				}
			}
    } 
  )

  new Chart(
    ctx2,
    {
      type: 'bar',
      data: {
        labels: data.map(d => d.Year),
        datasets: [
          {
            label: 'Fatal Police Shootings in the US',
            data: data.map(d => d['Fatal police shootings (US)']),
            backgroundColor: 'red'
          },
          {
            label: 'Fatal Police Shootings in Canada',
            data: data.map(d => d['Fatal police shootings (Canada)']),
            backgroundColor: 'orange'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          }
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Incidents',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          }
        }
      }
    }
  )
}

loadAndChartData()