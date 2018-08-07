import $ from 'jquery';

class Parallax {
  constructor(parallaxEls) {
    this.window = $(window);
    this.parallax = $('.parallax');
    this.elements = parallaxEls;

    this.event();
  }

  event() {
    this.init();
    this.window.resize(this.resetPosition.bind(this));
    this.parallax.mousemove(this.moveObjs.bind(this));
  }

  init() {
    for (const element of this.elements) {
      element.offset = $(element.selector).offset();
    }
  }

  resetPosition() {
    for (const element of this.elements) {
      $(element.selector).css({ left: element.offset.left, top: element.offset.top });
    }
  }

  moveObjs(e) {
    let mouseX = e.clientX - this.parallax.offset().left;
    let mouseY = e.clientY - this.parallax.offset().top;

    for (const element of this.elements) {
      this.move(element, mouseX, mouseY);
    }
  }

  move(obj, mouseX, mouseY) {
    let element = $(obj.selector);
    let left = obj.offset.left;
    let top = obj.offset.top;
    let speed = obj.speed;

    let parent = element.parent();

    let newLeft = left - ((mouseX - (element.width() / 2 + left)) / parent.width()) * speed + 'px';
    let newTop = top - ((mouseY - (element.height() / 2 + top)) / parent.height()) * speed + 'px';

    element.css({ left: newLeft, top: newTop });
  }
}

export default Parallax;
