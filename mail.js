// Custom Toast Notification Function
function showToast(type, title, message) {
  // console.log("=== showToast called ===");
  // console.log("Type:", type);
  // console.log("Title:", title);
  // console.log("Message:", message);
  
  const toastContainer = document.getElementById("toast-container");
  console.log("Toast container found:", toastContainer);
  
  if (!toastContainer) {
    console.error("Toast container not found!");
    alert(title + "\n" + message);
    return;
  }
  
  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.style.cssText = "display: block !important; visibility: visible !important; opacity: 1 !important;";
  
  // console.log("Toast element created with class:", toast.className);
  
  // Toast icon based on type
  let icon = "";
  if (type === "success") {
    icon = '<i class="fa-solid fa-circle-check"></i>';
  } else if (type === "error") {
    icon = '<i class="fa-solid fa-circle-xmark"></i>';
  } else {
    icon = '<i class="fa-solid fa-circle-info"></i>';
  }
  
  // Toast HTML structure
  toast.innerHTML = `
    <div class="toast-content">
      <h4 class="toast-title">
      <div class="toast-icon">
      ${icon}
    </div>
    ${title}</h4>
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="toast-progress"></div>
  `;
  
  // Add toast to container
  toastContainer.appendChild(toast);
  console.log("Toast added to container. Container now has", toastContainer.children.length, "children");
  console.log("Toast element:", toast);
  
  // Force a reflow to ensure animation plays
  toast.offsetHeight;
  
  // Auto remove after 5 seconds (increased for testing)
  setTimeout(() => {
    console.log("Starting toast removal animation");
    toast.classList.add("toast-removing");
    setTimeout(() => {
      console.log("Removing toast from DOM");
      if (toast.parentElement) {
        toast.remove();
      }
    }, 400);
  }, 5000);
}

// Test function - you can call this from console to test
window.testToast = function() {
  showToast("success", "Test Toast", "This is a test message!");
};

console.log("mail.js loaded");

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initializeForm);
} else {
  // DOM is already loaded
  initializeForm();
}

function initializeForm() {
  console.log("Initializing form...");
  
  const btn = document.getElementById("button");
  const form = document.getElementById("form");
  const toastContainer = document.getElementById("toast-container");
  
  // console.log("Form element:", form);
  // console.log("Button element:", btn);
  // console.log("Toast container:", toastContainer);
  
  if (!form) {
    console.error("Form not found!");
    return;
  }
  
  if (!btn) {
    console.error("Button not found!");
    return;
  }
  
  if (!toastContainer) {
    console.error("Toast container not found!");
    return;
  }
  
  // console.log("All elements found successfully!");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("=== Form submitted ===");

    // Change button text to show sending status
    const btnText = btn.querySelector(".btn-text");
    
    if (!btnText) {
      console.error("Button text element not found!");
      // Fallback: change whole button text
      const originalButtonHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      btn.style.cursor = 'not-allowed';
      
      handleFormSubmission(btn, originalButtonHTML, form);
      return;
    }
    
    const originalText = btnText.innerHTML;
    btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';

    handleFormSubmission(btn, originalText, form, btnText);
  });
  
  console.log("Form event listener attached");
}

function handleFormSubmission(btn, originalText, form, btnText) {
  const serviceID = "service_fm6ksqy";
  const templateID = "template_m1vnyjm";

  console.log("Sending email via EmailJS...");

  emailjs.sendForm(serviceID, templateID, form).then(
    (response) => {
      console.log("=== Email sent successfully ===");
      console.log("Response:", response);
      
      // Reset button
      if (btnText) {
        btnText.innerHTML = originalText;
      } else {
        btn.innerHTML = originalText;
      }
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.cursor = '';
      
      // Show success toast
      console.log("Calling showToast for success...");
      showToast(
        "success",
        "Message Sent Successfully!",
        "Thank you for reaching out! I'll get back to you as soon as possible."
      );
      
      // Reset form
      form.reset();
      console.log("Form reset complete");
    },
    (err) => {
      console.error("=== Email send failed ===");
      console.error("Error:", err);
      
      // Reset button
      if (btnText) {
        btnText.innerHTML = originalText;
      } else {
        btn.innerHTML = originalText;
      }
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.cursor = '';
      
      // Show error toast
      console.log("Calling showToast for error...");
      showToast(
        "error",
        "Failed to Send Message",
        "Oops! Something went wrong. Please try again or contact me directly via email."
      );
    }
  );
}
