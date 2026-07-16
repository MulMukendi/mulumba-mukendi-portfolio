import { useState } from 'react'

function MenuPage({ setUser, defaultUser, setPage}) {


    //onClick - reset the user state and set the page to welcomePage
    function handleExit() {
            setUser(defaultUser);
            setPage("welcomePage");
        
    }


  return (
    <div className="card flex flex-col place-content-center bg-gradient-to-l from-slate-950 to-blue-950">
        <p className='text-3xl mb-9 '>Select Transaction</p>
        <div className='flex place-content-center'>
            <div className=''>
                    <div onClick={()=>{setPage("withdrawPage")}} id="withdraw-button" className='menuButton mr-3 mb-3 hover:shadow-inner bg-blue-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-16 ml-12 pt-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <p className='mt-8'>Withdraw</p>
                    </div>
                    <div onClick={()=>{setPage("balancePage")}} id="balance-button" className='menuButton bg-purple-700 hover:shadow-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-16 ml-12 pt-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>

                        <p className='mt-8'>Balance</p>
                    </div>
            </div>
            <div className=''>
                    <div onClick={()=>{setPage("depositPage")}} id="deposit-button" className='menuButton mb-3 bg-green-500 hover:shadow-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="h-16 ml-12 pt-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>


                        <p className='mt-8'>Deposit</p>
                    </div>
                    <div onClick={handleExit} id="exit-button" className='menuButton  bg-red-700 hover:shadow-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="h-16 ml-12 pt-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>

                        <p className='mt-8'>Exit</p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default MenuPage