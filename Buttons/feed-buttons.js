// Button state and events live here; app.js supplies the feed operations.
export function createFeedButtons({ onInteract, onShuffle }) {
  const shuffle = document.querySelector('#shuffle');
  const interact = document.querySelector('#interact');
  let busy = false;

  interact.addEventListener('click', () => {
    if (busy || interact.disabled) return;
    const enabled = interact.getAttribute('aria-pressed') !== 'true';
    interact.setAttribute('aria-pressed', String(enabled));
    onInteract(enabled);
  });

  shuffle.addEventListener('click', () => {
    if (busy || shuffle.disabled) return;
    onShuffle();
  });

  return {
    setAvailable(postCount) {
      shuffle.disabled = postCount < 2;
      interact.disabled = postCount === 0;
    },
    setShuffling(shuffling) {
      busy = shuffling;
      // Keep keyboard focus while disabling repeat clicks during the fade.
      for (const button of [shuffle, interact]) {
        if (busy) button.setAttribute('aria-disabled', 'true');
        else button.removeAttribute('aria-disabled');
      }
    },
  };
}
