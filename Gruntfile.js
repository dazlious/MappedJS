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
                    'reports/plugin/js': "reports/plugin/js/src/**.js"
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
                presets: ['es2015']
            },
            plugin: {
                files: [{
                    expand: true,
                    cwd: 'plugin/src/js/',
                    src: ['**.js'],
                    dest: 'reports/plugin/js/src'
                }]
            }
        },
        jsbeautifier: {
            files: ["reports/plugin/js/src/**.js"],
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


    // Register grunt tasks
    grunt.registerTask('default', []);

    grunt.registerTask('docs', ["jsdoc2md:plugin", "md:plugin"]);
    grunt.registerTask('report', ["babel:plugin", "jsbeautifier", "plato:plugin", "postcss", "cssstats:plugin"]);

    grunt.registerTask('deployDocs', ["docs", "report"]);
    grunt.registerTask('gh-pages', ["shell:deployDocs"]);

    grunt.registerTask('dev', ["watch:plugin"]);
    grunt.registerTask('bundle', ["webpack:dev", "postcss:dev"]);
    grunt.registerTask('ship', ["webpack:prod", "postcss:prod"]);
};
