'use strict';

$(document).ready(function () {
  var now = moment();
  var FIRST_DAY = moment([2015, 7, 31]);
  var LAST_DAY = moment([2016, 5, 1]); // last day for clubs

  var total = LAST_DAY.diff(FIRST_DAY);
  var elapsed = now.diff(FIRST_DAY);
  var percent = elapsed / total;

  var roundedPercent = Math.round(percent * 100 * 4) / 4;
  $('#percent').html(roundedPercent);

  // Key Club
  var parHours = percent * 40;
  var roundedHours = Math.round(parHours * 4) / 4;
  var hoursNoun = pluralize('hour', roundedHours);
  $('#hours').html(roundedHours + " " + hoursNoun);

  // Science Club
  var meetings = Math.floor(percent * 4);
  var meetingsNoun = pluralize('meeting', meetings);
  $('#meetings').html(meetings + " " + meetingsNoun);

  // TTimes
  var articles = Math.floor(percent * 5);
  var articlesNoun = pluralize('article', articles);
  $('#articles').html(articles + " " + articlesNoun);
});