// Declaring the input fields
let mortgage = document.getElementById("mortgage");
let term = document.getElementById("term");
let interest = document.getElementById("interest");
let clear = document.getElementById("clear");
let calculate = document.getElementById("calculate");
let firstAppend = document.getElementById("content");
let hidden = document.getElementById("hidden");
let anotherstyle = document.getElementById("anotherstyle");
let showing = document.getElementById("second-writtenaspect");

// Clear button functionality
clear.addEventListener("click", function() {
    mortgage.value = "";
    term.value = "";
    interest.value = "";
    let checkedRadio = document.querySelector('input[name="mortgage-type"]:checked');
    if (checkedRadio) {
        checkedRadio.checked = false;
    }
    hidden.style.display = "block";
    firstAppend.innerHTML = "";
    anotherstyle.innerHTML = "";
    showing.style.display = "none";
});

// Calculate button functionality
calculate.addEventListener("click", function(event) {
    event.preventDefault();

    let mortgageValue = parseFloat(mortgage.value);
    let termValue = parseInt(term.value);
    let interestValue = parseFloat(interest.value) / 100;
    let mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

    if (!mortgageValue || mortgageValue <= 0 || !termValue || termValue <= 0 || !interestValue || interestValue <= 0 || !mortgageType) {
        alert("Please fill out all fields with valid values and select a mortgage type.");
        return;
    }

    mortgageType = mortgageType.value;
    let monthlyInterestRate = interestValue / 12;
    let numberOfPayments = termValue * 12;

    // Clear previous results
    firstAppend.innerHTML = "";
    anotherstyle.innerHTML = "";

    let create = document.createElement("h3");
    create.style.color = "gold";
    create.style.marginBottom = "20px";
    firstAppend.appendChild(create);

    let creates = document.createElement("h1");
    creates.style.color = "white";
    creates.style.marginBottom = "20px";
    anotherstyle.appendChild(creates);

    hidden.style.display = "none";
    showing.style.display = "block";

    if (mortgageType === "repayment") {
        let monthlyPayment = mortgageValue * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        create.textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
        creates.textContent = `Total Repayment: $${(monthlyPayment * numberOfPayments).toFixed(2)}`;
    } else if (mortgageType === "interests") {
        let monthlyPayment = mortgageValue * monthlyInterestRate;
        create.textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
        creates.textContent = `Total Interest: $${(monthlyPayment * numberOfPayments).toFixed(2)}`;
    }
});
