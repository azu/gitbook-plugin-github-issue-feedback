const path = require("path");
module.exports = {
    "gitbook": ">=3.0.0",
    "title": "Example",
    "plugins": [
        "github-issue-feedback"
    ],
    "pluginsConfig": {
        "github-issue-feedback": {
            "newIssueURL": "https://github.com/asciidwango/js-primer/issues/new",
            "markdownBaseURL": "https://github.com/asciidwango/js-primer/contents",
            "githubAPIBaseURL": "https://api.github.com/repos/asciidwango/js-primer/blob/master/"
        }
    }
};
