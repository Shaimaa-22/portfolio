// Mobile Navigation Toggle with accessibility
const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")

mobileMenu.addEventListener("click", () => {
  const isExpanded = mobileMenu.getAttribute("aria-expanded") === "true"

  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")

  // Update ARIA attributes
  mobileMenu.setAttribute("aria-expanded", !isExpanded)

  // Focus management
  if (!isExpanded) {
    navMenu.querySelector(".nav-link").focus()
  }
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
    mobileMenu.setAttribute("aria-expanded", "false")
  })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScrollTop = 0

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScrollTop = scrollTop
})

// Active navigation link highlighting
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 70 // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Enhanced contact form handling with better validation
const contactForm = document.getElementById("contact-form")

function showError(fieldId, message) {
  const field = document.getElementById(fieldId)
  const errorDiv = document.getElementById(`${fieldId}-error`)

  field.classList.add("error")
  errorDiv.textContent = message
  errorDiv.classList.add("show")
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId)
  const errorDiv = document.getElementById(`${fieldId}-error`)

  field.classList.remove("error")
  errorDiv.textContent = ""
  errorDiv.classList.remove("show")
}

function showFormStatus(message, type) {
  const statusDiv = document.getElementById("form-status")
  statusDiv.textContent = message
  statusDiv.className = `form-status ${type}`
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Clear previous errors
  ;["name", "email", "message"].forEach(clearError)

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name").trim()
  const email = formData.get("email").trim()
  const message = formData.get("message").trim()

  let hasErrors = false

  // Validation
  if (!name) {
    showError("name", "Name is required.")
    hasErrors = true
  } else if (name.length < 2) {
    showError("name", "Name must be at least 2 characters long.")
    hasErrors = true
  }

  if (!email) {
    showError("email", "Email is required.")
    hasErrors = true
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showError("email", "Please enter a valid email address.")
      hasErrors = true
    }
  }

  if (!message) {
    showError("message", "Message is required.")
    hasErrors = true
  } else if (message.length < 10) {
    showError("message", "Message must be at least 10 characters long.")
    hasErrors = true
  }

  if (hasErrors) {
    // Focus on first error field
    const firstError = contactForm.querySelector(".error")
    if (firstError) {
      firstError.focus()
    }
    return
  }

  // Form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...'
  submitButton.disabled = true

  // Simulate API call delay
  setTimeout(() => {
    showFormStatus("Thank you for your message! I'll get back to you soon.", "success")
    contactForm.reset()

    submitButton.innerHTML = originalText
    submitButton.disabled = false

    // Focus on success message for screen readers
    document.getElementById("form-status").focus()
  }, 2000)
})

// CV Download functionality
const downloadCvButton = document.getElementById("download-cv")

downloadCvButton.addEventListener("click", function (e) {
  // Check if PDF file exists (in a real scenario)
  const pdfPath = "./assets/Shaimaa_Dwedar_CV.pdf"

  // For demo purposes, we'll create a simple text-based CV
  if (!document.querySelector('link[href*="Shaimaa_Dwedar_CV.pdf"]')) {
    e.preventDefault()

    // Create a simple CV content
    const cvContent = `
SHAIMAA DWEDAR
Computer Engineering Student & Front-End Developer
Jericho, Palestine
Phone: 0594608763
Email: shaimaadwedar03@gmail.com
LinkedIn: https://linkedin.com/in/shaimaa-dwedar
GitHub: https://github.com/Shaimaa-22

EDUCATION
Al-Quds University
B.Sc. in Computer Engineering
Expected Graduation: June 2026

SKILLS
Languages: C, C++, Java, JavaScript, HTML, CSS, PHP, Python, SQL
Frameworks: React, React Native, Node.js, Bootstrap, Tailwind CSS
Databases: Firebase Realtime, Firestore, SQL
Tools: API Integration, Responsive Design, Git, Agile

PROJECTS
1. IdeasTracker - Voice-Based Idea Collection Web App
   Technologies: JavaScript, HTML/CSS, Firebase, Speech-to-Text API, GPT AI

2. Hajj Companion App - Navigation & Guidance Tool
   Technologies: JavaScript, HTML, CSS, PHP, SQL

3. Mini Communication App - React Practice Project
   Technologies: React, JavaScript, HTML, CSS

LANGUAGES
Arabic: Native
English: Fluent

STRENGTHS
Problem Solving, Fast Learner, Team Collaboration, Pressure Handling, Tech Enthusiast
        `

    // Create and download the file
    const blob = new Blob([cvContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "Shaimaa_Dwedar_CV.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    // Show success message
    const originalText = this.innerHTML
    this.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Downloaded!'
    setTimeout(() => {
      this.innerHTML = originalText
    }, 2000)
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".project-card, .skill-category, .about-content > *, .contact-content > *").forEach((el) => {
  observer.observe(el)
})

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  const originalText = heroTitle.textContent

  // Add a small delay before starting the typing effect
  setTimeout(() => {
    typeWriter(heroTitle, originalText, 50)
  }, 500)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Skills hover effect
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)"
  })

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Project cards tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Keyboard navigation improvements
document.addEventListener("keydown", (e) => {
  // Escape key closes mobile menu
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
    mobileMenu.setAttribute("aria-expanded", "false")
    mobileMenu.focus()
  }
})

// Add skip to main content link
document.addEventListener("DOMContentLoaded", () => {
  const skipLink = document.createElement("a")
  skipLink.href = "#home"
  skipLink.className = "skip-link"
  skipLink.textContent = "Skip to main content"
  skipLink.setAttribute("aria-label", "Skip to main content")
  document.body.insertBefore(skipLink, document.body.firstChild)
})

// Console message for developers
console.log(
  "🚀 Welcome to Shaimaa Dwedar's Portfolio!\n📧 Contact: shaimaadwedar03@gmail.com\n🐙 GitHub: https://github.com/Shaimaa-22\n💼 LinkedIn: https://linkedin.com/in/shaimaa-dwedar\n\nBuilt with ❤️ using HTML, CSS & JavaScript",
)
