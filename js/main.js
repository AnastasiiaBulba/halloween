// Main JavaScript file
import { initializeDataLoader } from "./dataLoader.js";
import { loadPartials } from "./partials.js";
import { initializeCookieBar } from "./cookieBar.js";
import { initializeMobileMenu } from "./mobileMenu.js";
import { initializeModal } from "./modal.js";
import { initializeNewsExpander } from "./newsExpander.js";
import { initializeFormValidation } from "./formValidation.js";

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Load partials (header, footer, contact info)
    await loadPartials();

    // Initialize all modules
    initializeDataLoader();
    initializeCookieBar();
    initializeMobileMenu();
    initializeModal();
    initializeNewsExpander();
    initializeFormValidation();

    // Set current year in footer
    const currentYearElement = document.getElementById("current-year");
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }

    // Set active navigation
    setActiveNavigation();

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    console.log("All modules initialized successfully");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});

// Set active navigation based on current page
function setActiveNavigation() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  switch (currentPage) {
    case "home":
      const homeLink = document.getElementById("nav-home");
      if (homeLink) homeLink.classList.add("active");
      break;
    case "news":
      const newsLink = document.getElementById("nav-news");
      if (newsLink) newsLink.classList.add("active");
      break;
    case "contact":
      const contactLink = document.getElementById("nav-contact");
      if (contactLink) contactLink.classList.add("active");
      break;
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("spooky-news.html")) return "news";
  if (path.includes("spooky-contact.html")) return "contact";
  return "home";
}
