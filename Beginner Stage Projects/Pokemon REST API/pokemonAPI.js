//a function to fetch Pokemon sprites from the https://pokeapi.co/  API

async function getPokemon() {

    let spriteImage = document.getElementById("sprite");
    const searchName = document.getElementById("searchName").value.toLowerCase();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`);
        if (!response.ok) {
            throw new Error("Could not fetch recource.");
        }
        const data = await response.json();
        spriteImage.src = data?.sprites?.front_default;
        spriteImage.style.display = "block";


    } catch (error) {
        alert(error);
    }
}