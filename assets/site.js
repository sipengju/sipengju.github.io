const isChinese = document.documentElement.lang === "zh-CN";
const uiLabels = {"✅ Copied successfully!": ["✅ 复制成功！", "✅ Copied successfully!"], "📧 Click to copy / Contact me via email": ["📧 点击复制 / 欢迎通过邮件联系我", "📧 Click to copy / Contact me via email"], "Copy failed. Please copy the address manually.": ["复制失败，请手动复制邮箱地址。", "Copy failed. Please copy the address manually."], "☀️ Light Mode": ["☀️ 浅色模式", "☀️ Light Mode"], "🌙 Dark Mode": ["🌙 深色模式", "🌙 Dark Mode"], "Close navigation": ["关闭导航", "Close navigation"], "Open navigation": ["打开导航", "Open navigation"]};
const ui = key => uiLabels[key][isChinese ? 0 : 1];

    /* =========================
       Email Modal
       ========================= */

    function openEmailModal() {
      document.getElementById("email-modal").style.display = "block";
    }

    function closeEmailModal() {
      document.getElementById("email-modal").style.display = "none";
    }

    function openWechatModal() {
      document.getElementById("wechat-modal").style.display = "block";
    }

    function closeWechatModal() {
      document.getElementById("wechat-modal").style.display = "none";
    }

    function copyEmail() {
      const email = document.getElementById("emailAddr").innerText;
      const copyTip = document.getElementById("copyTip");

      navigator.clipboard.writeText(email)
        .then(() => {
          copyTip.innerText = ui("✅ Copied successfully!");

          setTimeout(() => {
            copyTip.innerText = ui("📧 Click to copy / Contact me via email");
          }, 2000);
        })
        .catch(() => {
          copyTip.innerText = ui("Copy failed. Please copy the address manually.");

          setTimeout(() => {
            copyTip.innerText = ui("📧 Click to copy / Contact me via email");
          }, 2000);
        });
    }

    /* =========================
       Image Modal
       ========================= */

    let imgScale = 1;

    function openModal(src) {
      const imageModal = document.getElementById("img-modal");
      const modalImage = document.getElementById("modal-img");

      imgScale = 1;
      imageModal.style.display = "block";
      modalImage.src = src;
      modalImage.style.transform = `scale(${imgScale})`;
    }

    function closeImgModal() {
      document.getElementById("img-modal").style.display = "none";
    }

    document
      .getElementById("modal-img")
      .addEventListener("wheel", event => {
        event.preventDefault();

        imgScale += event.deltaY > 0 ? -0.1 : 0.1;
        imgScale = Math.max(0.5, Math.min(2, imgScale));

        event.target.style.transform = `scale(${imgScale})`;
      });

    /* =========================
       Close Modals
       ========================= */

    window.addEventListener("click", event => {
      const emailModal = document.getElementById("email-modal");
      const wechatModal = document.getElementById("wechat-modal");
      const imageModal = document.getElementById("img-modal");

      if (event.target === emailModal) {
        closeEmailModal();
      }

      if (event.target === wechatModal) {
        closeWechatModal();
      }

      if (event.target === imageModal) {
        closeImgModal();
      }
    });

    /* =========================
       Back to Top
       ========================= */

    const backTopButton = document.getElementById("backTop");

    window.addEventListener("scroll", () => {
      backTopButton.style.display =
        window.scrollY > 300 ? "flex" : "none";
    });

    backTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    /* =========================
       Theme Toggle
       ========================= */

    const themeButton = document.getElementById("themeToggle");

    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      const darkModeEnabled =
        document.body.classList.contains("dark-mode");

      themeButton.innerText = darkModeEnabled
        ? ui("☀️ Light Mode")
        : ui("🌙 Dark Mode");

      localStorage.setItem(
        "darkMode",
        darkModeEnabled ? "enabled" : "disabled"
      );
    });

    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      themeButton.innerText = ui("☀️ Light Mode");
    }

    /* =========================
       Page Loader
       ========================= */

    window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
      }, 800);
    });

    /* =========================
       Fade-in Animation
       ========================= */

    const fadeElements = document.querySelectorAll(".fade-in");

    const fadeObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });

    /* =========================
       Visit Count
       ========================= */

    /* =========================
       Global Page View Counter
       ========================= */
    
    async function updateVisitCount() {
      const visitCountElement =
        document.getElementById("visit-count");
    
      try {
        const response = await fetch(
          "https://counterapi.com/api/yangpu-tang.github.io/view/homepage",
          {
            method: "GET",
            cache: "no-store"
          }
        );
    
        if (!response.ok) {
          throw new Error(
            `Visit counter request failed: ${response.status}`
          );
        }
    
        const data = await response.json();
    
        visitCountElement.innerText =
          Number(data.value).toLocaleString(isChinese ? "zh-CN" : "en-US");
      } catch (error) {
        console.error(
          "Failed to load the global visit count:",
          error
        );
    
        visitCountElement.innerText = "--";
      }
    }
    
    updateVisitCount();
    
    /* =========================
       Sidebar Navigation
       ========================= */

    const sidebar = document.getElementById("sidebar");
    const navToggle = document.getElementById("navToggle");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const navLinks = document.querySelectorAll(".nav-link");

    const navigationSections = [
      document.getElementById("about"),
      document.getElementById("publications"),
      document.getElementById("Appointments"),
      document.getElementById("Education"),
      document.getElementById("services"),
      document.getElementById("gallery")
    ].filter(Boolean);

    function openSidebar() {
      sidebar.classList.add("open");
      sidebarOverlay.classList.add("visible");
      document.body.classList.add("sidebar-open");

      navToggle.innerText = "✕";
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", ui("Close navigation"));
    }

    function closeSidebar() {
      sidebar.classList.remove("open");
      sidebarOverlay.classList.remove("visible");
      document.body.classList.remove("sidebar-open");

      navToggle.innerText = "☰";
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", ui("Open navigation"));
    }

    function toggleSidebar() {
      if (sidebar.classList.contains("open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }

    navToggle.addEventListener("click", event => {
      event.stopPropagation();
      toggleSidebar();
    });

    sidebarOverlay.addEventListener("click", closeSidebar);

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1000) {
          closeSidebar();
        }
      });
    });

    function updateActiveNavigation() {
      const scrollPosition = window.scrollY + 180;
      let currentSectionId = "about";

      navigationSections.forEach(section => {
        if (section.offsetTop <= scrollPosition) {
          currentSectionId = section.id;
        }
      });

      navLinks.forEach(link => {
        const targetId = link.getAttribute("href");

        link.classList.toggle(
          "active",
          targetId === `#${currentSectionId}`
        );
      });
    }

    window.addEventListener("scroll", updateActiveNavigation);

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000) {
        closeSidebar();
      }
    });

    window.addEventListener("load", updateActiveNavigation);

    /* =========================
       Keyboard Shortcuts
       ========================= */

    document.addEventListener("keydown", event => {
      const key = event.key.toLowerCase();

      if (key === "d") {
        themeButton.click();
      }

      if (key === "t") {
        backTopButton.click();
      }

      if (key === "escape") {
        closeSidebar();
        closeEmailModal();
        closeWechatModal();
        closeImgModal();
      }
    });
  
// Preserve the current section when changing language.
document.querySelectorAll('.language-switch a').forEach(link => {
  link.addEventListener('click', () => {
    const section = document.querySelector('.nav-link.active');
    const hash = section ? section.getAttribute('href') : '';
    link.href = link.getAttribute('href').split('#')[0] + hash;
  });
});
