window.onload = (event) => {
    goingToCoinsHtml()
  };
//Home page navigation
function goingToCoinsHtml() {
    document.getElementById("appContainer").innerHTML=""
    document.getElementById("searchContainer").innerHTML=""

  buildCoinsCards();
}

//about page navigation
function goingToAboutHtml() {
    document.getElementById("appContainer").innerHTML=""
    document.getElementById("searchContainer").innerHTML=""


    const card = document.createElement("div");

    card.innerHTML =`<div class="card" id="card" style="width: 40rem;">
    <img class="card-img-top" src="./assets/IMG_4095.JPG" alt="Card image cap">
    <div class="card-body">
      <p class="card-text"><p style="">
    Hi<br/>
My name is Yael Boyer<br/>
Lives at 67 Safed Street, Petah Tikva<br/>
In my previous training I was a tax consultant, working as an accountant
In conversion to programmable.
The project presented to you is a project that provides information about Bitcoin currencies.
Today the Bitcoin market is a vibrant market, and many people deal with it and need it
For information on different Bitcoin currencies.<br/>
In the project in front of you, many types of bitcoin currency appear
The display includes many cards, with each card representing a currency.
The body of the card contains the basic information of the name of the currency and its symbol,
If the user wants more information about the currency, he can click on it.<br/>
A button on the body of the card called & quot; more info & quot; Which as its name implies provides more information on
The requested bitcoin - picture and value of bitcoin in relation to shekels, dollars and euros.
Yes, the toggle button also has a toggle button on the body of the card that allows you to add the currency to the list
Reports.<br/>
To prevent dense and confusing display, the currencies display in the reports is limited to five
currencies
When the user wants to remove a currency from the report list and add another currency,
It can be done using an additional toggle button that will appear after the user
Will select more than five reports on a pop-up window containing the already selected currencies
By the user, with each currency having its own TOGGLE button, allowing it to be removed
Another currency that is no longer needed from the list of reports and put another in its place.</p>
<p>Enjoy using my project!</p>
    </div>
  </div>` 
    
    
    document.getElementById("appContainer").appendChild(card);
}

//reports page navigation
function goingToReportsHtml(){
    alert
    document.getElementById("appContainer").innerHTML=""
    document.getElementById("searchContainer").innerHTML=""
    const reportsMessage = document.createElement("div");
    reportsMessage.innerHTML=`<div id="reportsMessage">The requested information was not found</div>`
    document.getElementById("appContainer").appendChild(reportsMessage)
}   


let arrCoins = [];
let cache = {};

//Builds the display cards according to the information received from the server or the cache

function buildCoinsCards() {
  fetch("https://api.coingecko.com/api/v3/coins")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      arrCoins = res;
      console.log(arrCoins.length)
      const search = document.createElement("div");

      search.innerHTML  = `<div class="input-group mb-3">
      <input type="text" id="form1" class="form-control" placeholder="Type the desired currency" aria-label="Recipient's username" aria-describedby="button-addon2">
      <button onclick="search()" class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
    </div><div id="search" style="visibility:hidden"></div>`
      document.getElementById("searchContainer").appendChild(search);

      for (let i = 0; i < res.length; i++) {
        const card = document.createElement("div");
       
        card.innerHTML = `<div class=" mainPage"><div class="card">
                <div class="card-header"> ${res[i].name}</div>
                <div class="card-body">
                    <h5 class="card-title">${res[i].symbol}</h5>
                    <p>
                        <button onclick="loadMoreInfo('${res[i].id}','${getId2(
          res[i].symbol
        )}')" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${getId2(
          res[i].symbol
        )}" aria-expanded="false" aria-controls="collapseExample">more info</button>
                    </p>
                </div>
                <div class="collapse" id="${getId2(res[i].symbol)}">
                    <div class="card card-body"></div>
                </div>
                
        
                <div class="form-check form-switch switch-wrapper">
                    <input  onclick="toggleAction('${getId2(
                      res[i].symbol
                    )}','${getId2(
          res[i].name
        )}')" class="form-check-input" type="checkbox" role="switch" id='toggle${getId2(
          res[i].symbol
        )}'>
                    <label class="form-check-label" for="flexSwitchCheckDefault" id="${getId2(
                      res[i].symbol
                    )}"></label>
                </div>
                </div>
                </div>`;
        document.getElementById("appContainer").appendChild(card);
      }
    });
}

// gets the dynamic id with #

function getId(symbol) {
  var withNoDigits = symbol.replace(/[0-9]/g, "");

  return "#" + withNoDigits;
}
// gets the dynamic id

function getId2(symbol) {
  var withNoDigits = symbol.replace(/[0-9]/g, "");

  return withNoDigits;
}

let localCache = {};

//Loads the requested information from the server and displays it in the Collapse panel
let moreInfo = []

function loadMoreInfo(id, collapseId) {
    if(moreInfo.includes(id)){
        document.getElementById(collapseId).innerHTML = ``;
        
        $("#" + collapseId).collapse('hide');
        moreInfo.splice(moreInfo.indexOf(id),1)
        return
    }else{
    moreInfo.push(id)
    }


   
     $("#" + collapseId).collapse();

  if (localCache[id]) {
    let info = localCache[id];

    console.log(info);

    let data = `<div class="collapses">
    <p><img src = ${info.image.thumb}></p></br>
    
    <p>$${info.market_data.current_price.usd} </p></br>
    <p>ש"ח ${info.market_data.current_price.ils} </p></br>
    <p>euro ${info.market_data.current_price.eur}</p>
          </div>`;
          if( document.getElementById(collapseId).children[0]){
    document.getElementById(collapseId).children[0].innerHTML = ``;

    document.getElementById(collapseId).children[0].innerHTML = data;
          }else{
            const card = document.createElement("div");
            card.innerHTML =data
            document.getElementById(collapseId).appendChild(card);

          }
  } else {
    let url = "https://api.coingecko.com/api/v3/coins/" + id;

    const spinner = document.getElementById("loading");
    spinner.style.visibility = "visible";

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localCache[id] = res;
        setTimeout(() => {
          const div = document.createElement("div");
          div.innerHTML = `<div class="collapses">
          <p><img src = ${res.image.thumb}></p></br>
          
          <p>$${res.market_data.current_price.usd} </p></br>
          <p>ש"ח ${res.market_data.current_price.ils} </p></br>
          <p>euro ${res.market_data.current_price.eur}</p>
                </div>`;

          document.getElementById(collapseId).children[0].innerHTML = ``;

          document.getElementById(collapseId).children[0].appendChild(div);

          spinner.style.visibility = "hidden";
          setTimeout(() => {
            delete localCache[id];
          }, 1000 * 60 * 2);
        }, 1000);
      });
  }
}

let toggleArray = [];

//Puts the card in the report list with a limit of 5 cards

function toggleAction(symbol, name) {
  console.log("toggleAction", toggleArray);

  let currentCardInfo = { name: name, symbol: symbol };
  if (toggleArray.length < 6) {
    toggleArray.push(currentCardInfo);
  }

  if (toggleArray.length === 6) {
    let input = document.getElementById("toggle" + getId2(symbol));
    console.log(input);
    input.checked = false;
    let modalToggleArray = toggleArray.slice(0, 5);
    console.log(toggleArray.length);
    let divWithHTML = buildCurrentToggleCard(modalToggleArray);
    document.getElementById("modal-body").innerHTML = ``;
    document.getElementById("modal-body").appendChild(divWithHTML);
    $("#modal").modal("show");
  }
}

//Removes the card from the list of reports
tempToggleArr = [];
function removeCard(name, symbol) {
  console.log(name, symbol);
  const index = tempToggleArr.findIndex((object) => {
    return object.name === name;
  });
  if (index >= 0) {
    tempToggleArr.splice(index, 1);
  } else {
    tempToggleArr.push({ name, symbol });
  }
  console.log("tempArr", tempToggleArr);
}

function returnToAddCard() {
    let elem = document.getElementById("appContainer")

    elem.innerHTML='';

console.log('tempToggleArr',tempToggleArr,arrCoins.length)
  tempToggleArr.map((el) => {
    const index = toggleArray.findIndex((object) => {
      return object.name === el.name;
    });
    if (index >= 0) {
      toggleArray.splice(index, 1);
    }
  });
  for (let i = 0; i < arrCoins.length; i++) {
    const card = document.createElement("div");
    const index = toggleArray.findIndex((object) => {
      return object.name === arrCoins[i].name;
    });
    if (index >= 0) {
      card.innerHTML = `<div class=" mainPage"><div class="card">
           <div class="card-header"> ${arrCoins[i].name}</div>
           <div class="card-body">
               <h5 class="card-title">${arrCoins[i].symbol}</h5>
               <p>
                   <button onclick="loadMoreInfo('${arrCoins[i].id}','${getId2(
        arrCoins[i].symbol
      )}')" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${getId2(
        arrCoins[i].symbol
      )}" aria-expanded="false" aria-controls="collapseExample">more info</button>
               </p>
           </div>
           <div class="collapse" id="${getId2(arrCoins[i].symbol)}">
               <div class="card card-body"></div>
           </div>
           <div class="form-check form-switch switch-wrapper">
               <input checked onclick="toggleAction('${getId2(
                 arrCoins[i].symbol
               )}','${getId2(
        arrCoins[i].name
      )}')" class="form-check-input" type="checkbox" role="switch" id='toggle${getId2(
        arrCoins[i].symbol
      )}'>
               <label class="form-check-label" for="flexSwitchCheckDefault" id="${getId2(
                 arrCoins[i].symbol
               )}"></label>
               </div>
           </div>
           </div>`;
    } else {
      card.innerHTML = `<div class=" mainPage"><div class="card">
            <div class="card-header"> ${arrCoins[i].name}</div>
            <div class="card-body">
                <h5 class="card-title">${arrCoins[i].symbol}</h5>
                <p>
                    <button onclick="loadMoreInfo('${arrCoins[i].id}','${getId2(
        arrCoins[i].symbol
      )}')" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${getId2(
        arrCoins[i].symbol
      )}" aria-expanded="false" aria-controls="collapseExample">more info</button>
                </p>
            </div>
            <div class="collapse" id="${getId2(arrCoins[i].symbol)}">
                <div class="card card-body"></div>
            </div>
            <div class="form-check form-switch switch-wrapper">
                <input  onclick="toggleAction('${getId2(
                  arrCoins[i].symbol
                )}','${getId2(
        arrCoins[i].name
      )}')" class="form-check-input" type="checkbox" role="switch" id='toggle${getId2(
        arrCoins[i].symbol
      )}'>
                <label class="form-check-label" for="flexSwitchCheckDefault" id="${getId2(
                  arrCoins[i].symbol
                )}"></label>
            </div> </div>
            </div>`;
    }
    document.getElementById("appContainer").appendChild(card);
  }
  $("#modal").modal("hide");
}

//Disables the removal of the card from the list of reports

function cancel() {
  $("#modal").modal("hide");
}

//Searches whether the card is in the report record, and if so, displays it

function search() {
  const searchValue = document.getElementById("form1").value;

  let coin;

  if (
    (coin = arrCoins.find((c) => {
      return searchValue === c.symbol;
    }))
  ) {
    console.log(coin);
    showCoin(coin);
    searchValue == "";
    let el = document.getElementById("search")
    el.style.visibility = "visible"


  } else if 
    (searchValue ===""){
    alert("No coin typed!")
  } else{
    alert("coin is not found")
  }
}

//Builds the requested card in the search
function loadMoreInfo2(id){
    elem = document.getElementById('search')
    let children = document.getElementById('search').childElementCount;
    if(children > 1){
    elem.removeChild(elem.lastChild);
    return
    }
    let url = "https://api.coingecko.com/api/v3/coins/" + id;

    const spinner = document.getElementById("loading");
    spinner.style.visibility = "visible";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localCache[id] = res;
        setTimeout(() => {
          const div = document.createElement("div");
          div.innerHTML=""
          div.innerHTML = `<div>
          <p><img src = ${res.image.thumb}></p></br>
          
          <p>$${res.market_data.current_price.usd} </p></br>
          <p>ש"ח ${res.market_data.current_price.ils} </p></br>
          <p>euro ${res.market_data.current_price.eur}</p>
                </div>`;

    document.getElementById('search').appendChild(div);       

   
    spinner.style.visibility = "hidden";
}, 1000);
})
}

//display the search result
function showCoin(coin) {
  let searchDiv = document.createElement("div");

  searchDiv.innerHTML = `<div class="card" id="search-card" style="">
    <div class="card-body">
      <h5 class="card-title">${coin.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${coin.symbol}</h6>
      <p>
      <button onclick="loadMoreInfo2('${coin.id}','${getId2(
        coin.symbol
)}')" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${getId2(
    coin.symbol
)}" aria-expanded="false" aria-controls="collapseExample">more info</button>
  </p>
    </div>
  </div>`;

  document.getElementById("search").innerHTML = ``;

  document.getElementById("search").appendChild(searchDiv);
}

//Constructs the model that includes the five user-selected cards

function buildCurrentToggleCard(arr) {
  let div = document.createElement("div");
  console.log("arr1", arr);
  for (let i = 0; i < arr.length; i++) {
    div.innerHTML += `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${arr[i].name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${arr[i].symbol}</h6>
      
          
        </div>
      </div>
    </div>
  </div>
        </p>
      </div>
      <div class="form-check form-switch switch-wrapper">
  <input class="form-check-input" onclick="removeCard('${arr[i].name}', '${arr[i].symbol}')" type="checkbox" role="switch" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault"></label>
</div>
      <div class="modal-footer">
      
        
      </div>
    </div>
    

</div>`;
  }
  div.innerHTML += `<button onclick="cancel()" type="button" class="btn btn-primary">cancel</button>
        <button onclick="returnToAddCard()" type="button" class="btn btn-primary">edit</button>`;

  return div;
}
