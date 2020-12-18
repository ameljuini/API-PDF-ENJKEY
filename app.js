var express = require("express");
var app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
let clients = [
   {name: " Amel Juini ",
    email: "amel@weelo.io",
    amount: "100€",
    message: "Happy New Year",
    num: "14745577551452",
    date:"01/01/2021",
    img:"img/Ambre.png",
}

   
];
app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get("/generateReport", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "template2.ejs"), {clients: clients}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
        let options = { format: 'A4' 
       /* let options = {
            "height": "12.25in",
            "width": "10.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },*/
        }; 
        
        pdf.create(data, options).toFile("giftcard.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send("File created successfully");
            }
        });
    }
});
})
app.listen(3000);
