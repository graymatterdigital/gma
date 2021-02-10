<template lang="pug">
  Layout
    .container
      h1.about-title.h-title {{title}}
      .entry.noborder(v-html="contents")

</template>
<page-query>
</page-query>

<script>
import Config from "@data/config.yml";
export default {
  metaInfo() {
    return {
      title: `About`,
      // meta: [
      //   {
      //     name: "description",
      //     content: ``,
      //   },
      //   {
      //     property: "og:title",
      //     content: ``,
      //   },
      //   {
      //     property: "og:description",
      //     content: ``,
      //   },
      //   {
      //     property: "og:image",
      //     content: ``,
      //   },
      // ],
    };
  },

  mounted() {
    // console.log(this.contents);
  },
  computed: {
    title() {
      return Config.about.title;
    },
    contents() {
      return Config.about.contents;
    },
  },
};
</script>

<page-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</page-query>

<style lang="stylus" scoped>
.about-title
  white-space pre-wrap
</style>
