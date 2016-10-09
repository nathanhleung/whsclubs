const clubs = [
  {
    id: 'fbla',
    name: 'FBLA',
    required: 5,
    creditsWord: 'credits',
    docid: '1pLR9Td41Shtzy7UlNU3WGAbVfmwKImm64tEEXO9yc6g',
    gid: '0',
    fields: {
      name: (row) => {
        return `${row['First Name']} ${row['Last Name']}`;
      },
      credit: (row) => {
        return row['Total'];
      },
    },
  },
  {
    id: 'science_club',
    name: 'Science Club',
    required: 5,
    creditsWord: 'credits',
    docid: '1G2uItQZooCBY1SAe39gdmCSDKl_t3CLl4RkmW8HU0qY',
    gid: '1826019628',
    fields: {
      name: (row) => {
        return `${row['First Name']} ${row['Last Name']}`;
      },
      credit: (row) => {
        return row['Credits'];
      },
    },
  },
  {
    id: 'ttimes',
    name: 'Trojan Times',
    required: 5,
    creditsWord: 'credits',
    docid: '1opxolZelx8CpSNm8ccEMAKZOC_YGtowcS841R6pHjb8',
    gid: '0',
    fields: {
      name: (row) => {
        return `${row['First Name']} ${row['Last Name']}`;
      },
      credit: (row) => {
        return (
          `${row['Article Total']} articles, ${row['Meeting Total']} meetings`
        );
      },
    },
  },
  {
    id: 'key_club',
    name: 'Key Club',
    required: 40,
    creditsWord: 'hours',
    docid: '19049AsWzJQ3LKMFzvrb_RFpKhtHqC6sjoGrbPdsJb_Y',
    gid: '0',
    fields: {
      name: (row) => {
        // The first replace call removes the parenthesized officer positions
        // The second replace call reorders the name to First Last (from Last, First)
        return row['Name']
          .replace(/ \(.*\)/, '')
          .replace(/(.+), (.+)/, '$2 $1');
      },
      credit: (row) => {
        return row['Total'];
      },
    },
  },
];

export default clubs;