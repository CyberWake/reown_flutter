function loadLoaderStyle(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  document.head.appendChild(link);
}

document.documentElement.style.visibility = "hidden";
window.addEventListener("load", () => {
  document.documentElement.style.visibility = "visible";
});

const userAgent = navigator.userAgent.toLowerCase();
let os = "default";
let splashSrc = "default_splash.svg";

if (userAgent.includes("windows")) {
  os = "windows";
  splashSrc = "boot_icons/windows.svg";
  loadLoaderStyle("splash/loaders/windows_loader.css");
} else if (userAgent.includes("android")) {
  os = "android";
  //  splashSrc = 'boot_icons/android.svg';
  loadLoaderStyle("splash/loaders/android_loader.css");
} else if (userAgent.includes("mac")) {
  os = "mac";
  splashSrc = "boot_icons/ios_mac.svg";
  loadLoaderStyle("splash/loaders/mac_loader.css");
} else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
  os = "ios";
  splashSrc = "boot_icons/ios_mac.svg";
}

document.body.classList.add(os);

const splashLogo = document.getElementById("splash-logo");
const splashVideo = document.getElementById("android-video");
let platformLoader = document.getElementById("platform-loader");
let stopped = false;
let completedOnce = false;

if (os !== "android") {
  if (splashLogo) {
    splashLogo.src = splashSrc;
    splashLogo.style.display = "block";
  }
  if (splashVideo) splashVideo.style.display = "none";
} else {
  if (splashVideo) {
    splashVideo.style.display = "block";
    splashVideo.play().catch((err) => {
      console.warn("Autoplay failed:", err);
    });
  }
  if (splashLogo) splashLogo.style.display = "none";
  if (platformLoader) {
    platformLoader.style.visibility = "hidden"; // reserve space, avoid layout shift
  }
}

requestAnimationFrame(() => {
  if (os === "windows") {
    setTimeout(() => {
      document.body.classList.add("windows-start");
      setTimeout(() => {
        document.body.classList.add("show-loader");
        setTimeout(() => {
          if(stopped){
            const splash = document.getElementById("custom-splash");
            // Smoothly fade out the splash
            splash.classList.add("fade-out");
            setTimeout(() => splash?.remove(), 1000);
          }else{
            completedOnce = true;
          }
        },1000);
      }, 1500);
    }, 500);
  } else if (os === "mac") {
    document.body.classList.add("show-loader");
    // Start progress animation after one tick
    requestAnimationFrame(() => {
      const loader = document.getElementById("platform-loader");
      if (loader) {
        loader.classList.add("animate-progress");
        setTimeout(() => {
          if(stopped){
            loader.classList.add("complete-progress");
            // Allow animation to finish
            setTimeout(() => {
              const splash = document.getElementById("custom-splash");
              splash.classList.add("fade-out");
              splash?.remove();
            }, 1000); // match CSS transition
          }else{
            completedOnce = true;
          }
        },2000);
      }
    });
  } else if (os === "android") {
    const loader = document.getElementById("platform-loader");
    if (splashLogo) splashLogo.style.display = "none";
    if (splashVideo) {
      splashVideo.style.display = "block";
      splashVideo.play().catch((err) => console.warn("Autoplay failed:", err));

      splashVideo.addEventListener("ended", () => {
        if (loader) {
          loader.style.visibility = "visible";

          const progressBar = document.createElement("div");
          progressBar.classList.add("progress-bar");
          loader.appendChild(progressBar);

          const fillDuration = 750;
          const drainDuration = 600;

          async function animateFill() {
            return new Promise((resolve) => {
              progressBar.style.transition = `none`;
              progressBar.style.left = `0%`;
              progressBar.style.right = `auto`;
              progressBar.style.width = `0%`;

              requestAnimationFrame(() => {
                progressBar.style.transition = `width ${fillDuration}ms linear`;
                progressBar.style.width = `100%`;

                setTimeout(resolve, fillDuration);
              });
            });
          }

          async function animateDrain() {
            return new Promise((resolve) => {
              progressBar.style.transition = `left ${drainDuration}ms linear, width 0ms`;
              progressBar.style.right = `0`;
              progressBar.style.left = `0`;

              requestAnimationFrame(() => {
                progressBar.style.left = `100%`;
                setTimeout(resolve, drainDuration);
              });
            });
          }
          let completeCount = 0;
          async function loop() {
            while (!stopped || !completedOnce) {
              await animateFill();
              await animateDrain();
              if(completeCount>=2){
                completedOnce = true
              }
              completeCount = completeCount + 1;
            }
            const splash = document.getElementById("custom-splash");
            // Smoothly fade out the splash
            splash.classList.add("fade-out");
            setTimeout(() => splash?.remove(), 300); // match CSS fade duration
          }

          loop();
        }
      });
    }
  } else {
    document.body.classList.add("show-loader");
  }
});

window.addEventListener("flutter-first-frame", function () {
  stopped = true;
  const splash = document.getElementById("custom-splash");
  if (os === "mac" && completedOnce) {
    const loader = document.getElementById("platform-loader");
    if (loader) {
      loader.classList.add("complete-progress");
    }

    // Allow animation to finish
    setTimeout(() => {
      splash?.remove();
    }, 1000); // match CSS transition
  } else if (os !== "android" && completedOnce) {
    if (splash) splash.remove();
  }
});
