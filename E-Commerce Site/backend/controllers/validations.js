// const { check } = require("express-validator");

// // Name Validator
// const nameValidator = check("name")
// 	.notEmpty()
// 	.withMessage("Name is mandatory")
// 	.trim()
// 	.isLength({ min: 2 })
// 	.withMessage("Name should be minium 2 chars")
// 	.matches(/^[a-zA-Z\s]+$/)
// 	.withMessage("Name should only contain english alphabets");

// // Email Validator
// const emailValidator = check("email")
// 	.isEmail()
// 	.withMessage("Please enter a valid email")

// // Password Validator
// const passwordValidator = check("password")
// 	.trim()
// 	.isLength({ min: 8 })
// 	.withMessage("Password should be minium 8 chars")
// 	// .matches(/[a-z]/)
// 	// .withMessage("Password should have atleast one small alphabet")
// 	// .matches(/[A-Z]/)
// 	// .withMessage("Password should have atleast one capital alphabet")
// 	// .matches(/[!@#$%^&*_":?]/)
// 	// .withMessage("Password should have atleast one Special Character");

// // Confirm Password Validator
// const confirmPasswordValidator = check("confirmPassword")
// 	.trim()
// 	.custom((value, { req }) => {
// 		if (value !== req.body.password) {
// 			throw new Error("Confirm Password does not match Password");
// 		}
// 		return true;
// 	});

// module.exports = {
// 	nameValidator,
// 	emailValidator,
// 	passwordValidator,
// 	confirmPasswordValidator,
// };
