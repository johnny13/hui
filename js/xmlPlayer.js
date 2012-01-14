var xmlPlaylist = [{}];
			
function Playlist(instance, playlist, options) {
		var self = this;
		this.instance = instance; // String: To associate specific HTML with this playlist
		this.playlist = playlist; // Array of Objects: The playlist
		this.options = options; // Object: The jPlayer constructor options for this playlist

		this.current = 0;

		this.cssId = {
			jPlayer: "jquery_jplayer_",
			interface: "jp_interface_",
			playlist: "jp_playlist_"
		};
		this.cssSelector = {};

		$.each(this.cssId, function(entity, id) {
			self.cssSelector[entity] = "#" + id + self.instance;
		});

		if(!this.options.cssSelectorAncestor) {
			this.options.cssSelectorAncestor = this.cssSelector.interface;
		}

		$(this.cssSelector.jPlayer).jPlayer(this.options);

		$(this.cssSelector.interface + " .jp-previous").click(function() {
			self.playlistPrev();
			//$(this).blur();
			return false;
		});

		$(this.cssSelector.interface + " .jp-next").click(function() {
			self.playlistNext();
			//$(this).blur();
			return false;
		});
	};

function xmlJamOut() {
	Playlist.prototype = {
		displayPlaylist: function() {
			var self = this;
			$(this.cssSelector.playlist + " ul").empty();
			for (i=0; i < this.playlist.length; i++) {
				var listItem = (i === this.playlist.length-1) ? "<li class='jp-playlist-last'>" : "<li>";
				listItem += "<a href='#' id='" + this.cssId.playlist + this.instance + "_item_" + i +"' tabindex='1' class='hue'>"+ this.playlist[i].name +"</a>";

				// Create links to free media
				if(this.playlist[i].free) {
					var first = true;
					listItem += "<div class='jp-free-media'>(";
					$.each(this.playlist[i], function(property,value) {
						if($.jPlayer.prototype.format[property]) { // Check property is a media format.
							if(first) {
								first = false;
							} else {
								listItem += " | ";
							}
							listItem += "<a id='" + self.cssId.playlist + self.instance + "_item_" + i + "_" + property + "' href='" + value + "' tabindex='1'>" + property + "</a>";
						}
					});
					listItem += ")</span>";
				}

				listItem += "</li>";

				// Associate playlist items with their media
				$(this.cssSelector.playlist + " ul").append(listItem);
				$(this.cssSelector.playlist + "_item_" + i).data("index", i).click(function() {
					var index = $(this).data("index");
					if(self.current !== index) {
						self.playlistChange(index);
					} else {
						$(self.cssSelector.jPlayer).jPlayer("play");
					}
					$(this).blur();
					return false;
				});

				// Disable free media links to force access via right click
				if(this.playlist[i].free) {
					$.each(this.playlist[i], function(property,value) {
						if($.jPlayer.prototype.format[property]) { // Check property is a media format.
							$(self.cssSelector.playlist + "_item_" + i + "_" + property).data("index", i).click(function() {
								var index = $(this).data("index");
								$(self.cssSelector.playlist + "_item_" + index).click();
								$(this).blur();
								return false;
							});
						}
					});
				}
			}
		},
		playlistInit: function(autoplay) {
			if(autoplay) {
				this.playlistChange(this.current);
			} else {
				this.playlistConfig(this.current);
			}
		},
		playlistConfig: function(index) {
			$(this.cssSelector.playlist + "_item_" + this.current).removeClass("jp-playlist-current").parent().removeClass("jp-playlist-current");
			$(this.cssSelector.playlist + "_item_" + index).addClass("jp-playlist-current").parent().addClass("jp-playlist-current");
			this.current = index;
			$(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current]);
		},
		playlistChange: function(index) {
			this.playlistConfig(index);
			$(this.cssSelector.jPlayer).jPlayer("play");
		},
		playlistNext: function() {
			var index = (this.current + 1 < this.playlist.length) ? this.current + 1 : 0;
			this.playlistChange(index);
		},
		playlistPrev: function() {
			var index = (this.current - 1 >= 0) ? this.current - 1 : this.playlist.length - 1;
			this.playlistChange(index);
		}
	};
}

/* declaring here allows for resuse */
var audioPlaylist;
var obj = new Array();

$(document).ready(function(){

 	//add xml file to playlist
	$("button#loadList").click(function() { 
		$.ajax({
			type: "GET",
			url: "playlist.xml",
			dataType: "xml",
			success: function(xml) {	
				$(xml).find('item').each(function(){
					var title = $(this).find('title').text();
					var mp3 = $(this).find('mp3').text();
					var ogg = $(this).find('ogg').text();
					obj = {'name':title, 'mp3':mp3, 'ogg':ogg};
					xmlPlaylist.push(obj);
				});	
				audioPlaylist.displayPlaylist();
			}
		});
	return false;
	});
	
	//Call the Prototype Object Into Exsistance.
	xmlJamOut();
	
	//This is the ajax call to get the Playlist Data
	//Then Create the jplayer object with the data
	var obj = new Array();
		$.ajax({
			type: "GET",
			url: "playlist.xml",
			dataType: "xml",
			success: function(xml) {
				delete xmlPlaylist;
				xmlPlaylist = [];
				$(xml).find('item').each(function(){
					var title = $(this).find('title').text();
					var mp3 = $(this).find('mp3').text();
					var ogg = $(this).find('ogg').text();
					obj = {'name':title, 'mp3':mp3, 'ogg':ogg};
					xmlPlaylist.push(obj);
				});	
				
				audioPlaylist = new Playlist("1", xmlPlaylist, 
					{
					ready: function() {
						audioPlaylist.displayPlaylist();
						audioPlaylist.playlistInit(false); // Parameter is a boolean for autoplay.
					},
					ended: function() {
						audioPlaylist.playlistNext();
					},
					play: function() {
						$(this).jPlayer("pauseOthers");
					},
					swfPath: "js",
					supplied: "mp3, ogg"
				});
				//console.debug(audioPlaylist.playlist);
				audioPlaylist.displayPlaylist();	
				audioPlaylist.playlistPrev();	
				audioPlaylist.playlistNext();
				audioPlaylist.playlistInit(false);
			}
		});
	
	// *********************************************************xmlPlayer Widget
	$('ul#xmlPlayer li, ul#xmlVideoPlayer li').hover(
		function() { $(this).addClass('theme_back'); }, 
		function() { $(this).removeClass('theme_back'); }
	);
		
	$(".jp-play-bar").progressbar({
		value: 0
	}).width(450);
	
	//#audiovolume = div.jp-volume-bar for audioplayer
	$('#audiovolume').slider({
		range: "min",
		value: 80,
		change: function(){ 
			var newVolume = $("#audiovolume").slider("value");
			var Volume = newVolume / 100;
			$("#jquery_jplayer_1").jPlayer("volume", Volume);
			//return false;
			if(newVolume > 0){
			$("#jquery_jplayer_1").jPlayer("unmute");
			$('#jYTp-unmute').hide();
			$('#jYTp-mute').show();
			} else {
			$("#jquery_jplayer_1").jPlayer("mute");
			$('#jYTp-unmute').show();
			$('#jYTp-mute').hide();
			}
		}
	}).width(180);
	
	$('#videovolume').slider({
		range: "min",
		value: 80,
		change: function(){ 
			var newVolume = $("#videovolume").slider("value");
			var Volume = newVolume / 100;
			$("#jquery_jplayer_2").jPlayer("volume", Volume);
			//return false;
			if(newVolume > 0){
			$("#jquery_jplayer_2").jPlayer("unmute");
			$('.vid-unmute').hide();
			$('.vid-mute').show();
			} else {
			$("#jquery_jplayer_2").jPlayer("mute");
			$('.vid-unmute').show();
			$('.vid-mute').hide();
			}
		}
	}).width(180);
	
	//VIDEO PLAYER STARTUP
	var vidarray = new Array();
	$.ajax({
		type: "GET",
		url: "videolist.xml",
		dataType: "xml",
		success: function(xml) {
			xmlvideoPlaylist = [];
			$(xml).find('item').each(function(){
				var title = $(this).find('title').text();
				var media = $(this).find('m4v').text();
				var oga = $(this).find('oga').text();
				var poster = $(this).find('poster').text();
				var vidarray = {'name':title, 'm4v':media, 'oga':oga, 'poster':poster};
				xmlvideoPlaylist.push(vidarray);
			});	
			
			videoPlaylist = new Playlist("2", xmlvideoPlaylist, 
				{
				ready: function() {
					videoPlaylist.displayPlaylist();
					videoPlaylist.playlistInit(false); 
				},
				ended: function() {
					videoPlaylist.playlistNext();
				},
				play: function() {
					$(this).jPlayer("pauseOthers");
				},
				swfPath: "js",
				supplied: "ogv, m4v, oga, mp3"
			});
			//console.debug(audioPlaylist.playlist);
		}
	});
	
	//console.debug(audioPlaylist.playlist);
	//videoPlaylist.displayPlaylist();

});