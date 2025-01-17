async function getDataForGraph() {
    const response = await fetch("henry.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);

    const labels = [];
    const shootingsData = [];
    const yearCounts = {};

    rows.forEach((elem) => {
        const row = elem.split(",");
        const occurDate = row[1]; 
        const year = occurDate.split("/")[2]; 

        yearCounts[year] = yearCounts[year] ? yearCounts[year] + 1 : 1;
    });

    for (const year in yearCounts) {
        labels.push(year);
        shootingsData.push(yearCounts[year]);
    }

    createChart(labels, shootingsData);
}

function createChart(labels, shootingsData) {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, 
            datasets: [{
                label: 'Number of Shootings',
                data: shootingsData,
                borderColor: 'rgba(255, 99, 132, 1)',  
                borderWidth: 2,  
                fill: false,  
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Number of Shootings Over Time',  
                    font: {
                        size: 24, 
                        weight: 'bold',  
                        family: 'Arial, sans-serif'  
                    },
                    color: '#333'  
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

getDataForGraph();
