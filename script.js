// Set durations and prepare images and text
const duration = 1,
  interval = 2500,
  texts = gsap.utils.toArray(".banner-controls-title"),
  images = gsap.utils.toArray(".banner-carousel-img");

const crossFade = () => {
  let index = 0;
  let autoCycle;

  const showSlide = (newIndex) => {
    // Pairs image and text
    const currentText = texts[index];
    const currentImage = images[index];
    const nextText = texts[newIndex];
    const nextImage = images[newIndex];

    // Fade out current text and image
    gsap.to(currentImage, {
      opacity: 0,
      duration,
      onComplete: () => currentImage.classList.remove("active"),
    });
    gsap.to(currentText, {
      opacity: 0,
      duration,
      onComplete: () => currentText.classList.remove("active"),
    });

    // Fade in next text and image
    nextImage.classList.add("active");
    nextText.classList.add("active");
    gsap.fromTo(nextText, { opacity: 0 }, { opacity: 1, duration });
    gsap.fromTo(nextImage, { opacity: 0 }, { opacity: 1, duration });

    index = newIndex;
  };

  // Logic for manual navigation
  function nextSlide() {
    let nextIndex = index + 1;
    if (nextIndex >= images.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = index - 1;
    if (prevIndex < 0) {
      prevIndex = images.length - 1;
    }
    showSlide(prevIndex);
  }

  // Sets up reference to interval that handles duration of transitions etc.
  autoCycle = setInterval(nextSlide, interval);

  // Connect manual navigation to respective buttons
  document.querySelector(".arrow-right").addEventListener("click", () => {
    // Pauses auto-play on manual navigation
    clearInterval(autoCycle);
    nextSlide();
  });

  document.querySelector(".arrow-left").addEventListener("click", () => {
    // Pauses auto-play on manual navigation
    clearInterval(autoCycle);
    prevSlide();
  });
};

window.onload = () => {
  crossfade();
};
