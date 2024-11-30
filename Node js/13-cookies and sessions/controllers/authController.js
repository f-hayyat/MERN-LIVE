exports.getLogin = (req, res, next) => {
    res.render("auth/login", { editing: false, pageTitle: "Login", isLoggedIn: false});
};

exports.postLogin = (req, res, next) => {
    console.log("email:", req.body.email);
    console.log("password:", req.body.password);
    req.session.isLoggedIn = true;
    res.redirect("/")};

exports.postLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/login")};
