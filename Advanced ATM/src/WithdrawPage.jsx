import { useEffect, useState } from 'react';
import SuccessfulTransaction from './SuccessfulTransaction'

function WithdrawPage({user, transactionFee, setPage, page, setUser}) {
    const [back, setBack] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [successful, setSuccessful] = useState(false); 

    useEffect(() => {
                    if (back) {
                            setPage("menuPage");
                    }
            }, [back]);
     
  function confirmWithdraw() {
    const amount = Number(withdrawAmount);

    try {
            if (Number.isNaN(amount)) throw new Error("Invalid amount");
            if (amount === 0) throw new Error("Can not withdraw $0.");

            const total = amount + transactionFee;

            if (user.balance < total) {
              throw new Error("Insufficient funds.");
            }
                //old version: balance -= theWithdrawalPlusFee;
               //actual state update
            setUser(prev => ({
              ...prev,
              balance: prev.balance - total
            }));

            setSuccessful(true);
            setTimeout(() => setPage("menuPage"), 4000);

    } catch (error) {
            alert(error.message);
    }
  }

  

    //note for future self - dont forget to move user and users to ATM nad pass it down to child componenets
    return (
      <div className="card  bg-gradient-to-l from-slate-950 to-blue-950">
            <div className="relative">
                    <button  onClick={()=>{setBack(true)}} className="absolute backButton bg-transparent focus:outline-none border-none active:text-slate-400">🠔 Back</button>

                    <p className="text-5xl mb-14 pt-16 font-medium">Enter Amount</p>
                    <input 
                          value={withdrawAmount} 
                          onChange={e => setWithdrawAmount(e.target.value)}
                          type="number"
                          min="0"
                          step="1"
                          placeholder="0.00"
                          className="w-96 h-20 rounded-2xl pl-44 mb-8 text-4xl bg-slate-800"/>

                    <div className="text-xl  mb-4">
                      {successful===true && <SuccessfulTransaction page={page} withdrawAmount={withdrawAmount}/>}
                      </div>
                    <button onClick={confirmWithdraw} className="w-96 h-20 rounded-2xl bg-green-600 text-2xl">Confirm Withdrawal</button>
            </div>
                  
      </div>
      
    )
}

export default WithdrawPage