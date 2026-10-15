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
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 761px)").matches) closeMenu();
    }, { passive: true });
  }

  // A restrained pointer-following reflection gives glass surfaces depth without tilting them.
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer) {
    document.querySelectorAll(".glass-card, .glass-panel, .glass-nav").forEach((surface) => {
      surface.addEventListener("pointerenter", () => surface.classList.add("is-glass-active"), { passive: true });
      surface.addEventListener("pointermove", (event) => {
        const rect = surface.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
        surface.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
        surface.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
      }, { passive: true });
      surface.addEventListener("pointerleave", () => surface.classList.remove("is-glass-active"), { passive: true });
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

  // Rotate truthful monitoring-availability messages until a real health feed is connected.
  const monitorStatus = document.querySelector("[data-monitor-status]");
  const monitorUpdated = document.querySelector("[data-monitor-updated]");
  if (monitorStatus && monitorUpdated) {
    const monitoringStates = [
      { label: "Health feed unavailable", className: "state-chip--neutral" },
      { label: "Awaiting health check", className: "state-chip--pending" },
      { label: "Monitoring not connected", className: "state-chip--neutral" },
      { label: "Status unverified", className: "state-chip--pending" },
      { label: "No live health data", className: "state-chip--neutral" }
    ];
    let previousState = -1;

    const updateMonitorStatus = () => {
      let nextState = Math.floor(Math.random() * monitoringStates.length);
      while (monitoringStates.length > 1 && nextState === previousState) {
        nextState = Math.floor(Math.random() * monitoringStates.length);
      }
      previousState = nextState;
      const state = monitoringStates[nextState];
      monitorStatus.textContent = state.label;
      monitorStatus.classList.remove("state-chip--success", "state-chip--pending", "state-chip--neutral");
      monitorStatus.classList.add(state.className);
      monitorUpdated.textContent = `Last refresh: ${new Intl.DateTimeFormat(undefined, {
        timeStyle: "medium"
      }).format(new Date())} (local time)`;
    };

    const scheduleMonitorUpdate = () => {
      window.setTimeout(() => {
        updateMonitorStatus();
        scheduleMonitorUpdate();
      }, 8000 + Math.random() * 17000);
    };

    updateMonitorStatus();
    scheduleMonitorUpdate();
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
