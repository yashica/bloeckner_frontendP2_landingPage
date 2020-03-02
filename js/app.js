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
    event.preventDefault();
    jumpToSection(section);
  });

  navbarlist.appendChild(newLi);
}

function jumpToSection(section) {
  /*   const yOffset_nav = document
    .getElementById("navbar__list")
    .getBoundingClientRect().height; */
  console.log(
    "in jumpToSection: topPos = " + section.getBoundingClientRect().top
  );
  const yOffset_nav = document.getElementById("navbar__list").clientHeight;
  const yPos =
    section.getBoundingClientRect().top + window.pageYOffset - yOffset_nav;
  window.scrollTo({ top: yPos, behavior: "smooth" });
}

function buildStarterNav() {
  const sections = document.getElementsByTagName("section");

  for (const section of sections) {
    const newLi = addLinkToNav(section);
    section.addEventListener("click", function(event) {
      setActiveSection(event);
    });
    //section.addEventListener("click", setActiveSection);
    /* section.addEventListener("click", function() {
      console.log(section.getAttribute("data-nav") + " was clicked!");
      section.classList.toggle("your-active-class");
    }); */
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

  //add a clickListener
  /* newSection.addEventListener("click", function() {
    console.log(newSection.getAttribute("data-nav") + " was clicked!");
    newSection.classList.toggle("your-active-class");
  }); */
  newSection.addEventListener("click", function(event) {
    setActiveSection(event);
  });

  //newSection.addEventListener("click", setActiveSection(section));

  //..and add the new section to the main item
  const mainItem = document.querySelector("main");
  mainItem.appendChild(newSection);

  //add a new nav item for the new section
  const newLi = addLinkToNav(newSection);

  console.log(
    "New section with id " + newSection.getAttribute("id") + " added."
  );
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
/* 
console.log("***Section Position Test***");
for (const section of sections) {
  const sectionTopPosition = section.getBoundingClientRect().top;
  console.log(
    section.getAttribute("data-nav") + " topposition = " + sectionTopPosition
  );
}
console.log("***End of Section Position Test***"); */

// Add class 'active' to section when near top of viewport
function isTopSection(section) {
  const yOffset_nav = document.getElementById("navbar__list").clientHeight;
  const sectionHeight = section.getBoundingClientRect().height;
  const sectionTop = section.getBoundingClientRect().top;
  const threshholdTop = -(yOffset_nav - sectionHeight / 2);
  //section.getBoundingClientRect().top + window.pageYOffset - yOffset_nav;
  //section.getBoundingClientRect().top + window.pageYOffset - yOffset_nav;
  const threshholdBottom =
    threshholdTop + section.getBoundingClientRect().height / 2;

  console.log("isTopSection( " + section.getAttribute("data-nav") + " ):");
  //console.log("yOffset_nav = " + yOffset_nav);
  //console.log("window.pageYOffset = " + window.pageYOffset);
  console.log("threshholdTop: " + threshholdTop);
  console.log("threshholdBottom: " + threshholdBottom);
  console.log(section.getAttribute("data-nav") + " sectionTop: " + sectionTop);

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

/* function isTopSection(section) {
  const yOffset_nav = document.getElementById("navbar__list").clientHeight;
  const sectionTop = section.getBoundingClientRect().top;
  const threshholdTop = window.pageYOffset + yOffset_nav;
  //section.getBoundingClientRect().top + window.pageYOffset - yOffset_nav;
  //section.getBoundingClientRect().top + window.pageYOffset - yOffset_nav;
  const threshholdBottom =
    threshholdTop + section.getBoundingClientRect().height;

  console.log("isTopSection( " + section.getAttribute("data-nav") + " ):");
  console.log("yOffset_nav = " + yOffset_nav);
  console.log("window.pageYOffset = " + window.pageYOffset);
  console.log("threshholdTop = yOffset_nav + yOffset_nav" + threshholdTop);
  console.log("threshholdBottom = " + threshholdBottom);
  console.log("! sectionTop = " + sectionTop + " !");

  const isTopSection =
    sectionTop >= threshholdTop && sectionTop <= threshholdBottom;

  console.log(" => isTopSection = " + isTopSection);

  return isTopSection;
} */

function callbackFunc(event) {
  console.log("LOAD or SCROLL");

  const sections = document.getElementsByTagName("section");

  for (const section of sections) {
    const sectionIsTopSection = isTopSection(section);
    console.log(
      section.getAttribute("data-nav") +
        " is top section: " +
        isTopSection(section)
    );
    if (sectionIsTopSection) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
    /*     const sectionTopPosition = section.getBoundingClientRect().top;
    console.log(
      section.getAttribute("data-nav") + " topposition = " + sectionTopPosition
    );
    console.log(
      section.getAttribute("data-nav") +
        " is top section: " +
        isTopSection(section)
    ); */
  }
  //console.log("          ++++++          ");
}

/* document.addEventListener("DOMContentLoaded", function() {
  const sections = document.getElementsByTagName("section");
  console.log("OnDOMContentLoaded: sections.length = " + sections.length);

  console.log("***Section Position Test II ***");
  for (const section of sections) {
    const sectionTopPosition = section.getBoundingClientRect.top;
    console.log(
      section.getAttribute("data-nav") + " topposition = " + sectionTopPosition
    );
  }
  console.log("***End of Section Position Test II ***");
}); */

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

/* function crollIntoView(event, section) {
  event.preventDefault();
  section.scrollIntoView({ left: 0, block: "start", behavior: "smooth" });
} */

// Set sections as active
function setActiveSection(event) {
  const sections = document.getElementsByTagName("section");
  const clickedSection = console.log(
    event.target.getAttribute("data-nav") + " was clicked!"
  );
  for (const section of sections) {
    if (event.target === section) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  }
}
