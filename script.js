google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

window.addEventListener('resize', drawChart);

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

document.getElementById('login-button').addEventListener('click', function() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    // You would typically send these values to your server to verify them
    console.log('Logging in with username:', username, 'and password:', password);
});

document.getElementById('register-button').addEventListener('click', function() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    // You would typically send these values to your server to create a new user
    console.log('Registering new user with username:', username, 'and password:', password);
});
