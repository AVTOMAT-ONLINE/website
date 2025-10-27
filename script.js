// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const darkIcon = document.getElementById("theme-toggle-dark-icon");
const lightIcon = document.getElementById("theme-toggle-light-icon");

// Check for saved theme preference or default to system preference
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
  darkIcon.classList.remove("hidden");
  lightIcon.classList.add("hidden");
} else {
  document.documentElement.classList.remove("dark");
  darkIcon.classList.add("hidden");
  lightIcon.classList.remove("hidden");
}

themeToggle.addEventListener("click", function () {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    darkIcon.classList.add("hidden");
    lightIcon.classList.remove("hidden");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    darkIcon.classList.remove("hidden");
    lightIcon.classList.add("hidden");
    localStorage.setItem("theme", "dark");
  }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

mobileMenuToggle.addEventListener("click", function () {
  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    menuIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    mobileMenu.classList.add("hidden");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Add scroll effect to navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector("nav");
  if (window.scrollY > 50) {
    navbar.classList.add("shadow-lg");
  } else {
    navbar.classList.remove("shadow-lg");
  }
});

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0s";
      entry.target.classList.add("animate-fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Add hover effects to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Add dynamic gradient animation
const gradientElements = document.querySelectorAll(".gradient-text");
gradientElements.forEach((element) => {
  element.addEventListener("mouseenter", function () {
    this.style.backgroundSize = "200% 200%";
    this.style.animation = "gradient 3s ease infinite";
  });
});

// Add CSS for gradient animation
const style = document.createElement("style");
style.textContent = `
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
document.head.appendChild(style);

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.dataset.suffix || "");
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (element.dataset.suffix || "");
    }
  }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.animated) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      entry.target.animated = true;
    }
  });
});

document.querySelectorAll("[data-target]").forEach((counter) => {
  counterObserver.observe(counter);
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".animate-float");
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect on page load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector("h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText);
  }
});

// Add click effects to feature cards
document.querySelectorAll(".group").forEach((card) => {
  card.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedScrollHandler = debounce(() => {
  const scrollTop = window.pageYOffset;

  const sections = document.querySelectorAll("section[id]");
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const navLink = document.querySelector(`a[href="#${section.id}"]`);

    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("text-primary");
      });
      if (navLink) {
        navLink.classList.add("text-primary");
      }
    }
  });
}, 10);

window.addEventListener("load", debouncedScrollHandler);
window.addEventListener("scroll", debouncedScrollHandler);

// Scroll to Top Button
const scrollBtn = document.getElementById("scroll-to-top");

// Show button when scrolling down 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("hidden");
  } else {
    scrollBtn.classList.add("hidden");
  }
});

// Smooth scroll to top when clicked
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", debouncedScrollHandler);
