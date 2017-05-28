var BugReporter = require("./BugReporter");
var findAllPositions = require("position-map-text-to-markdown").findAllPositions;
var path = require("path");

function quoteText(text) {
    return text.split("\n").map(function(line) {
        return "> " + line;
    }).join("\n");
}

function getContentAsync(filePath) {
    // https://github.com/jser/jser.info/edit/gh-pages/data/2015/08/index.json
    // => https://api.github.com/repos/jser/jser.info/contents/data/2015/08/index.json
    var apiPath = filePath.replace("github.com/", "api.github.com/repos/");
    return fetch(apiPath).then(function(response) {
        return response.json();
    }).then(function(response) {
        return decodeURIComponent(escape(atob(response.content)));
    });
}
window.require(["gitbook"], function(gitbook) {
    // plugin config
    gitbook.events.bind("start", function(e, pluginConfig) {
        var config = pluginConfig["github-issue-feedback"];
        var reportElement = document.createElement("button");
        reportElement.textContent = "BugReport";
        reportElement.setAttribute("style", "position:fixed; right:0;bottom:0;");
        var clickEvent = ("ontouchstart" in window) ? "touchend" : "click";
        reportElement.addEventListener(clickEvent, function(event) {
            var resourcePath = path.join(config["markdownBaseURL"], gitbook.state.filepath);
            getContentAsync(resourcePath).then(function(markdown) {
                var bug = new BugReporter(config["newIssueURL"]);
                var selectedText = bug.getSelectedText().trim();
                let body = 'URL : ' + resourcePath + "\n\n";
                if (selectedText && selectedText.length > 0) {
                    var matches = findAllPositions({
                        text: selectedText,
                        markdown: markdown
                    });
                    matches.forEach(function(match) {
                        body += quoteText(match.markdown) + "\n";
                        body += resourcePath + "#L" + match.loc.start.line + "\n";
                    });
                }
                bug.setBody(body);
                bug.report();
            });
        });
        document.body.appendChild(reportElement);
    });

});