//============================ express ================================//

require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require("cors")
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/files", express.static("files"))

//============================ auto refresh ===========================//

const path = require("path");
// const livereload = require("livereload");
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, 'public'));
// const connectLivereload = require("connect-livereload");
// app.use(connectLivereload());

// liveReloadServer.server.once("connection", () => {
//     setTimeout(() => {
//         liveReloadServer.refresh("/");
//     }, 100);
// });

//============================ bodyParser سليم ========================//

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//============================ mongoose ===============================//

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONECT)
    .then(result => {
        app.listen(port, () => {
            console.log(`Example app listening on ${process.env.HTTP}${port}`)
        })
    })
    .catch(err => {
        console.log("err mongoose : ", err);
    });


//============================ Passport ===============================//

// const passport = require("passport")
// const passportSetup = require("./passport/passport")
// const cookieSession = require("cookie-session")
// app.use(
//     cookieSession({
//         name:"session",
//         keys:["cyberwolve"],
//         maxAge:24*60*60*100,
//     })
// )
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:'GET,POST,PUT,DELETE',
//         credentials:true,
//     })
// )

//============================ Routes =================================//

const { protectAdmin, protectAll } = require('./validators/protect')

app.use("/auth", require("./routes/authuser"))
app.use("/clineArticales", require("./routes/ClineRoutes/ClineArticales"))
app.use(protectAll)
app.use("/users", require("./routes/users"))
app.use("/card", require("./routes/card"))
app.use("/support", require("./routes/support"))
app.use(protectAdmin)
app.use("/articales", require("./routes/Articales"))

app.use((req, res, next) => {
    res.status(404).send("لا يمكن الوصول للصفحة")
})




//============================ env =================================//

// MONGO_CONECT = "mongodb+srv://shami544:544186754bnbBNB@cluster0.c50zfku.mongodb.net/"
// PORT = 3333
// HTTP = http://localhost:
// NODE_ENV= "development"

// JWT_ADMIN_SECRET_KEY=belal_nasseraldeen_mohmed_alborai
// JWT_ADMIN_REFRESH_KEY=khaled_belal_nasseraldeen_mohmed_alborai
// JWT_CLINE_SECRET_KEY=belal_nasseraldeen_alborai
// JWT_CLINE_REFRESH_KEY=khaled_belal_nasseraldeen_alborai
// JWT_EXPIRE_TIME=60d
// JWT_REFRESH_TIME=90d


