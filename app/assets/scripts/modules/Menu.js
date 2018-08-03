import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class Menu {
  constructor() {
    this.window = $(window);
    this.pageSections = $('.page-section');
    this.headerLinks = $('.primary-nav__link');

    this.createPageSectionWaypoints();
    this.createHeroWaypoint();
    this.createLastSectionWaypoint();
    this.addSmoothScrolling();
    this.refreshWaypoints();
  }

  refreshWaypoints() {
    this.window.resize(() => {
      Waypoint.refreshAll();
    });
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createHeroWaypoint() {
    let firstPageSection = this.pageSections[0];

    new Waypoint({
      element: firstPageSection,
      handler: direction => {
        if (direction == 'up') {
          this.headerLinks.removeClass('is-current-link');
        }
      },
      offset: '100px'
    });
  }

  createPageSectionWaypoints() {
    this.pageSections.each((index, pageSection) => {
      new Waypoint({
        element: pageSection,
        handler: direction => {
          if (direction == 'down') {
            const matchingHeaderLink = pageSection.getAttribute('data-matching-link');
            this.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: '100px'
      });

      new Waypoint({
        element: pageSection,
        handler: direction => {
          if (direction == 'up') {
            const matchingHeaderLink = pageSection.getAttribute('data-matching-link');
            this.headerLinks.removeClass('is-current-link');
            $(matchingHeaderLink).addClass('is-current-link');
          }
        },
        offset: () => {
          // return 100 - pageSection.offsetHeight;
          return this.window.height() / 2 - pageSection.offsetHeight;
        }
      });
    });
  }

  // in case a screen isn't high enough to trigger the last section
  createLastSectionWaypoint() {
    let lastPageSection = this.pageSections[this.pageSections.length - 1];
    let lastPageLink = lastPageSection.getAttribute('data-matching-link');

    new Waypoint({
      element: lastPageSection,
      handler: direction => {
        if (direction == 'down') {
          this.headerLinks.removeClass('is-current-link');
          $(lastPageLink).addClass('is-current-link');
        }
      },
      offset: 'bottom-in-view'
    });
  }
}

export default Menu;
