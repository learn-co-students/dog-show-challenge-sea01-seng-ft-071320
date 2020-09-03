// Onload functions
fetchAndAppendDogs();
initClickEvents();
initSubmitEvents();

// Event Handling
function initClickEvents() {
  const dogTable = document.getElementById("dog-table");

  dogTable.addEventListener("click", clickEditDog);
}

function initSubmitEvents() {
  const dogForm = document.getElementById("dog-form");

  dogForm.addEventListener("submit", submitDogForm);
}

function clickEditDog(event) {
  if (event.target.matches(".edit-dog")) {
    const dogForm = document.getElementById("dog-form");

    const dogRow = event.target.parentElement.parentElement;
    const dogData = dogRow.getElementsByTagName("TD");
    const dogId = dogRow.id;

    dogForm.name.value = dogData[0].textContent;
    dogForm.breed.value = dogData[1].textContent;
    dogForm.sex.value = dogData[2].textContent;
    dogForm["dog-id"].value = dogId;
  }
}

function submitDogForm(event) {
  event.preventDefault();

  const dog = renderDogFields(event.target);
  clearEditDogFields(event.target);

  updateDog(dog);
  patchDog(dog);
}

// DOM Manipulation
function appendDogs(dogs) {
  const dogTable = document.getElementById("dog-table");

  for (const dog of dogs) {
    appendDog(dog, dogTable);
  }
}

function appendDog(dog, element) {
  element.appendChild(renderDog(dog));
}

function renderDog(dog) {
  const dogRow = document.createElement("tr");
  dogRow.classList.add("padding");
  dogRow.id = dog.id;

  dogRow.innerHTML = `
    <td class='padding center'>${dog.name}</td>
    <td class='padding center'>${dog.breed}</td>
    <td class='padding center'>${dog.sex}</td>
    <td class='padding center'><button class="edit-dog">Edit</button></td>
  `;

  return dogRow;
}

function renderDogFields(dogForm) {
  return {
    name: dogForm.name.value,
    breed: dogForm.breed.value,
    sex: dogForm.sex.value,
    id: dogForm["dog-id"].value,
  };
}

function clearEditDogFields(dogForm) {
  dogForm.name.value = "";
  dogForm.breed.value = "";
  dogForm.sex.value = "";
  dogForm["dog-id"].value = "";
}

function updateDog(dog) {
  const dogRow = document.getElementById(dog.id);

  dogRow.innerHTML = `
    <td class='padding center'>${dog.name}</td>
    <td class='padding center'>${dog.breed}</td>
    <td class='padding center'>${dog.sex}</td>
    <td class='padding center'><button class="edit-dog">Edit</button></td>
  `;
}

// API call functions
function fetchAndAppendDogs() {
  fetchDogs().then(appendDogs);
}

function fetchDogs() {
  return fetch("http://localhost:3000/dogs").then((resp) => resp.json());
}

function patchDog(dog) {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dog),
  };

  fetch(`http://localhost:3000/dogs/${dog.id}`, configObj)
    .then((resp) => resp.json())
    .catch(console.log);
}
