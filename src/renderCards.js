// export function renderCards(arrayImages) {
//   const markup = arrayImages
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) =>
//         `<div class="wraper">
//         <a class="photo-card" href='${largeImageURL}'>
//            <img src='${webformatURL}' alt="${tags}" />
//         </a>
//         <div class="info"><div class="info-box">
//           <p class="info-item">
//           <b>Likes</b></p><span>${likes}</span>
//           </div><div class="info-box">
//           <p class="info-item">
//           <b>Views</b></p><span>${views}</span>
//           </div><div class="info-box">
//           <p class="info-item">
//           <b>Comments</b></p><span>${comments}</span>
//           </div><div class="info-box">
//           <p class="info-item">
//           <b>Downloads</b></p><span>${downloads}</span>
//           </div>
//         </div>
//       </div>`
//     )
//     .join('');
//   refs.galleryEl.insertAdjacentHTML('beforeend', markup);

//   if ((currentPage >= totalPages) & (totalPages > 1)) {
//     refs.buttonLoadMore.classList.remove('visible');
//     Notiflix.Notify.info(
//       "We're sorry, but you've reached the end of search results."
//     );
//   }

//   const lightbox = new SimpleLightbox('.gallery a');
//   lightbox.refresh();

//   if (currentPage > 1) {
//     const { height: cardHeight } = document
//       .querySelector('.gallery')
//       .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   }
// }
