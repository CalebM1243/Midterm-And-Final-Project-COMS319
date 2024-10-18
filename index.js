function fetchRecipes() {
    return fetch("./data.json")
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

function loadRecipes(recipes) {
    const arrayRecipes = Object.values(recipes);
    const cardRecipeContainer = document.getElementById("recipe-list");
    cardRecipeContainer.innerHTML = "";

    let currentRow; // To keep track of the current row

    for (let i = 0; i < arrayRecipes.length; i++) {
        // Create a new row for every two recipes
        if (i % 2 === 0) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row", "mb-3"); // Add a margin-bottom for spacing between rows
            cardRecipeContainer.appendChild(currentRow); // Append the row to the recipe list container
        }

        let recipe = arrayRecipes[i];
        let id = recipe.id;
        let description = recipe.description;
        let title = recipe.title;
        let image = recipe.image;

        let addCardRecipe = document.createElement("div");
        addCardRecipe.classList.add("col-md-6"); // Each card takes up half the row (6 columns in a 12-column grid)
        addCardRecipe.innerHTML = `
            <div class="recipe-card">
                <img src="${image}" class="recipe-image" alt="${description}">
                <h3 class="recipe-title">${title}</h3>
                <p class="recipe-description">${description}</p>
                <a href="recipe.html?id=${id}" class="btn btn-primary">Make ${title}</a>
            </div>
        `;

        // Add a click event listener to the card
        addCardRecipe.addEventListener("click", function() {
            // Redirect to recipe.html with the recipe ID as a query parameter
            window.location.href = `recipe.html?id=${id}`;
        });

        // Append the card to the current row
        currentRow.appendChild(addCardRecipe);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        fetchRecipes().then(recipes => loadRecipes(recipes));
    }
});
