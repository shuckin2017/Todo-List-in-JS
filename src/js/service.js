'use strict' 

const url = 'https://jsonplaceholder.typicode.com/todos';
const myRequest = new XMLHttpRequest();

export default { 
  elemHide(element, time){
    setTimeout(() => {
      element.setAttribute('hidden', '');
    }, time);
  },
  
  elemShow(element, time){
    setTimeout(() => {
      element.removeAttribute('hidden');
    }, time);
  },

  getDateCreation(){
    let dataCreation = {
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      dayWeek: new Date().getDay()
    };
    return dataCreation;
  },

  sendTest(){
    return new Promise((resolve, regect) => {
      console.log('Loading...');
      myRequest.open('GET', url);
      myRequest.send();
      myRequest.onload = ()=> {
        const status = myRequest.status;
        if(status < 400) {
          // resolve - callback внути then
          resolve(myRequest.response);
        } else {
          console.log('Error...');
        }
      };
    });
  }

};