const axios = require("axios");

exports.getJob = async (req, res, next) => {
  try {
    const response = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`
    );
    res.status(200).json({ status: "Success", data: response.data });
  } catch (error) {
    res.status(500).json({ status: "Error", data: error });
  }
};

exports.getJobById = async (req, res, next) => {
    try {
        const response = await axios.get(
          `http://dev3.dansmultipro.co.id/api/recruitment/positions/${req.params.id}`
        );
        res.status(200).json({ status: "Success", data: response.data });
      } catch (error) {
        res.status(500).json({ status: "Error", data: error });
      }
};
