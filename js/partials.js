// Partials Loader - loads HTML partials into the page
export async function loadPartial(elementId, partialPath) {
  try {
    const response = await fetch(partialPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const element = document.getElementById(elementId);

    if (element) {
      element.innerHTML = html;
    } else {
      console.error(`Element with id '${elementId}' not found`);
    }
  } catch (error) {
    console.error(`Error loading partial '${partialPath}':`, error);
  }
}

// Load all partials
export async function loadPartials() {
  try {
    // Load header
    const response = await fetch("./spooky_partials/header.html");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const headerHtml = await response.text();
    const headerElement = document.getElementById("header");

    if (headerElement) {
      headerElement.innerHTML = headerHtml;
    } else {
      console.error("Header element not found");
    }

    // Load footer
    const footerResponse = await fetch("./spooky_partials/footer.html");
    if (!footerResponse.ok) {
      throw new Error(`HTTP error! status: ${footerResponse.status}`);
    }

    const footerHtml = await footerResponse.text();
    const footerElement = document.getElementById("footer");

    if (footerElement) {
      footerElement.innerHTML = footerHtml;
    } else {
      console.error("Footer element not found");
    }

    // Load contact info if on contact page
    const currentPage = window.location.pathname;
    if (currentPage.includes("spooky-contact.html")) {
      const contactResponse = await fetch(
        "./spooky_partials/contact-info.html"
      );
      if (contactResponse.ok) {
        const contactHtml = await contactResponse.text();
        const contactElement = document.getElementById("contact-info");

        if (contactElement) {
          contactElement.innerHTML = contactHtml;
        }
      }
    }
  } catch (error) {
    console.error("Error loading partials:", error);
  }
}
