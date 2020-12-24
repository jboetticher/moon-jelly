chrome.runtime.sendMessage({ todo: "createSlateButton" });

if (document.getElementById('aButton')) {
    alert("there's already an aButton");
} else {

    setInterval(function() {
        if(document.getElementsByClassName("css-1mp54d2").length > 0) {
            if(document.getElementById("slate-moonjelly-button") == null)
            {
                var button = document.createElement("button");
                button.innerHTML =
                    '<img src="https://raw.githubusercontent.com/jboetticher/moon-jelly/main/moon-jelly-ext/public/moonyjell.png" style="width:64px; height:64px;">';
                button.style = "position:sticky; left:10px; bottom: 10px; z-index:10;"
                button.id = "slate-moonjelly-button";
                button.type = "button";
                document.body.appendChild(button);
            
                button.onclick = (e) => {
                    alert("you clicked");
                };
            }
        }
        else {
            document.body.removeChild(
                document.getElementById("slate-moonjelly-button")
            );
        }
    }, 1000);


    //alert("button created");
}