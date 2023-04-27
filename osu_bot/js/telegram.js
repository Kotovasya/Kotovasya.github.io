const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

for (const [key, value] of urlParams.entries()) {
    var element = document.getElementById(key);
    if (element != null) {
        if (element.type == "checkbox" || element.type == "radio") {
            element.checked = value;
        }
        else {
            element.value = value;
            if (element.type == "range") {
                var label = element.nextElementSibling;
                label.innerHTML = value;
            }
        }
    }
}

function save() {
    var elements = document.getElementsByTagName("*");
    var jsonData = {}

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.tagName == "INPUT") {
            if (element.type == "checkbox" || element.type == "radio") {
                jsonData[element.id] = element.checked;
            }
            else {
                jsonData[element.id] = element.value;
            }
        }
        else if (element.tagName == "SELECT") {
            jsonData[element.id] = element.value;
        }
    }
    jsonData["appName"] = "ReplaySettings";
    jsonData["id"] = id;

    var result = JSON.stringify(jsonData);
    Telegram.WebApp.sendData(result);
};

function cancel() {
    Telegram.WebApp.sendData("Cancel id:" + id);
};

var mainForm = document.getElementById("mainForm");

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    save();
  });

Telegram.WebApp.ready();