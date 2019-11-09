#!/usr/bin/env node

const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const R = require('ramda');

const mainPath = path.dirname(fs.realpathSync(__filename));
const fridayPath = path.join(mainPath, './friday');

const friday = function() {
    const linuxcmd = R.join('', ['paplay ', fridayPath, '.ogg']);
    const windowscmd = R.join('', [path.join(mainPath, './forWindows.vbs'), ' ', fridayPath, '.mp3']);
    const maccmd = R.join('', ['afplay ', fridayPath, '.mp3']);

    const platform = process.platform;

    R.cond([
        [R.equals('linux'), exec(linuxcmd)],
        [R.equals('win32'), exec(windowscmd)],
        [R.equals('darwin'), exec(maccmd)],
    ], platform)

    function exec(cmd) {
        return exect(cmd, function(error) {
            R.ifElse(
                R.empty,
                () => console.log('Hoje é sexta feira dia de quebrar sistema do amiguinho e subir pra produção!'),
                (error) => console.error(error),
                error)
        });
    }
}

module.exports = friday;

if (!module.parent) {
    friday();
}