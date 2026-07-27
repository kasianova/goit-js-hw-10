
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const days= document.querySelector('[data-days]');
const hours= document.querySelector('[data-hours]');
const minutes= document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;

let timer = null;

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;
  input.disabled = true;
  
  timer = setInterval(() => {
    const timeNow = Date.now();
    const diff = userSelectedDate - timeNow;

  if (diff <= 0) {
    clearInterval(timer);
    updateTimer(0);
    input.disabled = false;
    startBtn.disabled = true;
    return;
    }
    updateTimer(diff);
  }, 1000);
});


function updateTimer(ms) {
  const time = convertMs(ms);

  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  console.log(selectedDates[0]);
    
    if (selectedDates[0] <= new Date()) {
      iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
      timeout: 3000,
      progressBar: true,
      });
      startBtn.disabled = true;
      userSelectedDate = null;
      return;
    }
   
    userSelectedDate = selectedDates[0];
    startBtn.disabled = false;
    console.log(userSelectedDate);
  },
};


flatpickr("#datetime-picker", options);






