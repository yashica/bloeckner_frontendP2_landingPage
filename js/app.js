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

function createNavItem(sectionNr) {
  const newLi = document.createElement("li");
  const sectionId = "section" + sectionNr;
  newLi.innerHTML =
    "<a href='#" + sectionId + "'>Section " + sectionNr + "</a>";
  return newLi;
}

function buildStarterNav() {
  const navbarlist = document.getElementById("navbar__list");
  for (let i = 1; i <= 3; i++) {
    const newLi = createNavItem(i);
    navbarlist.appendChild(newLi);
  }
}

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
  const navbarlist = document.getElementById("navbar__list");
  const newLi = createNavItem(sectionNr);
  navbarlist.appendChild(newLi);
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
//add 10 new sections to the page
for (let i = 1; i <= 10; i++) {
  addNewSection();
  console.log(i + ". new section added");
}

// Add class 'active' to section when near top of viewport
//toggle class

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
