// cart where food items are going to be added
let cart = [];
// page, menuPage by default
let page = 'menuPage';
// this particular restaurant
const restaurant = {
  name: "Chief's Kitchen",
  slogan: "Best Food in the World, 24 hours a day",
  address: '1111 Jackson Ave',
  phone: '(408) 555-5555',
  img: 'img/restaurantFront.jpg',
  menu: [
    {
      menuType: 'Breakfast',
      timeServed: '7:00am - 11:30am',
      items: [
        {name: 'Eggs Benedict', cal: 900, img: 'img/eggsBenedict.jpg', price: 12.99, description: 'Hot buttered English muffins, Canadian-style bacon, and poached eggs are topped with a heavenly drizzle of hollandaise sauce.'},
        {name: 'Omlette', cal: 850, img: 'img/omelette.jpg', price: 10.99, description: 'Our delicious omelette is made with Italian Sausage, Onion, Bell Pepper. It is served with with cheese, and a side of toast. Served with your choice of hash browns, homefries or fresh fruit'},
        {name: 'Steak and Eggs', cal: 1100, img: 'img/steakAndEggs.jpg', price: 14.99, description: 'Corned beef is the classic go-to meat for hash, but steak is a no-brainer for an egg accompaniment.'}
      ]
    },
    {
      menuType: 'Lunch',
      timeServed: '11:30am - 4:30pm',
      items: [
        {name: 'Philly Cheesesteak', cal: 1100, img: 'img/cheesesteak.jpg', price: 9.99, description: 'Our cheesesteak is a long, crusty roll filled with thinly sliced sautéed ribeye beef and melted cheese.'},
        {name: 'Cheeseburger', cal: 1200, img: 'img/cheeseburger.jpg', price: 8.99, description: 'The one that made us famous. Featuring pickle relish, tomatoes, onions, lettuce, pickles, mayo and choice of cheese.'},
        {name: 'Caesar Salad', cal: 700, img: 'img/caesarSalad.jpg', price: 10.99, description: 'Served with romaine lettuce and croutons dressed with parmesan cheese, lemon juice, olive oil, egg, Worcestershire sauce, anchovies, garlic, and black pepper'}
      ]
    },
    {
      menuType: 'Dinner',
      timeServed: '4:30pm - 10:00pm',
      items: [
        {name: 'Pork Chop', cal: 1000, img: 'img/porkChop.jpg', price: 17.99, description: 'Marinate center-cut pork chops in the pickling liquid of store-bought dill pickles: sounds strange, but it is a winner!'},
        {name: 'Asiago Peppercorn Sirloin', cal: 950, img: 'img/sirloin.jpg', price: 24.99, description: 'Top sirloin perfectly seasoned and flavored with cracked peppercorns, Parmesan cream sauce, and shaved Asiago cheese.'},
        {name: 'Chicken Fresco', cal: 900, img: 'img/chickenFresco.jpg', price: 19.99, description: 'Roasted baby portbella mushrooms and artichokes in a Parmesan cream sauce over a fresh, grilled chicken breast. Served with your choice of two sides.'}
      ]
    }
  ]
};
// when document is ready
$(document).ready(function() {
  // destructure the restaurant object for clearer code
  const {name, slogan, address, phone, img, menu} = restaurant;
  // Appned the Header Section Elements
  $('header').append(`<h1 class="restaurantName">${name}</h1>`);
  $('header').append(`<h2 class="restaurantSlogan">${slogan}</h2>`);
  $('header').append(`<h3 class="restaurantAddress">${address}</h3>`);
  $('header').append(`<h4 class="restaurantContactInfo">${phone}</h4>`);
  $('header').append(`<img src=${img} class="img-responsive coverImage" alt="restaurant view">`);
  // Display the restaurant menu
  displayMenu();
});
// this function will add items to cart
function addToCart(menuItem) {
  let menuArray = []
  restaurant.menu.forEach(current => {
    menuArray = [...menuArray, ...current.items]
  })
  const itemToAdd = menuArray.find(item => item.name === menuItem.value)
  cart.push(itemToAdd);
  displayCartItemsInTopBar();
}
// this function will remove item from cart
function removeFromCart(menuItem) {
  const itemToRemove = cart.find(item => item.name === menuItem.value);
  cart.splice(cart.lastIndexOf(itemToRemove), 1);
  showCart();
  displayCartItemsInTopBar();
}
// this function will sum up all food items and return the total price, tax, and grand total
// it takes one argument (string), id of the element to which total price is appended
function displayTotalPrice(element) {
  let totalPrice = 0;
  cart.forEach( ({price}) => {
    totalPrice = totalPrice + price;
  });
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + tax;
  $(`#${element}`).empty();
  $(`#${element}`).append(`Food Total: <span>$${totalPrice}</span>, Tax : <span>$${tax.toFixed(2)}</span>, Grand Total </span>$${grandTotal.toFixed(2)}</span>`);
}
// this function will display cart on the page
function showCart() {
  page = 'checkOutPage';
  $('main').empty();
  $('main').append(`
    <h2>Cart</h2>
    <div class="itemsToCheckOutSection"></div>
  `);
  if (cart.length > 0) {
    cart.forEach( ({name, cal, img, price, description}) => {
      $('.itemsToCheckOutSection').append(`
        <ul class="menuItemList" id="checkOutList">
          <li><img class="menuItemImage" src=${img} alt=${name}></li>
          <li class="menuName">${name}</li>
          <li class="menuDescription">${description}</li>
          <li class="menuPrice">$${price}, </li>
          <li class="menuCal">Calories: ${cal}</li>
          <li><button onclick="removeFromCart(this)" value="${name}" class="btn btn-link removeButton">Remove</button></li>
        </ul>
      `)
    });
    $('main').append(`
      <h3>Payment</h3>
      <h4 class="text-danger" id="paymentHelper"></h4>
      <div class="formWrapper col-xs-12 text-left">
        <form class="col-md-8 col-md-offset-2">
          <div class="form-group col-xs-12">
            <label for="fullName">Full Name</label>
            <input type="text" class="form-control" id="fullName" placeholder="Full Name">
          </div>
          <div class="form-group col-xs-12">
            <label for="CreditCardNumber">Credit Card Number</label>
            <input type="number" class="form-control" id="creditCardNumber" placeholder="Credit Card Number">
          </div>
          <div class="form-group col-xs-6">
            <label for="expirationDate">Expiration Date</label>
            <input id="expirationDate" type="number" name="expirationDate" class="form-control" placeholder="Expiration Date">
          </div>
          <div class="form-group col-xs-6">
            <label for="SecurityCode">Security Code</label>
            <input id="securityCode" type="number" name="SecurityCode" class="form-control" placeholder="Security Code">
          </div>
        </form>
      </div>
    `);
    $('main').append(`
      <div>
        <h3 id="totalPrice"></h3>
        <span class="orderButtonWrapper">
          <button onclick="placeOrder()" class="btn btn-success" id="placeOrderButton">Place Order</button>
        </span>
      </div>
    `);
    displayTotalPrice("totalPrice")
  } else {
    $('.itemsToCheckOutSection').append(`
      <div>
        <h2>Your cart is empty</h2>
        <button onclick="displayMenu()" class="btn btn-primary btn-lg">Back to Menu</button>
      </div>
    `);
  }
  displayCartItemsInTopBar();
}
// this function will display the restaurant menu screen
function displayMenu() {
  // set global page variable to menuPage
  page = 'menuPage';
  // empty any HTML that is in the main section
  $('main').empty();
  // loop over the menu types and append menu items to the page
  restaurant.menu.forEach( ({menuType, timeServed, items}) => {
    $('main').append(`
      <section>
        <h2 class="menuTypeHeading">${menuType} Menu</h2>
        <h3 class="menuHours">Served ${timeServed}</h3>
        <div class="menuTypeSection" id="menuTypeSection${menuType}"></div>
      </section>
    `);
    // loop over the actual menu items and append them to the page
    items.forEach( item => {
      // destructure the menu object for clearer code
      const {name, cal, img, price, description} = item;
      // //add action to each menu item to be able to add the menu item to cart to cart
      // item.action = cart.push({name, cal, img, price, description}); console.log(cart);
      $(`#menuTypeSection${menuType}`).append(`
        <ul class="menuItemList" id="menuItemList${menuType}">
          <li><img class="menuItemImage" src=${img} alt=${name}></li>
          <li class="menuName">${name}</li>
          <li class="menuDescription">${description}</li>
          <li class="menuPrice">$${price}, </li>
          <li class="menuCal">Calories: ${cal}</li>
          <li><button onclick="addToCart(this)" value="${name}" class="btn btn-link">Add to Cart</button></li>
        </ul>
      `);
    });
  });
  displayCartItemsInTopBar();
}
// this function will display number of items in cart in the top navbar
function displayCartItemsInTopBar() {
  $('#menuTop').empty();
  if (page === 'menuPage') {
    $('#menuTop').append(`
      <span class="topMenuRight">
        <i class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></i> ${cart.length}
        <button onclick="showCart()" id="goToCheckOutScreenButton" class="btn btn-link">Check Out</button>
      </span>
    `);
  } else if (page === 'checkOutPage' && cart.length > 0) {
    $('#menuTop').append(`
      <span class="topMenuLeft">
        <button onclick="displayMenu()" class="btn btn-link">Back to Menu</button>
      </span>
      <span class="topMenuRight">
        <span class="text-danger" id="topBarHelper"></span>
        <i class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></i> ${cart.length}
        <button onclick="placeOrder()" id="placeOrderButtonTop" class="btn btn-success">Place Order</button>
      </span>
    `);
  } else {
    $('#menuTop').append(`
      <span class="topMenuLeft">
        <button onclick="displayMenu()" class="btn btn-link">Back to Menu</button>
      </span>
      <span class="topMenuRight marginTopFive">
        <span class="text-danger" id="topBarHelper">Cart is empty</span>
        <i class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></i> ${cart.length}
      </span>
    `);
  }
}
// this function will validate credit card info and place order
function placeOrder() {
  const cardInfo = [$('#fullName').val(), $('#creditCardNumber').val(), $('#expirationDate').val(), $('#securityCode').val()];
  // if all values pass validation
  if (cardInfo.every( item => item.trim())) {
    //empty any payment error messages
    $('#paymentHelper').empty();
    $('#topBarHelper').empty();
    $('.topMenuRight').empty().append('<span class="text-success">Order Placed</span>');
    $('.orderButtonWrapper').empty().append('<h3 class="text-success">Order Placed</h3>');
    cart = [];
  } else {
    $('#topBarHelper').empty().append('payment error');
    $('#paymentHelper').empty().append('Please make sure all of the fields are field out correctly')
  }
}
