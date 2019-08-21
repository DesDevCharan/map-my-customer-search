// Import stylesheets
import './style.css';

const searchRecipes = (eve) => {
  if (JSONDATA.results) {
    getUniques(JSONDATA.results).forEach((recipe) => {
      buildCard(recipe, 'wrap-div');
    })
  }
  // getRecipes(eve.target.value)
  //   .then(data => {
  //     if (data.ok) {
  //       data.json();
  //       console.log(data)
  //     } else {
  //       alert("HTTP-Error: " + response.status);
  //     }
  //   }).catch((err) => console.log("Error Found..", err));
}
const myDebounce = (func, del) => {
  let debounceTimer;
  return function () {
    const ctx = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer
      = setTimeout(() => func.apply(ctx, args), del);
  }
}

const buildCard = (rec, op) => {
  const card = document.createElement("div");
  card.classList.add('card');
  const container = document.createElement("div");
  const button = document.createElement("button");
  button.innerHTML = op === 'wrap-div' ? 'Add' : 'Remove';
  container.classList.add('container');
  const img_loc = document.createElement("IMG");
  img_loc.src = rec.href;
  img_loc.alt = rec.title;
  img_loc.style.width = '100%';
  const h4text = document.createElement("h4");
  h4text.innerHTML = `<b>${rec.title}</b>`;
  const para = document.createElement("p");
  para.innerHTML = rec.ingredients;
  container.appendChild(h4text);
  const btnDiv = document.createElement("div");
  btnDiv.classList.add('container', 'floater');
  container.appendChild(para);
  button.addEventListener('click', () => {
    if (button.innerHTML === 'Add') {
      addToFavs(rec);
      button.innerHTML = 'Remove';
    } else {
      removeFromFavs(rec);
      button.innerHTML = 'Add';

    }
  })
  btnDiv.appendChild(button);
  card.appendChild(img_loc);
  card.appendChild(container);
  card.appendChild(btnDiv);
  const wrapper = document.getElementById(op);
  wrapper.appendChild(card);
}
const getRecipes = (param) => {
  return fetch(`http://www.recipepuppy.com/api/?i=${param}`);
};

const favs = [];
const addToFavs = (rec) => {
  favs = [...favs, rec];
  console.log(favs)
  checkForFavs();
  return favs;
}
const removeFromFavs = (rec) => {
  const ind = favs.findIndex((r) => r.title === rec.title);
  favs.splice(ind, 1);
  checkForFavs();
  console.log(favs)
  return favs;
}

const checkForFavs = () => {
  const cart = document.getElementById('cart');
  if (favs.length) {
    cart.style.display = 'inline';
  } else {
    cart.style.display = 'none';
  }
}

const openFavs = () => {
  document.getElementById('wrap-div').style.display = 'none';
  document.getElementById('cart-wrap-div').style.display = 'flex';
  document.getElementById('back').style.display = 'inline';
  if (favs.length !== 0) {
    const uni = getUniques(favs);
    document.getElementById('cart-wrap-div').innerHTML = '';
    uni.forEach((recipe) => {
      buildCard(recipe, 'cart-wrap-div');
    })
  }
}

const getUniques = (array) => {
  var flags = [], output = [], l = array.length, i;
  for (i = 0; i < l; i++) {
    if (flags[array[i].title]) continue;
    flags[array[i].title] = true;
    output.push(array[i]);
  }
  console.log(output)
  return output;
}

const goBack = () => {
  document.getElementById('cart-wrap-div').style.display = 'none';
  document.getElementById('wrap-div').style.display = 'flex';
  document.getElementById('back').style.display = 'none';
}

document.getElementById('searchInput')
  .addEventListener('keyup', myDebounce(searchRecipes, 500));
document.getElementById('cart')
  .addEventListener('click', openFavs);
document.getElementById('back')
  .addEventListener('click', goBack);


// HARD CODED AS THE API IS INSECURE IN http conn not in https
const JSONDATA = { "title": "Recipe Puppy", "version": 0.1, "href": "http:\/\/www.recipepuppy.com\/", "results": [{ "title": "Ginger Champagne", "href": "http:\/\/allrecipes.com\/Recipe\/Ginger-Champagne\/Detail.aspx", "ingredients": "champagne, ginger, ice, vodka", "thumbnail": "http:\/\/img.recipepuppy.com\/1.jpg" }, { "title": "Potato and Cheese Frittata", "href": "http:\/\/allrecipes.com\/Recipe\/Potato-and-Cheese-Frittata\/Detail.aspx", "ingredients": "cheddar cheese, eggs, olive oil, onions, potato, salt", "thumbnail": "http:\/\/img.recipepuppy.com\/2.jpg" }, { "title": "Eggnog Thumbprints", "href": "http:\/\/allrecipes.com\/Recipe\/Eggnog-Thumbprints\/Detail.aspx", "ingredients": "brown sugar, butter, butter, powdered sugar, eggs, flour, nutmeg, rum, salt, vanilla extract, sugar", "thumbnail": "http:\/\/img.recipepuppy.com\/3.jpg" }, { "title": "Succulent Pork Roast", "href": "http:\/\/allrecipes.com\/Recipe\/Succulent-Pork-Roast\/Detail.aspx", "ingredients": "brown sugar, garlic, pork chops, water", "thumbnail": "http:\/\/img.recipepuppy.com\/4.jpg" }, { "title": "Irish Champ", "href": "http:\/\/allrecipes.com\/Recipe\/Irish-Champ\/Detail.aspx", "ingredients": "black pepper, butter, green onion, milk, potato, salt", "thumbnail": "http:\/\/img.recipepuppy.com\/5.jpg" }, { "title": "Chocolate-Cherry Thumbprints", "href": "http:\/\/allrecipes.com\/Recipe\/Chocolate-Cherry-Thumbprints\/Detail.aspx", "ingredients": "cocoa powder, baking powder, butter, eggs, flour, oats, salt, sugar, vanilla extract", "thumbnail": "http:\/\/img.recipepuppy.com\/6.jpg" }, { "title": "Mean Woman Pasta", "href": "http:\/\/allrecipes.com\/Recipe\/Mean-Woman-Pasta\/Detail.aspx", "ingredients": "garlic, kalamata olive, olive oil, pepperoncini, seashell pasta, tomato", "thumbnail": "http:\/\/img.recipepuppy.com\/7.jpg" }, { "title": "Hot Spiced Cider", "href": "http:\/\/allrecipes.com\/Recipe\/Hot-Spiced-Cider\/Detail.aspx", "ingredients": "allspice, apple cider, brown sugar, cinnamon, cloves, nutmeg, orange, salt", "thumbnail": "http:\/\/img.recipepuppy.com\/8.jpg" }, { "title": "Isa's Cola de Mono", "href": "http:\/\/allrecipes.com\/Recipe\/Isas-Cola-de-Mono\/Detail.aspx", "ingredients": "cinnamon, cloves, instant coffee, milk, rum, vanilla extract, water, sugar", "thumbnail": "http:\/\/img.recipepuppy.com\/9.jpg" }, { "title": "Amy's Barbecue Chicken Salad", "href": "http:\/\/allrecipes.com\/Recipe\/Amys-Barbecue-Chicken-Salad\/Detail.aspx", "ingredients": "barbecue sauce, chicken, cilantro, lettuce, ranch dressing, lettuce, tomato", "thumbnail": "http:\/\/img.recipepuppy.com\/10.jpg" }] }