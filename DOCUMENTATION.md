# The missing README.md for ASP.NET 5

This project contains content based on html welcome page that is a part of template project created with Visual Studio `New project ...` item. As Visual Studio still does not support Markdown (without extension like Web Essentials) this little project generates the same content but in Markdown format.

The original content for `Project_Readme.html` can be found on now open-sourced [Visual Studio Templates project](https://github.com/aspnet/Templates)

The `README.md` created here is now shipping with `generator-aspnet`:
https://github.com/OmniSharp/generator-aspnet

## Documentation

To generate `README.md` from the latest version of content available on `aspnet/Templates` project do following:

```
cd scripts/
npm install
npm start
```
This will install script dependencies and generate new, updated `README.md`:
```
➜  scripts git:(dev) ✗ npm start

> readme-generator@1.0.0 start /Users/piotrblazejewicz/git/missing-aspnet-readme/scripts
> node index.js

fetching content from https://raw.githubusercontent.com/aspnet/Templates/dev/src/BaseTemplates/StarterWeb/Project_Readme.html
server status: 200
data stream receiving...
data stream received
parsing content with cheerio
done
parsing content to Github flavoured Markdown ...
updating README.md
README.md updated
```

If you are using this script please update `User-Agent` header to point to your own string (not required, but good citizen habit)

The url of `Project_Readme.html` can be configured in `scripts/project.json` `configuration` key:
```json
"configuration": {
  "url": "https://raw.githubusercontent.com/aspnet/Templates/dev/src/BaseTemplates/StarterWeb/Project_Readme.html"
}
```

## Dependencies

- Node 4.* or later - as required by `to-markdown` module
- NPM 2.14.* or later

## Author

Thanks!
@peterblazejewicz
