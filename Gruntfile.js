module.exports = function(grunt) {
    "use strict";

    var webpack = require('webpack');

    grunt.initConfig({
        banner: '/*! <%= pkg.name %> - v.<%= pkg.version %>, <%= grunt.template.today("yyyymmdd-HHMMss") %>  */\n',
        pkg: grunt.file.readJSON('package.json'),
        jsdoc2md: {
            plugin: {
                options: {
                    "param-list-format": "list",
                    "property-list-format": "list"
                },
                src: 'plugin/src/js/**.js',
                dest: 'docs/src/plugin.md'
            }
        },
        plato: {
            options: {
                jshint: grunt.file.readJSON('.jshintrc')
            },
            plugin: {
                files: {
                    'reports/plugin/js': "es5-transpiled/**.js"
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
                    'reports/plugin/css': ['plugin/dist/styles/**.css', '!plugin/dist/styles/**.min.css']
                }
            }
        },
        md: {
            options: {
                wrapper: 'docs/template.html'
            },
            plugin: {
                src: 'docs/src/**.md',
                dest: 'docs/index.html'
            }
        },
        postcss: {
            dev: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            browsers: ["Firefox ESR", "Opera 12", "ff >= 10", "ios >= 5", "ie > 8"]
                        })
                    ]
                },
                src: 'plugin/dist/styles/mappedJS.css',
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
                src: 'plugin/dist/styles/mappedJS.css',
                dest: 'plugin/dist/styles/mappedJS.min.css'
            }
        },
        webpack: {
            options: {
                entry: {
                    mappedJS: __dirname + '/plugin/src/js/Main.js'
                },
                output: {
                    path: 'plugin/dist/js/',
                    filename: '[name].js',
                    libraryTarget: "umd",
                    library: ["de"]
                },
                devtool: "cheap-module-source-map",
                stats: {
                    colors: true,
                    modules: true,
                    reasons: true
                },
                progress: false,
                failOnError: false,
                watch: false,
                keepalive: false,
                inline: true,
                externals: {
                    jquery: "jQuery"
                },
                target: "web",
                module: {
                    loaders: [{
                        test: /\.js?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015']
                        }
                    }]
                }
            },
            dev: {

            },
            prod: {
                output: {
                    filename: '[name].min.js'
                },
                plugins: [
                    new webpack.optimize.UglifyJsPlugin()
                ]
            }
        },
        babel: {
            options: {
                presets: ['es2015'],
                plugins: ["transform-es2015-modules-umd"]
            },
            plugin: {
                files: [{
                    expand: true,
                    cwd: 'plugin/src/js/',
                    src: ['**.js'],
                    dest: 'es5-transpiled'
                }]
            }
        },
        jsbeautifier: {
            files: ["es5-transpiled/**.js"],
            options: {
                jslint_happy: true,
                break_chained_methods: true
            }
        },
        shell: {
            deployDocs: {
                command: 'sh ./deploy-pages.sh'
            }
        },
        watch: {
            plugin: {
                files: ['plugin/src/**/*.js', 'plugin/src/**/*.scss'],
                tasks: ['bundle']
            }
        },
        sass: {
            options: {
                sourceMap: true,
                indentType: "tab",
                indentWidth: 1
            },
            plugin: {
                options: {
                    sourceComments: true,
                    outputStyle: "expanded"
                },
                files: {
                    "plugin/dist/styles/mappedJS.css": "plugin/src/styles/mappedJS.scss"
                }
            }
        },
        karma: {
            chrome: {
                configFile: 'test/chrome.karma.config.js'
            },
            full: {
                configFile: 'test/full.karma.config.js'
            }
        },
        jsinspect: {
            plugin: {
                options: {
                    threshold: 30,
                    diff: true,
                    identifiers: false,
                    failOnMatch: true,
                    suppress: 100,
                    outputPath: "reports/inspect.json",
                    reporter: 'json'
                },
                src: [
                    'es5-transpiled/**/*.js',
                    '!**/node_modules/**'
                ]
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-css-statistics');
    grunt.loadNpmTasks('grunt-md');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsinspect');

    // Register grunt tasks
    grunt.registerTask('default', []);

    grunt.registerTask("transpile", ["babel:plugin", "jsbeautifier"]);
    grunt.registerTask('docs', ["jsdoc2md:plugin", "md:plugin"]);
    grunt.registerTask('report', ["plato:plugin", "postcss", "cssstats:plugin"]);

    grunt.registerTask('deployDocs', ["transpile", "docs", "report"]);
    grunt.registerTask('gh-pages', ["shell:deployDocs"]);

    grunt.registerTask('dev', ["watch:plugin"]);
    grunt.registerTask('bundle', ["sass:plugin", "postcss:dev", "webpack:dev"]);
    grunt.registerTask('ship', ["sass:plugin", "postcss:prod", "webpack:prod"]);

    grunt.registerTask('tests', ["transpile", "karma:chrome"]);
    grunt.registerTask('testsFull', ["transpile", "karma:full"]);

    grunt.registerTask('full', ["testsFull", "bundle", "ship", "deployDocs"]);


};
