const path = require("path");
const { GraphQLSchema } = require("gridsome/graphql");

const addPageRefs = function(actions, nodes, collection) {
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    // node.prevRef = "";
    // node.nextRef = "";

    if (index != 0) {
      // next
      let nextNode = nodes[index - 1];
      let nextRef = actions.store.createReference("Article", nextNode.id);
      node.nextRef = nextRef;
    }

    if (index != nodes.length - 1) {
      // prev
      let prevNode = nodes[index + 1];
      let prevRef = actions.store.createReference("Article", prevNode.id);
      node.prevRef = prevRef;
    }

    collection.updateNode(node);
  }
};

const checkPublish = function(actions, nodes, collection) {
  if (process.env.NODE_ENV === "production") {
    nodes.forEach((node) => {
      if (node.published !== true) {
        collection.removeNode(node.id);
      }
    });
  }
};

module.exports = function(api) {
  api.loadSource(async (actions) => {
    // update collection
    let articleCollection = actions.getCollection("Article");
    let articleNodes = articleCollection.data();

    // check publish
    checkPublish(actions, articleNodes, articleCollection);

    // add pager refs
    addPageRefs(
      actions,
      articleCollection.data(),
      actions.getCollection("Article")
    );
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
