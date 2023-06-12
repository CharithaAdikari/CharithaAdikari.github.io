// JS funtions for Matrix effect--------------------------------------------------------------

const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');
const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;
const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);

function matrix () {
  ctx.fillStyle = '#0001';
  ctx.fillRect(0, 0, w, h);
  
  ctx.fillStyle = '#0f0';
  ctx.font = '15pt monospace';
  
  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + 20;
  });
}

setInterval(matrix, 50);


// ----------
document.querySelector('.hamburger-menu').addEventListener('click', function() {
  document.querySelector('.side-menu').classList.toggle('open');
});

// JS funtions for logo animation --------------------------------------------------------------

const imageContainer = document.querySelector('.image-container');
imageContainer.addEventListener('mouseenter', () => {
  imageContainer.style.animationPlayState = 'paused';
});

imageContainer.addEventListener('mouseleave', () => {
  imageContainer.style.animationPlayState = 'running';
});

// JS function for get in touch btn ------------------------------------------------------------
function scrollToAbout() {
  const aboutSection = document.getElementById("about");
  const distanceToTop = aboutSection.offsetTop - 100;
  window.scrollTo({
    top: distanceToTop,
    behavior: 'smooth'
  });
}

// JS function for Navbar -----------------------------------------------------------------------
  window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
      navbar.style.backgroundColor = "#000";
    } else {
      navbar.style.backgroundColor = "transparent";
    }
  });

// JS funtion for scralling effect -----------------------------------------------------

const navLinks = document.querySelectorAll("#navbar ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); 
    const targetSection = document.querySelector(link.getAttribute("href"));
    const distanceToTop = targetSection.offsetTop - 40;
    window.scrollTo({
      top: distanceToTop,
      behavior: "smooth",
    });
  });
});


// js for image slide show

let slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}



function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
    
  }
  slideIndex++;
  
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 8000); 
}



// JS for skills -----------
window.addEventListener('DOMContentLoaded', (event) => {
  const toggleButton = document.getElementById('toggle-button');
  const skillContainer = dsocument.querySelector('.skill-container');
  const toolContainer = document.querySelector('.tool-container');

  toggleButton.addEventListener('click', () => {
    if (skillContainer.style.display === 'none') {
      toggleButton.textContent = 'Switch to Tools';
      skillContainer.style.display = 'block';
      toolContainer.style.display = 'none';
    } else {
      toggleButton.textContent = 'Switch to Skills';
      skillContainer.style.display = 'none';
      toolContainer.style.display = 'block';
    }
  });
});



// image slider skills


const wrappers = document.querySelectorAll(".wrapper");
wrappers.forEach((wrapper) => {
  const carousel = wrapper.querySelector(".carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const arrowBtns = wrapper.querySelectorAll("i");
  const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1000);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
});

// form validation

function validateForm(event) {
  event.preventDefault(); // Prevent the form from submitting by default

  // Get form input values
  var fname = document.getElementById("fname").value.trim();
  var lname = document.getElementById("lname").value.trim();
  var email = document.getElementById("email").value.trim();
  var cname = document.getElementById("cname").value.trim();
  var level = document.getElementById("level").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var country = document.getElementById("country").value.trim();
  var message = document.getElementById("message").value.trim();

  // Clear previous error messages
  clearErrors();

  // Validate each field
  if (fname === "") {
    displayError("fname", "Please enter your first name.");
    return;
  }

  if (lname === "") {
    displayError("lname", "Please enter your last name.");
    return;
  }

  if (email === "") {
    displayError("email", "Please enter your email.");
    return;
  } else if (!isValidEmail(email)) {
    displayError("email", "Please enter a valid email address.");
    return;
  }

  if (cname === "") {
    displayError("cname", "Please enter your company name.");
    return;
  }

  if (level === "") {
    displayError("level", "Please enter your job level.");
    return;
  }

  if (phone === "") {
    displayError("phone", "Please enter your phone number.");
    return;
  } else if (!isValidPhone(phone)) {
    displayError("phone", "Please enter a valid phone number.");
    return;
  }

  if (country === "") {
    displayError("country", "Please enter your country.");
    return;
  }

  if (message === "") {
    displayError("message", "Please enter your message.");
    return;
  }

  // If all fields are valid, you can submit the form
  alert("Form submitted successfully!");
  document.getElementById("contact-form").reset(); // Reset the form
}

function displayError(fieldId, errorMsg) {
  var errorElement = document.getElementById(fieldId + "-error");
  errorElement.textContent = errorMsg;
}

function clearErrors() {
  var errorElements = document.getElementsByClassName("error");
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
  }
}

function isValidEmail(email) {
  // Simple email format validation using regular expression
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidPhone(phone) {
  // Simple phone number format validation using regular expression
  var phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
}

// reviews

const reviews = [
  
];

// Function to display reviews
function displayReviews() {
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = "";

  reviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    const nameElement = document.createElement("p");
    nameElement.textContent = review.name;
    reviewElement.appendChild(nameElement);

    const reviewTextElement = document.createElement("p");
    reviewTextElement.textContent = review.review;
    reviewElement.appendChild(reviewTextElement);

    reviewsContainer.appendChild(reviewElement);
  });
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name-input");
  const reviewInput = document.getElementById("review-input");

  const name = nameInput.value;
  const review = reviewInput.value;

  if (name.trim() === "" || review.trim() === "") {
    alert("Please enter both your name and review.");
    return;
  }

  const newReview = {
    name: name,
    review: review,
  };

  reviews.push(newReview);
  displayReviews();

  nameInput.value = "";
  reviewInput.value = "";
}

// Display existing reviews on page load
window.addEventListener("DOMContentLoaded", displayReviews);

// Add event listener to form submission
const form = document.getElementById("review-form");
form.addEventListener("submit", handleSubmit);
