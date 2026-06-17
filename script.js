// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Skills array
  const skillsList = [
    "C / C++", "Python", "Java", "Digital Logic Design",
    "Circuit Analysis", "555 Timer IC", "Flip-Flop Circuits (74LS74, 74LS76)",
    "4511 BCD-to-7-Segment", "Problem Solving", "Basic Data Structures"
  ];
  
  const skillsContainer = document.getElementById("skillsContainer");
  if(skillsContainer) {
    skillsList.forEach((skill, idx) => {
      const span = document.createElement("span");
      span.className = "skill-item";
      span.style.setProperty('--order', idx);
      span.innerHTML = `<i class="fas fa-code" style="margin-right:6px; font-size:0.75rem;"></i> ${skill}`;
      skillsContainer.appendChild(span);
    });
  }

  // Projects data
  const projectsData = [
    {
      title: "555 Timer IC Projects",
      icon: "fas fa-microchip",
      desc: "Designed and tested timer circuits using the 555 IC, including monostable and astable multivibrator configurations."
    },
    {
      title: "Small Boolean Circuits",
      icon: "fas fa-brain",
      desc: "Designed and implemented basic boolean logic circuits using AND, OR, NOT, NAND, NOR, XOR, and XNOR gates with ICs like 74LS00, 74LS02, and 74LS86."
    },
    {
      title: "BCD-to-7-Segment Display",
      icon: "fas fa-table",
      desc: "Implemented a BCD-to-7-segment decoder circuit using the 4511 IC to display digits 0-9."
    }
  ];
  
  const projectsGrid = document.getElementById("projectsGrid");
  if(projectsGrid) {
    projectsData.forEach(proj => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-icon"><i class="${proj.icon || 'fas fa-microchip'}"></i></div>
        <h3>${proj.title}</h3>
        <p style="color:#4a627a;">${proj.desc}</p>
      `;
      projectsGrid.appendChild(card);
    });
  }

  // Contact Form Handler - Using EmailJS or direct mailto fallback
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");
  
  if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      // Get form values
      const userName = document.getElementById("userName").value.trim();
      const userEmail = document.getElementById("userEmail").value.trim();
      const userMessage = document.getElementById("userMessage").value.trim();
      
      // Validation
      if (!userName || !userEmail || !userMessage) {
        showFeedback("Please fill in all fields", "error");
        return;
      }
      
      if (!isValidEmail(userEmail)) {
        showFeedback("Please enter a valid email address", "error");
        return;
      }
      
      // Show loading state
      const submitBtn = document.getElementById("submitBtn");
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
      submitBtn.disabled = true;
      
      try {
        // Check if EmailJS and CONFIG are available
        if (typeof emailjs !== 'undefined' && typeof CONFIG !== 'undefined') {
          // Initialize EmailJS with public key from config
          emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
          
          // Send email using config values
          await emailjs.send(
            CONFIG.EMAILJS_SERVICE_ID,
            CONFIG.EMAILJS_TEMPLATE_ID,
            {
              name: userName,
              email: userEmail,
              time: new Date().toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
              }),
              message: userMessage,
              message_id: Math.floor(Math.random() * 10000)
            }
          );
          
          showFeedback("✓ Message sent successfully! I'll get back to you soon.", "success");
          contactForm.reset();
          
        } else if (typeof emailjs !== 'undefined' && typeof CONFIG === 'undefined') {
          // EmailJS is loaded but config is missing - try with hardcoded values (not recommended)
          console.warn('⚠️ CONFIG not found. Using hardcoded values (not secure).');
          
          // This is a fallback - you should always use CONFIG
          await emailjs.send(
            'service_2pjmfsh',
            'template_1zi5ej4',
            {
              name: userName,
              email: userEmail,
              time: new Date().toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
              }),
              message: userMessage,
              message_id: Math.floor(Math.random() * 10000)
            }
          );
          
          showFeedback("✓ Message sent successfully! I'll get back to you soon.", "success");
          contactForm.reset();
          
        } else {
          // EmailJS not available - Fallback to mailto
          const subject = `Portfolio Contact from ${userName}`;
          const body = `Name: ${userName}%0AEmail: ${userEmail}%0A%0AMessage:%0A${userMessage}%0A%0A---%0ASent from Issam ElSayed's Portfolio`;
          window.location.href = `mailto:sayedissam3@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
          showFeedback("✓ Opening your email client. Please send the message to complete.", "success");
          contactForm.reset();
        }
        
      } catch (error) {
        console.error("Error sending message:", error);
        
        // Fallback to mailto if EmailJS fails
        const subject = `Portfolio Contact from ${userName}`;
        const body = `Name: ${userName}%0AEmail: ${userEmail}%0A%0AMessage:%0A${userMessage}`;
        window.location.href = `mailto:CONFIG.CONTACT_EMAIL?subject=${encodeURIComponent(subject)}&body=${body}`;
        showFeedback("✓ Opening email client. Please send the message to complete.", "success");
        contactForm.reset();
        
      } finally {
        // Reset button after 2 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }, 2000);
      }
    });
  }
  
  // Helper function to show feedback messages
  function showFeedback(message, type) {
    const formFeedback = document.getElementById("formFeedback");
    if (!formFeedback) return;
    
    formFeedback.innerHTML = message;
    formFeedback.style.color = type === "success" ? "#2b7a62" : "#e74c3c";
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (formFeedback.innerHTML === message) {
        formFeedback.innerHTML = "";
      }
    }, 5000);
  }
  
  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Add scroll-triggered animation for elements
  const observerOptions = { 
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const fadeElements = document.querySelectorAll('.project-card, .info-card, .about-text');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0px)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // Also observe skill items
  const allSkills = document.querySelectorAll('.skill-item');
  allSkills.forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(8px)';
    skill.style.transition = 'opacity 0.4s ease, transform 0.3s ease';
    observer.observe(skill);
  });
  
  // Adjust navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 20) {
        navbar.style.background = "rgba(255, 255, 255, 0.9)";
        navbar.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.04)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.75)";
        navbar.style.boxShadow = "none";
      }
    });
  }
  
  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  if (darkModeToggle) {
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '☀️';
    }
    
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '☀️';
      } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '🌙';
      }
    });
  }
  
  // Log configuration status (for debugging)
  if (typeof CONFIG !== 'undefined') {
    console.log('✅ Config loaded successfully');
    console.log('📧 EmailJS Service ID:', CONFIG.EMAILJS_SERVICE_ID);
    console.log('📝 EmailJS Template ID:', CONFIG.EMAILJS_TEMPLATE_ID);
    console.log('🔑 EmailJS Public Key:', CONFIG.EMAILJS_PUBLIC_KEY ? '✓ Set' : '✗ Missing');
  } else {
    console.warn('⚠️ Config not loaded. Using mailto fallback.');
  }
});