let chartLabels = ["O", "C", "E", "A", "N"];
let minScale = 0;
let maxScale = 5;
let stepSize = 1;

let questionsData = [
  {
    id: "Q1",
    question: "Tell Me About Yourself.",
    answerUrl: "https://www.youtube.com/embed/oznr-1-poSU",
  },
  {
    id: "Q2",
    question: "Why Do You Want to Work at This Company?",
    answerUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: "Q3",
    question: "Why Do You Want This Job?",
    answerUrl: "https://www.youtube.com/embed/oznr-1-poSU",
  },
  {
    id: "Q4",
    question: "How Did You Hear About This Position?",
    answerUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: "Q5",
    question: "What Do You Consider to Be Your Weaknesses?",
    answerUrl: "https://www.youtube.com/embed/oznr-1-poSU",
  },
];

let gradesData = [
  {
    label: "Very Bad",
    value: 1,
  },
  {
    label: "Bad",
    value: 2,
  },
  {
    label: "Average",
    value: 3,
  },
  {
    label: "Good",
    value: 4,
  },
  {
    label: "Very Good",
    value: 5,
  },
];

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

let questionsTab = document.createElement("ul");
questionsTab.className = "nav nav-tabs";
questionsTab.setAttribute("role", "tablist");

let tabsList = document.createElement("li");
tabsList.className = "nav-item";
tabsList.innerHTML = `<button class="btn previous">Previous</button>`;
questionsTab.appendChild(tabsList);

let tabContent = document.createElement("div");
tabContent.className = "tab-content";
tabContent.id = "nav-tabContent";

questionsData.forEach((question, index) => {
  /**************** navlinks ******************/
  tabsList = document.createElement("li");
  tabsList.className = "nav-item";
  tabsList.innerHTML = `<a class="nav-link ${
    index == 0 ? "active" : ""
  }" data-toggle="tab" href="#${question.id}" role="tab" aria-selected="true">${
    index + 1
  }</a>`;
  questionsTab.appendChild(tabsList);
  /**************** navlinks ******************/
  let tabPanel = document.createElement("div");
  tabPanel.className = `tab-pane fade ${index == 0 ? "show active" : ""}`;
  tabPanel.id = `${question.id}`;
  tabPanel.setAttribute("role", "tabPanel");

  let row = document.createElement("div");
  row.className = "row";

  let iframeDiv = document.createElement("div");
  iframeDiv.className = "col-md-10 mt-3 iframe-div";

  iframeDiv.innerHTML = `<h4>${question.question}</h4><iframe src=${question.answerUrl} title=${question.question} allowfullscreen height="100%" width="100%"></iframe>`;

  let gradeDiv = document.createElement("div");
  gradeDiv.className = "col-md-2 mt-3";

  let gradeHeading = document.createElement("h4");
  gradeHeadingText = document.createTextNode("Grade candidate");
  gradeHeading.appendChild(gradeHeadingText);

  gradeDiv.appendChild(gradeHeading);
  console.log(gradeDiv);
  let card = document.createElement("div");
  card.className = "card";
  let gradeGroup = document.createElement("div");
  gradeGroup.className = "mr-auto";
  gradeGroup.setAttribute("data-toggle", "buttons");
  gradeGroup.style.display = "grid";
  gradesData.forEach((grade, i) => {
    let label = document.createElement("label");
    label.className = "btn btn-default";
    let input = document.createElement("input");
    input.type = "radio";
    // input.id = `${i}`;
    input.name = "grade";
    input.value = `${grade.value}`;

    label.appendChild(input);
    let labelText = document.createTextNode(`${grade.label}`);
    label.appendChild(labelText);
    gradeGroup.appendChild(label);
  });
  card.appendChild(gradeGroup);
  gradeDiv.appendChild(card);

  row.appendChild(iframeDiv);
  row.appendChild(gradeDiv);

  let row2 = document.createElement("div");
  row2.className = "row";
  let textAreaDiv = document.createElement("div");
  textAreaDiv.className = "col-md-10";

  textAreaDiv.innerHTML = `<textarea
                            class="w-100 mt-3"
                            placeholder="Comment"
                            cols="30"
                            rows="5"
                            ></textarea>
                            <button type="button" class="ml-auto d-flex btn btn-primary">
                                Submit
                            </button>`;
  row2.appendChild(textAreaDiv);

  tabPanel.appendChild(row);
  tabPanel.appendChild(row2);
  tabContent.appendChild(tabPanel);
});

tabsList = document.createElement("li");
tabsList.className = "nav-item";
tabsList.innerHTML = `<button class="btn next">Next</button>`;
questionsTab.appendChild(tabsList);

document.getElementById("questions").appendChild(questionsTab);
document.getElementById("questions").appendChild(tabContent);

document.querySelector(".previous").addEventListener(
  "click",
  function () {
    document
      .querySelector(".nav-tabs > .nav-item > .active")
      .parentNode.previousElementSibling.querySelector("a")
      .click();
  },
  false
);

document.querySelector(".next").addEventListener(
  "click",
  function () {
    document
      .querySelector(".nav-tabs > .nav-item > .active")
      .parentNode.nextElementSibling.querySelector("a")
      .click();
  },
  false
);
