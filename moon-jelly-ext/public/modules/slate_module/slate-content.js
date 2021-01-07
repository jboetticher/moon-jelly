if (localStorage.getItem("slate_module") === "true") {
    chrome.runtime.sendMessage({ todo: "getLocalStorage", key: "slate_module" }, function (response) {
        if (response.data === "true") {
            chrome.runtime.sendMessage({ todo: "createSlateButton" });

            if (document.getElementById('slate-moonjelly-button')) {
                console.log("there's already a slate-moonjelly-button");
            } else {

                setInterval(function () {

                    // these may change with subsequent updates
                    const HOME_PAGE_NAME_CLASS = "css-uwdmx6";
                    const HOME_PAGE_BUTTON_CONTAINER_CLASS = "css-16afiq5";
                    const SLATE_PAGE_NAME_CLASS = "css-rgz80s";
                    const SLATE_PAGE_BUTTON_CONTAINER_CLASS = "css-6levnj";
                    const BUTTON_CLASS = "css-4egf2v";

                    if (document.getElementsByClassName("css-1mp54d2").length > 0) {
                        if (document.getElementById("slate-moonjelly-button") == null) {

                            // gets the right class to add button under
                            let useHomePage = true;
                            let buttonContainer = document.getElementsByClassName(HOME_PAGE_BUTTON_CONTAINER_CLASS)[0];
                            if (buttonContainer === undefined) {
                                buttonContainer = document.getElementsByClassName(SLATE_PAGE_BUTTON_CONTAINER_CLASS)[0];
                                useHomePage = false;
                            }

                            // makes the right button
                            var button = document.createElement("div");
                            button.className = BUTTON_CLASS;
                            button.innerHTML =
                                `<img src="https://raw.githubusercontent.com/jboetticher/moon-jelly/main/moon-jelly-ext/public/moonyjell.png" style="width:24px; height:24px;">
                                 <span style="margin-left: 16px;">Publish to Ocean</span>`;
                            //button.style = ""
                            button.id = "slate-moonjelly-button";
                            button.type = "button";
                            buttonContainer.appendChild(button);

                            button.onclick = (e) => {
                                // What the Process is Doing:
                                // get the name of the thing that's opened from class (css-uwdmx6 & css-rgz80s)
                                // query for all of your assets in slate and figure out what this one is?
                                // put that data into the mint screen
                                // maybe take the code from the slate screen and put it into a react hook?

                                // so... get the name of the thing that's opened (css-uwdmx6 & css-rgz80s)
                                // then put that data into the localstorage
                                // open up a new tab
                                // new tab checks for thing (may have to make a framework for modules)


                                // looks for the right element
                                let correctName = "";
                                if (useHomePage) correctName = document.getElementsByClassName(HOME_PAGE_NAME_CLASS)[0].innerHTML;
                                else correctName = document.getElementsByClassName(SLATE_PAGE_NAME_CLASS)[0].value;

                                chrome.runtime.sendMessage({
                                    todo: "publishSlateButton",
                                    keyword: correctName
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
}

