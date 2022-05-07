import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  amount: document.querySelector('[name="amount"]'),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();
  createArrayOfPromises();
}

function createArrayOfPromises() {
  const options = {
    amount: refs.amount.value,
    firstDelay: refs.firstDelay.value,
    delayStep: refs.delayStep.value,
  };

  let delayTime = Number(options.firstDelay);
  for (let i = 1; i <= options.amount; i++) {
    let positionNumber = i;

    createPromise(positionNumber, delayTime)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayTime += Number(options.delayStep);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
