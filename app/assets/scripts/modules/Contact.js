import $ from 'jquery';

class Contact {
  constructor() {
    this.icons = $('.contact__icon');

    this.events();
  }

  events() {
    this.icons.mouseenter(this.show.bind(this));
    this.icons.mouseleave(this.hide.bind(this));
  }

  show(e) {
    $(e.currentTarget)
      .parent()
      .find('.contact__label')
      .addClass('contact__label--is-focused');
  }

  hide(e) {
    $(e.currentTarget)
      .parent()
      .find('.contact__label')
      .removeClass('contact__label--is-focused');
  }
}

export default Contact;
