const convertDate = (date) => {
  const [month, day, year] = date.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
Chart.register({
  id: "moment",
  dateAdapter: moment,
});

// If the plugin follows the UMD pattern, it should be available as this:
if (window["chartjs-plugin-annotation"]) {
  Chart.register(window["chartjs-plugin-annotation"]);
} else {
  console.error("The annotation plugin is not available.");
}

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
    const minEconScore = Math.min(...econScores);
    const maxEconScore = Math.max(...econScores);

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
            borderWidth: 2,
            yAxisID: "y",
            order: 1,
          },
          {
            label: "Economic Scores",
            data: econScores,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            yAxisID: "y1",
            order: 2,
          },
        ],
      },
      options: {
        plugins: {
          annotation: {
            annotations: [
              {
                type: "box",
                mode: "horizontal",
                xScaleID: "x", // Adjust this if 'x' isn't the ID for SPY Close Prices
                yScaleID: "y1", // Adjust this if 'y' isn't the ID for Economic Scores
                xMin: econDates[0], // start from the first date in your data
                xMax: econDates[econDates.length - 1], // end on the last date
                yMin: 5.25, // the smallest value in your Economic Scores data
                yMax: 5.35,
                borderColor: "rgba(0, 255, 0, 0.1)",
                borderWidth: 0.2,
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                z: -1,
              },
              {
                type: "box",
                mode: "horizontal",
                xScaleID: "x", // Adjust this if 'x' isn't the ID for SPY Close Prices
                yScaleID: "y1", // Adjust this if 'y' isn't the ID for Economic Scores
                xMin: econDates[0], // start from the first date in your data
                xMax: econDates[econDates.length - 1], // end on the last date
                yMin: 5.35, // the smallest value in your Economic Scores data
                yMax: 5.45,
                borderColor: "rgba(0, 255, 0, 3)",
                borderWidth: 0.2,
                backgroundColor: "rgba(0, 255, 0, 0.3)",
                z: -1,
              },
              {
                type: "box",
                mode: "horizontal",
                xScaleID: "x", // Adjust this if 'x' isn't the ID for SPY Close Prices
                yScaleID: "y1", // Adjust this if 'y' isn't the ID for Economic Scores
                xMin: econDates[0], // start from the first date in your data
                xMax: econDates[econDates.length - 1], // end on the last date
                yMin: 5.45, // the smallest value in your Economic Scores data
                yMax: 5.55,
                borderColor: "rgba(0, 255, 0, 5)",
                borderWidth: 0.2,
                backgroundColor: "rgba(0, 255, 0, 0.5)",
                z: -1,
              },
              {
                type: "box",
                mode: "horizontal",
                xScaleID: "x", // Adjust this if 'x' isn't the ID for SPY Close Prices
                yScaleID: "y1", // Adjust this if 'y' isn't the ID for Economic Scores
                xMin: econDates[0], // start from the first date in your data
                xMax: econDates[econDates.length - 1], // end on the last date
                yMin: 5.55, // the smallest value in your Economic Scores data
                borderColor: "rgba(0, 255, 0, 7)",
                borderWidth: 0.2,
                backgroundColor: "rgba(0, 255, 0, 0.7)",
                z: -1,
              },
              {
                type: "box",
                mode: "horizontal",
                xScaleID: "x", // Adjust this if 'x' isn't the ID for SPY Close Prices
                yScaleID: "y1", // Adjust this if 'y' isn't the ID for Economic Scores
                xMin: econDates[0], // start from the first date in your data
                xMax: econDates[econDates.length - 1], // end on the last date
                yMin: 5.15,
                yMax: 5.25, // the smallest value in your Economic Scores data
                borderColor: "rgba(255, 102, 102, 0.1)",
                borderWidth: 0.2,
                backgroundColor: "rgba(255, 102, 102, 0.1)",
              },
              {
                type: "box",
                mode: "horizontal",
                xScaleID: "x", // Adjust this if 'x' isn't the ID for SPY Close Prices
                yScaleID: "y1", // Adjust this if 'y' isn't the ID for Economic Scores
                xMin: econDates[0], // start from the first date in your data
                xMax: econDates[econDates.length - 1], // end on the last date
                yMin: 5.05,
                yMax: 5.15, // the smallest value in your Economic Scores data
                borderColor: "rgba(255, 51, 51, 0.3)",
                borderWidth: 0.2,
                backgroundColor: "rgba(255, 51, 51, 0.3)",
              },
              {
                type: "box",
                mode: "horizontal",
                xScaleID: "x", // Adjust this if 'x' isn't the ID for SPY Close Prices
                yScaleID: "y1", // Adjust this if 'y' isn't the ID for Economic Scores
                xMin: econDates[0], // start from the first date in your data
                xMax: econDates[econDates.length - 1], // end on the last date
                yMin: 4.95,
                yMax: 5.05, // the smallest value in your Economic Scores data
                borderColor: "rgba(255, 0, 0, 0.5)",
                borderWidth: 0.2,
                backgroundColor: "rgba(255, 0, 0, 0.5)",
              },
              {
                type: "box",
                mode: "horizontal",
                xScaleID: "x", // Adjust this if 'x' isn't the ID for SPY Close Prices
                yScaleID: "y1", // Adjust this if 'y' isn't the ID for Economic Scores
                xMin: econDates[0], // start from the first date in your data
                xMax: econDates[econDates.length - 1], // end on the last date
                yMax: 4.95, // the smallest value in your Economic Scores data
                borderColor: "rgba(204, 0, 0, 0.7)",
                borderWidth: 0.2,
                backgroundColor: "rgba(204, 0, 0, 0.7)",
              },
            ],
          },
        },
        layout: {
          padding: {
            left: 0, // 10px padding on the left
            right: 0, // 10px padding on the right
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false // This hides the x-axis grid lines
            }
          },
          y: {
            type: "linear",
            position: "left",
            grid: {
              display: false // This hides the y-axis grid lines
            },
            title: {
              display: true,
              text: "SPY Close Prices",
            }
          },
          y1: {
            type: "linear",
            position: "right",
            min: minEconScore - (minEconScore*0.006), // set dynamically
            max: maxEconScore + (maxEconScore*0.006), // set dynamically
            grid: {
              display: false // This hides all grid lines for the secondary y-axis
            },
            title: {
              display: true,
              text: "Economic Scores",
              
            }
          }
        }
        
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

// Create the VIX chart
let vixDates = [];
let vixCloses = [];

// Declare the vixChart variable outside the fetch block to access it globally
let vixChart;

// Fetching VIX data
fetch("https://raw.githubusercontent.com/aapcssasha/Driver/main/data/vix_data.csv")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove header

    lines.forEach((line) => {
      const [date, close] = line.split(","); // Assuming data is comma-separated
      vixDates.push(date);
      vixCloses.push(parseFloat(close));
    });

    const vixCtx = document.getElementById("Vixchart").getContext("2d");
    const lastVixDate = vixDates[vixDates.length - 1];
    const lastVixClose = vixCloses[vixCloses.length - 1];

    // If vixChart already exists, destroy it
    if (vixChart) {
      vixChart.destroy();
    }

    // Create the chart for VIX
    vixChart = new Chart(vixCtx, {
      type: "line",
      data: {
        labels: vixDates,
        datasets: [
          {
            label: "VIX Close Prices",
            data: vixCloses,
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Add an annotation for the last data point
            pointBackgroundColor: vixCloses.map((value, index) => {
              return index === vixCloses.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: vixCloses.map((value, index) => {
              return index === vixCloses.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: vixCloses.map((value, index) => {
              return index === vixCloses.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        plugins: {
          annotations: {
            annotations: {
              lastValueAnnotation: {
                type: 'label',
                xValue: lastVixDate,
                yValue: lastVixClose,
                backgroundColor: 'rgba(0, 102, 204, 0.7)',
                borderColor: 'rgba(0, 102, 204, 0.7)',
                borderWidth: 1,
                content: `Latest: ${lastVixClose.toFixed(2)}`,
                position: 'center',
                xAdjust: 0,
                yAdjust: -25,
              }
            }
          }    
        },
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "VIX Close Prices",
            },
          },
        },
      },
    });
    vixChart.update();
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
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/unemploymentRate_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove header

    lines.forEach((line) => {
      const [date, close] = line.split(","); // Assuming data is comma-separated
      unemploymentDates.push(date);
      unemploymentCloses.push(parseFloat(close));
    });

    const unemploymentCtx = document
      .getElementById("unemploymentRatechart")
      .getContext("2d");
    const lastDate = unemploymentDates[unemploymentDates.length - 1];
    const lastValue = unemploymentCloses[unemploymentCloses.length - 1];

    // If unemploymentChart already exists, destroy it
    if (unemploymentChart) {
      unemploymentChart.destroy();
    }

    // Create the chart for unemployment
    unemploymentChart = new Chart(unemploymentCtx, {
      type: "line",
      data: {
        labels: unemploymentDates,
        datasets: [
          {
            label: "Unemployment Rate",
            data: unemploymentCloses,
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Add an annotation for the last data point
            pointBackgroundColor: unemploymentCloses.map((value, index) => {
              return index === unemploymentCloses.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: unemploymentCloses.map((value, index) => {
              return index === unemploymentCloses.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: unemploymentCloses.map((value, index) => {
              return index === unemploymentCloses.length - 1 ? 5 : 0;
            })
          },
        ],
      },
      options: {
        plugins: {
          annotations: {
            annotations: {
              lastValueAnnotation: {
                type: 'label',
                xValue: lastDate,
                yValue: lastValue,
                backgroundColor: 'rgba(0, 102, 204, 0.7)',
                borderColor: 'rgba(0, 102, 204, 0.7)',
                borderWidth: 1,
                content: `Latest: ${lastValue.toFixed(2)}%`,
                position: 'center',
                xAdjust: 0,
                yAdjust: -25,
              }
            }
          }    
        },
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Rate",
            },
          },
        },
      },
    });
    unemploymentChart.update();
  })
  .catch((error) => {
    console.error("Error fetching Unemployment data:", error);
  });

// Arrays to hold your delinquency data
let delinquencyDates = [];
let delinquencyRates = [];

// Fetch the delinquency data from the data folder
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/delinquencyCreditCards_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, rate] = line.split(","); // Assuming data is comma-separated
      delinquencyDates.push(date);
      delinquencyRates.push(parseFloat(rate));
    });

    const delinquencyCtx = document
      .getElementById("delinquencyCreditCards")
      .getContext("2d");

    // Create the chart for delinquency rate on credit cards
    const lastDelinquencyDate = delinquencyDates[delinquencyDates.length - 1];
    const lastDelinquencyValue = delinquencyRates[delinquencyRates.length - 1];
    
    const delinquencyChart = new Chart(delinquencyCtx, {
      type: "line",
      data: {
        labels: delinquencyDates,
        datasets: [
          {
            label: "Delinquency Rate on Credit Card",
            data: delinquencyRates,
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.9, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: delinquencyRates.map((value, index) => {
              return index === delinquencyRates.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: delinquencyRates.map((value, index) => {
              return index === delinquencyRates.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: delinquencyRates.map((value, index) => {
              return index === delinquencyRates.length - 1 ? 5 : 0;
            })
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Delinquency Rate (%)",
            },
          },
        },
      },
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
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/stickyCPI_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(","); // Assuming data is comma-separated
      stickyCPIDates.push(date);
      stickyCPIValues.push(parseFloat(value));
    });

    const stickyCPICtx = document.getElementById("stickyCPI").getContext("2d");

    // Create the chart for Sticky CPI
    const lastStickyCPIDate = stickyCPIDates[stickyCPIDates.length - 1];
    const lastStickyCPIValue = stickyCPIValues[stickyCPIValues.length - 1];
    
    const stickyCPIChart = new Chart(stickyCPICtx, {
      type: "line",
      data: {
        labels: stickyCPIDates,
        datasets: [
          {
            label: "Sticky CPI",
            data: stickyCPIValues,
            borderColor: "rgba(54, 162, 235, 1)", // A shade of blue
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: stickyCPIValues.map((value, index) => {
              return index === stickyCPIValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: stickyCPIValues.map((value, index) => {
              return index === stickyCPIValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: stickyCPIValues.map((value, index) => {
              return index === stickyCPIValues.length - 1 ? 5 : 0;
            })
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Sticky CPI Value",
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching Sticky CPI data:", error);
  });

// Arrays to hold the GDP data
let gdpDates = [];
let gdpValues = [];

// Fetch the GDP data from the data folder
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/gdpHistory_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(","); // Assuming data is comma-separated
      gdpDates.push(date);
      gdpValues.push(parseFloat(value));
    });

    const gdpCtx = document.getElementById("gdpHistory").getContext("2d");

    // Create the chart for GDP
    const lastGDPDate = gdpDates[gdpDates.length - 1];
    const lastGDPValue = gdpValues[gdpValues.length - 1];
    
    const gdpChart = new Chart(gdpCtx, {
      type: "line",
      data: {
        labels: gdpDates,
        datasets: [
          {
            label: "GDP History",
            data: gdpValues,
            borderColor: "rgba(255, 159, 64, 1)", // A shade of orange, for that GDP glow!
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: gdpValues.map((value, index) => {
              return index === gdpValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: gdpValues.map((value, index) => {
              return index === gdpValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: gdpValues.map((value, index) => {
              return index === gdpValues.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "GDP Value",
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching GDP data:", error);
  });

// Array to store the fetched data
let personalIncomeDates = [];
let personalIncomeValues = [];

// Fetch the Personal Income data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/personalIncome_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(","); // Assuming data is comma-separated
      personalIncomeDates.push(date);
      personalIncomeValues.push(parseFloat(value));
    });

    const personalIncomeCtx = document
      .getElementById("personalIncome")
      .getContext("2d");

    // Create the chart for Personal Income
    const lastPersonalIncomeDate = personalIncomeDates[personalIncomeDates.length - 1];
    const lastPersonalIncomeValue = personalIncomeValues[personalIncomeValues.length - 1];
    
    new Chart(personalIncomeCtx, {
      type: "line",
      data: {
        labels: personalIncomeDates,
        datasets: [
          {
            label: "Personal Income",
            data: personalIncomeValues,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: personalIncomeValues.map((value, index) => {
              return index === personalIncomeValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: personalIncomeValues.map((value, index) => {
              return index === personalIncomeValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: personalIncomeValues.map((value, index) => {
              return index === personalIncomeValues.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Income",
            },
          },
        },
        plugins: {
          zoom: {
            wheel: {
              enabled: true, // Mouse wheel zooming
            },
            drag: {
              enabled: true, // Drag to zoom
            },
            mode: "xy",
            speed: 0.1,
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching Personal Income data:", error);
  });

// Arrays to store the fetched data
let savingRateDates = [];
let savingRateValues = [];

// Fetch the Personal Saving Rate data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/savingRate_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(","); // Assuming data is comma-separated
      savingRateDates.push(date);
      savingRateValues.push(parseFloat(value));
    });

    const savingRateCtx = document
      .getElementById("savingRate")
      .getContext("2d");

    // Create the chart for Personal Saving Rate
    const lastSavingRateDate = savingRateDates[savingRateDates.length - 1];
    const lastSavingRateValue = savingRateValues[savingRateValues.length - 1];
    
    new Chart(savingRateCtx, {
      type: "line",
      data: {
        labels: savingRateDates,
        datasets: [
          {
            label: "Personal Saving Rate",
            data: savingRateValues,
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: savingRateValues.map((value, index) => {
              return index === savingRateValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: savingRateValues.map((value, index) => {
              return index === savingRateValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: savingRateValues.map((value, index) => {
              return index === savingRateValues.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Rate (%)",
            },
          },
        },
        plugins: {
          zoom: {
            wheel: {
              enabled: true, // Mouse wheel zooming
            },
            drag: {
              enabled: true, // Drag to zoom
            },
            mode: "xy",
            speed: 0.1,
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching Personal Saving Rate data:", error);
  });

// Arrays to store the fetched data
let companiesDebtDates = [];
let companiesDebtValues = [];

// Fetch the Companies Debt data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/companiesDEBT_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(","); // Assuming data is comma-separated
      companiesDebtDates.push(date);
      companiesDebtValues.push(parseFloat(value));
    });

    const companiesDebtCtx = document
      .getElementById("companiesDebt")
      .getContext("2d");

    // Create the chart for Companies Debt
    const lastCompaniesDebtDate = companiesDebtDates[companiesDebtDates.length - 1];
    const lastCompaniesDebtValue = companiesDebtValues[companiesDebtValues.length - 1];
    
    new Chart(companiesDebtCtx, {
      type: "line",
      data: {
        labels: companiesDebtDates,
        datasets: [
          {
            label: "Companies Debt",
            data: companiesDebtValues,
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: companiesDebtValues.map((value, index) => {
              return index === companiesDebtValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: companiesDebtValues.map((value, index) => {
              return index === companiesDebtValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: companiesDebtValues.map((value, index) => {
              return index === companiesDebtValues.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Debt (in billions or your unit)",
            },
          },
        },
        plugins: {
          zoom: {
            wheel: {
              enabled: true, // Mouse wheel zooming
            },
            drag: {
              enabled: true, // Drag to zoom
            },
            mode: "xy",
            speed: 0.1,
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching Companies Debt data:", error);
  });

// Arrays to store the fetched data
let CC30daysPastdueDates = [];
let CC30daysPastdueRates = [];

// Fetch the CC 30 Days Past Due data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/CC30daysPastdue_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, rate] = line.split(","); // Assuming data is comma-separated
      CC30daysPastdueDates.push(date);
      CC30daysPastdueRates.push(parseFloat(rate));
    });

    const CC30daysPastdueCtx = document
      .getElementById("CC30daysPastdue")
      .getContext("2d");

    // Create the chart for CC 30 Days Past Due
    const lastCC30daysPastdueDate = CC30daysPastdueDates[CC30daysPastdueDates.length - 1];
    const lastCC30daysPastdueRate = CC30daysPastdueRates[CC30daysPastdueRates.length - 1];
    
    new Chart(CC30daysPastdueCtx, {
      type: "line",
      data: {
        labels: CC30daysPastdueDates,
        datasets: [
          {
            label: "Credit Card Balances: 30+ Days Past Due Rates",
            data: CC30daysPastdueRates,
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: CC30daysPastdueRates.map((value, index) => {
              return index === CC30daysPastdueRates.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: CC30daysPastdueRates.map((value, index) => {
              return index === CC30daysPastdueRates.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: CC30daysPastdueRates.map((value, index) => {
              return index === CC30daysPastdueRates.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Past Due Rate (%)",
            },
          },
        },
        plugins: {
          zoom: {
            wheel: {
              enabled: true, // Mouse wheel zooming
            },
            drag: {
              enabled: true, // Drag to zoom
            },
            mode: "xy",
            speed: 0.1,
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error(
      "Error fetching Credit Card Balances: 30 or More Days Past Due Rates data:",
      error
    );
  });

// Arrays to store the fetched data
let housingInventoryDates = [];
let housingInventoryValues = [];

// Fetch the Housing Inventory data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/housingInventory_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(","); // Assuming data is comma-separated
      housingInventoryDates.push(date);
      housingInventoryValues.push(parseFloat(value));
    });

    const housingInventoryCtx = document
      .getElementById("housingInventory")
      .getContext("2d");

    // Create the chart for Housing Inventory
    const lastHousingInventoryDate = housingInventoryDates[housingInventoryDates.length - 1];
    const lastHousingInventoryValue = housingInventoryValues[housingInventoryValues.length - 1];
    
    new Chart(housingInventoryCtx, {
      type: "line",
      data: {
        labels: housingInventoryDates,
        datasets: [
          {
            label: "Housing Inventory",
            data: housingInventoryValues,
            borderColor: "rgba(153, 102, 255, 1)", // A nice purple
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: housingInventoryValues.map((value, index) => {
              return index === housingInventoryValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: housingInventoryValues.map((value, index) => {
              return index === housingInventoryValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: housingInventoryValues.map((value, index) => {
              return index === housingInventoryValues.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Inventory Count",
            },
          },
        },
        plugins: {
          zoom: {
            wheel: {
              enabled: true, // Mouse wheel zooming
            },
            drag: {
              enabled: true, // Drag to zoom
            },
            mode: "xy",
            speed: 0.1,
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching Housing Inventory data:", error);
  });

// Arrays to store the fetched data
let homeSalesDates = [];
let homeSalesValues = [];

// Fetch the Home Sales data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/homeSales_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(","); // Assuming data is comma-separated
      homeSalesDates.push(date);
      homeSalesValues.push(parseFloat(value));
    });

    const homeSalesCtx = document.getElementById("homeSales").getContext("2d");

    // Create the chart for Home Sales
    const lastHomeSalesDate = homeSalesDates[homeSalesDates.length - 1];
    const lastHomeSalesValue = homeSalesValues[homeSalesValues.length - 1];
    
    new Chart(homeSalesCtx, {
      type: "line",
      data: {
        labels: homeSalesDates,
        datasets: [
          {
            label: "Home Sales",
            data: homeSalesValues,
            borderColor: "rgba(255, 159, 64, 1)", // A shade of orange
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: homeSalesValues.map((value, index) => {
              return index === homeSalesValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: homeSalesValues.map((value, index) => {
              return index === homeSalesValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: homeSalesValues.map((value, index) => {
              return index === homeSalesValues.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Number of Sales",
            },
          },
        },
        plugins: {
          zoom: {
            wheel: {
              enabled: true, // Mouse wheel zooming
            },
            drag: {
              enabled: true, // Drag to zoom
            },
            mode: "xy",
            speed: 0.1,
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching Home Sales data:", error);
  });

// Arrays to hold the fetched data
let mortgage30yearsDates = [];
let mortgage30yearsValues = [];

// Fetch the 30 years Mortgage Rate data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/mortgage30yearsRate_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, value] = line.split(","); // Assuming data is comma-separated
      mortgage30yearsDates.push(date);
      mortgage30yearsValues.push(parseFloat(value));
    });

    const mortgage30yearsCtx = document
      .getElementById("mortgage30yearsRate")
      .getContext("2d");

    // Create the chart for 30 years Mortgage Rate
    const lastMortgage30yearsDate = mortgage30yearsDates[mortgage30yearsDates.length - 1];
    const lastMortgage30yearsValue = mortgage30yearsValues[mortgage30yearsValues.length - 1];
    
    new Chart(mortgage30yearsCtx, {
      type: "line",
      data: {
        labels: mortgage30yearsDates,
        datasets: [
          {
            label: "30 years Mortgage Rate",
            data: mortgage30yearsValues,
            borderColor: "rgba(54, 162, 235, 1)", // A cool blue
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: mortgage30yearsValues.map((value, index) => {
              return index === mortgage30yearsValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: mortgage30yearsValues.map((value, index) => {
              return index === mortgage30yearsValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: mortgage30yearsValues.map((value, index) => {
              return index === mortgage30yearsValues.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Rate (%)",
            },
          },
        },
        plugins: {
          zoom: {
            wheel: {
              enabled: true, // Mouse wheel zooming
            },
            drag: {
              enabled: true, // Drag to zoom
            },
            mode: "xy",
            speed: 0.1,
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching 30 years Mortgage Rate data:", error);
  });

// Arrays to store the data from the CSV
let mortgageDelinquencyDates = [];
let mortgageDelinquencyRates = [];

// Fetching the Mortgage Delinquency Rate data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/mortgageDelinquencyRate_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, rate] = line.split(","); // Assuming the data is comma-separated
      mortgageDelinquencyDates.push(date);
      mortgageDelinquencyRates.push(parseFloat(rate));
    });

    const mortgageDelinquencyCtx = document
      .getElementById("mortgageDelinquencyRate")
      .getContext("2d");

    // Creating the chart for Mortgage Delinquency Rate
    const lastMortgageDelinquencyDate = mortgageDelinquencyDates[mortgageDelinquencyDates.length - 1];
    const lastMortgageDelinquencyRate = mortgageDelinquencyRates[mortgageDelinquencyRates.length - 1];
    
    new Chart(mortgageDelinquencyCtx, {
      type: "line",
      data: {
        labels: mortgageDelinquencyDates,
        datasets: [
          {
            label: "Mortgage Delinquency Rate (%)",
            data: mortgageDelinquencyRates,
            borderColor: "rgba(255, 99, 132, 1)", // Pinkish line color for visibility
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: mortgageDelinquencyRates.map((value, index) => {
              return index === mortgageDelinquencyRates.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: mortgageDelinquencyRates.map((value, index) => {
              return index === mortgageDelinquencyRates.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: mortgageDelinquencyRates.map((value, index) => {
              return index === mortgageDelinquencyRates.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Mortgage Delinquency Rate (%)",
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching Mortgage Delinquency Rate data:", error);
  });

// Arrays to store the data from the CSV
let homePriceIndexDates = [];
let homePriceIndices = [];

// Fetching the House Price Index data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/homePriceIndex_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, index] = line.split(","); // Assuming the data is comma-separated
      homePriceIndexDates.push(date);
      homePriceIndices.push(parseFloat(index));
    });

    const homePriceIndexCtx = document
      .getElementById("homePriceIndex")
      .getContext("2d");

    // Creating the chart for House Price Index
    const lastHomePriceIndexDate = homePriceIndexDates[homePriceIndexDates.length - 1];
    const lastHomePriceIndexValue = homePriceIndices[homePriceIndices.length - 1];
    
    new Chart(homePriceIndexCtx, {
      type: "line",
      data: {
        labels: homePriceIndexDates,
        datasets: [
          {
            label: "House Price Index",
            data: homePriceIndices,
            borderColor: "rgba(54, 162, 235, 1)", // A nice blue color
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: homePriceIndices.map((value, index) => {
              return index === homePriceIndices.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: homePriceIndices.map((value, index) => {
              return index === homePriceIndices.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: homePriceIndices.map((value, index) => {
              return index === homePriceIndices.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "House Price Index",
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching House Price Index data:", error);
  });
// vacant housing units
// Arrays to store the data from the CSV
let vacantHousingUnitsDates = [];
let vacantHousingUnitsValues = [];

// Fetching the House Price Index data
fetch(
  "https://raw.githubusercontent.com/aapcssasha/Driver/main/data/vacantHousingUnits_data.csv"
)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");
    lines.shift(); // remove the header

    lines.forEach((line) => {
      const [date, index] = line.split(","); // Assuming the data is comma-separated
      vacantHousingUnitsDates.push(date);
      vacantHousingUnitsValues.push(parseFloat(index));
    });

    const vacantHousingUnitsCtx = document
      .getElementById("vacantHousingUnits")
      .getContext("2d");

    // Creating the chart for House Price Index
    const lastVacantHousingUnitsDate = vacantHousingUnitsDates[vacantHousingUnitsDates.length - 1];
    const lastVacantHousingUnitsValue = vacantHousingUnitsValues[vacantHousingUnitsValues.length - 1];
    
    new Chart(vacantHousingUnitsCtx, {
      type: "line",
      data: {
        labels: vacantHousingUnitsDates,
        datasets: [
          {
            label: "Vacant Housing Units",
            data: vacantHousingUnitsValues,
            borderColor: "rgba(54, 162, 235, 1)", // Same blue color as before
            borderWidth: 1,
            pointRadius: 0, // This removes the data points
            lineTension: 0.2, // This makes the line smoother
            // Highlight the last data point
            pointBackgroundColor: vacantHousingUnitsValues.map((value, index) => {
              return index === vacantHousingUnitsValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointBorderColor: vacantHousingUnitsValues.map((value, index) => {
              return index === vacantHousingUnitsValues.length - 1 ? "red" : "rgba(0, 0, 0, 0)";
            }),
            pointRadius: vacantHousingUnitsValues.map((value, index) => {
              return index === vacantHousingUnitsValues.length - 1 ? 5 : 0;
            }),
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Vacant Housing Units",
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching Vacant Housing Units data:", error);
  });

function showComingSoon() {
  alert("Coming soon!");
}

function toggleMenu() {
  const menuContent = document.querySelector(".menu-content");
  if (
    menuContent.style.display === "none" ||
    menuContent.style.display === ""
  ) {
    menuContent.style.display = "flex";
  } else {
    menuContent.style.display = "none";
  }
};

document.addEventListener('DOMContentLoaded', function() {
  fetch('./changes/data_changes_log.txt')
    .then(response => response.text())
    .then(text => {
      document.getElementById('updatesContent').innerText = text;
    })
    .catch(err => console.error(err));
});
