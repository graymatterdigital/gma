import Vue from 'vue'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const min = date.getMinutes()

export default {
  methods: {
    getImage(path) {
      return this.$withBase(`${path}?date=${year}${month}${day}${min}`)
    }
  },
  computed: {
    $title() {
      const page = this.$page
      const siteTitle = this.$siteTitle
      const title = (page.frontmatter.title) ? page.frontmatter.title : this.$siteTitle
      return title
    },
    $description() {
      return this.$page.frontmatter.description || this.$localeConfig.description || this.$site.description || ''
    },
    $assetImage() {
      return this.$site.themeConfig.assetImagePath
    }
  }
}

