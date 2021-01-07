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
