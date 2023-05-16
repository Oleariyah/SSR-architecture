import express from "express";
import coreCtrl from "../controllers/coreCtrl";

const coreRouters = express.Router();

coreRouters.get("/bank-details", coreCtrl.getBankDetails);

export default coreRouters;
