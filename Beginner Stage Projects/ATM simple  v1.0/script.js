//user accounts (objects) stored in array
const users = [                         
         {
            name : 'muks',
            accountNumber: "9999",
            pin : 111,
            balance : 250
        },
        {
            name : 'shelds',
            accountNumber: "8888",
            pin : 222,
            balance : 200
        },
        {
            name : 'muks',
            accountNumber: "7777",
            pin : 333,
            balance : 230
        }

];

//global variables
let theUser, userAccountNum;
let balance, withdrawAmount, depositAmount;

/*menu choices - store numbers for the switch structure 
to navigate the menu options*/
let choice;
const checkBalance = 1, withdraw = 2, deposit = 3, exit = 0;  
const options = `
                Check Balance > ${checkBalance}
                withdraw > ${withdraw}
                Deposit > ${deposit}
                exit > ${exit}
                `;






/*Get user account number and check if user is in the system
if the user exists, return the user object which contains 
the input account number. if that account 
number is not found then find() method
returns undefined
*/

userAccountNum = prompt(`account number: `);
theUser = users.find(user => user.accountNumber === userAccountNum);

while(true){
        if(theUser === undefined){
        window.alert(`account not found`);
        userAccountNum = prompt(`account number: `);
        theUser = users.find(user => user.accountNumber === userAccountNum);
        } else {
            break;
        }
}




/*get the pin input from user and validate it*/ 

let pinNumber = Number(prompt(`pin: `));
while(!(pinNumber === theUser.pin)){
    window.alert("invalid pin")
    pinNumber = Number(prompt(`pin: `));
}

window.alert(`Welcome ${theUser.name}, we've been expecting you!`)






/*now the user is logged in!
bring up the menu*/

choice = Number(prompt(options));
//prompt returns a string of the input, so we convert it to number.
while(!(choice === 0)){
            switch(choice){
            case 1: checkBalanceFunction();
            choice = Number(prompt(options));
            break;

            case 2: withdrawFunction();
            choice = Number(prompt(options));
            break;

            case 3: depositFunction();
            choice = Number(prompt(options));
            break;

            default:
            window.alert(`not valid option`)
            choice = Number(prompt(options));
        }
}

window.alert(`So sad to see you go, see you next time ${theUser.name} !`)





/*this fuction allows user to check their balance*/
function checkBalanceFunction(){
    window.alert(`${theUser.name} your balance is ${theUser.balance}`)
}



/*this function allows the user to withdraw an amount
checks if the entered input is 0 and if it is greater than the remaining balance in the account*/
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



/*this function allows the user to deposit an amount
checks if the entered input is an actual number or if the deposit amount is not less than 0 */
function depositFunction(){
    depositAmount = Number(prompt(`deposit amount: `));
    {
        if(!(isNaN(depositAmount) || depositAmount <= 0)){
                    balance = theUser.balance;
                    balance += depositAmount;
                    theUser.balance = balance;
                    depositAmount = 0;
        } else {
            window.alert("Invalid amount");
        }
    }

    
    
}
    

