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

/**
 * Creates tabs to change between questions
 * @param  {Number} id To specify div to target
 * @param  {Number} index This helps for numbering of tabs and set first tab as active
 * @return Tablist for navigation
 */

let TabListComponent = ({ id }, index) => {
  tabsList = document.createElement("li");
  tabsList.className = "nav-item";
  tabsList.innerHTML = `<a class="nav-link ${
    index == 0 ? "active" : ""
  }" data-toggle="tab" href="#${id}" role="tab" aria-selected="true">${
    index + 1
  }</a>`;
  return tabsList;
};

/**
 * Creates next and submit button
 * @param  {Number} id To use it for distinguishing button from which question
 * @param  {String} type This helps for showing submit button in last question
 * @return Button
 */

let ButtonComponent = (type, id) => {
  let button = document.createElement("button");
  button.className = `button" class="ml-auto d-flex btn btn-primary ${
    type == "next" ? "nextQuestion" : "submitForm"
  }`;
  button.id = id;
  button.innerHTML = type == "next" ? "Save" : "Submit";
  return button;
};

/**
 * Creates textarea with next/submit button
 * @param  {Array} questionsData To help in showing submit button at the last question
 * @param  {Number} id To specify div to target
 * @param  {Number} index This helps for keeping check of current tab
 * @return TextArea
 */

let TextareaComponent = (questionsData, id, index) => {
  let textAreaDiv = document.createElement("div");
  textAreaDiv.className = `col-md-10 `;
  let textArea = document.createElement("textarea");
  textArea.className = `w-100 mt-3 ${id}`;
  textArea.placeholder = "Comment";
  textArea.cols = "30";
  textArea.rows = "5";
  textAreaDiv.appendChild(textArea);
  index < questionsData.length - 1
    ? textAreaDiv.appendChild(ButtonComponent("next", id))
    : textAreaDiv.appendChild(ButtonComponent("submit", id));

  return textAreaDiv;
};

/**
 * Embeds candidate's video response to question
 * @param  {String} question To display question
 * @param  {String} answerUrl Candidate's response to the given question
 * @return Iframe
 */

let IframeComponent = ({ question, answerUrl }) => {
  let iframeDiv = document.createElement("div");
  iframeDiv.className = "col-md-10 mt-3 iframe-div";
  iframeDiv.innerHTML = `<h4>${question}</h4><iframe src=${answerUrl} title=${question} allowfullscreen width="100%" height="100%" style="
  height: 56vh;"></iframe>`;
  return iframeDiv;
};

/**
 * Creates textarea with next/submit button
 * @param  {Array} gradesData To show grades input in form of radio button on right side
 * @param  {Number} id To specify div to target
 * @return GradeComponent
 */

let GradeComponent = (gradesData, id) => {
  let gradeDiv = document.createElement("div");
  gradeDiv.className = "col-md-2 mt-3";
  let gradeHeading = document.createElement("h4");
  gradeHeadingText = document.createTextNode("Grade candidate");
  gradeHeading.appendChild(gradeHeadingText);
  gradeDiv.appendChild(gradeHeading);
  let card = document.createElement("div");
  card.className = "card";
  let gradeGroup = document.createElement("div");
  gradeGroup.className = `mr-auto ${id}`;
  gradeGroup.setAttribute("data-toggle", "buttons");
  gradeGroup.style.display = "grid";
  gradesData.forEach((grade) => {
    let label = document.createElement("label");
    label.className = "btn btn-default";
    let input = document.createElement("input");
    input.type = "radio";
    input.name = id;
    input.value = `${grade.value}`;
    label.appendChild(input);
    let labelText = document.createTextNode(`${grade.label}`);
    label.appendChild(labelText);
    gradeGroup.appendChild(label);
  });
  card.appendChild(gradeGroup);
  gradeDiv.appendChild(card);
  return gradeDiv;
};

/*Takes each question from questionsData and makes a page corresponding to that question consisting of question, video, grades input and textarea*/

questionsData.forEach((question, index) => {
  let tabsList = TabListComponent(question, index);
  questionsTab.appendChild(tabsList);

  let tabPanel = document.createElement("div");
  tabPanel.className = `tab-pane fade ${index == 0 ? "show active" : ""}`;
  tabPanel.id = `${question.id}`;
  tabPanel.setAttribute("role", "tabPanel");

  let row = document.createElement("div");
  row.className = "row";

  let iframeDiv = IframeComponent(question);

  let gradeDiv = GradeComponent(gradesData, question.id);

  row.appendChild(iframeDiv);
  row.appendChild(gradeDiv);

  let row2 = document.createElement("div");
  row2.className = "row";

  let textAreaDiv = TextareaComponent(questionsData, question.id, index);

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

/** Previous and next button to use navigation using these buttons */
document.querySelector(".previous").addEventListener(
  "click",
  function (e) {
    e.preventDefault;
    document
      .querySelector(".nav-tabs > .nav-item > .active")
      .parentNode.previousElementSibling.querySelector("a")
      .click();
  },
  false
);

document.querySelector(".next").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    document
      .querySelector(".nav-tabs > .nav-item > .active")
      .parentNode.nextElementSibling.querySelector("a")
      .click();
  },
  false
);
/**
 * 
 Store user responses
 */
let answer = [];
class questionResponse {
  constructor(id, question, grade, comment) {
    this.id = id;
    this.question = question;
    this.grade = grade;
    this.comment = comment;
  }
}

/**
 * 
 Validates if all the fields are filled and checks if new response should pe appended or question was already saved and made changes later
 */

function storeResponse(e, index, submit = false) {
  e.preventDefault();
  let id = e.target.id;
  if (
    document.forms.candidateForm[id].value &&
    document.querySelectorAll(`.${id}`)[1].value
  ) {
    let question = questionsData[index].question;
    let grade = document.forms.candidateForm[id].value;
    let comment = document.querySelectorAll(`.${id}`)[1].value;
    let o = answer.find((o) => o.id === id);
    if (!o) answer.push(new questionResponse(id, question, grade, comment));
    else {
      o.grade = grade;
      o.comment = comment;
    }
    if (submit) {
      if (answer.length == questionsData.length) {
        localStorage.setItem("responses", JSON.stringify(answer));
        document.forms[0].reset();
        window.location.pathname = "./display.html";
      } else {
        alert("All questions are mandatory");
      }
    }
    document
      .querySelector(".nav-tabs > .nav-item > .active")
      .parentNode.nextElementSibling.querySelector("a")
      .click();
  } else {
    alert("fill all value");
  }
}

document.querySelectorAll(".nextQuestion").forEach((nextButton, index) => {
  nextButton.addEventListener(
    "click",
    function (e) {
      storeResponse(e, index);
    },
    false
  );
});
document.querySelector(".submitForm").addEventListener(
  "click",
  function (e) {
    storeResponse(e, questionsData.length - 1, true);
  },
  false
);
