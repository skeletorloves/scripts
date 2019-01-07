/*
	my cusotm d2 d2bs functions
	place this file into the kolbot\libs\common folder
*/
var myTroops = {

	LdrInMyArea: function () {
		var _unit = getUnit(0, Config.Leader); 
		if (_unit) {
			do {
				if (_unit.area === me.area) {
					return true;
				}
			} while (player.getNext());
		}
		return false;
	},
	TroopsInMyArea: function () {						// returns # of followers === me.area
		me.overhead("...waiting for the troops to be where I am.");
		delay(250);
		
		var count = 0;
		var _party = getParty();
		
		do {
			if(_party.area === me.area) count += 1;
		} while (_party.getNext());
		
		return count;
	},
	TroopsNearMe: function () {
		me.overhead("Checking distance btwn & area of followers and me...");
		delay(rand(3500,4000));
		var _troop, _dist;
		var _oorCount = 0;
		
		for (var _i = 1; _i < Config.Troops.length; _i += 1) {	// cycle through the list of followers
			
			_troop = getUnit(0, Config.Troops[_i]);
			_dist = getDistance(me, _troop);
			
			if (_dist === 0 || _troop.area !== me.area)	{								// if follower is out of range or possibly in town or in another area
				me.overhead("A peep is too far or somewhere else. Going to town, so as to reset troops...");
				if (!me.intown) Town.goToTown();
				Town.doChores();
				delay(rand(10000,12000));
				Town.move("portalspot");
				delay(250);
				
				while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(2000,3000)); }	// wait for all the followers to be in the town that I am
				delay(rand(6000,8000));
				Pather.usePortal(null, me.name);
				delay(250);
				Pather.makePortal();
				delay(250);
				
				var _startTime = getTickCount();
				while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { 
					Attack.clear(5, 0, false, false, true);
					if ((getTickCount() - _startTime) > (500 * 1000)) quit(); // dEdits: quit game if waiting longer than 5 mins
				}	// clear a small area while waiting for all the followers 
																																// to go to where I have gone
			}
			
			_troop = getUnit(0, Config.Troops[_i]);
			if(_troop === undefined) {
				_oorCount += 1;
				break;
			}
			_dist = getDistance(me, _troop);
			if (_dist > 40 || _troop.area !== me.area) _oorCount += 1;		// if follower's distance is further than 50 or possibly in town or in another area
			me.overhead("The distance between us is: " + _dist + " | _oorCount: " + _oorCount);
			delay(rand(450,1100));
		}

		if(_oorCount > 0) return false;	// false: one or more followers is out of range or in another area
		return true;					// true: all the followers are in position
	},
	prepTroops: function (_waypoint, _pause) {			// instructs bo barb to follow ldr and followers to a waypoint for a bo
		me.overhead("Prepping troops...");
		delay(rand(4000,8000));
		/*me.overhead("me.hpmax: " + me.hpmax + " | Config.meHPmaxOrig: " + Config.meHPmaxOrig); // Config.debugChat
		delay(rand(2000,3000));
		me.overhead("Config.Troops.length: " + Config.Troops.length);
		*/
		Town.goToTown(4);
		say("yo");
		Town.doChores();
		Town.move("waypoint");
		delay(rand(10000,12000));
		
		if(!Pather.useWaypoint(_waypoint)) return false;				// head to _waypoint
		Pather.moveTo(me.x + rand(-5, 5) * 2, me.y + rand(-5, 5) * 2);	// move a wee bit, so as to not be on wp
		Pather.makePortal();
		
		var _startTime = getTickCount();
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { 
			if ((getTickCount() - _startTime) > (500 * 1000)) quit(); // dEdits: quit game if waiting longer than 5 mins
			delay(2000); 
		}						// wait for the barb and the two sorcies to come to river
		
		me.overhead("...everybody is in and waiting...");
		delay(rand(5500,6200));
		say("hulk");
		delay(7000);
		/*if(1) { 											// Config.chatDebug
			me.overhead("me.hpmax: " + me.hpmax + " | Config.meHPmaxOrig: " + Config.meHPmaxOrig);
			delay(2750);
		}*/
		if(_pause) {
			if(Config.BObarb.Towners[0]) say(Config.BObarb.Towners[0] + " yo-yo");
			delay(rand(5000,6000));
			//say(Config.Troops[0]  + " yo-yo");
		}
		
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { 		// check if everyone is in the same area & near, if not pause 'til they are
			me.overhead("...someone has left our area or is out of range. We'll stay put 'til they return.");
			Attack.clear(10, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
			delay(1000); 
		}
			
		me.overhead("Done. Let's get back to town...");
		delay(rand(2000,3000));
		Town.goToTown(4);
		delay(rand(7000,10000));
		
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) {
			me.overhead("Waiting for everyone to rtn to town...");
			delay(rand(3000,4000));
		}
		me.overhead("...everybody is in or nearby. We can do it!");
		return true;
	},
	sorcnecroskellies: function () {
		if(me.classid !== 1) return false;				// not a sorc, return back to main script
		Town.move("waypoint");
		delay(rand(4000,8700));
		Town.goToTown(4);
		Town.move("waypoint");
		myTroops.prepTroops(107, false); 
		Town.goToTown();
		delay(250);
		Town.move("waypoint");
		
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(1500,3000)); } 		// wait for all to come back to me
		me.overhead("Heading to gather skellies...");
		delay(rand(3000,4700));
		Town.goToTown(5);
		
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); } 	// wait for followers to come to me
		delay(rand(6000,8000));
		
		if(!Pather.useWaypoint(111)) return false;					// head to Frigid Highlands wp
		delay(250);
		
		Precast.doPrecast(true);
		Pather.moveTo(3745, 5084, 3, true);
		Pather.makePortal();
		delay(250);
		
		Attack.clear(15, 0, getLocaleString(22500)); // Eldritch the Rectifier
		Attack.clear(10, 0, false, false, true);
		Attack.securePosition(me.x, me.y, 10, 7000);
		
		Town.goToTown();
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(1500,3000)); }
		
		Pather.usePortal(null, me.name);
		delay(750);
		Pather.moveTo(3876, 5130);
		Pather.makePortal();
		delay(250);
		
		Attack.clear(15, 0, getLocaleString(22435)); // Eldritch the Rectifier
		Attack.clear(10, 0, false, false, true);
		Attack.securePosition(me.x, me.y, 10, 7000);
		
		Town.goToTown();
		
		delay(250);
		Town.move("waypoint");
		
		delay(rand(4000,5000));
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(1500,3000)); }
		
		return true;
	},
	gatherSkellies: function () {						// solely for gathering a handful of skellies
		if(me.classid !== 2) return false;				// not a necro, return back to main script
		
		delay(rand(4000,8700));
		Town.goToTown(4);
		myTroops.prepTroops(107, false); 
		Town.goToTown();
		delay(250);
		Town.move("waypoint");
		
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(1500,3000)); } 		// wait for all to come back to me
		me.overhead("Heading to gather skellies...");
		delay(rand(3000,4700));
		Town.goToTown(5);
		
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { delay(rand(1500,3000)); } 	// wait for followers to come to me
		delay(rand(6000,8000));
		
		if(!Pather.useWaypoint(111)) return false;					// head to Frigid Highlands wp
		delay(250);
		
		Precast.doPrecast(true);
		
		/*while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - Config.BObarb.Towners.length))) { 	// check if everyone is in the same area & near, if not pause 'til they are
			me.overhead("...someone has left our area or is out of range. We'll stay put 'til they return.");
			Attack.clear(8, 0, false, false, true);					// clear: function (range, spectype, bossId, sortfunc, pickit)
			delay(rand(500,750)); 
		}*/
		Pather.moveTo(3745, 5084, 3, true);
		Pather.makePortal();
		delay(250);
		Skill.cast(78, 0, (me.x - rand(15,25)), (me.y - rand(15,25)));	// bonewall
		
		Attack.clear(15, 0, getLocaleString(22500)); // Eldritch the Rectifier
		Attack.clear(10, 0, false, false, true);	
		Town.goToTown();
		while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(1500,3000)); }
		
		Pather.usePortal(null, me.name);
		delay(750);
		Pather.moveTo(3876, 5130);
		Pather.makePortal();
		delay(250);
		Skill.cast(78, 0, (me.x + rand(15,25)), (me.y + rand(15,25)));	// bonewall
		delay(750);
		Skill.cast(78, 0, (3879 + rand(0,7)), (5091 + rand(0,7)));	// bonewall
		
		Attack.clear(15, 0, getLocaleString(22435)); // Eldritch the Rectifier
		Attack.clear(10, 0, false, false, true);	
		Town.goToTown();
		
		delay(250);
		Town.move("waypoint");
		
		delay(rand(4000,5000));
		return true;
	},
	my_townThings: function (_act, _chores, _wppt, _tdelayA, _tdelayB, _troops, _ttdelayA, _ttdelayB) {
		me.overhead("my_townThings");
		delay(250);
		
		if(!_act) Town.goToTown();
		else Town.goToTown(_act);
		
		delay(250);
		if(_chores) Town.doChores();
		
		Town.move(_wppt);
		
		if(_tdelayA) {
			delay(rand(_tdelayA, _tdelayB));
		}
		
		if(!_troops) {
			if(me.classid !== 4) Precast.doPrecast(true);
			return;
		}
		
		me.overhead("Waiting for our team...");
		if(_troops == "wBoer") {
			while(!(myTroops.TroopsInMyArea() === Config.Troops.length)) { delay(rand(1500,3000)); }
		} else {
			while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length -1))) { delay(rand(1500,3000)); }
		}
		
		if(_ttdelayA) delay(rand(_ttdelayA, _ttdelayB));
		if(me.classid !== 4) Precast.doPrecast(true);
		Town.move(_wppt);
		me.overhead("Let's do it...");
	}
};
/*
	var _myAct;
	if((me.hpmax != Config.meHPmaxOrig) && (me.name === Config.BObarb.ldr)) {
		_myAct = me.act;
		me.overhead("Oops... Ran out of kale sauce enhancer...");
		myTroops.prepTroops(107, true);
		Town.goToTown(_myAct);
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - 1))) { delay(2000); }
		Town.move("portalspot");
		Pather.usePortal(null, me.name);
		Pather.makePortal();
		while(!(myTroops.TroopsInMyArea() >= (Config.Troops.length - 1))) { delay(2000); }
	}
*/