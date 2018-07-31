import $ from 'jquery';
import mediaQuery from '../bases/MediaQuery';

class Timeline {
  constructor() {
    this.window = $(window);
    this.previousBtn = $('.timeline__previous-btn');
    this.nextBtn = $('.timeline__next-btn');
    this.eventList = $('.timeline__event-list');
    this.eventListItem = $('.timeline__event-list-item');
    this.detailList = $('.timeline__event-detail-list');
    this.detailListItem = $('.timeline__event-detail-list-item');
    this.eventItems = this.eventListItem.find('.timeline__event');

    this.itemsToBeShown;

    this.eventWidth;
    this.eventHeight;
    this.eventInitLeft;
    this.eventInitTop;

    this.detailWidth;
    this.detailHeight;
    this.detailInitLeft;
    this.detailInitTop;

    this.events();
  }

  events() {
    this.init();
    this.window.resize(this.init.bind(this));
    this.nextBtn.click(this.next.bind(this));
    this.previousBtn.click(this.prev.bind(this));
    this.eventItems.click(this.moveTo.bind(this));
  }

  init() {
    this.calculateStyles();

    let index = this.eventList.find('.timeline__event-list-item--active').attr('data-index');

    if (mediaQuery.isForLaptopSize()) {
      this.setLeftProperty(index);
      this.setTopProperty(index, true);
    } else {
      this.setLeftProperty(index, true);
      this.setTopProperty(index);
    }
  }

  calculateStyles() {
    /* 
    for tablet or smaller screen, each event has 33.33% height and start with top 0
    */
    this.eventHeight = this.eventList.height() / (100 / 33.33);
    this.eventInitTop = this.eventHeight;

    /* 
    for tablet or smaller screen, each event detail has 100% height and start with top 0
    */
    this.detailHeight = this.detailList.height();
    this.detailInitTop = 0;

    /* 
    for large laptop screen, each event has 20% width and start with left 40%

    otherwise, each event has 33.33% width and start with left 33.33%
    */
    if (mediaQuery.isForLaptopLargeSize()) {
      this.eventWidth = this.eventList.width() / (100 / 20);
      this.eventInitLeft = this.eventWidth * (40 / 20);
    } else {
      this.eventWidth = this.eventList.width() / (100 / 33.33);
      this.eventInitLeft = this.eventWidth;
    }

    /* 
    for large laptop screen, each event detail has 70% width
    and starts with left 15%

    otherwise, each event detail has 90% width
    and starts with left 5%
    */
    if (mediaQuery.isForLaptopLargeSize()) {
      this.detailWidth = this.detailList.width() / (100 / 70);
      this.detailInitLeft = this.detailWidth * (15 / 70);
    } else {
      this.detailWidth = this.detailList.width() / (100 / 90);
      this.detailInitLeft = this.detailWidth * (5 / 90);
    }
  }

  setLeftProperty(index, isDefault = false) {
    if (isDefault) {
      this.eventListItem.css('left', 'unset');
      this.detailListItem.css('left', 'unset');
    } else {
      this.eventListItem.css('left', this.eventInitLeft - this.eventWidth * index);
      this.detailListItem.css('left', this.detailInitLeft - this.detailWidth * index);
    }
  }

  setTopProperty(index, isDefault = false) {
    if (isDefault) {
      this.eventListItem.css('top', 'unset');
      this.detailListItem.css('top', 'unset');
    } else {
      this.eventListItem.css('top', this.eventInitTop - this.eventHeight * index);
      this.detailListItem.css('top', this.detailInitTop - this.detailHeight * index);
    }
  }

  next() {
    let currentEvent = this.eventList.find('.timeline__event-list-item--active');
    let currentIndex = Number.parseInt(currentEvent.attr('data-index'));

    let currentDetail = this.detailList.find('.timeline__event-detail-list-item--active');

    if (currentIndex < this.eventListItem.length - 1) {
      currentEvent.removeClass('timeline__event-list-item--active');
      currentEvent.next().addClass('timeline__event-list-item--active');

      currentDetail.next().addClass('timeline__event-detail-list-item--active');
      currentDetail.removeClass('timeline__event-detail-list-item--active');

      if (mediaQuery.isForLaptopSize()) {
        this.setLeftProperty(currentIndex + 1);
      } else {
        this.setTopProperty(currentIndex + 1);
      }
    }
  }

  prev() {
    let currentEvent = this.eventList.find('.timeline__event-list-item--active');
    let currentIndex = Number.parseInt(currentEvent.attr('data-index'));

    let currentDetail = this.detailList.find('.timeline__event-detail-list-item--active');

    if (currentIndex > 0) {
      currentEvent.removeClass('timeline__event-list-item--active');
      currentEvent.prev().addClass('timeline__event-list-item--active');

      currentDetail.prev().addClass('timeline__event-detail-list-item--active');
      currentDetail.removeClass('timeline__event-detail-list-item--active');

      if (mediaQuery.isForLaptopSize()) {
        this.setLeftProperty(currentIndex - 1);
      } else {
        this.setTopProperty(currentIndex - 1);
      }
    }
  }

  moveTo(e) {
    let currentEvent = this.eventList.find('.timeline__event-list-item--active');
    let currentIndex = Number.parseInt(currentEvent.attr('data-index'));

    let selectedEvent = $(e.currentTarget).parent();
    let selectedIndex = Number.parseInt(selectedEvent.attr('data-index'));

    let selectedDetail = $(this.detailListItem[selectedIndex]);
    let currentDetail = this.detailList.find('.timeline__event-detail-list-item--active');

    if (currentIndex !== selectedIndex) {
      currentEvent.removeClass('timeline__event-list-item--active');
      selectedEvent.addClass('timeline__event-list-item--active');

      selectedDetail.addClass('timeline__event-detail-list-item--active');
      currentDetail.removeClass('timeline__event-detail-list-item--active');

      if (mediaQuery.isForLaptopSize()) {
        this.setLeftProperty(selectedIndex);
      } else {
        this.setTopProperty(selectedIndex);
      }
    }
  }
}

export default Timeline;
