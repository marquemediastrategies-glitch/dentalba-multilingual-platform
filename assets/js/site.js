const WHATSAPP_NUMBER = "355000000000";
const EMAIL_ADDRESS = "info@dentalba.al";

function whatsappUrl(message) {
  if (WHATSAPP_NUMBER === "355000000000") {
    const inArticle = window.location.pathname.includes("/articles/");
    const inLanguageFolder = /\/(en|fr|es|it|de)\//.test(window.location.pathname);
    const contactPath = inArticle ? "../contact.html" : inLanguageFolder ? "contact.html" : "en/contact.html";
    return `${contactPath}?message=${encodeURIComponent(message)}`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function wireWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const message = link.getAttribute("data-message") || "Hello DentAlba, I would like dental treatment planning guidance before I travel.";
    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function addFloatingWhatsApp() {
  if (document.querySelector(".dt-whatsapp-float")) return;

  const lang = document.documentElement.lang || "en";
  const copy = {
    en: {
      label: "WhatsApp",
      note: "Fastest reply",
      message: "Hi, I am considering dental treatment in Albania and would like guidance on planning and provider options."
    },
    fr: {
      label: "WhatsApp",
      note: "Réponse rapide",
      message: "Bonjour DentAlba, j'envisage un traitement dentaire en Albanie et je souhaite une orientation de planification."
    },
    es: {
      label: "WhatsApp",
      note: "Respuesta rápida",
      message: "Hola DentAlba, estoy considerando tratamiento dental en Albania y quiero orientación de planificación."
    },
    it: {
      label: "WhatsApp",
      note: "Risposta rapida",
      message: "Ciao DentAlba, sto valutando un trattamento dentale in Albania e desidero orientamento per la pianificazione."
    },
    de: {
      label: "WhatsApp",
      note: "Schnelle Antwort",
      message: "Hallo DentAlba, ich prüfe eine Zahnbehandlung in Albanien und möchte Planungsorientierung."
    }
  };
  const selected = copy[lang.slice(0, 2)] || copy.en;
  const link = document.createElement("a");
  link.className = "dt-whatsapp-float";
  link.setAttribute("data-whatsapp", "");
  link.setAttribute("data-message", selected.message);
  link.setAttribute("aria-label", `${selected.note}: ${selected.label}`);
  link.innerHTML = `<span>${selected.note}</span><strong>${selected.label}</strong>`;
  document.body.appendChild(link);
}

function wireQuoteForms() {
  document.querySelectorAll("[data-quote-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const lines = [
        "Hello DentAlba, I would like dental treatment planning guidance.",
        `Name: ${data.get("name") || ""}`,
        `Country: ${data.get("country") || ""}`,
        `WhatsApp number: ${data.get("phone") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Language: ${data.get("language") || ""}`,
        `Main problem: ${data.get("problem") || ""}`,
        `Treatment: ${data.get("treatment") || ""}`,
        `Travel month: ${data.get("month") || ""}`,
        `Notes: ${data.get("notes") || ""}`,
        `Consent to contact, review submitted health information, and coordinate possible provider next steps: ${data.get("consent") ? "Yes" : "Not confirmed"}`,
        "I understand that remote review is preliminary and is not a final diagnosis, treatment plan, or provider guarantee.",
        "I understand that for the most accurate review I should send a panoramic X-ray or clear smile photos by WhatsApp or email."
      ];
      if (event.submitter?.hasAttribute("data-email-submit")) {
        const subject = encodeURIComponent("DentAlba planning review request");
        const body = encodeURIComponent(lines.join("\n"));
        window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
        return;
      }

      window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
    });
  });
}

const calculatorCopy = {
  en: {
    savings: "Estimated saving",
    local: "At home",
    dentAlba: "DentAlba + flight",
    flight: "Flight after reimbursement",
    prefix: "You could save about",
    disclaimer: "Estimate only. Final treatment depends on X-rays, scans, diagnosis, travel dates, and confirmed package terms."
  },
  fr: {
    savings: "Économie estimée",
    local: "Chez vous",
    dentAlba: "DentAlba + vol",
    flight: "Vol après remboursement",
    prefix: "Vous pourriez économiser environ",
    disclaimer: "Estimation uniquement. Le traitement final dépend des radios, scans, diagnostic, dates de voyage et conditions du forfait confirmé."
  }
};

const countryCosts = {
  france: { label: "France", all4: 14000, all6: 17000 },
  belgium: { label: "Belgium", all4: 15000, all6: 18000 },
  uk: { label: "United Kingdom", all4: 18000, all6: 22000 },
  italy: { label: "Italy", all4: 12000, all6: 15000 },
  spain: { label: "Spain", all4: 11000, all6: 14000 },
  netherlands: { label: "Netherlands", all4: 16000, all6: 19500 },
  luxembourg: { label: "Luxembourg", all4: 17000, all6: 20500 },
  switzerland: { label: "Switzerland", all4: 24000, all6: 29000 },
  germany: { label: "Germany", all4: 15500, all6: 19000 },
  austria: { label: "Austria", all4: 15000, all6: 18500 },
  norway: { label: "Norway", all4: 22000, all6: 26500 },
  denmark: { label: "Denmark", all4: 20000, all6: 24000 },
  sweden: { label: "Sweden", all4: 19000, all6: 23000 },
  finland: { label: "Finland", all4: 18000, all6: 22000 },
  ireland: { label: "Ireland", all4: 16000, all6: 19500 },
  portugal: { label: "Portugal", all4: 10500, all6: 13500 },
  greece: { label: "Greece", all4: 10000, all6: 13000 },
  cyprus: { label: "Cyprus", all4: 11000, all6: 14000 },
  malta: { label: "Malta", all4: 12000, all6: 15000 },
  croatia: { label: "Croatia", all4: 9000, all6: 12000 },
  slovenia: { label: "Slovenia", all4: 10000, all6: 13000 },
  slovakia: { label: "Slovakia", all4: 8500, all6: 11500 },
  czechia: { label: "Czechia", all4: 9000, all6: 12000 },
  poland: { label: "Poland", all4: 8500, all6: 11500 },
  hungary: { label: "Hungary", all4: 8000, all6: 11000 },
  romania: { label: "Romania", all4: 7500, all6: 10500 },
  bulgaria: { label: "Bulgaria", all4: 7000, all6: 10000 },
  estonia: { label: "Estonia", all4: 10000, all6: 13000 },
  latvia: { label: "Latvia", all4: 9000, all6: 12000 },
  lithuania: { label: "Lithuania", all4: 9000, all6: 12000 },
  usa: { label: "USA", all4: 26000, all6: 32000 },
  canada: { label: "Canada", all4: 23000, all6: 28500 }
};

const dentalbaCosts = {
  all4: 7100,
  all6: 6060
};

function formatEuro(value) {
  const amount = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Math.max(0, Math.round(value)));
  return `${amount} €`;
}

function wireSavingsCalculator() {
  document.querySelectorAll("[data-calculator]").forEach((calculator) => {
    const lang = calculator.getAttribute("data-lang") || "en";
    const copy = calculatorCopy[lang] || calculatorCopy.en;
    const country = calculator.querySelector("[data-calc-country]");
    const treatment = calculator.querySelector("[data-calc-treatment]");
    const flight = calculator.querySelector("[data-calc-flight]");
    const local = calculator.querySelector("[data-calc-local]");
    const total = calculator.querySelector("[data-calc-total]");
    const reimbursement = calculator.querySelector("[data-calc-reimbursement]");
    const savings = calculator.querySelector("[data-calc-savings]");
    const percent = calculator.querySelector("[data-calc-percent]");
    const note = calculator.querySelector("[data-calc-note]");

    function calculate() {
      const selectedCountry = countryCosts[country.value] || countryCosts.france;
      const treatmentKey = treatment.value;
      const localCost = selectedCountry[treatmentKey];
      const dentAlbaCost = dentalbaCosts[treatmentKey];
      const flightCost = Number(flight.value || 0);
      const flightAfterReimbursement = Math.max(0, flightCost - 200);
      const totalCost = dentAlbaCost + flightAfterReimbursement;
      const saved = Math.max(0, localCost - totalCost);
      const pct = localCost > 0 ? Math.round((saved / localCost) * 100) : 0;

      local.textContent = formatEuro(localCost);
      total.textContent = formatEuro(totalCost);
      reimbursement.textContent = formatEuro(flightAfterReimbursement);
      savings.textContent = formatEuro(saved);
      percent.textContent = `${pct}%`;
      note.textContent = `${copy.prefix} ${formatEuro(saved)}. ${copy.disclaimer}`;
    }

    [country, treatment, flight].forEach((input) => input.addEventListener("input", calculate));
    calculate();
  });
}

function wireSmileComparisons() {
  document.querySelectorAll("[data-compare]").forEach((compare) => {
    const range = compare.querySelector("[data-compare-range]");
    const before = compare.querySelector("[data-compare-before]");
    const divider = compare.querySelector("[data-compare-divider]");
    const beforeImage = before?.querySelector("img");
    const frame = compare.querySelector(".dt-compare-frame") || compare;

    if (!range || !before || !divider || !beforeImage) return;

    function update() {
      const value = `${range.value}%`;
      beforeImage.style.width = `${frame.clientWidth}px`;
      before.style.width = value;
      divider.style.left = value;
    }

    function setFromClientX(clientX) {
      const rect = frame.getBoundingClientRect();
      if (!rect.width) return;

      const min = Number(range.min || 0);
      const max = Number(range.max || 100);
      const percent = ((clientX - rect.left) / rect.width) * 100;
      const value = Math.min(max, Math.max(min, percent));
      range.value = String(Math.round(value));
      update();
    }

    function startDrag(event) {
      event.preventDefault();
      setFromClientX(event.clientX);
      divider.setPointerCapture?.(event.pointerId);
      divider.classList.add("is-dragging");

      function move(pointerEvent) {
        setFromClientX(pointerEvent.clientX);
      }

      function stop() {
        divider.classList.remove("is-dragging");
        divider.removeEventListener("pointermove", move);
        divider.removeEventListener("pointerup", stop);
        divider.removeEventListener("pointercancel", stop);
      }

      divider.addEventListener("pointermove", move);
      divider.addEventListener("pointerup", stop);
      divider.addEventListener("pointercancel", stop);
    }

    function startMouseDrag(event) {
      event.preventDefault();
      setFromClientX(event.clientX);
      divider.classList.add("is-dragging");

      function move(mouseEvent) {
        setFromClientX(mouseEvent.clientX);
      }

      function stop() {
        divider.classList.remove("is-dragging");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stop);
      }

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", stop);
    }

    function startTouchDrag(event) {
      const touch = event.touches?.[0];
      if (!touch) return;
      event.preventDefault();
      setFromClientX(touch.clientX);
      divider.classList.add("is-dragging");

      function move(touchEvent) {
        const currentTouch = touchEvent.touches?.[0];
        if (currentTouch) setFromClientX(currentTouch.clientX);
      }

      function stop() {
        divider.classList.remove("is-dragging");
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", stop);
        document.removeEventListener("touchcancel", stop);
      }

      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("touchend", stop);
      document.addEventListener("touchcancel", stop);
    }

    range.addEventListener("input", update);
    divider.addEventListener("pointerdown", startDrag);
    divider.addEventListener("mousedown", startMouseDrag);
    divider.addEventListener("touchstart", startTouchDrag, { passive: false });
    window.addEventListener("resize", update);
    beforeImage.addEventListener("load", update, { once: true });
    update();
  });
}

function wirePremiumHomepage() {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  if (header) {
    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    accordion.querySelectorAll("article").forEach((item) => {
      const button = item.querySelector("button");
      if (!button) return;

      button.addEventListener("click", () => {
        const isOpen = item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
      });
    });
  });
}

addFloatingWhatsApp();
wireWhatsAppLinks();
wireQuoteForms();
wireSavingsCalculator();
wireSmileComparisons();
wirePremiumHomepage();
