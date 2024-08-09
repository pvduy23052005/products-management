module.exports = (query) => { 
   let listButton = [
      {
         name: "tat ca",
         status: "",
         class: ""
      },
      {
         name: "Hoat dong",
         status: "active",
         class: ""
      },
      {
         name: "Dung hoat dong ",
         status: "unactive",
         class: ""
      },
   ]

   if(query.status){
      // tim kiem trong listButton = tren url ko . 
      const index = listButton.findIndex((item) => item.status == query.status)
      listButton[index].class = "mau"; 
   }else {
      listButton[0].class ="mau"; 
   } 

   // tra ve mang vua thay doi . 
   return listButton ; 
}