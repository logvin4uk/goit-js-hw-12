import { getImage } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import { gallery } from './js/render-functions';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// code

// querySelectors
const loader = document.querySelector('.loader');
const addButton = document.querySelector('.addButton');
const form = document.querySelector('form');
// eventListeners
form.addEventListener('submit', submitImageFinder);

addButton.addEventListener('click', addImageGallery);
// other

let page;

async function submitImageFinder(event) {
  event.preventDefault();

  page = 1;
  gallery.innerHTML = '';
  addButton.classList.add('visible-hidden');
  const value = event.target.elements.formInput.value.trim();
  // Валидация значения пользователя в инпуте
  if (value === '') {
    iziToast.error({
      color: 'red',
      message: 'Please,type any text',
      position: 'topRight',
      title: 'Error',
    });

    gallery.innerHTML = '';
  } else {
    // запрос
    await getImage(value, page)
      // обработка ответа
      .then(collection => {
        // валидация не пустой ли массив изображений ответа
        if (collection.data.hits.length < 1) {
          iziToast.error({
            color: 'red',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            title: 'Oops',
          });
        } else {
          // создание галереи
          loader.classList.add('show');
          addButton.classList.remove('visible-hidden');
          loader.classList.remove('show');
          renderGallery(collection.data.hits);
        }
      })
      .catch(err => console.log(err));
  }
}

async function addImageGallery(event) {
  event.preventDefault();
  //
  const value = form.elements.formInput.value.trim();
  const newpage = (page += 1);
  //
  loader.classList.add('show');
  //

  loader.classList.remove('show');
  await getImage(value, newpage)
    .then(collection => {
      if (newpage * 15 > collection.data.totalHits) {
        addButton.classList.add('visible-hidden');
        iziToast.show({
          title: 'Sorry',
          message: "We're sorry, but you've reached the end of search results.",
          color: 'pink',
          position: 'topRight',
        });
      }
      renderGallery(collection.data.hits);
      const card = document.querySelector('.gallery-item');
      const cardHeight = card.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight.height * 2 + 48,
        behavior: 'smooth',
      });
    })
    .catch(err => console.log(err));
}
