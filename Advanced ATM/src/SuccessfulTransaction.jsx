import { useEffect, useState } from 'react'

function SuccessfulTransaction({page, withdrawAmount, depositAmount}) {
    const [amount, setAmount] = useState(0);
    const [transactionType, setTransactionType] = useState(" ");

   
    useEffect(()=>{

            //if page is withdrawPage, then do the following in the if statement
            if(page==="withdrawPage"){
                    setAmount(withdrawAmount);
                    setTransactionType("Withdrew");
            }
            
            //if page is depositPage, then do the following in the if statement
            if(page==="depositPage"){
                    setAmount(depositAmount);
                    setTransactionType("Deposited");
            }

    },[withdrawAmount, depositAmount]);
            

    
  return (
    <div className='text-green-300'>Successfully {transactionType} ${amount}</div>
  )
}

export default SuccessfulTransaction