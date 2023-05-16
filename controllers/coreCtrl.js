//import axios from "axios";
import { validateOTP } from "../validation";

const coreCtrl = {
  getBankDetails: async (req, res) => {
    try {
      res.status(200).json({
        bank_code: "001",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  validateOTP: async (req, res) => {
    try {
      const { otp } = req.body;
      if (!validateOTP(otp))
        return res
          .status(400)
          .json({ message: "Please, provide a valid otp." });

      res.status(200).json({
        bank_code: "001",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default coreCtrl;
