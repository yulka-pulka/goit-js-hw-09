const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};
let timerId = null;
const INTERVAL = 1000;

const onClickStartButton = e => {
  if (refs.buttonStop.disabled) {
    refs.buttonStop.removeAttribute('disabled');
  }
  e.currentTarget.disabled = true;

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);
};

const onClickStopButton = e => {
  refs.buttonStart.removeAttribute('disabled');
  e.currentTarget.disabled = true;
  clearInterval(timerId);
};

refs.buttonStart.addEventListener('click', onClickStartButton);
refs.buttonStop.addEventListener('click', onClickStopButton);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
