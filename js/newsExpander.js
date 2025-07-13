// News Modal functionality
export function initializeNewsExpander() {
  // Use event delegation for dynamically loaded content
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("read-more-btn")) {
      handleReadMoreClick(event.target);
    }
  });
}

function handleReadMoreClick(button) {
  const title = button.getAttribute("data-title");
  const content = button.getAttribute("data-content");
  const date = button.getAttribute("data-date");
  const category = button.getAttribute("data-category");

  if (!content) {
    return;
  }

  // Create and show news modal
  showNewsModal(title, content, date, category);
}

function showNewsModal(title, content, date, category) {
  // Remove existing news modal if any
  const existingModal = document.getElementById("news-modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal HTML
  const modalHTML = `
    <div id="news-modal" class="modal">
      <div class="modal-content news-modal-content">
        <div class="modal-header">
          <div class="news-modal-header">
            <span class="news-category ${
              category === "diaries" ? "diaries" : ""
            }">${category === "diaries" ? "Ghost Diary" : "Game Update"}</span>
            <div class="news-date">${date}</div>
          </div>
          <button class="modal-close" id="news-modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <h3 class="news-modal-title">${title}</h3>
          <div class="news-modal-content-text">
            ${content}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" id="news-modal-close-btn">Close</button>
        </div>
      </div>
    </div>
  `;

  // Add modal to page
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Get modal elements
  const modal = document.getElementById("news-modal");
  const closeBtn = document.getElementById("news-modal-close");
  const closeBtnFooter = document.getElementById("news-modal-close-btn");

  // Show modal
  setTimeout(() => {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }, 10);

  // Close modal functions
  function closeNewsModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(() => {
      modal.remove();
    }, 300);
  }

  // Event listeners
  closeBtn.addEventListener("click", closeNewsModal);
  closeBtnFooter.addEventListener("click", closeNewsModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeNewsModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeNewsModal();
    }
  });
}

// Alternative implementation for static content (kept for compatibility)
export function initializeStaticNewsExpander() {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const title = this.getAttribute("data-title");
      const content = this.getAttribute("data-content");
      const date = this.getAttribute("data-date");
      const category = this.getAttribute("data-category");

      if (!content) {
        return;
      }

      showNewsModal(title, content, date, category);
    });
  });
}
