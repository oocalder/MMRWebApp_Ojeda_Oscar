
// INPUTS FROM TABLE
let startingAge;
let retirementAge;
let startSalary;
let annualSavingRate;
let annualRaiseRate;
let interestRate;
// OUTPUTS TO TABLE
let totalYearsToInvest = 0;
let retirementFund = 0;
let netSalary = 0;
let netSavings = 0;
let netInterest = 0;

// THE TABLES
var inputTable;
var summaryTable;
var resultsTable;

// Initial Function beginning
function initial() {
  inputTable = document.getElementById(
    "inputTableId"
  );
  summaryTable = document.getElementById(
    "summaryTableId"
  );
  resultsTable = document.getElementById(
    "resultsTableId"
  );


  startingAge = document.getElementById("startingAgeId")
  .value;
  retirementAge = document.getElementById("retirementAgeId").
value;
  startSalary = Number(
    document.getElementById("startingSalaryId")
      .value
  );
  annualSavingRate =
    document.getElementById("annualSavingsId").value /
    100;
  annualRaiseRate =
    document.getElementById("annualRaiseId").value /
    100;
  interestRate =
    document.getElementById("interestRateId")
      .value / 100;
}

// BUTTONS
function clearInput(form) {
  var formElements = form.elements;
  for (var i = 0; i < formElements.length; i++)
    formElements[i].value = "";
  clearTable(); // Clears previous table
}

function loadDefaults(form) {
  clearTable(); // Clears previous table
  form.reset();
}

function runComparison(form) {
  if (!form.checkValidity()) {
    alert(
      "Oops! missed something... Check your numbers "
    );
  } else {
    initial();
    clearTable(); // Clears previous table
    annuityCalculation();
  }
}

// Calulation Function
function annuityCalculation() {
  // Current - year 0, cur=current
  let curntrentAge = startingAge;
  let curntSalary = startSalary;
  let curntSavings = annualSavingRate * startSalary;
  let curntInterest = interestRate * curntSavings;
  let curntRetirement = curntSavings + curntInterest;

  // Net values
  netSalary 	= 0;
  netSavings 	= 0;
  netInterest 	= 0;

  let index = 0;

  for (
    let year = startingAge;
    year 	<= retirementAge;
    year++
  ) {


    // yr 0 initialize
    if (year == startingAge) {
      netSalary 	+= Number(curntSalary);
      netSavings 	+= Number(curntSavings);
      netInterest 	+= Number(curntInterest);
      console.log(
        Number(year).toFixed(0),
        Number(curntSalary).	toFixed(0),
        Number(curntSavings).	toFixed(0),
        Number(curntInterest).	toFixed(0),
        Number(curntRetirement).toFixed(0)
      );
    } else {
      curntSalary =
        (1 + annualRaiseRate) * curntSalary;
      curntSavings 		= annualSavingRate * curntSalary;
      curntInterest 	=
        interestRate 	*
        (curntSavings 	+ curntRetirement);
      curntRetirement 	+= curntInterest + curntSavings;

      netSalary 		+= Number(curntSalary);
      netSavings 		+= Number(curntSavings);
      netInterest 		+= Number(curntInterest);

      console.log(
        Number(year).toFixed(0),
        Number(curntSalary).toFixed(0),
        Number(curntSavings).toFixed(0),
        Number(curntInterest).toFixed(0),
        Number(curntRetirement).toFixed(0)
      );
    }
    var row = document
      .getElementById("tableResults")
      .insertRow(index);

    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);

    cell0.innerHTML = year; 
	cell1.innerHTML =
      formatNumberWithCommas(curntSalary);cell2.innerHTML =
      formatNumberWithCommas(curntSavings);cell3.innerHTML =
      formatNumberWithCommas(curntInterest);cell4.innerHTML = 
	  formatNumberWithCommas(
      curntRetirement
    );
    index++;


  }


  //   SUMMARY

  document.getElementById("yearsId").innerHTML =
    retirementAge - startingAge;

  document.getElementById(
    "retirementFundId").
	innerHTML = formatNumberWithCommas(curntRetirement);

  document.getElementById(
    "lifetimeSalaryId").
	innerHTML = formatNumberWithCommas(netSalary);

  document.getElementById(
    "totalSavedId").
	innerHTML =formatNumberWithCommas(netSavings);

  document.getElementById("interestEarnedId").
  innerHTML =formatNumberWithCommas(netInterest);
}

//End of function 



// Function to Clear summary/


function clearTable() {
  document.getElementById("tableResults").		innerHTML ="";
  document.getElementById("yearsId").			innerHTML = "";
  document.getElementById("retirementFundId").	innerHTML = "";
  document.getElementById("lifetimeSalaryId").	innerHTML = "";
  document.getElementById("totalSavedId").		innerHTML = "";
  document.getElementById("interestEarnedId").	innerHTML = "";
}
