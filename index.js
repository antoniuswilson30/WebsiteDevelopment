import path, { resolve } from 'path';
import express, { response } from 'express';
import mysql from "mysql";
import session from "express-session";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mv from 'mv';
import formidable from 'formidable';
import csv from 'fast-csv';
import { request } from 'http';

const app = express();

app.set('view engine', 'ejs');

//pemanggilan untuk database
const __dirname = dirname(fileURLToPath(import.meta.url));

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'admin01',
  password : 'jAkarta2022',
  database : 'sdsmarty'
});

// percobaan gagal
/* const connection2 = mysql.createConnection({
	host     : 'localhost',
	user     : 'admin01',
	password : 'jAkarta2022',
	database : 'sdsmarty'
  });

const db = makeDb();
await db.connect(connection2); */

app.use(session({
	secret: 'apahayokepobanget',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('Gambar'));
app.use(express.static('views'));


// http://localhost:8081/
app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname +'/public/Home.html'));
});

//-----------------------------------------------------------------------------------app post

// http://localhost:8081/auth
//authentication login
app.post('/auth', (request, response) => {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT nama, `idUser`, `idTipe` FROM `User` WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
			// If there is an issue with the query, output the error
			//if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				request.session.idTipe = results[0].idTipe;
				request.session.idUser = results[0].idUser;
				request.session.nama = results[0].nama;
				// Redirect to home page
				// masukkin if buat ke halaman tiap jenis user
				switch(request.session.idTipe){
					case 5:
						response.redirect('/admin'); //masukkin ke home admin
						break;
					case 1:
						response.redirect('/siswa'); //masukkin ke home siswa
						break;
					case 2:
						response.redirect('/guru');
						break;
					case 4:
						response.redirect('/kepalasekolah'); //masukkin ke home kepala sekolah
						break;
					case 3:
						response.redirect('/satpam'); //masukkin ke home satpam
						break;
					default:
						response.redirect('/'); //ini gatau mau diisi apa
				}
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// fungsi upload siswa
app.post('/uploadsiswa', (request, response) => {
	//Create an instance of the form object
	let form = new formidable.IncomingForm();

	//Process the file upload in Node
	form.parse(request, function (error, fields, file) {
		console.log(`file = ${JSON.stringify(file)}`);
		
		let filepath = file.siswa.filepath;
		let newpath = __dirname + '/upload-csv/';
		
		newpath += file.siswa.originalFilename;

		console.log(`filepath = ${filepath} newpath = ${newpath}`);
	
		//pindahin uploaded file ke folder upload-csv
		mv(filepath, newpath, function (err) {
			if ( err ) { 
				console.log('ERROR: ' + err);
				response.write("ERROR: "+err);
				return response.send();
			}
			
			if (UploadCsvDataToMySQLsiswa( newpath )===0) {
				console.log('ERROR: tidak berhasil insert ke database');
				response.write("ERROR: tidak berhasil insert ke database");
				return response.send();
			}
			
			response.redirect('/admin-siswa');
			response.end();
		});
	});
});

// fungsi pemanggilan query siswa
function UploadCsvDataToMySQLsiswa(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", async function () {
            // Remove Header ROW
            csvData.shift();
			
			try {
				const hasil = await queryTmpSiswa(csvData);
			}
			catch (e) {
				console.log("gagal masuk tmp_siswa")
				console.log(e);
				return 0;
			}
			finally {
				try{
					const hasil2 = await queryusersiswa();
				}
				catch (e) {
					console.log("gagal masuk user")
					console.log(e);
					return 0;
				}
				finally{
					try { 
						const hasil3 = await querysiswa(); 
					} catch(e) {
						console.log("gagal masuk siswa")
						console.log(e);
						return 0;
					}
					finally{
						try{
							const hasil4 = await truncatetmpsiswa();
						}catch(e) {return 0}
						finally{
							return 1;
						}
					}
				}
			}
			// kesalahan async
			/*
			try {
				connection.query('INSERT INTO tmp_siswa (`NISN`, `nama`, `email`, `tglLahir`, `namaOrangTua`, `emailOrangTua`, `namaKelas`) VALUES ?', [csvData], (error, results, fields) => {
					console.log(`tmpsiswa: ${JSON.stringify(results)}`);
					if (results.length < 1) {
						
						return 0;
					}
	
					if (results.length > 0) {
						console.log(`tmpsiswa: ${JSON.stringify(results)}`);	
					}
				});
			} catch (e) {
				console.log(e); // || response);
				return 0;
			} finally {
				try {
					let query = "INSERT INTO `User`(username, password, nama,`idTipe`) SELECT `NISN`, date_format(`tgllahir`,'%Y%m%d') `tglLahir`, nama, 1 FROM `tmp_siswa`; ";
					connection.query(query, (error2, results2, fields2) => {
						console.log(`user: ${JSON.stringify(results2)}`);
						if (results2.length < 1) {
							return 0;
						}

						if (results2.length > 0) {
							console.log(`user: ${JSON.stringify(results2)}`);	
							return 1;
						}
					});
				} catch (e2) {
					console.log(e2); // || response);
					return 0;
				} finally {
					try {
						let query = "INSERT INTO `Siswa`(`NISN`, nama, email, `tglLahir`, `namaOrangTua`, `emailOrangTua`, `namaKelas`,`idUser`) SELECT `NISN`,  nama, email, `tglLahir`, `namaOrangTua`, `emailOrangTua`, `namaKelas`, (select `idUser` FROM `User` WHERE username = `tmp_siswa`.`NISN`) `idUser` FROM `tmp_siswa`";
						connection.query(query, (error3, results3, fields) => {
							console.log(`siswa: ${JSON.stringify(results3)}`);
							if (error3) { 
								console.log(error3); // || response);
								return 0;
								//throw error; 
							}
		
							if (results3.length < 1) {
								return 0;
							}
		
							if (results3.length > 0) {
								console.log(`siswa: ${JSON.stringify(results3)}`);
								return 1;
							}
						});
					}
					catch (e3) {
						console.log(e3); // || response);
						return 0;
					}
					finally {
						
					}
				}


			}
			*/
			
             
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            //fs.unlinkSync(filePath)
        });
  
    stream.pipe(csvStream);
	return 1;
}

// fungsi query siswa
function queryTmpSiswa(csvData){
	return new Promise((resolve, reject) => {
		connection.query('INSERT INTO tmp_siswa (`NISN`, `nama`, `email`, `tglLahir`, `namaOrangTua`, `emailOrangTua`, `namaKelas`) VALUES ?', [csvData], (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

function queryusersiswa(){
	let queryusersiswa = "INSERT INTO `User`(username, password, nama,`idTipe`) SELECT `NISN`, date_format(`tgllahir`,'%Y%m%d') `tglLahir`, nama, 1 FROM `tmp_siswa` ";
	return new Promise((resolve, reject) => {
		connection.query(queryusersiswa, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

function querysiswa(){
	let querysiswa = "INSERT INTO `Siswa`(`NISN`, nama, email, `tglLahir`, `namaOrangTua`, `emailOrangTua`, `namaKelas`,`idUser`) SELECT `NISN`,  nama, email, `tglLahir`, `namaOrangTua`, `emailOrangTua`, `namaKelas`, (select `idUser` FROM `User` WHERE username = `tmp_siswa`.`NISN`) `idUser` FROM `tmp_siswa`";
	return new Promise((resolve, reject) => {
		connection.query(querysiswa, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}


//-------------------------------------email gagal
/*
var querystring1 = 'SELECT `email`, nama, date_format(`tgllahir`,\'%Y%m%d\') `password`, `NISN` FROM `tmp_siswa` WHERE TIMESTAMPDIFF(SECOND,date_created, NOW()) <=298 AND `email`!="" LIMIT 0,5';

toSend.push({//row[i].column name will pull relevant database info 
	to: row[i].email,
	from: 'sd.smarty.indonesia@gmail.com',
	subject: 'Password untuk siswa ' + row[i].nama + ' ',
	isi:  'Selamat datang sisiwa '+row[i].nama+', email kamu adalah: '+ row[i].email+' dan gunakan no NISN sebagai username, username: ' + row[i].NISN+' password: '+row[i].password
});
*/

/*function sendEmailSiswa(v_to, v_subject, v_isi){
	let v_to, v_isi, v_subject;
	let transporter = nodemailer.createTransport({
	        service: 'gmail',
	        auth: {
	            user: "sd.smarty.indonesia@gmail.com",
	            pass: "yzeeqyxgfcobgjxt"
	        }
	});

	if (v_to && v_isi && v_subject) {} else {
		return 'to/subject/isi harus diisi';
	}
	
	let message = {
	    from: "sd.smarty.indonesia@gmail.com",
	    to: v_to,
	    subject: v_subject,
	    html: v_isi
	}

	transporter.sendMail(message, function(err, info) {
	  if (err) {
	    console.log(err); return 'err';
	  } else {
	    console.log(info); return 'ok';
	  }
	});
}*/

function truncatetmpsiswa(){
	let querytruncatetmp = "TRUNCATE `tmp_siswa`";
	return new Promise((resolve, reject) => {
		connection.query(querytruncatetmp, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

app.post('/uploadvaksin1', (request, response) => {
	let NISN = request.session.username;
	console.log(NISN)
	let form = new formidable.IncomingForm();
	form.parse(request, function (error, fields, file) {
		console.log(`file = ${JSON.stringify(file)}`);
		
		let filepath = file.vaksin1.filepath;
		let newpath = __dirname + '/public/image/';
		
		newpath += file.vaksin1.originalFilename;

		console.log(`filepath = ${filepath} newpath = ${newpath}`);
		
		let tanggal = fields.tanggal1;
		let kodevaksin = fields.kodeVaksin1;
		console.log(request.session.idUser);
		mv(filepath, newpath, async function (err) {
			if ( err ) { 
				console.log('ERROR: ' + err);
				response.write("ERROR: "+err);
				return response.send();
			}
			if (await uploadVaksin1( newpath, tanggal, kodevaksin, request.session.username )===0) {
				console.log('ERROR: tidak berhasil insert ke database');
				response.write("ERROR: tidak berhasil insert ke database");
				return response.send();
			}
			response.redirect('/siswa-vaksin');
			response.end();
		});
	});
});

function uploadVaksin1(filepath, tanggal, kodevaksin, NISN){
	let queryvaksin1 = 'INSERT INTO `vaksin` (`idSertif`, `sertifVaksin`, `tanggalVaksin`, `vaksinKe`, `NISN`) VALUES (?,?,?,1,?)';
	connection.query(queryvaksin1, [kodevaksin, filepath, tanggal, NISN], (error, result) => {
		if(error){
			console.log(error);
			return 0;
		}
		else{
			return 1;
		}
	})
}

app.post('/uploadvaksin2', (request, response) => {
	let NISN = request.session.username;
	console.log(NISN)
	let form = new formidable.IncomingForm();
	form.parse(request, function (error, fields, file) {
		console.log(`file = ${JSON.stringify(file)}`);
		
		let filepath = file.vaksin2.filepath;
		let newpath = __dirname + '/public/image/';
		
		newpath += file.vaksin2.originalFilename;

		console.log(`filepath = ${filepath} newpath = ${newpath}`);
		
		let tanggal = fields.tanggal2;
		let kodevaksin = fields.kodeVaksin2;
		console.log(request.session.idUser);
		//pindahin uploaded file ke folder upload-csv
		mv(filepath, newpath, async function (err) {
			if ( err ) { 
				console.log('ERROR: ' + err);
				response.write("ERROR: "+err);
				return response.send();
			}
			if (await uploadVaksin2( newpath, tanggal, kodevaksin, request.session.username )===0) {
				console.log('ERROR: tidak berhasil insert ke database');
				response.write("ERROR: tidak berhasil insert ke database");
				return response.send();
			}
			response.redirect('/siswa-vaksin');
			response.end();
		});
	});
});

function uploadVaksin2(filepath, tanggal, kodevaksin, NISN){
	let queryvaksin2 = 'INSERT INTO `vaksin` (`idSertif`, `sertifVaksin`, `tanggalVaksin`, `vaksinKe`, `NISN`) VALUES (?,?,?,2,?)';
	connection.query(queryvaksin2, [kodevaksin, filepath, tanggal, NISN], (error, result) => {
		if(error){
			console.log(error);
			return 0;
		}
		else{
			return 1;
		}
	})
}

app.post('/uploadvaksin3', (request, response) => {
	let NISN = request.session.username;
	console.log(NISN)
	let form = new formidable.IncomingForm();
	form.parse(request, function (error, fields, file) {
		console.log(`file = ${JSON.stringify(file)}`);
		
		let filepath = file.vaksin3.filepath;
		let newpath = __dirname + '/public/image/';
		
		newpath += file.vaksin3.originalFilename;

		console.log(`filepath = ${filepath} newpath = ${newpath}`);
		
		let tanggal = fields.tanggal3;
		let kodevaksin = fields.kodeVaksin3;
		console.log(request.session.idUser);
		//pindahin uploaded file ke folder upload-csv
		mv(filepath, newpath, async function (err) {
			if ( err ) { 
				console.log('ERROR: ' + err);
				response.write("ERROR: "+err);
				return response.send();
			}
			if (await uploadVaksin3( newpath, tanggal, kodevaksin, request.session.username )===0) {
				console.log('ERROR: tidak berhasil insert ke database');
				response.write("ERROR: tidak berhasil insert ke database");
				return response.send();
			}
			response.redirect('/siswa-vaksin');
			response.end();
		});
	});
});

function uploadVaksin3(filepath, tanggal, kodevaksin, NISN){
	let queryvaksin3 = 'INSERT INTO `vaksin` (`idSertif`, `sertifVaksin`, `tanggalVaksin`, `vaksinKe`, `NISN`) VALUES (?,?,?,3,?)';
	connection.query(queryvaksin3, [kodevaksin, filepath, tanggal, NISN], (error, result) => {
		if(error){
			console.log(error);
			return 0;
		}
		else{
			return 1;
		}
	})
}

// fungsi upload guru
app.post('/uploadguru', (request, response) => {
	//Create an instance of the form object
	let form2 = new formidable.IncomingForm();

	//Process the file upload in Node
	form2.parse(request, function (error, fields, file) {
		console.log(`file = ${JSON.stringify(file)}`);
		
		let filepath2 = file.guru.filepath;
		let newpath2 = __dirname + '/upload-csv/';
		
		newpath2 += file.guru.originalFilename;

		console.log(`filepath = ${filepath2} newpath = ${newpath2}`);
	
		//pindahin uploaded file ke folder upload-csv
		mv(filepath2, newpath2, function (err) {
			if ( err ) { 
				console.log('ERROR: ' + err);
				response.write("ERROR: "+err);
				return response.send();
			}
			
			if (UploadCsvDataToMySQLguru( newpath2 )!=1) {
				console.log('ERROR: tidak berhasil insert ke database');
				response.write("ERROR: tidak berhasil insert ke database");
				return response.send();
			}
			
			response.redirect('/admin-guru');
			response.end();
		});
	});
});

// fungsi pemanggilan query guru
function UploadCsvDataToMySQLguru(filePath){
    let stream2 = fs.createReadStream(filePath);
    let csvData2 = [];
    let csvStream2 = csv
        .parse()
        .on("data", function (data) {
            csvData2.push(data);
        })
        .on("end", async function () {
            // Remove Header ROW
            csvData2.shift();
			
			try {
				const hasi2l = await queryTmpGuru(csvData2);
			}
			catch (e) {
				console.log("tidak masuk ke tmp_guru");
				console.log(e);
				return 0;
			}
			finally {
				try { 
					const hasil24 = await queryKelasRuangan();
				} catch(e) {
					console.log("tidak masuk ke kelas");
					console.log(e);
					return 0;
				}
				finally{
					try{
						const hasil22 = await queryuserguru();
					}
					catch(e) {
						console.log("tidak masuk ke user");
						console.log(e);
						return 0;
					}
					finally{
						try{
							const hasil23 = await queryguru();
						}
						catch(e){
							console.log("tidak masuk ke guru");
							console.log(e);
							return 0;
						}
						finally{
							try{
								const hasil25 = await truncatetmpguru();
							}catch(e) {return 0}
							finally{
								return 1;
							}
						}
					}
				}
			}
        });
  
    stream2.pipe(csvStream2);
	return 1;
}

//fungsi query guru
function queryTmpGuru(csvData2){
	return new Promise((resolve, reject) => {
		connection.query('INSERT INTO tmp_guru (`NIK`, `nama`, `kelasAjar`, `noRuangan`, `username`, `password`) VALUES ?', [csvData2], (err, result) => {
			if(err){
				console.log(err);
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

function queryKelasRuangan(){
	let querykelas = "INSERT INTO `kelas`(`namaKelas`, `namaGuru`, `noRuangan`) SELECT `kelasAjar`, `nama`, `noRuangan` FROM `tmp_guru`"
	return new Promise((resolve, reject) => {
		connection.query(querykelas, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

function queryuserguru(){
	let queryuserguru = "INSERT INTO `User`(`username`, `password`, `nama`,`idTipe`) SELECT `username`, `password`, `nama`, 2 FROM `tmp_guru` ";
	return new Promise((resolve, reject) => {
		connection.query(queryuserguru, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

function queryguru(){
	let queryguru = "INSERT INTO `guru`(`NIK`, `nama`, `kelasAjar`, `idUser`) SELECT `NIK`,  `nama`, `kelasAjar`, (select `idUser` FROM `User` WHERE `User`.`nama` = `tmp_guru`.`nama`) `idUser` FROM `tmp_guru`";
	return new Promise((resolve, reject) => {
		connection.query(queryguru, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

function truncatetmpguru(){
	let querytruncatetmpguru = "TRUNCATE `tmp_guru`";
	return new Promise((resolve, reject) => {
		connection.query(querytruncatetmpguru, (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

// fungsi input ruangan
app.post('/inputruangan', (request, response) => {
	let ruangan = request.body.nomor + "";
	let kapasitas = request.body.kapasitas + "";
	ruangan = parseInt(ruangan);
	kapasitas = parseInt(kapasitas);
	if (ruangan && kapasitas){
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO `ruangan`(`noRuangan`,`kapasitas`) VALUES ( ?, ? )', [ruangan,kapasitas], (err, data) => {
				if(err){
					reject(err);
					response.end();
				}
				else{
					resolve(data);
					response.redirect('/admin-daftarruangan');
					response.end();
				}
			});
		});
	}
	else{
		response.send("gagal memasukkan ruangan");
		response.end();
	}
})


//fungsi input periodePTMT
app.post('/inputperiode', (request,response) => {
	let namaPeriode = request.body.nama;
	let tanggalAwal = request.body.tanggalawal;
	let tanggalAkhir = request.body.tanggalakhir;
	let daftarAwal = request.body.daftarawal;
	let daftarAkhir = request.body.daftarakhir;
	let kapasitas = request.body.kapasitas;
	kapasitas = parseInt(kapasitas);
	if(namaPeriode && tanggalAwal && tanggalAkhir && daftarAwal && daftarAkhir && kapasitas){
		if(toMysqlPeriodeKehadiran(namaPeriode, tanggalAwal, tanggalAkhir, daftarAwal, daftarAkhir, kapasitas) === 0){
			response.write("tidak berhasil menambah periodePTMT");
			response.end();
		}
		response.redirect('/admin');
		response.end();
	}
	else{
		response.send("gagal menambah periode PTMT!");
		response.end();
	}
})

async function toMysqlPeriodeKehadiran(namaPeriode, tanggalAwal, tanggalAkhir, daftarAwal, daftarAkhir, kapasitas){
	try{
		const addperiode = await queryperiodeptmtp(namaPeriode, tanggalAwal, tanggalAkhir, daftarAwal, daftarAkhir, kapasitas);
	}
	catch (e) {return 0}
	finally{
		try{
			const addkehadiran = await querydefaultkehadiran(namaPeriode);
		}
		catch(e) {return 0}
		finally{
			return 1;
		}
	}
}

function queryperiodeptmtp(namaPeriode, tanggalAwal, tanggalAkhir, daftarAwal, daftarAkhir, kapasitas){
	return new Promise((resolve, reject) => {
		connection.query('INSERT INTO `periodePTMT`(`namaPeriode`,`kapasitas`,`tanggalMulai`, `tanggalAkhir`, `mulaiDaftar`, `akhirDaftar`) VALUES ( ?, ?, ?, ?, ?, ?)', [namaPeriode,kapasitas,tanggalAwal,tanggalAkhir,daftarAwal,daftarAkhir], (err, result) => {
			if(err){
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}

function querydefaultkehadiran(namaPeriode){
	let querydefaultkehadiran = "INSERT INTO `kehadiran`( `namaPeriode`, `NISN`, `namaKelas`,`status`) SELECT ?, `NISN`, `namaKelas`, 'NO' FROM `siswa`";
	return new Promise((resolve, reject) => {
		connection.query(querydefaultkehadiran, [namaPeriode], (err, result) => {
			if(err){
				console.log(err);
				reject(err);
			}
			else{
				resolve(result);
			}
		});
	});
}


//fungsi ganti password
app.post('/gantipsw', (request, response) => {
	let pswlama = request.body.pswlama;
	let pswbaru = request.body.pswbaru;
	let konfpsw = request.body.konfpsw;
	if(pswlama && pswbaru && konfpsw){
		if(pswbaru!=konfpsw){
			response.write("password baru dan konfirmasi password baru tidak sesuai");
			response.end();
		}
		if(pswbaru.length<6){
			response.write("password baru kurang dari 6 karakter");
			response.end();
		}
		connection.query('UPDATE `user` SET `password` = ? WHERE `password`=? AND `idUser`=?', [pswbaru, pswlama, request.session.idUser], (error, result) => {
			if(error){
				response.write('password lama tidak sesuai');
				response.end();
			}
			response.redirect('/siswa');
			response.end();
		})
	}
})


//const untuk pagination
const show = 7;
const getPeriode = (start, limit) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT namaPeriode,  DATE_FORMAT(tanggalMulai,"%d-%m-%Y") as tanggalMulai, DATE_FORMAT(tanggalAkhir,"%d-%m-%Y") as tanggalAkhir, DATE_FORMAT(akhirDaftar,"%d-%m-%Y") as akhirDaftar, kapasitas FROM periodeptmt ORDER BY periodeptmt.namaperiode LIMIT ?, ?', [start, limit], (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

const getRuangan = (start, limit) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ruangan ORDER BY noRuangan LIMIT ?, ?', [start, limit], (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

const getGuru = (start, limit) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM guru ORDER BY guru.kelasajar LIMIT ?, ?', [start, limit], (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

const getSiswa = (start, limit) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM viewsiswausername ORDER BY namaKelas LIMIT ?, ?', [start, limit], (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

const getKelas = (start, limit) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT namaKelas, noRuangan FROM kelas ORDER BY namaKelas LIMIT ?, ?', [start, limit], (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

const getJumlahRowSiswa = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(NISN) AS jumlahRow FROM viewsiswausername', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getJumlahRowPeriode = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(namaPeriode) AS jumlahRow FROM periodeptmt', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getJumlahRowGuru = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(NIK) AS jumlahRow FROM guru', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getJumlahRowRuangan = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(noRuangan) AS jumlahRow FROM ruangan', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getJumlahRowKelas = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(namaKelas) AS jumlahRow FROM kelas', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

//-----------------------------------------------------------------------------------------------------------------------------------app get



//fitur siswa
app.get('/siswa', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 1) {
		fs.readFile(__dirname +'/public/siswa.html', (error, data) =>{
			if(error){
				throw error;
			}
			connection.query('SELECT nama, `NISN`, `namaKelas`, DATE_FORMAT(tglLahir,"%d-%m-%Y") `tglLahir`, email, `namaOrangTua`, `emailOrangTua` FROM `Siswa` WHERE `idUser` = ? LIMIT 1', [request.session.idUser], (error, results, fields) => {
				if (error) throw error;
				if (results.length > 0) {
					let sHtml = data.toString().replace(/\{\{nama\}\}/g, results[0].nama);
					sHtml = sHtml.toString().replace(/\{\{namaKelas\}\}/g, results[0].namaKelas);
					sHtml = sHtml.toString().replace(/\{\{NISN\}\}/g, results[0].NISN);
					sHtml = sHtml.toString().replace(/\{\{tglLahir\}\}/g, results[0].tglLahir);
					sHtml = sHtml.toString().replace(/\{\{email\}\}/g, results[0].email);
					sHtml = sHtml.toString().replace(/\{\{namaOrangTua\}\}/g, results[0].namaOrangTua);
					sHtml = sHtml.toString().replace(/\{\{emailOrangTua\}\}/g, results[0].emailOrangTua);
					response.send(sHtml);
				} else {
					response.send('Data tidak tersedia!');
				}			
				response.end();
			});
		});
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/siswa-vaksin', (request, response) => {
        if (request.session.loggedin && request.session.idTipe === 1) {
                response.sendFile(path.join(__dirname +'/public/siswa-vaksin.html'));
        }
        else {
                response.sendFile(path.join(__dirname +'/public/login.html'));
        }
});

app.get('/siswa-setting', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 1) {
			response.sendFile(path.join(__dirname +'/public/siswa-setting.html'));
	}
	else {
			response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/siswa-ptmt', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 1) {
		let uname = request.session.username;
		let querysiswaptmt = 'SELECT t.periode as periode,t.mulai as mulai, t.selesai as selesai, t.daftar as daftar, t.batas as batas, t.kelas as kelas, t.kapasitasptmt as kapasitas, t.terisi as terisi, kehadiran.status, kehadiran.NISN FROM kehadiran JOIN (SELECT kapasitas_ruang.periode, kapasitas_ruang.kelas, kapasitas_ruang.kapasitasptmt, COALESCE(kelas_terisi.kapasitasptmt,0) as terisi, DATE_FORMAT(periodeptmt.tanggalMulai,"%d-%m-%Y") as mulai, DATE_FORMAT(periodeptmt.tanggalAkhir,"%d-%m-%Y") as selesai, DATE_FORMAT(periodeptmt.mulaiDaftar,"%d-%m-%Y") as daftar, DATE_FORMAT(periodeptmt.akhirDaftar,"%d-%m-%Y") as batas from ( SELECT p.namaPeriode as periode, k.namaKelas as kelas, FLOOR(p.kapasitas* r.kapasitas/100) as kapasitasptmt FROM periodeptmt p CROSS JOIN kelas k JOIN ruangan r ON k.noRuangan = r.noRuangan) kapasitas_ruang LEFT JOIN ( SELECT kehadiran.namaPeriode as periode, kehadiran.namaKelas as kelas, COALESCE(COUNT(kehadiran.status),0) as kapasitasptmt FROM kehadiran WHERE kehadiran.status="YES" GROUP BY kehadiran.namaPeriode, kehadiran.namaKelas) kelas_terisi ON kapasitas_ruang.periode = kelas_terisi.periode AND kapasitas_ruang.kelas = kelas_terisi.kelas JOIN periodeptmt ON periodeptmt.namaPeriode = kapasitas_ruang.periode) as t on kehadiran.namaPeriode = t.periode AND kehadiran.namaKelas = t.kelas JOIN vaksin on kehadiran.NISN = vaksin.NISN WHERE t.batas<now() and t.daftar<=now() and kehadiran.NISN = ? and kehadiran.status="NO" and vaksinKe>1;';
		connection.query(querysiswaptmt, [uname], (error, data, fields)=>{
			if(error){
				console.log(`error= ${JSON.stringify(error)}`);
				response.write(`error= ${JSON.stringify(error)}`);
				throw error;
			}
			//if(data>0){
				response.render('siswa-ptmt', {
					siswaptmtlist: data
				});
			//}
			//else{
			//
			//}
		});
	}
	else {
			response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/siswa-daftar/:periode/:kapasitas/:terisi/:NISN', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 1) {
		let paramperiode = request.params.periode;
		let paramkapasitas = request.params.kapasitas;
		let paramterisi = request.params.terisi;
		let paramNISN = request.params.NISN;
		let queryinputkehadiran = ('UPDATE kehadiran SET status = "YES" WHERE NISN = ? AND namaPeriode = ?');
		if(paramterisi<paramkapasitas){
			connection.query(queryinputkehadiran, [paramNISN,paramperiode], (err, data, fields) => {
				if(err) throw err;
				response.redirect('/siswa-daftarperiode');
			})
		}
		else{
			response.send('Kelas sudah penuh!');
			response.end();
		}
	}
	else {
			response.sendFile(path.join(__dirname +'/public/login.html'));
	}
})

app.get('/siswa-daftarperiode', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 1) {
		let queryptmt = 'SELECT kehadiran.namaPeriode as nama, DATE_FORMAT(periodeptmt.tanggalMulai,"%d-%m-%Y") as mulai, DATE_FORMAT(periodeptmt.tanggalAkhir,"%d-%m-%Y") as selesai FROM `kehadiran` JOIN `periodeptmt` on kehadiran.namaPeriode = periodeptmt.namaPeriode WHERE kehadiran.status = "YES" and kehadiran.NISN = ?'
		connection.query(queryptmt,[request.session.username], (err, data, fields) => {
			if(err) throw err;
			response.render('siswa-daftarperiode', {siswaptmtlist: data});
		});
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
})

//fitur guru

app.get('/guru', (request, response) => {
	console.log(`loggedin= ${request.session.loggedin} idtipe= ${request.session.idTipe}`);
	if (request.session.loggedin && request.session.idTipe === 2) {
		let querylistptmt = 'SELECT `namaPeriode`, `kapasitas`, DATE_FORMAT(tanggalMulai,"%d-%m-%Y") `tanggalMulai`, DATE_FORMAT(tanggalAkhir,"%d-%m-%Y") `tanggalAkhir`, DATE_FORMAT(akhirDaftar,"%d-%m-%Y") `akhirDaftar`, guru.nama as nama, guru.kelasAjar as kelasAjar FROM periodeptmt CROSS JOIN guru WHERE idUser = ? AND periodeptmt.tanggalAkhir>=now()';
		connection.query(querylistptmt,[request.session.idUser], (err, data, fields) => {
			if(err) throw err;
			response.render('guru', {periodeNow: data});
		});		
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
})

app.get('/guru-periode', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 2) {
		let querylistptmt = 'SELECT `namaPeriode`, `kapasitas`, DATE_FORMAT(tanggalMulai,"%d-%m-%Y") `tanggalMulai`, DATE_FORMAT(tanggalAkhir,"%d-%m-%Y") `tanggalAkhir`, DATE_FORMAT(akhirDaftar,"%d-%m-%Y") `akhirDaftar`, guru.nama as nama, guru.kelasAjar as kelasAjar FROM periodeptmt CROSS JOIN guru WHERE idUser = ? AND periodeptmt.tanggalAkhir<now()';
		connection.query(querylistptmt,[request.session.idUser], (err, data, fields) => {
			if(err) throw err;
			response.render('guru-periode', {periodeNow: data});
		});		
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/guru-detail/:periode/:kelas', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 2) {
		let paramperiode = request.params.periode;
		let paramkelas = request.params.kelas;
		let querysiswaguru = "SELECT siswa.NISN as NISN,  siswa.nama as nama FROM kehadiran JOIN siswa on kehadiran.NISN = siswa.NISN and kehadiran.namaKelas = siswa.namaKelas where kehadiran.status = 'YES' and kehadiran.namaPeriode = ? and kehadiran.namaKelas = ? ";
		connection.query(querysiswaguru,[paramperiode, paramkelas], (err, data, fields) => {
			if(err) throw err;
			response.render('guru-detail', {listsiswa: data});
		});
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

//fitur admin

app.get('/admin', async(req, res) => {
	if (req.session.loggedin && req.session.idTipe === 5) {
		const jumlahRow = await getJumlahRowPeriode();
    	const pageCount = Math.ceil(jumlahRow[0].jumlahRow/show);
    	//console.log(pageCount);
    	const start = req.query.start;
    	let periode
    	if(start === undefined){
    	    periode = await getPeriode( 0,  show);
    	}else{
    	    let limitStart = (show*(start-1));
    	    periode = await getPeriode( limitStart, show);
    	}

    	res.render('admin', {
    	    adminptmtlist: periode,
    	    pageCount
    	})
		}
	else {
		res.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/admin-daftarruangan', async(req, res) => {
	if (req.session.loggedin && req.session.idTipe === 5) {
		const jumlahRow = await getJumlahRowRuangan();
    	const pageCount = Math.ceil(jumlahRow[0].jumlahRow/show);
    	//console.log(pageCount);
    	const start = req.query.start;
    	let ruangan
    	if(start === undefined){
    	    ruangan = await getRuangan(0,  show);
    	}else{
    	    let limitStart = (show*(start-1));
    	    ruangan = await getRuangan(limitStart, show);
    	}
    	res.render('admin-daftarruangan', {
    	    listruangan: ruangan,
    	    pageCount
    	});
	}
	else {
		res.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/admin-daftarsiswa', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 5) {
		response.sendFile(path.join(__dirname +'/public/admin-daftarsiswa.html'));
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/admin-guru', async(req, res) => {
	if (req.session.loggedin && req.session.idTipe === 5) {
		const jumlahRow = await getJumlahRowGuru();
    	const pageCount = Math.ceil(jumlahRow[0].jumlahRow/show);
    	//console.log(pageCount);
    	const start = req.query.start;
    	let guru
    	if(start === undefined){
    	    guru = await getGuru(0,  show);
    	}else{
    	    let limitStart = (show*(start-1));
    	    guru = await getGuru(limitStart, show);
    	}
    	res.render('admin-guru', {
    	    results: guru,
    	    pageCount
    	});
	}
	else {
		res.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/admin-importguru', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 5) {
		response.sendFile(path.join(__dirname +'/public/admin-importguru.html'));
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/admin-importsiswa', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 5) {
		response.sendFile(path.join(__dirname +'/public/admin-importsiswa.html'));
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/admin-kelas', async(req, res) => {
	if (req.session.loggedin && req.session.idTipe === 5) {
		const jumlahRow = await getJumlahRowKelas();
    	const pageCount = Math.ceil(jumlahRow[0].jumlahRow/show);
    	//console.log(pageCount);
    	const start = req.query.start;
    	let kelas
    	if(start === undefined){
    	    kelas = await getKelas( 0,  show);
    	}else{
    	    let limitStart = (show*(start-1));
    	    kelas = await getKelas( limitStart, show);
    	}
    	res.render('admin-daftarkelas', {
    	    listkelas: kelas,
    	    pageCount
    	});
	}
	else {
		res.sendFile(path.join(__dirname +'/public/login.html'));
	}
})

app.get('/admin-periodebaru', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 5) {
		response.sendFile(path.join(__dirname +'/public/admin-periodebaru.html'));
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/admin-ruangan', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 5) {
		response.sendFile(path.join(__dirname +'/public/admin-ruangan.html'));
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/admin-siswa', async(req, res) => {
	if (req.session.loggedin && req.session.idTipe === 5) {
		const table = "viewsiswausername"
    	const jumlahRow = await getJumlahRowSiswa();
    	const pageCount = Math.ceil(jumlahRow[0].jumlahRow/show);
    	//console.log(pageCount);
    	const start = req.query.start;
    	let siswa
    	if(start === undefined){
    	    siswa = await getSiswa( 0,  show);
    	}else{
    	    let limitStart = (show*(start-1));
    	    siswa = await getSiswa( limitStart, show);
    	}
    	res.render('admin-siswa', {
    	    results: siswa,
    	    pageCount
    	});
	}
	else {
		res.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

//fitur satpam

const cekStatus = (nisn, periode) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT status FROM kehadiran WHERE NISN=? AND namaPeriode=?', [nisn, periode], (err, result) => {
			console.log(result);
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

app.get('/satpam', (req,res) => {
	if (req.session.loggedin && req.session.idTipe === 3){
    	res.render('satpam');
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.post('/satpam-cek', async (req,res) => {
    const nisn = req.body.nisn;
    const periode = req.body.periode;
    const status = await cekStatus(nisn, periode);
    function validasi(status){
        let result = "";
        if(status[0].status === "NO"){
            result = "Siswa tidak terdaftar PTMT";
        }else{
            result = "Siswa telah terdaftar PTMT";
        }
        return result;
    }
    const result = validasi(status);
    res.render('satpam-cek', {
        results: result
    });
});

//fitur kepala sekolah

app.get('/kepalasekolah', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 4) {
		let querystatperiode = "SELECT periodeptmt.namaPeriode as label, COALESCE(COUNT(t.NISN), 0) as data FROM periodeptmt LEFT JOIN (SELECT * FROM kehadiran k WHERE k.status = 'YES') t on t.namaPeriode = periodeptmt.namaPeriode or t.namaPeriode is null GROUP BY periodeptmt.namaPeriode"
		connection.query(querystatperiode, (err, result, fields) => {
			if (err) throw err;
			console.log(`result: ${JSON.stringify(result)}`);
			let data = []
			let label = []
			for (var i=0; i<result.length; i++){
				data.push(result[i].data);
				label.push(result[i].label);
			}
			console.log(`data: ${JSON.stringify(data)}`);
			console.log(`label: ${JSON.stringify(label)}`);
			response.render('kepsek', { judul: 'Jumlah Siswa', label: JSON.stringify(label), data: JSON.stringify(data) })
		})
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/kepalasekolah-kelas', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 4) {
		let querystatperiode = "SELECT kelas.namaKelas as label, COALESCE(COUNT(t.NISN), 0) as data FROM kelas LEFT JOIN (SELECT * FROM kehadiran k WHERE k.status = 'YES') t on t.namaKelas = kelas.namaKelas or t.namaKelas is null GROUP BY kelas.namaKelas"
		connection.query(querystatperiode, (err, result, fields) => {
			if (err) throw err;
			console.log(`result: ${JSON.stringify(result)}`);
			let data = []
			let label = []
			for (var i=0; i<result.length; i++){
				data.push(result[i].data);
				label.push(result[i].label);
			}
			console.log(`data: ${JSON.stringify(data)}`);
			console.log(`label: ${JSON.stringify(label)}`);
			response.render('kepsek-kelas', { judul: 'Jumlah Siswa', label: JSON.stringify(label), data: JSON.stringify(data) })
		})
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

app.get('/kepalasekolah-guru', (request, response) => {
	if (request.session.loggedin && request.session.idTipe === 4) {
		let querystatperiode = "SELECT guru.nama as label, COALESCE(COUNT(t.NISN), 0) as data FROM guru LEFT JOIN (SELECT * FROM kehadiran k WHERE k.status = 'YES') t on t.namaKelas = guru.kelasAjar or t.namaKelas is null GROUP BY guru.nama"
		connection.query(querystatperiode, (err, result, fields) => {
			if (err) throw err;
			console.log(`result: ${JSON.stringify(result)}`);
			let data = []
			let label = []
			for (var i=0; i<result.length; i++){
				data.push(result[i].data);
				label.push(result[i].label);
			}
			console.log(`data: ${JSON.stringify(data)}`);
			console.log(`label: ${JSON.stringify(label)}`);
			response.render('kepsek-guru', { judul: 'Jumlah Siswa', label: JSON.stringify(label), data: JSON.stringify(data) })
		})
	}
	else {
		response.sendFile(path.join(__dirname +'/public/login.html'));
	}
});

//logout
app.get('/logout', (request, response) => {
	request.session.destroy((err) => {
		if(err) {return console.log(err)}
		response.redirect('/login')
	})
});

//login
app.get('/login', (request, response) => {
	response.sendFile(path.join(__dirname +'/public/login.html'));
});


// http://localhost:8081/home
//kalo misalnya si orang ini belum login terus langsung nyobain ke halaman utama tiap akun
//bagian homenya tinggal dipakein if sesuai jenisuser
app.get('/home', (request, response) => {
        response.sendFile(path.join(__dirname +'/public/Home.html'));
});

app.get('/home.html', (request, response) => {
        response.sendFile(path.join(__dirname +'/public/login.html'));
});

app.listen(8081);
console.log(`Server jalan pada port 8081`);
console.log(`===========================`);
console.log(`Ready.`)
