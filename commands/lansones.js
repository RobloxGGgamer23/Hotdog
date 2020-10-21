module.exports = {
    name: 'Lansones',
    description: 'Shows Lansones randomly',
    execute(message, args, request, cheerio) {

        lansones(message);

        function lansones(message){
 
            var options = {
                url: "http://results.dogpile.com/serp?qc=images&q=" + "Lansones images",
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };
            request(options, function(error, response, responseBody) {
                if (error) {
                    return;
                }
         
         
                $ = cheerio.load(responseBody);
         
         
                var links = $(".image a.link");
         
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
               
                console.log(urls);
         
                if (!urls.length) {
                   
                    return;
                }
         
                // Send result
                message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
            });
        };

    }
}