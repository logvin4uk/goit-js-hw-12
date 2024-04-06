export const gallery = document.querySelector('.gallery');
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
export async function renderGallery(arr) {
  const markup = arr
    .map(photo => {
      return `
        <div class="gallery-item">
        <a href="${photo.largeImageURL}" class="photo-item">
        <img class='img' src="${photo.webformatURL}" 
        alt="${photo.tags}"/>
        </a>
        <ul class="text-list">
        <li class="list-item">Likes:<span class="image-text">${photo.likes}</span></li>
        <li class="list-item">Views:<span class="image-text">${photo.views}</span></li>
        <li class="list-item">Comments:<span class="image-text">${photo.comments}</span></li>
        <li class="list-item">Downloads:<span class="image-text">${photo.downloads}</span></li>
        </ul>
        </div>

      `;
    })
    .join(' ');

  gallery.insertAdjacentHTML('beforeend', markup);
  const lightbox = new simpleLightbox('.gallery a');
  lightbox.refresh();
}
