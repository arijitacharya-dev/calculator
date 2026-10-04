let display = document.getElementById("display");


// Add number or operator
function add(value) {

    // If display is 0, replace it with the new value
    if (display.value === "0") {

        // Don't allow "." as the first character
        if (value === ".") {
            display.value = "0.";
        }
        else {
            display.value = value;
        }

        return;
    }


    // If value is a decimal point
    if (value === ".") {

        // Split expression into numbers
        let parts = display.value.split(/[\+\-\*\/%]/);

        // Get the last number
        let lastNumber = parts[parts.length - 1];

        // Only allow one decimal point in one number
        if (!lastNumber.includes(".")) {
            display.value += value;
        }

        return;
    }


    // If value is an operator
    if ("+-*/%".includes(value)) {

        let lastCharacter = display.value.slice(-1);

        // Don't allow two operators together
        if ("+-*/%".includes(lastCharacter)) {
            return;
        }

        display.value += value;

        return;
    }


    // Add number
    display.value += value;
}


// Clear calculator
function clearDisplay() {

    display.value = "0";
}


// Delete last character
function deleteNumber() {

    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    }
    else {
        display.value = "0";
    }
}


// Calculate result
function calculate() {

    try {

        let expression = display.value;


        // Check if expression ends with an operator
        let lastCharacter = expression.slice(-1);

        if ("+-*/%".includes(lastCharacter)) {
            return;
        }


        // 5%20 = 5 percent of 20
        expression = expression.replace(
            /(\d+(\.\d+)?)%(\d+(\.\d+)?)/g,
            "($1/100*$3)"
        );


        // Normal percentage
        expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );


        // Calculate
        let answer = eval(expression);


        // Fix JavaScript decimal precision problem
        answer = Number(answer.toFixed(10));


        // Show answer
        display.value = answer;

    }
    catch {

        display.value = "Error";

    }
}