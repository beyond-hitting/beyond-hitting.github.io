const heroVideo = document.querySelector('.hero-background');
const playbackButton = document.querySelector('.hero-playback');

if (heroVideo && playbackButton) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncPlaybackButton = () => {
    playbackButton.textContent = heroVideo.paused ? 'Play video' : 'Pause video';
    playbackButton.setAttribute('aria-label', heroVideo.paused ? 'Play background video' : 'Pause background video');
  };

  const applyMotionPreference = () => {
    heroVideo.autoplay = !reducedMotion.matches;
    if (reducedMotion.matches) heroVideo.pause();
  };
  applyMotionPreference();
  reducedMotion.addEventListener('change', applyMotionPreference);

  heroVideo.addEventListener('loadeddata', () => {
    playbackButton.hidden = false;
    syncPlaybackButton();
  });
  heroVideo.addEventListener('play', syncPlaybackButton);
  heroVideo.addEventListener('pause', syncPlaybackButton);
  const hidePlaybackButton = () => { playbackButton.hidden = true; };
  heroVideo.addEventListener('error', hidePlaybackButton);
  heroVideo.querySelector('source').addEventListener('error', hidePlaybackButton);

  playbackButton.addEventListener('click', async () => {
    if (heroVideo.paused) {
      try {
        await heroVideo.play();
      } catch {
        syncPlaybackButton();
      }
    } else {
      heroVideo.pause();
    }
  });
  if (heroVideo.readyState >= 2) {
    playbackButton.hidden = false;
    syncPlaybackButton();
  }
}
