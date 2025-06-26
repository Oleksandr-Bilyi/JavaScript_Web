document.getElementById("home").addEventListener("click", loadHome);
document.getElementById("catalog").addEventListener("click", loadCategories);

function loadHome() {
  document.getElementById("content").innerHTML = `
    <h1>Welcome to our Store!</h1>
    <p>Click "Catalog" to explore products.</p>`;
}

function loadCategories() {
  fetch("data/categories.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load categories");
      return res.json();
    })
    .then((categories) => {
      const content = document.getElementById("content");
      content.innerHTML =
        "<h2>Catalog Categories</h2><ul class='list-group mb-3'>";
      categories.forEach((cat) => {
        content.innerHTML += `<li class='list-group-item'>
            <a href="#" onclick="loadCategory('${cat.shortname}')">${cat.name}</a>
          </li>`;
      });
      content.innerHTML += `
        <li class='list-group-item'>
          <a href="#" onclick="loadRandomCategory()">Specials</a>
        </li></ul>`;
    })
    .catch((err) => {
      document.getElementById(
        "content"
      ).innerHTML = `<div class="alert alert-danger">Error loading categories: ${err.message}</div>`;
    });
}

function loadCategory(shortname) {
  fetch(`data/${shortname}.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load category: ${shortname}`);
      return res.json();
    })
    .then((data) => {
      const content = document.getElementById("content");
      content.innerHTML = `<h2 class="mb-4">${data.categoryName}</h2><div class="row">`;
      data.items.forEach((item) => {
        content.innerHTML += `
          <div class="col-md-6 mb-4">
            <div class="card h-100 text-center">
              <img src="${getPlaceholderUrl(
                item.name
              )}" class="card-img-top" alt="${item.name}">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-text fw-bold">${item.price}</p>
              </div>
            </div>
          </div>
        `;
      });
      content.innerHTML += `</div>`;
    })
    .catch((err) => {
      document.getElementById(
        "content"
      ).innerHTML = `<div class="alert alert-danger">Error loading category: ${err.message}</div>`;
    });
}

function loadRandomCategory() {
  fetch("data/categories.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load categories");
      return res.json();
    })
    .then((categories) => {
      const random = Math.floor(Math.random() * categories.length);
      const shortname = categories[random].shortname;
      loadCategory(shortname);
    })
    .catch((err) => {
      document.getElementById(
        "content"
      ).innerHTML = `<div class="alert alert-danger">Error loading random category: ${err.message}</div>`;
    });
}

function getPlaceholderUrl(name) {
  const encoded = encodeURIComponent(name);
  return `https://placehold.co/200x200?text=${encoded}`;
}
