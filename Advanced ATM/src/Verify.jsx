import React, { useEffect, useState } from 'react'


function Verify({setUser, setPage}) {
       const [unlocked, setUnlocked] = useState(false);
       const [cleared, setClear] = useState(false);
       const [back, setBack] = useState(false);
       const [focused, setFocused] = useState('');
       const [account, setAccount] = useState('');
       const [users, setUsers] = useState([]);
       const [pin, setPin] = useState('');
       

       //if back is true then setPage will be set to "welcome"
       useEffect(() => {
                if (back) {
                        setPage("welcomePage");
                }
        }, [back]);



        /*
        when the clear button is clicked, the state is changed to true
        then the fields are cleared with the set methods
        then the state has to be changed back to false
        so that it will work every time
        */
        useEffect(() => {
                if (cleared) {
                        setAccount('');
                        setPin('');
                        setClear(false);
                }
        }, [cleared]);
       


        function appendNumber(e) {
                /*

                get the value of the button element with textContent
                if focused state is "account" then update the account state
                if focused state is "pin" then update the pin state

                when you update the state, the state is saved in the "value 
                property" of the input field

                react controls the state directly

                */
               
               let number = e.target.textContent;

                if (focused === "account") {
                        setAccount(prev => prev + number);
                }
                if(focused === "pin"){
                        setPin(prev => prev + number);
                }
        };


        /*
          
          fetch data from JSON file in public/
          if response is not ok, throw error
          if data is null or undefined, throw error
          set the state of users to data
          this is on initial render

         */
        useEffect(()=>{
                
               async function fetchUsers() {
                        try {
                                const response =  await fetch("/Users.json");
                                if(!response.ok) throw new Error("Failed to fetch");

                                const data =  await response.json(); 
                                if (data == null) throw new Error("No data found");

                                setUsers(data);
                                console.log("Fetched users:", data);
                                
                        } catch (error) {
                                alert("couldn't fetch data...");
                        }
                }

                fetchUsers();
        }, []);

        // get the user inputs and verify if they are within the "databaase(for now JSON file)"

        function verifyCredentials() {
                try {
                        // 1. Find user synchronously
                        const foundUser = users.find(u => u.accountNumber === account);
                        if (!foundUser) {
                                throw new Error("User not found");
                        }

                        // 2. Use the FOUND USER directly (not state)
                        const { pinNo } = foundUser;
                        

                        // 3. Verify pin
                        if (pin !== pinNo) {
                                throw new Error("Incorrect PIN");
                        }

                        // 4. Now update state for NEXT render
                        setUser(foundUser);
                        setUnlocked(true);
                        setPage("menuPage");

                } catch (error) {
                        alert(error.message);
                }
        }

        
        /*
        // old way - i tried

        function findUser() {
                try{
                        //find the user using the input account number
                        const foundUser = (users.find(u => u.accountNumber === account));
                        if (!foundUser) throw new Error("User was not found in the Data Base");    

                        setUser(foundUser);
                        
                        console.log(foundUser);
                }catch(error){
                        alert("user not found");
                } 
        }
                

        function verifyCredentials() {
                findUser();
                const {pinNo} = foundUser;

                console.log(user);

                if (pin === pinNo) {
                        setUnlocked(true);
                        setPage("menuPage");
                }else{
                        return false;
                }
        }*/

        
  return (
    <div className="card bg-gradient-to-l from-slate-950 to-blue-950">
        <div id="input-panel" className='relative flex flex-col px-4'>
                
                <button onClick={()=>{setBack(true)}} className="absolute backButton bg-transparent focus:outline-none border-none active:text-slate-400">🠔 Back</button>
         
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-20 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <input
                value={account}
                onFocus={() => setFocused("account")}
                onChange={e => setAccount(e.target.value)}
                type="text"
                placeholder="Enter account.."
                className='accountNumber pl-3 mb-4 rounded py-2 bg-slate-800'
                />

                <input
                value={pin}
                onFocus={() => setFocused("pin")}
                onChange={e => setPin(e.target.value)}
                type="password"
                inputMode="numeric"
                maxLength={3}
                placeholder="Enter Pin.."
                className='pinNumber pl-3 mb-5 rounded py-2 bg-slate-800'
                />

        </div>
        <div id="button-panel">
            <div id="panel-1">
                    <button onClick={appendNumber} id="one" className='numbers'>1</button>
                    <button onClick={appendNumber} id="=two" className='numbers'>2</button>
                    <button onClick={appendNumber} id="three" className='numbers'>3</button>
            </div>
            <div id="panel-2">            
                    <button onClick={appendNumber} id="four" className='numbers'>4</button>
                    <button onClick={appendNumber} id="five" className='numbers'>5</button>
                    <button onClick={appendNumber} id="six" className='numbers'>6</button>
            </div>
            <div id="panel-3">
                    <button onClick={appendNumber} id="seven" className='numbers'>7</button>
                    <button onClick={appendNumber} id="eight" className='numbers'>8</button>
                    <button onClick={appendNumber} id="nine" className='numbers'>9</button>  
            </div>
            <div id="panel-4">
                    <button onClick={()=>{setClear(true)}} id="clear-button" className='w-20 m-1 bg-slate-900'>Clear</button>
                    <button onClick={appendNumber} id="zero" className='numbers'>0</button>
                    <button onClick={verifyCredentials} id="enter-button" className='bg-green-500 w-20 m-1'>Enter</button>
            </div>

        </div>
        

    </div>
  )
}

export default Verify

