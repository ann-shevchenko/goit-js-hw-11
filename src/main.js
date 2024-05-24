import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formElem = document.querySelector('.form');
const btnSearch = document.querySelector('.btn-search');
const imageList = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');

function showErrorToast(message) {
  iziToast.show({
    message,
    image: '../img/bi_x-octagon.svg',
    messageColor: '#FFF',
    position: 'topRight',
    backgroundColor: '#EF4040',
    maxWidth: '472px',
    imageWidth: 24,
  });
}

function resetImageList(markup) {
  imageList.innerHTML = markup;
}

function toggle(element, visible) {
  if (visible) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

const lightbox = new SimpleLightbox('.gallery-list a', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});

formElem.addEventListener('submit', event => {
  event.preventDefault();
  const query = event.target.elements.query.value.trim();

  resetImageList('');
  toggle(loader, true);
  searchImg(query)
    .then(data => {
      if (data.hits.length) {
        const markup = imagesTemplate(data.hits);
        resetImageList(markup);
        lightbox.refresh();
      } else {
        showErrorToast(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
    })
    .catch(() => {
      showErrorToast('Sorry, something went wrong. Try one more time.');
    })
    .finally(() => {
      toggle(loader, false);
    });
});

function searchImg(query) {
  const BASE_URL = 'https://pixabay.com/api/';
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

function imageTemplate(image) {
  return `<li>
    <a class="gallery-link" href="${image.largeImageURL}">
    <img 
        class="gallery-img" 
        src="${image.webformatURL}" 
        data-source="${image.largeImageURL}"
        alt="${image.tags}"></a>
    <div class="information">
     <div>
        <h3>Likes</h3>
        <p>${image.likes}</p>
     </div>
      <div>
          <h3>Views</h3>
          <p>${image.views}</p>
      </div>   
      <div>
        <h3>Comments</h3>
        <p>${image.comments}</p>
      </div>   
      <div>
        <h3>Downloads</h3>
        <p>${image.downloads}</p>
      </div>
    </div>
  </li>`;
}

function imagesTemplate(arr) {
  return arr.map(imageTemplate).join('');
}
