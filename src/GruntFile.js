'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var filesToLint = [
        'Gruntfile.js',
        'app/server.js'
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
        watch: {
            test: {
                files: filesToLint,
                tasks: ['jshint:human']
            }
        }
    });

    grunt.registerTask('build', [
        'jshint:human'
    ]);

    grunt.registerTask('default', 'build');
};