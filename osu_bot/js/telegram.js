﻿var webApp = window.Telegram.WebApp;
var mainButton = webApp.MainButton;
var backButton = webApp.BackButton;

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

mainButton.onClick(function () {
    var elements = document.getElementsByTagName("*");
    var jsonData = {}

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.tagName == "INPUT") {
            if (element.type == "checkbox" || element.type == "radio") {
                jsonData[element.id] = element.checked;
            }
            else if (element.type == "range") {
                jsonData[element.id] = element.value;
            }
        }
        else if (element.tagName == "SELECT") {
            jsonData[element.id] = element.value;
        }
    }
    jsonData["id"] = id;

    webApp.sendData(jsonData);
});

backButton.onClick(function () {
    webApp.sendData("Cancel id:" + id);
});

mainButton.setText("Сохранить");
backButton.setText("Отменить");

mainButton.show();
backButton.show();

webApp.ready();