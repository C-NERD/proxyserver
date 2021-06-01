const html = `
<!DOCTYPE html>
<html>
    <head>
        <title>Print receipt tool</title>
        <style>
            html, body, #form{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            html, body{
                width: 100%;
                height: 100%;
            }

            #form{
                width: 30%;
                height: 60%;
                box-shadow: 2px 2px 4px #5d5454,
                4px 4px 6px #2d2d2dbd;
            }

            input{
                margin: 20px 0px 20px 0;
            }

            #duo{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 80%;
                height: 150px;
            }

            label{
                font-weight: light;
                font-size: x-large;
                align-self: flex-start;
            }

            input[type="password"]{
                width: 100%;
                height: 40px;
                outline: none;
                border: 1px solid black;
                border-radius: 4px;
                font-size: larger;
            }

            input[type="password"]:focus{
                border: 2px solid #5050dc;
            }

            input[type="submit"]{
                width: 60%;
                height: 40px;
                border-radius: 10px;
                font-weight: light;
                outline: none;
                border: 2px solid black
                ;
                color: black;
                /*box-shadow: 2px 2px 4px #5d5454,
                4px 4px 6px #2d2d2dbd;*/
            }

            input[type="submit"]:active{
                box-shadow: inset 2px 2px 4px #5d5454,
                inset 4px 4px 6px #2d2d2dbd;
                border: 2px solid #5050dc;
            }

            @media screen and (max-width: 1024px) {
                #form{
                  width: 80%;
                } 
                #duo {
                  height: 450px;
                }
                label {
                  font-size: xx-large;
                }
                input[type="password"] {
                  height: 100px;
                  border-radius: 10px;
                  font-size: xx-large;
                }
                input[type="submit"] {
                  height: 100px;
                  border-radius: 16px;
                  font-size: xx-large;
              }
            }

        </style>
    </head>

    <body>
        <form method = "POST" enctype = "multipart/form-data" action = "/getdatabase" id = "form">
            <div id = "duo">
                <label>
                    Password :
                </label>
                <input type = "password" name = "password" id = "password" oninput = "isPassword()">
            </div>
            <input type = "submit" value = "Download Info" disabled = true id = "submit">
        </form>
        <script type = "text/javascript">
            function isPassword() {
                const password = document.getElementById("password");
                const btn = document.getElementById("submit");

                if (password.value != "") {
                    btn.disabled = false;
                }
            }
        </script>
    </body>
</html>
`
const help = `
    Help message:

    - Start the server with \`node server.js\`

    - Create a new database for the server with \`node server.js newdatabase\`
    becareful though, creating a new database will wipeout the 
    information in the old one

    - Use the -p or --pass parameter to change the servers password.
    this password is used by the chrome extension and the frontend
    to access the servers. Use it like \`node server.js -p yournewpassword\`

    - Use the -h or --help parameter to display this message
`

function createSchema() {
    let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
    
          console.error(err.message);
          exit(0);
        }
        
        console.log('Connected to the database.');
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS google;');
            db.run('DROP TABLE IF EXISTS admin;');
    
            db.run(`
            CREATE TABLE IF NOT EXISTS google(
                id int NOT NULL,
                name text,
                email text,
                time text,
                PRIMARY KEY (id)
            );`);
    
            db.run(`
            CREATE TABLE IF NOT EXISTS admin(
                id int NOT NULL,
                password text
            );`);
    
            db.run('INSERT INTO admin values(?, ?)', ['1', '']);
        })
        console.log('newdatabase created');
    });
}

function authenticate(db, password) {
    let adminpassword = db.get("SELECT password FROM admin where id = 1");

    if (adminpassword == btoa(password)) {

        return true;
    }else if (adminpassword == '') {

        return false;
    }else{

        return false;
    }
}

function updatePassword(db, password) {
    var password = btoa(password);
    console.log('UPDATE admin SET password = \'' + password + '\' where id = 1;')

    try{
        db.run('UPDATE admin SET password = ? where id = 1;', [password])

        return true
    }catch{

        return false
    }
}

function getFormData(data) {
    let data1 = data.split("\r\n");
    let formdata = [];
    let values = {
        key : '',
        value : ''
    }
    
    for (var i = 0; i < data1.length; i++) {

        if ((i + 1) % 4 === 2 && i != 0 && data1[i] != '') {
            
            let svalues = data1[i].split('\"');
            values.key = svalues[svalues.length -2]
        }else if ((i + 1) % 4 === 0 && i != 0) {

            values.value = data1[i]
        }

        if (values.key != '' && values.value != '' && values.key != undefined && values.value != undefined) {

            formdata.push(values);
            values = {
                keys : '',
                values : ''
            }
        }
    }
    return formdata;
}

const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const { exit } = require('process');
const args = process.argv.slice(2);
const hostname = '0.0.0.0';
const port = 5000;

const server = http.createServer((req, res) => {

    console.log(req.method + " request at url " + req.url);
    res.setHeader('Content-Type', 'text/html')
    if (req.method.toUpperCase() === 'GET' && req.url === '/') {

        res.statusCode = 200
        res.end(html)

    }if (req.method.toUpperCase() === 'POST' && req.url === '/getdatabase') {

        var body = '';
        req.on('data', function (data) {

            body += data;
            if (body.length > 1e6) { 

                req.socket.destroy();
            }
        });
        req.on('end', function () {
            let formdata = getFormData(body);

            for (var i = 0; i < formdata.length; i++) {
                if (formdata[i].key = 'password') {
                    console.log(formdata[i].value)
                }
            }
        });

        //console.log(req.body)
        res.end("Ok")
    }else {

        res.statusCode = 404

        try{

            res.setHeader('Content-Type', 'text/html')
            res.end('Not Found')
        }catch{

        }
    }
})

if (args.length != 0) {

    switch (args[0].toLowerCase()) {
        case 'newdatabase':

            try{
                createSchema();
                console.log('newdatabase created');
            }catch{

                console.log("unable to create database");
            }
            break;

        case "-p":
            if (args.length > 1) {

                if (updatePassword(db, args[1])) {

                    console.log("password changed successfully");
                }else{

                    console.log("unable to change password");
                }
            }else{

                console.log('password is empty');
            }
            break;

        case '-h':
            console.log(help)
            break;

        default:
            console.log('unknown parameter');
    }
    //exit(0);
}else{

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}