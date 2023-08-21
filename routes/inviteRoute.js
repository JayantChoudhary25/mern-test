const express = require("express");
const {
    sendInvite,
    agreementStatus,
    inviteUser,
    userTrueNDA,
    userFalseNDA,
    getAllUser,
    subscribedUser
  
} = require("../controllers/InviteController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/sendInvite").post(sendInvite);

router.route("/agreementStatus").post(agreementStatus);

router
  .route("/inviteUser")
  .post(isAuthenticatedUser, authorizeRoles("admin"), inviteUser);
router
  .route("/userTrueNDA")
  .get(isAuthenticatedUser, authorizeRoles("admin"), userTrueNDA);
router
  .route("/userFalseNDA")
  .get(isAuthenticatedUser, authorizeRoles("admin"), userFalseNDA);
router
  .route("/getAllUser")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/subscribedUser")
  .get(isAuthenticatedUser, authorizeRoles("admin"), subscribedUser);


module.exports = router;
