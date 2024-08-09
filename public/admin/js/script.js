// thay doi url neu click .
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length != 0) {
   // lay ra url 
   let url = new URL(window.location.href);
   // duyet qua cac button . 
   buttonStatus.forEach((button) => {
      button.addEventListener("click", () => {
         // lay ra gia tri thuoc tinh . 
         const status = button.getAttribute("button-status");
         if (status) {
            // thay gia tri cua status  . (ham searchParams.set())
            url.searchParams.set("status", status);
         }
         else {
            url.searchParams.delete("status");
         }
         // cap nhat lai url . 
         window.location.href = url.href;
      });
   });
}

//TINH NAM TIM KIEM . 
const formSearch = document.querySelector("#form-search"); 
if( formSearch){
   formSearch.addEventListener("submit" , (e) => {
      // lay ra url 
      let url = new URL(window.location.href); 
      e.preventDefault(); 
      //lay ra name = keyword o input . 
      const keyword = e.target.elements.keyword.value;  
      if( keyword){
         url.searchParams.set("keyword" , keyword); 
      }
      else {
         url.searchParams.delete("keyword"); 
      }
      
      // cap nhap lai url . 
      window.location.href = url.href; 
   }); 
}
//-------------------------------------------------------------------

// TINH NANG PHAN TRANG . 
// lay ve cac buttonPase 

const buttonPase = document.querySelectorAll("[button-page]"); 
if(buttonPase.length != 0){
   // lay ve url . 
   let url = new URL(window.location.href); 
   // duyet qua cac buttonPage . 
   buttonPase.forEach( (button) => {
      // them su kien khi click vao . 
      button.addEventListener("click" ,() =>{
         // lay ve gia tri cua class button hien tai click . 
         const page = button.getAttribute("button-page")

         url.searchParams.set("page" , page); 
         window.location.href = url.href; 
      }); 
   }); 
}