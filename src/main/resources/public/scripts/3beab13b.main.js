"use strict";angular.module("app.directives",[]),angular.module("app.services",[]),angular.module("app.controllers",[]);var app=angular.module("app",["pascalprecht.translate","angularTypewrite","angularMoment","app.directives","app.services","app.controllers"]);app.config(["$translateProvider",function(a){a.useStaticFilesLoader({prefix:"/assets/lang/locale-",suffix:".json"}).determinePreferredLanguage().fallbackLanguage("en_US")}]),app.run(function(){(new WOW).init(),$("#nav li a, .scroll").on("click",function(a){a.preventDefault();var b=this.hash;$(b).length&&$("html, body").animate({scrollTop:$(b).offset().top},300,function(){window.location.hash=b})}),$("body").on("input propertychange",".floating-label-form-group",function(a){$(this).toggleClass("floating-label-form-group-with-value",!!$(a.target).val())}).on("focus",".floating-label-form-group",function(){$(this).addClass("floating-label-form-group-with-focus")}).on("blur",".floating-label-form-group",function(){$(this).removeClass("floating-label-form-group-with-focus")}),new Waypoint({element:document.getElementById("leafletMap"),handler:function(){$.ajax({url:"allmarks",method:"GET"}).success(function(a){for(var b="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c="country animated flash",d="country",e=0;e<a.length;e++)!function(e){setTimeout(function(){var f='path[data-country="'+a[e].country+'"]',g=parseFloat(d3.selectAll(f).style("fill-opacity"));1>g&&(d3.selectAll(f).attr("class",c).style("fill-opacity",g+.1),$(f).one(b,function(){$(this).attr("class",d)}))},2500*e)}(e)}),this.destroy()},offset:"90%"}),new Waypoint({element:document.getElementById("knowledge"),handler:function(){$(".progress-bar").each(function(){var a=$(this).attr("aria-valuenow");$(this).css("width",a+"%")}),this.destroy()},offset:"90%"})}),angular.module("app.controllers").controller("PageCtrl",["$scope","$rootScope","$translate","$timeout","SidebarService",function(a,b,c,d,e){a.expanded=e.isExpanded,c("START").then(function(b){a.start=b}),a.setFinished=function(){a.finishedTyping=!0}}]),angular.module("app.controllers").controller("SidebarCtrl",["$scope","$http","$translate","SidebarService",function(a,b,c,d){a.selectedCountry=d.getSelectedCountry(),a.messages=d.getMessages(),a.changeLanguage=function(a){c.use(a)},a.toggleMenu=function(){d.toggleExpanded()}}]),angular.module("app.controllers").controller("MapCtrl",["$scope","$http","SidebarService",function(a,b,c){a.submit=function(){a.loading=!0,b({url:"mark",method:"POST",params:this.formData}).success(function(b){a.getMessages(b.country),a.success=!0}).error(function(){a.error=!0})["finally"](function(){a.loading=!1})};var d=!1;a.setLocation=function(){d===!1&&(d=!0,navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(b){$.getJSON("http://ws.geonames.org/countryCode",{lat:b.coords.latitude,lng:b.coords.longitude,username:"nilsi",type:"JSON"},function(c){a.locationSet=!0,a.formData.lat=b.coords.latitude,a.formData["long"]=b.coords.longitude,a.formData.country=c.countryName,a.$apply()})},function(){a.locationSet=!1}))},a.getMessages=function(a){c.setExpanded(!0),c.setSelectedCountry(a),b({url:"/marksbycountry",method:"GET",params:{country:a}}).success(function(a){c.setMessages(a)})}}]),angular.module("app.controllers").controller("ContactCtrl",["$scope","$http",function(a,b){a.submit=function(){a.loading=!0,b({url:"/contact",method:"POST",params:this.formData}).success(function(){a.success=!0}).error(function(){a.error=!0})["finally"](function(){a.loading=!1})}}]),angular.module("app.directives").directive("leafletMap",["$compile",function(a){return{restrict:"A",link:function(b){var c=new L.Map("leafletMap",{center:[0,0],zoom:2,minZoom:2,scrollWheelZoom:!1}),d=d3.select(c.getPanes().overlayPane).append("svg"),e=d.append("g").attr("class","leaflet-zoom-hide");d3.json("/assets/world-countries.json",function(f){function g(a,b){var d=c.latLngToLayerPoint(new L.LatLng(b,a));this.stream.point(d.x,d.y)}function h(){var a=j.bounds(f),b=a[0],c=a[1];d.attr("width",c[0]-b[0]).attr("height",c[1]-b[1]).style("left",b[0]+"px").style("top",b[1]+"px"),e.attr("transform","translate("+-b[0]+","+-b[1]+")"),k.attr("d",j)}var i=d3.geo.transform({point:g}),j=d3.geo.path().projection(i),k=e.selectAll("path").data(f.features).enter().append("path").attr({"click-map":function(a){return"getMessages('"+a.properties.name+"')"},"data-country":function(a){return a.properties.name}}).call(function(){a(this[0].parentNode.parentNode)(b)});c.on("viewreset",h),h()})}}}]),angular.module("app.directives").directive("clickMap",function(){return{restrict:"A",link:function(a,b,c){b.bind("click",function(){a.$apply(c.clickMap)})}}}),angular.module("app.services").factory("SidebarService",function(){var a=!1,b=[],c={name:""};return{isExpanded:function(){return a},toggleExpanded:function(){a=a===!0?!1:!0},setExpanded:function(b){a=b},setMessages:function(a){angular.copy(a,b)},getMessages:function(){return b},getSelectedCountry:function(){return c},setSelectedCountry:function(a){c.name=a}}});