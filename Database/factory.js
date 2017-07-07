const config = require('./config.json');
var settings = {
    host: 'localhostas',
    database: 'barang',
    user: 'root',
    password: ''
};
var qb = require('node-querybuilder').QueryBuilder(settings, 'MYSQL', 'single');
 
qb.select('created_at')
    // .where({type: 'rocky', 'diameter <': 12000})
    .get('kategori', function(err,response) {
        // if (err) return console.error("Uh oh! Couldn't get results: " + err.msg);
 
        // SELECT `name`, `position` FROM `planets` WHERE `type` = 'rocky' AND `diameter` < 12000 
        console.log("Query Ran: " + qb.last_query());
 
        // [{name: 'Mercury', position: 1}, {name: 'Mars', position: 4}] 
        console.dir(response);
    }
);

const db = require('mysql').createConnection({
    host: 'localhost',
    database: 'barang',
    user: 'root',
    password: '',
    port: 3306
});

db.connect()

db.query('SELECT * FROM kategori', function(err, rows, fields){
	if (err) {
		console.log(err);
	}

	console.log(rows);
	console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
	console.log(fields);
})
