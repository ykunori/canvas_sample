// Import helpers.
import { setMessage } from '@/helpers/set-message';
import { drawCanvas } from '@/canvas';

drawCanvas();

/**
 * Will find #root element and set HTML to "Hello World!".
 */
function editDom(): void {
  const root = document.getElementById('root'); // Get root element.
  if (root) {
    root.innerHTML = `<p> fontsize: 16px: ${setMessage()}</p>`; // Set html of the root element.
  }
}

editDom(); // Call editDom.
