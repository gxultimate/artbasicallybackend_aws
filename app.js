var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var formData = require('express-form-data');
var cors = require('cors'),
	path = require('path'),
	multer = require('multer'),
	cloudinary = require('cloudinary'),
	fs = require('fs'),
	cloudinaryStorage = require('multer-storage-cloudinary');

var route = require('./routes');
var bodyParser = require('body-parser');
var connectDB = require('./connection');
var compression = require('compression');
var app = express();
var helmet = require('helmet');

const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'artwork',
	allowedFormats: [ 'jpg', 'png', 'jpeg' ],
	transformation: [ { quality: 'auto' } ]
});
const parser = multer({ storage: storage });

const port = process.env.Port || 4000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/public', express.static('public'));
app.use('/', route);

app.post('/upload', parser.single('artworkImg'), (req, res) => {
	const image = {};
	image.url = req.file.url;
	image.id = req.file.public_id;
	res.json(image);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.messsage;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

connectDB();
const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
