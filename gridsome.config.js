const path = require("path");
const fs = require("fs-extra");
const yaml = require("js-yaml");
require("dotenv").config();

const config = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, "./data/config.yml"), "utf8")
);

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/styles/config.styl"),
        path.resolve(__dirname, "./src/styles/mobile.styl"),
      ],
    });
}

let siteurl = `${config.protocol}://${config.domain}`;

// algolia
const collections = [
  {
    query: `{
      allArticle {
        edges {
          node {
            id
            unique
            title
            date
            path
            tags {
              id
            }
            meta {
              keywords
              description
            }
            content
          }
        }
      }
    }`,
    transformer: ({ data }) => data.allArticle.edges.map(({ node }) => node),
    indexName: process.env.GRIDSOME_ALGOLIA_INDEX_NAME || "index", // Algolia index name
    itemFormatter: (item) => {
      return {
        objectID: item.id,
        unique: item.unique,
        title: item.title,
        path: item.path,
        date: String(item.date),
      };
    }, // optional
    matchFields: ["date", "path"], // Array<String> required with PartialUpdates
  },
];

module.exports = {
  siteName: config.sitename,
  siteDescription: config.meta.description,
  siteUrl: siteurl,
  titleTemplate: config.titleTemplate,
  pathPrefix: config.pathPrefix,
  icon: {
    // favicon: "./src/assets/favicon.png",
    // touchicon: "./src/assets/favicon.png",
  },
  // plugins
  plugins: [
    { use: "gridsome-plugin-pug" },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "contents",
        path: "**/*.md",
        pathPrefix: "/static",
        typeName: "Article",
        refs: {
          tags: {
            typeName: "Tag",
            create: true,
          },
        },
        remark: {
          // remark options
          plugins: ["@gridsome/remark-prismjs"],
        },
      },
    },
    // GA
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "XXXXXXXXXX",
      },
    },
    // Algolia
    {
      use: `gridsome-plugin-algolia`,
      options: {
        appId: process.env.GRIDSOME_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        collections,
        chunkSize: 10000, // default: 1000
        enablePartialUpdates: true, // default: false
      },
    },
  ],
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
    },
  },
  templates: {
    Tag: [
      {
        path: "/tags/:id",
        component: "~/templates/Tag.vue",
      },
    ],
    Article: [
      {
        path: "/articles/:year/:month/:day/:id/:unique",
        component: "./src/templates/Article.vue",
      },
    ],
    // Works: [
    //   {
    //     path: "/works/detail/:id",
    //     component: "./src/templates/WorksDetail.vue",
    //   },
    // ],
  },

  // webpack
  chainWebpack(config) {
    // alias
    config.resolve.alias.set(`@data`, path.join(__dirname, "./data"));
    config.resolve.alias.set(`@images`, `@/assets/images`);
    config.resolve.alias.set(`@mixins`, `@/mixins`);
    config.resolve.alias.set(`@components`, `@/components`);
    config.resolve.alias.set(
      `@static`,
      path.join(__dirname, "./static/assets/images/")
    );

    config.resolve.alias.set(`@static2`, path.join(__dirname, "./static/"));
    config.resolve.alias.set(`@contents`, path.join(__dirname, "./contents"));

    // svg
    const svgRule = config.module.rule("svg");
    svgRule.uses.delete("file-loader");
    svgRule.use("svg-inline-loader").loader("svg-inline-loader");

    // yml
    config.module
      .rule("yaml")
      .test(/\.ya?ml$/)
      .type("javascript/auto")
      .use("yaml-loader")
      .loader("yaml-loader");

    // glsl
    // config.module
    //   .rule("glsl")
    //   .test(/\.(glsl|vs|fs|vert|frag)$/)
    //   .use("webpack-glsl-loader")
    //   .loader("webpack-glsl-loader")
    //   .end();

    // stylus
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) => {
      addStyleResource(config.module.rule("stylus").oneOf(type));
    });
  },
  // css loader
  css: {
    loaderOptions: {
      stylus: { preferPathResolver: `webpack` },
      postcss: {
        sourceMap: false,
        plugins: [
          require(`autoprefixer`)({
            flexbox: `no-2009`,
          }),
        ],
      },
    },
  },
};
