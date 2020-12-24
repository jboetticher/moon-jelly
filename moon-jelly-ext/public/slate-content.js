chrome.runtime.sendMessage({ todo: "getLocalStorage", key: "slate_module" }, function (response) {
    if (response.data === "true") {
        chrome.runtime.sendMessage({ todo: "createSlateButton" });

        if (document.getElementById('slate-moonjelly-button')) {
            console.log("there's already a slate-moonjelly-button");
        } else {

            setInterval(function () {
                if (document.getElementsByClassName("css-1mp54d2").length > 0) {
                    if (document.getElementById("slate-moonjelly-button") == null) {
                        var button = document.createElement("button");
                        button.innerHTML =
                            '<img src="https://raw.githubusercontent.com/jboetticher/moon-jelly/main/moon-jelly-ext/public/moonyjell.png" style="width:64px; height:64px;">';
                        button.style = "position:sticky; left:10px; bottom: 10px; z-index:10;"
                        button.id = "slate-moonjelly-button";
                        button.type = "button";
                        document.body.appendChild(button);

                        button.onclick = (e) => {

                            // get the name of the thing that's opened from class (css-uwdmx6)
                            // query for all of your assets in slate and figure out what this one is?
                            // put that data into the mint screen
                            // maybe take the code from the slate screen and put it into a react hook?

                            // so... get the name of the thing that's opened (css-uwdmx6)
                            // then put that data into the localstorage
                            // open up a new tab
                            // new tab checks for thing (may have to make a framework for modules)
                            chrome.runtime.sendMessage({
                                todo: "publishSlateButton",
                                keyword: document.getElementsByClassName("css-uwdmx6")[0].innerHTML
                            });
                        };
                    }
                }
                else {
                    if (document.getElementById("slate-moonjelly-button") != null) {
                        document.body.removeChild(
                            document.getElementById("slate-moonjelly-button")
                        );
                    }
                }
            }, 1000);
        }
    }
});
