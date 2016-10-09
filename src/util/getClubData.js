import request from 'request-promise';
import csvtojson from 'csvtojson';
import clubs from './clubs';

const CsvConverter = csvtojson.Converter;

function getUrl(club) {
  return `https://docs.google.com/spreadsheets/d/${club.docid}/export?exportFormat=csv&gid=${club.gid}`;
}

function getJson(url) {
  return request(url).then((body) => {
    // Create a new Promise for CsvConverter since it doesn't support Promises
    return new Promise((resolve, reject) => {
      // We need to create a new instance for every request
      // See https://github.com/Keyang/node-csvtojson/issues/24
      (new CsvConverter()).fromString(body, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  });
}


async function getClubData() {
  // @todo
  // Wait until all URLs are fetched
  const allRosters = await Promise.all(clubs.map((club) => {
    // For each club, create a promise to get its roster data
    return getJson(getUrl(club));
  }));
  const processedRosters = allRosters.map((roster, index) => {
    // Promise.all preserves order
    const club = clubs[index];
    const processed = roster.map((row) => {
      return {
        name: club.fields.name(row),
        credit: club.fields.credit(row),
      };
    }).filter((member) => {
      if (member.name.trim() === '' || member.credit.trim() === '') {
        return false;
      }
      return true;
    });
    return processed;
  });
  // After all URLs are fetched, map each resolved data promise
  // to its corresponding club (Promise.all preserves the original order)
  return clubs.map((club, index) => {
    // Create a new club object with the new roster data
    return Object.assign({}, club, {
      roster: processedRosters[index],
    });
  });
};

export default getClubData;