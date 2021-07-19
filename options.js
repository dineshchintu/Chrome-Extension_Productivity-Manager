function save_options() {
    let listItem = document.getElementById("itemListSelect");
    let urls = [];
    for (let i = 0; i < listItem.length; i++) {
        urls.push(listItem[i].text);
    }
    chrome.storage.local.set({
        'urls': urls
    }, function() {});
}
function restore_options() {
    chrome.storage.local.get('urls', function(result) {
        if (result.urls != null) {
            let listItem = document.getElementById("itemListSelect");
            for (let i = 0; i < result.urls.length; i++) {
                let item = document.createElement("option");
                item.text = result.urls[i];
                listItem.add(item);
            }
        }
    });
}
function addItem() {
    let listItem = document.getElementById("itemListSelect");
    let strRegEx = document.getElementById("urlInput")
        .value;
    if (strRegEx.trim() != "") {
        try {
            new RegExp(strRegEx);
        } catch (ex) {
            alert(ex.message);
            return;
        }
        let item = document.createElement("option");
        item.text = strRegEx;
        listItem.add(item);
    }
    document.getElementById("urlInput")
        .value = "";
    document.getElementById("urlInput")
        .focus();
    dblSelIndex = -1;
    save_options();
    clearSelection();
}
function removeItem() {
    let listItem = document.getElementById("itemListSelect");
    let selIndex = listItem.selectedIndex;
    listItem.remove(selIndex);
    if (listItem.length > selIndex) listItem.selectedIndex = selIndex;
    else listItem.selectedIndex = listItem.length - 1;
    save_options();
    clearSelection();
    listItem.selectedIndex = selIndex > 0 ? --selIndex : 0;
}
function changeItem(event) {
    if (event.keyCode === 13) {
        let list = document.getElementById('itemListSelect');
        //let selIndex = list.selectedIndex;
        let selIndex = dblSelIndex;
        if (selIndex === -1) {
            addItem();
            return;
        } else {
            let regExInput = document.getElementById("urlInput");
            let strRegEx = regExInput.value;
            try {
                new RegExp(strRegEx);
            } catch (ex) {
                alert(ex.message);
                return;
            }
            list.options[selIndex].text = strRegEx;
            clearSelection();
            save_options();
        }
    }
    testRegEx();
}
function onItemSelected() {
    let listItem = document.getElementById("itemListSelect");
    let urlInput = document.getElementById("urlInput");
    urlInput.value = listItem.value;
    dblSelIndex = listItem.selectedIndex;
    urlInput.focus();
}
function onClick() {
    let list = document.getElementById("itemListSelect");
    let selIndex = list.selectedIndex;
    clearSelection();
    list.selectedIndex = selIndex;
}
function clearSelection() {
    if (dblSelIndex === -1) {
        return;
    }
    let urlInput = document.getElementById("urlInput");
    let list = document.getElementById("itemListSelect");
    urlInput.value = "";
    list.selectedIndex = -1;
    dblSelIndex = -1;
}
function testRegEx() {
    let strRegEx = document.getElementById("urlInput")
        .value;
    let url = document.getElementById("testURLInput")
        .value;
    let result = document.getElementById("result");
    strRegEx.trim();
    url.trim();
    try {
        var regex = new RegExp(strRegEx);
    } catch (ex) {
        result.innerHTML = ex.message;
        result.style.color = "red";
        return;
    }
    var res = url.match(regex);
    if (strRegEx !== "" && res != null && res[0] != null) {
        result.innerHTML = "blocked";
        result.style.color = "green";
    } else {
        result.innerHTML = "not blocked";
        result.style.color = "red";
    }
}
var dblSelIndex = -1;
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('addButton')
    .addEventListener('click', addItem);
document.getElementById('removeButton')
    .addEventListener('click', removeItem);
document.getElementById('itemListSelect')
    .addEventListener('dblclick', onItemSelected);
document.getElementById('itemListSelect')
    .addEventListener('click', onClick);
document.getElementById("urlInput")
    .addEventListener('keyup', changeItem);
document.getElementById("testURLInput")
    .addEventListener('keyup', testRegEx);
document.getElementById("urlInput")
    .focus();
