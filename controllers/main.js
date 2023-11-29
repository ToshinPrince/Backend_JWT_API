const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  //ways to check if username and password is provided or not to give error message
  //mongodb - or and database will give error by default
  //joi - web pack
  //check in the controller - This is what we are doing below, because initailly we are not connecting to the data base, will do in future update

  if (!username || !password) {
    throw new CustomAPIError("Please Provide username and password", 400);
  }

  //just for demo, normally provided by DB
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  const luckeyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello, joy polo`,
    secret: `Here is your authorised data, here is your luckey Number ${luckeyNumber}`,
  });
};

module.exports = { login, dashboard };
