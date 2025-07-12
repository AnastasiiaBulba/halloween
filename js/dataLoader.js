// Data Loader - fetches content from JSON file
export function initializeDataLoader() {
  loadPageContent();
}

async function loadPageContent() {
  try {
    const response = await fetch("./data/content.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Load content based on current page
    const currentPage = getCurrentPage();

    switch (currentPage) {
      case "home":
        loadHomeContent(data);
        break;
      case "news":
        loadNewsContent(data);
        break;
      case "contact":
        loadContactContent(data);
        break;
    }
  } catch (error) {
    console.error("Error loading content:", error);
    // Fallback to default content
    loadFallbackContent();
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes("spooky-news.html")) return "news";
  if (path.includes("spooky-contact.html")) return "contact";
  return "home";
}

function loadHomeContent(data) {
  // Load hero content
  const heroTitle = document.getElementById("hero-title");
  const heroDescription = document.getElementById("hero-description");
  const playNowBtn = document.getElementById("play-now-btn");

  if (heroTitle && data.hero) {
    heroTitle.textContent = data.hero.title;
  }
  if (heroDescription && data.hero) {
    heroDescription.textContent = data.hero.description;
  }
  if (playNowBtn && data.hero) {
    playNowBtn.textContent = data.hero.buttonText;
  }

  // Load section titles
  if (data.sections) {
    const sectionElements = {
      "features-title": data.sections.features,
      "game-title": data.sections.game,
      "how-to-play-title": data.sections.howToPlay,
      "attractions-title": data.sections.attractions,
      "attractions-description": data.sections.attractionsDescription,
      "reviews-title": data.sections.reviews,
      "halloween-spirit-title": data.sections.halloweenSpirit,
    };

    Object.entries(sectionElements).forEach(([id, text]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = text;
      }
    });

    // Load Halloween Spirit text
    const spiritTextElements = document.querySelectorAll(".spirit-text p");
    if (
      spiritTextElements.length >= 2 &&
      data.sections.halloweenSpiritText &&
      data.sections.halloweenSpiritText2
    ) {
      spiritTextElements[0].textContent = data.sections.halloweenSpiritText;
      spiritTextElements[1].textContent = data.sections.halloweenSpiritText2;
    }
  }

  // Load features
  const featuresGrid = document.getElementById("features-grid");
  if (featuresGrid && data.features) {
    featuresGrid.innerHTML = data.features
      .map(
        (feature) => `
            <div class="feature-card">
                <div class="feature-icon">${feature.icon}</div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `
      )
      .join("");
  }

  // Load how to play content
  const howToPlayContent = document.getElementById("how-to-play-content");
  if (howToPlayContent && data.howToPlay) {
    howToPlayContent.innerHTML = `
            <div class="how-to-play-grid">
                ${data.howToPlay
                  .map(
                    (item) => `
                    <div class="how-to-item">
                        <h3 class="how-to-title">${item.title}</h3>
                        <p class="how-to-description">${item.description}</p>
                        <ul class="how-to-list">
                            ${item.steps
                              .map((step) => `<li>${step}</li>`)
                              .join("")}
                        </ul>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  // Load attractions features (renamed from track)
  const attractionsFeatures = document.getElementById("attractions-features");
  if (attractionsFeatures && data.track) {
    attractionsFeatures.innerHTML = data.track.features
      .map(
        (feature) => `
            <div class="attractions-feature">
                <div class="attractions-feature-icon">${feature.icon}</div>
                <div class="attractions-feature-text">${feature.text}</div>
            </div>
        `
      )
      .join("");
  }

  // Load reviews
  const reviewsGrid = document.getElementById("reviews-grid");
  if (reviewsGrid && data.reviews) {
    reviewsGrid.innerHTML = data.reviews
      .map(
        (review) => `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">${review.name.charAt(0)}</div>
                    <div class="review-info">
                        <div class="review-name">${review.name}</div>
                    </div>
                </div>
                <div class="review-text">"${review.text}"</div>
            </div>
        `
      )
      .join("");
  }
}

function loadNewsContent(data) {
  // Load section titles
  if (data.sections && data.sections.news) {
    const updatesTitle = document.getElementById("updates-title");
    const diariesTitle = document.getElementById("diaries-title");

    if (updatesTitle) {
      updatesTitle.textContent = data.sections.news.updates;
    }
    if (diariesTitle) {
      diariesTitle.textContent = data.sections.news.diaries;
    }
  }

  const updatesGrid = document.getElementById("updates-grid");
  if (updatesGrid && data.gameUpdates) {
    updatesGrid.innerHTML = data.gameUpdates
      .map(
        (update) => `
        <div class="news-card">
          <div class="news-image">
            ${
              update.image
                ? `<img src="${update.image}" alt="Halloween Park Update" class="news-image-photo" style="width:100%;height:auto;object-fit:cover;border-radius:12px;" />`
                : ""
            }
          </div>
          <div class="news-content">
            <span class="news-category">Game Update</span>
            <h3 class="news-title">${update.title}</h3>
            <p class="news-description">${update.description}</p>
            <div class="news-date">${update.date}</div>
            <button class="read-more-btn" data-content="${update.fullContent}">
              Read More
              <span class="read-more-icon">▼</span>
            </button>
            <div class="news-expanded"></div>
          </div>
        </div>
      `
      )
      .join("");
  }

  const diariesGrid = document.getElementById("diaries-grid");
  if (diariesGrid && data.trailDiaries) {
    diariesGrid.innerHTML = data.trailDiaries
      .map(
        (diary) => `
        <div class="news-card">
          <div class="news-image">
            ${
              diary.image
                ? `<img src="${diary.image}" alt="Halloween Park Diary" class="news-image-photo" style="width:100%;height:auto;object-fit:cover;border-radius:12px;" />`
                : ""
            }
          </div>
          <div class="news-content">
            <span class="news-category diaries">Ghost Diary</span>
            <h3 class="news-title">${diary.title}</h3>
            <p class="news-description">${diary.description}</p>
            <div class="news-date">${diary.date}</div>
            <button class="read-more-btn" data-content="${diary.fullContent}">
              Read More
              <span class="read-more-icon">▼</span>
            </button>
            <div class="news-expanded"></div>
          </div>
        </div>
      `
      )
      .join("");
  }
}

function loadContactContent(data) {
  // Load section titles
  if (data.sections && data.sections.contact) {
    const formTitle = document.querySelector(
      ".contact-form-section .section-title"
    );
    const mapTitle = document.querySelector(".map-section .section-title");

    if (formTitle) {
      formTitle.textContent = data.sections.contact.form;
    }
    if (mapTitle) {
      mapTitle.textContent = data.sections.contact.map;
    }
  }

  // Load contact information
  const contactEmail = document.getElementById("contact-email");
  const contactPhone = document.getElementById("contact-phone");
  const contactAddress = document.getElementById("contact-address");

  if (contactEmail && data.contact) {
    contactEmail.textContent = data.contact.email;
  }
  if (contactPhone && data.contact) {
    contactPhone.textContent = data.contact.phone;
  }
  if (contactAddress && data.contact) {
    contactAddress.textContent = data.contact.address;
  }
}

function loadFallbackContent() {
  // Fallback content if JSON fails to load
  console.log("Loading fallback content...");

  // Set default content for key elements
  const elements = {
    "hero-title": "Create Your Spooky Halloween Park",
    "hero-description":
      "Are you ready to run your own Halloween park? My Halloween Park is a 3D simulation game that lets you create a spooky and fun amusement park for visitors.",
    "play-now-btn": "Play Now",
    "features-title": "Game Features",
    "how-to-play-title": "How to Play",
    "attractions-title": "Explore Spooky Attractions",
    "attractions-description":
      "Experience various haunted environments from ghost-filled mansions to pumpkin gardens and candy shops.",
    "reviews-title": "Player Reviews",
  };

  Object.entries(elements).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  });
}
