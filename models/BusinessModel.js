const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requirements = {
  type: String,
  required: true,
};

const requirement = {
    type: String
}

const businessSchema = new Schema({
  name: requirements,
  email: requirements,
  password: requirements,
  phoneNo: requirements,
  businessName: requirement,
  businessType: requirement,
  businessAddress: requirement,
  businessState: requirement,
  businessCountry: requirement,
  noOfEmployees: {
    type: Number,
  },
  incomeExpense: [],
  invoices: [],
  projects: [],
  payrolls: [],
  accounts: [],
});

const business = mongoose.model("business", businessSchema);

module.exports = business;
