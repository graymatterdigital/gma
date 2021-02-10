<template lang="pug">
  Layout
    .articles
      transitionGroup(name="fade")
        ItemLimt(:items="loadedPosts", key="tag")
      ClientOnly
        infinite-loading(@infinite="infiniteHandler",spinner="spiral", ref="InfiniteLoading")
          div(slot="no-more") You've scrolled through all the posts ;)
          div(slot="no-results") Sorry, no posts yet :(

</template>
<page-query>
query($id: ID!, $page: Int) {
  allTag(filter: { id : { eq : $id }}) {
    edges {
      node {
        id
      }
    }
  }

  posts: allArticle(filter: { tags: { contains: [$id] }}, perPage: 3, page: $page) @paginate {
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
      title: `${this.tagID}`,
    };
  },
  computed: {
    tagID() {
      return this.$page.allTag.edges[0].node.id;
    },
    fetchEndpoint() {
      return `/tags/${this.tagID}`;
    },
  },
  async mounted() {},
  methods: {},
  beforeDestroy() {},
};
</script>

<style lang="stylus" scoped></style>
