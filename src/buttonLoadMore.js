import { variables } from './variables';
import { fetchImages } from './fetchImages';

export function onButtonLoadMoreClick() {
  variables.currentPage += 1;
  fetchImages(variables.query);
}
