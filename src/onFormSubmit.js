import { refs } from './refs';
import { variables } from './variables';
import { fetchImages } from './fetchImages';
import { GLOBAL_CONST } from './variables';

export function onFormSubmit(e) {
  e.preventDefault();

  if (variables.query === e.target.elements.searchQuery.value) return;
  variables.query = e.target.elements.searchQuery.value.trim();
  refs.galleryEl.innerHTML = '';
  variables.currentPage = GLOBAL_CONST.DEFAULT_CURRENT_PAGE;
  variables.arrayImages = [];
  refs.buttonLoadMore.classList.remove('visible');
  if (!variables.query) return;

  fetchImages(variables.query);
}
