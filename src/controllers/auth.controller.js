const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    /*
      TEMP USER
      Later this comes from database
    */

    const user = {
      id: 1,
      email: "admin@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "ADMIN",
    };

    /* CHECK EMAIL */

    if (email !== user.email) {

      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });

    }

    /* CHECK PASSWORD */

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });

    }

    /* GENERATE JWT */

    const token = generateToken(user);

    return res.json({
      success: true,
      token,
      role: user.role,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  login,
};