/* global Vue $ */

const ClubTable = Vue.extend({
  template: '#club-table',
  props: ['club-data', 'name'],
});

Vue.component('club-table', ClubTable);

Vue.filter('percent', (data) => {
  return data * 100;
});

Vue.filter('hundredths', (data) => {
  return Math.round(data * 100) / 100;
});

Vue.filter('millionths', (data) => {
  return Math.round(data * 1e6) / 1e6;
});

const app = new Vue({
  el: '#app',
  data: {
    key_club: [],
    science_club: [],
    soph_committee: [],
    progress_: 0,
  },
  methods: {
    updateProgress() {
      // Remember! JS months are 0-indexed
      // First day of school
      const start = (new Date(2015, 7, 31)).getTime();
      const now = Date.now();
      // Most clubs end around June 1
      const end = (new Date(2016, 5, 1)).getTime();
      this.progress_ = (now - start) / (end - start);
    }
  },
  ready() {
    this.updateProgress();
    setInterval(this.updateProgress, 1000);
    for (let i = 0; i < Object.keys(this.$data).length; i++) {
      const key = Object.keys(this.$data)[i];
      if (key[key.length - 1] !== '_') {
        $.getJSON(`/${key}`, (data) => {
          this[key] = data;
        });
      }
    }
  }
});