import { refs } from './refs';
import { onButtonLoadMoreClick } from './buttonLoadMore';
import { onFormSubmit } from './onFormSubmit';

refs.formEl.addEventListener('submit', onFormSubmit);
refs.buttonLoadMore.addEventListener('click', onButtonLoadMoreClick);
