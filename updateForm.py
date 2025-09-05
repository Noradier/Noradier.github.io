import re
import json
import requests

macroLink = "https://script.google.com/macros/s/AKfycbxJHaX2DZMqPaDfLWQoJuUSBLOK-lgpv2Ngszkfx_MCsXPmQiiNQoaeJKJHDxlQGzuHKA/exec"

inputKeywords = [
    ("ld","Leader ID", "required", "lbMonster", "隊長的 ID"),
    ("m2","Member 2 ID", "", "lbMonster", "左方第 2 位成員 ID"),
    ("m3","Member 3 ID", "", "lbMonster", "左方第 3 位成員 ID"),
    ("m4","Member 4 ID", "", "lbMonster", "左方第 4 位成員 ID"),
    ("m5","Member 5 ID", "", "lbMonster", "左方第 5 位成員 ID"),
    ("al","Ally ID", "required", "lbMonster", "戰友的 ID"),
    ("cf","Leader Craft ID", "", "lbCraft", "隊長的龍刻 ID"),
    ("ct","Chronon Card ID", "", "lbChronon", "時光牌 ID")
]

def minify_html(html):
    html = re.sub(r'\s+', ' ', html)
    html = re.sub(r'>\s+<', '><', html)
    html = re.sub(r'>\s+', '>', html)
    html = re.sub(r'\s+<', '<', html)
    return html.strip()

def create_form_html_script(inputKeywords):
    additionalContent = "      const idInputFields = [{}];".format(
        ",".join([
            f"\"{inputKeyword[0]}\"" for inputKeyword in inputKeywords
        ])
    )

    idx = 0
    additionalContent += "\n      const sourceMap = {\n"
    for inputKeyword  in inputKeywords:
        keyword, _, __, dataRef, ___ = inputKeyword
        additionalContent += "        %s: %s" % (keyword, dataRef)
        idx += 1
        if idx < len(inputKeywords):
            additionalContent += ",\n"
    additionalContent += "\n      };\n"
    additionalContent += """
      let alreadyFilled = false;
      document.getElementById("dataForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        
        if(alreadyFilled) {
          document.getElementById("resultMessage").textContent = "Refresh the page for more input. (Intended)";
          return;
        }

        const _stg = document.getElementById("stageId").value;
        const _uid = document.getElementById("uid").value;

        if (_stg === "") {
          document.getElementById("resultMessage").textContent = "Please select a stage.";
          return;
        }

        const payload = {
          target: "data",
          data: {
            stg: _stg,
            uid: _uid,"""
    
    idx = 0
    for inputKeyword  in inputKeywords:
        keyword, _, isRequired, __, ___ = inputKeyword
        additionalContent += """
            %s: document.getElementById("%sField").value""" % (keyword, keyword)
        if not isRequired:
            additionalContent += " || 0"
        idx += 1
        if idx < len(inputKeywords):
            additionalContent += ","
    additionalContent += """
          }
        };

        const url = "%s";

        fetch(url, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
        })
        .then(() => {
          document.getElementById("resultMessage").textContent = "Thank you, have a nice day!";
          alreadyFilled = true;
        })
        .catch(err => {
          document.getElementById("resultMessage").textContent = "Error: " + err;
        });
      });""" % macroLink
    
    return additionalContent

def create_form_html_script_for_mode_change(a, b, c):
  return """
      function setFormMode(mode) {
        const formDiv = document.getElementById("formFields");
        switch (mode) {
          case "id":
            formDiv.innerHTML = `%s`;
            idInputFields.forEach(idInputField => {
            const baseInput = document.getElementById(idInputField + "Field");
              baseInput.addEventListener("input", () => {
                const val = baseInput.value;
                const enField = document.getElementById(idInputField + "FieldEN");
                const zhField = document.getElementById(idInputField + "FieldZH");

                const dataSource = sourceMap[idInputField] || {};
                const enNewValue = dataSource[val]?.en || "";
                const zhNewValue = dataSource[val]?.zh || "";
                enField.value = enNewValue;
                zhField.value = zhNewValue;
              });
            });
            break;
          case "en":
            formDiv.innerHTML = `%s`;
            break;
          case "zh":
            formDiv.innerHTML = `%s`;
            break;
        }
      }""" % (a, b, c)

def write_id_mode_form_fields(minify=False):
    formInnerHtmlContent = ""
    for inputKeyword in inputKeywords:
        keyword, label, isRequired, _, __ = inputKeyword
        requiredSymbol = "*" if isRequired else ""
        formInnerHtmlContent += """
            <div class="form-row">
              <div class="col-4 col-md-4 mb-3">
                <label class="text-primary border-label" for="%sField">%s%s</label>
                <input type="number" class="form-control base-field" id="%sField" name="%sField" %s>
              </div>
              <div class="col-4 col-md-4 mb-3">
                <label for="%sFieldEN">Name (Display Only)</label>
                <input type="text" class="form-control text-muted" id="%sFieldEN" name="%sFieldEN" readonly>
              </div>
              <div class="col-4 col-md-4 mb-3">
                <label for="%sFieldZH">名字(僅顯示)</label>
                <input type="text" class="form-control text-muted" id="%sFieldZH" name="%sFieldZH" readonly>
              </div>
            </div>""" % (keyword, label, requiredSymbol, keyword, keyword, isRequired, keyword, keyword, keyword, keyword, keyword, keyword)
    if minify:
        return minify_html(formInnerHtmlContent)
    return formInnerHtmlContent

def write_en_mode_form_fields(minify=False):
    formInnerHtmlContent = ""
    for inputKeyword in inputKeywords:
        keyword, label, isRequired, dataRef, _ = inputKeyword
        urlFormat = ""
        if dataRef == "lbCraft": urlFormat = "craft"
        if dataRef == "lbChronon": urlFormat = "chronon"
        requiredSymbol = "*" if isRequired else ""

        formInnerHtmlContent += """
            <div class="form-row">
              <div class="col-6 col-md-6 mb-3">
                <label class="text-primary border-label" for="%sFieldEN">Name</label>
                <input type="text" class="form-control" id="%sFieldEN" name="%sFieldEN" oninput="showSuggestion('%s', %s, 'EN', '%s')">
                <div id="%sSuggestions" class="mt-2"></div>
              </div>
              <div class="col-6 col-md-6 mb-3">
                <label for="%sField">%s%s</label>
                <input type="text" class="form-control base-field text-muted" id="%sField" name="%sField" %s readonly>
              </div>
            </div>""" % (keyword, keyword, keyword, keyword, dataRef, urlFormat, keyword, keyword, label, requiredSymbol, keyword, keyword, isRequired)
    if minify:
        return minify_html(formInnerHtmlContent)
    return formInnerHtmlContent

def write_zh_mode_form_fields(minify=False):
    formInnerHtmlContent = ""
    for inputKeyword in inputKeywords:
        keyword, _, isRequired, dataRef, label = inputKeyword
        urlFormat = ""
        if dataRef == "lbCraft": urlFormat = "craft"
        if dataRef == "lbChronon": urlFormat = "chronon"
        requiredSymbol = "*" if isRequired else ""

        formInnerHtmlContent += """
            <div class="form-row">
              <div class="col-6 col-md-6 mb-3">
                <label class="text-primary border-label" for="%sFieldZH">名字</label>
                <input type="text" class="form-control" id="%sFieldZH" name="%sFieldZH" oninput="showSuggestion('%s', %s, 'ZH', '%s')">
                <div id="%sSuggestions" class="mt-2"></div>
              </div>
              <div class="col-6 col-md-6 mb-3">
                <label for="%sField">%s%s</label>
                <input type="text" class="form-control base-field text-muted" id="%sField" name="%sField" %s readonly>
              </div>
            </div>""" % (keyword, keyword, keyword, keyword, dataRef, urlFormat, keyword, keyword, label, requiredSymbol, keyword, keyword, isRequired)
    if minify:
        return minify_html(formInnerHtmlContent)
    return formInnerHtmlContent

def write_suggestion_logic():
  return """
      function showSuggestion(fieldId, dataSource, lookupMode, urlFormat) {
        const field = document.getElementById(fieldId + "Field" + lookupMode);
        const lookupLang = lookupMode.toLowerCase();
        const searchTerm = field.value.trim().toLowerCase();
        const suggestionBox = document.getElementById(fieldId + "Suggestions");
        suggestionBox.innerHTML = "";

        if (!searchTerm) return;

        const matches = Object.entries(dataSource)
          .reverse()
          .filter( ([id, fields]) => {
            const value = fields[lookupLang]?.toLowerCase() || "";
            return value.includes(searchTerm);
          })
          .slice(0, 5);

        const usedUrls = new Set();
        matches.forEach( ([id, fields]) => {
          let imgUrl;
          switch (urlFormat) {
            case "craft":
              const paddedCraftId = fields["imgId"].padStart(2, '0');
              imgUrl = `icons/runeEquipment_${paddedCraftId}.png`;
              break;
            case "chronon":
              const paddedChrononId = id.padStart(2, '0');
              imgUrl = `icons/1_${paddedChrononId}.png`;
              break
            default:
              if (parseInt(id) > 20000) {
                imgUrl = `${id}.png`;
              } else {
                const paddedId = id.padStart(4, '0');
                imgUrl = `https://d1h5mn9kk900cf.cloudfront.net/toswebsites/gallery/icons/${paddedId}.jpg`;
              }
              break
          }
          if (usedUrls.has(imgUrl)) return;
          usedUrls.add(imgUrl);

          const img = document.createElement("img");
          img.src = imgUrl;
          img.alt = fields[lookupLang];
          img.style = "width:50px;cursor:pointer;margin:5px;";
          img.onclick = () => {
            suggestionBox.innerHTML = "";
            document.getElementById(fieldId + "Field").value = id;
          };
          suggestionBox.appendChild(img);
        });
      }"""

response = requests.get(macroLink, params={
    "target": "stageList"
})

if response.status_code != 200:
    print("Cannot fetch the macro link.")
    SystemExit(1)

stageList = json.loads(response.text)
htmlContent = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="bootstrap-4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <script src="js/jquery-3.4.1.slim.min.js"></script>
    <script src="bootstrap-4.4.1/js/bootstrap.min.js"></script>
    <style>
      body {
        background-color: #121212;
        color: #e0e0e0;
      }

      .card {
        background-color: #1e1e1e;
        border: 1px solid #333;
      }

      .form-control {
        background-color: #2c2c2c;
        color: #e0e0e0;
        border: 1px solid #444;
      }

      .form-control:focus {
        background-color: #2c2c2c;
        color: #fff;
        border-color: #777;
        box-shadow: none;
      }

      .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
      }

      .btn-primary:hover {
        background-color: #0056b3;
      }

      label {
        color: #ccc;
      }

      .alert-success {
        background-color: #1c3f1c;
        color: #b6fcb6;
        border-color: #2e662e;
      }

      .alert-danger {
        background-color: #4b1c1c;
        color: #fcb6b6;
        border-color: #662e2e;
      }

      input[readonly] {
        background-color: #2c2c2c !important;
        color: #e0e0e0 !important;
        border: 1px solid #444 !important;
      }

      .border-label {
        border: 1px solid white;
        padding: 2px 4px;
        border-radius: 4px;
        display: inline-block;
      }
    </style>
    <title>Leaderboard Submission Form</title>
  </head>
  <body class="bg-dark">
    <div class="container mt-5">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="card-title mb-4">Form Data</h4>

          <form id="dataForm">
            <div class="form-group">
              <label class="text-primary border-label" for="stageId">Select the Stage</label>
              <select class="form-control" id="stageId" name="stageId" required>
                <option value="">-- Choose --</option>"""
for stage in stageList:
    if stage["closed"]:
        continue
    htmlContent += """
                <option value="%s">%s</option>""" % (stage["id"], stage["id"])
    
htmlContent += """
              </select>
            </div>

            <div class="form-group">
              <label class="text-primary border-label" for="uid">UID</label>
              <input type="text" class="form-control" id="uid" name="uid" required>
            </div>

            <label class="mb-1 d-block">Form Fill Method</label>
            <div class="btn-group mb-3" role="group" aria-label="Form fill options">
              <button type="button" class="btn btn-primary" onclick="setFormMode('id')">ID</button>
              <button type="button" class="btn btn-secondary" onclick="setFormMode('en')">Name</button>
              <button type="button" class="btn btn-info" onclick="setFormMode('zh')">名字</button>
            </div>

            <div id="formFields" name="formFields"></div>"""
htmlContent += """

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>

          <div id="resultMessage" class="mt-3"></div>
        </div>
      </div>
    </div>
    <script src="database.js"></script>
    <script>
%s
    </script>
  </body>
</html>""" % (
    create_form_html_script(inputKeywords) +
    create_form_html_script_for_mode_change(
        write_id_mode_form_fields(True),
        write_en_mode_form_fields(True),
        write_zh_mode_form_fields(True)
    ) +
    write_suggestion_logic()
)
    
filename = "form.html"
with open(filename, 'w', encoding="utf-8") as f:
    f.write(htmlContent)
print(f"Successfully writing {filename}")