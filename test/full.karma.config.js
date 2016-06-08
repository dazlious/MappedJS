// Karma configuration
// Generated on Mon Feb 29 2016 12:23:12 GMT+0100 (CET)

module.exports = function(config) {
    "use strict";
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'fixture'],

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: 'assets/**.json',
                included: false
            },
            {
                pattern: 'assets/**.png',
                included: false
            },
            '../es5-transpiled/Point.js',
            '../es5-transpiled/LatLng.js',
            '../es5-transpiled/Helper.js',
            '../es5-transpiled/DataEnrichment.js',
            '../es5-transpiled/Drawable.js',
            '../es5-transpiled/**.js',
            'spec/**/*.test.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html', 'coverage'],

        // web server port
        port: 9999,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Firefox', 'Safari'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        htmlReporter: {
            outputFile: 'reports/index.html',
            pageTitle: 'Unit tests of plugins'
        },
        coverageReporter: {
            type : 'lcov',
            dir : 'reports/',
            subdir: 'coverage'
        }
    });
};
