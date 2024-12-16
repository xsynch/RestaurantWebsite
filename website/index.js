const fullMenuEl = document.getElementById("full-menu");
// const menuDiv = document.createElement("div");
// const menuRad = document.createElement("input");
// const menuLabel = document.createElement("label");
// const menuContent = document.createElement("div");

// menuRad.setAttribute("type", "radio");
// menuRad.setAttribute("name", "css-tabs");
// menuRad.classList.add("tab-switch");

// menuLabel.classList.add("tab-label");

// menuContent.classList.add("tab-content");
// menuDiv.appendChild(menuRad);
// menuDiv.appendChild(menuLabel);

let dlData = ``;

menuResults = "";

// menuLi.innerHTML = "<h3>hello</h3>";
// menuUl.appendChild(menuLi);

function buildMenuContent(menuSection) {
  // const menuContent = document.createElement("div");

  // menuContent.classList.add("tab-content");
  const menuDescPrice = document.createElement("p");

  menuDescPrice.textContent = `${menuSection.name}  ${menuSection.price}`;
  return menuDescPrice;
}

function buildRadioButtons(menuHeading) {
  var radioEl = document.createElement("input");
  radioEl.setAttribute("type", "radio");
  radioEl.setAttribute("name", "menuHeading");
  radioEl.classList.add("radio");
}

function buildMenuDisplay(menu) {
  var labelsContainerEl = document.createElement("div");
  labelsContainerEl.classList.add("labels-container");
  fullMenuEl.appendChild(labelsContainerEl);

  for (data in menu) {
    var menuContents = menu[data];
    var radioEl = document.createElement("input");
    var labelsItemsEl = document.createElement("label");
    var dataTrimmed = data.replace(/\s/g, "").toLowerCase();
    var itemsDisplayContainerEl = document.createElement("div");
    var menuItemsEl = document.createElement("div");

    radioEl.setAttribute("type", "radio");
    radioEl.setAttribute("name", "menuHeading");
    radioEl.classList.add("radio");
    radioEl.id = `rad-${dataTrimmed}`;
    if (data == "starters") {
      radioEl.checked = true;
    }

    labelsItemsEl.classList.add("tab");
    labelsItemsEl.id = `label-${dataTrimmed}`;
    labelsItemsEl.setAttribute("for", `rad-${dataTrimmed}`);
    labelsItemsEl.innerHTML = `${data.toUpperCase()}`;

    labelsContainerEl.appendChild(labelsItemsEl);
    fullMenuEl.appendChild(radioEl);

    itemsDisplayContainerEl.setAttribute("class", "menu-items");
    for (i = 0; i < menuContents.length; i++) {
      var items = `<span>${menuContents[i].name}</span><span class="line"></span><span class="price">${menuContents[i].price}</span>`;
      typeof menuContents[i].description === "undefined"
        ? (items += "")
        : (items += `<span class="item-description">${menuContents[i].description}</span>`);
      console.log(items);
      menuItemsEl.classList.add("item");
      menuItemsEl.id = `item-${dataTrimmed}`;
      menuItemsEl.innerHTML += items;
    }
    fullMenuEl.appendChild(itemsDisplayContainerEl);
    itemsDisplayContainerEl.appendChild(menuItemsEl);
  }

  // var itemsDisplayContainerEl = document.createElement("div");
  // var menuItemsEl = document.createElement("div");
  // var menuItemEl = document.createElement("p");

  // menuItemsEl.classList.add("item");
  // itemsDisplayContainerEl.setAttribute("class", "menu-items");
  // itemsDisplayContainerEl.appendChild(menuItemsEl);
}

function buildMenuItems(menuHeading, headingArr) {
  const menuDiv = document.createElement("div");
  const menuDivContainer = document.createElement("div");
  const menuRad = document.createElement("input");
  const menuLabel = document.createElement("label");
  const menuContent = document.createElement("div");

  // const menuContent = document.createElement("div");
  menuDivContainer.classList.add("menuDivContainer");
  menuDiv.classList.add("tab");

  menuRad.setAttribute("type", "radio");
  menuRad.setAttribute("name", "css-tabs");
  menuRad.classList.add("tab-switch");

  menuLabel.classList.add("tab-label");
  menuLabel.textContent = `${menuHeading}`;

  menuContent.classList.add("tab-content");

  menuDivContainer.appendChild(menuRad);
  menuDivContainer.appendChild(menuLabel);
  // menuDiv.appendChild(menuDivContainer);
  menuDivContainer.appendChild(menuRad);
  menuDivContainer.appendChild(menuLabel);

  for (i = 0; i < headingArr.length; i++) {
    console.log(`${menuHeading}: tab-${i}`);
    // menuRad.setAttribute("id", `tab-${i + 1}`);
    menuRad.id = `tab-${i + 1}`;
    menuLabel.setAttribute("for", `tab-${i + 1}`);
    menuContent.appendChild(buildMenuContent(headingArr[i]));
    // menuDiv.appendChild(buildMenuContent(headingArr[i]));
    menuDiv.appendChild(menuDivContainer);
    menuDiv.appendChild(menuContent);
  }

  // menuContent.classList.add("tab-content");
  // menuContent.textContent = `${headingArr[0].name}  ${headingArr[0].price}`;

  return menuDiv;
}

const getMenu = function downloadMenu() {
  window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("./data/menu.json");
    menuResults = await response.json();
    if (menuResults) {
      buildMenuDisplay(menuResults);
      // for (menuHeading in menuResults) {
      //   // menuLabel.textContent = `${menuHeading}`;
      //   let heading = menuResults[menuHeading];
      //   console.log(heading);
      //   fullMenuEl.appendChild(buildMenuItems(menuHeading, heading));
      //   // fullMenuEl.appendChild(menuLabel);
      // }
    } else {
      menuDiv.innerHTML = "<h3>Loading...</h3>";
      fullMenuEl.appendChild(menuDiv);
    }

    // for (menuHeading in menuResults) {
    //   console.log(menuHeading);

    //   dlData += `<dt>${menuHeading}</dt>`;

    //   for (i = 0; i < menuResults[menuHeading].length; i++) {
    //     // console.log(menuResults[menuHeading][i]);
    //     dlData += `<dd><h3>${menuResults[menuHeading][i].name}</h3><span>${menuResults[menuHeading][i].price}</span></dd>`;
    //   }
    //   // console.log(`The data is ${dlData}`);
    // }

    // fullMenuEl.innerHTML = dlData;
  });
};

getMenu();
