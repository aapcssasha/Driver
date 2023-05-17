google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var dataArray = [
        ['Stock', 'Percentage'],
        ['BABA', 20],
        ['AAPL', 21],
        ['TSLA', 20],
        ['MSFT', 25],
        ['COF', 8.24],
        ['LUV', 7.57],
        ['Cash', 20]
    ];

    dataArray.sort(function(a, b) {
        return b[1] - a[1];
    });

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        width:400,
        height:400,
        backgroundColor: '#f1efef',
        legend: {textStyle: {color: 'black'}},
        pieSliceBorderColor: '#000',
        // move the graph to the left
        chartArea: { width: '100%', height: '50%'},

    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}