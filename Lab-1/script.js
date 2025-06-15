function triangle(value1, type1, value2, type2) {
	console.log("Використання: triangle(value1, type1, value2, type2);");
	console.log("Доступні типи: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'");

	const toRadians = (degrees) => degrees * (Math.PI / 180);
	const toDegrees = (radians) => radians * (180 / Math.PI);

	let a, b, c, alpha, beta;

	const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
	if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
		 console.log("Помилка: Неправильний тип аргументів.");
		 return "failed";
	}

	if (value1 <= 0 || value2 <= 0) {
		 console.log("Помилка: Значення повинні бути додатніми.");
		 return "failed";
	}

	const params = { [type1]: value1, [type2]: value2 };

	if (params.leg && params.hypotenuse) {
		 if (params.leg >= params.hypotenuse) {
			  console.log("Помилка: Катет не може бути більшим або рівним гіпотенузі.");
			  return "failed";
		 }
		 a = params.leg;
		 c = params.hypotenuse;
		 b = Math.sqrt(c ** 2 - a ** 2);
		 alpha = toDegrees(Math.asin(a / c));
		 beta = 90 - alpha;
	}
	else if (params.leg && params["adjacent angle"]) {
		 a = params.leg;
		 alpha = params["adjacent angle"];
		 c = a / Math.cos(toRadians(alpha));
		 b = Math.sqrt(c ** 2 - a ** 2);
		 beta = 90 - alpha;
	}
	else if (params.leg && params["opposite angle"]) {
		 a = params.leg;
		 alpha = params["opposite angle"];
		 b = a * Math.tan(toRadians(alpha));
		 c = Math.sqrt(a ** 2 + b ** 2);
		 beta = 90 - alpha;
	}
	else if (params.hypotenuse && params["angle"]) {
		 c = params.hypotenuse;
		 alpha = params["angle"];
		 a = c * Math.sin(toRadians(alpha));
		 b = Math.sqrt(c ** 2 - a ** 2);
		 beta = 90 - alpha;
	}
	else {
		 console.log("Помилка: Неправильна комбінація аргументів.");
		 return "failed";
	}

	console.log(`a = ${a.toFixed(2)}`);
	console.log(`b = ${b.toFixed(2)}`);
	console.log(`c = ${c.toFixed(2)}`);
	console.log(`alpha = ${alpha.toFixed(2)}°`);
	console.log(`beta = ${beta.toFixed(2)}°`);

	return "success";
}

// Example
triangle(4, "leg", 8, "hypotenuse");
triangle(8, "hypotenuse", 4, "leg");
triangle(5, "leg", 45, "adjacent angle");
