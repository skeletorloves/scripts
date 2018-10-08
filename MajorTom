/*
*	MajorTom.js is for a walking necro leader
*
*	pickles:	lists help cmds
*	watchmaker:	time left
*	troops:		moves necro to river of fire, waits for troops to follow, sends bo cmd, returns to town, disables barb
*	fini:		exits leader's while loop
*
*	hulk:		necro's cmd for peeps to precast/bo
*
*    function myQuietVoice(_statement)  utilizes: Config.debugChat = false; 
*
*    myTPwaitforteam()  : makes a tp and waits for party to arrive
*    myWaitForTeam(_complete, _tp) {                // false: wait until followers minus bo barb are near me
													// true:   wait until the entire party is near to me
*
*/

function MajorTom() {
	
	// collection of variables
	//
	var	Config.debugChat = false,	 							// for when wishing to disable my extra chattinesses
		_teleSorc = "qBITE",
		_barbStop = false;
	
	if(Config.BObarb == "none") Config.BObarb = "*****";
	
	
	var command, hostile, nick, spot, tick, s, m,
		startTime = getTickCount(),
		greet = [];
	var failTimer = 120;
	
	// leader functions
	//
	this.majortom = function () {			       	// ldr heads to river, then waits for flwrs to arrive
													// once all nearby, instruct barb to bo
													// ldr returns to town, then parks barb in town
													// instructs sorc to go and make a tp at chaos entrance
													// ldr uses sorc's tp to head to chaos ctr
													// ldr clears a bit while waiting for the followers minus the bo barb
													// as soon as followers are near, begin to clear from star to the three seals and diablo
		Precast.doPrecast(true);
		if(!Pather.useWaypoint(107)) return false;			// was unable to move to river
		myOffOfWP();                                        // moves leader away from wp
		
		myWaitForTeam(true, true);                          // ldr makes a tp, then waits for followers
		
		myQuietVoice("...everybody is in and waiting where I am.");
		delay(18000);
		say("hulk");
		delay(7000);
		Town.goToTown();
		
		myWaitForTeam(true, false);
		delay(3000);
		say(Config.BObarb + " yoyo");
		delay(4000);
		
		say("entrance");										// instruct sorcies to go to chaos entrence where they auto make a tp
		delay(3000);
		
		while(!Pather.usePortal(108, null)) { delay(750); }		// use any chaos tp
		delay(250);
		
		Pather.makePortal();
		delay(1000);
		//attack.clearLevel(0);
		d2_clrChaosEntrance();									// follow coords to clear chaos from the entrance onward
		
		Town.goToTown();
		delay(10000);	// temp for editing
		
		return true;
	};


	this.giveWps = function (nick) {
		if (!Misc.inMyParty(nick)) {
			me.overhead("Accept party invite, noob.");

			return false;
		}

		var i, act, timeout, wpList;

		

		act = this.getPlayerAct(nick);

		switch (act) {
		case 1:
			wpList = [3, 4, 5, 6, 27, 29, 32, 35, 48, 42, 57, 43, 44, 52, 74, 46, 76, 77, 78, 79, 80, 81, 83, 101, 106, 107, 111, 112, 113, 115, 123, 117, 118, 129];

			break;
		case 2:
			wpList = [48, 42, 57, 43, 44, 52, 74, 46];

			break;
		case 3:
			wpList = [76, 77, 78, 79, 80, 81, 83, 101];

			break;
		case 4:
			wpList = [106, 107];

			break;
		case 5:
			wpList = [111, 112, 113, 115, 123, 117, 118, 129];

			break;
		}

MainLoop:
		for (i = 0; i < wpList.length; i += 1) {

			try {
				Pather.useWaypoint(wpList[i], true);
				Pather.makePortal();
				me.overhead(getArea().name + " TP up");

				for (timeout = 0; timeout < 20; timeout += 1) {
					if (getUnit(0, nick)) {
						break;
					}

					delay(1000);
				}

				if (timeout >= 20) {
					me.overhead("Aborting wp giving.");

					break MainLoop;
				}

				delay(5000);
			} catch (error) {

			}
		}

		Town.doChores();
		Town.goToTown(1);
		Town.move("portalspot");

		this.wpNicks[nick].requests += 1;
		this.wpNicks[nick].timer = getTickCount();

		return true;
	};

	this.getPlayerAct = function (name) {
		var unit = getParty();

		if (unit) {
			do {
				if (unit.name === name) {
					if (unit.area <= 39) {
						return 1;
					}

					if (unit.area >= 40 && unit.area <= 74) {
						return 2;
					}

					if (unit.area >= 75 && unit.area <= 102) {
						return 3;
					}

					if (unit.area >= 103 && unit.area <= 108) {
						return 4;
					}

					return 5;
				}
			} while (unit.getNext());
		}

		return false;
	};

	
	function ChatEvent(nick, msg) {
		command = [msg, nick];
	}

	function GreetEvent(mode, param1, param2, name1, name2) {
		switch (mode) {
		case 0x02:
			if (me.inTown && me.mode === 5) { // idle in town
				greet.push(name1);
			}

			break;
		}
	}

	// START
	
	addEventListener("chatmsg", ChatEvent);
	addEventListener("gameevent", GreetEvent);
	Town.doChores();
	Town.goToTown(4);	// head to the pandemonium fortress
	Precast.doPrecast(true);
	Town.move("portalspot");

	spot = {
		x: me.x,
		y: me.y
	};

	while (true) {
		while (greet.length > 0) {
			nick  = greet.shift();
			me.overhead("Welcome, " + nick + "! For a list of commands say 'pickles'");
		}

		if (spot && getDistance(me, spot) > 10) {
			Pather.moveTo(spot.x, spot.y);
		}

		if (command) {	// (command && !this.floodCheck(command))
			switch (command[0].toLowerCase()) {
			case "pickles":

				me.overhead("Commands:");
				me.overhead("Remaining time: watchmaker" +
						(Config.MJ.Triggers[0] ? " | prep troops: " + Config.MJ.Triggers[0] : "") +
						(Config.MJ.Triggers[1] ? " | send sorc to entrance: " + Config.MJ.Triggers[1] : "") +
						(Config.MJ.Triggers[2] ? " | Give waypoints: " + Config.MJ.Triggers[2] : ""));

				//break;
			case "watchmaker":	// "timeleft"
				tick = Config.MJ.GameLength * 6e4 - getTickCount() + startTime;
				m = Math.floor(tick / 60000);
				s = Math.floor((tick / 1000) % 60);

				me.overhead("Time left: " + (m ? m + " minute" + (m > 1 ? "s" : "") + ", " : "") + s + " second" + (s > 1 ? "s." : "."));

				break;
			case Config.MJ.Triggers[0].toLowerCase(): 	// troops
				this.majortom(command[1]);			   	// send necro to river of flames, open a tp, wait for all to be follow
														// then send the cmd for bo, go back to town

				break;
			case Config.MJ.Triggers[1].toLowerCase(): 	// cows
				this.openPortal(command[1]);
				me.cancel();

				break;
			case Config.MJ.Triggers[2].toLowerCase(): 	// wps
				this.giveWps(command[1]);

				break;
			case "loc":
				me.overhead(me.x + ", " + me.y);
				break;
			
			case "aden":
				d2_den();
				break;
			case "coldp":
				d2_coldplains();
				break;
			case "acave1":
				d2_cave1();
				break;
			case "stonyf":
				d2_stonyfield();
				break;
			case "lutg":
				d2_lutgholein();
				break;
				
			case "skellies":								// for gathering enough skellies
				me.overhead("Gathering skellies...");
				if(!d2_gatherSkellies()) {
					me.overhead("Skellies gathering may have failed...");
					break;
				}
				me.overhead("We should have enough skellies to start something...");
				_barbStop = true;
				break;
				
			case "ctrme":			//  send a sorc to chaos ctr. The moment she returns, go through her tp and make a tp
									//	wait there until the two sorc's are in | 6. as soon as they are there, begin clearing
				me.overhead("Sending sorc to Chaos' centre and then it begins...");
				d2_ctrme(_teleSorc);
				break;
			case "fini":
				return true;
			}
		}

		command = "";

		if (me.act != 4 && !_barbStop) {
			Town.goToTown(4);
			say(Config.BObarb + " yo");
			delay(8000);
		}

		

		if (getTickCount() - startTime >= Config.MJ.GameLength * 6e4) {
			me.overhead("Let's make this work or die!");
			delay(1000);

			break;
		}

		delay(200);
	}
	return true;
}
function d2_coldplains() {
	Town.goToTown(1);
	prepTroops(3);			// function for prepping troops; this is for waypoint 3
	delay(500);
	Attack.clearLevel(0);
	
	if(1) me.overhead("...time for zee den");
	
	if (!Pather.moveToExit([2, 8], true, true) || !Pather.moveToPreset(me.area, 1, 774, 0, 0, true, true)) {
		me.overhead("Failed to move to Corpsefire");
		return 0;
	}
	if (me.area == 8) Attack.clearLevel(0);
	
	return 0;
}
function d2_den() {
	Town.goToTown(1);
	prepTroops(3);			// function for prepping troops; this is for waypoint 3
	delay(500);
	if(1) me.overhead("...time for zee den");
	
	if (!Pather.moveToExit([2, 8], true, true) || !Pather.moveToPreset(me.area, 4, 774, 0, 0, true, true)) { // 736: Coldcrow
		me.overhead("Failed to move to Coldcrow");
		return 0;
	}
	Pather.moveTo(me.x + rand(-5, 5) * 2, me.y + rand(-5, 5) * 2);	// move a wee bit, so as to not be on wp
		
	while(troopsInMyArea() < (Config.MJ.troops.length -1)) { Attack.clear(5, 0, false, false, true); }
	
	Attack.clearLevel(0);
	return 0;
}
function d2_cave1() {
	Town.goToTown(1);
	prepTroops(3);			// function for prepping troops; this is for waypoint 3
	delay(500);
	if(1) me.overhead("...time for zee cave 1");
	
	if (!Pather.moveToExit([3, 9], true, true)) { // || !Pather.moveToPreset(me.area, 4, 736, 0, 0, true, true)) {
		me.overhead("Failed to move to Corpsefire");
		return 0;
	}
	Pather.moveTo(me.x + rand(-5, 5) * 2, me.y + rand(-5, 5) * 2);	// move a wee bit, so as to not be on wp
	
	if (me.area == 9) {
		while(troopsInMyArea() < (Config.MJ.troops.length -1)) { Attack.clear(5, 0, false, false, true); }
		Attack.clearLevel(0);
	}
	return 0;
}
function d2_stonyfield() {
	myQuietVoice("Config.MJ.troops.length: " + Config.MJ.troops.length);
	
	Town.goToTown(1);	// head to the rogue town
	Town.doChores();
	delay(8000);
	
	if(!Pather.useWaypoint(4)) return false;	// head to cold plains
	Pather.moveTo(me.x + rand(-5, 5) * 2, me.y + rand(-5, 5) * 2);	// move a wee bit, so as to not be on wp
	Pather.makePortal();
	while(!troopsInMyArea()) { delay(2000); }						// wait for the barb and the two sorcies to come to river
	
	myQuietVoice("...everybody is in and waiting at Stony Fields.");
	delay(18000);
	say("hulk");
	delay(7000);
	say(Config.BObarb + " yo-yo");
	delay(5000);
	
	while(!(troopsInMyArea() >= 2) || troopsNearMe()) { 	// check if everyone is in the same area & near, if not pause 'til they are
		myQuietVoice("...someone has left our area or is out of range. We'll stay put 'til they return.");
		Attack.clear(10, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
		delay(1000); 
	}
				
	myQuietVoice("...everybody is in or nearby. We can do it!");
	Attack.clearLevel(0);
	
	return 0;
}
function d2_lutgholein() {
	myQuietVoice("Config.MJ.troops.length: " + Config.MJ.troops.length);
	
	Town.goToTown(2);	// head to the lut gholein
	Town.doChores();
	delay(8000);
	
	if(!Pather.useWaypoint(46)) return false;	// head to cold plains
	Pather.moveTo(me.x + rand(-8, -4) * 2, me.y + rand(4, 8) * 2);	// move a wee bit, so as to not be on wp
	Pather.makePortal();
	while(!troopsInMyArea()) { delay(2000); }						// wait for the barb and the two sorcies to come to river
	
	myQuietVoice("...everybody is in and waiting at Lut Gholein.");
	delay(18000);
	say("hulk");
	delay(7000);
	say(Config.BObarb + " yo-yo");
	delay(5000);
	
	while(!(troopsInMyArea() >= 2) || troopsNearMe()) { 	// check if everyone is in the same area & near, if not pause 'til they are
		myQuietVoice("...someone has left our area or is out of range. We'll stay put 'til they return.");
		Attack.clear(10, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
		delay(1000); 
	}
				
	myQuietVoice("...everybody is in or nearby. We can do it!");
	Attack.clearLevel(0);
	
	return 0;
}

function d2_clrChaosEntrance() {
	myQuietVoice("Config.MJ.troops.length: " + Config.MJ.troops.length);
	
	this.sort = function (a, b) {
		// Entrance to Star / De Seis
		if (me.y > 5325 || me.y < 5260) {
			if (a.y > b.y) {
				return -1;
			}

			return 1;
		}

		// Vizier
		if (me.x < 7765) {
			if (a.x > b.x) {
				return -1;
			}

			return 1;
		}

		// Infector
		if (me.x > 7825) {
			if (!checkCollision(me, a, 0x1) && a.x < b.x) {
				return -1;
			}

			return 1;
		}

		return getDistance(me, a) - getDistance(me, b);
	};
	
	this.getLayout = function (seal, value) {
		var sealPreset = getPresetUnit(108, 2, seal);

		if (!seal) {
			me.overhead("Seal preset not found. Can't continue.");
		}

		if (sealPreset.roomy * 5 + sealPreset.y === value || sealPreset.roomx * 5 + sealPreset.x === value) {
			return 1;
		}

		return 2;
	};

	this.initLayout = function () {
		this.vizLayout = this.getLayout(396, 5275);
		this.seisLayout = this.getLayout(394, 7773);
		this.infLayout = this.getLayout(392, 7893);
	};
	
	this.openSeal = function (classid) {
		var i, seal, warn;

		switch (classid) {
		case 396:
		case 394:
		case 392:
			warn = true;

			break;
		default:
			warn = false;

			break;
		}

		for (i = 0; i < 5; i += 1) {
			Pather.moveToPreset(108, 2, classid, classid === 394 ? 5 : 2, classid === 394 ? 5 : 0);

			seal = getUnit(2, classid);
			warn = false;
			
			if (classid === 394) {
				Misc.click(0, 0, seal);
			} else {
				seal.interact();
			}
			
			delay(classid === 394 ? 1000 : 500);

			if (!seal.mode) {
				if (classid === 394 && Attack.validSpot(seal.x + 15, seal.y)) { // de seis optimization
					Pather.moveTo(seal.x + 15, seal.y);
				} else {
					Pather.moveTo(seal.x - 5, seal.y - 5);
				}

				delay(500);
			} else {
				return true;
			}
		}

		return false;
	};
	this.chaosPreattack = function (name, amount) {
		var i, n, target, positions;

		switch (me.classid) {
		case 0:
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			target = getUnit(1, name);

			if (!target) {
				return;
			}

			positions = [[6, 11], [0, 8], [8, -1], [-9, 2], [0, -11], [8, -8]];

			for (i = 0; i < positions.length; i += 1) {
				if (Attack.validSpot(target.x + positions[i][0], target.y + positions[i][1])) { // check if we can move there
					Pather.moveTo(target.x + positions[i][0], target.y + positions[i][1]);
					Skill.setSkill(Config.AttackSkill[2], 0);

					for (n = 0; n < amount; n += 1) {
						Skill.cast(Config.AttackSkill[1], 1);
					}

					break;
				}
			}

			break;
		case 4:
			break;
		case 5:
			break;
		case 6:
			break;
		}
	};
	this.getBoss = function (name) {
		var i, boss,
			glow = getUnit(2, 131);

		for (i = 0; i < 16; i += 1) {
			boss = getUnit(1, name);

			if (boss) {
				this.chaosPreattack(name, 8);

				return Attack.clear(40, 0, name, this.sort);
			}

			delay(250);
		}

		return !!glow;
	};
	this.vizierSeal = function () {
		me.overhead("Viz layout " + this.vizLayout);
		this.followPath(this.vizLayout === 1 ? this.starToVizA : this.starToVizB);

		if (!this.openSeal(395) || !this.openSeal(396)) {
			me.overhead("Failed to open Vizier seals.");
		}

		if (this.vizLayout === 1) {
			Pather.moveTo(7691, 5292, 0, true);
		} else {
			Pather.moveTo(7695, 5316, 0, true);
		}

		if (!this.getBoss(getLocaleString(2851))) {
			me.overhead("Failed to kill Vizier");
		}
		Pather.moveTo(7759, 5291, 0, true);
		Pather.moveTo(7781, 5264, 0, true);
		return true;
	};

	this.seisSeal = function () {
		me.overhead("Seis layout " + this.seisLayout);
		this.followPath(this.seisLayout === 1 ? this.starToSeisA : this.starToSeisB);

		if (!this.openSeal(394)) {
			me.overhead("Failed to open de Seis seal.");
		}

		if (this.seisLayout === 1) {
			Pather.moveTo(7820, 5158, 0, true);
			Pather.moveTo(7813, 5189, 0, true);
			Pather.moveTo(7778, 5195, 0, true);
			Pather.moveTo(7777, 5215, 0, true);
		} else {
			Pather.moveTo(7785, 5154, 0, true);
			Pather.moveTo(7775, 5162, 0, true);
		}

		if (!this.getBoss(getLocaleString(2852))) {
			me.overhead("Failed to kill de Seis");
		}
		Pather.moveTo(7801, 5263, 0, true);
		Pather.moveTo(7828, 5284, 0, true);
		return true;
	};

	this.infectorSeal = function () {
		me.overhead("Inf layout " + this.infLayout);
		this.followPath(this.infLayout === 1 ? this.starToInfA : this.starToInfB);

		if (!this.openSeal(392)) {
			me.overhead("Failed to open Infector seals.");
		}

		if (this.infLayout === 1) {
			delay(1);
		} else {
			Pather.moveTo(7928, 5295, 0, true); // temp
		}

		if (!this.getBoss(getLocaleString(2853))) {
			me.overhead("Failed to kill Infector");
		}

		if (!this.openSeal(393)) {
			me.overhead("Failed to open Infector seals.");
		}
		Pather.moveTo(7791, 5299);
		return true;
	};
	this.diabloPrep = function () {
		var trapCheck,
			tick = getTickCount();

		while (getTickCount() - tick < 30000) {
			if (getTickCount() - tick >= 8000) {
				switch (me.classid) {
				case 1: // Sorceress
					if ([56, 59, 64].indexOf(Config.AttackSkill[1]) > -1) {
						if (me.getState(121)) {
							delay(500);
						} else {
							Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);
						}

						break;
					}

					delay(500);

					break;
				case 3: // Paladin
					Skill.setSkill(Config.AttackSkill[2]);
					Skill.cast(Config.AttackSkill[1], 1);

					break;
				case 5: // Druid
					if (Config.AttackSkill[1] === 245) {
						Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);

						break;
					}

					delay(500);

					break;
				case 6: // Assassin
					if (Config.UseTraps) {
						trapCheck = ClassAttack.checkTraps({x: 7793, y: 5293});

						if (trapCheck) {
							ClassAttack.placeTraps({x: 7793, y: 5293, classid: 243}, trapCheck);

							break;
						}
					}

					delay(500);

					break;
				default:
					delay(500);

					break;
				}
			} else {
				delay(500);
			}

			if (getUnit(1, 243)) {
				return true;
			}
		}

		me.overhead("Diablo not found");
		return false;
	};
	this.followPath = function (path) {
		var i;

		for (i = 0; i < path.length; i += 2) {
			/*if (this.cleared.length) {
				this.clearStrays();
			}*/
			
			while(!(troopsInMyArea() >= 2) || troopsNearMe()) { 	// check if everyone is in the same area & near, if not pause 'til they are
				myQuietVoice("...someone has left our area or is out of range. We'll stay put 'til they return.");
				Attack.clear(10, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
				delay(1000); 
			}
						
			myQuietVoice("...everybody is in or nearby. We can do it!");

			
			Pather.moveTo(path[i], path[i + 1], 3, 1); 				// (path[i], path[i + 1], 3, getDistance(me, path[i], path[i + 1]) > 50)
			Attack.clear(30, 0, false, this.sort);

			// Push cleared positions so they can be checked for strays
			this.cleared.push([path[i], path[i + 1]]);

			// After 5 nodes go back 2 nodes to check for monsters
			/*if (i === 10 && path.length > 16) {
				path = path.slice(6);
				i = 0;
			}*/
		}
	};

	this.clearStrays = function () {
		/*if (!Config.PublicMode) {
			return false;
		}*/

		var i,
			oldPos = {x: me.x, y: me.y},
			monster = getUnit(1);

		if (monster) {
			do {
				if (Attack.checkMonster(monster)) {
					for (i = 0; i < this.cleared.length; i += 1) {
						if (getDistance(monster, this.cleared[i][0], this.cleared[i][1]) < 30 && Attack.validSpot(monster.x, monster.y)) {
							me.overhead("we got a stray");
							Pather.moveToUnit(monster);
							Attack.clear(15, 0, false, this.sort);

							break;
						}
					}
				}
			} while (monster.getNext());
		}

		if (getDistance(me, oldPos.x, oldPos.y) > 5) {
			Pather.moveTo(oldPos.x, oldPos.y);
		}

		return true;
	};

	this.defendPlayers = function () {
		var player,
			oldPos = {x: me.x, y: me.y},
			monster = getUnit(1);

		if (monster) {
			do {
				if (Attack.checkMonster(monster)) {
					player = getUnit(0);

					if (player) {
						do {
							if (player.name !== me.name && getDistance(monster, player) < 30) {
								me.overhead("defending players");
								Pather.moveToUnit(monster);
								Attack.clear(15, 0, false, this.sort);
							}
						} while (player.getNext());
					}
				}
			} while (monster.getNext());
		}

		if (getDistance(me, oldPos.x, oldPos.y) > 5) {
			Pather.moveTo(oldPos.x, oldPos.y);
		}

		return true;
	};

	
	this.cleared = [];

	// path coordinates
	this.entranceToStar = [7790, 5526, 7794, 5517, 7791, 5491, 7768, 5459, 7775, 5424, 7817, 5458, 7777, 5408, 7769, 5379, 7777, 5357, 7809, 5359, 7805, 5330, 7780, 5317, 7791, 5293];
	this.starToVizA = [7759, 5295, 7734, 5295, 7716, 5295, 7718, 5276, 7697, 5292, 7678, 5293, 7665, 5276, 7662, 5314];
	this.starToVizB = [7759, 5295, 7734, 5295, 7716, 5295, 7701, 5315, 7666, 5313, 7653, 5284];
	this.starToSeisA = [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7775, 5205, 7804, 5193, 7814, 5169, 7788, 5153];
	this.starToSeisB = [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7811, 5218, 7807, 5194, 7779, 5193, 7774, 5160, 7803, 5154];
	this.starToInfA = [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5295, 7919, 5290];
	this.starToInfB = [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5274, 7927, 5275, 7932, 5297, 7923, 5313];

	this.initLayout();
	this.followPath(this.entranceToStar);
	
	Attack.clear(30, 0, false, this.sort);
	this.vizierSeal();
	this.seisSeal();
	Precast.doPrecast(true);
	this.infectorSeal();
	
	switch (me.classid) {
	case 1:
		Pather.moveTo(7792, 5294);

		break;
	default:
		Pather.moveTo(7788, 5292);

		break;
	}

	
	this.diabloPrep();
	Attack.kill(243); // Diablo
	Pickit.pickItems();
	delay(rand(5000,10000));
	return true;
}


//
function d2_ctrme(_tSorc) {		// not fisished
	Town.goToTown(4);
	while(troopsInMyArea() < Config.MJ.troops.length) { delay(2000); }
	
	delay(4000);
	say(_tSorc + " ctr");
	
	while(!Pather.usePortal(108, _tSorc)) { delay(750) } // as soon as sorc's portal opens, use the portal
	delay(250);
	Pather.makePortal();
	
	while(!troopsInMyArea()) { 		// check if everyone is in the same area & near, if not pause 'til they are
		myQuietVoice("...someone has left our area or is out of range. We'll stay put 'til they return.");
		Attack.clear(8, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
		delay(750); 
	}
		
		
	this.sort = function (a, b) {
		// Entrance to Star / De Seis
		if (me.y > 5325 || me.y < 5260) {
			if (a.y > b.y) {
				return -1;
			}

			return 1;
		}

		// Vizier
		if (me.x < 7765) {
			if (a.x > b.x) {
				return -1;
			}

			return 1;
		}

		// Infector
		if (me.x > 7825) {
			if (!checkCollision(me, a, 0x1) && a.x < b.x) {
				return -1;
			}

			return 1;
		}

		return getDistance(me, a) - getDistance(me, b);
	};
	
	this.getLayout = function (seal, value) {
		var sealPreset = getPresetUnit(108, 2, seal);

		if (!seal) {
			me.overhead("Seal preset not found. Can't continue.");
		}

		if (sealPreset.roomy * 5 + sealPreset.y === value || sealPreset.roomx * 5 + sealPreset.x === value) {
			return 1;
		}

		return 2;
	};

	this.initLayout = function () {
		this.vizLayout = this.getLayout(396, 5275);
		this.seisLayout = this.getLayout(394, 7773);
		this.infLayout = this.getLayout(392, 7893);
	};
	
	this.openSeal = function (classid) {
		var i, seal, warn;

		switch (classid) {
		case 396:
		case 394:
		case 392:
			warn = true;

			break;
		default:
			warn = false;

			break;
		}

		for (i = 0; i < 5; i += 1) {
			Pather.moveToPreset(108, 2, classid, classid === 394 ? 5 : 2, classid === 394 ? 5 : 0);

			seal = getUnit(2, classid);
			warn = false;
			
			if (classid === 394) {
				Misc.click(0, 0, seal);
			} else {
				seal.interact();
			}
			
			delay(classid === 394 ? 1000 : 500);

			if (!seal.mode) {
				if (classid === 394 && Attack.validSpot(seal.x + 15, seal.y)) { // de seis optimization
					Pather.moveTo(seal.x + 15, seal.y);
				} else {
					Pather.moveTo(seal.x - 5, seal.y - 5);
				}

				delay(500);
			} else {
				return true;
			}
		}

		return false;
	};
	this.chaosPreattack = function (name, amount) {
		var i, n, target, positions;

		switch (me.classid) {
		case 0:
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			target = getUnit(1, name);

			if (!target) {
				return;
			}

			positions = [[6, 11], [0, 8], [8, -1], [-9, 2], [0, -11], [8, -8]];

			for (i = 0; i < positions.length; i += 1) {
				if (Attack.validSpot(target.x + positions[i][0], target.y + positions[i][1])) { // check if we can move there
					Pather.moveTo(target.x + positions[i][0], target.y + positions[i][1]);
					Skill.setSkill(Config.AttackSkill[2], 0);

					for (n = 0; n < amount; n += 1) {
						Skill.cast(Config.AttackSkill[1], 1);
					}

					break;
				}
			}

			break;
		case 4:
			break;
		case 5:
			break;
		case 6:
			break;
		}
	};
	this.getBoss = function (name) {
		var i, boss,
			glow = getUnit(2, 131);

		for (i = 0; i < 16; i += 1) {
			boss = getUnit(1, name);

			if (boss) {
				this.chaosPreattack(name, 8);

				return Attack.clear(40, 0, name, this.sort);
			}

			delay(250);
		}

		return !!glow;
	};
	this.vizierSeal = function () {
		me.overhead("Viz layout " + this.vizLayout);
		this.followPath(this.vizLayout === 1 ? this.starToVizA : this.starToVizB);

		if (!this.openSeal(395) || !this.openSeal(396)) {
			me.overhead("Failed to open Vizier seals.");
		}

		if (this.vizLayout === 1) {
			Pather.moveTo(7691, 5292, 0, true);
		} else {
			Pather.moveTo(7695, 5316, 0, true);
		}

		if (!this.getBoss(getLocaleString(2851))) {
			me.overhead("Failed to kill Vizier");
		}
		Pather.moveTo(7759, 5291, 0, true);
		Pather.moveTo(7781, 5264, 0, true);
		return true;
	};

	this.seisSeal = function () {
		me.overhead("Seis layout " + this.seisLayout);
		this.followPath(this.seisLayout === 1 ? this.starToSeisA : this.starToSeisB);

		if (!this.openSeal(394)) {
			me.overhead("Failed to open de Seis seal.");
		}

		if (this.seisLayout === 1) {
			Pather.moveTo(7820, 5158, 0, true);
			Pather.moveTo(7813, 5189, 0, true);
			Pather.moveTo(7778, 5195, 0, true);
			Pather.moveTo(7777, 5215, 0, true);
		} else {
			Pather.moveTo(7785, 5154, 0, true);
			Pather.moveTo(7775, 5162, 0, true);
		}

		if (!this.getBoss(getLocaleString(2852))) {
			me.overhead("Failed to kill de Seis");
		}
		Pather.moveTo(7801, 5263, 0, true);
		Pather.moveTo(7828, 5284, 0, true);
		return true;
	};

	this.infectorSeal = function () {
		me.overhead("Inf layout " + this.infLayout);
		this.followPath(this.infLayout === 1 ? this.starToInfA : this.starToInfB);

		if (!this.openSeal(392)) {
			me.overhead("Failed to open Infector seals.");
		}

		if (this.infLayout === 1) {
			delay(1);
		} else {
			Pather.moveTo(7928, 5295, 0, true); // temp
		}

		if (!this.getBoss(getLocaleString(2853))) {
			me.overhead("Failed to kill Infector");
		}

		if (!this.openSeal(393)) {
			me.overhead("Failed to open Infector seals.");
		}
		Pather.moveTo(7791, 5299);
		return true;
	};
	this.diabloPrep = function () {
		var trapCheck,
			tick = getTickCount();

		while (getTickCount() - tick < 30000) {
			if (getTickCount() - tick >= 8000) {
				switch (me.classid) {
				case 1: // Sorceress
					if ([56, 59, 64].indexOf(Config.AttackSkill[1]) > -1) {
						if (me.getState(121)) {
							delay(500);
						} else {
							Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);
						}

						break;
					}

					delay(500);

					break;
				case 3: // Paladin
					Skill.setSkill(Config.AttackSkill[2]);
					Skill.cast(Config.AttackSkill[1], 1);

					break;
				case 5: // Druid
					if (Config.AttackSkill[1] === 245) {
						Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);

						break;
					}

					delay(500);

					break;
				case 6: // Assassin
					if (Config.UseTraps) {
						trapCheck = ClassAttack.checkTraps({x: 7793, y: 5293});

						if (trapCheck) {
							ClassAttack.placeTraps({x: 7793, y: 5293, classid: 243}, trapCheck);

							break;
						}
					}

					delay(500);

					break;
				default:
					delay(500);

					break;
				}
			} else {
				delay(500);
			}

			if (getUnit(1, 243)) {
				return true;
			}
		}

		me.overhead("Diablo not found");
		return false;
	};
	this.followPath = function (path) {
		var i;

		for (i = 0; i < path.length; i += 2) {
			/*if (this.cleared.length) {
				this.clearStrays();
			}*/
			
			while(!(troopsInMyArea() >= 2) || troopsNearMe()) { 	// check if everyone is in the same area & near, if not pause 'til they are
				myQuietVoice("...someone has left our area or is out of range. We'll stay put 'til they return.");
				Attack.clear(10, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
				delay(1000); 
			}
						
			myQuietVoice("...everybody is in or nearby. We can do it!");

			
			Pather.moveTo(path[i], path[i + 1], 3, 1); 				// (path[i], path[i + 1], 3, getDistance(me, path[i], path[i + 1]) > 50)
			Attack.clear(30, 0, false, this.sort);

			// Push cleared positions so they can be checked for strays
			this.cleared.push([path[i], path[i + 1]]);

			// After 5 nodes go back 2 nodes to check for monsters
			/*if (i === 10 && path.length > 16) {
				path = path.slice(6);
				i = 0;
			}*/
		}
	};

	this.clearStrays = function () {
		/*if (!Config.PublicMode) {
			return false;
		}*/

		var i,
			oldPos = {x: me.x, y: me.y},
			monster = getUnit(1);

		if (monster) {
			do {
				if (Attack.checkMonster(monster)) {
					for (i = 0; i < this.cleared.length; i += 1) {
						if (getDistance(monster, this.cleared[i][0], this.cleared[i][1]) < 30 && Attack.validSpot(monster.x, monster.y)) {
							me.overhead("we got a stray");
							Pather.moveToUnit(monster);
							Attack.clear(15, 0, false, this.sort);

							break;
						}
					}
				}
			} while (monster.getNext());
		}

		if (getDistance(me, oldPos.x, oldPos.y) > 5) {
			Pather.moveTo(oldPos.x, oldPos.y);
		}

		return true;
	};

	this.defendPlayers = function () {
		var player,
			oldPos = {x: me.x, y: me.y},
			monster = getUnit(1);

		if (monster) {
			do {
				if (Attack.checkMonster(monster)) {
					player = getUnit(0);

					if (player) {
						do {
							if (player.name !== me.name && getDistance(monster, player) < 30) {
								me.overhead("defending players");
								Pather.moveToUnit(monster);
								Attack.clear(15, 0, false, this.sort);
							}
						} while (player.getNext());
					}
				}
			} while (monster.getNext());
		}

		if (getDistance(me, oldPos.x, oldPos.y) > 5) {
			Pather.moveTo(oldPos.x, oldPos.y);
		}

		return true;
	};

	
	this.cleared = [];

	// path coordinates
	this.entranceToStar = [7790, 5526, 7794, 5517, 7791, 5491, 7768, 5459, 7775, 5424, 7817, 5458, 7777, 5408, 7769, 5379, 7777, 5357, 7809, 5359, 7805, 5330, 7780, 5317, 7791, 5293];
	this.starToVizA = [7759, 5295, 7734, 5295, 7716, 5295, 7718, 5276, 7697, 5292, 7678, 5293, 7665, 5276, 7662, 5314];
	this.starToVizB = [7759, 5295, 7734, 5295, 7716, 5295, 7701, 5315, 7666, 5313, 7653, 5284];
	this.starToSeisA = [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7775, 5205, 7804, 5193, 7814, 5169, 7788, 5153];
	this.starToSeisB = [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7811, 5218, 7807, 5194, 7779, 5193, 7774, 5160, 7803, 5154];
	this.starToInfA = [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5295, 7919, 5290];
	this.starToInfB = [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5274, 7927, 5275, 7932, 5297, 7923, 5313];

	this.initLayout();
	//this.followPath(this.entranceToStar);
	
	Attack.clear(30, 0, false, this.sort);
	this.vizierSeal();
	this.seisSeal();
	Precast.doPrecast(true);
	this.infectorSeal();
	
	switch (me.classid) {
	case 1:
		Pather.moveTo(7792, 5294);

		break;
	default:
		Pather.moveTo(7788, 5292);

		break;
	}

	
	this.diabloPrep();
	Attack.kill(243); // Diablo
	Pickit.pickItems();
	
	Town.goToTown(4);
	Town.doChores();
	Town.goToTown(4);	// head to the pandemonium fortress
	Town.move("portalspot");
	delay(rand(5000,10000));
	return true;
} 
// dEdit: extra functions
function troopsInMyArea() {
	myQuietVoice("...this is the function for waiting for the troops to be where I am.");
	delay(250);
	
	var count = 0;
	var _party = getParty();
	
	do {
		if(_party.area == me.area) count += 1;
	} while (_party.getNext());
	
	return count;
}
function troopsNearMe() {
	myQuietVoice("Checking distance btwn followers and me...");
	delay(4000);
	var _unit, _dist;
	var _oorCount = 0;
	var _outofrange = false;
	
	for (var _i = 0; _i < Config.MJ.troops.length; _i += 1) {
		if (Config.MJ.troops[_i] !== Config.BObarb) {
			_unit = getUnit(0, Config.MJ.troops[_i]);
			_dist = getDistance(me, _unit);
			if (_dist == 0)	{
				if (Config.debugChat) me.overhead("A peep is too far. Going to town, so as to reset troops...");
				if (!me.intown) Town.goToTown();
				Town.doChores();
				delay(10000);
				Town.move("portalspot");
				delay(250);
				Pather.usePortal(null, me.name);
				while(troopsInMyArea() < (Config.MJ.troops.length -1)) { Attack.clear(5, 0, false, false, true); }
			}
			if (_dist > 50) _oorCount += 1;
			myQuietVoice("The distance between us is: " + _dist + " | _oorCount: " + _oorCount);
			delay(250);
		}
	}

	if(_oorCount > 0) return _outofrange = true;
	return false;
}


function prepTroops(_waypoint) {
	myQuietVoice("me.hpmax: " + me.hpmax + " | Config.meHPmaxOrig: " + Config.meHPmaxOrig); // Config.debugChat
	
	myQuietVoice("Config.MJ.troops.length: " + Config.MJ.troops.length);
	
	Town.goToTown();
	Town.doChores();
	delay(10000);
	
	if(!Pather.useWaypoint(_waypoint)) return false;				// head to _waypoint
	Pather.moveTo(me.x + rand(-5, 5) * 2, me.y + rand(-5, 5) * 2);	// move a wee bit, so as to not be on wp
	Pather.makePortal();
	while(!troopsInMyArea()) { delay(2000); }						// wait for the barb and the two sorcies to come to river
	
	myQuietVoice("...everybody is in and waiting...");
	delay(18000);
	say("hulk");
	delay(7000);
	if(Config.debugChat) { 											// Config.chatDebug
		me.overhead("me.hpmax: " + me.hpmax + " | Config.meHPmaxOrig: " + Config.meHPmaxOrig);
		delay(2750);
	}
	say(Config.BObarb + " yo-yo");
	delay(5000);

	while(!(troopsInMyArea() >= 2) || troopsNearMe()) { 	// check if everyone is in the same area & near, if not pause 'til they are
		myQuietVoice("...someone has left our area or is out of range. We'll stay put 'til they return.");
		Attack.clear(10, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
		delay(1000); 
	}
				
	myQuietVoice("...everybody is in or nearby. We can do it!");
	return true;
}
//
function d2_gatherSkellies() {						// solely for gathering a handful of skellies
	Town.goToTown(4);
	prepTroops(107); 
	Town.goToTown();
	while(!troopsInMyArea()) { delay(2000); } 		// wait for all to come back to me
	Town.goToTown(5);
	
	while(!troopsInMyArea()) { delay(2000); } 		// wait for all to come back to me
	delay(6000);
	
	if(!Pather.useWaypoint(111)) return false;					// head to Frigid Highlands wp
	delay(250);
	Pather.makePortal();
	
	Precast.doPrecast(true);
	while(!(troopsInMyArea() >= 2) || troopsNearMe()) { 		// check if everyone is in the same area & near, if not pause 'til they are
		myQuietVoice("...someone has left our area or is out of range. We'll stay put 'til they return.");
		Attack.clear(8, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
		delay(750); 
	}
	Pather.moveTo(3745, 5084, 3, true);
	Attack.clear(15, 0, getLocaleString(22500)); // Eldritch the Rectifier
	Attack.clear(10, 0, false, false, true);	
	Town.goToTown();	

	return true;
}
// functions which are often used
//
function myQuietVoice(_statement) {
	if(Config.debugChat) {
		me.overhead(_statement);
		delay(250);
	}
	return true;
}
function myWaitForTeam(_complete, _tp) {     // false: wait until followers minus bo barb are near me
																					// true:   wait until the entire party is near to me
	if(!me.intown && _tp) Pather.makePortal();
	switch(_complete) {.                                         
		case false:
			while(troopsInMyArea()  < (Config.MJ.troops.length - 1)) { 
				if(!me.intown) Attack.clear(5, 0, false, false, true); 
				delay(750);                     
			}
			break;
		case true:
			while(troopsInMyArea()  < Config.MJ.troops.length) { 
				if(!me.intown) Attack.clear(5, 0, false, false, true); 
				delay(750);                     
			}				
			break;
	}
	delay(750);
	return true;
}
function myOffOfWP() {
	Pather.moveTo(me.x + rand(-5, 5) * 2, me.y + rand(-5, 5) * 2);	          // move a wee bit, so as to not be on wp
	delay(750);
	return true;
}

// Notes on edits...
/*
	Config.js
		chatDebug: false,
		BObarb: "none",
		amIboed: false,
		meHPmaxOrig: 0,
		
		added: 
			BattleOrders: {
				Mode: 0,			// 0: give bo | 1: get bo
				Wait: false,		// idle until the player that received bo leaves
				Getters: [],		// list of players to wait fpr before casting bo. All players must be in the same area. E.g., ["thesorc","thenecro"]
				BObarb: "none"		// the name of the bo barb
			},
	
	Attack.js
		added:
			Config.debugChat = false;
			troopsInMyArea: function () { ... },
			troopsNearMe: function () { ... },

*/
// Notes on functions...
/*
	unit = getUnit(0, nick);	// nick: the name of the follower
	if (getDistance(me, unit) > 35) me.overhead("Get closer.");
	
	Pather.moveToExit(targetArea, use, clearPath);
	 	targetArea 	- area id or array of area ids to move to
		use 		- enter target area or last area in the array
		clearPath 	- kill monsters while moving
		
	Pather.moveToPreset(area, unitType, unitId, offX, offY, clearPath, pop);
		area 		- area of the preset unit
		unitType 	- type of the preset unit
		unitId 		- preset unit id
		offX 		- offset from unit's x coord
		offY 		- offset from unit's x coord
		clearPath 	- kill monsters while moving
		pop 		- remove last node
	
	moveTo: function (x, y, retry, clearPath, pop)
		x - the x coord to move to
		y - the y coord to move to
		retry - number of attempts before aborting
		clearPath - kill monsters while moving
		pop - remove last node
	
*/
/*    deleted functions

		this.troopsInMyArea = function () {
		myQuietVoice("...this is the function for waiting for the troops to be where I am.");
		delay(250);
		
		var count = 0;
		var _party = getParty();
		
		do {
			if(_party.area == me.area) count += 1;
		} while (_party.getNext());
		
		return count;
	};
	this.troopsNearMe = function () {
		myQuietVoice("Checking distance btwn followers and me...");
		delay(4000);
		var _unit, _dist;
		var _oorCount = 0;
		var _outofrange = false;
		
		for (var _i = 0; _i < Config.MJ.troops.length; _i += 1) {
			if (Config.MJ.troops[_i] !== Config.BObarb) {
				_unit = getUnit(0, Config.MJ.troops[_i]);
				_dist = getDistance(me, _unit);
				if (_dist == 0)	{
					//delay(2000);
					if (Config.debugChat) me.overhead("A peep is too far. Going to town, so as to reset troops...");
					if (!me.intown) Town.goToTown();
					Town.doChores();
					delay(10000);
					Town.move("portalspot");
					delay(250);
					Pather.usePortal(null, me.name);
					myWaitForTeam(false);
				}
				if (_dist > 50) _oorCount += 1;
				myQuietVoice("The distance between us is: " + _dist + " | _oorCount: " + _oorCount);
				//delay(3000);
				delay(250);
			}
		}

		if(_oorCount > 0) return _outofrange = true;
		return false;
	};
	this.troops = function () {	// this.autoChant
								// this will be for sending myself to the river, waiting for the crew.
								// once everone is in, then send bo cmd and then return to town
		myQuietVoice("This is where the I head to River of Flames, wait for troops, direct to bo, and then back to town...");
		
		while(!this.troopsIn()) {	// wait until all the troops are in the game
			myQuietVoice("...waiting for the troops to be all in game.");
			delay(2000);
		}
		myQuietVoice("...waiting for the troops to be all in game.");

		return true;
	};
	this.troopsAllIn = function () {
		myQuietVoice("...this is the function for waiting for the troops to be where I am.");
		
		for (var _i = 0; _i < Config.MJ.troops.length; _i += 1) {
				while (!Misc.inMyParty(Config.MJ.troops[_i]) || !getUnit(0, Config.MJ.troops[_i])) {
					delay(500);
				}
		}
		return true;
	}
	this.sendsorctochaos = function () {	// this.getLeg
		me.overhead("This will be for sending a sorc to enterance, to make a tp, and then to return");

		return false;
	};
	
	this.getWpNick = function (nick) {
		if (!this.wpNicks) {
			this.wpNicks = {};
		}

		if (this.wpNicks.hasOwnProperty(nick)) {
			if (this.wpNicks[nick].requests > 4) {
				return "maxrequests";
			}

			if (getTickCount() - this.wpNicks[nick].timer < 5000) {
				return "mintime";
			}

			return true;
		}

		return false;
	};
	this.addWpNick = function (nick) {
		this.wpNicks[nick] = {timer: getTickCount(), requests: 0};
	};
	
	function myTPwaitforteam() {
	Pather.makePortal();
	myWaitForTeam(true);
	return;
}
*/
