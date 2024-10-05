module.exports = (query) => { 
   let listButton = [
      {
         name: "Tất cả",
         status: "",
         class: ""
      },
      {
         name: "Hoạt động",
         status: "active",
         class: ""
      },
      {
         name: "Dừng hoạt động",
         status: "inactive",
         class: ""
      },
   ]

   if(query.status){
      // tim kiem trong listButton = tren url ko . 
      const index = listButton.findIndex((item) => item.status == query.status)
      listButton[index].class = "active"; 
   }else {
      listButton[0].class ="active";
   } 

   // tra ve mang vua thay doi . 
   return listButton ; 
}