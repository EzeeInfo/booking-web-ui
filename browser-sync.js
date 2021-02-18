/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | Please report any issues you encounter:
 |  https://github.com/shakyShane/browser-sync/issues
 |
 | For up-to-date information about the options:
 |  https://github.com/shakyShane/browser-sync/wiki/Working-with-a-Config-File
 |
 */
module.exports = {

    /*
     |--------------------------------------------------------------------------
     | Files to watch
     |--------------------------------------------------------------------------
     | https://github.com/shakyShane/browser-sync/wiki/options#wiki-files
     */
    files: ["dist/css/*.css", "dist/js/*.js", "dist/**/*.html"],
    proxy: {
        target: "http://localhost:8080",
        proxyRes: [
            function(proxyRes, req, res) {
                if(url == "bus-ticketets/from/chennai/to/madurai?date=17/04/2020") {
                    res.redirect = "passengers.html";
                }
                console.log(proxyRes.headers);
            }
        ]
    },
    serveStatic: ['dist']

};