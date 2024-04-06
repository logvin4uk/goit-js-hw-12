import axios from 'axios';

export async function getImage(query, page) {
  const base_url = `https://pixabay.com/api/`;
  const parameters = new URLSearchParams({
    key: '43225287-97b9a21e329f588fe71ea406f',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 15,
  });

  const responce = await axios
    .get(`${base_url}?${parameters}`)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  return responce;
}
