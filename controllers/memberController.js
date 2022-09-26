const Member = require("../models/Member");
let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST:cont/signup");
    const data = req.body;
    console.log("body:", data);
    const member = new Member();
    const new_member = await member.signupData(data);

    res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST:cont/login");
    const data = req.body;
    const member = new Member();
    const natija = await member.loginData(data);

    res.json({ state: "succeed", data: natija });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont.home");
  res.send("you are at logout");
};
