var mongoose = require("mongoose");
var Reservation = require("./customer");
const express = require("express");
const bodyParser = require("body-parser");
var alert = require("alert");

//connection to mongoDb
mongoose.connect(
  "mongodb+srv://ozerbey:test@networkprogramming.xlvrw.mongodb.net/Restaurants?retryWrites=true&w=majority",
  (error) => {
    if (!error) {
      console.log("Connected to mongoDB ✓");
    } else {
      console.log("!! DO NOT CONNECT TO DATABASE ✘");
    }
    console.log();
  }
);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/myReservations", (req, res) => {
  //console.log(req.body);
  // getReservationDatas(req.body);
});

app.post("/reservation", (req, res, next) => {
  const reservation = new Reservation(req.body);
  if (reservation.tableNo > 72 || reservation.tableNo < 1) {
    console.log("Masa seçimi Yanlış | < Please enter a valid table no >");
  } else {
    reservation.save((err) => {
      if (err) {
        console.log(err);
        // throw err;
      } else {
        console.log("Student saved to database succesfully");
        console.log("-------- Last added student information -----------");
        console.log(req.body);
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//customer instance
var customer1 = new Reservation({
  name: "name",
  city: "cityName",
});

//add cutomer to Database (CREATE)
function addStudent(customer) {
  customer.save((err) => {
    if (err) {
      console.log(err);
      // throw err;
    } else {
      console.log("Student saved succesfully");
      alert("Student saved to Database successfully ✓");
    }
  });
}

//list customer from Database (READ)
function getAllStudent() {
  Reservation.find({}, (err, data) => {
    // tümünü getirir
    if (err) {
      throw err;
    }
    console.log(data);
  }); // {} (boş obje ) geçmek tüm listeyi isityorum demektir
}
function getStudentByName(_name) {
  Reservation.find({ name: _name }, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
    }
  });
}
function getStudentById() {
  Reservation.findById("61b7408058bbd2064a615c66", (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
    }
  });
}
//where query to database
function getStudentWtihWhereByCity(_city) {
  Reservation.find({}, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(data);
    }
  })
    .where("city")
    .equals(_city)
    .limit(2)
    .sort("name") //sort("-name") : orderby desc (-) tersten sıralama anlamına gelmektedir.
    .select("name city"); //as 1 limited with limit query // examples of query greaterthan equal (gte) less than equal (lte)
}

//update customer on database (UPDATE)
function updateStudentById() {
  Reservation.findById("61b741720885f339514a3922", (err, data) => {
    if (err) {
      throw err;
    }

    data.city = "Stockholm";
    data.save((err) => {
      if (err) throw err;
      else console.log("customer updated");
    });
  });
}

//delete customer data from database (DELETE)
function deleteStudentById() {
  Reservation.findById("61b7412d4602780a2b3242f5", (err, data) => {
    if (err) {
      throw err;
    }
    data.remove((err) => {
      if (err) throw err;
      else console.log("customer deleted");
    });
  });
}
//findOneAndUpdate method for quick process
function findStudentOneAndUpdate() {
  Reservation.findOneAndUpdate(
    { name: "Ali Feza" },
    { name: "Ebubekir Dereli" },
    (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log(data);
      }
    }
  );
}
//findByIdAndUpdate method for quick process
function findStudentByIdAndUpdate() {
  Reservation.findByIdAndUpdate(
    "61b74198273c7b1a42905034",
    { name: "Chengiz Khan" },
    (err, data) => {
      if (err) {
        throw err;
      }
      console.log("found customer by id and updated");
    }
  );
}
//findByIdAndDelete method for quick process
function findStudentByIdAndDelete() {
  Reservation.findByIdAndRemove("61b752fbe68e0dc424f7426a", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("found customer by id and deleted");
  });
}

//findOneAndDelete method for quick process
function find1studentOneAndDelete() {
  Reservation.findOneAndRemove({ name: "asdas" }, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log("found customerone and deleted");
    }
  });
}

function sendStudentInfosToDb() {
  var ad = document.querySelector("#student_first_name");
  var lastName = document.querySelector("#student_last_name");
  var output = document.querySelector("#output");
  //output.innerHTML = ad.value + " " + lastName.value;
  //---
}
function getReservationDatas(_name) {
  // console.log(customer);

  var result = getStudentByName(_name);
  console.log(result);
}
function showInfo() {
  alert("Student saved to Database successfully ✓");
}
function refresh() {
  window.location.reload();
}
//tests
//customer instance
// addStudent(Student1);
getStudentByName("Yasin Özer");
console.log("---$ Waiting a database connection $---");
//getStudentById();
// getStudentWtihWhereByCity("İstanbul");
// updateStudentById();
// deleteStudentById();
// findStudentOneAndUpdate();
// findStudentByIdAndUpdate();
// findStudentByIdAndDelete();
// findStudentOneAndDelete();
// getAllStudent();
