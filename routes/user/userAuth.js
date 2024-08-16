const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>{
    res.send("user auth route")
})

module.exports = router