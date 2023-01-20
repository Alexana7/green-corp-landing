const INCREASE_NUMBER_ANIMATION_SPEED = 50; //скорость анимации

//функция шаг анимации
// i - счетчик анимации(от 0 до 5000)
// element - html-элемент тега с числом
// endNumber - конечное значение

function increaseNumberAnimationStep(i, element, endNumber) {
  // проверяем что переменная меньше конечного значения
    if (i <= endNumber) {
      // доюавляем "+" к конечному значению
        if (i === endNumber) {
            element.innerText = i + '+';
          } else {
            element.innerText = i;
          }
          i+=100;
          // вызываем функцию каждые 50мс
          setTimeout(function() {
            increaseNumberAnimationStep(i, element, endNumber);
          }, INCREASE_NUMBER_ANIMATION_SPEED);
  }
}
    
// функиця инициализации и запуска анимации
function initIncreaseNumberAnimation() {
  const element = document.querySelector(".features__clients-count");
  increaseNumberAnimationStep(0, element, 5000)
}
initIncreaseNumberAnimation();