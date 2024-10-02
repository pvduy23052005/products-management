// permission 
const table = document.querySelector("[table-permissions]");
if (table) {

   // lay ra cai button 
   const buttonSubmit = document.querySelector("[button-submit]");
   buttonSubmit.addEventListener("click", () => {
      // tao1 mang 
      let permissions = [];
      const rows = table.querySelectorAll("[data-name]");

      // lap qua tung data-nem 
      rows.forEach((row) => {
         const name = row.getAttribute("data-name");
         const inputs = row.querySelectorAll("input");

         if (name == "id") {
            inputs.forEach((input) => {
               const id = input.getAttribute("value");
               permissions.push(
                  {
                     id: id,
                     permissions: []
                  });
            });
         }
         else {
            inputs.forEach((input, index) => {
               // lay ra input a nhat . 
               const checked = input.checked;
               if (checked) {
                  permissions[index].permissions.push(name);
               }
            })
         }

      });
      if (permissions.length > 0) {
         // lay ra input 
         const formChange = document.querySelector("#form-change-permissions");
         const input = formChange.querySelector("input");
         // chuyen ve dang json = ham JSON.stringify("string"); 
         // chuyen tu js -> json = ham JSON.stringify(); 
         input.value = JSON.stringify(permissions);
         formChange.submit();
      }
   });
}

// hien thi nhung o input da tich . 
const dataRecord = document.querySelector("[data-records]");
if (dataRecord) {
   const records = JSON.parse(dataRecord.getAttribute("data-records"));
   //loc qua tung nhom quye 
   records.forEach((record, index) => {
      const permissions = record.permissions;
      permissions.forEach((permissions) => {
         // lay ve row == permission
         const row = table.querySelector(`[data-name="${permissions}"]`);
         // lay ra input da check 
         const input = row.querySelectorAll("input")[index];
         input.checked = true;
      });
   });
}