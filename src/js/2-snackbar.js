
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", handlerSubmit);

function handlerSubmit(event) {
    event.preventDefault();
    
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
    
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    }); 


    promise
        .then(delay => {
        iziToast.success({
        title: "Success",
        message: `Fulfilled after ${delay}ms`,
        position: "topRight",
      });
            console.log(`✅ Fulfilled after ${delay}ms`);
        })
        .catch(delay => {
        iziToast.error({
        title: "Error",
        message: `Rejected after ${delay}ms`,
        position: "topRight",
      });
            console.log(`❌ Rejected after ${delay}ms`);
        });
}
