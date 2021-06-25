# proxyserver
A simple proxy server to help bypass the CORS browser restriction

# Compilation
To compile the code to this project make sure you have the [nim compiler](https://nim-lang.org/install.html) and it's
dependencies installed on your local machine.

- Then open a terminal in the root directory of the project
- Finally type `nimble release` in the terminal and then wait until compilation is over


Your standalone proxy server should now be created in a new bin directory along side a settings.json file. If you decide to use the program in a production enviroment you might want to setup a [reverse proxy](https://www.nginx.com/resources/glossary/reverse-proxy-server/) using [nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/) or [apache](http://httpd.apache.org/docs/current/install.html)



*To make a request to a server via the proxy server your url to the proxy server should look like `https://proxyserversurl/https%3A%2F%2Fwhateversiteyouwanttorequestfrom.com`*
such that the `:` character in the url you want to request from is replaced with `%3A` and the `/` character with `%2F`. This can be acheived with the javascript `encodeURI` function.
