// Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
// console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
type Add = {
    (): number;
    (num: number): Add;
};

function addTS(a: number): Add {
    return function (b?: number) {
        if (!b) {
            return a;
        }
        return addTS(a + b);
    } as Add;
}
console.log(addTS(2)(5)(7)(1)(6)(5)(11)()); // 37

// Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
function areAnargamsTS(string1: string, string2: string): boolean {
    const first = string1.replace(/ /g, "").toLowerCase().split("").sort().join("");
    const second = string2.replace(/ /g, "").toLowerCase().split("").sort().join("");
    return first === second;
}

console.log(areAnargamsTS("Silent", "Listen")); //true

// Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.

function deepCloneTS(obj: object): object {
    return JSON.parse(JSON.stringify(obj));
}

const person = {
    name: "Yaroslav",
    age: 19,
    body: {
        weightKg: 72,
        heightCm: 183,
    },
    hobbies: ["basketball", "cycling"],
};

const clonedPerson = deepCloneTS(person);
console.log(clonedPerson); // identical
console.log(person === clonedPerson); // false

// Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів. Приклад (псевдокод):
// const calc = (a, b, c) => a+b+c;
// const wrapper = (args) => {
//         // код вашої функції
// };
// const cachedCalc = wrapper(add);
// cachedCalc(2,2,3); // 7 calculated
// cachedCalc(5,8,1); // 14 calculated
// cachedCalc(2,2,3); // 7 from cache

const calcTS = (a: number, b: number, c: number) => a + b + c;

const wrapperTS: Function = (func: Function) => {
    const cache = new Map();
    return (...args: any[]) => {
        const key: string = args.toString();
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

const cachedCalcTS = wrapperTS(calcTS);
console.log(cachedCalcTS(2, 2, 3)); // 7 calculated
console.log(cachedCalcTS(5, 8, 1)); // 14 calculated
console.log(cachedCalcTS(2, 2, 3)); // 7 from cache
