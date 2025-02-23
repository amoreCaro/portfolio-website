export default function accordion() {
    $(".support__item").on("click", function() {
      const tabsId = $(this).data("tabTarget");  // Отримуємо значення з data-tab-target
  
      // Додаємо клас 'active' на клікнутий елемент і забираємо з його братів
      $(this).addClass("active").siblings().removeClass("active");
  
      // Оновлюємо border-radius для клікнутого елемента
      $(this).css({
        "border-bottom-left-radius": $(this).hasClass("active") ? "0px" : "",
        "border-bottom-right-radius": $(this).hasClass("active") ? "0px" : ""
      }).siblings().css({
        "border-bottom-left-radius": "",
        "border-bottom-right-radius": ""
      });
  
      // Показуємо відповідний контент, додаючи клас 'active'
      $("#" + tabsId).addClass("active").siblings().removeClass("active");
    });
  
    $(".support__item-content").on("click", function(e) {
      // Запобігаємо кліку на підтримуючому елементі, щоб не було конфлікту
      e.stopPropagation();
  
      // Якщо елемент вже має клас "active", забираємо його
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        // Оновлюємо border-radius, якщо елемент більше не активний
        $(this).css({
          "border-bottom-left-radius": "",
          "border-bottom-right-radius": ""
        });
      } else {
        $(this).addClass("active");
        // Оновлюємо border-radius для клікнутого елемента
        $(this).css({
          "border-bottom-left-radius": "0px",
          "border-bottom-right-radius": "0px"
        });
      }
    });
  }
  