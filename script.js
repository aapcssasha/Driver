// Define the symbols of your stocks
let stockSymbols = ['BABA', 'AAPL', 'TSLA', 'MSFT', 'COF', 'LUV'];

// You need to get a free API key from Alpha Vantage
const apiKey = "ETUXG97GLN4PVQ2R"; 

async function getPrice(symbol) {
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    return parseFloat(data['Global Quote']['05. price']);
}

async function updateDataArray() {
    var dataArray = [
        ['Stock', 'Percentage'],
        ['BABA', await getPrice('BABA')],
        ['AAPL', await getPrice('AAPL')],
        ['TSLA', await getPrice('TSLA')],
        ['MSFT', await getPrice('MSFT')],
        ['COF', await getPrice('COF')],
        ['LUV', await getPrice('LUV')],
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
        chartArea: { width: '100%', height: '50%'},
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(updateDataArray);

// Iterate over your stock symbols to fetch prices and update the corresponding HTML elements
stockSymbols.forEach(symbol => {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        let stockPrice = parseFloat(data["Global Quote"]["05. price"]).toFixed(2);
        document.getElementById(`price-${symbol}`).innerText = stockPrice;
    })
    .catch(error => console.error('Error:', error));
});
