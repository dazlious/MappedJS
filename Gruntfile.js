module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        banner: '/*! <%= pkg.name %> - v.<%= pkg.version %>, <%= grunt.template.today("yyyymmdd-HHMMss") %>  */\n',
        pkg: grunt.file.readJSON('package.json'),
        jsdoc2md: {
            plugin: {
                options: {
                    "param-list-format": "list",
                    "property-list-format": "list"
                },
                src: 'plugin/src/js/**/*.js',
                dest: 'docs/src/plugin.md'
            }
        },
        plato: {
            options: {
                jshint: grunt.file.readJSON('.jshintrc')
            },
            plugin: {
                files: {
                    'reports/plugin/js': ['plugin/src/js/**/*.js']
                }
            }
        },
        cssstats: {
            options: {
                jsonOutput: true,
                htmlOutput: true,
                addHtmlStyles: true,
                addGraphs: true
            },
            plugin: {
                files: {
                    'reports/plugin/css': ['plugin/dist/styles/**.css']
                }
            }
        },
        sass: {
            options: {
                sourcemap: 'none'
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    'plugin/dist/styles/mappedJS.css': 'plugin/src/styles/**/*.scss'
                }
            }
        },
        markdown: {
            all: {
                files: {
                    'docs/index.html': 'docs/src/**.md'
                }
            }
        },
        postcss: {
            options: {
                syntax: require('postcss-scss')
            },
            dev: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            browsers: ["Firefox ESR", "Opera 12", "ff >= 10", "ios >= 5", "ie > 8"]
                        })
                    ]
                },
                src: 'plugin/src/styles/mappedJS.scss',
                dest: 'plugin/dist/styles/mappedJS.css'
            },
            prod: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            browsers: ["Firefox ESR", "Opera 12", "ff >= 10", "ios >= 5", "ie > 8"]
                        }),
                        require('cssnano')()
                    ]
                },
                src: 'plugin/src/styles/mappedJS.scss',
                dest: 'plugin/dist/styles/mappedJS.min.css'
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-css-statistics');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-postcss');


    // Register grunt tasks
    grunt.registerTask('default', []);
    grunt.registerTask('docs', ["jsdoc2md:plugin"]);
    grunt.registerTask('report', ["plato:plugin"]);
    grunt.registerTask('stats', ["cssstats:plugin"]);
    grunt.registerTask('css', ["postcss:dev"]);

};
