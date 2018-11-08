/*	my custom follower scripts | place an: include("common/myFwlrScripts.js"); into the default.dbj script
*/	
var myFwlrScripts = {
	choreMe: function (rMsg) {
		this.playerIn = function (area) {
			if (!area) {
				area = me.area;
			}

			var party = getParty();

			if (party) {
				do {
					if (party.name !== me.name && party.area === area) {
						return true;
					}
				} while (party.getNext());
			}

			return false;
		};

		this.bumperCheck = function () {
			var party = getParty();

			if (party) {
				do {
					if (party.name !== me.name) {
						switch (me.diff) {
						case 0:
							if (party.level >= 20) {
								return true;
							}

							break;
						case 1:
							if (party.level >= 40) {
								return true;
							}

							break;
						}
					}
				} while (party.getNext());
			}

			return false;
		};

		this.playersInAct = function (act) {
			var area, party,
				areas = [0, 1, 40, 75, 103, 109];

			if (!act) {
				act = me.act;
			}

			area = areas[act];
			party = getParty();

			if (party) {
				do {
					if (party.name !== me.name && party.area !== area) {
						return false;
					}
				} while (party.getNext());
			}

			return true;
		};

		
		/* -- my repative functions --  */
		this.prepChoreA = function (_msg, _town, _chores, _wpps, _wp, _pc) {	// _wpps: "waypoint","portalspot" | _pc: precast
			if(_msg) me.overhead("ÿc4%s", _msg);
			if(_town) Town.goToTown(_town);
			if(_chores) Town.doChores();
			if(_wpps) {
				Town.move(_wpps);
				delay(rand(3000,6000));
			}
			if(_wp) {
				Pather.useWaypoint(_wp, true);
				delay(rand(1000,2500));
			}
			if(_pc) Precast.doPrecast(true);
			delay(250);
		};
			
		/* ---- rush scripts below ---- */
		this.andariel = function () {
			this.prepChoreA("Andariel", 1, true, "waypoint", 35, true);
			
			if (!Pather.moveToExit([36, 37], true) || !Pather.moveTo(22582, 9612)) {
				throw new Error("andy failed");
			}

			Pather.makePortal();
			Attack.securePosition(me.x, me.y, 40, 3000, true);
			me.overhead("1");

			while (!this.playerIn()) {
				Pather.moveTo(22582, 9612);
				delay(250);
			}

			Attack.kill(156);
			me.overhead("2");
			Pather.moveTo(22582, 9612);

			while (this.playerIn()) {
				delay(250);
			}

			Pather.usePortal(null, me.name);
			me.overhead("a2");
			Pather.useWaypoint(40, true);

			while (!this.playersInAct(2)) {
				delay(250);
			}

			return true;
		};
		this.cain = function () {
			this.prepChoreA("Cain: tree", 1, true, "waypoint", 5, true);
			
			if (!Pather.moveToPreset(me.area, 2, 30, 5, 5, true)) {
				me.overhead("Failed to move to Tree of Inifuss");
				return false;
			}
			
			Attack.securePosition(me.x, me.y, 10, 3000);
			Pather.makePortal();
			me.overhead("1");
			while (!this.playerIn()) {
				delay(200);
			}
			
			Attack.securePosition(me.x, me.y, 10, 3000);
			Pickit.pickItems();
			Pather.makePortal();
			me.overhead("1");
			while (!this.playerIn()) {
				Attack.securePosition(me.x, me.y, 10, 1500);
				delay(200);
			}
			
			Pather.moveToPreset(me.area, 2, 30, 5, 5, true);
			while (this.playerIn()) {
				Attack.securePosition(me.x, me.y, 10, 1500);
				delay(200);
			}
			Pather.usePortal(null, null);
			this.prepChoreA("Cain: Cairn Stones", 1, true, "waypoint", 4, true);
			
			if (!Pather.moveToPreset(me.area, 1, 737, 0, 0, false)) {
				me.overhead("Failed to move to Rakanishu");
				return false;
			}
			
			Attack.securePosition(me.x, me.y, 10, 3000);
			Pickit.pickItems();
			Pather.makePortal();
			me.overhead("1");
			while (!this.playerIn()) {
				Attack.securePosition(me.x, me.y, 10, 1500);
				delay(200);
			}
			
			while (this.playerIn()) {
				Attack.securePosition(me.x, me.y, 10, 1500);
				delay(200);
			}
			
			Pather.usePortal(null, null);
			return true;
		};
		this.radament = function () {
			this.prepChoreA("Radament", 2, true, "waypoint", 48, true);
			
			var i, radaCoords, rada, radaPreset, returnSpot,
				moveIntoPos = function (unit, range) {
					var i, coordx, coordy,
						coords = [],
						angle = Math.round(Math.atan2(me.y - unit.y, me.x - unit.x) * 180 / Math.PI),
						angles = [0, 15, -15, 30, -30, 45, -45, 60, -60, 75, -75, 90, -90, 105, -105, 120, -120, 135, -135, 150, -150, 180];

					for (i = 0; i < angles.length; i += 1) {
						coordx = Math.round((Math.cos((angle + angles[i]) * Math.PI / 180)) * range + unit.x);
						coordy = Math.round((Math.sin((angle + angles[i]) * Math.PI / 180)) * range + unit.y);

						try {
							if (!(getCollision(unit.area, coordx, coordy) & 0x1)) {
								coords.push({
									x: coordx,
									y: coordy
								});
							}
						} catch (e) {

						}
					}

					if (coords.length > 0) {
						coords.sort(Sort.units);

						return Pather.moveToUnit(coords[0]);
					}

					return false;
				};

			Pather.moveToExit(49, true);

			radaPreset = getPresetUnit(49, 2, 355);
			radaCoords = {
				area: 49,
				x: radaPreset.roomx * 5 + radaPreset.x,
				y: radaPreset.roomy * 5 + radaPreset.y
			};

			moveIntoPos(radaCoords, 50);

			for (i = 0; i < 3; i += 1) {
				rada = getUnit(1, 229);

				if (rada) {
					break;
				}

				delay(500);
			}

			if (rada) {
				moveIntoPos(rada, 60);
			} else {
				print("radament unit not found");
			}

			Attack.securePosition(me.x, me.y, 35, 3000);
			Pather.makePortal();
			me.overhead("1");

			while (!this.playerIn()) {
				delay(200);
			}

			Attack.kill(229); // Radament

			returnSpot = {
				x: me.x,
				y: me.y
			};

			me.overhead("2");
			Pickit.pickItems();
			Attack.securePosition(me.x, me.y, 30, 3000);

			while (this.playerIn()) {
				delay(200);
			}

			Pather.moveToUnit(returnSpot);
			Pather.makePortal();
			me.overhead("all in");

			while (!this.playerIn()) {
				delay(200);
			}

			while (getUnit(4, 552)) {
				delay(1000);
			}

			while (this.playerIn()) {
				delay(200);
			}

			Pather.usePortal(null, null);

			return true;
		};
		this.cube = function () {
			if (me.diff === 0) {
				this.prepChoreA("cube", 2, true, "waypoint", 57, true);

				if (!Pather.moveToExit(60, true) || !Pather.moveToPreset(me.area, 2, 354)) {
					throw new Error("cube failed");
				}

				Pather.makePortal();
				Attack.securePosition(me.x, me.y, 30, 3000, true);
				me.overhead("1");

				while (!this.playerIn()) {
					delay(100);
				}

				while (this.playerIn()) {
					delay(100);
				}

				Pather.usePortal(null, me.name);
			}

			return true;
		};
		this.amulet = function () {
			this.prepChoreA("amulet", 2, true, "waypoint", 44, true);

			if (!Pather.moveToExit([45, 58, 61], true) || !Pather.moveTo(15044, 14045)) {
				throw new Error("amulet failed");
			}

			Pather.makePortal();

			if (me.diff < 2) {
				Attack.securePosition(me.x, me.y, 25, 3000);
			} else {
				Attack.securePosition(me.x, me.y, 25, 3000, true, true);
			}

			me.overhead("1");

			while (!this.playerIn()) {
				delay(100);
			}

			while (this.playerIn()) {
				delay(100);
			}

			Pather.usePortal(null, me.name);

			return true;
		};
		this.staff = function () {
			this.prepChoreA("staff", 2, true, "waypoint", 43, true);

			if (!Pather.moveToExit([62, 63, 64], true) || !Pather.moveToPreset(me.area, 2, 356)) {
				throw new Error("staff failed");
			}

			Pather.makePortal();
			Attack.securePosition(me.x, me.y, 30, 3000, true);
			me.overhead("1");

			while (!this.playerIn()) {
				//Pather.moveToPreset(me.area, 2, 356);
				delay(100);
			}

			while (this.playerIn()) {
				delay(100);
			}

			Pather.usePortal(null, me.name);

			return true;
		};
		this.summoner = function () {
			// right up 25449 5081 (25431, 5011)
			// left up 25081 5446 (25011, 5446)
			// right down 25830 5447 (25866, 5431)
			// left down 25447 5822 (25431, 5861)
			
			this.prepChoreA("Summoner", 2, true, "waypoint", 74, true);

			var i, journal,
				preset = getPresetUnit(me.area, 2, 357),
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

			Pather.makePortal();
			Attack.securePosition(me.x, me.y, 25, 3000);
			me.overhead("1");

			while (!this.playerIn()) {
				Pather.moveToUnit(spot);
				Attack.securePosition(me.x, me.y, 25, 500);
				delay(250);
			}

			Pather.moveToPreset(me.area, 2, 357);
			Attack.kill(250);
			me.overhead("2");

			while (this.playerIn()) {
				delay(100);
			}

			Pickit.pickItems();
			Pather.moveToPreset(me.area, 2, 357);

			journal = getUnit(2, 357);

			for (i = 0; i < 5; i += 1) {
				journal.interact();
				delay(1000);
				me.cancel();

				if (Pather.getPortal(46)) {
					break;
				}
			}

			if (i === 5) {
				throw new Error("summoner failed");
			}

			Pather.usePortal(46);

			return true;
		};
		this.duriel = function () {
			this.prepChoreA("Duriel", 2, true, "waypoint", 46, true);

			if (!Pather.moveToExit(getRoom().correcttomb, true) || !Pather.moveToPreset(me.area, 2, 152)) {
				throw new Error("duriel failed");
			}

			Pather.makePortal();
			Attack.securePosition(me.x, me.y, 30, 3000, true, me.diff === 2);
			me.overhead("1");

			while (!this.playerIn()) {
				//Pather.moveToPreset(me.area, 2, 152, 0, -5);
				delay(100);
			}

			while (this.playerIn()) {
				delay(100);
			}

			while (!getUnit(2, 100)) {
				delay(500);
			}

			Pather.useUnit(2, 100, 73);
			Attack.kill(211);
			Pickit.pickItems();

			Pather.teleport = false;

			Pather.moveTo(22579, 15706);

			Pather.teleport = true;

			Pather.moveTo(22577, 15649, 10);
			Pather.moveTo(22577, 15609, 10);
			Pather.makePortal();
			me.overhead("1");

			while (!this.playerIn()) {
				delay(100);
			}

			if (!Pather.usePortal(null, me.name)) {
				Town.goToTown();
			}

			Pather.useWaypoint(52);
			Pather.moveToExit([51, 50], true);
			Pather.moveTo(10022, 5047);
			me.overhead("a3");
			Town.goToTown(3);
			Town.doChores();

			while (!this.playersInAct(3)) {
				delay(250);
			}

			return true;
		};
		this.travincal = function () {
			this.prepChoreA("Travincal", 3, true, "waypoint", 83, true);
			var coords = [me.x, me.y];

			Pather.moveTo(coords[0] + 23, coords[1] - 102);
			Pather.makePortal();
			Attack.securePosition(me.x, me.y, 40, 3000);
			me.overhead("1");

			while (!this.playerIn()) {
				delay(250);
			}

			Pather.moveTo(coords[0] + 30, coords[1] - 134);
			Pather.moveTo(coords[0] + 86, coords[1] - 130);
			Pather.moveTo(coords[0] + 71, coords[1] - 94);
			Attack.securePosition(me.x, me.y, 40, 3000);

			/*Attack.kill(getLocaleString(2863));
			Attack.kill(getLocaleString(2862));
			Attack.kill(getLocaleString(2860));*/

			me.overhead("2");
			Pather.moveTo(coords[0] + 23, coords[1] - 102);
			Pather.usePortal(null, me.name);

			return true;
		};

		this.mephisto = function () {
			this.prepChoreA("Mephisto", 3, true, "waypoint", 101, true);
			var hydra;

			Pather.moveToExit(102, true);
			Pather.moveTo(17692, 8023);
			Pather.makePortal();
			delay(2000);
			me.overhead("1");

			while (!this.playerIn()) {
				delay(250);
			}

			Pather.moveTo(17591, 8070);
			Attack.kill(242);
			Pickit.pickItems();
			Pather.moveTo(17692, 8023);
			Pather.makePortal();
			me.overhead("2");

			while (this.playerIn()) {
				delay(250);
			}

			Pather.moveTo(17591, 8070);
			Attack.securePosition(me.x, me.y, 40, 3000);

			hydra = getUnit(1, "hydra");

			if (hydra) {
				do {
					while (hydra.mode !== 0 && hydra.mode !== 12 && hydra.hp > 0) {
						delay(500);
					}
				} while (hydra.getNext());
			}

			Pather.makePortal();
			Pather.moveTo(17581, 8070);
			me.overhead("1");

			while (!this.playerIn()) {
				delay(250);
			}

			me.overhead("a4");
			//Pather.moveTo(17591, 8070);

			while (!this.playersInAct(4)) {
				delay(250);
			}

			delay(2000);
			Pather.usePortal(null);

			return true;
		};
		this.izual = function () {
			this.prepChoreA("Izual", 4, true, "waypoint", 106, true);
			Pather.moveToExit(105, true);

			var i, izualCoords, izual, izualPreset, returnSpot,
				moveIntoPos = function (unit, range) {
					var i, coordx, coordy,
						coords = [],
						angle = Math.round(Math.atan2(me.y - unit.y, me.x - unit.x) * 180 / Math.PI),
						angles = [0, 15, -15, 30, -30, 45, -45, 60, -60, 75, -75, 90, -90, 105, -105, 120, -120, 135, -135, 150, -150, 180];

					for (i = 0; i < angles.length; i += 1) {
						coordx = Math.round((Math.cos((angle + angles[i]) * Math.PI / 180)) * range + unit.x);
						coordy = Math.round((Math.sin((angle + angles[i]) * Math.PI / 180)) * range + unit.y);

						try {
							if (!(getCollision(unit.area, coordx, coordy) & 0x1)) {
								coords.push({
									x: coordx,
									y: coordy
								});
							}
						} catch (e) {

						}
					}

					if (coords.length > 0) {
						coords.sort(Sort.units);

						return Pather.moveToUnit(coords[0]);
					}

					return false;
				};

			
			Pather.moveToExit(105, true);

			izualPreset = getPresetUnit(105, 1, 256);
			izualCoords = {
				area: 105,
				x: izualPreset.roomx * 5 + izualPreset.x,
				y: izualPreset.roomy * 5 + izualPreset.y
			};

			moveIntoPos(izualCoords, 50);

			for (i = 0; i < 3; i += 1) {
				izual = getUnit(1, 256);

				if (izual) {
					break;
				}

				delay(500);
			}

			if (izual) {
				moveIntoPos(izual, 60);
			} else {
				print("izual unit not found");
			}

			returnSpot = {
				x: me.x,
				y: me.y
			};

			Attack.securePosition(me.x, me.y, 30, 3000);
			Pather.makePortal();
			me.overhead("1");

			while (!this.playerIn()) {
				delay(200);
			}

			Attack.kill(256); // Izual
			Pickit.pickItems();
			me.overhead("2");
			Pather.moveToUnit(returnSpot);

			while (this.playerIn()) {
				delay(200);
			}

			Pather.usePortal(null, null);

			return true;
		};
		this.diablo = function () {
			this.prepChoreA("Diablo", 4, true, "waypoint", 107, true);
			Pather.moveTo(7790, 5544);

			this.getLayout = function (seal, value) {
				var sealPreset = getPresetUnit(108, 2, seal);

				if (!seal) {
					throw new Error("Seal preset not found. Can't continue.");
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

				for (i = 0; i < (name === getLocaleString(2853) ? 14 : 12); i += 1) {
					boss = getUnit(1, name);

					if (boss) {
						if (name === getLocaleString(2852)) {
							this.chaosPreattack(getLocaleString(2852), 8);
						}

						Attack.kill(name);
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

			this.openSeal = function (id) {
				Pather.moveToPreset(108, 2, id, id === 394 ? 5 : 2, id === 394 ? 5 : 0);

				var i, tick,
					seal = getUnit(2, id);

				if (seal) {
					for (i = 0; i < 3; i += 1) {

						if (id === 394) {
							Misc.click(0, 0, seal);
						} else {
							seal.interact();
						}

						tick = getTickCount();

						while (getTickCount() - tick < 500) {
							if (seal.mode) {
								return true;
							}

							delay(10);
						}
					}
				}

				return false;
			};

			this.initLayout();

			if (!this.openSeal(395) || !this.openSeal(396)) {
				throw new Error("Failed to open seals");
			}

			if (this.vizLayout === 1) {
				Pather.moveTo(7691, 5292);
			} else {
				Pather.moveTo(7695, 5316);
			}

			if (!this.getBoss(getLocaleString(2851))) {
				throw new Error("Failed to kill Vizier");
			}

			if (!this.openSeal(394)) {
				throw new Error("Failed to open seals");
			}

			if (this.seisLayout === 1) {
				Pather.moveTo(7771, 5196);
			} else {
				Pather.moveTo(7798, 5186);
			}

			if (!this.getBoss(getLocaleString(2852))) {
				throw new Error("Failed to kill de Seis");
			}

			if (!this.openSeal(392) || !this.openSeal(393)) {
				throw new Error("Failed to open seals");
			}

			if (this.infLayout === 1) {
				delay(1);
			} else {
				Pather.moveTo(7928, 5295); // temp
			}

			if (!this.getBoss(getLocaleString(2853))) {
				throw new Error("Failed to kill Infector");
			}

			Pather.moveTo(7763, 5267);
			Pather.makePortal();
			Pather.moveTo(7727, 5267);
			me.overhead("1");

			while (!this.playerIn()) {
				delay(250);
			}

			Pather.moveTo(7763, 5267);

			while (!getUnit(1, 243)) {
				delay(500);
			}

			Attack.kill(243);
			me.overhead("2");

			if (me.gametype > 0) {
				me.overhead("a5");

				while (!this.playersInAct(5)) {
					delay(250);
				}
			}

			Pickit.pickItems();

			if (!Pather.usePortal(null, me.name)) {
				Town.goToTown();
			}

			return true;
		};
		this.shenk = function () {
			this.prepChoreA("Shenk", 5, true, "waypoint", 111, true);
			Pather.moveTo(3846, 5120);
			
			Attack.securePosition(me.x, me.y, 30, 3000);
			Pather.makePortal();
			me.overhead("1");

			while (!this.playerIn()) {
				delay(200);
			}

			Attack.kill(getLocaleString(22435)); // Shenk
			Pickit.pickItems();
			Pather.moveTo(3846, 5120);
			me.overhead("2");

			while (this.playerIn()) {
				delay(200);
			}

			Pather.usePortal(null, null);

			return true;
		};
		this.anya = function () {
			this.prepChoreA("Anya", 5, true, "waypoint", 113, true);			
			var anya;

			if (!Pather.moveToExit(114, true) || !Pather.moveToPreset(me.area, 2, 460)) {
				throw new Error("Anya quest failed");
			}

			Attack.securePosition(me.x, me.y, 30, 2000);

			anya = getUnit(2, 558);

			if (anya) {
				Pather.moveToUnit(anya);
				sendPacket(1, 0x13, 4, 0x2, 4, anya.gid); // Rusher should be able to interact so quester can get the potion without entering
				delay(1000 + me.ping);
				me.cancel();
			}

			Pather.makePortal();
			me.overhead("1");

			while (!this.playerIn()) {
				delay(200);
			}

			while (getUnit(2, 558)) {
				delay(1000);
			}

			me.overhead("2"); // Mainly for non-questers to know when to get the scroll of resistance

			while (this.playerIn()) {
				delay(200);
			}

			Pather.usePortal(null, null);

			return true;
		};
		this.ancients = function () {
			if (!this.bumperCheck()) {
				me.overhead("No eligible bumpers detected. Rush complete~");
				delay(500);
				//quit();

				return false;
			}
			this.prepChoreA("Ancients", 5, true, "waypoint", 118, true);
			var altar;

			if (!Pather.moveToExit(120, true)) {
				throw new Error("Failed to go to Ancients way.");
			}

			Pather.moveTo(10089, 12622);
			Pather.makePortal();
			me.overhead("3");

			while (!this.playerIn()) {
				delay(250);
			}

			Pather.moveTo(10048, 12628);

			altar = getUnit(2, 546);

			if (altar) {
				while (altar.mode !== 2) {
					Pather.moveToUnit(altar);
					altar.interact();
					delay(2000 + me.ping);
					me.cancel();
				}
			}

			while (!getUnit(1, 542)) {
				delay(250);
			}

			Attack.clear(50);
			Pather.moveTo(10089, 12622);
			me.cancel();
			Pather.makePortal();

			while (this.playerIn()) {
				delay(100);
			}

			if (!Pather.usePortal(null, me.name)) {
				Town.goToTown();
			}

			return true;
		};
		this.baal = function () {
			this.prepChoreA("Baal", 5, true, "waypoint", 129, true);
			var tick, portal;
			
			if (!Pather.moveToExit([130, 131], true)) {
				throw new Error("Failed to move to Throne of Destruction.");
			}
			
			Pather.moveTo(15113, 5040);
			Pather.makePortal();
			Attack.clear(15);
			this.clearThrone();

			tick = getTickCount();
			Pather.moveTo(15093, me.classid === 3 ? 5029 : 5039);

			preattack = function () {
				var check;

				switch (me.classid) {
				case 1:
					if ([56, 59, 64].indexOf(Config.AttackSkill[1]) > -1) {
						if (me.getState(121)) {
							delay(500);
						} else {
							Skill.cast(Config.AttackSkill[1], 0, 15093, 5024);
						}
					}

					return true;
				case 3: // Paladin
					if (Config.AttackSkill[3] !== 112) {
						return false;
					}

					if (getDistance(me, 15093, 5029) > 3) {
						Pather.moveTo(15093, 5029);
					}

					if (Config.AttackSkill[4] > 0) {
						Skill.setSkill(Config.AttackSkill[4], 0);
					}

					Skill.cast(Config.AttackSkill[3], 1);

					return true;
				case 5: // Druid
					if (Config.AttackSkill[3] === 245) {
						Skill.cast(Config.AttackSkill[3], 0, 15093, 5029);

						return true;
					}

					break;
				case 6:
					if (Config.UseTraps) {
						check = ClassAttack.checkTraps({x: 15093, y: 5029});

						if (check) {
							ClassAttack.placeTraps({x: 15093, y: 5029}, 5);

							return true;
						}
					}

					break;
				}

				return false;
			};

			checkThrone = function () {
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

			clearThrone = function () {
				var i, monster,
					monList = [],
					pos = [15097, 5054, 15085, 5053, 15085, 5040, 15098, 5040, 15099, 5022, 15086, 5024];

				if (Config.AvoidDolls) {
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
					Attack.clear(30);
				}
			};

			checkHydra = function () {
				var monster = getUnit(1, "hydra");

				if (monster) {
					do {
						if (monster.mode !== 12 && monster.getStat(172) !== 2) {
							Pather.moveTo(15118, 5002);

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

			
	MainLoop:
			while (true) {
				if (getDistance(me, 15093, me.classid === 3 ? 5029 : 5039) > 3) {
					Pather.moveTo(15093, me.classid === 3 ? 5029 : 5039);
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
					this.checkHydra();

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

				Precast.doPrecast(false);
				delay(10);
			}

			this.clearThrone();
			Pather.moveTo(15092, 5011);
			Precast.doPrecast(true);

			while (getUnit(1, 543)) {
				delay(500);
			}

			delay(1000);

			portal = getUnit(2, 563);

			if (portal) {
				Pather.usePortal(null, null, portal);
			} else {
				throw new Error("Couldn't find portal.");
			}

			Pather.moveTo(15213, 5908);
			Pather.makePortal();
			Pather.moveTo(15170, 5950);
			delay(1000);
			me.overhead("3");

			while (!this.playerIn()) {
				delay(250);
			}

			Pather.moveTo(15134, 5923);
			Attack.kill(544); // Baal
			Pickit.pickItems();

			return true;
		};
	
		
		/* -- chore scripts below --  */
		this.den = function () {
			this.prepChoreA("Den", 1, true, "waypoint", 3, true);
			Pather.moveToExit([2, 8], true);
			delay(250);
			Town.goToTown();
			delay(rand(3000,4000));
			return true;
		};
		this.hole = function () {
			this.prepChoreA("Hole in the Black Marsh", 1, true, "waypoint", 6, true);
			Pather.moveToExit([6, 11], true);
			delay(250);
			Town.goToTown();
			delay(rand(3000,4000));
			return true;
		};
		this.count = function () {
			this.prepChoreA("Countess", 1, true, "waypoint", 6, true);
			var i, poi, x_count, y_count;	
			
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
			var tmp_meX = me.x;
			var tmp_meY = me.y;
			Pather.makePortal();	// dEditAdded
			delay(250);
			
			Attack.securePosition(me.x, me.y, 40, 1000, true);	// dEditAdded
			Pather.moveTo(tmp_meX, tmp_meY);
			Town.goToTown();
			delay(rand(3000,4000));
			return true;
		};
		this.andy = function () {
			this.prepChoreA("Andy", 1, true, "waypoint", 35, true);
			
			if (!Pather.moveToExit([36, 37], true) || !Pather.moveTo(22582, 9612)) {
				originPather.makePortal();
				Pather.usePortal(null, me.name);
				throw new Error("andy failed");
			}

			Pather.moveTo(22563, 9556);
			delay(250);
			Pather.makePortal();	// dEditAdded
			delay(250);
			
			//Attack.kill(156);
			
			Attack.securePosition(me.x, me.y, 40, 3000, true);	// dEditAdded
			Pather.moveTo(22563, 9556);
			Town.goToTown();
			delay(250);
			return true;
		};
		this.duri = function () {
			this.prepChoreA("Duriel", 2, true, "waypoint", 46, true);
			
			if (!Pather.moveToExit(getRoom().correcttomb, true) || !Pather.moveToPreset(me.area, 2, 152)) {
				throw new Error("duriel failed");
			}

			while (!getUnit(2, 100)) {
				delay(500);
			}

			Pather.useUnit(2, 100, 73);
			Pather.makePortal();
			delay(250);
			Attack.kill(211);
			Town.goToTown();
			delay(250);
			return true;
		};
		this.meph = function () {
			this.prepChoreA("Mephisto", 3, true, "waypoint", 101, true);
			Pather.moveToExit(102, true);
			Pather.moveTo(17591, 8070);
			Pather.makePortal();
			
			Attack.kill(242);
			
			Pather.moveTo(17591, 8070);
			Town.goToTown();
			delay(250);
			return true;
		};
		this.centr = function () {
			this.prepChoreA("Chaos enterance", 4, true, "waypoint", 107, true);

			if (!Pather.moveTo(7790, 5544)) {
				throw new Error("Failed to move to Chaos Sanctuary");
			}
			Pather.makePortal();							// dEditeAdd make a portal at entrance
			delay(500);
			
			while (!this.playerIn()) {
				Attack.securePosition(me.x, me.y, 30, 250);
				delay(100);
			}
			Pather.moveTo(7790, 5544);
			Town.goToTown();
			delay(250);
			return true;
		};
		this.ctr = function () {
			this.prepChoreA("Chaos centre", 1, true, "waypoint", 107, true);
			Pather.moveTo(7791, 5299);
			Pather.makePortal();
			
			while(!myTroops.LdrInMyArea()) {
				Attack.clear(5, 0, false, false, true);
				delay(750);
			}
			Town.goToTown();
			delay(250);
			return true;
		};
		
		
		this.seals = function () {
			this.starToVizA = [7759, 5295, 7734, 5295, 7716, 5295, 7718, 5276, 7697, 5292, 7678, 5293, 7665, 5276, 7662, 5314];
			this.starToVizB = [7759, 5295, 7734, 5295, 7716, 5295, 7701, 5315, 7666, 5313, 7653, 5284];
			this.starToSeisA = [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7775, 5205, 7804, 5193, 7814, 5169, 7788, 5153];
			this.starToSeisB = [7781, 5259, 7805, 5258, 7802, 5237, 7776, 5228, 7811, 5218, 7807, 5194, 7779, 5193, 7774, 5160, 7803, 5154];
			this.starToInfA = [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5295, 7919, 5290];
			this.starToInfB = [7809, 5268, 7834, 5306, 7852, 5280, 7852, 5310, 7869, 5294, 7895, 5274, 7927, 5275, 7932, 5297, 7923, 5313];
			
			this.getLayout = function (seal, value) {
				var sealPreset = getPresetUnit(108, 2, seal);

				if (!seal) {
					throw new Error("Seal preset not found. Can't continue.");
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

					if (!seal) {
						return false;
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

				return false;
			};
			this.initLayout();
			this.vizierSeal = function () {
				me.overhead("ÿc4Viz layout " + this.vizLayout);
				this.followPath(this.vizLayout === 1 ? this.starToVizA : this.starToVizB);

				if (!this.openSeal(395) || !this.openSeal(396)) {
					Pather.moveTo(tmp_x, tmp_y);
					throw new Error("Failed to open Vizier seals.");
				}
				return true;
			};
			this.seisSeal = function () {
				me.overhead("ÿc4Seis layout " + this.seisLayout);
				this.followPath(this.seisLayout === 1 ? this.starToSeisA : this.starToSeisB);

				if (!this.openSeal(394)) {
					Pather.moveTo(tmp_x, tmp_y);
					throw new Error("Failed to open de Seis seal.");
				}
				return true;
			};
			this.infectorSeal = function () {
				me.overhead("ÿc4Inf layout " + this.infLayout);
				this.followPath(this.infLayout === 1 ? this.starToInfA : this.starToInfB);

				if (!this.openSeal(393)) {
					Pather.moveTo(tmp_x, tmp_y);
					throw new Error("Failed to open Infector seals.");
				}
				if (!this.openSeal(392)) {
					Pather.moveTo(tmp_x, tmp_y);
					throw new Error("Failed to open Infector seals.");
				}
				return true;
			};
			
			
			this.prepChoreA("Heading to make a tp at Chaos centre & then club zee seals...", 4, true, "waypoint", 107, true);
			Pather.moveTo(7791, 5299);
			Pather.makePortal();
			
			Precast.doPrecast(true);
			this.vizierSeal();
			this.seisSeal();
			this.infectorSeal();
			Pather.moveTo(7791, 5299);
			Precast.doPrecast(true);
			Pather.moveTo(7791, 5299);
			Town.goToTown();
			delay(250);
			return true;	
		};
		this.anc = function () {
			this.prepChoreA("Ancients", 5, true, "waypoint", 118, true);
			var altar;
			
			if (!Pather.moveToExit(120, true)) throw new me.overhead("Failed to go to Ancients way.");

			Pather.moveTo(10089, 12622);
			Pather.makePortal();
			me.overhead("ÿc43");

			while (!this.playerIn()) delay(250);

			Pather.moveTo(10048, 12628);
			altar = getUnit(2, 546);

			if (altar) {
				while (altar.mode !== 2) {
					Pather.moveToUnit(altar);
					altar.interact();
					delay(2000 + me.ping);
					me.cancel();
				}
			}

			while (!getUnit(1, 542)) delay(250);

			Attack.clear(50);
			Pather.moveTo(10089, 12622);
			me.cancel();
			Pather.makePortal();

			while (this.playerIn()) delay(100);

			if (!Pather.usePortal(null, me.name)) Town.goToTown();

			return true;
		};
		this.throne = function () {
			this.prepChoreA("Throne", 5, true, "waypoint", 129, true);

			if (!Pather.moveToExit([130, 131], true)) {
				Town.goToTown();
				throw new Error("Failed to move to Throne of Destruction.");
			}

			Pather.moveTo(15112, 5052);
			Pather.makePortal();
			delay(500);
			while (!this.playerIn()) {
				Attack.securePosition(me.x, me.y, 30, 250);
				delay(100);
			}
			Pather.moveTo(15112, 5052);
			
			return true;
		};
		this.baalb = function () {
			var	portal, tick,
			_dollsSoulChk = true;
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
					pos = [15094, 5022, 15094, 5041, 15094, 5060, 15094, 5041, 15094, 5022];

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

				me.overhead("ÿc4" + string);
			};

			
			this.prepChoreA("Baal", 5, true, "waypoint", 129, true);

			if (!Pather.moveToExit([130, 131], true)) {
				throw new Error("Failed to move to Throne of Destruction.");
			}

			Pather.moveTo(15095, 5029);

			/*if (_dollsSoulChk && getUnit(1, 691)) {	// dEditCut Config.Baal.DollQuit
				me.overhead("ÿc4Dolls found! NG.");
				Town.goToTown();
				Town.doChores();
				return true;
			}

			if (_dollsSoulChk && getUnit(1, 641)) {	// dEditCut Config.Baal.SoulQuit
				me.overhead("ÿc4Souls found! NG.");
				Town.goToTown();
				Town.doChores();
				return true;
			}*/

			if (1) {	// dEditCut Config.PublicMode
				this.announce();
				Pather.moveTo(15118, 5002);
				Pather.makePortal();
				me.overhead("ÿc4" + "Hot tp. So, come on down!");
				Attack.clear(15);
			}

			this.clearThrone();

			if (1) {	// dEditCut Config.PublicMode
				Pather.moveTo(15118, 5045);
				Pather.makePortal();
				me.overhead("ÿc4" + "Safe tp. Saunter in you shmoos.");	// dEditCut Config.Baal.SafeTPMessage
				Precast.doPrecast(true);
			}

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

			if (1) {											// dEditCut Config.Baal.KillBaal
				if (1) {										// Config.PublicMode
					me.overhead("ÿc4" + "You can do it!");		// Config.Baal.BaalMessage
				}

				Pather.moveTo(15090, 5008);
				delay(5000);
				Precast.doPrecast(true);
				
				while (getUnit(1, 543)) {
					delay(500);
				}
				
				while (myTroops.LdrInMyArea()) { delay(rand(1200,2000));	}	// dEdits: when ldr goes to town, then go to baal

				portal = getUnit(2, 563);

				if (portal) {
					Pather.usePortal(null, null, portal);
				} else {
					throw new Error("Couldn't find portal.");
				}

				Pather.moveTo(15134, 5923);
				Pather.makePortal();			// dEditAdded
				delay(250);
				Attack.kill(544); 				// Baal
				Pickit.pickItems();
			}
			delay(rand(6000,8000));
			Town.goToTown();
			return true;
		};
		this.pindle = function () {
			this.prepChoreA("Pindle", 5, true, "waypoint", 123, true);
			var anya;

			if (!Pather.moveToExit([122, 121], true)) {
				me.overhead("Failed to move to Nihlahak's Temple");
				Town.goToTown(5);
				return false;
			}
			
			Pather.makePortal();
			Attack.clear(5, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)	
			Pather.moveTo(10058, 13234);

			try {
				Attack.clear(15, 0, getLocaleString(22497)); // Pindleskin
			} catch (e) {
				print(e);
			}
			Pickit.pickItems();
			delay(rand(6000,8000));
			Town.goToTown();
			return true;
		};
		
		/* -------------------------  */
		
		switch(rMsg) {
			case "rmini":
			case me.name + "rmini":
				this.andariel();
				this.cube();
				this.amulet();
				this.staff();
				this.summoner();
				this.duriel();
				this.travincal();
				this.mephisto();
				this.diablo();
				this.shenk();
				break;
			case "rmax":
			case me.name + "rmax":
				this.cain();
				this.andariel();
				this.radament();
				this.cube();
				this.amulet();
				this.staff();
				this.summoner();
				this.duriel();
				this.travincal();
				this.mephisto();
				this.izual();
				this.diablo();
				this.shenk();
				this.anya();
				this.ancients();
				this.baal();
				break;
			case "rcain":
			case me.name + "rcain":
				this.cain();
				break;
			case "randariel":
			case me.name + "randariel": 	
				this.andariel();
				break;
			case "rradament":
			case me.name + "rradament": 
				this.radament();
				break;
			case "rcube":
			case me.name + "rcube": 		
				this.cube();
				break;
			case "ramulet":
			case me.name + "ramulet":		
				this.amulet();
				break;
			case "rstaff":
			case me.name + "rstaff": 		
				this.staff();
				break;
			case "rsummoner":
			case me.name + "rsummoner":	
				this.summoner();
				break;
			case "rduriel":
			case me.name + "rduriel":		
				this.duriel();
				break;
			case "rtravincal":
			case me.name + "rtravincal":	
				this.travincal();
				break;
			case "rmephisto":
			case me.name + "rmephisto":	
				this.mephisto();
				break;
			case "rizual":
			case me.name + "rizual":		
				this.izual();
				break;
			case "rdiablo":
			case me.name + "rdiablo":		
				this.diablo();
				break;
			case "rshenk":
			case me.name + "rshenk":		
				this.shenk();
				break;
			case "ranya":
			case me.name + "ranya":		
				this.anya();
				break;
			case "rancients":
			case me.name + "rancients":	
				this.ancients();
				break;
			case "rbaal":
			case me.name + "rbaal":		
				this.baal();
				break;
			
			/* ----------  */
			
			case "den":
			case me.name + " den":
				this.den();
				break;
			case "hole":
			case me.name + " hole":
				this.hole();
				break;
			case "pit":
			case me.name + " pit":
				this.pit();
				break;
			case "count":
			case me.name + " count":
				this.count();
				break;
			case "andy":
			case me.name + " andy":
				this.andy();
				break;
			case "duri":
			case me.name + " duri":
				this.duri();
				break;
			case "meph":
			case me.name + " meph":
				this.meph();
				break;
			case "centr":
			case me.name + " centr":
				this.centr();
				break;
			case "ctr":
			case me.name + " ctr":
				this.ctr();
				break;
			case "seals":
			case me.name + " seals":
				this.seals();
				break;
			case "anc":
			case me.name + " anc":
				this.anc();
				break;
			case "throne":
			case me.name + " throne":
				this.throne();
				break;
			case "baalb":
			case me.name + " baalb":
				this.baal();
				break;
			case "pindle":
			case me.name + " pindle":
				this.pindle();
				break;
			case "truffle":
			case me.name + " truffle":
				this.truffle();
				break;
		}
	}
};
