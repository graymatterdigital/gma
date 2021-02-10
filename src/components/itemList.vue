<template lang="pug">
  .itemlist
    .items-container(ref="items-container")
    .unit-sizer
    //- .unit(v-for="(node, index) in $articles", :class="[`id-${index}`, {large: index%3==0 || index%3==1, mini:  (index%3 == 2) }]")
    .unit.large(v-for="(node, index) in $articles")
      .unit__header

        .entry-header
          .entry-header__left
            g-link.unit__header__link.link-opa(:to="node.path")
              h1.h-title {{node.title}}
          .entry-header__right
            .info-block
              p.info-block__date UPDATED : {{node.datestr}}
              .info-block__category
                .info-block__category__block( if="node.tags", v-for="(cat, index) in node.tags")
                  g-link.link-underline(:to="cat.path") {{cat.id}}
      .unit__body
        .unit__body__left.large
          p.unit__description.textline {{node.meta.description}}
          g-link.more.link-underline(:to="node.path") more...

          //- .unit__body__right(v-if="node.catch")
          //-   p.unit__image
          //-     //- g-image(:src="require(`!!assets-loader!@static/${node.catch}`)")
          //-     g-image(:src="node.catch")


</template>

<script>
import dateformat from "dateformat";

export default {
  // components: {
  //   DoubleBlock: DoubleBlock,
  // },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    // this.msryInit();
  },
  computed: {
    $articles() {
      return this.items.map((obj) => {
        let node = obj.node;
        let date = new Date(node.date);
        node.datestr = dateformat(date, "mediumDate");
        return node;
      });
    },
  },
  methods: {
    async msryInit() {
      let Masonry = await require("masonry-layout");
      let container = this.$refs["items-container"];
      let masonry = new Masonry(container, {
        columnWidth: ".unit-sizer",
        itemSelector: ".unit",
        percentPosition: true,
        stagger: 0,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.unit-sizer
  width 25%
.unit
  width 50%
  box-sizing border-box
  margin-bottom: 1.0rem;
  padding 0 $baseSectionPaddingSide $baseSectionPaddingSide
  +sp()
    width 100%
    padding 0 $baseSectionPaddingSideMobile $baseSectionPaddingSideMobile
  &.large
    width: 100%;
    +sp()
      width 100%
  &.mini
    width: 25%;
    +sp()
      width 100%


  &__header
    &__link
      display: block;

  &__body
    width: 100%;
    display: flex;
    +sp()
      flex-direction column-reverse
      width 100%

    ~/.mini &
      flex-direction column
      +sp()
        flex-direction column-reverse

    &__left
      width: 60%;
      box-sizing border-box
      padding-right: 1rem;
      &.large
        width: 100%;
      ~/.mini &
        width 100%
      +sp()
        width 100%
    &__right
      width: 40%;
      ~/.mini &
        width 100%
      +sp()
        width 100%

  &__image
    img
      width 100%
      height 100%
      object-fit: cover;
      filter: grayscale(50%);

  &__description
    margin-bottom: 5px;
</style>
