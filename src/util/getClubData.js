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
  // Wait until all URLs are fetched
  const allRosters = await Promise.all(clubs.map((club) => {
    // For each club, create a promise to get its roster data
    return getJson(getUrl(club));
  }));
  const processedRosters = allRosters.map((roster, index) => {
    // Promise.all preserves order
    const club = clubs[index];
    const processedRows = roster.map((row) => {
      const processedRow = {
        name: club.fields.name(row),
        credit: club.fields.credit(row),
      };
      return processedRow;
    });
    const filteredRows = processedRows.filter((member) => {
      if (member.name.trim() === '' || member.credit === 0) {
        return false;
      }
      return true;
    });
    return filteredRows;
  });
  // After all URLs are fetched, map each resolved data promise
  // to its corresponding club (Promise.all preserves the original order)
  const clubsWithRosters = clubs.map((club, index) => {
    // Create a new club object with the new roster data
    return Object.assign({}, club, {
      roster: processedRosters[index],
    });
  });
  return clubsWithRosters;
};

export default getClubData;