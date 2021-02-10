import DefaultLayout from "~/layouts/Default.vue";

// Global CSS
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import "~/styles/index.styl";

// vuex
import store from "./script/createStore";

// vmodal
// import VModal from "vue-js-modal/dist/ssr.nocss";
// import "vue-js-modal/dist/styles.css";

// masonry

// inifinite
import InfiniteLoading from "vue-infinite-loading";

// Algolia
import InstantSearch from "vue-instantsearch";
import "instantsearch.css/themes/reset.css";
// or include the full Algolia theme
// import "instantsearch.css/themes/algolia.css";

// Config
import Config from "@data/config.yml";

export default function(Vue, { appOptions, head, isClient, router }) {
  appOptions.store = store;

  head.htmlAttrs = { lang: "ja" };
  [
    {
      name: "keywords",
      content: `${Config.meta.keywords}`,
    },
    {
      name: "description",
      content: `${Config.meta.description}`,
    },
    {
      property: "og:title",
      content: `${Config.sitename}`,
    },
    {
      property: "og:description",
      content: `${Config.meta.description}`,
    },
    {
      property: "og:image",
      content: `${Config.url}/assets/images/og.jpg`,
    },
    {
      name: "twitter:image",
      content: `${Config.url}/assets/images/og.jpg`,
    },
    {
      name: "twitter:title",
      content: `${Config.sitename}`,
    },
  ].forEach((meta) => {
    head.meta.push(meta);
  });

  Vue.component("Layout", DefaultLayout);
  Vue.use(InfiniteLoading);
  Vue.use(InstantSearch);

  // Vue.use(VModal, {});
}
