/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function getNumberOfSections() {
  const sections = document.getElementsByTagName("section");
  return sections.length;
}

/* function createNavItem(navItemText, index) {
  const newLi = document.createElement("li");
  const sectionId = "section" + index;
  newLi.innerHTML = "<a href='#" + sectionId + "'>Section " + index + "</a>";
  //newLi.innerHTML = "<a href='#" + sectionId + "'>" + navItemText + "</a>";
  newLi.className = "menu__link";
  return newLi;
} */

function addLinkToNav(section) {
  const navbarlist = document.getElementById("navbar__list");

  const newLi = document.createElement("li");
  const navItemText = section.getAttribute("data-nav");

  newLi.textContent = navItemText;
  newLi.className = "menu__link";

  newLi.addEventListener("click", function(event) {
    console.log("Navitem " + navItemText + " clicked!");
    event.preventDefault();
    //section.scrollIntoView({ left: 0, block: "start", behavior: "smooth" });
    //const yOffset = 10;
    //document.getElementById("page__header")
    //.getBoundingClientRect.height;
    const yOffset_custom = 0;
    const yOffset_nav = -navbarlist.getBoundingClientRect().height; //-200;
    const yOffset = yOffset_nav + yOffset_custom;
    const yPos =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    //window.scrollTo(0, yPos);
    window.scrollTo({ top: yPos, behavior: "smooth" });
    //window.scrollTo({ y: yPos, behavior: "smooth" });
    /*     const yOffset = 0; //-10;
    //const element = document.getElementById(id);
    const yPos =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    section.scrollTo({ y: yPos, behavior: "smooth" }); */
  });
  /*   const sectionId = "section" + sectionNr;
  newLi.innerHTML = "<a href='#" + sectionId + "'>" + navItemText + "</a>"; */

  navbarlist.appendChild(newLi);
  //return newLi;
}

function buildStarterNav() {
  //const navbarlist = document.getElementById("navbar__list");
  const sections = document.getElementsByTagName("section");

  for (const section of sections) {
    const newLi = addLinkToNav(section);
    //navbarlist.appendChild(newLi);
  }

  /*   sections.forEach(element => {
    const newLi = createNavItem(element.getAttribute("data-nav"), index);
    navbarlist.appendChild(newLi);
    i++;
  }); */

  /*   for (let i = 1; i <= 3; i++) {
    //TODO: get section, retrieve attribute data-nav
    //change createNavItem: pass whole section
    //add eventlistener in createNavItem
    const newLi = createNavItem(i);
    navbarlist.appendChild(newLi);
  } */
}
/*
  sections.forEach(element => {
    const newLi = createNavItem(element.getAttribute("data-nav"));
  });
  function createNavItem(navItemText) {
    const newLi = document.createElement("li");
    const sectionId = "section" + sectionNr;
    newLi.innerHTML = "<a href='#" + sectionId + "'>" + navItemText + "</a>";
    newLi.className = "menu__link";
    return newLi;
  }
*/

function addNewSection() {
  //get the number of the new section
  const sectionNr = getNumberOfSections() + 1;

  //create all elements and add their content and attributes
  const newSection = document.createElement("section");
  newSection.setAttribute("id", "section" + sectionNr);
  newSection.setAttribute("data-nav", "Section " + sectionNr);
  const newDiv = document.createElement("div");
  newDiv.className = "landing__container";
  const newHeader = document.createElement("h2");
  newHeader.textContent = "Section " + sectionNr;
  const newP1 = document.createElement("p");
  const newP2 = document.createElement("p");
  newP1.textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi" +
    " fermentum metus faucibus lectus pharetra dapibus. Suspendisse" +
    " potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget" +
    " lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed" +
    " convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla" +
    " eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam" +
    " nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis" +
    " lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a" +
    " tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus" +
    " vitae elit. Integer nec libero venenatis libero ultricies molestie" +
    " semper in tellus. Sed congue et odio sed euismod.";
  newP2.textContent =
    "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar" +
    " gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam." +
    " Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum" +
    " consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget" +
    " elementum tortor mollis non.";

  //put all elements together..
  newDiv.appendChild(newHeader);
  newDiv.appendChild(newP1);
  newDiv.appendChild(newP2);
  newSection.appendChild(newDiv);

  //..and add the new section to the main item
  const mainItem = document.querySelector("main");
  mainItem.appendChild(newSection);

  //add a new nav item for the new section
  const newLi = addLinkToNav(newSection);
  //navbarlist.appendChild(newLi);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

//Log the initial number of sections
console.log("Initial number of sections = ", getNumberOfSections());
// build nav for the existing sections
buildStarterNav();
console.log("Initial Navigation built");
//add 3 new sections to the page
for (let i = 1; i <= 3; i++) {
  addNewSection();
  console.log(i + ". new section added");
}

// Add class 'active' to section when near top of viewport
//////////////////////////////
function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

//var elements = document.querySelectorAll("section");
const sections = document.getElementsByTagName("section");

function callbackFunc() {
  console.log("LOAD or SCROLL");
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    console.log(
      section.getAttribute("data-nav") +
        " is in viewport: " +
        isElementInViewport(section)
    );
    /*     if (isElementInViewport(section)) {
      console.log(section.getAttribute("data-nav") + " is in viewport");
    } else {
      console.log(section.getAttribute("data-nav"));
    } */
  }
  /*
  for (var i = 0; i < sections.length; i++) {
    if (isElementInViewport(sections[i])) {
      sections[i].classList.add("your-active-class");
    }
         else {
      //Else-Bedinung entfernen, um .visible nicht wieder zu löschen, wenn das Element den Viewport verlässt.
      sections[i].classList.remove("your-active-class");
    } 
  } */
}

window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);
//////////////////////////////
//toggle class

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click
function crollIntoView(event, section) {
  event.preventDefault();
  section.scrollIntoView({ left: 0, block: "start", behavior: "smooth" });
}

// Set sections as active
