let input = document.getElementById("input");
let printedAmount = document.getElementById("printedAmount");
let firstNameInput = document.getElementById("firstName");
let secondNameInput = document.getElementById("secondName");
let moneyInput = document.getElementById("money");
let loginInput = document.getElementById("login-name");
let passwordInput = document.getElementById("password");
let confirmUser = document.getElementById("confirm-user");

let userInfo;
let userLoginInfo = false;
//repeated text prints
let messages = {
  emptyInputMsg: "Your input is empty",
  loginFirstMsg: "Login first",
  userRegistrated: "Your user is registrated."
}
let storedMultiple = ([]);

function formatName(name) {
  let input = name.value;
  let firstUpperCased;
  let processedLowerLetter;
  let sumLowerLetters = "";

  firstUpperCased = input.charAt(0).toUpperCase();
  for (let i = 1; i <= input.length; i++) {
    processedLowerLetter = input.charAt(i).toLowerCase();
    sumLowerLetters += processedLowerLetter;
  }
  return firstUpperCased + sumLowerLetters;
}

function inputInfo() {

  let formattedFirstName = formatName(firstNameInput);
  let formattedSecondName = formatName(secondNameInput);

  userInfo = {
    id: Date.now(),
    firstName: formattedFirstName,
    secondName: formattedSecondName,
    login: loginInput.value,
    password: passwordInput.value,
    money: Number(moneyInput.value),
  }
  let current = parsedUsers();
  if (current == null) {
    current = storedMultiple;
    userToLocal(current);
  } else {
    for (let i = 0; i < current.length; i++) {
      if (current[i].login == loginInput.value) {
        printedAmount.textContent = "User with this login already exists";
      }
      else { 
        userToLocal(current);
      }
    }
  }
}

function userToLocal(value) {
  value.push(userInfo);
  updatedLocalStorage(value);
  printedAmount.textContent = messages.userRegistrated;
}

function updatedLocalStorage(value) {
  localStorage.setItem("storedUser", JSON.stringify(value));
}

function parsedUsers() {
  return JSON.parse(localStorage.getItem("storedUser"));
}

function checkStored() {
  console.log(parsedUsers());
}

function confirmUserInfo() {
  let check = parsedUsers();
  for (let i = 0; i < check.length; i++) {
    if (check[i].login == loginInput.value &&
      check[i].password == passwordInput.value) {
      printedAmount.textContent = `Hello ${check[i].firstName}.`;
      return userLoginInfo = true;
    }
    if (check[i].login !== loginInput.value ||
      check[i].password !== passwordInput.value) {
      printedAmount.textContent = `Your input or login is incorrect`;
    }
    if (loginInput.value == "" || passwordInput.value == "") {
      printedAmount.textContent = `Your input is empty`;
    }
  }
}

function checkMoney() {
  let check = parsedUsers();
  for (let i = 0; i < check.length; i++) {
    if (userLoginInfo) {
      if (check[i].login == loginInput.value) {
        printedAmount.textContent = `Hello ${check[i].firstName}. You currently have ${check[i].money} money.`;
      }
    } else {
      printedAmount.textContent = messages.loginFirstMsg;
    }
  }
}

function depositMoney() {
  let storedUserInfo = parsedUsers();
  for (let i = 0; i < storedUserInfo.length; i++) {
    if (userLoginInfo) {
      if (input.value <= 0) {
        printedAmount.textContent = messages.emptyInputMsg;
      }
      else if (storedUserInfo[i].login == loginInput.value) {
        storedUserInfo[i].money += Number(input.value);
        printedAmount.textContent = `You deposited ${input.value} (amount)`;

        const updatedMoney = JSON.stringify(storedUserInfo);
        localStorage.setItem("storedUser", updatedMoney);
      }
    } else {
      printedAmount.textContent = messages.loginFirstMsg;
    }
  }
}

function widthrowMoney() {
  let storedUserInfo = parsedUsers();
  for (let i = 0; i < storedUserInfo.length; i++) {
    if (userLoginInfo) {
      if (input.value <= 0) {
        printedAmount.textContent = messages.emptyInputMsg;
      }
      else if (storedUserInfo[i].money < input.value
        && storedUserInfo[i].login == loginInput.value) {
        printedAmount.textContent = `You don't have enough funds to do that`;
      }
      else if (storedUserInfo[i].login == loginInput.value) {
        storedUserInfo[i].money -= Number(input.value);
        printedAmount.textContent = `You widthrew ${input.value} (amount)`;

        const updatedMoney = JSON.stringify(storedUserInfo);
        localStorage.setItem("storedUser", updatedMoney);
      }
    } else {
      printedAmount.textContent = messages.loginFirstMsg;
    }
  }
}

function deleteUserInfo() {
  let check = parsedUsers();
  if (userLoginInfo) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].login == loginInput.value &&
        check[i].password == passwordInput.value) {
        const updated = check.filter(value => value !== check[i]);
        printedAmount.textContent = `Your user ${check[i].firstName} ${check[i].secondName} is deleted.`
        updatedLocalStorage(updated);
      }
    }
  } else {
    printedAmount.textContent = messages.loginFirstMsg;
  }
}
