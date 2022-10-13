//Bu yerda berilgan string qiymat function ichiga pass qilinayabdi. Function shartiga esa, string nechta harf hamda sonlardan tashkil topganligini object sifatida qaytarish logicasi kiritilgan.

let string = "1133As";

function test(string) {
  const raqamlarSoni = string.replace(/[^0-9]/g, "").length;
  const harflarSoni = string.replace(/[^a-zA-Z]/g, "").length;
  const natija = { digits: raqamlarSoni, letters: harflarSoni };

  return natija;
}

const result = test(string);

console.log("javob:", result);
