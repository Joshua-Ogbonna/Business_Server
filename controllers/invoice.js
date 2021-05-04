const Invoice = require("../models/Invoice");
exports.postInvoice = async (req, res, next) => {
  try {
    const { type, description, amount } = req.body;

    const newInvoice = new Invoice({
      type,
      description,
      amount,
    });

    const savedInvoice = await newInvoice.save();
    res.json({ success: true, data: savedInvoice });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false });
  }
};
