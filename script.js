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

function drawSPYChart() {
    let dates = spyChartData.map(dataPoint => dataPoint[0]);
    let prices = spyChartData.map(dataPoint => dataPoint[1]);

    var ctx = document.getElementById('spy_chart_div').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'SPY Price',
                borderColor: 'rgb(255, 99, 132)',
                data: prices
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price'
                    }
                }
            }
        }
    });
}
