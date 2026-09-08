const DEADLINE = new Date("2026-10-07T18:30:00.000Z");
const WINDOW_START = new Date("2026-09-09T00:00:00+05:30");

const hoursEl = document.getElementById("hours");
const hoursLabel = document.getElementById("hours-label");
const unitsEl = document.getElementById("units");
const thesisEl = document.getElementById("thesis");
const statusLabel = document.getElementById("status-label");
const windowFill = document.getElementById("window-fill");

class DigitReel {
  constructor(host) {
    this.host = host;
    this.value = null;
  }

  set(next, immediate = false) {
    const digit = String(next);
    if (this.value === digit) return;

    const incoming = document.createElement("span");
    incoming.className = "reel-num";
    incoming.textContent = digit;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.host.replaceChildren(incoming);

    if (!immediate && !reduce) {
      incoming.animate(
        [
          { transform: "translateY(36%)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        { duration: 480, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }

    this.value = digit;
  }
}

function makeReelRow(count, className) {
  const row = document.createElement("div");
  row.className = className;
  const reels = [];
  for (let i = 0; i < count; i += 1) {
    const digit = document.createElement("span");
    digit.className = "digit";
    row.appendChild(digit);
    reels.push(new DigitReel(digit));
  }
  return { row, reels };
}

function pad(value, size) {
  return String(Math.max(0, value)).padStart(size, "0");
}

function remaining(now) {
  const ms = DEADLINE.getTime() - now.getTime();
  if (ms <= 0) {
    return { done: true, hours: 0, days: 0, hourPart: 0, minutes: 0, seconds: 0, progress: 1 };
  }

  const total = DEADLINE.getTime() - WINDOW_START.getTime();
  const elapsed = now.getTime() - WINDOW_START.getTime();
  const progress = Math.min(1, Math.max(0, elapsed / total));

  const hours = Math.floor(ms / 3_600_000);
  const days = Math.floor(ms / 86_400_000);
  const hourPart = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);

  return { done: false, hours, days, hourPart, minutes, seconds, progress };
}

const hourBoard = makeReelRow(3, "hours");
hoursEl.replaceWith(hourBoard.row);
hourBoard.row.id = "hours";
hourBoard.row.setAttribute("aria-live", "polite");
hourBoard.row.setAttribute("aria-atomic", "true");

const unitSpecs = [
  { key: "days", label: "Days", size: 2 },
  { key: "hourPart", label: "Hrs", size: 2 },
  { key: "minutes", label: "Min", size: 2 },
  { key: "seconds", label: "Sec", size: 2 },
];

const unitBoards = unitSpecs.map((spec) => {
  const wrap = document.createElement("div");
  wrap.className = "unit";
  const board = makeReelRow(spec.size, "unit-value");
  const label = document.createElement("div");
  label.className = "unit-label";
  label.textContent = spec.label;
  wrap.append(board.row, label);
  unitsEl.appendChild(wrap);
  return { ...spec, reels: board.reels };
});

function paint(reels, value, size, immediate) {
  const digits = pad(value, size);
  reels.forEach((reel, index) => reel.set(digits[index], immediate));
}

let first = true;

function tick() {
  const state = remaining(new Date());
  paint(hourBoard.reels, state.hours, 3, first);
  unitBoards.forEach((board) => {
    paint(board.reels, state[board.key], board.size, first);
  });
  windowFill.style.width = `${(state.progress * 100).toFixed(3)}%`;

  if (state.done) {
    document.body.classList.add("is-done");
    hoursLabel.textContent = "Hours left";
    statusLabel.textContent = "Closed";
    thesisEl.innerHTML =
      "The window closed.<br />A design partner still has to be real.";
  } else {
    hourBoard.row.setAttribute(
      "aria-label",
      `${state.hours} hours left until 7 October`,
    );
  }

  first = false;
}

tick();
setInterval(tick, 200);
