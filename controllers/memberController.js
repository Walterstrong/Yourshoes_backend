const Member = require("../models/Member");
let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST:cont/signup");
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);

    res.send("done");
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
  }
};

memberController.login = (req, res) => {
  console.log("POS cont.home");
  res.send("you are at login");
};

memberController.logout = (req, res) => {
  console.log("GET cont.home");
  res.send("you are at logout");
};
