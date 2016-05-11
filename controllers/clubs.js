const util = require('../lib/util');

function getGrade(gradYear) {
  if (gradYear === '') {
    return 'N/A'
  }
  
  const d = new Date();
  const currYear = d.getFullYear();
  const currMonth = d.getMonth();
  
  // If it's between July and December, we're in the next school year
  if (currMonth => 7 && currMonth <= 12) {
    currYear++;
  }
  
  const yearsLeft = gradYear - currYear;
  return 12 - yearsLeft;
}

exports.key_club = (req, res) => {
  util.getJson(util.urls.key_club).then((result) => {
    const mapped = result.map((el) => {
      return {
        // The first replace call removes the parenthesized officer positions
        // The second replace call reorders the name to First Last (from Last, First)
        // I'm not doing (\w+) because it messes up names like Tommy O'Farrell's
        name: el.Name.replace(/ \(.*\)/, '').replace(/(.+), (.+)/, '$2 $1'),
        grade: getGrade(el['Graduation Year']),
        credit: el.Total
      };
    });
    res.json({
      info: {
        name: 'Key Club',
        id: 'key_club',
        required: 40,
        creditsWord: 'hours',
        creditSheet: 'https://docs.google.com/spreadsheets/d/1Bw7UnViij9Fb9j6SIlPc0pvCSXdchDVZoFCSwhOCTOE/edit'
      },
      members: mapped,
    });
  }).catch((err) => {
    res.send(err);
  });
};

exports.fbla = (req, res) => {
  util.getJson(util.urls.fbla).then((result) => {
    // In the Science Club credit sheet some rows are blank
    const mapped = result.filter((el) => {
      if (el['Total'] === '') {
        return false;
      }
      return true;
    }).map((el) => {
      return {
        name: `${el['First Name']} ${el['Last Name']}`,
        grade: 0, // sheet does not have grade information
        credit: el['Total'],
      };
    });
    res.json({
      info: {
        name: 'FBLA',
        id: 'fbla',
        required: 4,
        creditsWord: 'credits',
        creditSheet: 'https://docs.google.com/spreadsheets/d/1pLR9Td41Shtzy7UlNU3WGAbVfmwKImm64tEEXO9yc6g/edit#gid=0'
      },
      members: mapped,
    });
  }).catch((err) => {
    res.send(err);
  });
};

exports.science_club = (req, res) => {
  util.getJson(util.urls.science_club).then((result) => {
    // In the Science Club credit sheet some rows are blank
    const mapped = result.filter((el) => {
      if (el['First Name'] === '') {
        return false;
      }
      return true;
    }).map((el) => {
      return {
        name: `${el['First Name']} ${el['Last Name']}`,
        grade: el.Grade,
        credit: el.Credits,
      };
    });
    res.json({
      info: {
        name: 'Science Club',
        id: 'science_club',
        required: 4,
        creditsWord: 'meetings',
        creditSheet: 'https://docs.google.com/spreadsheets/d/1s9pbozhOKf0vJgYjEkTy4_U872TtxtmEehcS0dkaDtE/edit?usp=sharing'
      },
      members: mapped,
    });
  }).catch((err) => {
    res.send(err);
  });
};

exports.soph_committee = (req, res) => {
  util.getJson(util.urls.soph_committee).then((result) => {
    const mapped = result.map((el) => {
      const eventCredits = 4 - parseInt(el['Events credits needed'], 10);
      const normalCredits = el['Total Points'] - eventCredits;
      return {
        name: el.Name,
        grade: 10,
        credit: el['Total Points'],
        specialCredit: `${normalCredits} regular, ${eventCredits} event`,
      };
    });
    res.json({
      info: {
        name: 'Sophomore Class Committee',
        id: 'soph_committee',
        required: 10,
        creditsWord: 'credits',
        creditSheet: 'https://docs.google.com/spreadsheets/d/1T8XhMK1izdgr2fI8PeYeUaH-Ta2d5iinwFXBjGzwbuw/edit#gid=0',
      },
      members: mapped,
    });
  }).catch((err) => {
    res.send(err);
  });
};

exports.wiss_pals = (req, res) => {
  util.getJson(util.urls.wiss_pals).then((result) => {
    const mapped = result.map((el) => {
      const credits = el['# of Credits'];
      return {
        name: el['field1'],
        grade: 0, // Grade is not in the credit sheet
        credit: credits
      };
    });
    res.json({
      info: {
        name: 'Wiss Pals',
        id: 'wiss_pals',
        required: 5,
        creditsWord: 'credits',
        creditSheet: 'https://docs.google.com/spreadsheets/d/1Rvsi5EONbHiJFc_aihlno1Ccl9m2HmARJGC9z3VU06Y/edit#gid=0',
      },
      members: mapped,
    });
  }).catch((err) => {
    res.send(err);
  });
};