$(function(){
	// load state
	var load = function() {
		var state = window.localStorage.getItem("state");
		try {
			state = JSON.parse(state);
		} catch (e) {
			state = null;
		}
		if (state == null) {
			return;
		}
		console.log(["loading", state]);
		$(".player").each(function(i){
			var player = $(this);
			player.find(".name").text(state[i]["name"]);
			player.find(".score").text(state[i]["score"]);
		});
	};
	load();
	// save state
	var save = function() {
		var state = [];
		$(".player").each(function(){
			var player = $(this);
			state.push({
				"name": player.find(".name").text(),
				"score": player.find(".score").text()
			});
		});
		console.log(["saving", state]);
		window.localStorage.setItem("state", JSON.stringify(state));
	};
	// reset state
	var reset = function() {
		$(".name").each(function(i){
			$(this).text("Player "+(i+1));
		});
		$(".score").text("0");
	}
	// buttons
	$(".score_button").click(function(){
		var that = $(this);
		var element_score = that.parent().find(".score");
		var change = parseInt(that.data("value"));
		if (that.data("negative") == true) {
			change *= -1;
		}
		var score = parseInt(element_score.text()) + change;
		element_score.text(score);
		save();
	});
	$("#edit_names").click(function(){
		$(".player").each(function(){
			var player = $(this);
			var name = player.find(".name");
			if (name.length > 0) {
				var input = $("<input>").addClass("edit_name").val(name.text());
				player.prepend(input);
				name.remove();
			} else {
				var input = player.find(".edit_name");
				var name = $("<span>").addClass("name").text(input.val());
				player.prepend(name);
				input.remove();
			}
		});
		save();
	});
	var resetTimer = 0;
	$("#reset").click(function(){
		var that = $(this);
		if (resetTimer == 0) {
			that.text("Reset?");
			resetTimer = setTimeout(function(){
				resetTimer = 0;
				that.text("Reset")
			}, 500);
		} else {
			clearTimeout(resetTimer);
			resetTimer = 0;
			that.text("Reset");
			reset();
			save();
		}
	});
});