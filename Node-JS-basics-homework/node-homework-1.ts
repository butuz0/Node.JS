// 1. Напишіть функцію, яка приймає будь-який тип масиву та асинхронний колбек, який викликається для кожного елемента масиву послідовно.
// Результатом виклику має бути масив результатів колбеку. Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:
// const arr: Array<string> = ["one", "two", "three"];
// const results = await runSequent(arr, (item, index) =>
//     Promise.resolve({
//         item,
//         index,
//     })
// );
// IDE має розглядати змінні з прикладу так:
// item type = string
// index type = number
// results type = Array<{item: string, index: number}>

(async () => {
    async function runSequent<T>(
        arr: T[],
        callback: (item: T, index: number) => Promise<{ item: T; index: number }>
    ): Promise<Array<{ item: T; index: number }>> {
        const result: Array<{ item: T; index: number }> = [];
        for (let i = 0; i < arr.length; i++) {
            const element = await callback(arr[i], i);
            result.push(element);
        }
        return result;
    }

    const arr: Array<string> = ["one", "two", "three"];
    const results = await runSequent(arr, (item, index) =>
        Promise.resolve({
            item,
            index,
        })
    );

    console.log(results);
})();

// 2. Напишіть функцію, яка приймає будь-який тип масиву та правило для видалення елементів масиву. Функція змінює переданий масив, а усі видалені
// елементи функція повертає окремим масивом такого ж типу. Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:
// const arr = [1, 2, 3, 6, 7, 9];
// const deletedElements = arrayChangeDelete(arr, (item) => item % 2 === 0);
// IDE має розглядати змінні з прикладу так:
// item: number
// deletedElements: Array
// результат виклику:
// arr = [1, 3, 7, 9]
// deletedElements = [2, 6]

function arrayChangeDelete<T>(arr: T[], rule: (item: T) => boolean): T[] {
    const deletedElements = arr.filter(rule);
    arr.forEach((element, index) => {
        if (deletedElements.includes(element)) {
            arr.splice(index, 1);
        }
    });
    return deletedElements;
}

const array2 = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array2, (item) => item % 2 === 0);
console.log(array2);
console.log(deletedElements);

// 3. Напишіть скрипт, який отримує з командного рядка рядковий параметр - шлях до JSON-файла із масивом рядків - посилань, читає та аналізує його вміст.
// Скрипт має створити папку «<JSON_filename>_pages» і для кожного посилання із <JSON-файла отримати його HTML-вміст і зберегти цей вміст у окремому файлі
// в новоствореній папці. Приклад JSON-файла (list.json) прикріплений до цього практичного завдання нижче.

import * as fs from "fs";
import * as path from "path";
import axios from "axios";

const filePath: string = process.argv[2];
if (filePath !== undefined) {
    fs.mkdir(path.join(__dirname, `${filePath}_pages`), (err) => {
        if (err) throw err;
    });
    fs.readFile(path.join(__dirname, `${filePath}.json`), "utf8", (err, data) => {
        if (err) throw err;
        const links: string[] = JSON.parse(data);
        links.forEach((link) => {
            axios
                .get(link)
                .then((res) => {
                    fs.writeFile(
                        path.join(__dirname, `${filePath}_pages`, `${res.request.host}.txt`),
                        res.data,
                        (err) => {
                            if (err) throw err;
                        }
                    );
                })
                .catch((err) => {
                    console.error(err.toJSON());
                });
        });
    });
}

// 4. Напишіть скрипт, який отримує з командного рядка числовий параметр – частоту в секундах.
// Скрипт має виводити на кожному тику (визначеному частотою) наступну системну інформацію:
// Знайдіть і використайте функціональність підходящих модулів.
// - operating system;
// - architecture;
// - current user name;
// - cpu cores models;
// - cpu temperature;
// - graphic controllers vendors and models;
// - total memory, used memory, free memory в GB;
// - дані про батарею (charging, percent, remaining time).

import * as os from "os";
import * as si from "systeminformation";

function getSystemStatus(): void {
    console.log(`\nOperating system: ${os.platform()}`);
    console.log(`Architecture: ${os.arch()}`);
    console.log(`Current user name: ${os.userInfo().username}`);
    console.log(`CPU cores model: ${os.cpus()[0].model}`);

    si.cpuTemperature().then((data) => console.log(`CPU temperature: ${data.main}`));
    si.graphics().then((data) => {
        console.log("Graphic controllers vendors and models:");
        data.controllers.forEach((controller) => {
            console.log(`${controller.vendor}: ${controller.model}`);
        });
    });

    console.log(`Total memory: ${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`);
    console.log(`Used memory: ${((os.totalmem() - os.freemem()) / 1024 ** 3).toFixed(2)} GB`);
    console.log(`Free memory: ${(os.freemem() / 1024 ** 3).toFixed(2)} GB`);

    si.battery().then((data) => {
        console.log(`Battery is charging: ${data.isCharging}`);
        console.log(`Battery percent: ${data.percent}%`);
        console.log(`Battery time left: ${data.timeRemaining} minutes`);
    });
}

const frequency = process.argv[2];
if (frequency !== undefined) {
    setInterval(getSystemStatus, parseInt(frequency) * 1000);
}

// 5. Напишіть власну реалізацію класу EventEmitter (Publisher/Subscriber), який поводитиметься так:
// const emitter = new MyEventEmitter();
// emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
// emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено

type EventHandler = () => void;

class MyEventEmitter {
    private events: Record<string, EventHandler[]> = {};

    public registerHandler(eventName: string, handler: EventHandler): void {
        if (!(eventName in this.events)) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(handler);
    }

    public emitEvent(eventName: string): void {
        if (eventName in this.events) {
            const handlers = this.events[eventName];
            handlers.forEach((handler) => handler());
        }
    }
}

// Приклад використання
const emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", () => console.log("Обліковий запис користувача оновлено"));
emitter.emitEvent("userUpdated"); // Обліковий запис користувача оновлено
