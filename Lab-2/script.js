// Завдання 1.2.3
let car1 = new Object();
car1.color = "red";
car1.maxSpeed = 200;
car1.driver = {
  name: "Ім'я Прізвище",
  category: "C",
  personalLimitations: "No driving at night",
};
car1.tuning = true;
car1.numberOfAccidents = 0;

// Завдання 1.2.4
let car2 = {
  color: "blue",
  maxSpeed: 180,
  driver: {
    name: "Ім'я Прізвище",
    category: "B",
    personalLimitations: null,
  },
  tuning: false,
  numberOfAccidents: 2,
};

// Завдання 1.2.5
car1.drive = function () {
  console.log("I am not driving at night");
};
car1.drive();

// Завдання 1.2.6
car2.drive = function () {
  console.log("I can drive anytime");
};
car2.drive();

// Завдання 1.2.7 - 1.2.10
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;
  this.driver = null;
}

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience,
  };
};

Truck.prototype.trip = function () {
  if (!this.driver) {
    console.log("No driver assigned");
  } else {
    console.log(
      `Driver ${this.driver.name} ${
        this.driver.nightDriving ? "drives at night" : "does not drive at night"
      } and has ${this.driver.experience} years of experience.`
    );
  }
};

let truck1 = new Truck("black", 5000, 80.5, "Volvo", "FH16");
let truck2 = new Truck("white", 7000, 75.3, "Scania", "R450");
truck1.AssignDriver("Ім'я Прізвище", true, 5);
truck2.AssignDriver("Ім'я Прізвище", false, 3);

truck1.trip();
truck2.trip();

// Завдання 1.2.12 - 1.2.24 (класи ES6)
class Square {
  constructor(a) {
    this.a = a;
  }
  static help() {
    console.log("Square is a four-sided figure with equal sides.");
  }
  length() {
    console.log(this.a * 4);
  }
  square() {
    console.log(this.a * this.a);
  }
  info() {
    console.log(
      `Square: sides = ${this.a}, perimeter = ${this.a * 4}, area = ${
        this.a * this.a
      }`
    );
  }
}

class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }
  static help() {
    console.log("Rectangle is a quadrilateral with opposite sides equal.");
  }
  length() {
    console.log(2 * (this.a + this.b));
  }
  square() {
    console.log(this.a * this.b);
  }
  info() {
    console.log(
      `Rectangle: sides = ${this.a}, ${this.b}, perimeter = ${
        2 * (this.a + this.b)
      }, area = ${this.a * this.b}`
    );
  }
}

const square = new Square(5);
const rectangle = new Rectangle(4, 6);
Square.help();
Rectangle.help();
square.info();
rectangle.info();

// Завдання 1.2.25 - 1.2.26
function Triangular(a = 3, b = 4, c = 5) {
  return { a, b, c };
}

const tri1 = Triangular();
const tri2 = Triangular(6, 8, 10);
const tri3 = Triangular(5, 12, 13);
console.log(tri1, tri2, tri3);

// Завдання 1.2.27 - 1.2.28
function PiMultiplier(factor) {
  return function () {
    return Math.PI * factor;
  };
}
const piTimes2 = PiMultiplier(2);
const piTimes1_5 = PiMultiplier(1.5);
const piDiv2 = PiMultiplier(0.5);
console.log(piTimes2(), piTimes1_5(), piDiv2());

// Завдання 1.2.29 - 1.2.31
function Painter(color) {
  return function (obj) {
    console.log(
      obj.type ? `${color} ${obj.type}` : "No ‘type’ property occurred!"
    );
  };
}
const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

const obj1 = { maxSpeed: 280 };
const obj2 = { type: "Truck", maxSpeed: 180 };
const obj3 = { type: "Sportcar", avgSpeed: 90, color: "purple" };

PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);
