
//******************функция шаг анимации
// i - счетчик анимации(от 0 до 5000)
// element - html-элемент тега с числом
// endNumber - конечное значение
const INCREASE_NUMBER_ANIMATION_SPEED = 50; //скорость анимации
let animationInited = false; // счетчик


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

//************************************* 
//  изменение header при скролле

function updateScroll() {
  if(window.scrollY > 0) {
    document.querySelector("header").classList.add("header__scrolled")
  } else {
    document.querySelector("header").classList.remove("header__scrolled")
  }

//***********************************// запуск счетчика
// получаем позицию скролла - нужен нижний край окна (верхний угол окна + высота окна)
  let windowBottomPosition = window.scrollY + window.innerHeight;
  // получаем позицию счетчика
  let countElementPosition = document.querySelector(".features__clients-count").offsetTop;
  //  console.log(windowBottomPosition, countElementPosition)
  
  if (windowBottomPosition >= countElementPosition &&! animationInited) { 
    animationInited = true;
    initIncreaseNumberAnimation();  
}   
}
window.addEventListener("scroll", updateScroll)


//*****************************************
//  Добавление нового текстового поля при выборе "Другое" в поле "Примерный бюджет"

document.querySelector("#budget").addEventListener("change", function handleSelectChange(event) {
  const form = document.querySelector(".form__container .form");
  // добавляем текстовое поле 
  if (event.target.value === 'other') {
    const formContainer = document.createElement("div");
    formContainer.classList.add("form__group");
    formContainer.classList.add("form__other-input");
    
    const input = document.createElement("input");
    input.classList.add("input")
    input.placeholder = "Введите ваш вариант";
    input.type = "text";
    formContainer.appendChild(input);

    form.insertBefore(formContainer, document.querySelector(".form__submit"))
  }

  // удаляем ранее добавленное текстовое поле, если оно есть в DOM
  const otherInput = document.querySelector(".form__other-input");

  // если выбран элемент НЕ "другое" и дополнительное текстовое поле добавлено на страницу
  if (event.target.value !== "other" && (Boolean(otherInput))) {
    
    form.removeChild(otherInput); 
  }
})

// ******************************плавный скролл для сыылок
// функция находит ссылку и добавляет css свойство
function onLinkClick (e) {
  e.preventDefault();
  let a = document.querySelector(e.target.getAttribute('href'));
  a.scrollIntoView({behavior: 'smooth'})
};
// функция отслеживает клик по ссылке
function addSmoothScroll(a) {
  a.addEventListener("click", onLinkClick)

};
// функция для получения коллекции всех тегов <a></a> 
document.querySelectorAll('a[href^="#"]').forEach(a => {
  addSmoothScroll(a)
})

// ********************Плавный скролл для кнопки

addSmoothScroll(document.querySelector(".more-button"))