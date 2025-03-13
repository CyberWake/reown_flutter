'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "5bf4a560d46c3458c24a434ba05496f6",
"version.json": "cb5f82fbd1558a0e92aec1d822cbb40a",
"splash/splash.js": "285f1671ea8e423a02f7dee301aff2a0",
"splash/splash.css": "646eae64bf780bd8a12c9559738fa5e7",
"splash/loaders/windows_loader.css": "1edf04eb3a82955bbc397872d3d80c91",
"splash/loaders/mac_loader.css": "53e7ad7ba5493e274ce4a7edbca8a179",
"splash/loaders/android_loader.css": "5ecc0a5ce0bf0f690c64fab342a1e967",
"index.html": "3bdf58c3fcad56d193ed0a506ef2081f",
"/": "3bdf58c3fcad56d193ed0a506ef2081f",
"boot_icons/windows.svg": "28dc91251840a3e34822cc569ed69dff",
"boot_icons/android.mp4": "7a90e1a9c70df329896c1e9d74d0030b",
"boot_icons/apple.svg": "2008cdc030cfcc0de4f511faed70f9c9",
"main.dart.js": "54145c47846f0496576c438526a9e209",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "f62a96dd8ff60888d7e518b292f1502b",
".git/config": "53f6eda94af7b72a355cdf76475e72fb",
".git/objects/57/15730c02a1c95dc0b9e2065ac93bd9df355a50": "cf319d2dac6f5bc45b9423bc9c23fa48",
".git/objects/6f/d070f41c47a7f20fabd7a10b3f3714375634b4": "133ca4cb581cc5401c5a6d13f51fefbc",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/32/cdbff9d1793f8d29c766f80d15dc7bd01aa727": "4824994f5549d182b9ee016eb58195d5",
".git/objects/69/dd618354fa4dade8a26e0fd18f5e87dd079236": "8cc17911af57a5f6dc0b9ee255bb1a93",
".git/objects/56/feddb0c5675f3d696a17a14d6caf12d198d34f": "3c0f4f5cecd6ce9fe2a30edd378e5f10",
".git/objects/58/05110429aad27018ab8389af095ca04ace84ca": "d00bbba45fa84945a0eb38079df702fb",
".git/objects/0b/f063b430ee8b40a41c7a0096eed0c8d4fa4b2d": "03bd3f578fc16390c48157e499e1488d",
".git/objects/93/70115dd33440984fd09ac8f6dd40c8d238bb57": "5618004c9ce77bb1b5364c9223fe1a40",
".git/objects/60/24290404680f00e77a539d87ae8f85f4ca7854": "3d4d25f59177c26517e0d56ea7fa9ea8",
".git/objects/5f/3c09048bb8e9bfb3d809195b3f66b17b5c940b": "1fd69f051c9d72c891bfb8825f176475",
".git/objects/9c/c93678eef655f4faa9e697b6e643012c997235": "9b47e9c20862d44d4e96f84b29b8d350",
".git/objects/a3/184e2f70a380ea6986cb6bbcd9024404a77754": "3ef6f44eaa639f0edd4cfccab683ec46",
".git/objects/b5/82a1c4a1c9bb030a51484b177121945cd5b3e5": "a02ea7311983355fceef7906d4cf257c",
".git/objects/b2/ce52db5f8060abca11b7a3412b3e062539919b": "918da951f2c26ece725bde7e855709a9",
".git/objects/ad/ae244c7af49a208afc5be00a19f29c732208a8": "b48912d423ed2ce01391ad6a4945aebf",
".git/objects/ad/0971791388664e477c52e1a797cb66a7da5e5d": "77a59119d00829dc97e46048f7a16a2c",
".git/objects/d7/57e812f5a9f25e637ae2f80890a5a64a46e606": "a56b6c537f6455c5e73680042a3af269",
".git/objects/d0/e3f9f16cc40b7820ad643835c601a3bf5d7f05": "64ca6d8a52094f914edfae01932f1eb1",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/f4/9b50f2376479140e07e7f1f015c9577751f2b3": "1daf88d51067cdc322bc2c0fc1d3d5cc",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/c0/f383b9bf2ea066c1c658aedd93db6dad894aee": "8fec944c9ad23b41ed072e54f9140397",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/c6/06caa16378473a4bb9e8807b6f43e69acf30ad": "ed187e1b169337b5fbbce611844136c6",
".git/objects/ec/361605e9e785c47c62dd46a67f9c352731226b": "d1eafaea77b21719d7c450bcf18236d6",
".git/objects/27/a297abdda86a3cbc2d04f0036af1e62ae008c7": "51d74211c02d96c368704b99da4022d5",
".git/objects/11/2c5f6c9d42f0d199dfbf5b042102f8ec4539a7": "6f6d0c7d12c6150761bb47cc16fa028a",
".git/objects/7d/9d924abc4139187bbfe2141dba489ff55ef132": "38064e0f0556f413553a7ce7659c7de2",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/73/7f149c855c9ccd61a5e24ce64783eaf921c709": "1d813736c393435d016c1bfc46a6a3a6",
".git/objects/87/b77060695efa2492f4193b1d708be521bf016a": "99ccac27a5ccf4a8d459c52991a70026",
".git/objects/87/fa2e4b4126db3191abc9e24a4ee11510871bd9": "ea5cfb0b045cbc91029a3b5619665fb3",
".git/objects/74/7b1620ad48c69b09acec400636970c50bacd5e": "e6252b12e85f44f030cdefd80dc5214c",
".git/objects/7b/78d9340dbd950c911e63cd0af4ef7f97d5feab": "22827a4e766446cef2efa9e47559be2d",
".git/objects/8f/e7af5a3e840b75b70e59c3ffda1b58e84a5a1c": "e3695ae5742d7e56a9c696f82745288d",
".git/objects/8a/bc25ac1cf1d07f6cee96c6cff8f5756de970d2": "2f08050f231ca1451db54db5185dc5c7",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/19/975a989e2d25f591a2117401c4f775a423cfe7": "55a5075d02ef8ca5ccaef4a8a47d1cc9",
".git/objects/4c/a6f8e6c690f534111d2a1387d10b4b091d04c6": "81483f2e71aeb39ff605e51a7773ea86",
".git/objects/4c/75697f41015759ecc4652430e52ba7cf208124": "ce51d24feabde5a0152aa2de1c074e61",
".git/objects/26/12b36e16e8bdb9a167f399f77caad0ad888ad6": "46ae9b9717d7ddce11cf8bd863413b80",
".git/objects/72/8760947e317a98a6a1b99efd9cca262467dea7": "e56d03d3ec7ba666d06b5d0efedc6813",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/38/ce401cabe60e029a7994b14dd195ba3041464f": "496d03e86055cf8a46ea533cc5858850",
".git/objects/09/33f912ef5c878b034b0a8a8ef91d78723c6e31": "c3f7eed8346f44d66284d4ac262b3519",
".git/objects/96/01c3e1125cfa36fcbc7aeb8c49b0ca828bf80c": "a012e6b480a5b592b8a95119f0d0a4b7",
".git/objects/96/ec2a19f05ef2a70d113fccbc08670d64249c4b": "1170eba2435be69d08088ab6707f6eab",
".git/objects/98/338916c481871f3c7ee5f22186535aecb5bf60": "3efc9678149a855537ec2e13465cb515",
".git/objects/5e/a0bc6619c182abc041de92b1bb4f8e830aa465": "ce9255523663c56e5b940cde1dc9455d",
".git/objects/6d/5f0fdc7ccbdf7d01fc607eb818f81a0165627e": "2b2403c52cb620129b4bbc62f12abd57",
".git/objects/06/bd1c439c678fb220d51f1686be1e0ebe20929f": "5db46224e6770a72239f3ce3bae0d33f",
".git/objects/39/511d1804efd67b80c26df6abf0ed1aee12e45d": "b0d19446d6d3cd37643d6754300dfd28",
".git/objects/39/4d32bf41b639098e3eb495ec063d53270e82ab": "be49ef29ee049de6bfa73b4b7a9a25ae",
".git/objects/99/1233c4c06dc86bac8b29c1bb10474c9e917d94": "9094c0152f63971a50e21eb27fd428a9",
".git/objects/97/42d7999ab640d494e47baaa31cf27ad00968e1": "17d015b1b0f4dc5ec6e10e2a4dcd6319",
".git/objects/97/8a4d89de1d1e20408919ec3f54f9bba275d66f": "dbaa9c6711faa6123b43ef2573bc1457",
".git/objects/63/c5f930d04956871580cfc1d1c0141e04b75e92": "a591ed30b36c0387c3968d4d284e2be7",
".git/objects/63/6931bcaa0ab4c3ff63c22d54be8c048340177b": "8cc9c6021cbd64a862e0e47758619fb7",
".git/objects/63/5b2df4936168ca8378cd25e6e2027d35279d7a": "4c201e7e3a58b53f4fe8bffef2b7f880",
".git/objects/64/31141916bca34480cd7fc526d41f50b2be11f5": "e8306479173a47089a889c23a1d4ff35",
".git/objects/90/cdbb732e1e72d8b8d6f941f558ba596eb7ffa8": "5b24af3f2d6f7c9f2313da9112f4c86d",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/a7/1179b8dc3327cf8eba22bca4165c2210094227": "33e015cd8da75b2333c97f2ca5ad8c33",
".git/objects/a7/226fe09e5813899440ca26f1aa46891ce4fd2a": "721d5f34780389048507bbb865ada234",
".git/objects/b1/5ad935a6a00c2433c7fadad53602c1d0324365": "8f96f41fe1f2721c9e97d75caa004410",
".git/objects/b1/afd5429fbe3cc7a88b89f454006eb7b018849a": "e4c2e016668208ba57348269fcb46d7b",
".git/objects/b6/269dcce22f33892d8db0d629c695a5c70a46bc": "fd113c63a87181f1e10f01f6a38b1b2a",
".git/objects/a9/fd00b084e33a0c5db772059a1d8941a7211bf9": "4b38d2cecfa78c2b7024a3b95278a579",
".git/objects/af/31ef4d98c006d9ada76f407195ad20570cc8e1": "a9d4d1360c77d67b4bb052383a3bdfd9",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/c3/e81f822689e3b8c05262eec63e4769e0dea74c": "8c6432dca0ea3fdc0d215dcc05d00a66",
".git/objects/ea/25ff1eea744a10987ca3e27ee1d7c60ff6023e": "816aa786697ea624dac68f72a08c6081",
".git/objects/cc/cd7fb2c83537881f2929e4afad6fe48835e2c7": "33d5b9a8f5d4b6bd59df8a0506c078a4",
".git/objects/f0/d5f8ed7fa0ba6dccd5fec757a1f09bdc2170c6": "87aeb0116e969e654c4ba33ff7a4f378",
".git/objects/f0/68a5404f086e9871e3534fa9a527b0161c7246": "bd3312e9fcd91770f380bc2c552c60ad",
".git/objects/f7/d4293269cbd01f7f189925b8627f77dda1e480": "7976a47cee03f4ea8bc107b5c418e97a",
".git/objects/e7/b9821877fcef46c634e575b4ba04cffa3b5021": "7afef0c99fbf04aa786d9d1a55b53d1c",
".git/objects/cb/2b595602e91d1a3673b84d38131dfdfc4123aa": "48a86f6767639f122ae9c730ef3cce72",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/79/194e9441a20029a6a4af508f2b631e4f60af62": "188369b3d009384f5930598062318d65",
".git/objects/2d/fcdbe9f2df0332cee24295b9c0a4cdbf2478b7": "b40637ed7a305a7a7296f4f96b139cc1",
".git/objects/41/63a7df542bc06d56f6b66976c5f11b3a00d698": "76f76ac1daad317812929ecb94dc97b9",
".git/objects/70/3e82aa9515e3cb79b97c83535bc4ddc99e8938": "e7fbfdcbc89b5c1d9a7dd18e85e8dc0e",
".git/objects/4a/93ed602455d9f7093f2fe6edff0530628dabfd": "df06cb57b216dc2b202e1d0dca831c22",
".git/objects/24/0088c0ece3f31133ffd83e7fa7668339b9d807": "cace2a4868309a1e5bb2a41561ec55b9",
".git/objects/23/136c8468d0df28d11a27ab38a973e249f2189d": "5f370b78525e8e663011c5e91f4a5e34",
".git/objects/4f/346c3e43f95e778d7cef3cb6ceede9cd2bf1c8": "99981890f1649c8ef95c28d9e5a27d4e",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/1d/90d5df15addd343fca125b4bf0dcf269745543": "2ef59161d202fd2e5843f0f50d7d8cb8",
".git/objects/82/b1ad7566122e888a102c6ac14a3dab40decf30": "0d3cecf590de04e4a2bcdc4b0488edd5",
".git/objects/47/4f7b3b240c29973171cef7df35b2d23f8c28e3": "7805ebddae591c91440ce14ec0f8842f",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/HEAD": "5ab7a4355e4c959b0c5c008f202f51ec",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "8a33b308b47067a70bf2f4d3510421fe",
".git/logs/refs/heads/gh-pages": "8a33b308b47067a70bf2f4d3510421fe",
".git/logs/refs/remotes/origin/gh-pages": "778f8611dbaecca8482a873ae2374499",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/gh-pages": "fb317e2046483cf6c98edfca46e830bc",
".git/refs/remotes/origin/gh-pages": "fb317e2046483cf6c98edfca46e830bc",
".git/index": "1a7a6a208c53da268fd949b779c527c2",
".git/COMMIT_EDITMSG": "f41191bb585c1ce8dcdea2d25fbaea8a",
"assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/NOTICES": "938842f1aeb30f4cebef96dba77a5e5a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "69a99f98c8b1fb8111c5fb961769fcd8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "693635b5258fe5f1cda720cf224f158c",
"assets/fonts/MaterialIcons-Regular.otf": "8ea08ea2444cc58ec5807fd7669e488f",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
