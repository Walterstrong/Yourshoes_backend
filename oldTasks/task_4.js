//4
// Izoh: Bu yerda Admin objectini hosil qildik, hamda uning ichiga ism va parol qabul qilish funksiya yaratdik,so'ng unga yangi shart belgiladik, belgilangan shartni tekshirish maqsadida 2 ta yangi Adminnning qiymatalarini kiritib funksiyani ishga tushiridik
console.log("**************to'rtinchi topshiriq***************");
const Admin = {
  adminInput(ism, password) {
    if (ism.length >= 4 && password.length >= 4) {
      console.log("WELCOME", ism);
    } else
      console.log("Iltimos eng kamida to'rt xonali ism yoki raqam kiriting!");
  },
};

Admin.adminInput("Walter", "1234");

Admin.adminInput("Lee", "111");
