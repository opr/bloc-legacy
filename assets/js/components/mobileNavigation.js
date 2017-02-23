$(".header__navigation__mobile-link").click(function(){
    $(".header__navigation").toggleClass("--active");
    $(".header__navigation__mobile-menu-icon__bar").toggleClass("--open");
});

$(".header__navigation__menu__item__link").focus(function(){
    $(".header__navigation").addClass("--active");
    $(".header__navigation__mobile-menu-icon__bar").addClass("--open");
});

$(".header__navigation__menu__item__link").blur(function(){
    $(".header__navigation").removeClass("--active");
    $(".header__navigation__mobile-menu-icon__bar").removeClass("--open");
});