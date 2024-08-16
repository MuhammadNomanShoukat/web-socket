const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>{
    res.send("generate link route")
})

module.exports = router