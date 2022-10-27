
const start = document.getElementById('start');
const restart = document.getElementById('restart');
const pause = document.getElementById('pause');
const reanudar = document.getElementById('continue');
const values = document.getElementById('values');
const countDay = document.getElementById('countDay');
const countHour = document.getElementById('countHour');
const countMin = document.getElementById('countMin');
const countSeg = document.getElementById('countSeg');
reanudar.style.display = 'none';
restart.style.display = 'none';



// AGREGA UN CERO AL VALOR INGRESO 
function aggZero(num) {
  return num < 10 ? '0' + num : num;
};


function selectTime(sDay,sHour,sMin,sSeg) {
  countDay.textContent = sDay;
  countHour.textContent = aggZero(sHour);
  countMin.textContent = aggZero(sMin);
  countSeg.textContent = aggZero(sSeg);
};


// TRANSFORMA LOS VALORES INGRESADOS EN SEGUNDOS
window.onload = function() {
  start.addEventListener('click',()=>{
    const valueDay = document.getElementById('valueDay').value;
    const valueHour = document.getElementById('valueHour').value;
    const valueMin = document.getElementById('valueMin').value;
    const valueSeg = document.getElementById('valueSeg').value;
    duration = (valueDay * 86400) + (valueHour * 3600) + (valueMin * 60) + valueSeg;
  
    if (duration > 0) {
      getRemainTime(parseInt(duration - 1));
      selectTime("0",valueHour,valueMin,valueSeg)
  
      start.style.display = 'none';
      restart.style.display = 'initial';
    };
  })
}



// TRANSFORMA LOS SEGUNDOS EN HORARIOS
function getRemainTime(duration) {
  secondsRemaining = duration;

  countInterval = setInterval(()=>{
    day = parseInt(secondsRemaining / (3600 * 24));
    hour = parseInt(secondsRemaining / 3600 % 24);
    min = parseInt(secondsRemaining / 60 % 60);
    seg = parseInt(secondsRemaining % 60);

    selectTime(day,hour,min,seg);

    secondsRemaining = parseInt(secondsRemaining - 1);
    if (secondsRemaining < 0) {
      clearInterval(countInterval);
      restart.style.display = 'none';
      start.style.display = 'initial';
      reanudar.style.display = 'none';
    }
  },1000);
}


// DETALLES 
pause.addEventListener('click',()=>{
  clearInterval(countInterval);
  diferenciaTemporal = parseInt(secondsRemaining);

  if (secondsRemaining > 0) {
    pause.style.display = 'none';
    reanudar.style.display = 'initial';
  }
})

restart.addEventListener('click',()=>{
  clearInterval(countInterval);
  selectTime('--','--','--','--');

  restart.style.display = 'none';
  start.style.display = 'initial';
  reanudar.style.display = 'none';
  pause.style.display = 'initial';  
})

reanudar.addEventListener('click',()=>{
  getRemainTime(diferenciaTemporal);

  reanudar.style.display = 'none';
  pause.style.display = 'initial';
})
