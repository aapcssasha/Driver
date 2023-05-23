let spyChartData;

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(fetchSPYData);

window.addEventListener('resize', function() {
    drawChart();
    if (spyChartData) {
        drawSPYChart();
    }
});

function drawChart() {
    let portfolioSection = document.getElementById('portfolio-section');
    let portfolioWidth = portfolioSection.offsetWidth;

    const dataArray = [
        ['Stock', 'Percentage'],
        ['LUV', 2670],
        ['COF', 2860],
        ['BABA', 9120],
        ['THO', 3000],
        ['NIU', 2360],
        ['TUP', 1300],
        ['SPWH', 2640],
        ['HBI', 2330],
        ['VZ', 3590],
        ['FINV', 2110],
        ['M', 2580],
        ['Cash', 170]
    ];

    dataArray.sort(function(a, b) {
        return b[1] - a[1];
    });

    let data = google.visualization.arrayToDataTable(dataArray);

    let options = {
        width: portfolioWidth,
        height: 400,
        backgroundColor: '#f1efef',
        legend: {textStyle: {color: 'black', fontSize: 12}},
        pieSliceBorderColor: '#000',
        chartArea: { width: '100%', height: '65%' },
        pieSliceTeXt: 'Percentage',
    };

    let chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

function fetchSPYData() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=SPY&apikey=02J3FNJRUE6Y1DFR')
    .then(response => response.json())
    .then(data => {
        spyChartData = [];
        let dailyData = data['Time Series (Daily)'];

        for (let date in dailyData) {
            let parsedDate = new Date(date);
            parsedDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
            let closePrice = parseFloat(dailyData[date]['4. close']);

            if (!isNaN(closePrice)) {
                spyChartData.push([parsedDate, closePrice]);
            } else {
                console.log(`Invalid data for date ${date}: ${dailyData[date]['4. close']}`);
            }
        }
        spyChartData.reverse();
        spyChartData.unshift(['Date', 'Close']); // Add column headers after reversing the data.
        
        drawChart();
        drawSPYChart();
    })
    .catch(err => console.error(err));
}

function drawSPYChart() {
    var data;
    try {
        data = google.visualization.arrayToDataTable(spyChartData, false); // Added false for treating first row as data.
    } catch (error) {
        console.error('Error converting data to DataTable:', error);
        console.log('dataTable:', spyChartData);
    }

    var options = {
        title: 'SPY Price',
        backgroundColor: '#f1efef',
        legend: { position: 'bottom' },
        hAxis: { title: 'Date', format: 'M/d/yy' },
        vAxis: { title: 'Price' },
        height: 400,
    };

    if (data) {
        var chart = new google.visualization.LineChart(document.getElementById('spy_chart_div'));
        chart.draw(data, options);
    }
}
