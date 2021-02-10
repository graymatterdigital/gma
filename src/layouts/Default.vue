<template lang="pug">
  .layout
    header.header
      .header__inner
        g-link.header__left(to="/")
          .header__logo
            .header__title
              h1 {{ sitename }}
        .header__right
          .search-button(ref="testBtn",@click="openSearch")
            .search-button__icon(v-html="searchIconImage")
            .search-button__text
          nav.nav
            g-link.nav__link(to="/about/") about

    //- .deco-bg
    .contents
      .contents__inner
        slot

    .copyright
      p.copyright__text ©2020 algrid ALL RIGHTS RESERVED.
  
    Search
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
// import logo from "~/assets/mud_logo.svg";
import Search from "@components/Search.vue";
import searchIcon from "@images/search.svg";
import config from "@data/config.yml";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    Search: Search,
  },
  mounted() {},
  data() {
    return {
      searchIconImage: searchIcon,
      sitename: config.sitename,
    };
  },
  computed: {
    logo() {
      return logo;
    },
  },
  methods: {
    ...mapActions("Common", ["openSearch", "closeSearch"]),
  },
};
</script>

<style lang="stylus">

.header
  position fixed
  width 100%
  height $headerHeight
  padding 0 $baseSectionMarginSide
  background-color $bgColor
  z-index $HeaderZ
  box-sizing border-box
  overflow hidden
  top 0
  +sp()
    padding 0 $baseSectionMarginSideMobile
  &__inner
    position: relative;
    width: 100%;
    height: 100%;
    border-bottom 1px solid $borderColor
    box-sizing border-box
    padding 0 $baseSectionPaddingSide
    display flex
    justify-content space-between

  &__logo
    display inline-block
    height 100%
    vertical-align middle
    &:before
      content: '';
      display: inline-block;
      vertical-align: middle;
      height: 100%;
  &__title
    display inline-block
    vertical-align middle
    font-family $LogoFont
    font-weight: 500;
    font-size: 1.65em;
    font-style: italic;
    letter-spacing -.01rem
    // letter-spacing .10rem

  &__right
    display flex
    justify-content: center; /* 子要素をflexboxにより中央に配置する */
    align-items: center;  /* 子要素をflexboxにより中央に配置する */

.nav
  display block
  // position absolute
  // top 0
  // right $baseSectionMarginSide
  // height 100%
  font-family $headerFont
  font-weight 400

  +below($mobile)
    right $baseSectionMarginSideSP
  &__link
    // display: block;
    // display inline-block
    // vertical-align middle
    +below($mobile)
      font-size 14px


.deco-bg
  width: 100%;
  margin-top: $headerHeight
  // position: absolute;
  // bottom -10px
  height 5px
  left: 0;
  // background-color: #eee;
  margin-bottom: .5rem;
  // background-image: url('~@images/bg.jpg');
  // background-size: cover;
  // background-position: center center;


.contents
  box-sizing border-box
  padding $headerHeight $baseSectionMarginSide 0
  width 100%
  padding-top: $headerHeight;
  &__inner
    padding-top: 1.75rem

  +sp()
    padding $headerHeight $baseSectionMarginSideMobile 0

.copyright
  text-align right
  padding-right: 1rem;
  &__text
    font-size 10px
</style>
