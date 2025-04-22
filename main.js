document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll('.container-dotmenu div');
  const greenRectangle = document.querySelector('.green-rectangle');
  const contents = document.querySelectorAll('.content');
  const hiddenTextContainers = document.querySelectorAll('.hidden-text-container');
  let currentIndex = 0;

  function updatePage(index) {
    if (index % 2 === 0) {
      greenRectangle.style.opacity = '1';
      greenRectangle.innerHTML = '';
      const contentClone = contents[Math.floor(index / 2)].cloneNode(true);
      greenRectangle.appendChild(contentClone);

        // Apply specific dimensions for project-detail-2.html
        if (window.location.pathname.includes("project-detail-2.html", "project-detail-4.html")) {
            greenRectangle.style.width = '87.32vw';  // 1255px in vw
            greenRectangle.style.height = '61.5vh';  // 500px in vh
        } else if (window.location.pathname.includes("project-detail-3.html")) {
            greenRectangle.style.width = '87.32vw';  // 1255px in vw
            greenRectangle.style.height = '67.92vh'; // 552px in vh
        } else if (window.location.pathname.includes("project-detail-5.html")) {
            greenRectangle.style.width = '87.32vw';  // 1255px in vw
            greenRectangle.style.height = '46.2vh';  // 375px in vh
        } else {
            greenRectangle.style.width = '';
            greenRectangle.style.height = '';
        }


      hiddenTextContainers.forEach(container => {
        container.style.display = 'none';
      });
    } else {
      greenRectangle.style.opacity = '0';
      greenRectangle.innerHTML = '';

      hiddenTextContainers.forEach((container, textIndex) => {
        container.style.display = textIndex === Math.floor(index / 2) ? 'block' : 'none';
      });
    }

    reinitializeImageListenersAfterUpdate();
  }

  const colors = ['#5C6356'];

  function updateDots(index) {
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('filled-dot');
        dot.style.backgroundColor = '#5C6356';
      } else {
        dot.classList.remove('filled-dot');
        dot.style.backgroundColor = '#FFFFFF';
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateDots(currentIndex);
      updatePage(currentIndex);
    });
  });

  updateDots(0);
  updatePage(0);
  handleWheelEvent(); // Assuming this is defined elsewhere
});


document.addEventListener("DOMContentLoaded", () => {
  const navRectangle = document.querySelector(".nav-rectangel");
  const navTextElements = document.querySelectorAll(".navigation-bar-home .home-home, .navigation-bar-home .project-home, .navigation-bar-home .education-home, .navigation-bar-home .contact-home");
  const sections = document.querySelectorAll(".section");

  const sectionColors = {
    "top-section": { rectangleColor: "#FFB36F", textColor: "#9B5B33" },
    "middle-section": { rectangleColor: "#D0AA92", textColor: "#695549" },
    "project-section": { rectangleColor: "#C9D5BE", textColor: "#5C6356" },
    "education-section": { rectangleColor: "#B9C5F9", textColor: "#444C6E" },
    "contact-section": { rectangleColor: "#D98E6F", textColor: "#6C4332" }
  };

const detailedPages = ['project-detail-1.html', 'project-detail-2.html', 'project-detail-3.html', 'project-detail-4.html', 'project-detail-5.html', 'project-detail-6.html'];

const isDetailedPage = detailedPages.some(page => window.location.pathname.includes(page));


  if (isDetailedPage) {
    navRectangle.style.backgroundColor = "#C9D5BE"; // Green (not dark green)
    navTextElements.forEach(el => {
      el.style.color = "#5C6356"; // Keep white text

      // Keep hover working
      el.addEventListener('mouseenter', () => {
        el.style.color = "#FFFFFF";
      });
      el.addEventListener('mouseleave', () => {
        el.style.color = "#5C6356";
      });
    });
    return;
  }


  let lastScrollTop = window.scrollY;

  //  Fix: Only prevent default for internal section links
  navTextElements.forEach(el => {
    el.addEventListener("click", (event) => {
      const targetSectionId = el.getAttribute("data-section-id");
      const targetSection = document.querySelector(`#${targetSectionId}`);
      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  function applyHoverEffect() {
    navTextElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!el.classList.contains('active')) {
          el.style.color = '#FFFFFF';
        }
      });

      el.addEventListener('mouseleave', () => {
        const activeSection = document.querySelector('.section.in-view');
        const sectionSettings = activeSection ? sectionColors[activeSection.id] : sectionColors["top-section"];
        if (!el.classList.contains('active')) {
          el.style.color = sectionSettings.textColor;
        }
      });
    });
  }
  applyHoverEffect();

  function setInitialActiveSection() {
    const activeSection = document.querySelector('.section.in-view') || document.querySelector('#top-section');

    navTextElements.forEach(el => {
      const targetSectionId = el.getAttribute("data-section-id");
      if (targetSectionId === activeSection.id) {
        el.style.color = '#FFFFFF';
        el.classList.add("active");
      } else {
        const sectionSettings = sectionColors[activeSection.id] || sectionColors["top-section"];
        el.style.color = sectionSettings.textColor;
        el.classList.remove("active");
      }
    });
  }
  setInitialActiveSection();

  document.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY;
    const scrollingDown = currentScrollTop > lastScrollTop;
    lastScrollTop = currentScrollTop;

    const viewportHeight = window.innerHeight;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const threshold = scrollingDown ? 0.07 : 0.05;
      const sectionActivationPoint = viewportHeight * threshold;

      if (rect.top <= sectionActivationPoint && rect.bottom >= sectionActivationPoint) {
        const sectionId = section.id;
        const sectionSettings = sectionColors[sectionId] || sectionColors["top-section"];
        navRectangle.style.backgroundColor = sectionSettings.rectangleColor;

        navTextElements.forEach(el => {
          const targetSectionId = el.getAttribute("data-section-id");
          if (sectionId === "middle-section") {
            if (targetSectionId === "top-section") {
              el.style.color = '#FFFFFF';
            } else {
              el.style.color = '#695549';
            }
          } else if (targetSectionId === sectionId) {
            el.style.color = '#FFFFFF';
            el.classList.add("active");
          } else {
            el.style.color = sectionSettings.textColor;
            el.classList.remove("active");
          }
        });

        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    });
  });
});

// === IMAGE ENLARGEMENT LOGIC ===
function initializeImageClickListeners() {
  const images = document.querySelectorAll(".image-container img, .image-container-2 img, .image-container-3 img");
  const overlay = document.querySelector(".image-overlay");
  const enlargedImage = overlay.querySelector("img");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      enlargedImage.src = image.src;
      overlay.classList.add("active");
    });
  });

  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
}

function reinitializeImageListenersAfterUpdate() {
  initializeImageClickListeners();
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.createElement("div");
  overlay.classList.add("image-overlay");
  document.body.appendChild(overlay);

  const enlargedImage = document.createElement("img");
  overlay.appendChild(enlargedImage);

  initializeImageClickListeners();
});

// === EDUCATION BUTTON TOGGLES ===
document.addEventListener("DOMContentLoaded", function () {
  const strack = document.querySelector(".strack");
  const kthMore = document.getElementById("kth-more");
  const umuMore = document.getElementById("umu-more");
  const kthContent = document.querySelector(".flip-card-front-left");
  const umuContent = document.querySelector(".flip-card-front-right");
  const courseText = document.getElementById("course-text");
  const courseTextumu = document.getElementById("course-text-umu");

  const kthOriginalText = kthMore.textContent.trim();
  const umuOriginalText = umuMore.textContent.trim();
  let state = "default";

  function toggleButtonText(button, otherButton, originalText) {
    if (button.textContent.trim() === originalText) {
      button.textContent = "Show less";
      otherButton.textContent = originalText;
    } else {
      button.textContent = originalText;
    }
  }

  kthMore.addEventListener("click", function () {
    toggleButtonText(kthMore, umuMore, kthOriginalText);

    if (state !== "kth") {
      strack.style.left = "110%";
      umuContent.style.display = "none";
      state = "kth";
      setTimeout(() => {
        courseText.classList.add("show");
      }, 400);

      kthMore.disabled = true;
      setTimeout(() => { kthMore.disabled = false; }, 1000);
    } else {
      strack.style.left = "50%";
      setTimeout(() => {
        umuContent.style.display = "flex";
      }, 600);
      state = "default";
      courseText.classList.remove("show");

      kthMore.disabled = true;
      setTimeout(() => { kthMore.disabled = false; }, 1000);
    }
  });

  umuMore.addEventListener("click", function () {
    toggleButtonText(umuMore, kthMore, umuOriginalText);

    if (state !== "umu") {
      strack.style.left = "-10%";
      kthContent.style.display = "none";
      state = "umu";

      setTimeout(() => {
        courseTextumu.classList.add("show");
      }, 400);

      umuMore.disabled = true;
      setTimeout(() => { umuMore.disabled = false; }, 1000);
    } else {
      strack.style.left = "50%";
      setTimeout(() => {
        kthContent.style.display = "flex";
      }, 600);
      state = "default";
      courseTextumu.classList.remove("show");

      umuMore.disabled = true;
      setTimeout(() => { umuMore.disabled = false; }, 1000);
    }
  });
});

  document.addEventListener('DOMContentLoaded', () => {
    const overview1 = document.querySelector('.overview-1');
    const overview2 = document.querySelector('.overview-2');
    const overview3 = document.querySelector('.overview-3');
    const overview4 = document.querySelector('.overview-4');

    const overview3Img = document.querySelector('.overview-3 img');
    const overview4Img = document.querySelector('.overview-4 img');
    const overview5Img = document.querySelector('.overview-5 img');
    const overview6Img = document.querySelector('.overview-6 img');

    // === OVERVIEW 1 Hover logic ===
    if (overview1) {
      overview1.addEventListener('mouseenter', () => {
        if (overview4Img) {
          overview4Img.style.top = '106.89vh';
        }
      });

      overview1.addEventListener('mouseleave', () => {
        if (overview4Img) {
          overview4Img.style.top = '';
        }
      });
    }

    // === OVERVIEW 2 Hover logic ===
    if (overview2) {
      overview2.addEventListener('mouseenter', () => {
        if (overview5Img) {
          overview5Img.style.top = '136.1vh';  // 1105px in vh

        }
      });

      overview2.addEventListener('mouseleave', () => {
        if (overview5Img) {
          overview5Img.style.top = '';
        }
      });
    }

    // === OVERVIEW 3 Hover logic ===
    if (overview3) {
      overview3.addEventListener('mouseenter', () => {
        if (overview5Img) {
          overview5Img.style.top = '136.6vh';  // 1110px in vh

        }
      });

      overview3.addEventListener('mouseleave', () => {
        if (overview5Img) {
          overview5Img.style.top = '';
        }
      });
    }

    // === OVERVIEW 4 Hover logic ===
    if (overview4) {
      overview4.addEventListener('mouseenter', () => {
        if (overview3Img) {
          overview3Img.style.left = '34.5vw';
        }
        if (overview5Img) {
          overview5Img.style.left = '34.5vw';
        }
        if (overview6Img) {
          overview6Img.style.top = '185.89vh';
        }
      });

      overview4.addEventListener('mouseleave', () => {
        if (overview3Img) {
          overview3Img.style.left = '';
        }
        if (overview5Img) {
          overview5Img.style.left = '';
          overview5Img.style.top = ''; // Reset from overview-3 or overview-2 hover
        }
        if (overview6Img) {
          overview6Img.style.top = '';
        }
      });
    }
  });


