const splashLogo = document.getElementById("splash-logo");
const splashVideo = document.getElementById("android-video");
let platformLoader = document.getElementById("platform-loader");
let stopped = false;
let completedOnce = false;
let splashSrc = "default_splash.svg";

document.documentElement.style.visibility = "hidden";
window.addEventListener("load", () => {
  document.documentElement.style.visibility = "visible";
});

const userAgent = navigator.userAgent.toLowerCase();
let os = detectOS();
const { suspicious, reason } = checkSpoofing(os);
if (suspicious) {
  showBootOptionUI();
  // I want to show a boot loader kind of UI giving options like windows,macos,linux,ipados,ios,android
} else {
  bootOS();
}

function loadFlutter() {
  // Inject Flutter script only after OS selection is done
  const flutterScript = document.createElement("script");
  flutterScript.src = "main.dart.js";
  flutterScript.type = "application/javascript";
  document.body.appendChild(flutterScript);
}

function loadLoaderStyle(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  document.head.appendChild(link);
}

function detectOS() {
  // Modern API (Chrome, Edge, etc.)

  if (navigator.userAgentData && navigator.userAgentData.platform) {
    return navigator.userAgentData.platform.toLowerCase(); // e.g., 'macos', 'windows'
  }

  // Fallback (Safari, Firefox)
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("windows nt")) return "windows";
  if (userAgent.includes("iphone")) return "ios";
  if (
    userAgent.includes("macintosh") ||
    userAgent.includes("mac os x") ||
    userAgent.includes("ipad")
  )
    return "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0
      ? "ipados"
      : "macos";
  if (userAgent.includes("android")) return "android";
  if (userAgent.includes("linux")) return "linux";
  return "default";
}

function checkSpoofing(os) {
  const width = window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  let suspicious = false;
  let reason = "";

  switch (os) {
    case "windows":
    case "linux":
    case "macos":
      if (width < 1047) {
        suspicious = true;
        reason = "Screen too small for desktop OS";
      }
      break;
    case "android":
    case "ios":
    case "ipados":
      if (width > 1024 && maxTouchPoints < 2) {
        suspicious = true;
        reason = "Large screen with no touch — not expected on mobile";
      }
      break;
  }
  return { suspicious, reason };
}

function prepareOS() {
  if (os == "windows") {
    splashSrc = "boot_icons/windows.svg";
    loadLoaderStyle("splash/loaders/windows_loader.css");
  } else if (os == "linux") {
    splashSrc = "boot_icons/windows.svg";
    loadLoaderStyle("splash/loaders/windows_loader.css");
  } else if (os == "android") {
    //  splashSrc = 'boot_icons/android.svg';
    loadLoaderStyle("splash/loaders/android_loader.css");
  } else if (os == "macos") {
    splashSrc = "boot_icons/apple.svg";
    loadLoaderStyle("splash/loaders/mac_loader.css");
  } else if (os == "ios") {
    splashSrc = "boot_icons/apple.svg";
  } else if (os == "ipados") {
    splashSrc = "boot_icons/apple.svg";
  }
}

// Common
function fadeOutSplash(delay = 1000) {
  const splash = document.getElementById("custom-splash");
  if (splash) {
    splash.classList.add("fade-out");
    setTimeout(() => splash.remove(), delay);
  }
}

function handleWindowsLoader() {
  const splash = document.getElementById("custom-splash");
  setTimeout(() => {
    document.body.classList.add("windows-start");
    setTimeout(() => {
      document.body.classList.add("show-loader");
      setTimeout(() => {
        if (stopped) {
          fadeOutSplash();
        } else {
          completedOnce = true;
        }
      }, 1000);
    }, 1500);
  }, 500);
}

function handleMacLoader() {
  document.body.classList.add("show-loader");

  requestAnimationFrame(() => {
    const loader = document.getElementById("platform-loader");
    if (loader) {
      loader.classList.add("animate-progress");

      setTimeout(() => {
        if (stopped) {
          loader.classList.add("complete-progress");
          setTimeout(() => fadeOutSplash(), 1000); // match CSS
        } else {
          completedOnce = true;
        }
      }, 2000);
    }
  });
}

function handleAndroidLoader() {
  const splashLogo = document.getElementById("splash-logo");
  const splashVideo = document.getElementById("android-video");
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
            if (completeCount >= 2) {
              completedOnce = true;
            }
            completeCount++;
          }
          fadeOutSplash(300); // faster fade for Android
        }

        loop();
      }
    });
  }
}

function handleDefaultLoader() {
  document.body.classList.add("show-loader");
}

function startBooting() {
  document.body.classList.add(os);

  if (os !== "android") {
    if (splashLogo) {
      splashLogo.src = splashSrc;
      splashLogo.style.display = "block";
      switch (os) {
        case "ios":
          splashLogo.width = "75";
          break;
        case "ipados":
        case "macos":
          splashLogo.width = "100";
          break;
      }
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

  // Trigger the correct one
  requestAnimationFrame(() => {
    switch (os) {
      case "windows":
      case "linux":
        handleWindowsLoader();
        break;
      case "macos":
        handleMacLoader();
        break;
      case "android":
        handleAndroidLoader();
        break;
      default:
        handleDefaultLoader();
        break;
    }
  });

  // Flutter ready
  window.addEventListener("flutter-first-frame", function () {
    stopped = true;
    const splash = document.getElementById("custom-splash");
    if (os === "macos" && completedOnce) {
      const loader = document.getElementById("platform-loader");
      if (loader) loader.classList.add("complete-progress");
      setTimeout(() => fadeOutSplash(), 1000);
    } else if (os !== "android" && completedOnce) {
      if (splash) splash.remove();
    } else if (["ios", "ipados"].includes(os)) {
      if (splash) setTimeout(() => splash.remove(), 500);
    }
  });
}

function setCanvasSize() {
  const appContainer = document.getElementById("app-container");
  const sizes = {
    windows: ["100vw", "100vh"],
    macos: ["100vw", "100vh"],
    linux: ["100vw", "100vh"],
    ios: ["430px", "932px"],
    android: ["412px", "915px"],
    ipados: ["1366px", "1024px"],
  };

  if (appContainer) {
    const [w, h] = sizes[os] || ["100vw", "100vh"];
    appContainer.style.width = w;
    appContainer.style.height = h;
    appContainer.style.margin = "auto";
    appContainer.style.position = "relative";
    appContainer.style.top = "0";
    appContainer.style.left = "0";
    appContainer.style.right = "0";
    appContainer.style.bottom = "0";
    appContainer.style.overflow = "hidden";
    appContainer.style.border = "2px solid rgba(255,255,255,0.1)";
    appContainer.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
    appContainer.style.background = "#000"; // or splash background
  }
}

function bootOS() {
  setCanvasSize();
  loadFlutter();
  prepareOS();
  startBooting();
}

function showBootOptionUI() {
  const bootUI = document.createElement("div");
  bootUI.id = "boot-option-ui";
  const width = window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  const options =
    width <= 500
      ? ["android", "ios"]
      : width <= 1047
      ? ["android", "ios", "ipados"]
      : ["windows", "macos", "linux", "android", "ios", "ipados"];

  let selectedIndex = 0;

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "boot-options";

  options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.className = "boot-option";
    optDiv.innerText = opt;

    // 🔥 Add tap/click support:
    optDiv.addEventListener("click", () => {
      selectedIndex = idx;
      updateSelection();
      bootSelectedOption();
    });

    optionsDiv.appendChild(optDiv);
  });

  const footer = document.createElement("div");
  footer.className = "boot-footer";
  footer.innerText = "Use 🔼 🔽 arrows or tap to select, press Enter(⏎) to boot\nor\nuse mouse(yes we care it)"+ width;

  bootUI.appendChild(optionsDiv);
  bootUI.appendChild(footer);
  document.body.appendChild(bootUI);

  function updateSelection() {
    const children = optionsDiv.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.toggle("selected", i === selectedIndex);
    }
  }

  function bootSelectedOption() {
    const chosen = options[selectedIndex];
    document.body.removeChild(bootUI);
    window.removeEventListener("keydown", handleKey);

    os = chosen;
    bootOS();
  }

  function handleKey(e) {
    if (e.key === "ArrowUp") {
      selectedIndex = (selectedIndex - 1 + options.length) % options.length;
      updateSelection();
    } else if (e.key === "ArrowDown") {
      selectedIndex = (selectedIndex + 1) % options.length;
      updateSelection();
    } else if (e.key === "Enter") {
      bootSelectedOption();
    }
  }

  window.addEventListener("keydown", handleKey);
  updateSelection();
}

//document.body.classList.add(os);
//
//const splashLogo = document.getElementById("splash-logo");
//const splashVideo = document.getElementById("android-video");
//let platformLoader = document.getElementById("platform-loader");
//let stopped = false;
//let completedOnce = false;
//
//if (os !== "android") {
//  if (splashLogo) {
//    splashLogo.src = splashSrc;
//    splashLogo.style.display = "block";
//  }
//  if (splashVideo) splashVideo.style.display = "none";
//} else {
//  if (splashVideo) {
//    splashVideo.style.display = "block";
//    splashVideo.play().catch((err) => {
//      console.warn("Autoplay failed:", err);
//    });
//  }
//  if (splashLogo) splashLogo.style.display = "none";
//  if (platformLoader) {
//    platformLoader.style.visibility = "hidden"; // reserve space, avoid layout shift
//  }
//}
//
//requestAnimationFrame(() => {
//  if (os === "windows") {
//    setTimeout(() => {
//      document.body.classList.add("windows-start");
//      setTimeout(() => {
//        document.body.classList.add("show-loader");
//        setTimeout(() => {
//          if (stopped) {
//            const splash = document.getElementById("custom-splash");
//            // Smoothly fade out the splash
//            splash.classList.add("fade-out");
//            setTimeout(() => splash?.remove(), 1000);
//          } else {
//            completedOnce = true;
//          }
//        }, 1000);
//      }, 1500);
//    }, 500);
//  } else if (os === "mac") {
//    document.body.classList.add("show-loader");
//    // Start progress animation after one tick
//    requestAnimationFrame(() => {
//      const loader = document.getElementById("platform-loader");
//      if (loader) {
//        loader.classList.add("animate-progress");
//        setTimeout(() => {
//          if (stopped) {
//            loader.classList.add("complete-progress");
//            // Allow animation to finish
//            setTimeout(() => {
//              const splash = document.getElementById("custom-splash");
//              splash.classList.add("fade-out");
//              splash?.remove();
//            }, 1000); // match CSS transition
//          } else {
//            completedOnce = true;
//          }
//        }, 2000);
//      }
//    });
//  } else if (os === "android") {
//    const loader = document.getElementById("platform-loader");
//    if (splashLogo) splashLogo.style.display = "none";
//    if (splashVideo) {
//      splashVideo.style.display = "block";
//      splashVideo.play().catch((err) => console.warn("Autoplay failed:", err));
//
//      splashVideo.addEventListener("ended", () => {
//        if (loader) {
//          loader.style.visibility = "visible";
//
//          const progressBar = document.createElement("div");
//          progressBar.classList.add("progress-bar");
//          loader.appendChild(progressBar);
//
//          const fillDuration = 750;
//          const drainDuration = 600;
//
//          async function animateFill() {
//            return new Promise((resolve) => {
//              progressBar.style.transition = `none`;
//              progressBar.style.left = `0%`;
//              progressBar.style.right = `auto`;
//              progressBar.style.width = `0%`;
//
//              requestAnimationFrame(() => {
//                progressBar.style.transition = `width ${fillDuration}ms linear`;
//                progressBar.style.width = `100%`;
//
//                setTimeout(resolve, fillDuration);
//              });
//            });
//          }
//
//          async function animateDrain() {
//            return new Promise((resolve) => {
//              progressBar.style.transition = `left ${drainDuration}ms linear, width 0ms`;
//              progressBar.style.right = `0`;
//              progressBar.style.left = `0`;
//
//              requestAnimationFrame(() => {
//                progressBar.style.left = `100%`;
//                setTimeout(resolve, drainDuration);
//              });
//            });
//          }
//          let completeCount = 0;
//          async function loop() {
//            while (!stopped || !completedOnce) {
//              await animateFill();
//              await animateDrain();
//              if (completeCount >= 2) {
//                completedOnce = true;
//              }
//              completeCount = completeCount + 1;
//            }
//            const splash = document.getElementById("custom-splash");
//            // Smoothly fade out the splash
//            splash.classList.add("fade-out");
//            setTimeout(() => splash?.remove(), 300); // match CSS fade duration
//          }
//
//          loop();
//        }
//      });
//    }
//  } else {
//    document.body.classList.add("show-loader");
//  }
//});
//
//window.addEventListener("flutter-first-frame", function () {
//  stopped = true;
//  const splash = document.getElementById("custom-splash");
//  if (os === "mac" && completedOnce) {
//    const loader = document.getElementById("platform-loader");
//    if (loader) {
//      loader.classList.add("complete-progress");
//    }
//
//    // Allow animation to finish
//    setTimeout(() => {
//      splash?.remove();
//    }, 1000); // match CSS transition
//  } else if (os !== "android" && completedOnce) {
//    if (splash) splash.remove();
//  }
//});
