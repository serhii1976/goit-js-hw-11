import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';
import { variables } from './variables';
import { GLOBAL_CONST } from './variables';
import { renderCards } from './renderCards';

export async function fetchImages(query) {
  try {
    const response = await axios.get(
      `${GLOBAL_CONST.MAIN_URL}?key=${GLOBAL_CONST.API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${variables.currentPage}&per_page=${GLOBAL_CONST.HITS_PER_PAGE}`
    );
    const data = await response.data;

    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      if (variables.currentPage === 1) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      if (data.totalHits > GLOBAL_CONST.HITS_PER_PAGE) {
        refs.buttonLoadMore.classList.add('visible');
      }

      variables.arrayImages = [...variables.arrayImages, ...data.hits];
      variables.totalPages = data.totalHits / GLOBAL_CONST.HITS_PER_PAGE;

      renderCards(data.hits);
    }
  } catch (error) {
    console.log(error.message);
  }
}
