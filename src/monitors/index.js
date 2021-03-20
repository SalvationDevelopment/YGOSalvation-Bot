var fetchUrl = require("fetch").fetchUrl;



const status = {
    admin : false,
    game : false,
    database : false
}

// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl(process.ADMIN_URL, function(error, meta, body){
    console.log(body.toString());
});
