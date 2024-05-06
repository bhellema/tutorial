import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders('en');
  const { bookAHunt } = placeholders;

  const cols = [...block.firstElementChild.children];
  block.classList.add(`turkey-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('turkey-img-col');
        }
      }
    });
  });
  const a = document.createElement('a');
  const linkText = document.createTextNode(bookAHunt);
  a.appendChild(linkText);
  a.href = 'https://www.nwtf.org/';
  block.append(a);
}
