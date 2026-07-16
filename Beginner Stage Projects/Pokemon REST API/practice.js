
//regular promises
/*fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => {

            if (!response.ok) {
                throw new Error("could not fetch resource");
            }
            return response.json();
    })
    .then(data => {
            console.log("Pokemon data: ", data.name);
    })
    .catch(error => console.error(error));*/



//async/await function
/*async function fetchData() {

        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
           
            if (!response.ok) {
                
                throw new Error("Could not fetch resource");
            }
            return response.json();

        } catch (error) {
            console.error(error)
        }
}

async function run() {
    const data  = await fetchData();
    console.log(data);
}

run();*/