document.addEventListener("DOMContentLoaded", () => {
  const form =
    document.querySelector("form") || document.body.querySelector("form");
  if (!form) return;

  const email = document.querySelector('[data-testid="test-contact-email"]');
  const message = document.querySelector(
    '[data-testid="test-contact-message"]'
  );
  const submit =
    document.querySelector('[data-testid="test-contact-submit"]') ||
    form.querySelector('button[type="submit"], input[type="submit"]');

  if (!email || !message) return;

  function getOrCreateError(idTest, afterEl) {
    let el = document.querySelector(`[data-testid="${idTest}"]`);
    if (!el) {
      el = document.createElement("div");
      el.setAttribute("data-testid", idTest);
      el.style.color = "#b91c1c";
      el.style.fontSize = "13px";
      el.id = idTest + "-msg";
      el.setAttribute("aria-live", "assertive");
      afterEl.parentNode.insertBefore(el, afterEl.nextSibling);
    } else if (!el.id) el.id = idTest + "-msg";
    return el;
  }

  const emailErr = getOrCreateError("test-contact-error-email", email);
  const msgErr = getOrCreateError("test-contact-error-message", message);
  let successEl = document.querySelector(
    '[data-testid="test-contact-success"]'
  );
  if (!successEl) {
    successEl = document.createElement("div");
    successEl.setAttribute("data-testid", "test-contact-success");
    successEl.setAttribute("role", "status");
    successEl.setAttribute("aria-live", "polite");
    successEl.style.color = "#065f46";
    successEl.style.marginTop = "10px";
    form.appendChild(successEl);
  }
  successEl.textContent = "";
  successEl.style.display = "none";

  // Link fields to their error messages for accessibility
  email.setAttribute("aria-describedby", emailErr.id);
  message.setAttribute("aria-describedby", msgErr.id);

  const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail() {
    const v = (email.value || "").trim();
    if (!v) {
      emailErr.textContent = "Email is required.";
      email.setAttribute("aria-invalid", "true");
      return false;
    }
    if (!emailRE.test(v)) {
      emailErr.textContent = "Please enter a valid email (name@example.com).";
      email.setAttribute("aria-invalid", "true");
      return false;
    }
    emailErr.textContent = "";
    email.setAttribute("aria-invalid", "false");
    return true;
  }

  function validateMessage() {
    const v = (message.value || "").trim();
    if (!v) {
      msgErr.textContent = "Message is required.";
      message.setAttribute("aria-invalid", "true");
      return false;
    }
    if (v.length < 10) {
      msgErr.textContent = "Message must be at least 10 characters.";
      message.setAttribute("aria-invalid", "true");
      return false;
    }
    msgErr.textContent = "";
    message.setAttribute("aria-invalid", "false");
    return true;
  }

  // Live feedback
  email.addEventListener("input", validateEmail);
  message.addEventListener("input", validateMessage);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successEl.style.display = "none";
    successEl.textContent = "";

    const validEmail = validateEmail();
    const validMsg = validateMessage();

    if (!validEmail) {
      email.focus();
      return;
    }
    if (!validMsg) {
      message.focus();
      return;
    }

    // If we reach here the form is valid
    successEl.textContent = "Thanks — your message has been sent.";
    successEl.style.display = "block";

    // Optionally clear the form:
    form.reset();
    email.setAttribute("aria-invalid", "false");
    message.setAttribute("aria-invalid", "false");
  });

  // Ensure submit button has expected data-testid (so tests can find it)
  if (submit && !submit.hasAttribute("data-testid")) {
    submit.setAttribute("data-testid", "test-contact-submit");
  }
});
