        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Header scroll effect
        const header = document.querySelector('header');
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll animation
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // If it's a timeline item, stagger the animation
                    if (entry.target.classList.contains('timeline-item')) {
                        const items = document.querySelectorAll('.timeline-item');
                        items.forEach((item, index) => {
                            if (item === entry.target) {
                                item.style.transitionDelay = `${index * 0.2}s`;
                            }
                        });
                    }

                    // Animate skill bars
                    if (entry.target.id === 'skills') {
                        document.querySelectorAll('.skill-progress-bar').forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = '0';

                            // Animate after a short delay
                            setTimeout(() => {
                                bar.style.transition = 'width 1.5s ease-in-out';
                                bar.style.width = width;
                            }, 300);
                        });
                    }

                    // Animate stats
                    if (entry.target.id === 'home') {
                        animateValue('project-count', 0, 7, 1500);
                        animateValue('client-count', 0, 4, 1500);
                        animateValue('code-hours', 0, 600, 1500);
                        animateValue('coffee-cups', 0, 500, 1500);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Set skill bar widths
        document.querySelectorAll('.skill-progress-bar').forEach(bar => {
            const width = bar.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
            bar.setAttribute('data-width', width);
            bar.style.width = '0';
        });

        // Theme switcher
        const themeSwitcher = document.querySelector('.theme-switcher');
        const body = document.body;
        const themes = ['cyber', 'minimal', 'warm'];
        let currentTheme = 0;

        themeSwitcher.addEventListener('click', () => {
            currentTheme = (currentTheme + 1) % themes.length;
            body.setAttribute('data-theme', themes[currentTheme]);

            // Update theme icon
            const themeIcon = themeSwitcher.querySelector('i');
            if (themes[currentTheme] === 'cyber') {
                themeIcon.className = 'fas fa-moon';
            } else if (themes[currentTheme] === 'minimal') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-palette';
            }
        });

        // Add typing effect to hero text
        document.addEventListener('DOMContentLoaded', function () {
            const heroTitle = document.querySelector('.hero-text h1');
            const originalText = heroTitle.innerHTML;

            // Clear the text initially for typing effect
            heroTitle.innerHTML = 'Hi, I\'m <span></span>';
            const spanElement = heroTitle.querySelector('span');

            const name = 'Ajwa!';
            let i = 0;

            function typeWriter() {
                if (i < name.length) {
                    spanElement.innerHTML += name.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }

            // Start the typing animation
            setTimeout(typeWriter, 1000);
        });

        // Typewriter effect for hero section
        const typewriterText = document.getElementById('typewriter');
        const texts = [
            "I'm a Python Developer",
            "I'm a Web Developer",
            "I'm AI | ML Learning Ethusiast",
            "I'm a Computer Vision Explorer"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let erasingDelay = 50;
        let newTextDelay = 2000;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typewriterText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = erasingDelay;
            } else {
                typewriterText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingDelay = newTextDelay;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500;
            }

            setTimeout(type, typingDelay);
        }

        // Start the typewriter effect after the name animation
        setTimeout(type, 2500);

        // Animate value function for stats
        function animateValue(id, start, end, duration) {
            const obj = document.getElementById(id);
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Terminal typing effect
        document.addEventListener('DOMContentLoaded', function () {
            const terminalContent = document.querySelector('.terminal-content');
            const originalContent = terminalContent.innerHTML;
            terminalContent.innerHTML = '';

            const lines = originalContent.split('\n').filter(line => line.trim() !== '');
            let lineIndex = 0;
            let charIndex = 0;
            let currentLine = '';
            let isTag = false;

            function typeTerminal() {
                if (lineIndex < lines.length) {
                    if (charIndex < lines[lineIndex].length) {
                        const char = lines[lineIndex].charAt(charIndex);

                        if (char === '<') isTag = true;
                        if (char === '>') isTag = false;

                        currentLine += char;
                        terminalContent.innerHTML = currentLine;
                        charIndex++;

                        setTimeout(typeTerminal, isTag ? 0 : 30);
                    } else {
                        currentLine += '<br>';
                        terminalContent.innerHTML = currentLine;
                        charIndex = 0;
                        lineIndex++;
                        setTimeout(typeTerminal, 500);
                    }
                }
            }

            setTimeout(typeTerminal, 2000);
        });

        //Contact
         document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('portfolioContactForm');
        const confirmationModal = document.getElementById('confirmationModal');
        const confirmSendBtn = document.getElementById('confirmSend');
        const goBackBtn = document.getElementById('goBack');
        const formLoading = document.getElementById('form-loading');
        const formSuccess = document.getElementById('form-success');
        const formError = document.getElementById('form-error');
        
        // Handle form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Show the confirmation modal
            confirmationModal.classList.add('active');
        });
        
        // Handle confirm send button
        confirmSendBtn.addEventListener('click', function() {
            // Hide modal
            confirmationModal.classList.remove('active');
            
            // Show loading state
            formLoading.style.display = 'flex';
            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            
            // Use AJAX to submit the form without leaving the page
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    formLoading.style.display = 'none';
                    formSuccess.style.display = 'flex';
                    
                    // Reset form after successful submission
                    setTimeout(function() {
                        contactForm.reset();
                    }, 2000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // Show error message
                formLoading.style.display = 'none';
                formError.style.display = 'flex';
                console.error('Error:', error);
            });
        });
        
        // Handle go back button
        goBackBtn.addEventListener('click', function() {
            confirmationModal.classList.remove('active');
        });
    });

