//scroll
let scrollBtn = document.getElementById("scroll");

window.onscroll = () => {
  if (window.scrollY >= 900) {
    scrollBtn.style.opacity = "1";
  } else {
    scrollBtn.style.opacity = "0";
  }
};
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//header
const navLinks = document.querySelectorAll("header nav li"),
  header = document.querySelector("header");

navLinks.forEach((link) => {
  link.addEventListener("click", toggleClass);
});
function toggleClass() {
  navLinks.forEach((link) => {
    link.classList.remove("active");
    this.classList.add("active");
  });
}

navBtn = document.getElementById("navBtn");
navBtn.addEventListener("click", () => {
  header.classList.toggle("active");
});

//skills

const mySkills = [
  `<i class="fa-brands fa-html5"></i>`,
  `<i class="fa-brands fa-sass"></i>`,
  `<i class="fa-brands fa-js"></i>`,
  `<i class="fa-brands fa-react"></i>`,
  `<i class="fa-brands fa-bootstrap"></i>`,
  `<i class="fa-brands fa-github"></i>`,
];

const skillTitle = [
  "HTML5",
  "SCSS",
  "Javascript",
  "React JS",
  "Bootsrap",
  "Github",
];
const skillsSection = document.querySelector("#skills .box");

for (let i = 0; i < skillTitle.length; i++) {
  let div = document.createElement("div"),
    spanIcon = document.createElement("span"),
    spanText = document.createElement("span");
  spanIcon.className = "skill";
  spanIcon.innerHTML = mySkills[i];

  spanText.textContent = skillTitle[i];

  div.className = "skill-content";
  div.style.cssText = `
  display: flex;
  align-items: center;
  gap: 15px;
  `;
  div.appendChild(spanIcon);
  div.appendChild(spanText);
  skillsSection.appendChild(div);
}

//portfolio
let filterBtn = Array.from(
    document.querySelectorAll("#portfolio .content ul li")
  ),
  portfolioImgs = document.querySelectorAll("#portfolio .content .box > div");
console.log(portfolioImgs);
filterBtn.forEach((btn) => {
  btn.addEventListener("click", portfolioActiveClasses);
  btn.addEventListener("click", hideAllImgs);
});
function portfolioActiveClasses() {
  filterBtn.forEach((li) => {
    li.classList.remove("active");
    this.classList.add("active");
  });
}

function hideAllImgs() {
  portfolioImgs.forEach((img) => {
    img.style.display = "none";
  });
  document.querySelectorAll(this.dataset.portfolio).forEach((el) => {
    el.style.display = "block";
  });
}
window.addEventListener("scroll", function () {
  let aboutSec =
    document.querySelector("#services").getBoundingClientRect().top + 200;
  let aboutBox = document.querySelectorAll("#services .serve");
  aboutBox.forEach((box) => {
    if (aboutSec < window.innerHeight) {
      box.classList.add("active");
    } else {
      box.classList.remove("active");
    }
  });
});

window.onload = () => {
  let skillContent = document.querySelector("#skills .content");
  skillContent.classList.add("active");
  let span = document.querySelectorAll("#skills .bar");

  span.forEach((span) => {
    if (skillContent.classList.contains("active")) {
      span.style.width = span.dataset.bar;
    }
  });
};

//set active classes
const allSections = document.querySelectorAll(
    "section:nth-child(-n+4):not(#landing)"
  ),
  allContents = document.querySelectorAll(
    "section:nth-child(-n+4):not(#landing) .content"
  );

window.addEventListener("scroll", () => {
  for (let i = 0; i < allSections.length; i++) {
    let sectionsClientRect = allSections[i].getBoundingClientRect().top + 400,
      content = allContents[i];
    if (window.innerHeight > sectionsClientRect) {
      content.classList.add("active");
    }
  }
});

//type effect
class TypeWriter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
}
//type method

TypeWriter.prototype.type = function () {
  // current index of word
  const current = this.wordIndex % this.words.length;
  //  get full txt of current word
  const fullTxt = this.words[current];
  //check if deleting
  if (this.isDeleting) {
    // Remove Char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add Char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // insert txt into element
  this.txtElement.innerHTML = `<span class = "txt" > ${this.txt} </span>`;

  // initial type speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // check if text is completed
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // set is deleting to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move To the Next Word
    this.wordIndex++;
    // pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Int on DOM Load

document.addEventListener("DOMContentLoaded", init);
//init app
function init() {
  const txtElement = document.querySelector(".txt-type"),
    words = JSON.parse(txtElement.getAttribute("data-words")),
    wait = txtElement.getAttribute("data-wait");
  //init typeWriter
  new TypeWriter(txtElement, words, wait);
}
