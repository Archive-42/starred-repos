const localResults = window.localStorage.getItem('results');
const results = JSON.parse(localResults);
const localSaved = window.localStorage.getItem('saved') || '[]';
let saved = JSON.parse(localSaved).filter(item => !!item);
const savedFavourites = document.querySelector('.saved-favourites');
savedFavourites.innerHTML = `Favourites (${saved.length})`;
let favourites;
const imageContainer = document.querySelector('.image-container');

function generateFavourites(target = 'results') {
  const arr = target === 'results' ? results : saved;
  // console.log({arr});
  favourites = document.querySelectorAll('.image > .favourite');
  favourites.forEach(img => {
    const isSaved = saved.find(item => item.id === img.id);
    if (isSaved) img.classList.add('on');
    img.addEventListener('click', (e) => {
      const classList = e.target.classList;
      const foundInSaved = saved.find(item => item.id === e.target.id);
      if (foundInSaved) {
        saved = saved.filter(item => item.id !== e.target.id);
        classList.remove('on');
      } else {
        const foundObj = arr.find(item => item.id === e.target.id);
        saved.push(foundObj);
        classList.add('on');
      }
      const savedJSON = JSON.stringify(saved);
      window.localStorage.setItem('saved', savedJSON);
      savedFavourites.innerHTML = `Favourites (${saved.length})`;
    });
  });
}