const core = require('@actions/core');
const fs = require('fs');
const { join } = require('path');

async function run() {
    try {
        const path = core.getInput('path');
        core.debug(`Load package.json at ${path}`);
        const newVersion = updateBuildVersion(path);
        core.setOutput('version', newVersion);
    } catch (error) {
        core.setFailed(error.message);
    }
}

const findPackageJson = (path) => {
    return fs.readFileSync(join(path, 'package.json')).toString();
};

const writePackageJson = (path, content) => {
    return fs.writeFileSync(join(path, 'package.json'), JSON.stringify(content, null, 2));
}

const updateBuildVersion = (path) => {
    const packageJson = findPackageJson(path);
    let packageContent = JSON.parse(packageJson)
    let oldVersion;
    try {
        oldVersion = packageContent.build.buildVersion;
        const newVersion = (parseInt(oldVersion) + 1).toString();
        packageContent.build.buildVersion = newVersion;
        writePackageJson(path, packageContent);
        return newVersion;
    } catch (e) {
        throw 'Unable to find buildVersion in package.json';
    }
};

run();