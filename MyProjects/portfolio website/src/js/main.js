function headerFixed() {
  const header = document.querySelector(".header");
  const links = document.querySelectorAll("a[href^='#']");

  if (window.scrollY > 20) {
    header.classList.add("header-fixed");
  } else {
    header.classList.remove("header-fixed");
  }

  document.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      header.classList.add("header-fixed");
    } else {
      header.classList.remove("header-fixed");
    }
  });

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const extraOffset = window.innerWidth <= 768 ? 60 : 100;

      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - extraOffset,
          behavior: "smooth"
        });
      }
    });
  });

}
function headerMobile() {
  const header = document.querySelector('.header-mobile .header__nav');

  header.addEventListener('click', function () {
    document.querySelector('.header__button-menu').classList.remove('active')
    document.querySelector('.header__button-menu .open').classList.add('active');
    document.querySelector('.header__button-menu .close').classList.remove('active');
    document.querySelector('.header__dropdown').classList.remove('active');
    document.querySelector('.header__actions').classList.remove('active');
    document.querySelector('.header__wrapper').classList.remove('active');
  });
}
function headerMenu() {
  const btnMenu = document.querySelector('.header__button-menu');

  if (!btnMenu) return;

  btnMenu.addEventListener('click', function () {
    const isActive = btnMenu.classList.contains('active');

    if (isActive) {
      document.querySelector('.header__button-menu .open').classList.add('active');
      document.querySelector('.header__button-menu .close').classList.remove('active');
      document.querySelector('.header__dropdown').classList.remove('active');
      document.querySelector('.header__actions').classList.remove('active');
      document.querySelector('.header__wrapper').classList.remove('active');
    } else {
      document.querySelector('.header__button-menu .open').classList.remove('active');
      document.querySelector('.header__button-menu .close').classList.add('active');
      document.querySelector('.header__dropdown').classList.add('active');
      document.querySelector('.header__actions').classList.add('active');
      document.querySelector('.header__wrapper').classList.add('active');
    }
    btnMenu.classList.toggle('active');
  });

}
function fadeInSections() {
  const sections = document.querySelectorAll('.animate-fade');

  function checkFadeIn() {
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < windowHeight - 50) {
        section.style.opacity = '1';
        section.style.transition = 'opacity 0.6s ease-out';
      }
    });
  }

  window.addEventListener('scroll', checkFadeIn);
  window.addEventListener('load', checkFadeIn); // Запускаємо при завантаженні сторінки
}
function accordion() {
  const accordion = document.querySelector('.accordion');
  if (!accordion) return

  document.querySelectorAll('.accordion__header').forEach(item => {
    item.addEventListener('click', function () {
      const parent = this.parentElement;
      const isActive = parent.classList.contains("active");

      document.querySelectorAll(".accordion__item").forEach(item => {
        item.classList.remove("active");
      });

      if (!isActive) {
        parent.classList.add("active");
      }
    });
  });
}
function faq() {
  const accordion = document.querySelector('.faq');
  if (!accordion) return

  document.querySelectorAll('.faq__head').forEach(item => {
    if (!item.classList.contains('faq__head--link')) {
      item.addEventListener('click', function () {
        const parent = this.parentElement;
        const isActive = parent.classList.contains("active");

        document.querySelectorAll(".faq__item").forEach(item => {
          item.classList.remove("active");
        });

        if (!isActive) {
          parent.classList.add("active");
        }
      });
    }
  });

}

document.addEventListener('DOMContentLoaded', function () {
  headerFixed();
  headerMobile();
  headerMenu();
  fadeInSections();
  accordion();
  faq();
});