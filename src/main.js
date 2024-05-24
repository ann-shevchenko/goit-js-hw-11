import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {searchImg} from './js/pixabay-api';
import {renderImageList} from './js/render-functions';


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
        const markup = renderImageList(data.hits);
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



