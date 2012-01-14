/* YOUTUBE CHROMELESS WIDGET */
/*
 * Skin for youtubePlayer (http://www.huement.com/code/youtubePlayer)
 * An Adaptation of the chromeless youtube player
 * http://code.google.com/apis/youtube/js_api_reference.html
 *
 * Skin Name: huement-ui
 *
 * Copyright (c) 2011 Huement
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: @johnnyfortune
 * Skin Version: 1.0 (huement-ui 1.0.0)
 * Date: 4/20th/2011
*/


function updateHTML(elmId, value) {
//document.getElementById(elmId).innerHTML = value;
}

function setytplayerState(newState) {
updateHTML("playerstate", newState);
}

function onYouTubePlayerReady(playerId) {
ytplayer = document.getElementById("youtubeplayer");
setInterval(updateytplayerInfo, 250);
updateytplayerInfo();
ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
ytplayer.addEventListener("onError", "onPlayerError");
}

function onytplayerStateChange(newState) {
setytplayerState(newState);
}

function onPlayerError(errorCode) {
alert("An error occured: " + errorCode);
}

function updateytplayerInfo() {
updateHTML("bytesloaded", getBytesLoaded());
updateHTML("bytestotal", getBytesTotal());
updateHTML("videoduration", getDuration());
updateHTML("videotime", getCurrentTime());
updateHTML("startbytes", getStartBytes());
updateHTML("volume", getVolume());
updateTimebar();
}

function getPercent(all, part) {   
return (all > 0) ? (100 / all) * part : 0;
}

function updateTimebar() {    
if (ytplayer && $("#youtubePlayer").is(':visible')){
var all = ytplayer.getDuration();    
var part = ytplayer.getCurrentTime();    
var percent = getPercent(all, part);    
var timebarWidth = 405;    
document.getElementById('jYTp-play-bar').style.width = percent * (timebarWidth / 100) + "px";
updateCurrentTimebar();
}
}

function updateCurrentTimebar() {  
var curtime = ytplayer.getCurrentTime() / 60;
$('#videotime').html(curtime.toFixed(2));
}

// functions for the api calls
function loadNewVideo(id, startSeconds) {
if (ytplayer) {
ytplayer.loadVideoById(id, parseInt(startSeconds));
}
}

function cueNewVideo(id, startSeconds) {
if (ytplayer) {
ytplayer.cueVideoById(id, startSeconds);
}
}

function play() {
if (ytplayer) {
ytplayer.playVideo();
$('#jYTp-play').hide();
$('#jYTp-pause').show();
}
}

function pause() {
if (ytplayer) {
ytplayer.pauseVideo();
$('#jYTp-play').show();
$('#jYTp-pause').hide();
}
}

function stop() {
if (ytplayer) {
ytplayer.stopVideo();
$('#jYTp-play').show();
$('#jYTp-pause').hide();
return false;
}
}

function ytnext(video) {
	if (ytplayer) {
	var current = $('li.vidcurrent a').attr('id');
	var myInteger = parseInt(current);
	
		if(myInteger > 1){
		var plusone = myInteger+1;
		var total_items = $("ul#youtube_playlist li").length;
		
			if(total_items < plusone){
			var nexttrack = $("ul.jYTp-playlist li:nth-child(1) a").attr('title');	
			ytplayer.loadVideoById(nexttrack, 0);
			displayVideoList(1);
			} else {
			var nexttrack = $("ul.jYTp-playlist li:nth-child("+plusone+") a").attr('title');
			ytplayer.loadVideoById(nexttrack, 0);
			displayVideoList(plusone);
				if($('#jYTp-play').is(':visible')){
				$('#jYTp-play').hide();
				$('#jYTp-pause').show();
				}
			}
		}
		
		if(myInteger == 1){
		var nexttk = $("ul.jYTp-playlist li:nth-child(2) a").attr('title');	
		ytplayer.loadVideoById(nexttk, 0);
		displayVideoList(2);
			if($('#jYTp-play').is(':visible')){
			$('#jYTp-play').hide();
			$('#jYTp-pause').show();
			}
		}
		
		if($('li.vidcurrent').length == 0){
			var nexttrack = $("ul.jYTp-playlist li:nth-child(1) a").attr('title');	
			ytplayer.loadVideoById(nexttrack, 0);
			displayVideoList(1);
		}
	
	}
}

function ytprev(video) {
	if (ytplayer) {
	var current = $('li.vidcurrent a').attr('id');
	var myInteger = parseInt(current);
	
		if(myInteger > 1){
		var plusone = myInteger-1;
		var nexttrack = $("ul.jYTp-playlist li:nth-child("+plusone+") a").attr('title');
		ytplayer.loadVideoById(nexttrack, 0);
		displayVideoList(plusone);
			if($('#jYTp-play').is(':visible')){
			$('#jYTp-play').hide();
			$('#jYTp-pause').show();
			}
		}
		
		if(myInteger == 1){
		var nexttk = $("ul.jYTp-playlist li:last-child a").attr('title');	
		ytplayer.loadVideoById(nexttk, 0);
		var total_items = $("ul#youtube_playlist li").length;
		displayVideoList(total_items);
			if($('#jYTp-play').is(':visible')){
			$('#jYTp-play').hide();
			$('#jYTp-pause').show();
			}
		}
		
		if($('li.vidcurrent').length == 0){
			var nexttrack = $("ul.jYTp-playlist li:nth-child(1) a").attr('title');	
			ytplayer.loadVideoById(nexttrack, 0);
			displayVideoList(1);
		}
	
	}
}

function mute() {
if (ytplayer) {
ytplayer.mute();
$('#jYTp-mute').hide();
$('#jYTp-unmute').show();
}
}

function unMute() {
if (ytplayer) {
ytplayer.unMute();
$('#jYTp-mute').show();
$('#jYTp-unmute').hide();
}
}

function getPlayerState() {
if (ytplayer && $("#youtubePlayer").is(':visible')) {
return ytplayer.getPlayerState();
}
}
function seekTo(seconds) {
if (ytplayer) {
ytplayer.seekTo(seconds, true);
}
}

function getBytesLoaded() {
if (ytplayer && $("#youtubePlayer").is(':visible')) {
return ytplayer.getVideoBytesLoaded();
}
}

function getBytesTotal() {
if (ytplayer && $("#youtubePlayer").is(':visible')) {
return ytplayer.getVideoBytesTotal();
}
}

function getCurrentTime() {
if (ytplayer && $("#youtubePlayer").is(':visible')) {
return ytplayer.getCurrentTime();
}
}

function getDuration() {
if (ytplayer && $("#youtubePlayer").is(':visible')) {
var new_number = Math.round(ytplayer.getDuration()).toFixed(2);
var corrected = Math.round(new_number / 60).toFixed(2);
$('.jYTp-duration').html(corrected);
return ytplayer.getDuration();
}
}

function getStartBytes() {
if (ytplayer && $("#youtubePlayer").is(':visible')) {
return ytplayer.getVideoStartBytes();
}
}

function setVolume(newVolume) {
if (ytplayer) {
ytplayer.setVolume(newVolume);
}
}

function getVolume() {
if (ytplayer && $("#youtubePlayer").is(':visible')) {
return ytplayer.getVolume();
}
}

function clearVideo() {
if (ytplayer && $("#youtubePlayer").is(':visible')) {
ytplayer.clearVideo();
}
} 

/* PLAYLIST FUNCTIONS */
function displayVideoList(number) {
	//var total_items = $("ul#youtube_playlist li").length;
	$("ul.jYTp-playlist li").removeClass("vidlast");
	$("ul.jYTp-playlist li:last-child").addClass("vidlast");

	$("ul.jYTp-playlist li").removeClass("vidcurrent");
	if(number == 1){
	$("ul.jYTp-playlist li:first-child").addClass("vidcurrent");
	} else {
	$("ul.jYTp-playlist li:nth-child("+number+")").addClass("vidcurrent");
	}
}


// ******************************************* DOC READY 
/* DOC READY 
* Huement-UI Demo------
* These Functions make the player work. Adapt to your own needs
* author: @johnnyfortune ------*/

$(document).ready(function() {

$('#jYTp-pause').hide();
$('#jYTp-unmute').hide();
displayVideoList(0);

$('a.video_link').click(function() {	
	var id = $(this).attr('title');
	var number = $(this).attr('id');
	loadNewVideo(id, 0);
	displayVideoList(number);
	$('#jYTp-play').hide();
	$('#jYTp-pause').show();
	return false;
});

$('#loadVideo').click(function() {
	loadNewVideo("4J-ldJ9Iy9g", 0);
	displayVideoList();
	getDuration();
	return false;
});
	
$('ul#youtubePlayer li').hover(
	function() { $(this).addClass('theme_back'); }, 
	function() { $(this).removeClass('theme_back'); }
);

$(".jYTp-play").click(function() {
	play();
	return false;	
});
	
$(".jYTp-pause").click(function() {
	pause();
	return false;	
});

$(".jYTp-stop").click(function() {
	stop();
	return false;	
});

$(".jYTp-next").click(function() {
	ytnext();
	return false;	
});

$(".jYTp-prev").click(function() {
	ytprev();
	return false;	
});

$(".jYTp-mute").click(function() {
	mute();
		$('.jYTp-volume-bar-value').slider({
			range: "min",
			value: 0
		}).width(170);
		return false;	
});
	
$(".jYTp-unmute").click(function() {
	unMute();
		$('.jYTp-volume-bar-value').slider({
			range: "min",
			value: 80
		}).width(170);
	return false;	
});

$('.jYTp-volume-bar-value').slider({
	range: "min",
	value: 80,
	change: function(){ 
		var newVolume = $( ".jYTp-volume-bar-value" ).slider( "value" );	
		//jgrowlMsg(amount); 
		setVolume(newVolume);
		if(newVolume > 0){
		unMute();
		}
	}
}).width(170);

$(".jYTp-seek-bar").click(function(e){
	var maxWidth = $(this).css("width").slice(0, -2); //remove the 'px' from the css-value
	var clickPos = e.pageX - this.offsetLeft; //where have you clicked in the progressbar?
	var percentage = clickPos / maxWidth * 100; //convert it to a percentage
	var duration = getDuration();
	var time = duration * (percentage / 100);
	seekTo(time);
	return false;
});

$(".jYTp-play-bar").progressbar({
	value: 0
}).width(405);

// **********************************      END Doc Ready
});