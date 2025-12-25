import './General.css'
import './App.css'
import './ATM.css'
import WelcomePage from './WelcomePage'
import Verify from './Verify.jsx'
import MenuPage from './MenuPage.jsx'
import WithdrawPage from './WithdrawPage.jsx'
import DepositPage from './Deposit.jsx'
import BalancePage from './BalancePage.jsx'
import { useState } from 'react'


 function ATM() {
  const [page, setPage] = useState("welcomePage");                            //controls which page is currently active
  const [transactionFee, setTransactionFee] = useState(2);                    //this will be used in deposit and withdraw calcs
  const [user, setUser] = useState({                                                
                                                  name : '',
                                                  accountNumber: '',
                                                  pinNo : '',
                                                  balance : 0
         });                                                                  //default state of the user useState

  const defaultUser = {
        name: "",
        accountNumber: "",
        pinNo: "",
        balance: 0,
    };                                                                      //user object with default values: to be used when resetting a user after logout.


  /*

  1. page stores the initial state which is "welcomePage"
  2. so in inner-card, since initially the state is "welcomePage",
  3. so <WelcomePage user={user} setPage={setPage} page={page}/> will be rendered first.

  */
        

   return (
    /*

    we have our outer card
    we have our inner card
    child components will render in the inner-card div
    
    */ 

     <div className="outer-card bg-slate-900 pt-4">
        
            <div id="outer-card-txt-div">
                <p id="bank-name-txt" className='text-blue-500 text-3xl font-bold pt-2'>Muks SecureBank ATM</p>
                <p id="available-txt" className='text-gray-400 mt-1'>Available 24/7</p>
            </div> 

            <div className="inner-card">
              {page === "welcomePage" && <WelcomePage user={user} setPage={setPage} page={page}/>}
              {page === "verifyPage" && <Verify user={user} setUser={setUser} setPage={setPage} page={page}/>}
              {page === "menuPage" && <MenuPage defaultUser={defaultUser} user={user} setPage={setPage} setUser={setUser} page={page}/>}
              {page === "withdrawPage" && <WithdrawPage user={user} transactionFee={transactionFee} setUser={setUser} setPage={setPage} page={page}/>}
              {page === "balancePage" && <BalancePage  user={user} setPage={setPage} page={page}/>}
              {page === "depositPage" && <DepositPage user={user} transactionFee={transactionFee} setUser={setUser} setPage={setPage} page={page}/>}
            </div>
            
     </div>
   )
 }
 
 export default ATM