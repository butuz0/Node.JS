// Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
// console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
function add(a) {
    return function (b) {
        if (!b) {
            return a;
        }
        return add(a + b);
    };
}

console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

// Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
function areAnargams(string1, string2) {
    const first = string1.replace(/ /g, "").toLowerCase().split("").sort().join("");
    const second = string2.replace(/ /g, "").toLowerCase().split("").sort().join("");
    return first === second;
}

console.log(areAnargams("Silent", "Listen")); //true

// Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.

const deepClone = (obj) => {
    if (typeof obj !== "object" || obj === null) {
        return obj; // return primitive values
    }

    let clone;
    if (Array.isArray(obj)) {
        clone = []; // if array - recursively clone every element
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deepClone(obj[i]);
        }
    } else {
        clone = {}; // recursively clone every property
        for (let key in obj) {
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
};

const user = {
    name: "Yaroslav",
    age: 18,
    body: {
        weightKg: 72,
        heightCm: 183,
    },
    hobbies: ["basketball", "cycling"],
};

const clonedUser = deepClone(user);
console.log(clonedUser); // identical
console.log(user === clonedUser); // false

// Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів. Приклад (псевдокод):
// const calc = (a, b, c) => a+b+c;
// const wrapper = (args) => {
//         // код вашої функції
// };
// const cachedCalc = wrapper(add);
// cachedCalc(2,2,3); // 7 calculated
// cachedCalc(5,8,1); // 14 calculated
// cachedCalc(2,2,3); // 7 from cache

const calc = (a, b, c) => a + b + c;

const wrapper = (func) => {
    const cache = new Map();
    return (...args) => {
        const key = args.toString();
        if (!cache.has(key)) {
            console.log(`${key}: calculated`);
            const result = func(...args);
            cache.set(key, result);
            return result;
        }
        console.log(`${key}: from cache`);
        return cache.get(key);
    };
};

const cachedCalc = wrapper(calc);

console.log(cachedCalc(2, 2, 3)); // 7 calculated
console.log(cachedCalc(5, 8, 1)); // 14 calculated
console.log(cachedCalc(2, 2, 3)); // 7 from cache
