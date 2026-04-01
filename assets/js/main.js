// Menú móvil
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Cierra el menú al navegar
  siteNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Hero demo (hora + etiqueta)
function qualityLabel(v) {
  if (v <= 40) return { text: "Bueno", note: "Condición favorable. Mantener buenas prácticas." };
  if (v <= 70) return { text: "Moderado", note: "Moderado — se recomienda reducir exposición prolongada." };
  if (v <= 85) return { text: "Alto", note: "Alto — evitar actividades intensas al aire libre." };
  return { text: "Muy alto", note: "Muy alto — tomar medidas preventivas y reportar a autoridades." };
}

function updateHeroPanel(zone, value) {
  const gaugeValue = document.getElementById("gaugeValue");
  const gaugeFill = document.getElementById("gaugeFill");
  const zoneName = document.getElementById("zoneName");
  const qualityTag = document.getElementById("qualityTag");
  if (!gaugeValue || !gaugeFill || !zoneName || !qualityTag) return;

  const v = Math.max(0, Math.min(100, Number(value)));
  gaugeValue.textContent = String(v);
  gaugeFill.style.width = v + "%";
  zoneName.textContent = zone;

  qualityTag.textContent = qualityLabel(v).text;
}

function setHourNow() {
  const el = document.getElementById("hourNow");
  if (!el) return;
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  el.textContent = `${hh}:${mm}`;
}
setHourNow();
setInterval(setHourNow, 15000);

// Mapa demo
const pins = document.querySelectorAll(".pin");
const selZone = document.getElementById("selZone");
const selValue = document.getElementById("selValue");
const selFill = document.getElementById("selFill");
const selLabel = document.getElementById("selLabel");

function updateSelection(zone, value) {
  const v = Math.max(0, Math.min(100, Number(value)));
  if (selZone) selZone.textContent = zone;
  if (selValue) selValue.textContent = String(v);
  if (selFill) selFill.style.width = v + "%";
  if (selLabel) selLabel.textContent = qualityLabel(v).note;
  updateHeroPanel(zone, v);
}

pins.forEach((pin) => {
  pin.addEventListener("click", () => {
    updateSelection(pin.dataset.zone || "Zona", pin.dataset.value || "50");
    pins.forEach(p => p.classList.remove("active"));
    pin.classList.add("active");
  });
});

// Form demo (no envía, solo muestra confirmación)
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formNote) {
      formNote.textContent = "✅ Mensaje listo. (Demo) Puedes conectar este formulario a un backend si lo necesitas.";
    }
    form.reset();
  });
}
