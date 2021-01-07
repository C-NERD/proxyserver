# proxyserver
A simple proxy server to help bypass the CORS browser restriction

# Compilation
To compile the code to this project make sure you have the [nim compiler](https://nim-lang.org/install.html) and it's
dependencies installed on your local machine.

- Then open a terminal in the root directory of the project
- finally type `nimble release` and then wait

After compilation navigate into the bin folder and run the generated corsproxy executable to get your server up and
running. If you decide to use the program in a production enviroment you might want to setup a [reverse proxy](https://www.nginx.com/resources/glossary/reverse-proxy-server/) using [nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/) or [apache](http://httpd.apache.org/docs/current/install.html)

*if you run a windows or linux pc the code has already been compiled for you in the wbin and lbin directory respectively*
*To make a request to a server via the proxy your url should look like `proxyserversurl/https%3A%2F%2Fwhateversiteyouwanttorequestfrom.com`*
*make sure you replace the `:` character in the url you want to request from with `%3A` and replace the `/` character with `%2F`*
*You can use the index.html file to test the proxy server for CORS restrictions, just make sure to change the url it's requesting from to your servers url*
