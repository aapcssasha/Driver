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
let modal = document.getElementById("loginModal");
let btn = document.getElementById("login-button");
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// When the user clicks on the "Submit" button, log the entered data and close the modal
document.getElementById('submit-login').addEventListener('click', function() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    console.log('Logging in with username:', username, 'and password:', password);
    modal.style.display = "none";
});

