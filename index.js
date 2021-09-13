const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "lhsystem"
})

app.get('/herb', (req, res) => {
    db.query("SELECT * FROM herb", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

});

app.get('/symptom', (req, res) => {
    db.query("SELECT * FROM symptom", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

});

app.get('/family', (req, res) => {
    db.query("SELECT DISTINCT Family FROM herb ORDER BY Family", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });

});

app.get('/detail/:id', (req, res) => {
    var pageid = req.params.id;
    // console.log(pageid);
    var sql = "SELECT * FROM herb WHERE HID = " + pageid;
    // console.log(sql);
    var properties = "SELECT * FROM properties WHERE HID = " + pageid;
    var research = "SELECT * FROM research WHERE HID = " + pageid;
    // var chemical = "SELECT * FROM chemical WHERE HID = " + pageid;
    db.query((sql), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("true");
            res.send(result);
        }
    });
});

app.get('/symptom/:id', (req, res) => {
    var pageid = req.params.id;
    // console.log(pageid);
    var sql = "SELECT How FROM properties WHERE HID = " + pageid;
    db.query((sql), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("true");
            res.send(result);
        }
    });
});

app.get('/addmore/', (req, res) => {
    var sql = "SELECT * FROM herb WHERE HID=(SELECT max(HID) FROM herb);";
        // console.log(sql);
    db.query((sql), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("true");
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const HID = req.body.HID;
    const SPname = req.body.SPname;
    const Cname = req.body.Cname;
    const Sname = req.body.Sname;
    const Family = req.body.Family;
    const Pic = req.body.Pic;
    const Root = req.body.Root;
    const Stem = req.body.Stem;
    const Leaf = req.body.Leaf;
    const Flower = req.body.Flower;
    const Fruit = req.body.Fruit;
    const Seed = req.body.Seed;

    const Localname = req.body.Localname;
    const Region = req.body.Region;
   
    const Usetype = req.body.Usetype;
    const SymID = req.body.SymID;
    const Part = req.body.Part;
    const How = req.body.How;

    const R_HID = req.body.HID;
    const Rname = req.body.Rname;
    const Publish_years = req.body.Publish_years;
    const Rlink = req.body.Rlink;
    const Rdetail = req.body.Rdetail;

    const ChemID = req.body.ChemID;
    const Chem_name = req.body.Chem_name;
    const Chem_formular = req.body.Chem_formular;

    db.query("INSERT INTO herb (SPname, Cname, Sname, Family, Pic, Root, Stem, Leaf, Flower, Fruit, Seed) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
        [SPname, Cname, Sname, Family, Pic, Root, Stem, Leaf, Flower, Fruit, Seed],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });

    db.query("INSERT INTO properties (HID, Usetype, SymID, Part, How) VALUES(?,?,?,?,?)",
        [HID, Usetype, SymID, Part, How],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });

    db.query("INSERT INTO research (HID, Rname, Publish_years, Rlink, Rdetail) VALUES(?,?,?,?,?)",
        [R_HID, Rname, Publish_years, Rlink, Rdetail],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });

        // db.query("INSERT INTO chemical (ChemID, Chem_name, Chem_formular) VALUES(?,?,?)",
        // [ChemID, Chem_name, Chem_formular],
        // (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         res.send("Values inserted");
        //     }
        // });
})

app.put('/update', (req, res) => {
    const HID = req.body.HID;
    const SPname = req.body.SPname;
    const Cname = req.body.Cname;
    db.query("UPDATE herb SET SPname = ?,  Cname = ? WHERE HID = ?", [SPname,Cname, HID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values result");
        }
    })
})

app.delete('/delete/:HID', (req, res) => {
    const HID = req.params.HID;
    db.query("DELETE FROM herb WHERE HID =?", HID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
})