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
//repeated text prints
class Messages { 
  depositMsg = `You deposited ${input.value} (amount)`;
  widthrawMsg = `You widthrew ${input.value} (amount)`;
  emptyInputMsg = "Your input is empty";
  loginFirstMsg = "Login first"
}

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
    printedAmount.textContent = Messages.loginFirstMsg;
  }
}

function depositMoney() {
  let storedUserInfo = JSON.parse(localStorage.getItem("storedUser"));
  if (userLoginInfo) {
    if (input.value <= 0) {
      printedAmount.textContent = Messages.emptyInputMsg;
    } else {
      storedUserInfo.money += Number(input.value);
      printedAmount.textContent = Messages.depositMsg;
      
      const updatedMoney = JSON.stringify(storedUserInfo);
      localStorage.setItem("storedUser", updatedMoney);
    }
  } else {
    printedAmount.textContent = Messages.loginFirstMsg;
  }
}

function widthrowMoney() {
  let storedUserMoney = JSON.parse(localStorage.getItem("storedUser"));
  if (userLoginInfo) {
    if (input.value <= 0) {
      printedAmount.textContent = Messages.emptyInputMsg;
    } else {
      if (storedUserMoney.money < input.value) {
        printedAmount.textContent = `You don't have enough funds to do that`;
      } else {
        storedUserMoney.money -= Number(input.value);
        printedAmount.textContent = Messages.widthrawMsg;

        const updatedMoney = JSON.stringify(storedUserMoney);
        localStorage.setItem("storedUser", updatedMoney);
      }
    }
  } else {
    printedAmount.textContent = Messages.loginFirstMsg;
  }
}

