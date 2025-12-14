const resetBtn = document.querySelector('button');
const inputs = document.querySelectorAll('input');
const form = document.getElementById('bill-form');
const billInput = document.querySelector('.bill-input');
const customTip = document.querySelector('.custom-tip');
const peopleInput = document.querySelector('.people-input');
const tipResult = document.querySelector('.tip-per-person');
const totalResult = document.querySelector('.total-per-person');
const errorMessage = document.querySelector('.error-message');
function enableReset() {
  resetBtn.disabled = false;
}
function uncheckOthers() {
  const checkedTip = document.querySelector('input[name="tip"]:checked');
  if (checkedTip) {
    checkedTip.checked = false;
  }
}
function removeErrorMsg() {
  peopleInput.classList.remove('error-state');
  errorMessage.textContent = "";
}
function updateResult(tip, total) {
  tipResult.textContent = tip.toFixed(3);
  totalResult.textContent = total.toFixed(3);
}
function calculate() {
  const tipInput = document.querySelector('input[name="tip"]:checked') || customTip;
  const tip = Number(tipInput.value) || 0;
  const bill = Number(billInput.value) || 0;
  const people = peopleInput.value;
  if (people === "0") {
    errorMessage.textContent = "Can't be zero";
    peopleInput.classList.add('error-state');
  } else if (people) {
    const totalTip = (tip / 100) * bill;
    const tipPerPerson = totalTip / Number(people);
    const totalPerPerson = bill / Number(people) + tipPerPerson;
    updateResult(tipPerPerson, totalPerPerson);
  } 
}
function handleInputChange() {
  enableReset();
  calculate();
}


resetBtn.addEventListener("click", () => {
  setTimeout(() => {
    resetBtn.disabled = true;
  }, 0);
});
customTip.addEventListener("focus", uncheckOthers);
peopleInput.addEventListener("keydown", removeErrorMsg);
inputs.forEach((input) => {
  input.addEventListener('input', handleInputChange);
});
