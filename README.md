# JSPM@beta - htmlcomponent - riotjs Sample

This is a testproject to combine all technologies on dev and prod.<br>
<br>
For complexity it mixes up these technologies to test them together.

## Idea behind
We want to use htmlcomponent library to load independent librarys. One of these librarys
is riotjs which then loads its tags. Finally this should all be bundled up and work
with a single js file.<br>
Project itself depends on dependency management

# Installation
use ```npm install```

# Modes

## Development
You can look at index.html for a simple development setup. On reload every resource
is fetched again (script and ajax script)

## Development bundle watcher
The second mode is to execute ```npm build-watch```.<br>
Now a watcher service bundles your scriptfile to bundle.js and injects the configuration
into jspm.config.js.

## Production
The final stage is production mode where there is only a script include at the bottom.<br>
It has to be build with ```npm build-prod```.<br>
There is a index-prod.html where all development sources are gone.
