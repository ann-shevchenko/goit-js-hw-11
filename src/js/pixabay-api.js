const BASE_URL = 'https://pixabay.com/api/';


function searchImg(query) {
    const params = new URLSearchParams({
      key: '44022790-a27ad4929b92e52df6d2f0bb4',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    const url = `${BASE_URL}?${params}`;
  
    return fetch(url).then(res => res.json());
  }

export {
    searchImg
}