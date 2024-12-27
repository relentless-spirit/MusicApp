export const index = (req, res) => {
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Dashboard page"
    });
};
