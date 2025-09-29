const nameInput = document.querySelector("#nameInput");
const surnameInput = document.querySelector("#surnameInput");
const phoneInput = document.querySelector("#phoneInput");
const emailInput = document.querySelector("#emailInput");
const addBtn = document.querySelector("#addBookmarkBtn");
const listRef = document.querySelector("#bookmarkList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function render() {
  listRef.innerHTML = contacts
    .map(
      (c, i) => `
     <li>
    <div class="lis">
        <h4 class="nun">${c.name} ${c.surname}</h4 >
         <p class="nun">${c.phone}</p>
         <p class="nun">${c.email}</p>
         </div>
        <button type="button" class="edit" data-index="${i}">Редагувати</button>
        <button type="button" class="delete" data-index="${i}">Видалити</button>
      </li>
`
    )
    .join("");
}

function save() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
  render();
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name && surname && phone && email) {
    contacts.push({ name, surname, phone, email });

    nameInput.value = "";
    surnameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";

    save();
  }
});

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

render();