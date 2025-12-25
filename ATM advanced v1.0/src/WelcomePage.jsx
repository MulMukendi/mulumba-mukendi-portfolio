import './General.css'

function WelcomePage({ setPage }) {
  
  //clicking the proceed button takes you to the Verify page

  return (
    <div className="card flex flex-col items-center bg-gradient-to-l from-slate-950 to-blue-950">
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="#2196F3" className="card-svg-size mb-8"
          >
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 
          9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25
          2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>

        <p id="welcome-txt" className='text-4xl mb-10 font-semibold'>Welcome</p>
        <p id="expecting-you-txt " className='text-2xl mb-9'>We have been expecting you! 😁</p>
       
        <button onClick={() => {setPage("verifyPage")}} 
        id="welcome-button" className='bg-blue-600
        hover:bg-blue-500 py-2 px-11 text-lg'>
        Proceed</button>
    
    </div>
  )
}

export default WelcomePage