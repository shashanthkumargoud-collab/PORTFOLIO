// Sticky Navbar & Active States Logic
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Add glass background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active state parsing
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Offset for navbar
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle Logic
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Scroll Reveal Animations Logic
const reveals = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

reveals.forEach(reveal => {
    scrollObserver.observe(reveal);
});

// Web3Forms AJAX Submission
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';

        const formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                btn.textContent = 'Sent Successfully!';
                btn.style.background = '#10b981'; // Green color
            } else {
                console.log(response);
                btn.textContent = 'Error! Try Again.';
                btn.style.background = '#ef4444'; // Red color
            }
        })
        .catch(error => {
            console.log(error);
            btn.textContent = 'Error! Try Again.';
            btn.style.background = '#ef4444'; 
        })
        .finally(() => {
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = ''; // reset
                form.reset();
            }, 3000);
        });
    });
}
// Project Data for Modal
const projectData = {
    'pawcare': {
        title: 'PAWCARE',
        subtitle: 'A digital Pet Adoption and Care Platform',
        abstract: `In the existing system, pet adoption and care processes are mostly manual and unorganized, making it difficult for animal shelters to reach adopters and for users to find suitable pets. Health records and care information are often not maintained properly, which affects pet well-being.
        
        This project proposes a Pet Adoption and Care Mobile Application that provides a centralized digital platform connecting animal shelters and pet adopters. The application allows shelters to list pets with complete details such as breed, age, and health condition. Users can browse available pets, submit adoption requests, and track their status through the mobile app. The system also supports basic pet care management by maintaining digital records and providing reminders for vaccinations.`,
        tech: ['Flutter', 'Python', 'Flask', 'SQLite', 'MySQL']
    },
    'world-explorer': {
        title: 'WORLD EXPLORER',
        subtitle: 'Responsive Global Information Platform',
        abstract: `World Explorer is a responsive web application developed to help users explore information about countries around the world through an interactive and user-friendly interface. The application uses REST API integration to fetch real-time country data such as population, capital, region, currency, and flags. Users can search for countries dynamically and filter them based on regions for easier navigation and exploration.
        
        The project was developed using HTML, CSS, and JavaScript with a focus on responsive design, clean UI, and smooth user experience across different devices. The application demonstrates practical implementation of API handling, DOM manipulation, search functionality, and responsive frontend development techniques.`,
        tech: ['HTML', 'CSS', 'JavaScript', 'REST API']
    },
    'random-quizz': {
        title: 'RANDOM QUIZZ',
        subtitle: 'Interactive Knowledge Testing Platform',
        abstract: `The Quiz Application is an interactive web-based platform developed to test and improve users' knowledge through multiple-choice questions. The application provides a user-friendly interface where users can answer questions, navigate through quizzes, and view their scores instantly upon completion.
        
        The project was developed using HTML, CSS, and JavaScript with a focus on responsive design, smooth user interaction, and dynamic content handling. JavaScript was used to manage quiz logic, question rendering, answer validation, and score calculation in real time.`,
        tech: ['HTML', 'CSS', 'JavaScript', 'DOM Manipulation']
    }
    // Add more projects here
};

// Modal Logic
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        const projectId = card.getAttribute('data-project');
        const data = projectData[projectId];

        if (data) {
            modalBody.innerHTML = `
                <h2>${data.title}</h2>
                <h4>${data.subtitle}</h4>
                <h3>Abstract</h3>
                <p>${data.abstract}</p>
                <h3>Technologies Used</h3>
                <div class="tech-tags">
                    ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scroll
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
