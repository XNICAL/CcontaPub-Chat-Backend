const express = require("express")
const route = express.Router()

const authRoute=require("./authRoute")

route.use("/auth",authRoute)

module.exports = route