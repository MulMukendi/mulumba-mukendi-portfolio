import { useEffect, useState } from 'react';
import SuccessfulTransaction from './SuccessfulTransaction'

function Deposit({user, transactionFee, setPage, page, setUser}) {
    const [back, setBack] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);
    const [successful, setSuccessful] = useState(false); 


    //if the state: back is true, set the page state to menuPage. dependant on the change of state of = back 
    useEffect(() => {
                        if (back) {
                                setPage("menuPage");
                        }
                }, [back]);


        function confirmDeposit() {
                  const amount = Number(depositAmount);                             //depositAmount is read as a string from input element
                  
                  try {
                         
                         if (Number.isNaN(amount)) throw new Error("Invalid amount");
                         if (amount === 0) throw new Error("Can not deposit $0.");
                         if (amount < 10) throw new Error("Can not deposit under $10.");

                        const netDeposit = amount - transactionFee;


                        //how you update the balance in the state of the user
                        setUser(prev => ({
                          ...prev,
                          balance: prev.balance + netDeposit
                        }));


                        setSuccessful(true);                                    //if transaction is susccesful, return the details of the transaction
                        
                        setTimeout(() => setPage("menuPage"), 4000);        //return to menu page after 4 seconds

                  } catch (error) {
                        alert(error.message);
                  }
        }

  return (
    <div className="card  bg-gradient-to-l from-slate-950 to-blue-950">
        <div className="relative">
                <button  onClick={()=>{setBack(true)}} className="absolute backButton bg-transparent focus:outline-none border-none active:text-slate-400">🠔 Back</button>

                <p className="text-5xl mb-14 pt-16 font-medium ">Enter Amount</p>
                <input 
                    value={depositAmount} 
                    onChange={e => setDepositAmount(e.target.value)}
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0.00" 
                    className="w-96 h-20 rounded-2xl pl-44 mb-8 text-4xl bg-slate-800"/>
                <div className="text-xl  mb-4">
                      {successful===true && <SuccessfulTransaction page={page} depositAmount={depositAmount}/>}
                    </div>
                    <button onClick={confirmDeposit} className="w-96 h-20 rounded-2xl bg-green-600 text-2xl">Confirm Deposit</button>
        </div>
    </div>
  )
}

export default Deposit


