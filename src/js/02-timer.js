import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let deadline;
const startBtn = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadline = getDeadline(selectedDates);
  },
};
flatpickr(inputDate, options);

startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtnClick);

function getDeadline(date) {
  if (Date.parse(date) < Date.now()) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  startBtn.removeAttribute('disabled');
  return Date.parse(date);
}

function onStartBtnClick() {
  timer(deadline);
  startBtn.setAttribute('disabled', true);
}

function timer(date) {
  const timerId = setInterval(() => {
    const deltaMs = date - Date.now();
    const objDeltaDate = convertMs(deltaMs);
    addTimerIntoMarkup(objDeltaDate);
    if (deltaMs < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function addTimerIntoMarkup({ days, hours, minutes, seconds }) {
  const day = document.querySelector('[data-days]');
  const hour = document.querySelector('[data-hours]');
  const minute = document.querySelector('[data-minutes]');
  const second = document.querySelector('[data-seconds]');
  day.textContent = addLeadingZero(days);
  hour.textContent = addLeadingZero(hours);
  minute.textContent = addLeadingZero(minutes);
  second.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
