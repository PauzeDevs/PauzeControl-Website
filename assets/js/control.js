(() => {
  "use strict";
  const panels = [...document.querySelectorAll("[data-panel]")];
  const navButtons = [...document.querySelectorAll("[data-view]")];
  const pageTitle = document.querySelector("[data-page-title]");
  const toast = document.querySelector("[data-toast-area]");
  const titleByView = {
    overview: "Overview",
    screen: "Live Screen",
    devices: "Device Studio",
    transfers: "Transfers",
    settings: "Settings"
  };
  let toastTimer;
  const announce = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4200);
  };

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;
      panels.forEach((panel) => {
        const active = panel.dataset.panel === view;
        panel.hidden = !active;
        panel.classList.toggle("is-visible", active);
      });
      navButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        if (active) item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
      });
      if (pageTitle) pageTitle.textContent = titleByView[view] || "Overview";
      if (view === "overview" && window.matchMedia("(max-width: 680px)").matches) {
        document.querySelector(".pcw-workspace-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => announce(button.dataset.toast || "This is a preview interaction."));
  });

  document.querySelectorAll("[data-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      const profile = button.dataset.profile;
      document.querySelectorAll("[data-profile]").forEach((item) => {
        item.classList.toggle("is-selected", item === button);
      });
      document.querySelectorAll("[data-profile-name]").forEach((item) => {
        item.textContent = profile;
      });
      const heroProfile = document.querySelector("[data-hero-profile]");
      if (heroProfile) heroProfile.textContent = profile;
      announce(profile + " selected in this local demo. No device was contacted.");
    });
  });

  document.querySelectorAll("[data-screen-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-screen-mode]").forEach((item) => item.classList.toggle("is-selected", item === button));
      const mode = button.dataset.screenMode === "control" ? "CONTROL" : "VIEW";
      const footer = document.querySelector(".pcw-screen-footer span:first-child");
      if (footer) footer.textContent = mode + " MODE · DEMO";
      announce(mode === "CONTROL" ? "Control mode selected for the preview only. No input is sent to a device." : "View mode selected for the preview only. No screen stream is connected.");
    });
  });

  const date = document.querySelector("[data-local-date]");
  if (date) {
    date.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "long", month: "long", day: "numeric"
    }).format(new Date()).toUpperCase();
  }
})();
