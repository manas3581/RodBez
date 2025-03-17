// Main JavaScript File for RodBez Website

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      const isOpen = mainNav.classList.contains("active");
      mobileMenuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Service Tabs
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Hide all tab content
      const allTabContent = document.querySelectorAll(".tab-content");
      allTabContent.forEach((content) => content.classList.remove("active"));

      // Show relevant tab content
      const tabId = this.getAttribute("data-tab");
      const tabContent = document.getElementById(`${tabId}-content`);
      if (tabContent) {
        tabContent.classList.add("active");
      }
    });
  });

  // Form Validation
  const estimateButton = document.getElementById("estimate-fare");

  if (estimateButton) {
    estimateButton.addEventListener("click", function () {
      const pickupLocation = document.getElementById("pickup-location").value;
      const dropLocation = document.getElementById("drop-location").value;
      const phoneNumber = document.getElementById("phone-number").value;

      if (!pickupLocation) {
        showNotification("Please enter pickup location", "error");
        return;
      }

      if (!dropLocation) {
        showNotification("Please enter drop location", "error");
        return;
      }

      if (!phoneNumber) {
        showNotification("Please enter your mobile number", "error");
        return;
      }

      // Phone number validation for Indian numbers
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phoneNumber)) {
        showNotification(
          "Please enter a valid 10-digit Indian mobile number",
          "error"
        );
        return;
      }

      // If all validations pass, show success message or submit form
      showNotification("Getting fare estimate...", "success");

      // Here you would typically submit the form or make an API call
      setTimeout(() => {
        estimateFare(pickupLocation, dropLocation);
      }, 1500);
    });
  }

  // Mock function to simulate fare estimation
  function estimateFare(pickup, drop) {
    // In a real application, this would make an API call
    const randomFare = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

    // Create modal for fare estimate
    const modal = document.createElement("div");
    modal.className = "fare-modal";

    modal.innerHTML = `
            <div class="fare-modal-content">
                <span class="close-modal">&times;</span>
                <h2>Estimated Fare</h2>
                <div class="route-info">
                    <div class="route-point">
                        <i class="fas fa-circle location-dot pickup"></i>
                        <span>${pickup}</span>
                    </div>
                    <div class="route-line"></div>
                    <div class="route-point">
                        <i class="fas fa-circle location-dot dropoff"></i>
                        <span>${drop}</span>
                    </div>
                </div>
                <div class="fare-amount">
                    <h3>₹${randomFare}</h3>
                    <p>Estimated fare may vary based on traffic and other factors</p>
                </div>
                <div class="fare-actions">
                    <button class="btn secondary-btn">Book Now</button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Modal styling
    const style = document.createElement("style");
    style.textContent = `
            .fare-modal {
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .fare-modal-content {
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                max-width: 500px;
                width: 90%;
                position: relative;
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
            }
            
            .route-info {
                margin: 30px 0;
                position: relative;
            }
            
            .route-point {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .route-point:last-child {
                margin-bottom: 0;
            }
            
            .route-line {
                height: 30px;
                width: 2px;
                background-color: #ccc;
                margin-left: 6px;
            }
            
            .fare-amount {
                text-align: center;
                margin: 30px 0;
            }
            
            .fare-amount h3 {
                font-size: 36px;
                color: #333;
                margin-bottom: 10px;
            }
            
            .fare-amount p {
                font-size: 14px;
                color: #666;
            }
            
            .fare-actions {
                display: flex;
                justify-content: center;
            }
        `;

    document.head.appendChild(style);

    // Close modal functionality
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", function () {
      modal.remove();
      style.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.remove();
        style.remove();
      }
    });
  }

  // Notification System
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add notification styling
    const style = document.createElement("style");
    style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                opacity: 0;
                transform: translateY(-20px);
                animation: fadeIn 0.3s forwards, fadeOut 0.3s 2.7s forwards;
            }
            
            .notification.success {
                background-color: #4CAF50;
            }
            
            .notification.error {
                background-color: #F44336;
            }
            
            @keyframes fadeIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
        `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Remove notification after animation completes
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 3000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Skip if it's just "#"
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }

        // Scroll to element
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        });
      }
    });
  });

  // Book Now button functionality
  const bookNowButtons = document.querySelectorAll(".btn.secondary-btn");
  bookNowButtons.forEach((button) => {
    if (
      button.textContent.trim() === "Book Now" ||
      button.textContent.trim() === "Book TaxiPool"
    ) {
      button.addEventListener("click", function () {
        // Scroll to booking section
        const bookingSection = document.querySelector(".booking-section");
        if (bookingSection) {
          window.scrollTo({
            top: bookingSection.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    }
  });

  // Fare modal Book Now button
  document.addEventListener("click", function (e) {
    if (e.target.matches(".fare-actions .btn.secondary-btn")) {
      // Get modal and style elements
      const modal = document.querySelector(".fare-modal");
      const modalStyle = document.querySelector("style[data-modal-style]");

      if (modal) {
        // Show booking confirmation
        showNotification("Your booking has been initiated!", "success");

        // Remove modal
        modal.remove();
        if (modalStyle) modalStyle.remove();

        // Here you would typically redirect to a booking confirmation page
        // or show a more detailed booking form
      }
    }
  });

  // Automatic testimonial rotation (if any)
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  if (testimonialSlides.length > 1) {
    let currentSlide = 0;

    setInterval(() => {
      testimonialSlides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      testimonialSlides[currentSlide].classList.add("active");
    }, 5000);
  }

  // Add input focus effects
  const formInputs = document.querySelectorAll(".input-with-icon input");
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });

    // Check if input already has value on page load
    if (input.value) {
      input.parentElement.classList.add("focused");
    }
  });

  // WhatsApp button hover effect
  const whatsappButton = document.querySelector(".whatsapp-button");
  if (whatsappButton) {
    whatsappButton.addEventListener("mouseenter", function () {
      this.classList.add("pulse");
    });

    whatsappButton.addEventListener("mouseleave", function () {
      this.classList.remove("pulse");
    });
  }

  // Initialize the animation for elements when they come into view
  const animateOnScroll = function () {
    const elementsToAnimate = document.querySelectorAll(
      ".feature-card, .team-member, .service-info"
    );

    elementsToAnimate.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("visible");
      }
    });
  };

  // Run once on load
  animateOnScroll();

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll);
});
