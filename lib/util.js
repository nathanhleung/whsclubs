const request = require('request-promise');
const Promise = require('bluebird');
const CsvConverter = require('csvtojson').Converter;

const urlData = {
  science_club: {
    id: '1s9pbozhOKf0vJgYjEkTy4_U872TtxtmEehcS0dkaDtE',
    gid: '1826019628',
  },
  key_club: {
    id: '1Bw7UnViij9Fb9j6SIlPc0pvCSXdchDVZoFCSwhOCTOE',
    gid: '1',
  },
  soph_committee: {
    id: '1T8XhMK1izdgr2fI8PeYeUaH-Ta2d5iinwFXBjGzwbuw',
    gid: '0',
  },
};

function getUrl(urlData) {
  return `https://docs.google.com/spreadsheets/d/${urlData.id}/export?exportFormat=csv&gid=${urlData.gid}`;
}

exports.urls = Object.keys(urlData).reduce((prev, curr) => {
  prev[curr] = getUrl(urlData[curr]);
  return prev;
}, {});

exports.getJson = (url) => {
  return request(url).then((body) => {
    return new Promise((resolve, reject) => {
      // Need a new object for every request (https://github.com/Keyang/node-csvtojson/issues/24)
      (new CsvConverter()).fromString(body, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  });
}