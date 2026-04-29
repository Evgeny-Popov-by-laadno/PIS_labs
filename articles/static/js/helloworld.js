var groupmates = [
    {
        "name": "Александр",
        "surname": "Иванов",
        "group": "БВТ1702",
        "marks": [4, 3, 5]
    },
    {
        "name": "Иван",
        "surname": "Петров",
        "group": "БСТ1702",
        "marks": [4, 4, 4]
    },
    {
        "name": "Кирилл",
        "surname": "Смирнов",
        "group": "БАП1801",
        "marks": [5, 5, 5]
    }
];

// Функция rpad - добавление пробелов справа (аналог ljust из Python)
var rpad = function(str, length) {
    // js не поддерживает добавление нужного количества символов
    // справа от строки, т.е. аналога ljust из Python здесь нет
    str = str.toString(); // преобразование в строку
    while (str.length < length)
        str = str + ' '; // добавление пробела в конец строки
    return str; // когда все пробелы добавлены, возвратить строку
};

// Функция вывода списка студентов
var printStudents = function(students) {
    console.log(
        rpad("Имя", 15),
        rpad("Фамилия", 15),
        rpad("Группа", 8),
        rpad("Оценки", 20)
    );
    console.log(rpad("-", 15, '-'), rpad("-", 15, '-'), rpad("-", 8, '-'), rpad("-", 20, '-'));
    
    // был выведен заголовок таблицы
    for (var i = 0; i <= students.length - 1; i++) {
        // в цикле выводится каждый экземпляр студента
        console.log(
            rpad(students[i]['name'], 15),
            rpad(students[i]['surname'], 15),
            rpad(students[i]['group'], 8),
            rpad(students[i]['marks'], 20)
        );
    }
    console.log('\n'); // добавляется пустая строка в конце вывода
};

// Вывод списка всех студентов
console.log("=== ВСЕ СТУДЕНТЫ ===");
printStudents(groupmates);


// Функция фильтрации студентов по группе
var filterByGroup = function(students, groupName) {
    var filtered = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i]['group'] === groupName) {
            filtered.push(students[i]);
        }
    }
    return filtered;
};

// Функция фильтрации студентов по средней оценке
var filterByAverage = function(students, minAverage) {
    var filtered = [];
    for (var i = 0; i < students.length; i++) {
        var marks = students[i]['marks'];
        var sum = 0;
        for (var j = 0; j < marks.length; j++) {
            sum += marks[j];
        }
        var avg = sum / marks.length;
        if (avg > minAverage) {
            filtered.push(students[i]);
        }
    }
    return filtered;
};

// Функция для вычисления среднего балла студента
var getAverage = function(student) {
    var marks = student['marks'];
    var sum = 0;
    for (var i = 0; i < marks.length; i++) {
        sum += marks[i];
    }
    return sum / marks.length;
};

// Демонстрация работы фильтров
console.log("\n=== ДЕМОНСТРАЦИЯ ФИЛЬТРАЦИИ ===");

// Фильтрация по группе
var groupToFilter = prompt("Введите группу для фильтрации (например, БВТ1702):");
if (groupToFilter) {
    var filteredByGroup = filterByGroup(groupmates, groupToFilter);
    console.log("\n=== СТУДЕНТЫ ГРУППЫ " + groupToFilter + " ===");
    printStudents(filteredByGroup);
}

// Фильтрация по средней оценке
var minAvg = parseFloat(prompt("Введите минимальный средний балл для фильтрации:"));
if (!isNaN(minAvg)) {
    var filteredByAvg = filterByAverage(groupmates, minAvg);
    console.log("\n=== СТУДЕНТЫ СО СРЕДНИМ БАЛЛОМ ВЫШЕ " + minAvg + " ===");
    printStudents(filteredByAvg);
}