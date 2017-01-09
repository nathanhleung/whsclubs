import request from 'request-promise';
import csvtojson from 'csvtojson';
import clubs from './clubs';

const CsvConverter = csvtojson.Converter;

function getUrl(club) {
  return `https://docs.google.com/spreadsheets/d/${club.docid}/export?exportFormat=csv&gid=${club.gid}`;
}

// Helper function in case we need to
// throw out the first few lines (i.e. Science Club)
function omitLines(text, linesToOmit) {
  // If the linesToOmit property is undefined, just
  // return the text.
  if (typeof linesToOmit === 'undefined') {
    return text;
  }
  let cutoff = 0;
  // Continue searching for newlines after we find one
  for (let i = 0; i < linesToOmit; i++) {
    cutoff = text.indexOf('\n', cutoff + 1);
  }
  return text.substr(cutoff + 1);
}

function getJson(url, linesToOmit) {
  return request(url).then((body) => {
    // Create a new Promise for CsvConverter since it doesn't support Promises
    return new Promise((resolve, reject) => {
      // We need to create a new instance for every request
      // See https://github.com/Keyang/node-csvtojson/issues/24
      // For Science Club, the first line of the CSV is not the header
      // so it will have a linesToOmit property of 1.
      (new CsvConverter()).fromString(omitLines(body, linesToOmit), (err, result) => {
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
    return getJson(getUrl(club), club.linesToOmit);
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
      // if we try to trim a number we'll get an error!
      if (typeof member.credit === "string" && member.credit.trim() === '') {
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
