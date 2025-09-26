// const input = document.querySelector("#bookmarkInput");
// const addbBtn = document.querySelector("#addBookmarkBtn");
// const listRef = document.querySelector("#bookmarkList");

// let urlList = JSON.parse(localStorage.getItem("url")) || [];
// const render = function () {
//   listRef.innerHTML = urlList
//     .map(
//       (url, index) => `
//       <li>
//         <a href="${url}" target="_blank">${url}</a>
// <button type="button" class = "delete" data-index ="${index}">Видалити</button>
// <button type="button" class = "edit" data-index ="${index}">Редагувати</button>
// </li>`
//     )
//     .join("");
// };

// const save = function () {
//   localStorage.setItem("url", JSON.stringify(urlList));
//   render();
// };

// addbBtn.addEventListener("click", () => {
//   const url = input.value.trim();
//   if (url) {
//     urlList.push(url);
//     input.value = "";
//     save();
//   }
// });

// listRef.addEventListener("click", (evt) => {
//   const index = evt.target.dataset.index;
//   if (evt.target.nodeName !== "BUTTON") {
//     return;
//   }
//   if (evt.target.classList.contains("edit")) {
//     const newUrl = prompt("редагуйте посилання!", urlList[index]);
//     if (newUrl) {
//       urlList[index] = newUrl;
//       save();
//     }
//   }

//   if (evt.target.classList.contains("delete")) {
//     urlList.splice(index, 1);
//     save();
//   }
// });


const nameInput = document.querySelector("#nameInput");
const surnameInput = document.querySelector("#surnameInput");
const phoneInput = document.querySelector("#phoneInput");
const emailInput = document.querySelector("#emailInput");
const addBtn = document.querySelector("#addBookmarkBtn");
const listRef = document.querySelector("#bookmarkList");

// Load from localStorage
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function render() {
  listRef.innerHTML = contacts
    .map(
      (c, i) => `
      <li>
        <strong>${c.name} ${c.surname}</strong><br>
        📞 ${c.phone}<br>
        ✉️ ${c.email}<br>
        <button type="button" class="edit" data-index="${i}">Редагувати</button>
        <button type="button" class="delete" data-index="${i}">Видалити</button>
      </li>`
    )
    .join("");
}

function save() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
  render();
}

// Add new contact
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name && surname && phone && email) {
    contacts.push({ name, surname, phone, email });

    // clear inputs
    nameInput.value = "";
    surnameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";

    save();
  }
});

// Edit & delete
listRef.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (!e.target.matches("button")) return;

  if (e.target.classList.contains("edit")) {
    const c = contacts[index];
    const newName = prompt("Ім'я:", c.name);
    const newSurname = prompt("Прізвище:", c.surname);
    const newPhone = prompt("Телефон:", c.phone);
    const newEmail = prompt("Email:", c.email);
    if (newName && newSurname && newPhone && newEmail) {
      contacts[index] = {
        name: newName,
        surname: newSurname,
        phone: newPhone,
        email: newEmail,
      };
      save();
    }
  }

  if (e.target.classList.contains("delete")) {
    contacts.splice(index, 1);
    save();
  }
});

// Initial render
render();