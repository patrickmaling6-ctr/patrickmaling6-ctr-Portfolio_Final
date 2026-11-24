// VINCE PORTFOLIO — UPDATED JAVASCRIPT

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
        const icon = $("i", menuToggle);
        if (icon) {
            icon.classList.toggle("fa-bars", !open);
            icon.classList.toggle("fa-xmark", open);
        }
    });

    $$(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            const icon = $("i", menuToggle);
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }
        });
    });
}

// Theme
const themeToggle = $("#themeToggle");
const savedTheme = localStorage.getItem("vince-theme");
if (savedTheme === "light") document.body.classList.remove("dark-theme");

function updateThemeIcon() {
    const icon = $("i", themeToggle);
    if (!icon) return;
    const dark = document.body.classList.contains("dark-theme");
    icon.classList.toggle("fa-sun", dark);
    icon.classList.toggle("fa-moon", !dark);
}
updateThemeIcon();

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("vince-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    updateThemeIcon();
});

// Typing animation
const typingText = $("#typingText");
const words = ["interactive experiences", "future game projects", "AI / computer vision apps", "developer experiments"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
    if (!typingText) return;
    const word = words[wordIndex];

    if (!deleting) {
        typingText.textContent = word.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex >= word.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        typingText.textContent = word.slice(0, Math.max(0, charIndex - 1));
        charIndex--;
        if (charIndex <= 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeEffect, deleting ? 40 : 75);
}
typeEffect();

// Reveal animation
const revealElements = $$(".reveal");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
} else {
    revealElements.forEach(el => el.classList.add("visible"));
}

// Skill bars
const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const level = entry.target.dataset.level || "0";
        const bar = $(".skill-bar span", entry.target);
        if (bar) bar.style.width = `${level}%`;
        obs.unobserve(entry.target);
    });
}, { threshold: 0.3 });

$$(".skill-card").forEach(card => skillObserver.observe(card));

// Project filtering
const filterButtons = $$(".filter-btn");
const projectCards = $$(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            const categories = (card.dataset.category || "").split(/\s+/);
            card.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
        });
    });
});

// Subtle 3D card tilt — intentionally no pseudo-element/circle overlay
$$(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", event => {
        if (window.innerWidth < 900) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

// Hero mouse parallax
const heroVisual = $("#heroVisual");
if (heroVisual) {
    heroVisual.addEventListener("mousemove", event => {
        if (window.innerWidth < 900) return;
        const rect = heroVisual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        heroVisual.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
    });
    heroVisual.addEventListener("mouseleave", () => {
        heroVisual.style.transform = "";
    });
}

// Cursor glow
const cursorGlow = $(".cursor-glow");
window.addEventListener("pointermove", event => {
    if (cursorGlow) {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    }
}, { passive: true });

// Achievement image modal
const imageModal = $("#imageModal");
const modalImage = $("#modalImage");
const modalCaption = $("#modalCaption");
const modalClose = $("#modalClose");

function closeImageModal() {
    imageModal?.classList.remove("show");
    imageModal?.setAttribute("aria-hidden", "true");
    if (modalImage) modalImage.src = "";
}

$$(".achievement-card").forEach(card => {
    card.addEventListener("click", () => {
        if (!imageModal || !modalImage) return;
        modalImage.src = card.dataset.image || "";
        if (modalCaption) modalCaption.textContent = card.dataset.title || "";
        imageModal.classList.add("show");
        imageModal.setAttribute("aria-hidden", "false");
    });
});

modalClose?.addEventListener("click", closeImageModal);
imageModal?.addEventListener("click", event => {
    if (event.target === imageModal) closeImageModal();
});

// Terminal
const terminalOutput = $("#terminalOutput");
const terminalForm = $("#terminalForm");
const terminalInput = $("#terminalInput");

const terminalProjects = [
    "01. Warehouse Inventory Management System",
    "02. SysCore",
    "03. Hand Ninja AI",
    "04. Face Tracking AI Scanner",
    "05. QR Code Attendance System"
];

const terminalCommands = {
    help: [
        "AVAILABLE COMMANDS",
        "about     — developer profile",
        "skills    — current technology stack",
        "projects  — featured project list",
        "contact   — contact information",
        "date      — current date",
        "clear     — clear terminal"
    ],
    about: [
        "VINCE PATRICK PARCON MALING",
        "BS Information Technology student",
        "Future Game Developer",
        "Focus: programming, game development, AI, computer vision"
    ],
    skills: [
        "SKILLS",
        "Python       78%",
        "HTML         85%",
        "CSS          82%",
        "JavaScript   76%",
        "Unity        70%",
        "Blender      65%",
        "Computer Vision 68%",
        "Database     64%"
    ],
    projects: [
        "FEATURED PROJECTS",
        ...terminalProjects
    ],
    contact: [
        "CONTACT",
        "Email: vincep899@gmail.com",
        "GitHub: github.com/vincep899-ai",
        "LinkedIn: Vince Patrick Maling"
    ],
    date: [
        `LOCAL DATE: ${new Date().toLocaleDateString()}`
    ]
};

function terminalLine(text, className = "") {
    const line = document.createElement("div");
    line.textContent = text;
    if (className) line.className = className;
    terminalOutput?.appendChild(line);
}

function runCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase();
    if (!terminalOutput) return;

    if (command === "clear") {
        terminalOutput.innerHTML = "";
        return;
    }

    terminalLine(`vince@portfolio:~$ ${command}`, "cmd");

    if (terminalCommands[command]) {
        terminalCommands[command].forEach((line, index) => {
            terminalLine(line, index === 0 ? "accent" : "");
        });
    } else if (command) {
        terminalLine(`Command not found: ${command}`, "muted");
        terminalLine("Type 'help' to see available commands.", "muted");
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalForm?.addEventListener("submit", event => {
    event.preventDefault();
    runCommand(terminalInput.value);
    terminalInput.value = "";
});

$$(".terminal-hints button").forEach(button => {
    button.addEventListener("click", () => {
        const command = button.dataset.command || "";
        if (command === "clear") {
            runCommand("clear");
        } else {
            runCommand(command);
        }
        terminalInput?.focus();
    });
});

// Contact form — AJAX submission through FormSubmit.
// AJAX keeps visitors on the portfolio page and avoids the FormSubmit thank-you page.
const contactForm = $("#contactForm");
const contactSubmit = $("#contactSubmit");
const contactStatus = $("#contactStatus");

contactForm?.addEventListener("submit", async event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const originalButton = 'Send Message <i class="fas fa-paper-plane"></i>';
    if (contactSubmit) {
        contactSubmit.disabled = true;
        contactSubmit.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    }
    if (contactStatus) {
        contactStatus.textContent = 'Sending your message...';
        contactStatus.className = 'form-status sending';
    }

    try {
        const formData = new FormData(contactForm);
        const payload = {};
        formData.forEach((value, key) => {
            payload[key] = value;
        });

        const response = await fetch('https://formsubmit.co/ajax/vincep899@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok || result.success === false) {
            throw new Error(result.message || 'Unable to send the message.');
        }

        contactForm.reset();
        if (contactStatus) {
            contactStatus.textContent = '✓ Message sent successfully! Thank you for reaching out.';
            contactStatus.className = 'form-status success';
        }
    } catch (error) {
        console.error('Contact form error:', error);
        if (contactStatus) {
            contactStatus.textContent = 'Unable to send right now. If you are testing the portfolio from a local file, open it through a web server such as VS Code Live Server, then try again.';
            contactStatus.className = 'form-status error';
        }
    } finally {
        if (contactSubmit) {
            contactSubmit.disabled = false;
            contactSubmit.innerHTML = originalButton;
        }
    }
});

// Back to top
const backToTop = $("#backToTop");
window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("show", window.scrollY > 450);
}, { passive: true });

backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active navigation
const sections = $$("main section[id]");
const navigationLinks = $$(".nav-link");

window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navigationLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}, { passive: true });

// Toast helper
const toast = $("#toast");
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
}

// Copyright
const currentYear = $("#currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

// Digital Space / Galaxy: cinematic parallax, cosmic dust, and shooting stars
(() => {
    const world = $(".space-background");
    const dust = $("#spaceDust");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (dust && !reduceMotion) {
        // Small, lightweight CSS-animated particles; no canvas or external library.
        for (let i = 0; i < 34; i++) {
            const particle = document.createElement("span");
            particle.style.setProperty("--x", `${(i * 37 + 11) % 100}%`);
            particle.style.setProperty("--y", `${(i * 61 + 7) % 100}%`);
            particle.style.setProperty("--size", `${1 + (i % 3) * 0.7}px`);
            particle.style.setProperty("--alpha", `${0.22 + (i % 6) * 0.1}`);
            particle.style.setProperty("--duration", `${7 + (i % 9) * 1.4}s`);
            particle.style.setProperty("--delay", `${-((i * 1.13) % 16)}s`);
            dust.appendChild(particle);
        }
    }

    const spaceWorld = world?.closest(".space-world");
    if (spaceWorld && !reduceMotion) {
        document.addEventListener("visibilitychange", () => {
            spaceWorld.classList.toggle("is-paused", document.hidden);
        });
    }

    if (world && !reduceMotion) {
        let queued = false;
        window.addEventListener("pointermove", event => {
            if (window.innerWidth < 700 || queued) return;
            queued = true;
            requestAnimationFrame(() => {
                const x = (event.clientX / window.innerWidth - 0.5) * 7;
                const y = (event.clientY / window.innerHeight - 0.5) * 5;
                world.style.setProperty("--pointer-x", `${x}px`);
                world.style.setProperty("--pointer-y", `${y}px`);
                queued = false;
            });
        }, { passive: true });
    }
})();
