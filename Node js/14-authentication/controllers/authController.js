const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    editing: false,
    pageTitle: "Login",
    isLoggedIn: false,
  });
};

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
  const password = req.body.password;
  try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(422).render("auth/login", {
            editing: false,
            pageTitle: "Login",
            isLoggedIn: false,
            errors: [{msg:"Invalid email or password"}],
        });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(422).render("auth/login", {
            editing: false,
            pageTitle: "Login",
            isLoggedIn: false,
            errors: [{msg:"Invalid email or password"}],
        });
        }
        req.session.user = user;
        req.session.isLoggedIn = true;
        await req.session.save();
        res.redirect("/");
  } catch (error) {
        res.status(500).render("auth/login", {
        editing: false,
        pageTitle: "Login", 
        isLoggedIn: false,
        errors: "An error occurred. Please try again."
        });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    editing: false,
    pageTitle: "Signup", // Fixed page title
    isLoggedIn: false,
  });
};

exports.postSignup = [
  // First Name Validator
  check("firstName")
    .notEmpty()
    .withMessage("First name is mandatory")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name should be minimum 2 chars") // Fixed typo
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First Name should only contain English alphabets"), // Fixed typo

  // Last Name Validator
  check("lastName")
    .notEmpty() // Added required validation
    .withMessage("Last name is mandatory")
    .trim()
    .matches(/^[a-zA-Z\s]+$/) // Changed to require at least one character
    .withMessage("Last Name should only contain English alphabets"), // Fixed typo

  // Email Validator
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value) => {
      const userDoc = await User.findOne({ email: value });
      if (userDoc) {
        throw new Error("Email already exists. Please try another email.");
      }
      return true;
    }),
  // Password Validator
  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password should be minimum 8 chars") // Fixed typo
    .matches(/[a-z]/)
    .withMessage("Password should have at least one small alphabet") // Fixed typo
    .matches(/[A-Z]/)
    .withMessage("Password should have at least one capital alphabet") // Fixed typo
    .matches(/[!@#$%^&*_":?]/)
    .withMessage("Password should have at least one Special Character"), // Fixed typo

  // Confirm Password Validator
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),

  // User Type Validator
  check("userType")
    .trim()
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("User type is invalid"),

  // Terms Validator (fixed comment)
  check("terms")
    .notEmpty()
    .withMessage("Terms and Conditions must be accepted"),

  async (req, res, next) => { // Made the function async
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: false,
        errors: errors.array(),
        oldInput: req.body,
      });
    }

    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
      });
      
      const hashedPassword = await bcrypt.hash(newUser.password, 12);
      newUser.password = hashedPassword;

      await newUser.save();
      console.log("User created");
      res.redirect("/login");
      
    } catch (err) {
      console.log("Error while creating user", err);
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: false,
        errors: [{ msg: "Error creating user. Please try again." }],
        oldInput: req.body,
      });
    }
  }
];
