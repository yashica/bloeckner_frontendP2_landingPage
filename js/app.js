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

function buildStarterNav() {
  const sections = document.getElementsByTagName("section");

  for (const section of sections) {
    const newLi = addLinkToNav(section);
    section.addEventListener("click", function(event) {
      setActiveSection(event);
    });
  }
}

function addNewSection() {
  //get the number for the new section
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

  //call addLinkToNav(newSection) to add a new nav item for the new section
  const newLi = addLinkToNav(newSection);

  console.log(
    "New section with id " + newSection.getAttribute("id") + " added."
  );
}

function addLinkToNav(section) {
  const navbarlist = document.getElementById("navbar__list");

  const newLi = document.createElement("li");
  const navItemText = section.getAttribute("data-nav");

  newLi.textContent = navItemText;
  newLi.className = "menu__link";

  newLi.addEventListener("click", function(event) {
    event.preventDefault();
    jumpToSection(section);
  });

  navbarlist.appendChild(newLi);
}

function jumpToSection(section) {
  console.log(
    "in jumpToSection: topPos = " + section.getBoundingClientRect().top
  );
  const yOffset_nav = document.querySelector(".page__header").clientHeight;
  const yPos =
    section.getBoundingClientRect().top + window.pageYOffset - yOffset_nav;
  window.scrollTo({ top: yPos, behavior: "smooth" });
}

function setTopSectionActive() {
  console.log("load or scroll event");

  const sections = document.getElementsByTagName("section");

  for (const section of sections) {
    const sectionIsTopSection = isTopSection(section);
    console.log(
      section.getAttribute("data-nav") +
        " is top section: " +
        sectionIsTopSection
    );
    if (sectionIsTopSection) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  }
}

function isTopSection(section) {
  const yOffset_nav = document.querySelector(".page__header").clientHeight;
  //const yOffset_nav = document.getElementById("navbar__list").clientHeight;
  //const headerHeight = document.querySelector(".page__header").clientHeight;
  //const yOffset_nav = document.getElementById("navbar__list").clientHeight;
  const sectionTop = section.getBoundingClientRect().top;
  const sectionHeight = section.getBoundingClientRect().height;

  //section is activated when top of section is between
  //position right below menu - 1 / 3 of section height
  //and position right below menu + 2/3 of section height
  const threshholdTop = -(yOffset_nav - sectionHeight / 3);
  const threshholdBottom =
    threshholdTop + (section.getBoundingClientRect().height / 3) * 2;

  /*   console.log("isTopSection( " + section.getAttribute("data-nav") + " ):");
  console.log("threshholdTop: " + threshholdTop);
  console.log("threshholdBottom: " + threshholdBottom);
  console.log(section.getAttribute("data-nav") + " sectionTop: " + sectionTop); */

  const isTopSection =
    sectionTop >= threshholdTop && sectionTop <= threshholdBottom;

  /*   console.log(
    " => " +
      section.getAttribute("data-nav") +
      " isTopSection = " +
      isTopSection
  ); */

  return isTopSection;
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
console.log("Add 3 new section:");
for (let i = 1; i <= 3; i++) {
  addNewSection();
}
const sections = document.getElementsByTagName("section");
console.log("All sections added - number of sections = " + sections.length);

//hacky fix for menu overlapping content
const headerHeight = document.querySelector(".page__header").clientHeight;
const landingPageHeader = document.querySelector(".main__hero");
landingPageHeader.style.paddingTop = headerHeight + "px";

// Add class 'active' to section when near top of viewport
//-> see helper functions: setTopSectionActive() & isTopSection(section)

//toggle class
//-> see helper functions: setTopSectionActive() & isTopSection(section)

// Scroll to anchor ID using scrollTO event
//-> see helper functions: jumpToSection(section)

/**
 * End Main Functions
 * Begin Events
 *
 */
window.addEventListener("load", setTopSectionActive);
window.addEventListener("scroll", setTopSectionActive);
//-> nav item listeners have been added in function addLinkToNav(section)

// Build menu
//-> see Main Functions & helper functions: buildStarterNav();

// Scroll to section on link click
//-> see helper functions:  nav item listeners have been added in function addLinkToNav(section)

// Set sections as active
//-> see helper functions: setTopSectionActive() & isTopSection(section)
