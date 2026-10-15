(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  document.body.classList.add("has-js-reveal");

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -28px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const pageCheck = document.querySelector("[data-page-check]");
  if (pageCheck) {
    const now = new Date();
    pageCheck.textContent = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(now);
  }

  const copyButtons = document.querySelectorAll("[data-copy]");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy");
      if (!value) return;
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Copy unavailable";
      }
      window.setTimeout(() => { button.textContent = original; }, 1600);
    });
  });
})();
