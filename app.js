const express = require('express')
const bodyparser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose');
const request = require("request");

const app = express();
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public/'));
app.use(bodyparser.urlencoded({ extended: true }))



// Mongodb connection url
mongoose.connect("mongodb://localhost:27017/erp_data", { useNewUrlParser: true })

const erpSchema = new mongoose.Schema({

    weekly: Number,
    currDate: Number,
    machines: Number,
    effectiveness: Number,
    availability: Number


});
const machineSchema = new mongoose.Schema({

    partnumber: Number,
    partname: String,
    ponumber: Number,
    qty: Number,
    materialdate: String,
    inhouse: [{
        settingnumber: Number,
        desc: String,
        machinename: String,
        cycletime: Number,
    }],
    outsource: [{
        processname: String,
        outdisc: String,
        suppliername: String
    }]

});

const erpData = mongoose.model("erpData", erpSchema)
const machineData = mongoose.model("machineData", machineSchema)


app.get("/", function(req, res) {
    res.render("superadmin")

    erpData.find({}, function(err, cardsdata) {
        res.render("superadmin", {
            posts: cardsdata
        });
    });
})

app.get("/admin", function(req, res) {
    res.render("admin")
})

app.get("/dataaddition", function(req, res) {
    res.render("dataaddition")
})

app.post("/dataaddition", function(req, res) {
    const partnumber = req.body.partnumber
    const partname = req.body.partname
    const quantity = req.body.quantity
    const settingnumber = req.body.selection
    const materialdate = req.body.materialdate
    const machinename = req.body.machinename
    const cycletime = req.body.cycletime
    const totaktimereq = req.body.totaltimerequired

    const data1 = new machineData({
        partnumber: partnumber,
        partname: partname,
        settingnumber: settingnumber,
        machinename: machinename,
        quantity: quantity,
        cycletime: cycletime,
        totaltimerequired: totaktimereq,
        materialdate: materialdate

    })
    data1.save()
    res.redirect("/dataaddition")
})

app.post("/admin", function(req, res) {
    const week = req.body.week
    const mac = req.body.mac
    const crrdt = req.body.crrdt
    const totalHoursForWeek = 120 * mac
    const effectiveness = (week / totalHoursForWeek) * 100
    const availability = ((totalHoursForWeek - week) / totalHoursForWeek) * 100


    const data = new erpData({
        weekly: week,
        currDate: crrdt,
        machines: mac,
        effectiveness: effectiveness,
        availability: availability

    })
    data.save()
    res.redirect("/")
})

app.listen(process.env.PORT || 1000, function() {
    console.log("server is running successfully on port made by om kadam && Raj Marde");
})

/*

{
    id: 234bhghc2g3423kjb11,
    name: om,
    gender: male,
    interested: ice and fire

}

{
    id: 234bhghc2g3423kjb11,
    name: manthan,
    gender: male,
    interested: ice and fire
    
}

{
    id: 234bhghc2g3423kjb11,
    name: rohini,
    gender: female,
    interested: ice and fire
    
}







*/