const { createProduct, createReview } = require("../utils/product-database");

module.exports = () => {
  const io = require("socket.io")(strapi.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", function (socket) {
    // send message on user connection
    socket.emit("hello", { message: "Welcome to my website" });

    socket.on("addProduct", async ({ name, description }, callback) => {
      try {
        const product = await createProduct({
          name,
          description,
        });

        if (product) {
          callback(product);
          socket.broadcast.emit("newProductAdded", { product });
        }
      } catch (err) {
        console.log({ err });
        callback({ type: "error", message: err });
        console.log("Error occured. Please try again");
      }
    });

    socket.on("addReview", async ({ productId, name, comment }, callback) => {
      try {
        const review = await createReview({
          productId,
          name,
          comment,
        });

        if (review) {
          callback(review);
          socket.broadcast.emit("newReviewAdded", { review });
        }
      } catch (err) {
        console.log({ err });
        callback({ type: "error", message: err });
        console.log("Error occured. Please try again");
      }
    });
  });
};
