import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
  constructor() {
    this.window = $(window);
    this.siteHeader = $('.site-header');
    this.headerTriggerEl = $('.sticky-header-triggerer');

    this.menuIcon = $('.site-header__menu-icon');
    this.menuContent = $('.site-header__menu-content');

    this.lastScrollTop = this.window.scrollTop();

    this.events();
  }

  events() {
    this.init();
    this.menuIcon.click(this.toggleMenuContent.bind(this));
    this.window.scroll(this.toggleMenuBar.bind(this));
  }

  init() {
    this.createHeaderWaypoint();
  }

  createHeaderWaypoint() {
    new Waypoint({
      element: this.headerTriggerEl[0],
      handler: direction => {
        if (direction === 'down') {
          this.siteHeader.addClass('site-header--dark');
        } else {
          this.siteHeader.removeClass('site-header--dark');
        }
      }
    });
  }

  toggleMenuBar(e) {
    let currentScrollTop = this.window.scrollTop();

    if (!this.isMenuOpen()) {
      if (currentScrollTop > this.lastScrollTop) {
        this.siteHeader.addClass('site-header--hide');
      } else {
        this.siteHeader.removeClass('site-header--hide');
      }
    }

    this.lastScrollTop = currentScrollTop;
  }

  toggleMenuContent() {
    this.menuContent.toggleClass('site-header__menu-content--is-visible');
    this.siteHeader.toggleClass('site-header--no-bg');
    this.menuIcon.toggleClass('site-header__menu-icon--close-x');
  }

  isMenuOpen() {
    return this.menuContent.hasClass('site-header__menu-content--is-visible');
  }
}

export default StickyHeader;
