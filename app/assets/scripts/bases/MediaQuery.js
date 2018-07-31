class MediaQuery {
  constructor() {}

  static isForMobileLarge() {
    return window.matchMedia('(min-width: 346px)').matches;
  }

  static isForTabletSize() {
    return window.matchMedia('(min-width: 481px)').matches;
  }

  static isForLaptopSize() {
    return window.matchMedia('(min-width: 769px)').matches;
  }

  static isForLaptopLargeSize() {
    return window.matchMedia('(min-width: 1025px)').matches;
  }

  static isForUltraHDSize() {
    return window.matchMedia('(min-width: 1441px)').matches;
  }
}

export default MediaQuery;
