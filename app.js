let input = document.getElementById("input");
let printedAmount = document.getElementById("printedAmount");
let firstNameInput = document.getElementById("firstName");
let secondNameInput = document.getElementById("secondName");
let moneyInput = document.getElementById("money");
let loginInput = document.getElementById("login-name");
let passwordInput = document.getElementById("password");
let confirmUser = document.getElementById("confirm-user");
let transferLoginInput = document.getElementById("transfer-to-name");
let transferMoneyInput = document.getElementById("transfer-money");
let changeUserName = document.getElementById("change-username");

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

  let current;

  if (firstNameInput.value == "" || secondNameInput.value == "" || moneyInput == "" ||
    loginInput.value == "" || passwordInput.value == "") {
    printedAmount.textContent = `One or more fields are empty`;
  } else {
    current = parsedUsers();
    if (current == null) {
      current = storedMultiple;
    }
    for (let i = 0; i < current.length; i++) {
      if (current[i].login == loginInput.value) {
        printedAmount.textContent = `User with this login already exists`;
        return;
      }
      userToLocal(current);
    }
  }
}

function logout() {
  let check = parsedUsers();
  if (!userLoginInfo) {
    printedAmount.textContent = messages.loginFirstMsg;
    return;
  }
  if (userLoginInfo) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].login == loginInput.value
        && check[i].password == passwordInput.value) {
        userLoginInfo = false;
        printedAmount.textContent = `You've been logged out!`;
      }
    }
  }
}

function ifUserIsntLoggedIn() {
  if (!userLoginInfo) {
    printedAmount.textContent = messages.loginFirstMsg;
    return;
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
  ifUserIsntLoggedIn();
  if (userLoginInfo) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].login == loginInput.value) {
        printedAmount.textContent = `Hello ${check[i].firstName}. You currently have ${check[i].money} money.`;
      }
    }
  }
}

function depositMoney() {
  let storedUserInfo = parsedUsers();
  ifUserIsntLoggedIn();
  if (userLoginInfo) {
    for (let i = 0; i < storedUserInfo.length; i++) {
      if (input.value <= 0) {
        printedAmount.textContent = messages.emptyInputMsg;
      }
      else if (storedUserInfo[i].login == loginInput.value) {
        storedUserInfo[i].money += Number(input.value);
        printedAmount.textContent = `You deposited ${input.value} (amount)`;

        updatedLocalStorage(storedUserInfo);
      }
    }
  }
}

function widthrowMoney() {
  let storedUserInfo = parsedUsers();
  ifUserIsntLoggedIn();
  if (userLoginInfo) {
    for (let i = 0; i < storedUserInfo.length; i++) {
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

        updatedLocalStorage(storedUserInfo);
      }
    }
  }
}

function deleteUserInfo() {
  let check = parsedUsers();
  let updated;
  ifUserIsntLoggedIn();
  if (userLoginInfo) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].login == loginInput.value &&
        check[i].password == passwordInput.value) {
        updated = check.filter(value => value !== check[i]);
        printedAmount.textContent = `Your user ${check[i].firstName} ${check[i].secondName} is deleted.`
        updatedLocalStorage(updated);
      }
    }
  }
}

function transferMoney() {
  let check = parsedUsers();
  ifUserIsntLoggedIn();
  if (userLoginInfo) {
    if (transferLoginInput.value <= 0 ||
      transferMoneyInput.value <= 0) {
      printedAmount.textContent = messages.emptyInputMsg;
    }
    for (let i = 0; i < check.length; i++) {
      if (check[i].login == loginInput.value) {
        check[i].money -= Number(transferMoneyInput.value);
      }
    }
    for (let i = 0; i < check.length; i++) {
      if (check[i].login == transferLoginInput.value) {
        check[i].money += Number(transferMoneyInput.value);
      }
    }
    updatedLocalStorage(check);
    printedAmount.textContent = `Money has been transfered to user ${transferLoginInput.value}`;
  }
}

function changedUserName() {
  let check = parsedUsers();

  ifUserIsntLoggedIn()
  if (userLoginInfo) {
    for (let i = 0; i < check.length; i++) {
      if (check[i].password == passwordInput.value) {
        if (check[i].login == loginInput.value) {
          printedAmount.textContent = `Login name is the same.`;
          return;
        } else {
          check[i].login = loginInput.value;
          printedAmount.textContent = `Your login name has been changed.`
          updatedLocalStorage(check);
        }
      }
    }
  }
}