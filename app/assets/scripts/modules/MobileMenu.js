import $ from 'jquery';
import Menu from './Menu';

class MobileMenu extends Menu {
  constructor() {
    super();

    this.window = $(window);
    this.menuIconContainer = $('.site-header__menu-icon-container');
    this.menuIcon = $('.site-header__menu-icon');
    this.menuContent = $('.site-header__menu-content');

    this.lastScrollTop = this.window.scrollTop();

    this.events();
  }

  events() {
    this.menuIcon.click(this.toggleMenuContent.bind(this));
    this.window.scroll(this.toggleMenuIcon.bind(this));
  }

  toggleMenuIcon(e) {
    let currentScrollTop = this.window.scrollTop();

    if (!this.isMenuOpen()) {
      if (currentScrollTop > this.lastScrollTop) {
        this.menuIconContainer.addClass('site-header__menu-icon-container--hide');
      } else {
        this.menuIconContainer.removeClass('site-header__menu-icon-container--hide');
      }
    }

    this.lastScrollTop = currentScrollTop;
  }

  toggleMenuContent() {
    this.menuContent.toggleClass('site-header__menu-content--is-visible');
    this.menuIconContainer.toggleClass('site-header__menu-icon-container--no-bg');
    this.menuIcon.toggleClass('site-header__menu-icon--close-x');
  }

  isMenuOpen() {
    return this.menuContent.hasClass('site-header__menu-content--is-visible');
  }
}

export default MobileMenu;
