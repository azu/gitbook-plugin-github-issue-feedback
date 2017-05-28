const path = require("path");
module.exports = {
    "gitbook": ">=3.0.0",
    "title": "Example",
    "plugins": [
        "github-issue-feedback"
    ],
    "pluginsConfig": {
        "github-issue-feedback": {
            "repo": "azu/gitbook-plugin-github-issue-feedback"
        }
    }
};
