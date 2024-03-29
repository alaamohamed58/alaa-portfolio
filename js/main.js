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
  `imgs/skills/HTML.svg`,
  `imgs/skills/css-3.svg`,
  `imgs/skills/scss.svg`,
  'imgs/skills/tailwind.svg',
  `imgs/skills/javascript.svg`,
  'imgs/skills/typescript.svg',
    `imgs/skills/reactjs.svg`,
  'imgs/skills/nodejs-icon.svg',
  'imgs/skills/express.svg',
  `imgs/skills/nextjs.svg`,
  `imgs/skills/pug.svg`,
  `imgs/skills/github.svg`,



];

const skillsSection = document.querySelector("#skills .box");

for (let i = 0; i < mySkills.length; i++) {
  let div = document.createElement("div"),
    skillName = document.createElement("h4"),
    image = document.createElement("img");

  image.src = mySkills[i];
const text = mySkills[i].split("/")[2];
const wordWithoutExtension = text.match(/^(.*?)\.svg$/)[1];
skillName.textContent = wordWithoutExtension



  div.className = "skill-content";
  div.style.cssText = `
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  padding: 25px;
  flex-basis :15%;
  border-radius: 30px;
  `;
  
  div.appendChild(image);
  div.appendChild(skillName);

  skillsSection.appendChild(div);
}

//portfolio
let filterBtn = Array.from(
    document.querySelectorAll("#portfolio .content ul li")
  ),
  portfolioImgs = document.querySelectorAll("#portfolio .content .box > div");
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

console.log(document.querySelector(".form button"))
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

//send email
function sendMail() {
  let name = document.getElementById("name").value,
    email = document.getElementById("email_id").value,
    message = document.getElementById("message").value;
      document.querySelector(".form button").textContent = "Loading....";
      document.querySelector(".form button").disabled = true;
  if (name === "" || email === "" || message === "") {
    document.querySelector(".form").classList.add("invalid");
    document.querySelector(".form button").textContent = "Invalid Input";
    return;
  } else {
  }
  const params = {
    from_name: name,
    email,
    message: message,
  };
  emailjs
    .send("service_ycc6p68", "template_d30kd1t", params)
    .then(function (res) {
      document.getElementById("success").classList.add("show");
      document.forms[0].reset();
  document.querySelector(".form button[type='submit']").style.css = "display: block"
      document.querySelector(".form button").textContent = "Send Message";
      document.querySelector(".form button").disabled = false;
      setTimeout(() => {
            document.getElementById("success").remove()
      },3000)
    });
}

document.forms[0].onsubmit = function (e) {
  e.preventDefault();
};

document.querySelectorAll(".form input").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value !== "") {
      document.querySelector(".form").classList.remove("invalid");
      document.querySelector(".form button").textContent = "Send Message";
    }
  });
});
document.querySelector("textarea").oninput = () => {
  if (document.querySelector("textarea").value !== "") {
    document.querySelector(".form").classList.remove("invalid");
    document.querySelector(".form button").textContent = "Send Message";
  }
};
// function validaty() {
//   let name = document.getElementById("name").value,
//     email = document.getElementById("email_id").value,
//     message = document.getElementById("message").value;

//   if (name !== "" && email !== "" && message !== "") {
//     document.querySelector(".form").classList.remove("invalid");
//     document.querySelector(".form button").textContent = "Send Message";
//   }
// }
