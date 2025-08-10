const navMenu = document.getElementById("nav-menu")
const navLink = document.querySelectorAll(".nav-link")
const hamburger = document.getElementById("hamburger")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("left-[0]");
    hamburger.classList.toggle("ri-close-large-line");
  });

  navLink.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.toggle("left-[0]");
      hamburger.classList.toggle("ri-close-large-line");
    });
  });
}

auth.onAuthStateChanged((user) => {
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  const accountLink = document.getElementById("account-link");

  if (user) {
    // User is logged in
    loginLink?.classList.add("hidden");
    logoutLink?.classList.remove("hidden");
    accountLink?.classList.remove("hidden");
  } else {
    // User is logged out
    loginLink?.classList.remove("hidden");
    logoutLink?.classList.add("hidden");
    accountLink?.classList.add("hidden");
  }
});

document.getElementById("logout-link")?.addEventListener("click", () => {
  auth.signOut()
    .then(() => {
      console.log("User signed out");
      window.location.href = "index.html"; // Redirect if needed
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
    });
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  speed: 400,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  grabCursor: true,
  breakpoints: {
    640: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    },
  }
});

function initializeBotpress() {
  if (window.botpressWebChat && typeof window.botpressWebChat.init === "function") {
    window.botpressWebChat.init({
      theme: "classic",
      botName: "Plantelligence",
      themeConfig: {
        accentColor: "#28a745",
        botMessageBackgroundColor: "#e6ffe6",
        userMessageBackgroundColor: "#d1fae5",
        backgroundColor: "#f0fdf4"
      }
    });
  } else {
    // Retry after short delay until Botpress is ready
    setTimeout(initializeBotpress, 300);
  }
}

initializeBotpress();