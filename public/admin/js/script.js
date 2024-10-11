// thay doi url neu click .
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
   // lay ve url  
   let url = new URL(window.location.href);
   buttonStatus.forEach((button) => {
      button.addEventListener("click", () => {
         const status = button.getAttribute("button-status")
         if (status) {
            url.searchParams.set("status", status);
         } else {
            url.searchParams.delete("status");
         }
         window.location.href = url.href;
      });
   });
}

//TINH NAM TIM KIEM . 
const formSearch = document.querySelector("#form-search");
if (formSearch) {
   formSearch.addEventListener("submit", (e) => {
      // lay ra url 
      let url = new URL(window.location.href);
      // canh load lai trang . 
      e.preventDefault();
      //lay ra name = keyword o input . 
      const keyword = e.target.elements.keyword.value;
      if (keyword) {
         url.searchParams.set("keyword", keyword);
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
const buttonPase = document.querySelectorAll("[button-page]");
if (buttonPase.length != 0) {
   // lay ve url . 
   let url = new URL(window.location.href);
   // duyet qua cac buttonPage . 
   buttonPase.forEach((button) => {
      // them su kien khi click vao . 
      button.addEventListener("click", () => {
         // lay ve gia tri cua class button hien tai click . 
         const page = button.getAttribute("button-page")

         url.searchParams.set("page", page);
         window.location.href = url.href;
      });
   });
}

// UPLOAD ANH 
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
   const uploadImageInput = document.querySelector("[upload-image-input]");
   const preview = document.querySelector("[upload-image-preview]");
   uploadImageInput.addEventListener("change", (event) => {
      // tiem den files[0] trong event -> target 
      const file = event.target.files[0];

      if (file) {
         // gan lai cho private cua the img . 
         preview.src = URL.createObjectURL(file);
      }
   });
} 