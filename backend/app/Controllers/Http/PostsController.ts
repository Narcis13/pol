const http = require("https");
//import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {

  public async remindere(/*{ view }: HttpContextContract*/) {

    const options = {
      "method": "POST",
      "hostname": "app.smso.ro",
      "port": null,
      "path": "/api/v1/send?to=%2040745089013&sender=4&body=Mesaj%20de%20test%20Eleventen%20app",
      "headers": {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "X-Authorization": "ZKO9cbHtSzQIIWUZaenIg8GQ6ZVL6dmxMOVpKELJ"
      }
    };

    const req = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
      chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
});

req.end();
   
  }

  
}