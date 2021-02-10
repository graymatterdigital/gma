<template lang="pug">
  Layout
    .container
      .entry-header
        .entry-header__left
          h1.h-title {{ $article.title }}
        .entry-header__right
          .info-block
            p.info-block__date UPDATED : {{$article.datestr}}
            .info-block__category
              .info-block__category__block( if="$article.tags", v-for="(cat, index) in $article.tags")
                g-link.link-underline(:to="cat.path") {{cat.id}}

      .catch(v-if="!isEmptyCatchImage")
        g-image.catch__image(:src="getCatchImage($article.catch)")


      .entry(v-html="$article.content")

      .pager
        g-link.pager__unit.pager__prev(v-if="$article.prevRef", :to="$article.prevRef.path") 
          span.pager__unit__header <　 
          span.link-underline {{ $article.prevRef.title }}
        g-link.pager__unit.pager__next(v-if="$article.nextRef", :to="$article.nextRef.path")
          span.link-underline {{ $article.nextRef.title }}
          span.pager__unit__header 　>

</template>
<page-query>
query ($id: ID!) {
  article(id:$id){
    id
    title
    date
    path
    catch
    meta {
      keywords
      description
    }
    tags {
      id
      path
    }
    prevRef {
      path
      title
    }
    nextRef {
      path
      title
    }
    content
  }
}
</page-query>

<script>
import Config from "@data/config.yml";
import dateformat from "dateformat";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  metaInfo() {
    return {
      title: `${this.$article.title}`,
      meta: [
        {
          name: "description",
          content: `${this.$article.meta.description}`,
        },
        {
          property: "og:title",
          content: `${this.$article.title}`,
        },
        {
          property: "og:description",
          content: `${this.$article.meta.description}`,
        },
        {
          property: "og:image",
          content: `https://${Config.domain}${this.getCatchImage(
            this.$article.catch
          )}`,
        },
        {
          name: "twitter:image",
          content: `https://${Config.domain}${this.getCatchImage(
            this.$article.catch
          )}`,
        },
        {
          name: "twitter:title",
          content: `${this.$article.title}.`,
        },
      ],
    };
  },
  data() {
    return {
      catchImage: null,
      isEmptyCatchImage: true,
      noImage: null,
    };
  },
  mounted() {
    // console.log("Config:", Config.sitename);
    this.closeSearch();
  },
  watch: {
    $route(to, from) {
      this.closeSearch();
      this.initCatchImage();
    },
  },
  updated() {},
  computed: {
    $article() {
      let date = new Date(this.$page.article.date);
      this.$page.article.datestr = dateformat(date, "mediumDate");
      return this.$page.article;
    },
  },
  methods: {
    ...mapActions("Common", ["closeSearch"]),
    initCatchImage() {
      this.catchImage = null;
      this.isEmptyCatchImage = true;
      this.getCatchImage();
    },
    getCatchImage(path) {
      // this.initCatchImage();
      if (this.catchImage == null) {
        try {
          this.catchImage = require(`!!assets-loader!@contents/${path}`).src;
          this.isEmptyCatchImage = false;
        } catch (error) {
          this.noimage = require(`!!assets-loader!@/assets/noimage.jpg`).src;
        }
      }
      return this.catchImage;
    },
  },
  beforeDestroy() {},
};
</script>

<style></style>
