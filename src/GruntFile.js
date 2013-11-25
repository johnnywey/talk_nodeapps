'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var filesToLint = [
        'Gruntfile.js',
        'app/server.js',
        'test/{,*/}*.js'
    ];

    grunt.initConfig({
        jshint: {
            human: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: {
                    src: filesToLint
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'should',
                    growl: true
                },
                src: ['test/**/*.js']
            },
            // exists to output tests in for CI
            xunit: {
                options: {
                    reporter: 'xunit-file',
                    require: 'should'
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            test: {
                files: filesToLint,
                tasks: ['mochaTest:test', 'jshint:human']
            }
        }
    });

    grunt.registerTask('test', 'mochaTest:test');

    grunt.registerTask('build', [
        'jshint:human'
    ]);

    grunt.registerTask('default', 'build');
};