const chrononData = [
  ["A Call of Power", "1_01", 1, "Reduce Skill CD of Self", "Boost Self Attack", "Counter Fixed Combo Shield"],
  ["Quintuple Radiance", "1_02", 1, "Reduce Skill CD of Self", "Boost Self Attack", "Counter Quintet Elemental Shield"],
  ["Explore the Unknown", "1_03", 1, "Reduce Skill CD of Self", "Boost Self Attack", "Counter Puzzle Shield"],
  ["Under the Tree", "1_04", 1, "Recover Team HP", "Boost Team Recovery", "Recover Team HP"],
  ["Extraction of Mana", "1_05", 3, "Increase Combo Count", "Launch Extra Number of Non-Attributive Attack||Counter Burning", "Counter Fixed Combo Shield"],
  ["Whispers of Doubts", "1_06", 3, "Increase Combo Count", "Launch Extra Number of Fire Attack||Counter Quintet Elemental Shield", "Boost Self Attack"],
  ["In the Lumiere of Wisdom", "1_07", 3, "Increase Combo Count", "Launch Extra Number of Dark Attack||Counter Burning", "Counter Quintet Elemental Shield"],
  ["A Bullet Hit", "1_08", 3, "Increase Combo Count", "Launch Extra Number of Water Attack||Counter Sticky", "Counter Puzzle Shield"],
  ["Descending Dragon Wings", "1_09", 2, "Increase Combo Count", "Reduce Received Attack-damage||Counter Sticky", "Reduce Skill CD of Self"],
  ["The Cost of Living", "1_10", 2, "Enter Hyper State", "Launch Extra Number of Water Attack||Convert into Water Runestones||Counter Cross-shaped Shield", "Boost Self Attack"],
  ["Written in the Book", "1_11", 1, "Reduce Skill CD of Self", "Convert into Fire Runestones", "Launch Extra Attack of Each Attribute"],
  ["The Great Witch and Her Companion", "1_12", 1, "Reduce Skill CD of Self", "Convert into Light Runestones", "Counter Equal-Combo Shield"],
  ["Gaze Through the Waters", "1_13", 1, "Reduce Skill CD of Self", "Convert into Dark Runestones", "Launch Extra Number of Dark Attack"],
  ["Aspirated Tune", "1_14", 2, "Reduce Skill CD of Dragons", "Counter Runestone Combo Nullifying||Counter Equal-Combo Shield", "Launch Extra Number of Earth Attack"],
  ["Melodic Harmony", "1_15", 2, "Reduce Skill CD of Beasts", "Launch Extra Number of Non-Attributive Attack||Counter Explosive Bomb", "Counter Puzzle Shield"],
  ["Flames of Protection", "1_16", 4, "Enter Hyper State", "Launch Extra Number of Fire Attack||Counter Puzzle Shield||Counter Initial Shield", "Boost Self Attack"],
  ["Fruits of Love", "1_17", 3, "Increase Combo Count", "Counter Anti-Runestones Shield (First Batch)||Launch Extra Number of Earth Attack", "Counter Puzzle Shield"],
  ["Between Dreams and Reality", "1_18", 3, "Charge Craft Apparatus", "Counter Scorching Areas||Launch Extra Number of Non-Attributive Attack", "Counter Quintet Elemental Shield"],
  ["Unbounded Cycle", "1_19", 2, "Deal Direct Non-Attributive Damage", "Counter Quintet Elemental Shield", "Reduce Skill CD of Self"],
  ["The War Deity's Valor", "1_20", 4, "Enter Hyper State", "Counter Skill Lock - Prevent||Counter Fixed Combo Shield||Counter Damage-reducing Resistance", "Boost Self Attack||Set Up Runestones in Fixed Numbers and Positions (Convert)"],
  ["Tranquil Days", "1_21", 2, "Counter Hypnosis State", "Counter Initial Shield", "Boost Self Attack"],
  ["Changing World", "1_22", 2, "Counter Windswept State", "Counter Equal-Combo Shield", "Boost Self Attack"],
  ["Under the Starry Sky", "1_23", 2, "Counter Fatigue State", "Counter Skill Lock - Prevent", "Counter Runestone Combo Nullifying||Counter Combo Seal"],
  ["A Looping Tragic Tale", "1_24", 3, "Reduce Skill CD of Humans", "Counter Puzzle Shield||Reduce Received Attack-damage", "Boost Self Attack||Counter Equal-Combo Shield"],
  ["Raising the Holy Spear", "1_25", 3, "Reduce Skill CD of Gods", "Counter Fixed Combo Shield||Reduce Skill CD of Self||Restore Skill EP of Self", "Boost Self Attack||Counter Initial Shield"],
  ["A Game of Conquest", "1_26", 4, "Enter Hyper State", "Launch Extra Number of Light Attack||Counter Duet Elemental Shield||Counter Trio Elemental Shield||Counter Quartet Elemental Shield||Counter Quintet Elemental Shield||Counter All-Runestones Shield (Type)", "Boost Self Attack||Counter Cross-shaped Shield"],
  ["Hard to Say Goodbye", "1_27", 4, "Recover Team HP", "Convert into Light Runestones", "Set Up Runestones in Fixed Numbers and Positions (Convert)"],
  ["Calm Negotiation", "1_28", 3, "Deal Direct Non-Attributive Damage", "Counter Burning||Dodge Attack-damage", "Counter Puzzle Shield||Boost Self Attack"],
  ["Aligned Determination", "1_29", 2, "Charge Craft Apparatus", "Launch Extra Number of Light Attack||Launch Extra Number of Fire Attack", "Counter Equal-Combo Shield"],
  ["Stellar Explosion", "1_30", 4, "Counter Fatigue State||Enter Hyper State", "Increase Combo Count", "Delay Enemies' CD"],
  ["Call of Heroic Spirits", "1_31", 2, "Reduce Skill CD of Light Members", "Counter Initial Shield||Counter Skill Lock - Prevent", "Set Up Runestones in Fixed Numbers and Positions (Convert)||Boost Self Attack"],
  ["Dragon Tamer", "1_32", 4, "Enter Hyper State", "Launch Extra Attack of Each Attribute||Counter Equal-Combo Shield||Dodge Attack-damage", "Boost Self Attack||Freeze Enemies"],
];

function FillChrononModal(id) {
  var titleName = chrononData[id-1][0];
  var iconName = chrononData[id-1][1];
  var duration = chrononData[id-1][2];
  var instaEff = chrononData[id-1][3].split("||");
  var roundEff = chrononData[id-1][4].split("||");
  var triggEff = chrononData[id-1][5].split("||");

  document.getElementById("chrononModalTitle").innerHTML = chrononData[id-1][0];
  document.getElementById("chrononModalContent").innerHTML = "<img src="chronons/" + iconName + ".png" class="img-fluid"><br>";
  document.getElementById("chrononModalContent").innerHTML += "<p>Duration: " + duration + " Round(s).</p><p><b>Instant Skill</b><br>";
  
  for(var i=0; i<instaEff.length; i++) {
    document.getElementById("chrononModalContent").innerHTML += "<span class="badge badge-success">" + instaEff[i] + "</span>&nbsp;";
  }

  document.getElementById("chrononModalContent").innerHTML += "</p><p><b>Round Effect</b><br>";
  for(var i=0; i<roundEff.length; i++) {
    document.getElementById("chrononModalContent").innerHTML += "<span class="badge badge-primary">" + roundEff[i] + "</span>&nbsp;";
  }

  document.getElementById("chrononModalContent").innerHTML += "</p><p><b>Trigger Skill</b><br>";
  for(var i=0; i<triggEff.length; i++) {
    document.getElementById("chrononModalContent").innerHTML += "<span class="badge badge-danger">" + triggEff[i] + "</span>&nbsp;";
  }

  document.getElementById("chrononModalContent").innerHTML += "</p>";
}
