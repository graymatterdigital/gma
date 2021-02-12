<template lang="pug">
  Layout
    .articles
      transitionGroup(name="fade")
        ItemLimt(:items="loadedPosts", :key="1")
      ClientOnly
        infinite-loading(@infinite="infiniteHandler",spinner="spiral")
          div(slot="no-more") You've scrolled through all the posts ;)
          div(slot="no-results") Sorry, no posts yet :(

</template>
<page-query>
query($page: Int) {
  posts: allArticle(perPage: 3, page: $page, sortBy: "date", order: DESC) @paginate {
    pageInfo{
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date
        path
        catch
        meta {
          description
        }
        tags {
          id
          path
        }
        content
      }
    }
  }
}
</page-query>

<script>
import itemLimt from "@components/itemList.vue";
import InfiniteScrollMixin from "@mixins/InfiniteScrollMixin.js";

export default {
  components: {
    ItemLimt: itemLimt,
  },
  mixins: [InfiniteScrollMixin],
  metaInfo() {
    return {
      title: `Home`,
      meta: [
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
      ],
    };
  },
  computed: {},
  async mounted() {},
  methods: {},
  beforeDestroy() {},
};
</script>

<style lang="stylus" scoped></style>
