
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

function GetIconUrl(id) {
  if( typeof(id) == "string" ) {
    return `https://d1h5mn9kk900cf.cloudfront.net/toswebsites/gallery/icons/${id.padStart(4, '0')}.jpg`;
  } else {
    var _id = String(id).padStart(4, '0');
    return `https://d1h5mn9kk900cf.cloudfront.net/toswebsites/gallery/icons/${_id}.jpg`;
  }
}

function FormatCustomImgTag(content) {
  var formattedContent = content.replaceAll("<img>", "<img src=\"https://d1h5mn9kk900cf.cloudfront.net/toswebsites/gallery/icons/");
  formattedContent = formattedContent.replaceAll("</img>", ".jpg\" class=\"img-fluid custom-icon-size-3\">");
  return formattedContent;
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
  const chrononKeys = Object.keys(chrononCards);

  var t3 = "";
  var t2 = "";
  var t1 = "";

  chrononKeys.forEach(chrononKey => {
    var imageB64 = chrononCards[chrononKey].icon;
    var chrTier = chrononCards[chrononKey].tier;
    var nextContent = `<a onclick="FillChrononModal('${chrononKey}'); return false;" data-toggle="modal" href="#chrononModal">`;
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
  });

  var newContent = `<table class="table-responsive-md table table-primary"><thead><tr><th scope="col">Tier</th><th scope="col">Cards</th></tr></thead>`;
  newContent += `<tbody><tr><td>3</td><td>${t3}</td></tr><tr><td>2</td><td>${t2}</td></tr><tr><td>1</td><td>${t1}</td></tr></tbody></table>`;
  document.getElementById("content").innerHTML = newContent;
}

function FillChrononModal(key) {
  var imageB64 = chrononCards[key].icon;
  var chrName = chrononCards[key].name;
  var duration = chrononCards[key].duration;
  var instaEff = chrononCards[key].instant.split("||");
  var roundEff = chrononCards[key].round.split("||");
  var triggEff = chrononCards[key].trigger.split("||");

  document.getElementById("chrononModalTitle").innerHTML = chrName;
  document.getElementById("chrononModalImage").innerHTML = `<img src="data:image/png;base64,${imageB64}">`;
  document.getElementById("chrononModalDuration").innerHTML = `Duration: ${duration} Round(s).`;

  document.getElementById("chrononModalInsta").innerHTML = "<b>Instant Effect</b><br>" + CreateDesc(chrononSkills["instant"], instaEff);
  document.getElementById("chrononModalRound").innerHTML = "<b>Round Effect</b><br>" + CreateDesc(chrononSkills["round"], roundEff);
  document.getElementById("chrononModalTrigg").innerHTML = "<b>Trigger Skill</b><br>" + CreateDesc(chrononSkills["trigger"], triggEff);
}

function CreateDesc(descData, values) {
  if(values[0] == ""){
    return "";
  }
  var descContent = "<ul>";
  for(var i=0; i<values.length; i++){
    var separatedValues = values[i].split("|");
    var baseText = descData[ separatedValues[0] ];
    var formatVars = ["{0", "{1", "{2"];

    for(var j=1; j<separatedValues.length; j++){
      if(baseText.includes(formatVars[j-1])){
        var currentHeaderFormat = formatVars[j-1];
        var encodedValue = separatedValues[j];
        var decodedValue = "";

        if(baseText.includes(currentHeaderFormat + ":E}")){
          decodedValue = typingData["attr"][encodedValue];
          baseText = baseText.replace(currentHeaderFormat + ":E}", decodedValue);
        }
        else{
          if(baseText.includes(currentHeaderFormat + ":R}")){
            decodedValue = typingData["race"][encodedValue];
            baseText = baseText.replace(currentHeaderFormat + ":R}", decodedValue);
          }
          else{
            baseText = baseText.replace(currentHeaderFormat + "}", encodedValue);
          }
        }

      }
    }
    descContent += `<li>${baseText}</li>`;
  }
  descContent += "</ul>";
  return descContent;
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
    var nextContent = `<a onclick="FillStateModal(${i}); return false;" data-toggle="modal" href="#stateModal">`;
    nextContent += `<img src="data:image/png;base64,${imageB64}" class="img-fluid custom-icon-size-2"></a>&nbsp;`;
    if(stateType == 1) {
      t1 += nextContent;
    }
    if(stateType == 2) {
      t2 += nextContent;
    }
  }

  var newContent = `<table class="table-responsive-md table table-primary"><thead><tr><th scope="col">Type</th><th scope="col">States</th></tr></thead>`;
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

function ShowArticle(articleKey) {
  WriteArticleContent(articleKey);
  var buttonName = articleKey.replace(/\s+/g, "") + "Button";
  SetCurrentButtonId(buttonName);
}

function WriteArticleContent(articleKey) {
  document.getElementById("contentHeader").innerHTML = `<h1 class="text-center font-weight-bold">${articleKey}</h1>`;
  var chosenArticles = articles[articleKey];

  var newContent = `<table class="table-responsive-md table table-primary"><thead><tr><th scope="col">Type</th><th scope="col">States</th></tr></thead>`;

  for(var i=0; i<chosenArticles.length; i++) {
    var currentArticle = chosenArticles[i];
    var contentHeader = currentArticle[0];
    var isHeader = currentArticle[1];
    var contentDescription = currentArticle[2];

    if (isHeader) {
      newContent += `<h2 class="font-weight-bold">${contentHeader}</h2>`;
    }
    else {
      newContent += `<h3 class="font-weight-bold">${contentHeader}</h3><p>${contentDescription}</p>`;
    }
  }

  document.getElementById("content").innerHTML = newContent;
}

function ShowGameplayKeyword(gameplayKeywordKey) {
  WriteGameplayKeywordContent(gameplayKeywordKey);
  var buttonName = gameplayKeywordKey.replace(/\s+/g, "") + "Button";
  SetCurrentButtonId(buttonName);
}

var chosenGameplayKeywords;
function WriteGameplayKeywordContent(gameplayKeywordKey) {
  document.getElementById("contentHeader").innerHTML = `<h1 class="text-center font-weight-bold">${gameplayKeywordKey}</h1>`;
  chosenGameplayKeywords = gameplayKeywords[gameplayKeywordKey];

  var newContent = `<table class="table-responsive-md table table-primary"><thead><tr><th scope="col">Icon</th><th scope="col">Name</th><th scope="col">Description</th></tr></thead><tbody>`;

  for(var i=0; i<chosenGameplayKeywords.length; i++) {
    const currentGameplayKeyword = chosenGameplayKeywords[i];
    const imageB64 = currentGameplayKeyword[0];
    const termName = currentGameplayKeyword[1];
    const termDesc = FormatCustomImgTag(currentGameplayKeyword[2]);

    if (imageB64 != "") {
      newContent += `<tr><td><img src="data:image/png;base64,${imageB64}" class="img-fluid custom-icon-size-2"></td><td><a onclick="FillGameplayKeywordModal(${i}); return false;" data-toggle="modal" href="#gameplayKeywordModal">${termName}</a></td><td>${termDesc}</td></tr>`;
    } else {
      newContent += `<tr><td></td><td>${termName}</td><td>${termDesc}</td></tr>`;
    }
  }
  newContent += `</tbody></table>`;
  document.getElementById("content").innerHTML = newContent;
}

function FillGameplayKeywordModal(id) {
  const currentGameplayKeyword = chosenGameplayKeywords[id];
  const imageB64 = currentGameplayKeyword[0];
  const termName = currentGameplayKeyword[1];
  const termDesc = FormatCustomImgTag(currentGameplayKeyword[2]);
  const _helpImgs = currentGameplayKeyword[3];

  var carouselDiv = "";
  if (_helpImgs != "") {
    const helpImgs = _helpImgs.split("|");
    carouselDiv = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel"><div class="carousel-inner">`;
    let firstItem = true;
    for(var i=0; i<helpImgs.length; i++) {
      if (firstItem) {
        firstItem = false;
        carouselDiv += `<div class="carousel-item active"><img src="gameplayImgs/${helpImgs[i]}" class="d-block mx-auto w-75"></div>`;
      } else {
        carouselDiv += `<div class="carousel-item"><img src="gameplayImgs/${helpImgs[i]}" class="d-block mx-auto w-75"></div>`;
      }
    }
    carouselDiv += `</div><button class="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></button><button class="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></button></div>`;
  }

  document.getElementById("gameplayKeywordModalImage").innerHTML = `<img src="data:image/png;base64,${imageB64}" class="custom-icon-size-3">`;
  document.getElementById("gameplayKeywordModalTitle").innerHTML = termName;
  document.getElementById("gameplayKeywordModalCarousel").innerHTML = carouselDiv;
  document.getElementById("gameplayKeywordModalDescription").innerHTML = termDesc;
}


function WriteCollectionContent() {
  document.getElementById("collectionContentHeader").innerHTML = "<h1 class=\"text-center font-weight-bold\">Collaboration Collection Card</h1>";

  var newContent = `<table class="table-responsive-md table table-primary"><thead><tr><th scope="col">Reward</th><th scope="col">To Be Collected</th></tr></thead><tbody>`;

  for(var i=0; i<Object.keys(collection).length; i++) {
    var key = Object.keys(collection)[i];
    var chosenCollection = collection[key];
    var c1 = `<img src="${GetIconUrl(key)}" class="img-fluid custom-icon-size-2">`;
    var c2 = "";
    for(var j=0; j<chosenCollection.length; j++) {
      var collectionId = chosenCollection[j][0];
      if (collectionId == "-1") {
        c2 += `<img src="./unknown.png" class="img-fluid custom-icon-size-2">&nbsp;`;
      }
      else {
        var imgSrc = GetIconUrl(collectionId);
        var collectionDesc = chosenCollection[j][1];
        var nextContent = `<a onclick="FillCollectionModal('${imgSrc}', '${collectionDesc}'); return false;" data-toggle="modal" href="#collectionModal">`;
        nextContent += `<img src="${imgSrc}" class="img-fluid custom-icon-size-2"></a>&nbsp;`;
        c2 += nextContent;
      }
    }
    newContent += `<tr><td>${c1}</td><td>${c2}</td></tr>`;
  }

  newContent += `</tbody></table>`;
  document.getElementById("collectionContent").innerHTML = newContent;
}

function FillCollectionModal(imgSrc, desc) {
  var formattedDesc = FormatCustomImgTag(desc);
  document.getElementById("collectionModalImage").innerHTML = `<img src="${imgSrc}">`;
  document.getElementById("collectionModalDescription").innerHTML = formattedDesc;
}

WriteCollectionContent();
