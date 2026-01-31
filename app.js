let input = document.getElementById("input");
let printedAmount = document.getElementById("printedAmount");
let firstNameInput = document.getElementById("firstName");
let secondNameInput = document.getElementById("secondName");
let moneyInput = document.getElementById("money");
let loginInput = document.getElementById("login-name");
let passwordInput = document.getElementById("password");
let confirmUser = document.getElementById("confirm-user");

// class User {
//   constructor(option) {
//     this.firstName = option.firstName;
//     this.secondName = option.secondName;
//     this.money = option.money;
//     this.login = option.login;
//     this.password = option.password;
//   }
// }

let userInfo;
let userLoginInfo = false;
//repeated text prints
let messages = {
  emptyInputMsg: "Your input is empty",
  loginFirstMsg: "Login first"
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

  // userInfo = new User({
  //   firstName: formattedFirstName,
  //   secondName: formattedSecondName,
  //   login: loginInput.value,
  //   password: passwordInput.value,
  //   money: Number(moneyInput.value),
  // });

  const current = parsedUsers();
  current.push(userInfo)
  updatedLocalStorage(current);
}

function updatedLocalStorage(value) { 
  localStorage.setItem("storedUser", JSON.stringify(value));
}

function parsedUsers() {
  return JSON.parse(localStorage.getItem("storedUser"));
}

function checkStored() {
  // TODO: figure out how to dig into the [n] part to pull specific user
  let test = parsedUsers();
  console.log(test[0].id);

  console.log(parsedUsers());
}

function confirmUserInfo() {
  let check = parsedUsers();
  if (check.login == loginInput.value &&
    check.password == passwordInput.value) {
    printedAmount.textContent = `Hello ${check.firstName}.`;
    return userLoginInfo = true;
  }
}

function checkMoney() {
  let check = parsedUsers();
  if (userLoginInfo) {
    printedAmount.textContent = `Hello ${check.firstName}. You currently have ${check.money} money.`;
  } else {
    printedAmount.textContent = messages.loginFirstMsg;
  }
}

function depositMoney() {
  let storedUserInfo = parsedUsers();
  if (userLoginInfo) {
    if (input.value <= 0) {
      printedAmount.textContent = messages.emptyInputMsg;
    } else {
      storedUserInfo.money += Number(input.value);
      printedAmount.textContent = `You deposited ${input.value} (amount)`;

      const updatedMoney = JSON.stringify(storedUserInfo);
      localStorage.setItem("storedUser", updatedMoney);
    }
  } else {
    printedAmount.textContent = messages.loginFirstMsg;
  }
}

function widthrowMoney() {
  let storedUserMoney = parsedUsers();
  if (userLoginInfo) {
    if (input.value <= 0) {
      printedAmount.textContent = messages.emptyInputMsg;
    } else {
      if (storedUserMoney.money < input.value) {
        printedAmount.textContent = `You don't have enough funds to do that`;
      } else {
        storedUserMoney.money -= Number(input.value);
        printedAmount.textContent = `You widthrew ${input.value} (amount)`;

        const updatedMoney = JSON.stringify(storedUserMoney);
        localStorage.setItem("storedUser", updatedMoney);
      }
    }
  } else {
    printedAmount.textContent = messages.loginFirstMsg;
  }
}

