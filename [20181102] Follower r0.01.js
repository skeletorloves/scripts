/*	follower commands:
		kindle:			for chanting team
		tele:			toggles tele on/off
		tele off:		tele off
		tele on:		tele on
		a:				toggles attack on/off
		aoff:			attack off
		aon:			attack on
		fin:			quites game, quit()
		yo:				resumes follower
		yoyo:			stops follower
		yo-yo:			stops follower and sends them to town
		kitkat:			if not a barb, clear the level
		kitkat2:		if not a barb, clear area around leader 'til a range of 60
		
		den, hole, pit, count, andy, duri, meph, centr, ctr, seals, anc, throne, baalb, pindle
		truffle:		followers complete these - countess, andy, duriel, meph, baal
		
		rmini: 			follower(s) does a mini rush of - andy, cube, amulet, staff, summoner, duriel, travi, meph, diablo, shenk
		rmax:			follower(s) does a full rush, incl. all quests minus the den
		
		follower(s) does single rush of: 	randy, rrada, rstaff, ramulet, rsum, rduri, rtravi, rmeph, rizual, rdiablo, rshenk, ranya, rancients, rbaal, 
*/
function Follower() {
	var i, j, stop, leader, leaderUnit, charClass, piece, skill, result, unit, player,
		commanders = [Config.Leader],
		attack = true,
		myAtkDist = 20,
		openContainers = true,
		classes = ["amazon", "sorceress", "necromancer", "paladin", "barbarian", "druid", "assassin"],
		action = "";
	Town.doChores();
	Town.move("portalspot");
	me.overhead("I am all thru chewing bubble gum...");
	
	// Get leader's Party Unit
	this.getLeader = function (name) {
		var player = getParty();

		if (player) {
			do {
				if (player.name === name) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	// Get leader's Unit
	this.getLeaderUnit = function (name) {
		var player = getUnit(0, name);

		if (player) {
			do {
				if (!player.dead) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	// Get leader's act from Party Unit
	this.checkLeaderAct = function (unit) {
		while(unit.area < 1 || unit.area > 136) {
			unit = this.getLeaderUnit();
			delay(rand(2000,4000));
		}

		if (unit.area >= 1 && unit.area <= 39) {
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
		
		if (unit.area >= 109 && unit.area <= 136) {
			return 5;
		}
		return 4;
	};

	// Change areas to where leader is
	this.checkExit = function (unit, area) {
		if (unit.inTown) {
			return false;
		}

		var i, target,
			exits = getArea().exits;

		for (i = 0; i < exits.length; i += 1) {
			if (exits[i].target === area) {
				return 1;
			}
		}

		if (unit.inTown) {
			target = getUnit(2, "waypoint");

			if (target && getDistance(me, target) < 20) {
				return 3;
			}
		}

		target = getUnit(2, "portal");

		if (target) {
			do {
				if (target.objtype === area) {
					Pather.usePortal(null, null, target);

					return 2;
				}
			} while (target.getNext());
		}

		// Arcane<->Cellar portal
		if ((me.area === 74 && area === 54) || (me.area === 54 && area === 74)) {
			Pather.usePortal(null);

			return 4;
		}

		// Tal-Rasha's tomb->Duriel's lair
		if (me.area >= 66 && me.area <= 72 && area === 73) {
			Pather.useUnit(2, 100, area);

			return 4;
		}

		// Throne->Chamber
		if (me.area === 131 && area === 132) {
			target = getUnit(2, 563);

			if (target) {
				Pather.usePortal(null, null, target);

				return 4;
			}
		}

		return false;
	};

	// Talk to a NPC
	this.talk = function (name) {
		if (!me.inTown) {
			me.overhead("ÿc1I'm not in town!");

			return false;
		}

		if (typeof name === "string") {
			name = name.toLowerCase();
		} else {
			me.overhead("ÿc1No NPC name given.");

			return false;
		}

		var npc, names;

		switch (me.act) {
		case 1:
			names = ["gheed", "charsi", "akara", "kashya", "cain", "warriv"];

			break;
		case 2:
			names = ["fara", "lysander", "greiz", "elzix", "jerhyn", "meshif", "drognan", "atma", "cain"];

			break;
		case 3:
			names = ["alkor", "asheara", "ormus", "hratli", "cain"];

			break;
		case 4:
			names = ["halbu", "tyrael", "jamella", "cain"];

			break;
		case 5:
			names = ["larzuk", "malah", "qual-kehk", "anya", "nihlathak", "cain"];

			break;
		}

		if (names.indexOf(name) === -1) {
			me.overhead("ÿc1Invalid NPC.");

			return false;
		}

		if (!Town.move(name === "jerhyn" ? "palace" : name)) {
			Town.move("portalspot");
			me.overhead("ÿc1Failed to move to town spot.");

			return false;
		}

		npc = getUnit(1);

		if (npc) {
			do {
				if (npc.name.replace(/ /g, "").toLowerCase().indexOf(name) > -1) {
					npc.openMenu();
					me.cancel();
					Town.move("portalspot");
					me.overhead("ÿc2Done talking.");

					return true;
				}
			} while (npc.getNext());
		}

		me.overhead("ÿc1NPC not found.");
		Town.move("portalspot");

		return false;
	};

	// Change act after completing last act quest
	this.changeAct = function (act) {
		var npc, preArea, target;

		preArea = me.area;

		switch (act) {
		case 2:
			if (me.area >= 40) {
				break;
			}

			Town.move("warriv");

			npc = getUnit(1, 155);

			if (npc) {
				npc.openMenu();
				Misc.useMenu(0x0D36);
			}

			break;
		case 3:
			if (me.area >= 75) {
				break;
			}

			Town.move("palace");

			npc = getUnit(1, 201);

			if (npc) {
				npc.openMenu();
				me.cancel();
			}

			Town.move("meshif");

			npc = getUnit(1, 210);

			if (npc) {
				npc.openMenu();
				Misc.useMenu(0x0D38);
			}

			break;
		case 4:
			if (me.area >= 103) {
				break;
			}

			if (me.inTown) {
				Town.move("cain");

				npc = getUnit(1, 245);

				if (npc) {
					npc.openMenu();
					me.cancel();
				}

				Town.move("portalspot");
				Pather.usePortal(102, null);
			}

			delay(1500);

			target = getUnit(2, 342);

			if (target) {
				Pather.moveTo(target.x - 3, target.y - 1);
			}

			Pather.usePortal(null);

			break;
		case 5:
			if (me.area >= 109) {
				break;
			}

			Town.move("tyrael");

			npc = getUnit(1, "tyrael");

			if (npc) {
				npc.openMenu();
				me.cancel();

				try {
					Pather.useUnit(2, 566, 109);
				} catch (a5e) {

				}
			}

			break;
		}

		delay(2000);

		while (!me.area) {
			delay(500);
		}

		if (me.area === preArea) {
			me.cancel();
			Town.move("portalspot");
			me.overhead("ÿc1Act change failed.");

			return false;
		}

		Town.move("portalspot");
		me.overhead("ÿc8Act change successful.");

		if (act === 2) {
			me.overhead("Don't forget to talk to Drognan after getting the Viper Amulet!");
		}

		return true;
	};

	this.pickPotions = function (range) {
		if (me.dead) {
			return false;
		}

		Town.clearBelt();

		while (!me.idle) {
			delay(40);
		}

		var status,
			pickList = [],
			item = getUnit(4);

		if (item) {
			do {
				if ((item.mode === 3 || item.mode === 5) && item.itemType >= 76 && item.itemType <= 78 && getDistance(me, item) <= range) {
					pickList.push(copyUnit(item));
				}
			} while (item.getNext());
		}

		pickList.sort(Pickit.sortItems);

		while (pickList.length > 0) {
			item = pickList.shift();

			if (item && copyUnit(item).x) {
				status = Pickit.checkItem(item).result;

				if (status && Pickit.canPick(item)) {
					Pickit.pickItem(item, status);
				}
			}
		}

		return true;
	};

	this.openContainers = function (range) {
		var unit, ox, oy,
			unitList = [],
			containers = ["chest", "loose rock", "hidden stash", "loose boulder", "corpseonstick", "casket", "armorstand", "weaponrack", "barrel", "holeanim",
							"roguecorpse", "ratnest", "corpse", "goo pile", "largeurn", "urn", "chest3", "jug", "skeleton", "guardcorpse", "sarcophagus",
							"cocoon", "basket", "stash", "hollow log", "hungskeleton", "pillar", "skullpile", "skull pile", "jar3", "jar2", "jar1", "bonechest", "woodchestl",
							"woodchestr", "barrel wilderness", "burialchestr", "burialchestl", "explodingchest", "chestl", "chestr", "icecavejar1", "icecavejar2",
							"icecavejar3", "icecavejar4", "deadperson", "deadperson2", "evilurn", "tomb1l", "tomb3l", "tomb2", "tomb3", "object2", "groundtomb", "groundtombl"
						];

		ox = me.x;
		oy = me.y;
		unit = getUnit(2);

		if (unit) {
			do {
				if (containers.indexOf(unit.name.toLowerCase()) > -1 && unit.mode === 0 && getDistance(me, unit) <= range) {
					unitList.push(copyUnit(unit));
				}
			} while (unit.getNext());
		}

		while (unitList.length > 0) {
			unitList.sort(Sort.units);

			unit = unitList.shift();

			if (unit) {
				Misc.openChest(unit);
				Pickit.pickItems();
			}
		}

		return true;
	};

	this.chatEvent = function (nick, msg) {
		if (msg && nick === Config.Leader) {
			myFwlrScipts.choreMe(msg);
			
			switch (msg) {
			//
			// commands for followers
			// tele, tele off, tele on
			// a 		: toggles atk
			// aon/aoff : atk on/off
			// flash 	: not sure?
			// fin		: quit game
			// yo		: toggles follow
			// yoyo		: stops follower, sends to town thru leader's tp, does town chores
			//
				case "kindle":
					if(me.name != "butterside") break;
					Enchant();
					break;
				case "tele":
				case me.name + " tele":
					if (Pather.teleport) {
						Pather.teleport = false;
						me.overhead("ÿc1Teleport off.");
					} else {
						Pather.teleport = true;
						me.overhead("ÿc2Teleport on.");
					}
					break;
				case "tele off":
				case me.name + " tele off":
					Pather.teleport = false;
					me.overhead("ÿc1Teleport off.");
					break;
				case "tele on":
				case me.name + " tele on":
					Pather.teleport = true;
					me.overhead("ÿc2Teleport on.");
					break;
				case "a":
				case me.name + " a":
					if (attack) {
						attack = false;
						me.overhead("ÿc1Attack off.");
					} else {
						attack = true;
						me.overhead("ÿc2Attack on.");
					}
					break;
				case "flash":
					Packet.flash(me.gid);
					break;
				case "aoff":
				case me.name + " aoff":
					attack = false;
					me.overhead("ÿc1Attack off.");
					break;
				case "aon":
				case me.name + " aon":
					attack = true;
					me.overhead("ÿc2Attack on.");
					break;
				case "fin":
				case me.name + " fin":
					quit();
					break;
				case "yo":
				case me.name + " yo":
					stop = false;
					me.overhead("ÿc2Resuming.");	
					break;
				case "yoyo":
				case me.name + " yoyo":
					stop = true;
					me.overhead("ÿc1Stopping.");
					break;
				case "yo-yo":
				case me.name + " yo-yo":
					stop = true;
					me.overhead("ÿc1Stopping.");
					delay(rand(1000,1200));
					if(!Pather.usePortal(null, null)) {
						delay(2000);
						if(!me.inTown) Town.goToTown();
					}
					delay(rand(1000,1200));
					Town.doChores();
					Town.move("portalspot");	
					break;
				case "kitkat":
				case me.name + " kitkat":
					if (me.inTown || me.classid === 4) break;
					me.overhead("ÿc4Clearing area: " + me.area);
					Attack.clearLevel(0);
					break;
				case "kitkat2":
				case me.name + " kitkat2":
					if(me.inTown || me.classid === 4) break;
					me.overhead("ÿc4Clearing near to you: " + me.area);
					Attack.clear(60,0,0,0,true); // dEdit: clear: function (range, spectype, bossId, sortfunc, pickit)
					break;
				default:
					if (me.classid === 3 && msg.indexOf("aura ") > -1) {
						piece = msg.split(" ")[0];

						if (piece === me.name || piece === "all") {
							skill = parseInt(msg.split(" ")[2], 10);

							if (me.getSkill(skill, 1)) {
								me.overhead("ÿc3Active aura is: " + skill);

								Config.AttackSkill[2] = skill;
								Config.AttackSkill[4] = skill;

								Skill.setSkill(skill, 0);
								//Attack.init();
							} else {
								me.overhead("ÿc1I don't have that aura.");
							}
						}

						break;
					}

					if (msg.indexOf("skill ") > -1) {
						piece = msg.split(" ")[0];

						if (charClass.indexOf(piece) > -1 || piece === me.name || piece === "all") {
							skill = parseInt(msg.split(" ")[2], 10);

							if (me.getSkill(skill, 1)) {
								me.overhead("Attack skill is: " + skill);

								Config.AttackSkill[1] = skill;
								Config.AttackSkill[3] = skill;

								//Attack.init();
							} else {
								me.overhead("ÿc1I don't have that skill.");
							}
						}
						break;
					}
					action = msg;
					break;
				}
			}

			if (msg && msg.split(" ")[0] === "leader" && commanders.indexOf(nick) > -1) {
				piece = msg.split(" ")[1];

				if (typeof piece === "string") {
					if (commanders.indexOf(piece) === -1) {
						commanders.push(piece);
					}

					me.overhead("ÿc4Switching leader to " + piece);

					Config.Leader = piece;
					leader = this.getLeader(Config.Leader);
					leaderUnit = this.getLeaderUnit(Config.Leader);
				}
			}
	};

	
	//Enchant();
	addEventListener("chatmsg", this.chatEvent);

	// Override config values that use TP
	Config.TownCheck = false;
	Config.TownHP = 0;
	Config.TownMP = 0;
	charClass = classes[me.classid];

	for (i = 0; i < 20; i += 1) {
		leader = this.getLeader(Config.Leader);

		if (leader) {
			break;
		}

		delay(1000);
	}

	if (!leader) {
		me.overhead("ÿc1Leader not found.");
		delay(1000);
		quit();
	} else {
		me.overhead("ÿc2Leader found.");
	}

	while (!Misc.inMyParty(Config.Leader)) {
		delay(500);
	}

	me.overhead("ÿc2Partied.");
	// Main Loop
	while (Misc.inMyParty(Config.Leader)) {
		while (stop) {
			delay(500);
		}
		if (me.classid == 4 && me.weaponswitch != 0) Precast.weaponSwitch(0); 			// dEdits: verifies if bo barb has weapon slot 0 engaged
		if (!me.inTown) {
			if (!leaderUnit || !copyUnit(leaderUnit).x) {
				leaderUnit = this.getLeaderUnit(Config.Leader);

				if (leaderUnit) {
					me.overhead("ÿc2Leader unit found.");
				}
			}

			if (!leaderUnit) {
				player = getUnit(0);

				if (player) {
					do {
						if (player.name !== me.name) {
							Pather.moveToUnit(player);

							break;
						}
					} while (player.getNext());
				}
			}
			if (((leader.area === 132 || leader.area === 109) && me.area === 131) && !me.getSkill(54,1)) Town.goToTown();	// dEdits: fix flwrs gettin' stuck in throne while the leader is in the chamber
			
			if (leaderUnit && getDistance(me.x, me.y, leaderUnit.x, leaderUnit.y) <= 100 ) { 								// attempt to get closer to the leader | dEdit: changed <= 60 to != 0
				if (getDistance(me.x, me.y, leaderUnit.x, leaderUnit.y) > 4) {
					me.overhead("ÿc7leader's disance is: " + (getDistance(me.x, me.y, leaderUnit.x, leaderUnit.y)));
					delay(250)
					Pather.moveToUnit(leaderUnit);
				}
			}
		
			if (attack) {
				Attack.clear(myAtkDist, false, false, false, true);
				this.pickPotions(20);
			}
			
			Pickit.pickItems();
			this.openContainers(20);
			
			if (me.classid === 3 && Config.AttackSkill[4] > 0) {	// set Pali aura for when not attacking
				Skill.setSkill(Config.AttackSkill[4], 0);
			}

			if (leader.area !== me.area && !me.inTown) {
				while (leader.area === 0) {
					delay(100);
				}

				result = this.checkExit(leader, leader.area);

				switch (result) {
				case 1:
					me.overhead("Taking exit.");
					delay(500);
					Pather.moveToExit(leader.area, true);

					break;
				case 2:
					me.overhead("Taking portal.");

					break;
				case 3:
					me.overhead("Taking waypoint.");
					delay(500);
					Pather.useWaypoint(leader.area, true);

					break;
				case 4:
					me.overhead("Special transit.");

					break;
				}

				while (me.area === 0) {
					delay(100);
				}

				leaderUnit = this.getLeaderUnit(Config.Leader);
			}
			if (leader.inTown && this.checkLeaderAct(leader) == me.act) {
				delay(150);
				me.overhead("ÿc4Going to town.");
				if(me.area == 136) {						// if I am in the Uber Trist area
					//Pather.moveTo(17601, 8070);
					Pather.usePortal(null);
				} else {
					Pather.usePortal(null, leader.name);
				}
				me.overhead("ÿc4Running town chores");
				Town.doChores();
				me.overhead("ÿc2Ready");
				Town.move("portalspot");
			}			
		}
		if (me.inTown) {
			if (leader.area == 39) {
				if (me.area === 1) {
					Town.move("stash");

					if (!Pather.usePortal(39)) {
						me.overhead("ÿc1Failed to use cow portal.");
					}
				}
			}
			else if(leader.area != 39) {
				if (this.checkLeaderAct(leader) !== me.act) {					// diff acts, going to ldr's act
					me.overhead("ÿc8Going to leader's town.");
					Town.goToTown(this.checkLeaderAct(leader));
					me.overhead("ÿc2Ready");
					Town.move("portalspot");
				} 
				if (!leader.inTown && this.checkLeaderAct(leader) === me.act && leader.area != 136) {	// same act & ldr outside, use ldr's portal
					me.overhead("ÿc2Ready");
					Town.move("portalspot");
					me.overhead("ÿc2Going outside.");
					delay(750);
					
					while(!Pather.usePortal(leader.area, leader.name) && (!leader.inTown && (this.checkLeaderAct(leader) === me.act))) { // dEdit: replaced leader.area with null
						delay(rand(750,1100));
					}
					me.overhead("ÿc2Precast");
					
					Precast.doPrecast(true);
					if(leader.area !== me.area) {
						Town.goToTown(this.checkLeaderAct(leader));
						me.overhead("ÿc2Ready");
						Town.move("portalspot");
					}
					else if(leader.area === me.area) {
						while (!this.getLeaderUnit(Config.Leader) && !me.dead) {
							Attack.clear(10);
							delay(200);
						}
					}
				}
				if (!leader.inTown && this.checkLeaderAct(leader) === me.act && leader.area == 136) {	// same act & ldr in uber trist, use trist portal
				me.overhead("ÿc2Ready");
				Town.move("portalspot");
				me.overhead("ÿc2Going outside.");
				delay(750);	
				
				var _portal;
				_portal = d2_uberTristPortal(1);
				if(_portal) {
					Pather.usePortal(null, null, _portal);
					Precast.doPrecast(true);
				}
			}			
			}
		}
				
		switch (action) {
			case "loc":
			case me.name + " loc":
				me.overhead("x,y coords: " + me.x + ", " + me.y);
				break;
			case "moo":					// dEdit cow
			case me.name + " moo":
				if (me.area === 1) {
					Town.move("portalspot");

					if (!Pather.usePortal(39)) {
						me.overhead("ÿc1Failed to use cow portal.");
					}
				}

				break;
			case "ahem":
			case me.name + " ahem":		// dEdit move
				Pather.moveTo(me.x + rand(-5, 5), me.y + rand(-5, 5));
				delay(1000);			// dEdit: added the delay
				break;
			case "way":					// dEdit: wp
			case me.name + " way":
				if (me.inTown) break;
				delay(rand(1, 3) * 500);
				unit = getUnit(2, "waypoint");

				if (unit) {
		WPLoop:
					for (i = 0; i < 3; i += 1) {
						if (getDistance(me, unit) > 3) {
							Pather.moveToUnit(unit);
						}

						unit.interact();

						for (j = 0; j < 100; j += 1) {
							if (j % 20 === 0) {
								me.cancel();
								delay(300);
								unit.interact();
							}

							if (getUIFlag(0x14)) {
								break WPLoop;
							}

							delay(10);
						}
					}
				}

				if (getUIFlag(0x14)) {
					me.overhead("ÿc2Got wp.");
				} else {
					me.overhead("ÿc1Failed to get wp.");
				}

				me.cancel();

				break;
			case "c":
				if (!me.inTown) {
					Town.getCorpse();
				}

				break;
			case "p":
				me.overhead("ÿc4!Picking items.");
				Pickit.pickItems();

				if (openContainers) {
					this.openContainers(20);
				}

				me.overhead("ÿc2!Done picking.");

				break;
			case "1":
				if (me.inTown && leader.inTown && this.checkLeaderAct(leader) !== me.act) {
					me.overhead("ÿc8Going to leader's town.");
					Town.goToTown(this.checkLeaderAct(leader));
					Town.move("portalspot");
				} else if (me.inTown) {
					me.overhead("ÿc2Going outside.");
					delay(rand(3000,4000));
					me.overhead("ÿc7Leader is in act: " + this.checkLeaderAct(leader));
					delay(400)
					Town.goToTown(this.checkLeaderAct(leader));
					delay(400);
					Town.move("portalspot");

					if (!Pather.usePortal(null, leader.name)) {
						break;
					}

					while (!this.getLeaderUnit(Config.Leader) && !me.dead) {
						Attack.clear(10);
						delay(200);
					}
				}

				break;
			case "2":
				if (!me.inTown) {
					delay(150);
					me.overhead("ÿc4Going to town.");
					Pather.usePortal(null, leader.name);
				}

				break;
			case "3":
				if (me.inTown) {
					me.overhead("ÿc4Running town chores");
					Town.doChores();
					Town.move("portalspot");
					me.overhead("ÿc2Ready");
				}

				break;
			case "h":
				if (me.classid === 4) {
					Skill.cast(130);
				}

				break;
			case "hulk":
			case me.name + " hulk":
				if (me.inTown && me.classid === 4) break;
				Precast.doPrecast(true);
				break;
			case "bo":
				if (me.classid === 4) {
					Precast.doPrecast(true);
				}
			case "wep0":
				for (i = 0; i < 5; i += 1) {
					weaponSwitch();
					var tick = getTickCount();
					while (getTickCount() - tick < 2000 + me.ping) {
						if (me.weaponswitch === 0) break;
						delay(10);
					}
				}
				break;
			case "wep1":
				for (i = 0; i < 5; i += 1) {
					weaponSwitch();
					var tick = getTickCount();
					while (getTickCount() - tick < 2000 + me.ping) {
						if (me.weaponswitch === 1) break;
						delay(10);
					}
				}
				break;
			case "a2":
			case "a3":
			case "a4":
			case "a5":
				this.changeAct(parseInt(action[1], 10));

				break;
			case me.name + " tp":
				unit = me.findItem("tbk", 0, 3);

				if (unit && unit.getStat(70)) {
					unit.interact();

					break;
				}

				unit = me.findItem("tsc", 0, 3);

				if (unit) {
					unit.interact();

					break;
				}

				me.overhead("ÿc1No TP scrolls or tomes.");

				break;
		}

		if (action.indexOf("talk") > -1) {
			this.talk(action.split(" ")[1]);
		}

		action = "";

		delay(100);
	}

	return true;
}
//
