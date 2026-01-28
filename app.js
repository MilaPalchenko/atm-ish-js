let input = document.getElementById("input");
let printedAmount = document.getElementById("printedAmount");
let firstNameInput = document.getElementById("firstName");
let secondNameInput = document.getElementById("secondName");
let moneyInput = document.getElementById("money");
let loginInput = document.getElementById("login-name");
let passwordInput = document.getElementById("password");
let confirmUser = document.getElementById("confirm-user");

class User {
  constructor(option) {
    this.firstName = option.firstName;
    this.secondName = option.secondName;
    this.money = option.money;
    this.login = option.login;
    this.password = option.password;
  }
}

let userInfo;
let userLoginInfo = false;

function inputInfo() {
  userInfo = new User({
    firstName: firstNameInput.value,
    secondName: secondNameInput.value,
    login: loginInput.value,
    password: passwordInput.value,
    money: Number(moneyInput.value),
  });
  localStorage.setItem("storedUser", JSON.stringify(userInfo));
}

function checkStored() {
  let check = JSON.parse(localStorage.getItem("storedUser"));
  console.log(check);
}

function confirmUserInfo() {
  let check = JSON.parse(localStorage.getItem("storedUser"));
  if (check.login == loginInput.value &&
    check.password == passwordInput.value) {
    printedAmount.textContent = `Hello ${check.firstName}.`;
    return userLoginInfo = true;
  }
}

function checkMoney() {
  let check = JSON.parse(localStorage.getItem("storedUser"));
  if (userLoginInfo) {
    printedAmount.textContent = `Hello ${check.firstName}. You currently have ${check.money} money.`;
  } else {
    printedAmount.textContent = `Login first`;
  }
}

function depositMoney() {
  let check = JSON.parse(localStorage.getItem("storedUser"));
  if (userLoginInfo) {
    if (input.value <= 0) {
      printedAmount.textContent = `Your input is empty`
    } else {
      check.money += Number(input.value);
      printedAmount.textContent = `You deposited ${input.value} (amount)`;
      
      const updatedMoney = JSON.stringify(check);
      localStorage.setItem("storedUser", updatedMoney);
    }
  } else {
    printedAmount.textContent = `Login first`;
  }
}

function widthrowMoney() {
  let check = JSON.parse(localStorage.getItem("storedUser"));
  if (userLoginInfo) {
    if (input.value <= 0) {
      printedAmount.textContent = `Your input is empty`
    } else {
      if (check.money < input.value) {
        printedAmount.textContent = `You don't have enough funds to do that`;
      } else {
        check.money -= Number(input.value);
        printedAmount.textContent = `You widthrew ${input.value} (amount)`;

        const updatedMoney = JSON.stringify(check);
        localStorage.setItem("storedUser", updatedMoney);
      }
    }
  } else {
    printedAmount.textContent = `Login first`;
  }
}

