let memberController = module.exports;

memberController.home = (req, res) => {
  console.log("GET cont.home");
  res.send("you are at home");
};

memberController.signup = (req, res) => {
  console.log("POS cont.home");
  res.send("you are at signup");
};

memberController.login = (req, res) => {
  console.log("POS cont.home");
  res.send("you are at login");
};

memberController.logout = (req, res) => {
  console.log("GET cont.home");
  res.send("you are at logout");
};
