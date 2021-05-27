import * as core from '@actions/core';
import fs from 'fs';
import { join } from 'path';

async function run() {
    try {
        const path = core.getInput('path');
        core.debug(`Load package.json at ${path}`);
        const newVersion = updateBuildVersion(path);
        core.debug(`set output: version: ${newVersion}`);
        core.setOutput('version', newVersion);
    } catch (error) {
        core.setFailed(error.message);
    }
}

const findPackageJson = (path) => {
    return fs.readFileSync(join(path, 'package.json')).toString();
};

const updateBuildVersion = (path) => {
    const packageJson = findPackageJson(path);
    let packageContent = JSON.parse(packageJson)
    const oldVersion = packageContent.build.buildVersion;
    const newVersion = (parseInt(oldVersion) + 1).toString();
    packageContent.build.buildVersion = newVersion;
    fs.writeFileSync(path, JSON.stringify(packageContent));
    return newVersion;
};

run();