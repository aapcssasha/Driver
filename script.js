

const convertDate = (date) => {
  const [month, day, year] = date.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
Chart.register({
  id: "moment",
  dateAdapter: moment,
});

// Prepare empty arrays to store data
let spyDates = [];
let spyCloses = [];
let econDates = [];
let econScores = [];

// Fetching SPY data
fetch("https://raw.githubusercontent.com/aapcssasha/Driver/main/spy_data.txt")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove header

    lines.forEach((line) => {
      const [date, close] = line.split("\t");
      spyDates.push(date);
      spyCloses.push(parseFloat(close));
    });

    // Fetching Economic Scores
    return fetch(
      "https://raw.githubusercontent.com/aapcssasha/Driver/main/economic_scores.txt"
    );
  })
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");

    lines.forEach((line) => {
      const [rawDate, scoreText] = line.split(" - economic score : ");
      const date = convertDate(rawDate);
      // Only push to econDates and econScores if date exists in spyDates
      if (spyDates.includes(date)) {
        econDates.push(date);
        econScores.push(parseFloat(scoreText));
      }
    });

    // Create Chart
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: spyDates, // make sure spyDates and econDates align if necessary
        datasets: [
          {
            label: "SPY Close Prices",
            data: spyCloses,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            yAxisID: "y",
          },
          {
            label: "Economic Scores",
            data: econScores,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        layout: {
          padding: {
            left: 40,   // 10px padding on the left
            right: 40   // 10px padding on the right
          }
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "SPY Close Prices",
            },
          },
          y1: {
            type: "linear",
            position: "right",
            grid: {
              drawOnChartArea: false, // ensure it doesn't interfere with main y axis
            },
            title: {
              display: true,
              text: "Economic Scores",
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });

async function fetchLatestScore() {
  // Fetch the scores
  const response = await fetch(
    "https://raw.githubusercontent.com/aapcssasha/Driver/main/economic_scores.txt"
  );
  const data = await response.text();

  // Split the scores by lines and get the last one
  const lines = data.trim().split("\n");
  const latestLine = lines[lines.length - 1];

  // Extract the number from the string
  const score = parseFloat(latestLine.split(":")[1]);

  return score;
}

function roundToDecimal(score) {
  // Round to 1 decimal place
  return Math.round(score * 10) / 10;
}

function selectPic(score) {
  if (score < 5.0) return "short100.png";
  if (score === 5.0) return "short50.png";
  if (score === 5.1) return "short20.png";
  if (score === 5.2) return "closeLongs.png";
  if (score === 5.3) return "closeShorts.png";
  if (score === 5.4) return "long20.png";
  if (score === 5.5) return "long50.png";
  if (score > 5.5) return "long100.png";
}

(async function displayPic() {
  const score = await fetchLatestScore();
  const roundedScore = roundToDecimal(score);

  // Display the roundedScore in the HTML
  document.getElementById(
    "roundedScoreDisplay"
  ).innerText = `Rounded Score: ${roundedScore}`;

  const picName = selectPic(roundedScore);
  const picUrl = `https://raw.githubusercontent.com/aapcssasha/Driver/main/pics/${picName}`;
  document.getElementById("scoreImage").src = picUrl;
})();



// Create the vix chart
let vixDates = [];
let vixCloses = [];

// Fetching VIX data
fetch("https://raw.githubusercontent.com/aapcssasha/Driver/main/data/vix_data.csv")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove header

    lines.forEach((line) => {
      const [date, close] = line.split(",");  // Assuming data is comma-separated
      vixDates.push(date);
      vixCloses.push(parseFloat(close));
    });

    // Now create the chart for VIX
    const vixCtx = document.getElementById("Vixchart").getContext("2d");
    const vixChart = new Chart(vixCtx, {
      type: "line",
      data: {
        labels: vixDates,
        datasets: [{
          label: "VIX Close Prices",
          data: vixCloses,
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          pointRadius: 0,   // This removes the data points
          lineTension: 0.2  // This makes the line smoother
        }],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'VIX Close Prices',
            }
          }
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'  // Enables panning in both x and y axes
            },
            zoom: {
              enabled: true,
              mode: 'xy',  // Enables zooming in both x and y axes
              speed: 0.1  // Adjust if needed
            }
          },
          annotations: {
            annotations: [{
              type: 'point',
              xScaleID: 'x-axis-0',
              yScaleID: 'y-axis-0',
              xValue: vixDates[Math.floor(vixDates.length / 2)],
              yValue: vixCloses[Math.floor(vixCloses.length / 2)],
              borderColor: 'rgba(0,0,0,0.5)',
              borderWidth: 1,
              label: {
                enabled: true,
                content: vixCloses[Math.floor(vixCloses.length / 2)].toString(),
                position: 'start',
                xAdjust: 0,
                yAdjust: 10, // you can adjust this as needed
                backgroundColor: 'rgba(0,0,0,0.3)'
              }
            }]
          }                           
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching VIX data:", error);
  });


// Create the unemployment chart
let unemploymentDates = [];
let unemploymentCloses = [];

// Declare the unemploymentChart variable outside the fetch block to access it globally
let unemploymentChart;

// Fetching unemployment data
fetch("https://raw.githubusercontent.com/aapcssasha/Driver/main/data/unemploymentRate_data.csv")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove header

    lines.forEach((line) => {
      const [date, close] = line.split(",");  // Assuming data is comma-separated
      unemploymentDates.push(date);
      unemploymentCloses.push(parseFloat(close));
    });

    const unemploymentCtx = document.getElementById("unemploymentRatechart").getContext("2d");
    
    // If unemploymentChart already exists, destroy it
    if (unemploymentChart) {
      unemploymentChart.destroy();
    }

    // Create the chart for unemployment
    unemploymentChart = new Chart(unemploymentCtx, {
      type: "line",
      data: {
        labels: unemploymentDates,
        datasets: [{
          label: "Unemployment Rate",
          data: unemploymentCloses,
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          pointRadius: 0,   // This removes the data points
          lineTension: 0.2  // This makes the line smoother
        }],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Rate'
            }
          }
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'  // Enables panning in both x and y axes
            },
            zoom: {
              enabled: true,
              mode: 'xy',  // Enables zooming in both x and y axes
              speed: 0.1  // Adjust if needed
            }
          },
          annotations: {
            annotations: [{
              type: 'point',
              xScaleID: 'x-axis-0',
              yScaleID: 'y-axis-0',
              xValue: unemploymentDates[Math.floor(unemploymentDates.length / 2)],
              yValue: unemploymentCloses[Math.floor(unemploymentCloses.length / 2)],
              borderColor: 'rgba(0,0,0,0.5)',
              borderWidth: 1,
              label: {
                enabled: true,
                content: unemploymentCloses[Math.floor(unemploymentCloses.length / 2)].toString(),
                position: 'start',
                xAdjust: 0,
                yAdjust: 10, // you can adjust this as needed
                backgroundColor: 'rgba(0,0,0,0.3)'
              }
            }]
          }
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching Unemployment data:", error);
  });

// Arrays to hold your delinquency data
let delinquencyDates = [];
let delinquencyRates = [];

// Fetch the delinquency data from the data folder
fetch("https://raw.githubusercontent.com/aapcssasha/Driver/main/data/delinquencyCreditCards_data.csv")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, rate] = line.split(",");  // Assuming data is comma-separated
      delinquencyDates.push(date);
      delinquencyRates.push(parseFloat(rate));
    });

    const delinquencyCtx = document.getElementById("delinquencyCreditCards").getContext("2d");
    
    // Create the chart for delinquency rate on credit cards
    const delinquencyChart = new Chart(delinquencyCtx, {
      type: "line",
      data: {
        labels: delinquencyDates,
        datasets: [{
          label: "Delinquency Rate on Credit Card",
          data: delinquencyRates,
          borderColor: "rgba(255, 159, 64, 1)",  // Just a color suggestion, change as needed
          borderWidth: 1,
          pointRadius: 0,   // This removes the data points
          lineTension: 0.2  // This makes the line smoother
        }],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Delinquency Rate (%)'
            }
          }
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching Delinquency Rate data:", error);
  });

  // CPI
  // Arrays to hold the Sticky CPI data
let stickyCPIDates = [];
let stickyCPIValues = [];

// Fetch the Sticky CPI data from the data folder
fetch("https://raw.githubusercontent.com/aapcssasha/Driver/main/data/stickyCPI_data.csv")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(",");  // Assuming data is comma-separated
      stickyCPIDates.push(date);
      stickyCPIValues.push(parseFloat(value));
    });

    const stickyCPICtx = document.getElementById("stickyCPI").getContext("2d");
    
    // Create the chart for Sticky CPI
    const stickyCPIChart = new Chart(stickyCPICtx, {
      type: "line",
      data: {
        labels: stickyCPIDates,
        datasets: [{
          label: "Sticky CPI",
          data: stickyCPIValues,
          borderColor: "rgba(54, 162, 235, 1)",  // A shade of blue, change if you wish
          borderWidth: 1,
          pointRadius: 0,   // This removes the data points
          lineTension: 0.2  // This makes the line smoother
        }],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sticky CPI Value'
            }
          }
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching Sticky CPI data:", error);
  });

  // Arrays to hold the GDP data
let gdpDates = [];
let gdpValues = [];

// Fetch the GDP data from the data folder
fetch("https://raw.githubusercontent.com/aapcssasha/Driver/main/data/gdpHistory_data.csv")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(",");  // Assuming data is comma-separated
      gdpDates.push(date);
      gdpValues.push(parseFloat(value));
    });

    const gdpCtx = document.getElementById("gdpHistory").getContext("2d");
    
    // Create the chart for GDP
    const gdpChart = new Chart(gdpCtx, {
      type: "line",
      data: {
        labels: gdpDates,
        datasets: [{
          label: "GDP History",
          data: gdpValues,
          borderColor: "rgba(255, 159, 64, 1)",  // A shade of orange, for that GDP glow!
          borderWidth: 1,
          pointRadius: 0,   // This removes the data points
          lineTension: 0.2  // This makes the line smoother
        }],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'GDP Value'
            }
          }
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching GDP data:", error);
  });
