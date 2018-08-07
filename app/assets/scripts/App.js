import Parallax from './bases/Parallax';
import Timeline from './modules/Timeline';
import Contact from './modules/Contact';
import StickyHeader from './modules/StickyHeader';
import Menu from './modules/Menu';

let parallaxEls = [
  {
    selector: '.parallax__layer--1',
    speed: 0
  },
  {
    selector: '.parallax__layer--2',
    speed: 10
  },
  {
    selector: '.parallax__layer--3',
    speed: 25
  }
];

const parallax = new Parallax(parallaxEls);
const timeline = new Timeline();
const contact = new Contact();
const stickyHeader = new StickyHeader();
const menu = new Menu();