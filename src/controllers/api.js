import getClubData from '../util/getClubData';

export async function clubData(req, res) {
  const data = await getClubData();
  res.json(data);
};