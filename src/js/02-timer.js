import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
const darkTheme = require('flatpickr/dist/themes/dark.css');

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const startTime = Date.now();
let endTime = null;

const options = {
  theme: darkTheme,
  locale: Ukrainian,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onReady() {
    refs.button.disabled = true;
  },
  onClose(selectedDates) {
    endTime = Date.parse(selectedDates[0]);
    if (endTime < startTime) {
      refs.button.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }

    refs.button.disabled = false;
  },
};

flatpickr(refs.input, options);
refs.button.addEventListener('click', countdownTimer);

function countdownTimer() {
  refs.input.disabled = true;
  refs.button.disabled = true;
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = endTime - currentTime;
    let time = convertMs(deltaTime);
    if (deltaTime <= 0) {
      time = convertMs(0);
      clearInterval(timerId);
      Notify.success('Time is out!');
      updateClockface(time);
      refs.input.disabled = false;
    }
    updateClockface(time);
  }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = String(days).padStart(2, 0);
  refs.hours.textContent = String(hours).padStart(2, 0);
  refs.minutes.textContent = String(minutes).padStart(2, 0);
  refs.seconds.textContent = String(seconds).padStart(2, 0);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
