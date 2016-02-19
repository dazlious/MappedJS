module.exports = function(grunt) {

    grunt.initConfig({
        banner: '/*! <%= pkg.name %> - v.<%= pkg.version %>, <%= grunt.template.today("yyyymmdd-HHMMss") %>  */\n',
        pkg: grunt.file.readJSON('package.json'),
        jsdoc2md: {
            plugin: {
                options: {
                    "param-list-format": "list",
                    "property-list-format": "list"
                },
                src: 'plugin/src/**/*.js',
                dest: 'docs/plugin.md'
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown')

    // Register grunt tasks
    grunt.registerTask('default', []);
    grunt.registerTask('docs', ["jsdoc2md:plugin"]);

};
