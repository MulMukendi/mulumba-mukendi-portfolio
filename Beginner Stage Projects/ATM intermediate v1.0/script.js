/*
Author: Mulumba Mukendi
date  : 04/09/2025
days  : 1
IDE   : VS code
*/

//the point of this intermediate project is to teach myself how to fetch data dynamically from the JSON file and to use it in the JavaScript

//use global variables for this project

let theUser, userAccountNum, userBeingTransferedTo, accountToTransferFundsTo;
let balance, withdrawAmount, depositAmount, transferAmount, theirBalance;


/*
menu choices - store numbers for the switch structure 
to navigate the menu options
*/

let choice;
const checkBalance = 1, withdraw = 2, transfer = 3, deposit = 4, exit = 0;  
const options = `
                Check Balance > ${checkBalance}
                withdraw > ${withdraw}
                transfer > ${transfer}
                Deposit > ${deposit}
                exit > ${exit}
                `;




async function getData() {
    /*get the users from storage (JSON file)*/ 

    const response = await fetch("./userAccounts.json");        //returns a promise that will resolve to a response object
    const users = await response.json();                       //returns the data & parses it to JS (array/object) notation
    return users;
}




/*
Get user account number and check if user is in the 
"database" .if the user exists, return the user object 
which has the same account number as the input-account-number. 
if that account number is not found then find() method
returns undefined
*/

function main(users) {

    //get the account number from user and validate it
    
    userAccountNum = prompt(`account number: `);
    theUser = users.find(user => user.accountNumber === userAccountNum);    //find() returns undefined if the instance is not found
                
    while(true){
            if(theUser === undefined){
            window.alert(`account not found`);
            userAccountNum = prompt(`account number: `);
            theUser = users.find(user => user.accountNumber === userAccountNum);
            } else {
                break;
            }
    }

    //get the pin from user and validate it

    let pinNumber = Number(prompt(`pin: `));
    while(!(pinNumber === theUser.pin)){

            window.alert("invalid pin")
            pinNumber = Number(prompt(`pin: `));
    }

    window.alert(`Welcome ${theUser.name}, we've been expecting you!`)

    return theUser;
}


//this is the entry point of the program

async function startATM() {
    users = await getData();        //get users
    await main(users);              //pass the array of users to main()
    menu(users);                         //loop menu
}

startATM();


function menu(users) {
    /*
    now the user is logged in!
    bring up the menu
    */

    choice = Number(prompt(options));                //prompt returns a string of the input, so we convert it to number
    
    while(!(choice === 0)){                           //loop until user quits the application
                switch(choice){
                case 1: checkBalanceFunction();
                choice = Number(prompt(options));
                break;
                
                case 2: withdrawFunction();
                choice = Number(prompt(options));
                break;
    
                case 3: transferFunction(users);
                choice = Number(prompt(options));
                break;
    
                case 4: depositFunction();
                choice = Number(prompt(options));
                break;

                default:
                window.alert(`not valid option`);
                choice = Number(prompt(options));
            }
    }

    window.alert(`So sad to see you go, see you next time ${theUser.name} !`)
}




//this fuction allows user to check their balance

function checkBalanceFunction(){
    window.alert(`${theUser.name} your balance is ${theUser.balance}`)
}




/*this function allows the user to withdraw an amount. checks if the entered
 input is 0 and if it is greater than the remaining balance in the account*/

function withdrawFunction(){
    balance = theUser.balance;

     do{    
            withdrawAmount = Number(prompt(`withdraw amount: `));
            if(balance === 0) {
                window.alert(`No Funds to withdraw`);
                break;
            }
                
            else if( !(withdrawAmount > balance)){

                balance -= withdrawAmount;
                theUser.balance = balance;
                withdrawAmount = 0;
                break;

            } else {
                window.alert(`Choose smaller amount`);
            }

    } while(true);
    
}




/*this function allows the user to deposit an amount checks if the entered 
input is an actual number and if the deposit amount is not less than 0 */

function depositFunction(){
    depositAmount = Number(prompt(`deposit amount: `));
    {
        if(!isNaN(depositAmount) && depositAmount > 0){
                    balance = theUser.balance;
                    balance += depositAmount;
                    theUser.balance = balance;
                    depositAmount = 0;
        } else {
            window.alert("Invalid amount");
        }
    }
    
}
   



/**
 * the user enters the account to transfer money to
 * we check if thats a valid account
 * we return the object of that account
 * then they enter the amount they want to transfer
 * validate the input amount
 */

function transferFunction(users){

    /* 1 - find the accountToTransferFundsTo within the "database" according to the entered account number*/

    accountToTransferFundsTo =  window.prompt(`Which account to tranfering to: `);                  
    userBeingTransferedTo =  users.find(recipient => recipient.accountNumber === accountToTransferFundsTo);
    //window.alert(typeof userBeingTransferedTo); for testing purposes (the return value)



    /* 2 - check if the find() returns the actual object or undefined
    loop until the user enters a valid account number*/

    while(true){
        
        if(userBeingTransferedTo === undefined){

            window.alert(`Non valid account number`);
            accountToTransferFundsTo = window.prompt(`Which account to tranfering to: `);
            userBeingTransferedTo = users.find(recipient => recipient.accountNumber === accountToTransferFundsTo);
            //window.alert(typeof userBeingTransferedTo); for testing purposes (the return value)

        } else{
             window.alert(`Valid account number`);
            break; 
        }
    }


    
    /* 3 - get the transfer amount and check if it is a Number 
    and if it is at least greater than zero*/

    transferAmount = Number(window.prompt(`transfer amount: `));
    while(true){
        if(!isNaN(transferAmount) && transferAmount > 0){

            //window.alert(userBeingTransferedTo.balance) ; for testing purposes
            theirBalance = userBeingTransferedTo.balance;
            theirBalance += transferAmount;
            userBeingTransferedTo.balance = theirBalance;
            balance = theUser.balance;                          //your balance (should be reduced after transfer)
            balance -= transferAmount;
            theUser.balance = balance;
            window.alert(`
                Successful transfer
                Your updated balance: ${balance}
                Their updated balance: ${theirBalance}
                `);
            //window.alert(userBeingTransferedTo.balance) ; for testing purposes
            break;

        } else {
            
        }
    }    

}
