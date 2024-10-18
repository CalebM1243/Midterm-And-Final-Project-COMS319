
function loadRecipe(recipes) {
    const arrayMovies = Object.values(recipes);
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');
    let recipe;

    // Find the recipe by its ID
    arrayMovies.forEach(element => {
        if (element.id == recipeId) {
            recipe = element;
        }
    });

    if (recipe) {
        let image = recipe.image;
        let title = recipe.title;
        let description = recipe.description;
        let ingredients = recipe.ingredients;
        let directions = recipe.directions;

        // Display the recipe data in the HTML
        document.getElementById('recipe-title').textContent = title;
        document.getElementById('recipe-image').src = image;
        document.getElementById('recipe-description').textContent = description;

        // Populate the ingredients list
        document.getElementById('recipe-ingredients').innerHTML = ingredients
            .map(item => `<li class="list-group-item">${item}</li>`)
            .join('');

        // Populate the directions list
        document.getElementById('recipe-directions').innerHTML = directions
            .map(step => `<li class="list-group-item">${step}</li>`)
            .join('');
    } else {
        console.error('Recipe not found');
    }
}

// Only run the script if the user is on recipe.html
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('recipe.html')) {
        fetchRecipes().then(recipes => loadRecipe(recipes));
    }
});

function fetchRecipes(){
    return fetch("./recipes.json")
    .then(response => response.json())
    .then(json =>{
        return json;
    });
}