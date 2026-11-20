/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "da374b705014d96b568ef5081a27a091"
  }, {
    "url": "pwa-512x512.png",
    "revision": "69543eee251345913fe602c3ba3f55ef"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d28ec4661000e846defe237d5881a85f"
  }, {
    "url": "index.html",
    "revision": "04f911e4b2e2f8c221a4b6eae072898d"
  }, {
    "url": "icon.svg",
    "revision": "dbdc7835732f0ba3b6a80afeea7d43d4"
  }, {
    "url": "icon-maskable.svg",
    "revision": "384ce79641d5cffa8be7c7308fb2cb0c"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f100874e4ef9605c106949ff243d9c56"
  }, {
    "url": "src/assets/images/cover_studio_voiceover_1794924292909.jpg",
    "revision": "2383476412741cdbd31d26a0450303a4"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/index-hzDaupo-.js",
    "revision": null
  }, {
    "url": "assets/index-BYShYHRF.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "f100874e4ef9605c106949ff243d9c56"
  }, {
    "url": "icon.svg",
    "revision": "dbdc7835732f0ba3b6a80afeea7d43d4"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d28ec4661000e846defe237d5881a85f"
  }, {
    "url": "pwa-512x512.png",
    "revision": "69543eee251345913fe602c3ba3f55ef"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "da374b705014d96b568ef5081a27a091"
  }, {
    "url": "manifest.webmanifest",
    "revision": "29babab22e4f2f80153d00242ca7f063"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/api\//]
  }));

}));
