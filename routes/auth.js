const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  adminregister,
  adminlogin,
  isAuthuser,
  get_all_user,
  dashboard,
  selectproduct,
  authorizeRoles,
  get_product_activity,
  inviteuser,
  singleInvite,
  getuserrDetail,
  get_all_products,
  invitation_list,
  first_login_users,
  add_product,
  delete_product,
  update_product,
  subscription_list,
  uploadImage,
  exportUser,
  exportSubscription,
  forgotPassword,
  resetPassword,
  emailTemplate,
  monthlyUserCount,
  userSelectedProducts,
  userWithoutSelectedProducts,
  clearMessages,
  getMessages
} = require("../controllers/auth.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/adminregister").post(adminregister);
router.route("/adminlogin").post(adminlogin);
router.route("/sendInvite").post(adminlogin);
router.route("/selectProduct").post(isAuthuser,selectproduct);
router.route("/clearMessages").post(isAuthuser,authorizeRoles("Admin"),clearMessages);
router.route("/getMessages").get(isAuthuser,authorizeRoles("Admin"),getMessages);
router.route("/get_all_user").post(isAuthuser,authorizeRoles("Admin"),get_all_user);
router.route("/monthlyUserCount").get(monthlyUserCount)
router.route("/user-selected-products").get(userSelectedProducts)
router.route("/user-without-products").get(userWithoutSelectedProducts)
router.route("/get_product_activity").post(isAuthuser,authorizeRoles("Admin"),get_product_activity)
router.route("/get_all_products").get(isAuthuser,get_all_products)
router.route("/invitation_list").get(isAuthuser,authorizeRoles("Admin"),invitation_list)
router.route("/first_login_users").get(isAuthuser,authorizeRoles("Admin"),first_login_users)
router.route("/add_product").post(isAuthuser,authorizeRoles("Admin"),add_product)
router.route("/update_product").post(isAuthuser,authorizeRoles("Admin"),update_product)
router.route("/delete_product").post(isAuthuser,authorizeRoles("Admin"),delete_product)
router.route("/subscription_list").post(isAuthuser,authorizeRoles("Admin"),subscription_list)
router.route("/uploadImage").post(isAuthuser,authorizeRoles("Admin"),uploadImage)
router.route("/exportUser").get(isAuthuser,authorizeRoles("Admin"),exportUser)
router.route("/exportSubscription/:_id").get(isAuthuser,authorizeRoles("Admin"),exportSubscription)
router.route("/emailTemplate").post(isAuthuser,authorizeRoles("Admin"),emailTemplate)
router.route("/forgotPassword").post(forgotPassword)
router.route("/resetPassword").post(resetPassword)
router.route('/invite_user').post(isAuthuser,authorizeRoles("Admin"),inviteuser)
router.route('/singleInvite').post(isAuthuser,authorizeRoles("Admin"),singleInvite)
router.route('/getuserrDetail').get(isAuthuser,authorizeRoles("Admin"),getuserrDetail)
router.route("/me").get(isAuthuser, dashboard);

module.exports = router;
