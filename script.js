


const convertDate = (date) => {
  const [month, day, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}


// Prepare empty arrays to store data
let spyDates = [];
let spyCloses = [];
let econDates = [];
let econScores = [];

// Fetching SPY data
fetch('https://raw.githubusercontent.com/aapcssasha/Driver/main/spy_data.txt')
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split('\n');
    lines.shift(); // remove header

    lines.forEach(line => {
      const [date, close] = line.split('\t');
      spyDates.push(date);
      spyCloses.push(parseFloat(close));
    });

    // Fetching Economic Scores
    return fetch('https://raw.githubusercontent.com/aapcssasha/Driver/main/economic_scores.txt');
  })
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split('\n');

    lines.forEach(line => {
      const [rawDate, scoreText] = line.split(' - economic score : ');
      const date = convertDate(rawDate);
      // Only push to econDates and econScores if date exists in spyDates
      if (spyDates.includes(date)) {
        econDates.push(date);
        econScores.push(parseFloat(scoreText));
      }
    });

    // Create Chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: spyDates, // make sure spyDates and econDates align if necessary
        datasets: [{
          label: 'SPY Close Prices',
          data: spyCloses,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        }, {
          label: 'Economic Scores',
          data: econScores,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'SPY Close Prices'
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: {
              drawOnChartArea: false, // ensure it doesn't interfere with main y axis
            },
            title: {
              display: true,
              text: 'Economic Scores'
            }
          }
        }
      }
    });
  })
  .catch(error => {
    console.error("Something went wrong:", error);
  });

// Fetch the data from the GitHub repo
fetch('https://raw.githubusercontent.com/aapcssasha/Driver/main/data/my_data.txt')
  .then(response => response.text())
  .then(data => {
    // Parsing the fetched data
    const rows = data.split('\n');
    const labels = [], goldData = [], vixData = [];

    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].split('\t');
      labels.push(cells[0]);
      goldData.push(parseFloat(cells[1]));
      vixData.push(parseFloat(cells[2]));
    }

    async function fetchAndPlotVIX() {
      console.log("fetchAndPlotVIX started"); 
      const response = await fetch('https://raw.githubusercontent.com/aapcssasha/Driver/main/data/my_data.txt');
      const text = await response.text();
      console.log("Fetched VIX Data:", text); 


      // Parse the data to separate the dates and close values
      const lines = text.split('\n').slice(1);  // Skip the header
      const dates = [];
      const closeValues = [];

      lines.forEach(line => {
        const [date, close] = line.split('\t');
        if (date && close) {
          dates.push(date);
          closeValues.push(parseFloat(close));
        }
      });
      console.log("Parsed Dates and Close Values:", dates, closeValues);
      // Create the chart
      const ctx = document.getElementById('VIX').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Close Values',
            data: closeValues,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            }
          }
        }
      });
    }

    fetchAndPlotVIX();


    async function fetchLatestScore() {
      // Fetch the scores
      const response = await fetch('https://raw.githubusercontent.com/aapcssasha/Driver/main/economic_scores.txt');
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
      if (score < 5.0) return 'short100.png';
      if (score === 5.0) return 'short50.png';
      if (score === 5.1) return 'short20.png';
      if (score === 5.2) return 'closeLongs.png';
      if (score === 5.3) return 'closeShorts.png';
      if (score === 5.4) return 'long20.png';
      if (score === 5.5) return 'long50.png';
      if (score > 5.5) return 'long100.png';
    }

    (async function displayPic() {
      const score = await fetchLatestScore();
      const roundedScore = roundToDecimal(score);

      // Display the roundedScore in the HTML
      document.getElementById('roundedScoreDisplay').innerText = `Rounded Score: ${roundedScore}`;

      const picName = selectPic(roundedScore);
      const picUrl = `https://raw.githubusercontent.com/aapcssasha/Driver/main/pics/${picName}`;
      document.getElementById('scoreImage').src = picUrl;
    })();
  });
