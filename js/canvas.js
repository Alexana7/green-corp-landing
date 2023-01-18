const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 100; //количество пузырьков


//функция-хелпер, возвращает случайное число от min до max
function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
  }
//класс хранит информацию о пузырьке
class Bubble {                               
    constructor(canvas) {                    
        //конструктор принимает элемент canvas, чтобы понимать размеры холста
        this.canvas = canvas;

        this.getCanvasSize();

        this.init();

    }
    // getCanvasSize() вытаскивает размеры из холста и сохраняет в переменные
    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;

    }
    // инициируем пузырек: выбираем цвет, размер, начальное положение на холсте
    init(){

        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]; //рандомный цвет
        this.size = generateDecimalBetween(1, 3); //случайный размер
        this.alpha =  generateDecimalBetween(5, 10) / 10; //альфа-канал
        this.translateX = generateDecimalBetween(0, this.canvasWidth); //начальная позиция
        this.translateY = generateDecimalBetween(0, this.canvasHeight);//начальная позиция
        this.velocity = generateDecimalBetween(20, 40); //значение скорости
        //дельта смещения по осям
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity; 
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;

    }
    move() {
        //обновляем координаты пузырька на значения смещения по осям
        this.translateX = this.translateX - this.movementX;
        this.translateY = this.translateY - this.movementY;
        // проверяем, если значения опустились ниже 0 или вышли за горизонтальные границы, заново инициализируем данные
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        }

    }
}

//класс работает непосредственно с холстом: добавляет пузырьки, рисует и анимирует их
class CanvasBackground {
    // получаем id тега холста
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;

    }
    // запускаем наимацию
    start() {
        //выставим ширину и высоту холста, настроим масштаб
        this.canvasSize();

        // сгенерируем пузырьки
        this.generateBubbles();

        //запускаем аниамцию
        this.animate()


    }
    canvasSize() {
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr)
    }
    generateBubbles() {
        this.bubblesList = [];
        for (let i = 0; i < BUBBLE_DENSITY; i++) {
            this.bubblesList.push(new Bubble(this.canvas))
        }

    }
    // реализуем анимацию
    animate() {
        //очищаем холст
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        
        this.bubblesList.forEach((bubble) => {
            bubble.move()
            this.ctx.translate(bubble.translateX, bubble.translateY);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
            this.ctx.fillStyle = "rgba(" + bubble.color + "," + bubble.alpha + ")";
            this.ctx.fill();
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        })

        requestAnimationFrame(this.animate.bind(this));

    }

}
const canvas = new CanvasBackground("orb-canvas");
canvas.start();

