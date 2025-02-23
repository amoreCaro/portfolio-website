export default function calculator() {
    // Ініціалізація значень для всіх input та слайдерів
    function initializeInputs() {
        $('.calculator__input-number').each(function () {
            var fieldId = $(this).attr('id'); // Отримуємо ID для input
            var value = $(this).val();
            // Оновлюємо значення input з текстом
            updateInputValue(fieldId, value); // Оновлюємо input з текстом
            $('#' + fieldId + '_range').val(value); // Синхронізуємо слайдер
        });
    }

    // Функція для вибору правильного закінчення слова "місяць"
    function getMonthSuffix(months) {
        // Використовуємо правила для вибору суфікса
        if (months === 24) {
            return 'місяці'; // Для 1 місяця
        } else {
            return 'місяців'; // Для 2-4 місяців
        }
    }

    // Оновлення значення input з додаванням одиниць вимірювання
    function updateInputValue(fieldId, value) {
        if (fieldId === "inputCreditSum") {
            $('#' + fieldId).val(value + ' грн.'); // Для inputCreditSum додаємо "грн."
        } else if (fieldId === "inputTerm") {
            var months = parseInt(value);
            var suffix = getMonthSuffix(months);  // Отримуємо правильне закінчення для місяців
            $('#' + fieldId).val(value + ' ' + suffix); // Оновлюємо значення input з правильним суфіксом
        } else {
            $('#' + fieldId).val(value); // Для інших input просто виводимо число
        }
    }

    // Обробка вводу в текстові поля
    function handleInput() {
        $('.calculator__input-number').on('input', function () {
            var fieldId = $(this).attr('id'); // Отримуємо ID для input
            var value = $(this).val().replace(' грн.', '').replace(' місяців', ''); // Отримуємо значення без "грн." і "місяців"

            // Оновлюємо значення слайдера
            $('#' + fieldId + '_range').val(value);

            // Оновлюємо значення input в залежності від поля
            updateInputValue(fieldId, value);
            updateActiveButtonState(); // Перевірка стану кнопок при зміні input
        });
    }

    // Обробка вводу зі слайдера
    function handleSlider() {
        $('.calculator__slider').on('input', function () {
            var fieldId = $(this).attr('id').replace('_range', ''); // Отримуємо ID для відповідного input
            var value = $(this).val();

            // Оновлюємо значення input в залежності від поля
            updateInputValue(fieldId, value);

            // Синхронізуємо значення слайдера
            $('#' + fieldId + '_range').val(value);
            updateActiveButtonState(); // Перевірка стану кнопок при зміні слайдера
        });
    }

    // Функція для оновлення стану кнопок
    function updateActiveButtonState() {
        var sliderValue = $("#inputTerm_range").val(); // Отримуємо значення слайдера
        var buttons = $(".btn-calculator-tabs");
        var foundMatch = false; // Флаг для перевірки, чи є збіг

        // Проходимо по всіх кнопках
        buttons.each(function () {
            var buttonText = $(this).text().trim(); // Текст кнопки
            // Витягуємо лише число з тексту кнопки, щоб порівнювати з числовим значенням слайдера
            var buttonValue = buttonText.replace(/[^\d]/g, ''); // Видаляємо все, що не є цифрою

            // Якщо значення слайдера співпадає з числовим значенням на кнопці
            if (buttonValue === sliderValue) {
                $(this).addClass("active"); // Додаємо клас active
                foundMatch = true; // Є збіг
            } else {
                $(this).removeClass("active"); // Видаляємо клас active
            }
        });

        // Якщо немає збігів, забираємо клас active у всіх кнопок
        if (!foundMatch) {
            buttons.removeClass("active");
        }
    }

    // Налаштовуємо активний таб за замовчуванням
    function setActiveTab() {
        $(".btn-calculator-tabs").first().addClass("active");
        $(".tabs__list").first().addClass("active");
    }

    // Обробка кліку на кнопки табів
    function handleTabClick() {
        $(".btn-calculator-tabs").on("click", function () {
            const buttonText = $(this).text().trim(); // Отримуємо текст кнопки
            const currentValue = $("#inputTerm").val(); // Поточне значення в input

            // Якщо значення на кнопці відрізняється від поточного значення в inputTerm
            if (buttonText !== currentValue) {
                // Якщо значення не співпадає, забираємо клас active з попереднього елемента
                $(".btn-calculator-tabs.active").removeClass("active");
                $(this).addClass("active").siblings().removeClass("active");
            }

            // Оновлюємо значення в input
            $("#inputTerm").val(buttonText);

            // Оновлюємо слайдер в залежності від значення тексту кнопки
            var value = parseInt(buttonText); // Конвертуємо текст кнопки в число (наприклад "6 місяців" -> 6)

            if (!isNaN(value)) {
                var slider = $("#inputTerm_range"); // Відповідний слайдер за id "inputTerm_range"
                var minValue = parseInt(slider.attr("min"));
                var maxValue = parseInt(slider.attr("max"));

                // Перевірка, чи значення в межах діапазону слайдера
                if (value >= minValue && value <= maxValue) {
                    slider.val(value); // Встановлюємо значення слайдера
                } else {
                    console.log("Значення виходить за межі діапазону слайдера");
                }
            }
        });
    }
    function calculateMounthPayment() {
        // Get the values from the inputs
        var creditSum = parseFloat(document.getElementById('inputCreditSum').value);
        var term = parseInt(document.getElementById('inputTerm').value);

        console.log("inputCreditSum: " + creditSum);
        console.log("term: " + term);
    }



    // Викликаємо функції
    initializeInputs();
    handleInput();
    handleSlider();
    setActiveTab();
    handleTabClick();
    calculateMounthPayment();
}