import request from 'superagent';
import cheerio from 'cheerio';

module.exports = {

  addPostItem: async(url, likeId) => {
    try {
      let crawlHtml = await request.get(url);
      let $ = cheerio.load(crawlHtml.text);
      let itemsArray = [];
      let userArray = [];
      let postsArray = [];
      let items = $(".pdt-card");
      console.log("!!!!!!!!!!!!",items);
      items.map(function(i, elem) {
        // console.log("!!!!!!!!!",$(this).find(".pdt-card-title").text());
        // console.log("!!!!!!!!!",$(this).find(".pdt-card-username").text());
        // console.log("!!!!!!!!!",$(this).find(".pdt-card-price").find("span").text().split('$')[1]);
        // console.log("!!!!!!!!!",$(this).find("img").attr("src"));
        let item = await Item.create({
      		"itemname": $(this).find(".pdt-card-title").text(),
      		"LikeId": likeId
        });
        let userData = {
          "username": $(this).find(".pdt-card-username").text(),
          "email": $(this).find(".pdt-card-username").text() +"@gmail.com"
        }
        let user = await User.findOrCreate({
          where:{
            email: userData.email
          },
          defaults: userData
        });

        let latitude = 24.1542943 + Math.random()/20;
        let longitude = 120.6754701 + Math.random()/20;
        let post = await Post.create({
    			"title": $(this).find(".pdt-card-title").text(),
    			"price": $(this).find(".pdt-card-price").find("span").text().split('$')[1],
    			"content": $(this).find(".pdt-card-title").text(),
          "startDate": 1,
    			"mode": "give",
    			"latitude": latitude,
    			"longitude": longitude,
    			"images": $(this).find("img").attr("src"),
    			"ItemId": item.id,
    			"UserId": 1
        });
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  add : async(data) => {
    try {
      let movie = await db.Movie.create(data);
      return movie;
    } catch (e) {
      throw e;
    }
  },
  crawl: async(id) => {
    try {
      //url分析
      let findUrl = await db.MovieUrl.findById(id);
      let crawlHtml = await request.get(findUrl.url);
      let $ = cheerio.load(crawlHtml.text);
      let movie = {};
      movie.MovieUrlId = id;
      movie.zhName = $("div.text.bulletin h4").text();
      movie.enName = $("div.text.bulletin h5").text();
      movie.fullName = movie.zhName+' '+ movie.enName;
      movie.time = $("div.text.bulletin p span.dta").first().text();
      movie.detail = $("div.text.full").text();
      movie.poster = $(".border a").attr("href").replace("https://tw.rd.yahoo.com/referurl/movie/movieinfo/bigposter/*", "");

      let photos = [];
      let photoDom = $("#albums li");
      photoDom.each(function(i, elem) {
        photos.push($(this).children().children().attr("src"));
      });
      movie.photos = photos

      sails.log.info("=== movie ===",movie);
      return movie

    } catch (e) {
      throw e;
    }
  },

  root: async(url) => {
    try {
      let crawlHtml = await request.get(url);
      let $ = cheerio.load(crawlHtml.text);
      let movies = [];
      let movieUrlDiv = $('.clearfix.row .row-container .item .text h4 a');

      movieUrlDiv.each(function(i, elem) {
        movies.push($(this).attr("href"));
      });

      sails.log.info('=== movies ===',movies);
      let movieList = await* movies.map(function(url){
         let show = db.MovieUrl.findOrCreate({
           where: {url},
           defaults: {url}
         });
         return show;
      });

      return movies;
    } catch (e) {
      throw e;
    }
  },

  findNotCrawl: async() => {
    try {
      let notCrawlMovies = await db.MovieUrl.findAll({
        where:{
          isCrawl: false
        }
      });

      await* notCrawlMovies.map(async (movie) => {
        let movieInfo = await MovieService.crawl(movie.id);
        let create = await MovieService.add(movieInfo);
        await MovieYoutubeService.find(create.id);
        movie.isCrawl = true;
        movie.tryTime += 1;
        await movie.save();
        return movie;
      });

      return;
    } catch (e) {
      throw e
    }
  },

  getAllMovie: async() => {
    try {
      let movies = await db.Movie.findAll();
      console.log(movies);
      return movies
    } catch (e) {
      throw e
    }
  },
  getOneMovie: async(id) => {
    try {
      let movie = await db.Movie.findById(id);
      console.log(movie);
      return movie
    } catch (e) {
      throw e
    }
  },

}