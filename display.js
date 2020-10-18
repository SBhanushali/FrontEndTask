let responses = localStorage.getItem("responses");

localStorage.clear();
responses = JSON.parse(responses);

let tbody = document.createElement("tbody");
responses.forEach((response) => {
  let tr = document.createElement("tr");
  for (const [key, value] of Object.entries(response)) {
    let td = document.createElement("td");
    td.style.width = td.innerHTML = value;
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
});

document.querySelector(".table").appendChild(tbody);
