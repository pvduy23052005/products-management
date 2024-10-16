// code trang thai thay doi san pham
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
   // lay ra the from 
   const fromStatus = document.querySelector("#from-change-status");
   const path = fromStatus.getAttribute("data-path");
   buttonChangeStatus.forEach((button) => {
      // bat su kien cho cac nut . 
      button.addEventListener("click", () => {

         //lay ra trang thai cua san pham . 
         const dataStatus = button.getAttribute("data-status");
         //lay ve id san pham . 
         const dataId = button.getAttribute("data-id");
         // doi lai status . 
         const newStatus = (dataStatus == "active" ? "inactive" : "active");

         // chuyen action
         const action = path + `/${newStatus}/${dataId}?_method=PATCH`
         // gan lai action from. 
         fromStatus.action = action;

         // su dung ham submit . 
         fromStatus.submit();
      });
   });
}

// TINH NANG THAY DOI TRANG THAI SAN PHAM . 
const tableMulti = document.querySelector("[checkbox-multi]");
if (tableMulti) {
   // lay ra cai checkAll
   const checkAll = tableMulti.querySelector("input[name='checkAll']");
   // lay ve khac checkbox con . 
   const checkboxId = tableMulti.querySelectorAll("input[name='id']");
   // click vao all => chon tat ca products . 
   checkAll.addEventListener("click", () => {
      // neu chon 
      if (checkAll.checked == true) {
         checkboxId.forEach((input) => {
            input.checked = true;
         });
      } else {// neu ko chon . 
         checkboxId.forEach((input) => {
            input.checked = false;
         });
      }
   });

   // bat su kien cho tung o input 1 . 
   checkboxId.forEach((input) => {
      input.addEventListener("click", () => {         // lay ra o input da click . 
         let count = tableMulti.querySelectorAll("input[name='id']:checked").length;
         if (count == 4) {
            checkAll.checked = true;
         }
         else {
            checkAll.checked = false;
         }

      });
   });
}

// LAY VE FORM
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
   formChangeMulti.addEventListener("submit", (event) => {
      // ngan chan lai load lai trang . 
      event.preventDefault();
      // lay ve table . 
      const tableMulti1 = document.querySelector("[checkbox-multi]");
      // lay ra cac check box da tich . 
      const checkboxId1 = tableMulti1.querySelectorAll("input[name='id']:checked");

      // lay ra cai da chon 
      const typeChange = event.target.elements.type.value;

      if (typeChange === "delete-all") {
         const check = confirm("Bạn có muốn xóa sản phẩm này không !");
         // neu an  .   
         if (!check) {
            return;
         }
      }

      // neu nguoi dung click moi su ly . 
      if (checkboxId1.length > 0) {
         let listId = [];
         // lay ra input cho name = "ids", 
         const inputIds = formChangeMulti.querySelector("input[name='ids']");

         checkboxId1.forEach((input) => {
            const id = input.value;
            if (typeChange === "change-position") {
               // lay ra input vi tri . 
               // Su dung ham closest("")  : 
               const position = input
                  .closest("tr")// lay ra cac tr (.) table . 
                  .querySelector("input[name='position']").value;

               // day id cao 
               listId.push(`${id}-${position}`);
            }
            else {
               listId.push(id);
            }
         });
         // chuyen qua dang string . 
         const stringId = listId.join(", ");
         // gan lai . 
         inputIds.value = stringId;

         // goi den de submit . 
         formChangeMulti.submit();
      } else {
         alert("Chọn ít nhất 1 bản ghi");
      }

   });
}

// TINH NANG XOA 1 SAN PHAM . 
const buttonDelete = document.querySelectorAll("[button-delete");
if (buttonDelete.length > 0) {
   const formDelete = document.querySelector("#from-change-item");
   const path = formDelete.getAttribute("data-path");
   buttonDelete.forEach((button) => {
      button.addEventListener("click", () => {
         //su dung Ham confirm . 
         const check = confirm("Ban co chan muon xoa khong .");
         // check xem client an ok khong . 
         if (check) {
            // lay ra id 
            const id = button.getAttribute("data-id");
            // gui len sever . 
            const action = path + `/${id}?_method=PATCH`;
            formDelete.action = action;
            // lay len submit . 
            formDelete.submit();
         }
      });

   });
}

// TINH NANG CAP ( IN RA THONG BAO . )
const show = document.querySelector("[show-alert]");
if (show) {
   const time = parseInt(show.getAttribute("data-time"));
   const close = show.querySelector("[close-alert]");
   setTimeout(() => {
      // de an thong bao sau 5s  
      show.classList.add("alert-hidden");
   }, time);

   // neu vao thi an thong bao luong . 
   close.addEventListener("click", () => {
      show.classList.add("alert-hidden");
   });
}

// TINH NANG SORT .
const sort = document.querySelector(".sort");
const sortHead = document.querySelector(".sort-head") ; 
console.log(sortHead) ;  
if (sort) {
   let url = new URL(window.location.href);
   const sortSelect = sort.querySelector("[sort-select]");
   const sortClear = sortHead.querySelector("[sort-clear]");

   // nang nghe su kien thay doi . 
   sortSelect.addEventListener("change", (event) => {
      const value = event.target.value;
      const [sortKey, sortValue] = value.split('-');
      // them cac key cho url . 
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);

      // cap nhat url . 
      window.location.href = url.href;

   });

   //CLEAR
   sortClear.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      url.searchParams.delete("supplier"); 

      window.location.href = url.href;
   });

   // them selected cho option
   const sortKey = url.searchParams.get("sortKey");
   const sortValue = url.searchParams.get("sortValue");
   // neu no ton tai .      
   if (sortKey && sortValue) {
      const stringSort = `${sortKey}-${sortValue}`;
      // lay ra client chon 
      const daChon = sortSelect.querySelector(`option[value='${stringSort}']`);
      daChon.setAttribute("selected", true);
   }
}

// LOC THEO NHA CUNG CAP .
const supplierSelect = document.querySelector("[supplier-select ]");
if (supplierSelect) {
   const url = new URL(window.location.href);
   console.log(supplierSelect); 
   supplierSelect.addEventListener("change", (event) => { 
      var value = event.target.value;
      const supplier = value;
      if (supplier) {
         url.searchParams.set("supplier", supplier);
      }
      window.location.href = url.href;
   });

   const valueOption = url.searchParams.get("supplier"); 
   // neu no ton ta .
   if (valueOption) {
      // Lấy ra client chọn 
      const checked = supplierSelect.querySelector(`option[value='${valueOption}']`); 
      console.log(checked); 
      if (checked) {
         checked.setAttribute("selected", true);
      } else {
         console.warn(`Không tìm thhấy option với giá trị: ${supplier}`);
      }
   }
}