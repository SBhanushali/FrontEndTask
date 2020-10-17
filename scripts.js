let chartLabels = ["O", "C", "E", "A", "N"];
let minScale = 0;
let maxScale = 5;
let stepSize = 1;

var ctx = document.getElementById("myChart").getContext("2d");

let radarChartData = {
  labels: chartLabels,
  datasets: [
    {
      label: "Candidate Score",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: [1, 2, 3, 4, 5],
    },
  ],
};

let options = {
  responsive: true,
  //   maintainAspectRatio: false,
  legend: {
    position: "bottom",
  },
  scale: {
    reverse: false,
    ticks: {
      max: maxScale,
      min: minScale,
      stepSize: 1,
      beginAtZero: false,
    },
  },
  scaleOverride: false,
  tooltips: {
    enabled: true,
    displayColors: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return (
          "Score : " +
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
        );
      },
    },
  },
};

var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "radar",
  data: radarChartData,
  options: options,
});
