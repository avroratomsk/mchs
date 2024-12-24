import * as functions from "./modules/functions.js";

functions.isWebp();

// import Swiper bundle with all modules installed
import {EffectFade, Navigation, Pagination, Autoplay} from 'swiper/modules';
import Swiper from 'swiper';

const swiper = new Swiper('.views-type__slider', {
  modules: [Navigation, Pagination, EffectFade, Autoplay],
  loop: true,
  spaceBetween: 40,
  grabCursor: true,
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    310: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 1.5,
    },
    992: {
      slidesPerView: 2.5,
    },
    1240: {
      slidesPerView: 3.5,
    },
    1650: {
      slidesPerView: 4.5,
    },
  },
});
