/**
 * A simple script that:
 * - fetches content of ASP.NET 5 project readme template file
 * - uses cheerio to build page object and access DOM content
 * - uses to-markdown to convert page content into Github flavoured markdown
 *
 * @author Peter Blazejewicz
 *
 * @example
 * // using npm
 * npm install
 * npm start
 */
/* jslint node: true */
"use strict";
//
var request = require("request");
var cheerio = require("cheerio");
var pkg = require("./package.json");
var toMarkdown = require("to-markdown");
var fs = require("fs");
//
var url = pkg.configuration.url;
console.log("fetching content from " + url);
request({
    uri: url,
    headers: {
        "User-Agent": "The missing README.md for ASP.NET 5 @peterblazejewicz"
    }
}, function (error, response, body) {
    if (response.statusCode === 200) {
        console.log("parsing content with cheerio");
        var $ = cheerio.load(body);
        $("a[href^='http://go.microsoft.com']")
            .each(function () {
                if (this.attribs.href) {
                    this.attribs.href = this.attribs.href
                        .replace(/http:\/\/go\.microsoft\.com/i, "https://go.microsoft.com");
                }
            });
        var $body = $("body");
        var contentConverter = {
            filter: ["div", "span"],
            replacement: function (content) {
                return content;
            }
        };
        console.log("done");
        console.log("parsing content to Github flavoured Markdown ...");
        var md = toMarkdown($body.html(), {
            gfm: true,
            converters: [contentConverter]
        });
        console.log("updating README.md");
        fs.writeFile("../README.md", md, function (error) {
            if (error) {
                console.log(error);
                return;
            }
            console.log("README.md updated");
        });
    }

}).on("data", function (data) {
    console.log("data stream received");
}).on("response", function (response) {
    console.log("server status: " + response.statusCode);
    response.on("data", function (data) {
        console.log("data stream receiving...");
    });
}).on("error", function (error) {
    console.log("The request failed" + error);
});
