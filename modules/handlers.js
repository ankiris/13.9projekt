var fs = require('fs');
var url = require('url');
var formidable = require('formidable');


exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log(fields)
        fs.renameSync(files.upload.path, fields.title+'.png');
        //wyswietla zdjecie wewnatrz html
        fs.readFile('templates/upload.html',function(err, html){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(html);
            response.write("<img src='/show?file=" +fields.title+'.png'+ "'/>");
            response.end();
        });
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    if (!query.file){
        response.end();
        return;
    }
    fs.readFile(query.file, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}
exports.css = function(request, response){
	fs.readFile('css/style.css', function(error, file){
		response.writeHead(200, {"Content-Type": "text/css"});
		response.write(file, 'binary');
        response.end();
	});
}