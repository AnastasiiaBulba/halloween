// Cookie Bar functionality
export function initializeCookieBar() {
  const cookieBar = document.getElementById("cookie-bar");
  const acceptButton = document.getElementById("accept-cookies");

  if (!cookieBar || !acceptButton) return;

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("halloweenParkCookiesAccepted");

  if (!cookiesAccepted) {
    // Show cookie bar after a short delay
    setTimeout(() => {
      cookieBar.classList.add("show");
    }, 1500);
  }

  // Handle accept button click
  acceptButton.addEventListener("click", function () {
    localStorage.setItem("halloweenParkCookiesAccepted", "true");
    cookieBar.classList.remove("show");

    // Add success animation
    const originalText = this.textContent;
    const originalBg = this.style.backgroundColor;

    this.textContent = "Accepted!";
    this.style.backgroundColor = "var(--success-color)";
    this.style.transform = "scale(1.05)";

    setTimeout(() => {
      this.textContent = originalText;
      this.style.backgroundColor = originalBg;
      this.style.transform = "";
    }, 2000);
  });

  // Handle escape key to hide cookie bar
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cookieBar.classList.contains("show")) {
      cookieBar.classList.remove("show");
    }
  });

  // Auto-hide cookie bar after 30 seconds if not accepted
  if (!cookiesAccepted) {
    setTimeout(() => {
      if (cookieBar.classList.contains("show")) {
        cookieBar.classList.remove("show");
      }
    }, 30000);
  }
}
