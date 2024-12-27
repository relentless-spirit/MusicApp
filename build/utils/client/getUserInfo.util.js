const getUserInfo = (req, res) => {
    var _a;
    const userID = ((_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.id) || null;
    return userID;
};
export default getUserInfo;
