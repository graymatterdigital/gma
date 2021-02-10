<template lang="pug">
  .search-box(:class="[{ active : isSearchOpen }]")
    .search-box__overlay(@click="closeSearch")
    .search-box__main
      .search-box__input-box
        ais-instant-search.search-box__ais(:search-client='searchClient' :index-name="indexname")
          ais-configure(
            :attributesToSnippet="['bodyPlainText']",
            :hits-per-page.camel="5")

          .search-box__input-box__icon(v-html="searchIconImage")
          ais-autocomplete.search-box__ais-box
            div(slot-scope="{ currentRefinement, indices, refine }")
              input.search-box__ais-input(ref="searchInput",type="search",
                :value="currentRefinement",
                placeholder="Search the documentation",
                autocomplete="off",
                @click.esc.prevent="escapeClicked",
                @keydown.up.prevent="highlightPrevious",
                @keydown.down.prevent="highlightNext(indices[0].hits.length)",
                @keydown.enter="goToDoc(indices)",
                @input="inputHandler(refine, $event.currentTarget.value)")
          ais-hits.search-box__ais-hits
            //- .search-box__ais-hits__result Results
            g-link.search-box__ais-hits__item(v-if="item.path", slot='item' slot-scope='{ item, index }', :to="item.path", :class="[`item-index--${index}`, { highlight: index == highlightedIndex }]")
              ais-highlight(
                attribute="title",
                :hit="item",
                :class-names="{'ais-Highlight': 'MyCustomHighlight','ais-Highlight-highlighted': 'MyCustomHighlightHighlighted',}")
                //- h2 {{ item.title }}


</template>

<script>
import algoliasearch from "algoliasearch/lite";
// import "instantsearch.css/themes/algolia-min.css";
import searchIcon from "@images/search.svg";
import { mapState, mapGetters, mapActions } from "vuex";

const algoliaClient = algoliasearch(
  `${process.env.GRIDSOME_ALGOLIA_APP_ID}`,
  `${process.env.GRIDSOME_ALGOLIA_SEARCH_KEY}`
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }
    return algoliaClient.search(requests);
  },
};

export default {
  data() {
    return {
      searchClient,
      searchIconImage: searchIcon,
      highlightedIndex: -1,
      indexname: process.env.GRIDSOME_ALGOLIA_INDEX_NAME,
    };
  },
  mounted() {
    document.addEventListener("keydown", this.escapeClicked);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.escapeClicked);
  },
  watch: {
    $route(to, from) {
      this.closeSearch();
      this.resetHighlightedIndex();
    },
    isSearchOpen(isOpen) {
      if (isOpen) {
        this.$refs.searchInput.focus();
      } else {
        this.$refs.searchInput.value = "";
      }
    },
  },
  computed: {
    ...mapState("Common", {
      isSearchOpen: (state) => state.isSearchOpen,
    }),
  },
  methods: {
    ...mapActions("Common", ["openSearch", "closeSearch"]),
    inputHandler(refine, value) {
      this.resetHighlightedIndex();
      refine(value);
    },
    resetHighlightedIndex() {
      this.highlightedIndex = -1;
    },
    fucusBtnClicked() {
      this.$refs.input.focus();
    },
    escapeClicked(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        this.closeSearch();
      }
    },
    highlightPrevious() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex -= 1;
      }
    },
    highlightNext(resultsCount) {
      if (this.highlightedIndex < resultsCount - 1) {
        this.highlightedIndex += 1;
      }
    },
    goToDoc(indices) {
      if (this.highlightedIndex >= 0) {
        this.$router.push(indices[0].hits[this.highlightedIndex].path);
        this.closeSearch();
      }
    },
  },
};
</script>
<style lang="stylus">
.search-button
  display flex
  justify-content center
  align-items center
  margin-right: 20px;
  padding 4px 20px 4px 15px
  border solid 1px #aaa
  border-radius: 9999px;
  border-top-left-radius: 9999px;
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
  border-bottom-left-radius: 9999px;
  cursor pointer
  box-shadow: 0 4px 11px -2px #fff, 0 4px 6px 0 #fff;
  transition all .25s ease 0s
  font-family $UbuntuFont
  font-size $fontSSS
  &:hover
    box-shadow: 0 4px 11px -2px #ddd, 0 4px 6px 0 #ddd;

  +sp()
    padding: 3px 10px;
    margin-right: 15px;
    font-size $fontMobileSSS

  &__icon
    margin-right: 10px;
    position: relative;
    top 1px
    // +sp()
    //   margin-right: 0;
    svg
      width: 12px;
      +sp()
        width: 12px;
      *
        fill #aaa
  &__text
    color #aaa
    pointer-events none
    &:before
      content: 'Search the documentation'
      +sp()
        content: 'Search'
    // +sp()
    //   display: none;


$searchBoxHeight = 72px
.search-box
  position: fixed;
  top 0
  left 0
  width: 100%;
  height 100%
  z-index: 999999;
  box-sizing border-box
  padding 40px
  opacity 0
  transition all .25s ease 0s
  pointer-events none
  +sp()
    padding 20px
  &.active
    opacity 1.0
    pointer-events inherit

  &__main
    position: relative;
  &__input-box
    width: 100%;
    max-width 1080px
    margin: 0 auto;
    height $searchBoxHeight
    background-color: white
    border-radius 8px
    box-shadow: 0 4px 11px -2px #777, 0 4px 6px 0 #777;
    +sp()
      height 42px
    &__icon
      position: relative;
      width 60px
      padding-left 20px
      box-sizing border-box
      position: relative;
      top 1px
      +sp()
        padding-left: 20px;
        width: 0px;
      svg
        position: relative;
        top 1px
        width: 22px;
        +sp()
          width: 15px;
        *
          fill #aaa
  &__overlay
    position: absolute
    top 0
    left 0
    background-color: #000;
    width: 100%;
    height 100%
    opacity 0.22

.search-box__ais
  position: relative;
  width 100%
  height 100%
  display flex
  justify-content left
  box-sizing border-box
  align-items center

  &-box
    width: calc( 100% - 60px);
    box-sizing border-box
    padding-right: 20px;
    +sp()
      padding-left: 25px;
      width: calc( 100% - 20px);


  &-input
    width 100%
    height 100%
    font-size $fontM
    +sp()
      font-size $fontMobileS

    &::placeholder
      color #aaa


  &-hits
    position: absolute;
    top 68px
    width: 100%;
    background-color: #fff;
    font-family $UbuntuFont
    border-radius 0 0 10px 10px
    +sp()
      top 38px
    &__result
      background-color: rgba(120,120,140,0.9)
      color #fff
      font-size $fontSS
      font-weight 400
      padding 1px 20px

    &__item
      display: block;
      padding: 10px 20px;
      box-sizing border-box
      border-top solid 1px rgba(120,120,140,0.1)
      +sp()
        padding: 5px 20px;
        font-size $fontMobileSS
      &:hover, &.highlight
        background-color: #5468ff;
        color #fff

      mark
        background-color: #ddd;
</style>
