const express = require("express");
const {
    addBusinessPlan,
    getBusinessPlan,
    getAllBusinessPlan,
    updateBusinessPlan,
    deleteBusinessPlan
  
} = require("../controllers/businessPlanController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/addBusinessPlan")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addBusinessPlan);
router
  .route("/getBusinessPlan")
  .post(isAuthenticatedUser, authorizeRoles("admin"), getBusinessPlan);
router
  .route("/getAllBusinessPlan")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllBusinessPlan);
router
  .route("/updateBusinessPlan")
  .post(isAuthenticatedUser, authorizeRoles("admin"), updateBusinessPlan);
router
  .route("/deleteBusinessPlan")
  .post(isAuthenticatedUser, authorizeRoles("admin"), deleteBusinessPlan);


module.exports = router;
