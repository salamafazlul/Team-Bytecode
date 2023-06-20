const express = require("express");
const router = express.Router();
const { Customers } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listOfCustomers = await Customers.findAll();
    res.json(listOfCustomers);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

router.post("/", async (req, res) => {
  const customerData = req.body;
  try {
    const createdCustomer = await Customers.create(customerData);
    res.json(createdCustomer);
  } catch (error) {
    console.error("Failed to save customer:", error);
    res.status(500).json({ error: "Failed to save customer" });
  }
});

router.put("/:id", async (req, res) => {
  const customerId = req.params.id;
  const updatedCustomerData = req.body;
  try {
    const updatedCustomer = await Customers.update(updatedCustomerData, {
      where: { id: customerId },
    });
    if (updatedCustomer[0] === 1) {
      res.json({ message: "Customer updated successfully" });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    console.error("Failed to update customer:", error);
    res.status(500).json({ error: "Failed to update customer" });
  }
});

router.delete("/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const deletedCustomer = await Customers.destroy({
      where: { id: customerId },
    });
    if (deletedCustomer) {
      res.json({ message: "Customer removed successfully" });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    console.error("Failed to remove customer:", error);
    res.status(500).json({ error: "Failed to remove customer" });
  }
});

module.exports = router;
