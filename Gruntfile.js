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
                    Handlebars: "Handlebars"
                },
                target: "web",
                module: {
                    loaders: [
                        {
                        test: /\.js?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            plugins: [
                                'transform-es2015-template-literals',
                                'transform-es2015-literals',
                                'transform-es2015-function-name',
                                'transform-es2015-arrow-functions',
                                'transform-es2015-block-scoped-functions',
                                ["transform-es2015-classes", { "loose": true }],
                                'transform-es2015-object-super',
                                'transform-es2015-shorthand-properties',
                                'transform-es2015-computed-properties',
                                'transform-es2015-for-of',
                                'transform-es2015-sticky-regex',
                                'transform-es2015-unicode-regex',
                                'check-es2015-constants',
                                'transform-es2015-spread',
                                'transform-es2015-parameters',
                                'transform-es2015-destructuring',
                                'transform-es2015-block-scoping',
                                'transform-es2015-typeof-symbol',
                                ['transform-regenerator', { async: false, asyncGenerators: false }],
                            ]
                        }
                    }]
                }
            },
            dev: {
                output: {
                    filename: '[name].js'
                }
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
        shell: {
            deployDocs: {
                command: 'sh ./deploy-pages.sh'
            },
            tests: {
                command: './node_modules/.bin/istanbul cover _mocha'
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
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-css-statistics');
    grunt.loadNpmTasks('grunt-md');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    // Register grunt tasks
    grunt.registerTask('default', []);

    grunt.registerTask('docs', ["jsdoc2md:plugin", "md:plugin"]);
    grunt.registerTask('report', ["postcss", "cssstats:plugin"]);

    grunt.registerTask('deployDocs', ["docs", "report"]);
    grunt.registerTask('gh-pages', ["shell:deployDocs"]);

    grunt.registerTask('dev', ["watch:plugin"]);
    grunt.registerTask('bundle', ["sass:plugin", "postcss:dev", "webpack:dev"]);
    grunt.registerTask('ship', ["sass:plugin", "postcss:prod", "webpack:prod"]);

    grunt.registerTask('tests', ["shell:tests"]);

    grunt.registerTask('full', ["tests", "bundle", "ship", "deployDocs"]);


};
