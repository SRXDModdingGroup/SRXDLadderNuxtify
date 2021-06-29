import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

const placeholder = require('~/assets/defaultAlbumArt.jpg')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: placeholder,
  error: placeholder,
  attempt: 1
});
