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
        clean: {
            coverage: {
                src: ['coverage/']
            }
        },
        copy: {
            test: {
                src: ['test/**'],
                dest: 'coverage/'
            }
        },
        blanket: {
            tasks: {
                src: ['app/'],
                dest: 'coverage/app/'
            }
        },
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
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    require: 'should',
                    // use the quiet flag to suppress the mocha console output
                    quiet: true,
                    captureFile: 'coverage.html'
                },
                src: ['coverage/test/**/*.js']
            },
            travis: {
                options: {
                    reporter: 'travis-cov'
                },
                src: ['coverage/test/**/*.js']
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

    grunt.registerTask('cover', [
        'clean',
        'copy',
        'blanket',
        'mochaTest:coverage',
        'mochaTest:travis'
    ]);

    grunt.registerTask('default', 'build');
};