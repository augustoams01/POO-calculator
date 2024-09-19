//COMPONENT CALL
const previusOperationText = document.getElementById("previus-operation");
const currentOperationText = document.getElementById("current-operation");
const buttons = document.querySelectorAll("#buttons-container button");


//CALCULATOR CLASS THAT WILL CONTAIN ALL THE LOGIC APLICATION
class Calculator{

    constructor(previusOperationText, currentOperationText){
        this.previusOperationText = previusOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }


    
    //show in calculator screen
    showDigit(digit){
        //check if current typing alredy have a "."
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }


        this.currentOperation = digit;
        this.updateScreen();
    }

    //process the calculator operations
    processOperation(operation){ 
        //check If Current Is Empty
        
        //get current an previous values
        let operationValue;
        const previous = +this.previusOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+": 
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-": 
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/": 
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*": 
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            defalut: 
                return;
                
        }
            
    }

    //update values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else{
            if(previous === 0){
                operationValue = current;
            }

            this.previusOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
       
    }

}

const calc = new Calculator(previusOperationText, currentOperationText);

//EVENTS

buttons.forEach((btn)=>{

    btn.addEventListener("click", (e)=>{

        const value = e.target.innerText;

        //o "+" de "+value" serve para pegar value e converter para number
        //verificador, se for numero, imprima, se for operção, chame o método do objeto
        if(+value >= 0 || value === "."){
            calc.showDigit(value);
        } else{
            calc.processOperation(value); 
        }


    });

})