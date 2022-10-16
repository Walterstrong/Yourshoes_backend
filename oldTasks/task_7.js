// Bu yerda function ikkita argument qabul qilayabdi, birinchisi password, ikkinchisi telefon nomer, ikkalasi ham string bo'lishi kerak, aks holda error beradi. Agar string bo'lsa passwordni hash qilinyabdi hamda telefon nomer oxirgi 4 ta raqami yashirilgan holda ko'rsatilayabdi

const bcrypt = require("bcrypt");
const assert = require("assert");
// const Definer = require("./lib/mistake");

class Something {
  async signupData(password, phone) {
    try {
      if (typeof password !== "string") {
        console.log("Please insert a string");
      } else password;

      if (typeof phone !== "number") {
        return console.log("Please insert numbers");
      } else phone;

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      assert.ok(password, "mistake");

      if (typeof phone !== "number") {
        return err;
      } else phone;

      let phone_num = phone.toString();
      phone = phone_num.slice(0, -4) + "****";
      console.log(`
         Malumotlar qabul qilindi! password: ${password}, phone: ${phone}`);
    } catch (err) {
      throw err;
    }
  }
}

const user1 = new Something("Ikrom");
user1.signupData("afdcv2sdfdsfdsf332134", 23123123123123);
