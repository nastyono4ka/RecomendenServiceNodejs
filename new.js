pg = require('pg')

var connectionString = "postgres://postgres:postgres@localhost:5432/market";



function addfilm(name, rezhisser, strana, god, reiting, vremya, zhanr, photo, aydi) {


c ="INSERT INTO movie (title, director, country, pub_year, rank, duration, category, poster, id) VALUES (" + "'"+name+"'" + ',' + "'"+rezhisser+"'" + ',' + "'"+strana+"'" + ',' + "'"+god+"'" + ',' + "'"+reiting+"'" + ',' + "'"+vremya+"'" + ',' + "'"+zhanr+"'" + ',' + "'"+photo+"'" + ',' + "'"+aydi+"'" + ");" ;

return c}


film_list = [
{
	'title':'Росомаха',
	'director': 'Джеймс Мэголд',
	'country': 'США',
	'pub_year': '2013',
	'rank': '7',
	'duration': '126',
	'category': 'Триллер',
	'poster': 'http://www.kinopoisk.ru/images/film_big/462754.jpg',
	'id': '1'
},

{
	'title':'Малефисента',
	'director': 'Роберт Стромберг',
	'country': 'США',
	'pub_year': '2014',
	'rank': '8.6',
	'duration': '97',
	'category': 'Фэнтези',
	'poster': 'http://www.kinopoisk.ru/images/film_big/496849.jpg',
	'id': '2'
},

{
	'title':'Ральф',
	'director': 'Рич Мур',
	'country': 'США',
	'pub_year': '2012',
	'rank': '7.7',
	'duration': '101',
	'category': 'Триллер',
	'poster': 'http://www.kinopoisk.ru/images/film_big/586260.jpg',
	'id': '3'
},
{
	'title':'Мастер',
	'director': 'Пол Андерсон',
	'country': 'США',
	'pub_year': '2012',
	'rank': '6.6',
	'duration': '137',
	'category': 'Драма',
	'poster': 'http://www.kinopoisk.ru/images/film_big/585056.jpg',
	'id': '4'
},

{
	'title':'Метель',
	'director': 'Александр Гордон',
	'country': 'Россия',
	'pub_year': '2013',
	'rank': '7',
	'duration': '85',
	'category': 'Драма',
	'poster': 'http://www.kinopoisk.ru/images/film_big/502982.jpg',
	'id': '5'
},

{
	'title':'Ультраамериканцы',
	'director': 'Нима Нуризаде',
	'country': 'США',
	'pub_year': '2015',
	'rank': '6.2',
	'duration': '96',
	'category': 'Боевик',
	'poster': 'http://www.kinopoisk.ru/images/film_big/807399.jpg',
	'id': '6'
},

{
	'title':'Суррогаты',
	'director': 'Джонатан Мостоу',
	'country': 'США',
	'pub_year': '2009',
	'rank': '9',
	'duration': '85',
	'category': 'Фантастика',
	'poster': 'http://www.kinopoisk.ru/images/film_big/397671.jpg',
	'id': '7'
},

{
	'title':'Пиковая дама',
	'director': 'Святослав Подгаевский',
	'country': 'Россия',
	'pub_year': '2015',
	'rank': '5',
	'duration': '93',
	'category': 'Ужасы',
	'poster': 'http://www.kinopoisk.ru/images/film_big/880665.jpg',
	'id': '8'
},

{
	'title':'5-я волна',
	'director': 'Дж. Блэйксон',
	'country': 'США',
	'pub_year': '2016',
	'rank': '5',
	'duration': '112',
	'category': 'Фантастика',
	'poster': 'http://www.kinopoisk.ru/images/film_big/673157.jpg',
	'id': '9'
},

{
	'title':'Левша',
	'director': 'Антуан Фукуа',
	'country': 'США',
	'pub_year': '2015',
	'rank': '7.5',
	'duration': '124',
	'category': 'Драма',
	'poster': 'http://www.kinopoisk.ru/images/film_big/573990.jpg',
	'id': '10'
}
]

 var results = [];

pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log({ success: false, data: err});
    }

    // SQL Query > Insert Data
	for (var i = 0; i < 9; i++) {
	name = film_list[i]['title']
	rezhisser = film_list[i]['director']
	strana = film_list[i]['country']
	god = film_list[i]['pub_year']
	reiting = film_list[i]['rank']
	vremya = film_list[i]['duration']
	zhanr = film_list[i]['category']
	photo = film_list[i]['poster']
	aydi = film_list[i]['id']
	console.log(addfilm(name, rezhisser, strana, god, reiting, vremya, zhanr, photo, aydi));
    client.query(addfilm(name, rezhisser, strana, god, reiting, vremya, zhanr, photo, aydi));}
    // SQL Query > Select Data
    var query = client.query("SELECT * FROM movie ORDER BY id ASC");
//
//    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });
//
    // After all data is returned, close connection and return results
    query.on('end', function() {
        console.log(results)
        client.close()
    });
})