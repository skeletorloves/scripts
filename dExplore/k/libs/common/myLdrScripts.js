/*	my custom leader's scripts | place an: include("common/myLdrScripts.js"); into the default.dbj script
*/	
var myLdrScripts = {
	d2_countess: function () {
		me.overhead("starting countess");
		delay(650);
		d2_towners("yo");
		var i, poi;
		myTroops.my_townThings(1, true, "waypoint", false, false, "wBoer", 4000, 7000);
		Pather.useWaypoint(6);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([20, 21, 22, 23, 24, 25], true)) {
			throw new Error("Failed to move to Countess");
		}

		poi = getPresetUnit(me.area, 2, 580);

		if (!poi) {
			throw new Error("Failed to move to Countess (preset not found)");
		}

		switch (poi.roomx * 5 + poi.x) {
		case 12565:
			Pather.moveTo(12578, 11043);
			break;
		case 12526:
			Pather.moveTo(12548, 11083);
			break;
		}
		
		var _unit = getUnit(1, getLocaleString(2875));
		if(_unit != undefined) Pather.moveToUnit(_unit, 1, 1);
		Pather.makePortal();
		delay(250);
		Attack.clear(20, 0, getLocaleString(2875)); // The Countess
		Pickit.pickItems();
		Attack.securePosition(me.x, me.y, 20, 2000);
		
		myTroops.my_townThings(false, true, "waypoint", false, false, "wBoer", 4000, 7000);
		
		return true;
	},
	d2_pit1: function (_a) {
		me.overhead("Pit level 1 & 2 time...");
		delay(650);
		d2_towners("yo");
		myTroops.my_townThings(1, false, "waypoint", false, false, "wBoer", 7000, 9000);
		
		Pather.useWaypoint(6, true);
		Precast.doPrecast(true);
		
		if (!Pather.moveToExit([7, 12], true)) {
			throw new Error("Failed to move to Pit level 1");
		}
		if (_a !== 2) {
			Pather.makePortal();
			delay(250);
			while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { Attack.securePosition(me.x, me.y, 15, 1750); }
			Attack.clearLevel(0);
			myTroops.my_townThings(1, false, "portalspot", false, false, "wBoer", 7000, 9000);
			while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(1500,2700)); }
			Pather.usePortal(null, me.name);
		}
		delay(rand(1500,2000));
		if (!Pather.moveToExit(16, true, false)) {
			throw new Error("Failed to move to Pit level 2");
		}
		Pather.makePortal();
		delay(250);
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { Attack.securePosition(me.x, me.y, 15, 1750); }
		Attack.clearLevel(0);
		
		delay(rand(4000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 9000);

		return true;
	},
	d2_andy: function () {
		me.overhead("Andy time...");
		delay(650);
		d2_towners("yo");
		//myTroops.prepTroops(107, false);
		
		//myTroops.my_townThings(false, false, "waypoint", 2000, 4000, false);
		myTroops.my_townThings(1, false, "waypoint", false, false, "wBoer", 7000, 9000);
		
		Pather.useWaypoint(35, true);
		Precast.doPrecast(true);

		if (!Pather.moveToExit([36, 37], true) || !Pather.moveTo(22582, 9612)) {
			originPather.makePortal();
			Pather.usePortal(null, me.name);
			throw new Error("andy failed");
			return false;
		}

		Pather.moveTo(22563, 9556);
		delay(250);
		var _unit = getUnit(1, 156);
		if(_unit) {
			Pather.moveTo(_unit.x, _unit.y);
			delay(250);
		}
		Pather.makePortal();
		delay(250);
		if(!Attack.kill(156)) delay(500);
		Attack.securePosition(me.x, me.y, 15, 3000);
		
		//Attack.clearLevel(0);
		Pather.moveTo(22563, 9556);
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 9000);

		return true;
	},
	d2_ancTunnels: function () {
		me.overhead("Starting ancient tunnels...");
		delay(650);
		myTroops.my_townThings(2, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		Pather.useWaypoint(74, true);
		
		if (!Pather.moveToExit(65, true)) {
		throw new Error("Failed to move to Ancient Tunnels");
		}
		Pather.makePortal();
		delay(250);
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { Attack.securePosition(me.x, me.y, 15, 1750); }
		
		Attack.clearLevel(0);
		
		say("hulk");
		delay(rand(4000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		return true;
	},
	d2_summoner: function () {
		me.overhead("Starting summoner...");
		delay(650);
		myTroops.my_townThings(2, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		Pather.useWaypoint(74, true);

		var preset = getPresetUnit(me.area, 2, 357),
			spot = {};

		switch (preset.roomx * 5 + preset.x) {
			case 25011:
				spot = {x: 25081, y: 5446};
				break;
			case 25866:
				spot = {x: 25830, y: 5447};
				break;
			case 25431:
				switch (preset.roomy * 5 + preset.y) {
					case 5011:
						spot = {x: 25449, y: 5081};
						break;
					case 5861:
						spot = {x: 25447, y: 5822};
						break;
				}

				break;
		}

		if (!Pather.moveToUnit(spot)) {
			throw new Error("summoner failed");
		}

		Pather.moveToPreset(me.area, 2, 357);
		Pather.makePortal();
		delay(250);
		
		Attack.securePosition(me.x, me.y, 15, 500);
		//Attack.kill(250);
		Pickit.pickItems();
		Attack.securePosition(me.x, me.y, 25, 500);
		Pickit.pickItems();
		delay(rand(4000,5000));
		
		say("hulk");
		delay(rand(4000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		return true;
	},
	
	d2_arcane: function () {
		me.overhead("Starting arcane...");
		delay(250);
		myTroops.my_townThings(2, true, "waypoint", false, false, "wBoer", 7000, 10000);
		
		Pather.useWaypoint(74, true);
		Precast.doPrecast(true);
		Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); }
		
		Attack.clearLevel(0, true); 	// true: creates a delay and checks to see if followers are nearby or have left the area
		
		delay(rand(2000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		return true;
		
	},
	d2_canyon: function () {
		me.overhead("Starting canyon...");
		delay(250);
		myTroops.my_townThings(2, true, "waypoint", false, false, "wBoer", 7000, 10000);
		
		Pather.useWaypoint(46, true);
		Precast.doPrecast(true);
		Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); }
		
		Attack.clearLevel(0, true); 	// true: creates a delay and checks to see if followers are nearby or have left the area
		
		delay(rand(2000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		return true;
		
	},
	d2_duriel: function () {
		me.overhead("Starting duriel...");
		myTroops.my_townThings(2, true, "waypoint", false, false, "wBoer", 7000, 10000);
		
		Pather.useWaypoint(46, true);
		Precast.doPrecast(true);

		if (!Pather.moveToExit(getRoom().correcttomb, true) || !Pather.moveToPreset(me.area, 2, 152)) {
			throw new Error("duriel failed");
		}
		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 30, 3000, true, false);
		myTroops.my_townThings(false, true, "portalspot", 6000, 8000, false);
		Pather.usePortal(null, me.name);
		delay(750);

		while (!getUnit(2, 100)) {
			delay(500);
		}

		Pather.useUnit(2, 100, 73);
		delay(250);
		Pather.makePortal();
		delay(250);

		if(!Attack.kill(211)) delay(500);
		Pickit.pickItems();
		
		delay(rand(5000,7000));
		myTroops.my_townThings(2, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		return true;
	},
	d2_travincal: function () {
		me.overhead("Starting travincal...");
		myTroops.my_townThings(3, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		Pather.useWaypoint(83);
		Precast.doPrecast(true);

		var i, orgX, orgY, coords;

		this.buildList = function (checkColl) {
			var monsterList = [],
				monster = getUnit(1);

			if (monster) {
				do {
					if ([345, 346, 347].indexOf(monster.classid) > -1 && Attack.checkMonster(monster) && (!checkColl || !checkCollision(me, monster, 0x1))) {
						monsterList.push(copyUnit(monster));
					}
				} while (monster.getNext());
			}

			return monsterList;
		};

		orgX = me.x;
		orgY = me.y;

		if (me.getSkill(143, 0) && !me.getSkill(54, 0) && !me.getStat(97, 54)) { // 143: leap atk | 54: tele | ?
			coords = [60, -53, 64, -72, 78, -72, 74, -88];
			Pather.moveTo(orgX + coords[0], orgY + coords[1]);
			Pather.makePortal();
			
			for (i = 2; i < coords.length; i += 2) {
				if (i % 4 === 0) {
					Pather.moveTo(orgX + coords[i], orgY + coords[i + 1]);
				} else {
					Skill.cast(143, 0, orgX + coords[i], orgY + coords[i + 1]);
					Attack.clearList(this.buildList(1));
				}
			}

			Attack.clearList(this.buildList(0));
		} else {
			Pather.moveTo(orgX + 101, orgY - 56);

			// Stack Merc
			/*if (me.classid === 4 && !me.getSkill(54, 1) && me.gametype === 1) {
				// WAR - moveToExit needs to be fixed
				Pather.moveToExit(100, true);
				delay(me.ping*2 + 100);
				Pather.moveToExit(83, true);
			}*/
			Pather.moveToExit(100, false);
			Pather.makePortal();
			Attack.clearList(this.buildList(0));
		}
	
		Pickit.pickItems();
		Attack.securePosition(me.x, me.y, 20, 3000);
		
		delay(rand(2000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		return true;
	},
	d2_mephisto: function () {
		me.overhead("Starting mephisto...");
		myTroops.my_townThings(3, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		Pather.useWaypoint(101, true);
		Precast.doPrecast(true);
		Pather.moveToExit(102, true);
		
		Pather.moveTo(17550, 8070);
		var _unit = getUnit(1, 242);
		if(_unit) {
			Pather.moveTo(_unit.x, _unit.y);
			delay(250);
		}
		Pather.makePortal();
		delay(250);
		
		if(!Attack.kill(242)) delay(500);
		Attack.securePosition(me.x, me.y, 15, 3000);
		Pickit.pickItems();
		/*
		Pather.moveTo(17550, 8070);
		delay(rand(3000,4000));
		say("hulk");
		delay(rand(6000,8000));
		if(Config.BObarb.Towners[0]) say(Config.BObarb.Towners[0] + " yo-yo");
		delay(rand(5000,6000));
		myTroops.my_townThings(false, true, "portalspot", 6000, 8000, false);
		Pather.usePortal(null, me.name);
		delay(750);
		
		Pather.moveTo(17627,8069);
		delay(250);
		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 15, 2000);
		
		var i, 
			coords = [17652,8059, 17630,8041, 17614,8019, 17615,8053, 17619,8073, 17617,8098, 17602,8128];
		
		for (i = 0; i < coords.length; i += 2) {
			Pather.moveTo(coords[i], coords[i + 1]);
			Attack.clearList(Attack.getMob([345, 346, 347], 0, 40));
			delay(rand(2000,3000));
		}
		Pickit.pickItems();
		Attack.securePosition(me.x, me.y, 30, 3000);
		*/
		delay(rand(2000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		say("yo");
		return true;
	},		
	d2_abaddon: function () {
		me.overhead("Starting abaddon...");
		myTroops.my_townThings(5, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		d2_towners("yoyo");
		delay(rand(2000,3000));
		
		Pather.useWaypoint(111);
		Precast.doPrecast(true);

		if (!Pather.moveToPreset(111, 2, 60) || !Pather.usePortal(125)) {
			throw new Error("Failed to move to Abaddon");
		}
		Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); }
		
		Attack.clearLevel(0, true); // the true is to enable slowly teleing and to wait for team

		delay(rand(2000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", false, false);
		
		d2_towners("yo");
		delay(rand(7000,10000));
		
		return true;
	},
	d2_hallsofpain: function () {
		me.overhead("First prepping troops then starting halls of pain...");
		myTroops.my_townThings(4, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		myTroops.prepTroops(107, true);
		myTroops.my_townThings(5, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		Pather.useWaypoint(123);
		Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); }
		
		Attack.clearLevel(0, true); 	// true: creates a delay and checks to see if followers are nearby or have left the area
		
		delay(rand(2000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		return true;
	},
	d2_hallsofvaught: function () {
		me.overhead("First prepping troops then starting halls of vaught...");
		myTroops.my_townThings(4, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		myTroops.prepTroops(107, true);
		myTroops.my_townThings(5, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		Pather.useWaypoint(123);
		if (!Pather.moveToExit(124, true)) {
			throw new Error("Failed to go to Nihlathak");
		}
		Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); }
		
		Attack.clearLevel(0, true); 	// true: creates a delay and checks to see if followers are nearby or have left the area
		
		delay(rand(2000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		return true;
	},
	d2_ws2: function () {
		me.overhead("First prepping troops then starting ws2...");
		myTroops.my_townThings(4, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		myTroops.prepTroops(107, true);
		myTroops.my_townThings(5, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		Pather.useWaypoint(129);
		Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); }
		Precast.doPrecast(true);
		
		Attack.clearLevel(0, true); // the true is to enable slowly teleing and to wait for team

		if (Pather.moveToExit(128, true)) {
			Pather.makePortal();
			while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); }
			Attack.clearLevel(0, true);
		}

		for(var _i = 129; _i <= 130; ++_i) {
			if (Pather.moveToExit([_i, _i+1], true)) {
				Pather.makePortal();
				while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); }
				Attack.clearLevel(0, true);
			}
		}
		delay(rand(2000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		return true;
	},
	d2_ldrBaal: function (_tSorc) {
		var portal, tick;

		this.preattack = function () {
			var check;

			switch (me.classid) {
			case 1: // Sorceress
				switch (Config.AttackSkill[3]) {
				case 49:
				case 53:
				case 56:
				case 59:
				case 64:
					if (me.getState(121)) {
						while (me.getState(121)) {
							delay(100);
						}
					} else {
						return Skill.cast(Config.AttackSkill[1], 0, 15094 + rand(-1, 1), 5028);
					}

					break;
				}

				break;
			case 3: // Paladin
				if (Config.AttackSkill[3] === 112) {
					if (Config.AttackSkill[4] > 0) {
						Skill.setSkill(Config.AttackSkill[4], 0);
					}

					return Skill.cast(Config.AttackSkill[3], 1);
				}

				break;
			case 5: // Druid
				if (Config.AttackSkill[3] === 245) {
					return Skill.cast(Config.AttackSkill[3], 0, 15094 + rand(-1, 1), 5028);
				}

				break;
			case 6: // Assassin
				if (Config.UseTraps) {
					check = ClassAttack.checkTraps({x: 15094, y: 5028});

					if (check) {
						return ClassAttack.placeTraps({x: 15094, y: 5028}, 5);
					}
				}

				if (Config.AttackSkill[3] === 256) { // shock-web
					return Skill.cast(Config.AttackSkill[3], 0, 15094, 5028);
				}

				break;
			}

			return false;
		};

		this.checkThrone = function () {
			var monster = getUnit(1);

			if (monster) {
				do {
					if (Attack.checkMonster(monster) && monster.y < 5080) {
						switch (monster.classid) {
						case 23:
						case 62:
							return 1;
						case 105:
						case 381:
							return 2;
						case 557:
							return 3;
						case 558:
							return 4;
						case 571:
							return 5;
						default:
							Attack.getIntoPosition(monster, 10, 0x4);
							Attack.clear(15);

							return false;
						}
					}
				} while (monster.getNext());
			}

			return false;
		};

		this.clearThrone = function () {
			var i, monster,
				monList = [],
				// orig: pos = [15094, 5022, 15094, 5041, 15094, 5060, 15094, 5041, 15094, 5022];
				pos = [15113,5010, 15105,5022, 15103,5042, 15082,5029, 15078,5038, 15085,5049, 15100,5050, 15098,5045]; // dEdits to do a safer Throne

			if (1) {			// Config.AvoidDolls
				monster = getUnit(1, 691);

				if (monster) {
					do {
						if (monster.x >= 15072 && monster.x <= 15118 && monster.y >= 5002 && monster.y <= 5079 && Attack.checkMonster(monster) && Attack.skipCheck(monster)) {
							monList.push(copyUnit(monster));
						}
					} while (monster.getNext());
				}

				if (monList.length) {
					Attack.clearList(monList);
				}
			}

			for (i = 0; i < pos.length; i += 2) {
				Pather.moveTo(pos[i], pos[i + 1]);
				Attack.clear(25);
			}
		};

		this.checkHydra = function () {
			var monster = getUnit(1, "hydra");
			if (monster) {
				do {
					if (monster.mode !== 12 && monster.getStat(172) !== 2) {
						Pather.moveTo(15072, 5002);
						while (monster.mode !== 12) {
							delay(500);
							if (!copyUnit(monster).x) {
								break;
							}
						}

						break;
					}
				} while (monster.getNext());
			}

			return true;
		};

		this.announce = function () {
			var count, string, souls, dolls,
				monster = getUnit(1);

			if (monster) {
				count = 0;

				do {
					if (Attack.checkMonster(monster) && monster.y < 5094) {
						if (getDistance(me, monster) <= 40) {
							count += 1;
						}

						if (!souls && monster.classid === 641) {
							souls = true;
						}

						if (!dolls && monster.classid === 691) {
							dolls = true;
						}
					}
				} while (monster.getNext());
			}

			if (count > 30) {
				string = "DEADLY!!!" + " " + count + " monster" + (count > 1 ? "s " : " ") + "nearby.";
			} else if (count > 20) {
				string = "Lethal!" + " " + count + " monster" + (count > 1 ? "s " : " ") + "nearby.";
			} else if (count > 10) {
				string = "Dangerous!" + " " + count + " monster" + (count > 1 ? "s " : " ") + "nearby.";
			} else if (count > 0) {
				string = "Warm" + " " + count + " monster" + (count > 1 ? "s " : " ") + "nearby.";
			} else {
				string = "Cool TP. No immediate monsters.";
			}

			if (souls) {
				string += " Souls ";

				if (dolls) {
					string += "and Dolls ";
				}

				string += "in area.";
			} else if (dolls) {
				string += " Dolls in area.";
			}

			me.ovehead(string);
		};

		
		me.overhead("First prepping troops then starting throne & baal...");
		myTroops.my_townThings(4, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		myTroops.prepTroops(107, false);
		myTroops.my_townThings(5, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		Pather.useWaypoint(129);
		delay(250);
		Pather.moveToExit([130, 131], true);
		delay(250);
		Pather.moveTo(15113, 5010); // orig: 15118, 5045
		
		//me.overhead("Send the sorc to her doom...the throne!");
		//say(_tSorc + " baal");
		
		/*while(!Pather.usePortal(131, _tSorc)) { // as soon as sorc's portal opens, use the portal
			delay(750);
		}*/
		
		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 5, 4000)
		

		/*if (1 && getUnit(1, 691)) { 			// Config.Baal.DollQuit
			say("Dolls found! NG.");
			Town.goToTown(4);
			Town.doChores();
			delay(rand(15000,25000));
			return true;
		}

		if (1 && getUnit(1, 641)) {				// Config.Baal.SoulQuit
			say("Souls found! NG.");
			Town.goToTown(4);
			Town.doChores();
			delay(rand(15000,25000));
			return true;
		}*/

		this.clearThrone();
		tick = getTickCount();

		Pather.moveTo(15094, me.classid === 3 ? 5029 : 5038);

	MainLoop:
		while (true) {
			if (getDistance(me, 15094, me.classid === 3 ? 5029 : 5038) > 3) {
				Pather.moveTo(15094, me.classid === 3 ? 5029 : 5038);
			}

			if (!getUnit(1, 543)) {
				break MainLoop;
			}

			switch (this.checkThrone()) {
			case 1:
				Attack.clear(40);

				tick = getTickCount();

				Precast.doPrecast(true);

				break;
			case 2:
				Attack.clear(40);

				tick = getTickCount();

				break;
			case 4:
				Attack.clear(40);

				tick = getTickCount();

				break;
			case 3:
				Attack.clear(40);
				//this.checkHydra();

				tick = getTickCount();

				break;
			case 5:
				Attack.clear(40);

				break MainLoop;
			default:
				if (getTickCount() - tick < 7e3) {
					if (me.getState(2)) {
						Skill.setSkill(109, 0);
					}

					break;
				}

				if (!this.preattack()) {
					delay(100);
				}

				break;
			}

			delay(10);
		}
		
		say("hulk");
		delay(rand(4000,6000));
		myTroops.my_townThings(false, true, "portalspot", false, false, "wBoer", 5000, 6000);
		
		/*while(me.inTown && !Pather.getPortal(132, _tSorc)) { delay(rand(500,1200)); }
		Pather.usePortal(132, _tSorc);*/
		
		
		me.overhead("ÿc4" + "You can do it!");		// Config.Baal.BaalMessage
		Pather.usePortal(131, me.name);

		Pather.moveTo(15090, 5008);
		delay(5000);
		Precast.doPrecast(true);
		
		while (getUnit(1, 543)) {
			delay(500);
		}

		portal = getUnit(2, 563);

		if (portal) {
			Pather.usePortal(null, null, portal);
		} else {
			throw new Error("Couldn't find portal.");
		}

		Pather.moveTo(15134, 5923);
		Pather.makePortal();			// dEditAdded
		delay(250);	
		
		if(!Attack.kill(544)) { // Baal
			delay(250); 
		}
		Pickit.pickItems();
			
		delay(rand(6000,10000));
		say("hulk");
		delay(rand(4000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);

		return true;
	},
	d2_ldrPindle: function (_tSorc) {
		me.overhead("Starting pindle...");
		myTroops.my_townThings(5, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		Pather.useWaypoint(123);
		Precast.doPrecast(true);
		Pather.moveToExit([122, 121], true);
		
		//say(_tSorc + " pindle");
		//while(!Pather.usePortal(121, _tSorc)) { delay(750); } // as soon as sorc's portal opens, use the portal
		
		Pather.moveTo(10057, 13216);
		delay(250);
		Pather.makePortal();
		delay(250);
		
		try {
			Attack.clear(15, 0, getLocaleString(22497)); // Pindleskin
		} catch (e) {
			print(e);
		}
		
		Attack.clear(30, 0, false, false, true);
		
		Pickit.pickItems();
		delay(rand(3000,4000));
		say("hulk");
		delay(rand(6000,8000));
		//Pather.moveTo(10058, 13234);
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		myTroops.my_townThings(4, false, "waypoint", false, false, "wBoer", 7000, 10000);
		
		return true;
	},	
	d2_diablo: function () {
		me.overhead("First prepping troops then starting diablo...");
		myTroops.my_townThings(4, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		myTroops.prepTroops(107, false);
		myTroops.my_townThings(false, true, "portalspot", 6000, 8000, "wBoer", 7000, 10000);	
			
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
			this.followPath(this.vizLayout === 1 ? this.starToVizA : this.starToVizB, false); // false: no deleay btwn teleing

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
			return true;
		};

		this.seisSeal = function () {
			me.overhead("Seis layout " + this.seisLayout);
			this.followPath(this.seisLayout === 1 ? this.starToSeisA : this.starToSeisB, false);

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
			return true;
		};

		this.infectorSeal = function () {
			me.overhead("Inf layout " + this.infLayout);
			this.followPath(this.infLayout === 1 ? this.starToInfA : this.starToInfB, false);

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
		this.followPath = function (path, _delay) {
			var i;

			for (i = 0; i < path.length; i += 2) {
				/*if (this.cleared.length) {
					this.clearStrays();
				}*/
				
				/*while(!(myTroops.TroopsInMyArea() >= 2)) { 	// check if everyone is in the same area & near, if not pause 'til they are
					me.overhead("...someone has left our area or is out of range. We'll stay put 'til they return.");
					Attack.clear(10, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
					delay(1000); 
				}*/
				myTroops.TroopsNearMe();
				me.overhead("...everybody is in or nearby. We can do it!");

				if((path[i] === undefined) || (path[i + 1] === undefined)) return;
				
				Pather.moveTo(path[i], path[i + 1], 3, 1); 				// (path[i], path[i + 1], 3, getDistance(me, path[i], path[i + 1]) > 50)
				Attack.clear(30, 0, false, this.sort);
				
				if(_delay) delay(rand(2100,3000));
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
		//this.entranceToStar	= [7790, 5526, 7794, 5517, 7791, 5491, 7768, 5459, 7775, 5424, 7817, 5458, 7777, 5408, 7769, 5379, 7777, 5357, 7809, 5359, 7805, 5330, 7780, 5317, 7791, 5293];
		this.entranceToStar	= [7795,5501, 7769,5482, 7768,5436, 7789,5425, 7770,5390, 7775,5352, 7799,5350, 7765,5302];
		this.starToVizA 	= [7759, 5295, 7734, 5295, 7716, 5295, 7718, 5276, 7697, 5292, 7678, 5293, 7665, 5276, 7662, 5314];
		this.starToVizB 	= [7759, 5295, 7734, 5295, 7716, 5295, 7701, 5315, 7666, 5313, 7653, 5284];
		this.starToSeisA 	= [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7775, 5205, 7804, 5193, 7814, 5169, 7788, 5153];
		this.starToSeisB 	= [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7811, 5218, 7807, 5194, 7779, 5193, 7774, 5160, 7803, 5154];
		this.starToInfA 	= [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5295, 7919, 5290];
		this.starToInfB 	= [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5274, 7927, 5275, 7932, 5297, 7923, 5313];
		
		this.VizToCtr 		= [7718,5312, 7740,5299, 7760,5295, 7776,5273];
		this.SeisToCtr 		= [7777,5238, 7796,5253, 7811,5274];
		this.InfToCtr 		= [7852,5280, 7849,5288, 7820,5286, 7791,5291, 7791,5299];
		
		
		if (me.area !== 107) Pather.usePortal(null, me.name);
		delay(750);
		if (!Pather.moveTo(7795,5501)) throw new Error("Failed to move to Chaos Sanctuary");
		
		Pather.makePortal();
		delay(250);
		Attack.clear(20, 0, false, this.sort);
		Pather.moveTo(7795,5501);
		
		this.initLayout();
		this.followPath(this.entranceToStar);
		
		Attack.clear(30, 0, false, this.sort);
		this.vizierSeal();
		this.followPath(this.VizToCtr,true); // true: for enabling a delay btwn teleing
		this.seisSeal();
		this.followPath(this.SeisToCtr,true);
		Precast.doPrecast(true);
		this.infectorSeal();
		this.followPath(this.InfToCtr,true);
		
		switch (me.classid) {
		case 1:
			Pather.moveTo(7792, 5294);

			break;
		default:
			Pather.moveTo(7788, 5292);

			break;
		}

		if (this.diabloPrep()) Attack.kill(243); // Diablo	
		Pickit.pickItems();
		
		delay(rand(3000,4000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		return true;
	},
	d2_fastD: function () {
		
		this.getLayout = function (seal, value) {
			var sealPreset = getPresetUnit(108, 2, seal);

			if (!seal) {
				throw new Error("Seal preset not found");
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

		this.getBoss = function (name) {
			var i, boss,
				glow = getUnit(2, 131);

			for (i = 0; i < 24; i += 1) {
				boss = getUnit(1, name);

				if (boss) {
					this.chaosPreattack(name, 8);

					try {
						Attack.kill(name);
					} catch (e) {
						Attack.clear(10, 0, name);
					}

					Pickit.pickItems();

					return true;
				}

				delay(250);
			}

			return !!glow;
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

		this.diabloPrep = function () {
			var trapCheck,
				tick = getTickCount();

			while (getTickCount() - tick < 17500) {
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

		this.openSeal = function (classid) {
			var i, j, seal;

			for (i = 0; i < 5; i += 1) {
				Pather.moveToPreset(108, 2, classid, classid === 394 ? 5 : 2, classid === 394 ? 5 : 0);

				/*if (i > 1) {
					Attack.clear(10);
				}*/

				for (j = 0; j < 3; j += 1) {
					seal = getUnit(2, classid);

					if (seal) {
						break;
					}

					delay(100);
				}

				if (!seal) {
					throw new Error("Seal not found (id " + classid + ")");
				}

				if (seal.mode) {
					return true;
				}
				
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

			throw new Error("Failed to open seal (id " + classid + ")");
		};

	// main:	
		me.overhead("Starting a fast diablo...");
		myTroops.my_townThings(4, true, "portalspot", 6000, 8000, "wBoer", 7000, 10000);
		
		if(!Pather.usePortal(null, me.name)) {
			if(!me.inTown) Town.goToTown();
			Town.move("waypoint");
			Pather.useWaypoint(107, true);
		}
		Precast.doPrecast(true);
		delay(750);
		
		this.initLayout();
		this.openSeal(395);	// seal at Vizier
		this.openSeal(396);	// seal at Vizier
		this.openSeal(394);	// seal at Seis
		this.openSeal(393);	// seal at Infector
		this.openSeal(392);	// seal at Infector

		// head to Infector
		//
		//this.openSeal(393);	// seal at Infector
		//this.openSeal(392);	// seal at Infector

		if (this.infLayout === 1) {
			//me.overhead("Vizier layout = 1");
			Pather.moveTo(7901, 5292); // uncertain if this is the best x,y coords
		} else {
			me.overhead("Vizier layout = 2");
			Pather.moveTo(7928, 5295); // temp
		}

		/*Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { 
			Attack.securePosition(me.x, me.y, 5, 250);
		}*/
		
		
		var _boss = getUnit(1, getLocaleString(2853)); 				// infector
		if(_boss) Pather.moveTo(_boss.x, _boss.y);
		Pather.makePortal();
		
		if (!this.getBoss(getLocaleString(2853))) {
			throw new Error("Failed to kill Infector");
		}
		Attack.clear(10, 0, false, false, true);
		Attack.securePosition(me.x, me.y, 10, 6000);
		Attack.clear(10, 0, false, false, true);
		Pather.usePortal(null, me.name);
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(2000,3000)); }
		Pather.usePortal(null, me.name);


		// head to Vizier:
		//
		if (this.vizLayout === 1) {
			Pather.moveTo(7691, 5292);
		} else {
			Pather.moveTo(7695, 5316);
		}
		
		/*Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { 
			Attack.securePosition(me.x, me.y, 5, 250);
		}*/
		
		var _boss = getUnit(1, getLocaleString(2851)); 				// Vizier
		if(_boss) Pather.moveTo(_boss.x, _boss.y);
		Pather.makePortal();
		
		if (!this.getBoss(getLocaleString(2851))) {
			throw new Error("Failed to kill Vizier");
		}
		Attack.clear(10, 0, false, false, true);
		Attack.securePosition(me.x, me.y, 10, 6000);
		Attack.clear(10, 0, false, false, true);
		Pather.usePortal(null, me.name);
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(2000,3000)); }
		Pather.usePortal(null, me.name);

		// head to Seis
		//
		// this.openSeal(394);	// seal at Seis
		if (this.seisLayout === 1) {
			Pather.moveTo(7771, 5196);
		} else {
			Pather.moveTo(7798, 5186);
		}
		
		/*Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { 
			Attack.securePosition(me.x, me.y, 5, 250);
		}*/
		
		var _boss = getUnit(1, getLocaleString(2852)); 				// Seis
		if(_boss) Pather.moveTo((_boss.x + rand(8,12)), (_boss.y + rand(8,12)));
		Pather.makePortal();
		
		if (!this.getBoss(getLocaleString(2852))) {
			throw new Error("Failed to kill de Seis");
		}
		var _boss = getUnit(1, getLocaleString(2852)); 				// Seis
		if(_boss) Pather.moveTo((_boss.x + rand(8,12)), (_boss.y + rand(8,12)));
		
		Attack.clear(10, 0, false, false, true);
		Attack.securePosition(me.x, me.y, 10, 6000);
		Attack.clear(10, 0, false, false, true);
		Pather.usePortal(null, me.name);
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(2000,3000)); }
		Pather.usePortal(null, me.name);
		
		Pather.moveTo(7788, 5292);
		Pather.makePortal();
		
		if(this.diabloPrep()) Attack.kill(243); // Diablo
		Pickit.pickItems();
		delay(rand(2000,6000));
		
		say("hulk");
		delay(rand(4000,5000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		return true;
	},
	d2_walkD: function () {
		/* notes on chaos layout:
				vizier layout 1: Y shaped
				vizier layout 2: upsidedown L shaped
				seis layout 1: 2 shaped	at a 45deg clockwise angle
				seis layout 2: S shaped at a 45deg clockwise angle
				infectore layout 1: small T shaped 135deg clockwide
				seis layout 2: J shaped				
		*/
		me.overhead("First prepping troops then starting diablo...");
		myTroops.my_townThings(4, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		myTroops.prepTroops(107, false);
		myTroops.my_townThings(false, true, "portalspot", 6000, 8000, "wBoer", 7000, 10000);	
			
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
		this.moveToBoss = function (name) {
			var i, boss,
				glow = getUnit(2, 131);

			for (i = 0; i < 16; i += 1) {
				boss = getUnit(1, name);

				if (boss) {
					Pather.moveTo(boss.x, boss.y);
				}

				delay(250);
			}

			return !!glow;
		};
		this.vizierSeal = function () {
			me.overhead("Viz layout " + this.vizLayout);
			this.followPath(this.vizLayout === 1 ? this.starToVizA : this.starToVizB, false); // false: no deleay btwn teleing
			/*myTroops.my_townThings(false, true, "portalspot", 6000, 8000, "wBoer", 7000, 9000);
			Pather.usePortal(null, me.name);*/
			Precast.doPrecast(true);
			
			/*if (!this.openSeal(395) || !this.openSeal(396)) {
				me.overhead("Failed to open Vizier seals.");
			}

			if (this.vizLayout === 1) {
				Pather.moveTo(7691, 5292);
				//Pather.makePortal();
				Attack.securePosition(me.x, me.y, 10, 6000);
			} else {
				Pather.moveTo(7690, 5315);
				//Pather.makePortal();
				Attack.securePosition(me.x, me.y, 10, 6000);
			}*/

			if (!this.getBoss(getLocaleString(2851))) {
				me.overhead("Failed to kill Vizier");
			}
			Attack.securePosition(me.x, me.y, 20, 6000);
			return true;
		};

		this.seisSeal = function () {
			me.overhead("Seis layout " + this.seisLayout);
			delay(rand(5000,8000));
			this.followPath(this.seisLayout === 1 ? this.starToSeisA : this.starToSeisB, false);
			/*Town.goToTown();
			myTroops.my_townThings(false, true, "portalspot", 6000, 8000, "wBoer", 7000, 9000);
			Pather.usePortal(null, me.name);*/
			Precast.doPrecast(true);
				
			/*if (!this.openSeal(394)) {
				me.overhead("Failed to open de Seis seal.");
			}

			if (this.seisLayout === 1) {
				Pather.moveTo(7801, 5194);
				Pather.makePortal();
				Attack.securePosition(me.x, me.y, 30, 6000);
				//me.overhead("this.seisLayout === 1");
				//delay(rand(10000,15000));
				//Pather.moveTo(7820, 5158, 0, true);
				//Pather.moveTo(7813, 5189, 0, true);
				//Pather.moveTo(7778, 5195, 0, true);
				//Pather.moveTo(7777, 5215, 0, true);
			} else {
				Pather.makePortal();
				me.overhead("this.seisLayout === 2");
				delay(rand(10000,15000));
				Pather.moveTo(7785, 5148);
				Pather.makePortal();
				Attack.securePosition(me.x, me.y, 30, 6000);
			}*/
			Attack.securePosition(me.x, me.y, 30, 6000);
			if (!this.moveToBoss(getLocaleString(2852))) {
				if (!this.getBoss(getLocaleString(2852))) {
					me.overhead("Failed to kill de Seis");
				}
				me.overhead("Failed to kill de Seis");
			}

			return true;
		};

		this.infectorSeal = function () {
			me.overhead("Inf layout " + this.infLayout);
			this.followPath(this.infLayout === 1 ? this.starToInfA : this.starToInfB, false);

			/*if (!this.openSeal(392)) {
				me.overhead("Failed to open Infector seals.");
			}

			if (this.infLayout === 1) {
				me.overhead("this.infectorLayout === 1");
				delay(rand(10000,15000));
				delay(1);
			} else {
				me.overhead("this.infectorLayout === 1");
				delay(rand(10000,15000));
				Pather.moveTo(7928, 5295, 0, true); // temp
			}*/
			Attack.securePosition(me.x, me.y, 15, 6000);
			if (!this.getBoss(getLocaleString(2853))) {
				me.overhead("Failed to kill Infector");
			}

			/*if (!this.openSeal(393)) {
				me.overhead("Failed to open Infector seals.");
			}*/
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
		this.followPath = function (path, _delay) {
			var i;

			for (i = 0; i < path.length; i += 2) {
				/*if (this.cleared.length) {
					this.clearStrays();
				}*/
				
				/*while(!(myTroops.TroopsInMyArea() >= 2)) { 	// check if everyone is in the same area & near, if not pause 'til they are
					me.overhead("...someone has left our area or is out of range. We'll stay put 'til they return.");
					Attack.clear(10, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
					delay(1000); 
				}*/
				myTroops.TroopsNearMe();
				me.overhead("...everybody is in or nearby. We can do it!");
				
				/*if(path[i] == "townTp") {
					Town.goToTown();
					myTroops.my_townThings(false, true, "portalspot", 6000, 8000, "wBoer", 7000, 9000);
					Pather.usePortal(null, me.name);
					i += 1;
				}
				if(path[i] == "tp") {
					Pather.makePortal();
					Attack.securePosition(me.x, me.y, 10, 6000)
					myTroops.TroopsNearMe();
					return;
				}*/
				
				if((path[i] === undefined) || (path[i + 1] === undefined)) return;
				
				Pather.moveTo(path[i], path[i + 1], 3, 1); 				// (path[i], path[i + 1], 3, getDistance(me, path[i], path[i + 1]) > 50)
				Attack.clear(20, 0, false, this.sort);
				
				if(_delay) {
					Attack.clear(10, 0, false, this.sort);
					delay(rand(3000,4000));
				}
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
		//this.entranceToStar	= [7790, 5526, 7794, 5517, 7791, 5491, 7768, 5459, 7775, 5424, 7817, 5458, 7777, 5408, 7769, 5379, 7777, 5357, 7809, 5359, 7805, 5330, 7780, 5317, 7791, 5293];
		//edited for tele team: this.entranceToStar	= [7795,5501, 7769,5482, 7768,5436, 7789,5425, 7770,5390, 7775,5352, 7799,5350, 7765,5302];
		this.entranceToStar	= [7795,5501, 7816,5480, 7819,5457, 7809,5434, 7820,5412, 7821,5385, 7812,5351, 7776,5344, 7774,5311, 7750,5292]; // my slow tele sorc ldr
		
		this.starToVizA 	= [7759, 5295, 7734, 5295, 7716, 5295, 7718, 5276, 7697, 5292, 7678, 5293]; // , 7665, 5276, 7662, 5314];
		this.starToVizB 	= [7759, 5295, 7734, 5295, 7716, 5295, 7701, 5315, 7666, 5313, 7653, 5284];
		// orig: this.starToSeisA 	= [7781, 5259, 7776, 5256, 7809, 5223, 7804, 5193, 7814, 5169, 7788, 5153]; 			// 7776, 5228, 7775, 5205, 
		// orig: this.starToSeisB 	= [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7811, 5218, 7807, 5194, 7779, 5193, 7774, 5160, 7803, 5154];
		this.starToSeisA 	= [7786,5262, 7779,5246, 7779,5232,  7773,5207, 7776,5199, 7801,5194, 7816,5180, 7813,5156, 7794,5157, 7782,5157]; 	// Seis layout 1
		this.starToSeisB 	= [7786,5259, 7783,5239, 7810,5241, 7813,5214, 7804,5195, 7785,5195, 7772,5177, 7778,5153, 7802,5152];				// Seis layout 2
		
		this.starToInfA 	= [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5295, 7919, 5290];
		this.starToInfB 	= [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5274, 7927, 5275, 7932, 5297, 7923, 5313];
		
		this.VizToCtr 		= [7718,5312, 7740,5299, 7760,5295, 7776,5273]; 			// 7718,5312, 7740,5299, 7760,5295, 7776,5273
		this.SeisToCtr 		= [7777,5238, 7796,5253, 7811,5274]; 						// 7777,5238, 7796,5253, 7811,5274
		this.InfToCtr 		= [7852,5280, 7849,5288, 7820,5286, 7791,5291, 7791,5299];	// 7852,5280, 7849,5288, 7820,5286, 7791,5291, 7791,5299
		
		
		if (me.area !== 107) Pather.usePortal(null, me.name);
		delay(750);
		if (!Pather.moveTo(7790,5276)) throw new Error("Failed to move to Chaos Sanctuary");
		
		// Prep chaos by opening all the seal
		this.initLayout();
		this.openSeal(395);	// seal at Vizier
		this.openSeal(396);	// seal at Vizier
		this.openSeal(394);	// seal at Seis
		this.openSeal(393);	// seal at Infector
		this.openSeal(392);	// seal at Infector
		
		// head back to the entrance 
		if (!Pather.moveTo(7795,5501)) throw new Error("Failed to move to Chaos Sanctuary");
		
		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 5, 4000)
		
		delay(250);
		Attack.clear(20, 0, false, this.sort);
		Pather.moveTo(7795,5501);
		Pather.makePortal();
		
		this.initLayout();
		this.followPath(this.entranceToStar);
		Attack.clear(30, 0, false, this.sort);
		
		this.vizierSeal();
		Town.goToTown();
		myTroops.my_townThings(false, true, "portalspot", 6000, 8000, "wBoer", 7000, 9000);
		Pather.usePortal(null, me.name);
		Precast.doPrecast(true);
		Pather.moveTo(7781, 5259);
		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 10, 6000)
		myTroops.TroopsNearMe();
		
		this.seisSeal();
		Town.goToTown();
		myTroops.my_townThings(false, true, "portalspot", 6000, 8000, "wBoer", 7000, 9000);
		Pather.usePortal(null, me.name);
		Precast.doPrecast(true);
		Pather.moveTo(7809, 5268);
		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 10, 6000)
		myTroops.TroopsNearMe();
		
		this.infectorSeal();
		Town.goToTown();
		myTroops.my_townThings(false, true, "portalspot", 6000, 8000, "wBoer", 7000, 9000);
		Pather.usePortal(null, me.name);
		Precast.doPrecast(true);
		Pather.moveTo(7792, 5294);
		Pather.makePortal();
		Attack.securePosition(me.x, me.y, 10, 6000)

		if (this.diabloPrep()) Attack.kill(243); // Diablo	
		Pickit.pickItems();
		
		delay(rand(3000,4000));
		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
		
		return true;
	},
	d2_Nihlathak: function (_prep) {
		if(_prep) {
			me.overhead("First prepping troops then starting nihlathak...");
			myTroops.my_townThings(4, true, "waypoint", 6000, 8000, "wBoer", 7000, 10000);
			myTroops.prepTroops(107, true);
		} else { d2_towners("yoyo"); }
		
		myTroops.my_townThings(5, false, "waypoint", false, false, "woBoer", 7000, 10000);
		
		Pather.useWaypoint(123);
		Precast.doPrecast(false);

		if (!Pather.moveToExit(124, true)) {
			me.overhead("Failed to go to Nihlathak");
			return false;
		}

		Pather.moveToPreset(me.area, 2, 462, 0, 0, false, true);

		/*if (Config.Nihlathak.ViperQuit && getUnit(1, 597)) {
			print("Tomb Vipers found.");

			return true;
		}*/
		var _nihl = getUnit(1, 526); 
		if(_nihl) Pather.moveTo(_nihl.x, _nihl.y);
		Pather.makePortal();
		if(!Attack.kill(526)) delay(500); // Nihlathak
		Pickit.pickItems();
		delay(750);

		myTroops.my_townThings(false, true, "waypoint", 6000, 8000, "woBoer", 7000, 10000);
		
		return true;
	},
	d2_getLeg: function () {
		this.getLeg = function () {
			var i, portal, wirt, leg, gid;

			if (me.getItem(88)) {								// if I already have the leg return true
				return me.getItem(88);
			}

			Pather.useWaypoint(4);
			Precast.doPrecast(true);
			Pather.moveToPreset(me.area, 1, 737, 8, 8);

			for (i = 0; i < 6; i += 1) {						// attemot to get into Tristram
				portal = Pather.getPortal(38);

				if (portal) {
					Pather.usePortal(null, null, portal);

					break;
				}

				delay(500);
			}

			if (!portal) {
				throw new Error("Tristram portal not found");
			}

			Pather.moveTo(25048, 5177);

			wirt = getUnit(2, 268);

			for (i = 0; i < 8; i += 1) {						// find & interact with Writ's body, then pick up the leg
				wirt.interact();
				delay(500);

				leg = getUnit(4, 88);

				if (leg) {
					gid = leg.gid;

					Pickit.pickItem(leg);
					Town.goToTown();
					
					return me.getItem(-1, -1, gid);;
				}
			}

			throw new Error("Failed to get the leg");
		};
		this.getTome = function () {
			var tome,
				myTome = me.findItem("tbk", 0, 3),
				akara = Town.initNPC("Shop");

			tome = me.getItem("tbk");

			if (tome) {
				do {
					if (!myTome || tome.gid !== myTome.gid) {
						return copyUnit(tome);
					}
				} while (tome.getNext());
			}
			
			if (!akara) {
				throw new Error("Failed to buy tome");
			}

			tome = akara.getItem("tbk");

			if (tome.buy()) {
				tome = me.getItem("tbk");
				
				if (tome) {
					do {
						if (!myTome || tome.gid !== myTome.gid) {
							return copyUnit(tome);
						}
					} while (tome.getNext());
				}
			}

			throw new Error("Failed to buy tome");
		};


		this.buildCowRooms = function () {
			var i, j, room, kingPreset, badRooms, badRooms2,
				finalRooms = [],
				indexes = [];

			kingPreset = getPresetUnit(me.area, 1, 773);
			badRooms = getRoom(kingPreset.roomx * 5 + kingPreset.x, kingPreset.roomy * 5 + kingPreset.y).getNearby();

			for (i = 0; i < badRooms.length; i += 1) {
				badRooms2 = badRooms[i].getNearby();

				for (j = 0; j < badRooms2.length; j += 1) {
					if (indexes.indexOf(badRooms2[j].x + "" + badRooms2[j].y) === -1) {
						indexes.push(badRooms2[j].x + "" + badRooms2[j].y);
					}
				}
			}

			room = getRoom();

			do {
				if (indexes.indexOf(room.x + "" + room.y) === -1) {
					finalRooms.push([room.x * 5 + room.xsize / 2, room.y * 5 + room.ysize / 2]);
				}
			} while (room.getNext());

			return finalRooms;
		};

		this.clearCowLevel = function () {
			var room, result, myRoom,
				rooms = this.buildCowRooms();

			function RoomSort(a, b) {
				return getDistance(myRoom[0], myRoom[1], a[0], a[1]) - getDistance(myRoom[0], myRoom[1], b[0], b[1]);
			}

			while (rooms.length > 0) {
				// get the first room + initialize myRoom var
				if (!myRoom) {
					room = getRoom(me.x, me.y);
				}

				if (room) {
					if (room instanceof Array) { // use previous room to calculate distance
						myRoom = [room[0], room[1]];
					} else { // create a new room to calculate distance (first room, done only once)
						myRoom = [room.x * 5 + room.xsize / 2, room.y * 5 + room.ysize / 2];
					}
				}

				rooms.sort(RoomSort);
				room = rooms.shift();
				
				myTroops.TroopsNearMe();
				me.overhead("...everybody is in or nearby. We can do it!");
				
				result = Pather.getNearestWalkable(room[0], room[1], 10, 2);

				if (result) {
					myTroops.TroopsNearMe();
					me.overhead("...everybody is in or nearby. We can do it!");
					
					Pather.moveTo(result[0], result[1], 3);
					delay(250);
					var _dir = [-12,-12, -12,12, 12,-12, 12,12]
					for(var _i = 0; _i < _dir.length; _i += 2) {  
						Skill.cast(78, 0, (me.x + rand(0,_dir[_i])), (me.y + rand(0,_dir[_i+1])));	// bonewall
						delay(rand(250,750));
					}
					
					if (!Attack.clear(35)) {
						return false;
					}
					Attack.securePosition(me.x, me.y, 40, 6000)
					
					delay(rand(3000,4000));
					if(Config.meHPmaxOrig == me.hpmax) {
						Town.goToTown();
						say("yo");
						while(!(myTroops.TroopsInMyArea() == Config.Troops.length)) { delay(rand(2000,4000)); }
						Town.move("portalspot");
						delay(rand(2000,3000));
						Pather.usePortal(39, me.name);
						delay(250);
						Pather.makePortal();
						while(!(myTroops.TroopsInMyArea() == Config.Troops.length)) { Attack.securePosition(me.x, me.y, 5, 3000); }
						delay(rand(3000,5000));
						say("hulk");
						delay(rand(6000,8000));
						while(!(myTroops.TroopsInMyArea() < Config.Troops.length)) { 
							if(Config.BObarb.Towners[0]) say(Config.BObarb.Towners[0] + " yo-yo");
							delay(rand(1500,2000));
							if(Config.BObarb.BOCows[0]) say(Config.BObarb.BOCows[0] + " yo-yo");
							Attack.securePosition(me.x, me.y, 5, 3000); 
							delay(rand(6000,8000));
						}
					}		
				}
			}

			return true;
		};
		me.overhead("Retrieving leg...");
		myTroops.my_townThings(1, true, "waypoint", 6000, 8000, false);
		say("yoyo");
		delay(rand(3000,4000));
		
		//leg = this.getLeg();
		if(!this.getLeg()) return false;
					
		var _item = me.getItem(88);
		if (_item) {
			Town.openStash();
			delay(rand(1000,3000));
			if(!_item.toCursor()) {
				me.cancel()
				return false;
			}
			me.cancel();
			delay(rand(1000,2000));
			_item.drop();
		}
		
		myTroops.my_townThings(1, true, "stash", 6000, 8000, false);
		me.overhead("waiting for cow portal...");
		delay(250);
		say("yo");
		delay(rand(6000,8000));
		say(Config.BObarb.BOCows[0] + " makemoo");
		delay(rand(2000,4000));
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(2000,3000)); }
		
		var _timedOut = 0;
		while(!Pather.usePortal(39)) { 
			delay(rand(4000,6000)); 
			me.overhead("moo count exit: " + _timedOut);
			if(_timedOut > 11) return false;
			_timedOut += 1;
		}
		Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { Attack.securePosition(me.x, me.y, 5, 3000); }
				
		this.clearCowLevel(); // dEdits: commented out so as to try an Attack.clearLevel(0) call
		//Attack.clearLevel(0);
		
		myTroops.my_townThings(1, true, "waypoint", 6000, 8000, false);
		return true;
	}

};
