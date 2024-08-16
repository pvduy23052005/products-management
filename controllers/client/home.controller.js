


module.exports.index = async (req, res) => {
   // phuong thuc send .
   res.render("client/pages/home/index.pug", {
      pageTitle: "Trang chu"

   });
}