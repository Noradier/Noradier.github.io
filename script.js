
function GetSkillTag(id) {
  return skillTagData[id-1];
}

function GetStars(score) {
  var content = "";

  for(var i=0; i<score; i++){
    content += "&starf;";
  }
  for(var i=0; i<10-score; i++){
    content += "&star;";
  }

  return content;
}

function GetBadges(ids, classNames) {
  var content = "";
  for(var i=0; i<ids.length; i++) {
    var badgeContent = GetSkillTag( Number(ids[i]) );
    content += `<span class="${classNames}">${badgeContent}</span>&nbsp;`;
  }

  return content;
}

var currentButton = "";
function SetCurrentButtonId(nextButton) {
  if (currentButton != "")
    document.getElementById(currentButton).classList.remove('disabled');
  document.getElementById(nextButton).classList.add('disabled');
  currentButton = nextButton;
}

function ShowLeaders() {
  WriteLeaderContent();
  SetCurrentButtonId("leaderButton");
}

function WriteLeaderContent() {
  document.getElementById("contentHeader").innerHTML = "<h1 class=\"text-center font-weight-bold\">Tier List</h1>";

  var t1 = "";
  var t2 = "";
  var t3 = "";
  var t4 = "";
  var t5 = "";
  var t6 = "";

  for(var i=0; i<leaderData.length; i++) {
    var imageB64 = leaderData[i][0];
    var finalScore = leaderData[i][1];
    nextContent = `<a onclick="FillLeaderModal(${i}); return false;" data-toggle="modal" href="#leaderModal">`;
    nextContent += `<img src="data:image/png;base64,${imageB64}" class="img-fluid custom-icon-size-1"></a>&nbsp;`;
    if(finalScore > 8.5) {
      t1 += nextContent;
      continue;
    }
    if(finalScore > 8) {
      t2 += nextContent;
      continue;
    }
    if(finalScore > 7) {
      t3 += nextContent;
      continue;
    }
    if(finalScore > 6) {
      t4 += nextContent;
      continue;
    }
    if(finalScore > 4) {
      t5 += nextContent;
      continue;
    }
    t6 += nextContent;
  }

  newContent = `<table class="table-responsive-md table table-primary"><thead><th scope="col">Tier</th><th scope="col">Cards</th></tr></thead>`;
  newContent += `<tbody><tr><td>S</td><td>${t1}</td></tr><tr><td>A+</td><td>${t2}</td></tr><tr><td>A</td><td>${t3}</td></tr><tr><td>A-</td><td>${t4}</td></tr><tr><td>B</td><td>${t5}</td></tr><tr><td>C</td><td>${t6}</td></tr></tbody></table>`;
  document.getElementById("content").innerHTML = newContent;
}

function FillLeaderModal(id) {
  var imageB64 = leaderData[id][0];
  var dmgScr = leaderData[id][2];
  var teamScr = leaderData[id][3];
  var survScr = leaderData[id][4];
  var utilScr = leaderData[id][5];
  var easeScr = leaderData[id][6];
  var teamSkl = leaderData[id][7].split("||");
  var tapSkl = leaderData[id][8].split("||");
  var actSkl = leaderData[id][9].split("||");
  var othSkl = leaderData[id][10].split("||");

  document.getElementById("leaderModalImage").innerHTML = `<img src="data:image/png;base64,${imageB64}">`;

  document.getElementById("leaderModalDMG").innerHTML = "DAMAGE<br>" + GetStars(dmgScr);
  document.getElementById("leaderModalTEAM").innerHTML = "TEAMBUILDING<br>" + GetStars(teamScr);
  document.getElementById("leaderModalSURV").innerHTML = "SURVIVABILITY<br>" + GetStars(survScr);
  document.getElementById("leaderModalUTIL").innerHTML = "UTILITY<br>" + GetStars(utilScr);
  document.getElementById("leaderModalEASE").innerHTML = "EASE OF USE<br>" + GetStars(easeScr);

  document.getElementById("leaderModalTeamSkill").innerHTML = "<b>Team Skill</b><br>" + GetBadges(teamSkl, "badge badge-primary");
  document.getElementById("leaderModalTapSkill").innerHTML = "<b>Tap Craft Skill</b><br>" + GetBadges(tapSkl, "badge badge-danger");
  document.getElementById("leaderModalActSkill").innerHTML = "<b>Active Skill</b><br>" + GetBadges(actSkl, "badge badge-success");
  document.getElementById("leaderModalOtherSkill").innerHTML = "<b>Other Skill(s)</b><br>" + GetBadges(othSkl, "badge badge-info");
}


function ShowChronons() {
  WriteChrononContent();
  SetCurrentButtonId("chrononButton");
}

function WriteChrononContent() {
  document.getElementById("contentHeader").innerHTML = "<h1 class=\"text-center font-weight-bold\">Chronon Cards</h1>";

  var t3 = "";
  var t2 = "";
  var t1 = "";

  for(var i=0; i<chrononData.length; i++) {
    var imageB64 = chrononData[i][0];
    var chrTier = chrononData[i][2];
    nextContent = `<a onclick="FillChrononModal(${i}); return false;" data-toggle="modal" href="#chrononModal">`;
    nextContent += `<img src="data:image/png;base64,${imageB64}" class="img-fluid custom-icon-size-1"></a>&nbsp;`;
    if(chrTier == 3) {
      t3 += nextContent;
    }
    if(chrTier == 2) {
      t2 += nextContent;
    }
    if(chrTier == 1) {
      t1 += nextContent;
    }
  }

  newContent = `<table class="table-responsive-md table table-primary"><thead><th scope="col">Tier</th><th scope="col">Cards</th></tr></thead>`;
  newContent += `<tbody><tr><td>3</td><td>${t3}</td></tr><tr><td>2</td><td>${t2}</td></tr><tr><td>1</td><td>${t1}</td></tr></tbody></table>`;
  document.getElementById("content").innerHTML = newContent;
}

function FillChrononModal(id) {
  var imageB64 = chrononData[id][0];
  var chrName = chrononData[id][1];
  var duration = chrononData[id][3];
  var instaEff = chrononData[id][4].split("||");
  var roundEff = chrononData[id][5].split("||");
  var triggEff = chrononData[id][6].split("||");

  document.getElementById("chrononModalTitle").innerHTML = chrName;
  document.getElementById("chrononModalImage").innerHTML = `<img src="data:image/png;base64,${imageB64}">`;
  document.getElementById("chrononModalDuration").innerHTML = `Duration: ${duration} Round(s).`;

  document.getElementById("chrononModalInsta").innerHTML = "<b>Instant Effect</b><br>" + GetBadges(instaEff, "badge badge-success");
  document.getElementById("chrononModalRound").innerHTML = "<b>Round Effect</b><br>" + GetBadges(roundEff, "badge badge-primary");
  document.getElementById("chrononModalTrigg").innerHTML = "<b>Trigger Skill</b><br>" + GetBadges(triggEff, "badge badge-danger");
}


function ShowStates() {
  WriteStateContent();
  SetCurrentButtonId("stateButton");
}

function WriteStateContent() {
  document.getElementById("contentHeader").innerHTML = "<h1 class=\"text-center font-weight-bold\">Character States</h1>";

  var t1 = "";
  var t2 = "";

  for(var i=0; i<stateData.length; i++) {
    var imageB64 = stateData[i][0];
    var stateType = stateData[i][2];
    nextContent = `<a onclick="FillStateModal(${i}); return false;" data-toggle="modal" href="#stateModal">`;
    nextContent += `<img src="data:image/png;base64,${imageB64}" class="img-fluid custom-icon-size-1"></a>&nbsp;`;
    if(stateType == 1) {
      t1 += nextContent;
    }
    if(stateType == 2) {
      t2 += nextContent;
    }
  }

  newContent = `<table class="table-responsive-md table table-primary"><thead><th scope="col">Type</th><th scope="col">States</th></tr></thead>`;
  newContent += `<tbody><tr><td>Positive</td><td>${t1}</td></tr><tr><td>Negative</td><td>${t2}</td></tr></tbody></table>`;
  document.getElementById("content").innerHTML = newContent;
}

function FillStateModal(id) {
  var imageB64 = stateData[id][0];
  var stateName = stateData[id][1];
  var stateDesc = stateData[id][3].split("||");

  document.getElementById("stateModalName").innerHTML = stateName;
  document.getElementById("stateModalImage").innerHTML = `<img src="data:image/png;base64,${imageB64}">`;

  document.getElementById("stateModalDescription").innerHTML = "";
  for(var i=0; i<stateDesc.length; i++) {
    var descLine = stateDesc[i];
    document.getElementById("stateModalDescription").innerHTML += `${descLine}<br>`;
  }
}

