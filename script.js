
function GetSkillTag(id) {
  return skillTagData[id];
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

function GetSkillBadges(ids, classNames) {
  var content = "";
  for(var i=0; i<ids.length; i++) {
    var badgeContent = GetSkillTag( Number(ids[i]) );
    content += `<span class="${classNames}">${badgeContent}</span>&nbsp;`;
  }

  return content;
}

function GetBadges(badgeContents, classNames) {
  var content = "";
  for(var i=0; i<badgeContents.length; i++) {
    var badgeContent = badgeContents[i];
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
    nextContent += `<img src="data:image/png;base64,${imageB64}" class="img-fluid custom-icon-size-2"></a>&nbsp;`;
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
  var instaEff = chrononData[id][4].split("|");
  var roundEff = chrononData[id][5].split("|");
  var triggEff = chrononData[id][6].split("|");

  document.getElementById("chrononModalTitle").innerHTML = chrName;
  document.getElementById("chrononModalImage").innerHTML = `<img src="data:image/png;base64,${imageB64}">`;
  document.getElementById("chrononModalDuration").innerHTML = `Duration: ${duration} Round(s).`;

  document.getElementById("chrononModalInsta").innerHTML = "<b>Instant Effect</b><br>" + GetSkillBadges(instaEff, "badge badge-success");
  document.getElementById("chrononModalRound").innerHTML = "<b>Round Effect</b><br>" + GetSkillBadges(roundEff, "badge badge-primary");
  document.getElementById("chrononModalTrigg").innerHTML = "<b>Trigger Skill</b><br>" + GetSkillBadges(triggEff, "badge badge-danger");
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
    nextContent += `<img src="data:image/png;base64,${imageB64}" class="img-fluid custom-icon-size-2"></a>&nbsp;`;
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

