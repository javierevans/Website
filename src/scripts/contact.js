

// Grab elements from the page
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const sendBtn = document.getElementById("send-btn");


// Keep track of timers so multiple submits don't stack timeouts
let fadeTimer = null;
let clearTimer = null;




// Make sure the form exists before running anything
if (form && statusEl && sendBtn) {
  form.addEventListener("submit", async (e) => {
    
    // Stop the page from reloading
    e.preventDefault();

    // Show "Sending..." state
    sendBtn.disabled = true; // Disable the button to prevent multiple clicks
    sendBtn.textContent = "Sending..."; // Change button text to indicate progress
    statusEl.textContent = ""; // Clear any previous status messages
    statusEl.className = ""; // Reset status message styling


    try {
      // Collect form data automatically
      const formData = new FormData(form);   // This will include all form fields with their names and values

      // Send it to Formspree
      const res = await fetch(form.action, {
        method: "POST",   // Use POST method to send form data
        body: formData,   // Send the FormData object directly
        headers: {
          Accept: "application/json",    // Tell Formspree we want JSON back
        },
      });

      // If it worked
      if (res.ok) {
        // Show success message
        statusEl.textContent =
          "✅ Message sent! Thanks — I’ll get back to you soon.";
        statusEl.className = "success";

        // Clear form fields
        form.reset();

        // Clear the success message after 5 seconds
        setTimeout(() => {
          statusEl.textContent = "";
          statusEl.className = ""; // clears success/error 
        }, 5000);
      } else {
        // If Formspree returns an error
        statusEl.textContent =
          "❌ Something went wrong. Please try again.";
        statusEl.className = "error";

         // Fully clear at 5s 
        setTimeout(() => {
            statusEl.textContent = "";
            statusEl.className = ""; // clears success/error 
        }, 5000);
      }
    } catch (err) {
      // If network fails
      statusEl.textContent =
        "❌ Network error. Please try again.";
      statusEl.className = "error";

         // Fully clear at 5s 
        setTimeout(() => {
            statusEl.textContent = "";
            statusEl.className = ""; // clears success/error 
        }, 5000);
    } finally {
      // Always restore button
      sendBtn.disabled = false;
      sendBtn.textContent = "Send";
    }
  });
}











