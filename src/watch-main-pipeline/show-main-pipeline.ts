import { loadSettings } from "../common/settings.ts";

const { gitlabToken, gitlabURL } = loadSettings();


// https://docs.gitlab.com/ee/api/pipelines.html#list-project-pipelines
const url = `${gitlabURL}/api/v4/projects/865/pipelines?per_page=2`

// osascript -e 'tell application "System Events" to tell every desktop to set picture to "/Users/knappmeier/tmp/pexels-chevanon-1108116.jpg" as POSIX file'
// osascript -e 'tell application "System Events" to tell every desktop to set picture to "/Users/knappmeier/Nextcloud/nils/cosee/sonstiges/cosee-background.png" as POSIX file'


