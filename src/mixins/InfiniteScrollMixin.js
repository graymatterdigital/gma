export default {
  data() {
    return {
      loadedPosts: [],
      currentPage: 1,
    };
  },
  computed: {
    fetchEndpoint() {
      return ``;
    },
  },
  watch: {
    $route(to, from) {
      this.refleshPosts();
    },
  },
  created() {
    this.infiniteInit();
  },
  methods: {
    infiniteInit() {
      this.loadedPosts.push(...this.$page.posts.edges);
    },
    refleshPosts() {
      this.currentPage = 1;
      this.loadedPosts = [];
      if (this.$refs.InfiniteLoading) {
        this.$refs.InfiniteLoading.stateChanger.reset();
      }
      if (this.$page.posts) {
        this.loadedPosts.push(...this.$page.posts.edges);
      }
    },
    wait() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
    async fetch() {
      const { data } = await this.$fetch(
        `${this.fetchEndpoint}/${this.currentPage + 1}`
      );
      return data;
    },
    async infiniteHandler($state) {
      if (this.currentPage + 1 > this.$page.posts.pageInfo.totalPages) {
        $state.complete();
      } else {
        await this.wait();
        const data = await this.fetch();

        if (data.posts.edges.length) {
          this.currentPage = data.posts.pageInfo.currentPage;
          this.loadedPosts.push(...data.posts.edges);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },
  },
};
