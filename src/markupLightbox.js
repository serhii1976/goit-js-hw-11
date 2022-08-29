import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function markuplightbox() {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
