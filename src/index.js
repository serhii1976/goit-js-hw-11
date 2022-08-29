import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';
// import renderCards from './renderCards';

const API_KEY = '29473371-b315f9acd1ced765f914602d8';
const MAIN_URL = 'https://pixabay.com/api/';

const DEFAULT_CURRENT_PAGE = 1;
const HITS_PER_PAGE = 40;

let arrayImages = [];
let query = '';
let currentPage = DEFAULT_CURRENT_PAGE;
let totalPages = 0;

function renderCards(arrayImages) {
  const markup = arrayImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="wraper">
        <a class="photo-card" href='${largeImageURL}'>
           <img src='${webformatURL}' alt="${tags}" />
        </a>
        <div class="info"><div class="info-box">
          <p class="info-item">
          <b>Likes</b></p><span>${likes}</span>
          </div><div class="info-box">
          <p class="info-item">
          <b>Views</b></p><span>${views}</span>
          </div><div class="info-box">
          <p class="info-item">
          <b>Comments</b></p><span>${comments}</span>
          </div><div class="info-box">
          <p class="info-item">
          <b>Downloads</b></p><span>${downloads}</span>
          </div>
        </div>
      </div>`
    )
    .join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);

  if ((currentPage >= totalPages) & (totalPages > 1)) {
    refs.buttonLoadMore.classList.remove('visible');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
  if (currentPage > 1) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

async function fetchImages(query) {
  try {
    const response = await axios.get(
      `${MAIN_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${HITS_PER_PAGE}`
    );
    const data = await response.data;

    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      if (currentPage === 1) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      if (data.totalHits > HITS_PER_PAGE) {
        refs.buttonLoadMore.classList.add('visible');
      }

      arrayImages = [...arrayImages, ...data.hits];
      totalPages = data.totalHits / HITS_PER_PAGE;
      console.log(totalPages);

      renderCards(data.hits);
    }
  } catch (error) {
    console.log(error.message);
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  if (query === e.target.elements.searchQuery.value) return;

  query = e.target.elements.searchQuery.value.trim();
  refs.galleryEl.innerHTML = '';
  currentPage = DEFAULT_CURRENT_PAGE;
  arrayImages = [];
  refs.buttonLoadMore.classList.remove('visible');
  if (!query) return;

  fetchImages(query);
}

function onButtonLoadMoreClick() {
  currentPage += 1;
  fetchImages(query);
}

refs.formEl.addEventListener('submit', onFormSubmit);
refs.buttonLoadMore.addEventListener('click', onButtonLoadMoreClick);
