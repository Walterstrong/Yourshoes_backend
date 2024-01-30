//Darsdagi topshiriq
console.log("**************Darsdagi topshiriq***************");
const ismlar = ["shawn", "walter", "leo", "ravshan", "john"];
const ikkiTalaba = ["shawn", "leo"];
const result = ismlar.filter((ele) => {
  if (ikkiTalaba.includes(ele)) {
    return true;
  } else return false;
});
console.log(result);
