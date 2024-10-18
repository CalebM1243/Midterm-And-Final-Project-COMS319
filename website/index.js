function fetchRecipes(){
    return fetch("./data.json")
    .then(response => response.json())
    .then(json =>{
        return json;
    });
}

function loadRecipes(recipes) {
    const arrayMovies = Object.values(recipes);
    var CardRecipe = document.getElementById("recipe-list");
    CardRecipe.innerHTML = "";

    let currentRow; // To keep track of the current row

    for (let i = 0; i < arrayMovies.length; i++) {
        // Create a new row for every two recipes
        if (i % 2 === 0) {
            currentRow = document.createElement("div");
            currentRow.classList.add("row", "mb-3"); // Add a margin-bottom for spacing between rows
            CardRecipe.appendChild(currentRow); // Append the row to the recipe list container
        }

        let recipe = arrayMovies[i];
        let id = recipe.id;
        let description = recipe.description;
        let title = recipe.title;
        let image = recipe.image;

        let addCardRecipe = document.createElement("div");
        addCardRecipe.classList.add("col-sm-6"); // Each card takes up half the row (6 columns in a 12-column grid)
        addCardRecipe.innerHTML = `
            <div class="card shadow-sm border-primary mb-3">
                <img src="${image}" class="card-img-top recipe-image" alt="${description}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <a href="recipe.html?id=${id}" class="btn btn-primary">Make ${title}</a>
                </div>
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

