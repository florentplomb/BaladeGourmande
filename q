warning: LF will be replaced by CRLF in .bowerrc.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in app/404.html.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in app/robots.txt.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in bower.json.
The file will have its original line endings in your working directory.
[1mdiff --git a/.bowerrc b/.bowerrc[m
[1mindex 5773025..69fad35 100644[m
[1m--- a/.bowerrc[m
[1m+++ b/.bowerrc[m
[36m@@ -1,3 +1,3 @@[m
 {[m
[31m-  "directory": "app/bower_components"[m
[32m+[m[32m  "directory": "bower_components"[m
 }[m
[1mdiff --git a/app/404.html b/app/404.html[m
[1mindex ec98e3c..899828a 100644[m
[1m--- a/app/404.html[m
[1m+++ b/app/404.html[m
[36m@@ -1,4 +1,4 @@[m
[31m-<!DOCTYPE html>[m
[32m+[m[32m<!doctype html>[m
 <html lang="en">[m
   <head>[m
     <meta charset="utf-8">[m
[36m@@ -31,7 +31,6 @@[m
 [m
       body {[m
         max-width: 500px;[m
[31m-        _width: 500px;[m
         padding: 30px 20px 50px;[m
         border: 1px solid #b3b3b3;[m
         border-radius: 4px;[m
[36m@@ -65,7 +64,6 @@[m
 [m
       .container {[m
         max-width: 380px;[m
[31m-        _width: 380px;[m
         margin: 0 auto;[m
       }[m
 [m
[36m@@ -114,9 +112,6 @@[m
         -webkit-appearance: none;[m
         -moz-appearance: none;[m
         appearance: none;[m
[31m-        *overflow: visible;[m
[31m-        *display: inline;[m
[31m-        *zoom: 1;[m
       }[m
 [m
       #goog-wm-sb:hover,[m
[1mdiff --git a/app/index.html b/app/index.html[m
[1mindex 553dce1..146231d 100644[m
[1m--- a/app/index.html[m
[1m+++ b/app/index.html[m
[36m@@ -18,7 +18,7 @@[m
     <script src="bower_components/json3/lib/json3.js"></script>[m
     <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>[m
     <script src="bower_components/angular-route/angular-route.js"></script>[m
[31m-    <script src="bower_components/leaflet-dist/leaflet.js"></script>[m
[32m+[m[32m    <script src="bower_components/leaflet/dist/leaflet.js"></script>[m
     <script src="bower_components/leaflet-draw/dist/leaflet.draw-src.js"></script>[m
     <script src="bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers.js"></script>[m
     <script src="bower_components/Leaflet.label/dist/leaflet.label.js"></script>[m
[1mdiff --git a/app/robots.txt b/app/robots.txt[m
[1mindex 9417495..4d521f9 100644[m
[1m--- a/app/robots.txt[m
[1m+++ b/app/robots.txt[m
[36m@@ -1,3 +1,4 @@[m
 # robotstxt.org[m
 [m
 User-agent: *[m
[32m+[m[32mDisallow:[m
[1mdiff --git a/bower.json b/bower.json[m
[1mindex aff48a5..797c1ac 100644[m
[1m--- a/bower.json[m
[1m+++ b/bower.json[m
[36m@@ -1,26 +1,36 @@[m
 {[m
[31m-  "name": "balade-map",[m
[32m+[m[32m  "name": "newbmap",[m
   "version": "0.0.0",[m
   "dependencies": {[m
[31m-    "angular": "latest",[m
[31m-    "angular-leaflet-directive": "latest",[m
[31m-    "json3": "latest",[m
[31m-    "es5-shim": "latest",[m
[31m-    "bootstrap": "latest",[m
[31m-    "angular-route": "latest",[m
[31m-    "leaflet-draw": "latest",[m
[31m-    "Leaflet.label": "latest",[m
[31m-    "Leaflet.awesome-markers": "latest",[m
[31m-    "font-awesome": "latest",[m
[31m-    "socket.io-client": "latest",[m
[31m-    "angular-ui-router": "latest",[m
[31m-    "angular-ui-router-styles": "latest",[m
[31m-    "angular-simple-logger": "^0.1.7",[m
[32m+[m[32m    "angular": "^1.4.0",[m
[32m+[m[32m    "bootstrap": "3.1.1",[m
[32m+[m[32m    "grunt-cli": "^1.2.0",[m
[32m+[m[32m    "angular-leaflet-directive": "angular-leaflet#*",[m
[32m+[m[32m    "json3": "~3.3.1",[m
[32m+[m[32m    "es5-shim": "3.1.0",[m
[32m+[m[32m    "angular-route": "1.2.16",[m
[32m+[m[32m    "leaflet-draw": "leaflet.draw#^0.3.0",[m
[32m+[m[32m    "Leaflet.label": "^0.2.1",[m
[32m+[m[32m    "Leaflet.awesome-markers": "^2.0.2",[m
[32m+[m[32m    "font-awesome": "^4.5.0",[m
[32m+[m[32m    "socket.io-client": "1.4.5",[m
[32m+[m[32m    "angular-ui-router": "0.4.2",[m
[32m+[m[32m    "angular-ui-router-styles": "1.1.0",[m
[32m+[m[32m    "angular-simple-logger": "0.1.7",[m
     "Ionicons": "ionicons#^2.0.1"[m
   },[m
   "devDependencies": {[m
[31m-    "angular-mocks": "latest",[m
[31m-    "angular-scenario": "latest"[m
[32m+[m[32m    "angular-mocks": "^1.4.0"[m
   },[m
[31m-  "appPath": "app"[m
[32m+[m[32m  "appPath": "app",[m
[32m+[m[32m  "moduleName": "newbmapApp",[m
[32m+[m[32m  "overrides": {[m
[32m+[m[32m    "bootstrap": {[m
[32m+[m[32m      "main": [[m
[32m+[m[32m        "less/bootstrap.less",[m
[32m+[m[32m        "dist/css/bootstrap.css",[m
[32m+[m[32m        "dist/js/bootstrap.js"[m
[32m+[m[32m      ][m
[32m+[m[32m    }[m
[32m+[m[32m  }[m
 }[m
[1mdiff --git a/fauxbower.json b/fauxbower.json[m
[1mindex a9d905c..0010af5 100644[m
[1m--- a/fauxbower.json[m
[1m+++ b/fauxbower.json[m
[36m@@ -13,7 +13,7 @@[m
     "Leaflet.awesome-markers": "^2.0.2",[m
     "font-awesome": "^4.5.0",[m
     "socket.io-client": "^1.4.5",[m
[31m-    "angular-ui-router": "^0.3.0",[m
[32m+[m[32m    "angular-ui-router": "0.4.0",[m
     "angular-ui-router-styles": "^1.1.0"[m
   },[m
   "devDependencies": {[m
