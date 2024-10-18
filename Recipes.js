async function fetchRecipes(){
    return fetch("./recipes.json")
    .then(response => response.json())
    .then(json =>{
        return json;
    });
}

function loadRecipes(recipes){
    const arrayMovies = Object.values(recipes)

    var CardRecipe = document.getElementById("recipe-list");
    CardRecipe.innerHTML=""
    for(let i = 0; i<arrayMovies.length;i++){
        let recipe = arrayMovies[i];
        let id = recipe.id;
        let description = recipe.description;
        let title = recipe.title;
        let image = recipe.image;
        let addCardRecipe= document.createElement("div");
        addCardRecipe.classList.add("col");
        addCardRecipe.innerHTML= `
        <div class="card shadow-sm">
            <img src=${image} class="card-img-top" alt=${description}></img>
            <div class="card-body">
            <h5 class="card-title"> ${title}</h5>
            </div>
            </div>
        `;
        addCardRecipe.addEventListener("click", function() {
            // Redirect to recipe.html with the recipe ID as a query parameter
            window.location.href = `recipe.html?id=${id}`;
        });
        CardRecipe.appendChild(addCardRecipe);
    }

}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        fetchRecipes().then(recipes => loadRecipes(recipes));
    }
});