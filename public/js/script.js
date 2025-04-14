document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const totalAmountInput = document.getElementById('total-amount');
    const peopleCountInput = document.getElementById('people-count');
    const tipPercentageInput = document.getElementById('tip-percentage');
    const calculateSplitBtn = document.getElementById('calculate-split');
    const splitResult = document.getElementById('split-result');
    const consoleOutput = document.getElementById('console-output');

    // Event Listeners
    calculateSplitBtn.addEventListener('click', calculateSplit);
    
    // Initialize with default values
    peopleCountInput.value = '2';
    tipPercentageInput.value = '15';

    // Function to calculate split bill
    function calculateSplit() {
        const totalAmount = parseFloat(totalAmountInput.value) || 0;
        const peopleCount = parseInt(peopleCountInput.value) || 1;
        const tipPercentage = parseFloat(tipPercentageInput.value) || 0;
        
        if (totalAmount <= 0 || peopleCount <= 0) {
            addConsoleMessage("> Error: Please enter valid amounts and people count", "error");
            return;
        }

        const tipAmount = totalAmount * (tipPercentage / 100);
        const totalWithTip = totalAmount + tipAmount;
        const amountPerPerson = totalWithTip / peopleCount;

        splitResult.textContent = `$${amountPerPerson.toFixed(2)}`;
        
        // Add to console
        addConsoleMessage(`> Split calculation complete: $${totalAmount.toFixed(2)} bill with ${tipPercentage}% tip split between ${peopleCount} people`);
        addConsoleMessage(`> Each person pays: $${amountPerPerson.toFixed(2)}`);
    }

    // Function to add messages to the console
    function addConsoleMessage(message, type = "info") {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        
        if (type === "error") {
            messageElement.style.color = "#ff5e5e";
        } else if (type === "success") {
            messageElement.style.color = "#4caf50";
        }
        
        consoleOutput.appendChild(messageElement);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // Initial console messages
    addConsoleMessage("> NexusCalc system initialized");
    addConsoleMessage("> All modules operational", "success");
    addConsoleMessage("> Ready for calculations");
});