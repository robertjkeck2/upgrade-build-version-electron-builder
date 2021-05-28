const core = require('@actions/core');
const fs = require('fs');
const { join } = require('path');

async function run() {
    try {
        const path = core.getInput('path');
        const descriptor = core.getInput('descriptor');
        core.debug(`Load package.json at ${path}`);
        const newVersion = updateBuildVersion(path, descriptor);
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

const updateBuildVersion = (path, descriptor) => {
    const packageJson = findPackageJson(path);
    let packageContent = JSON.parse(packageJson)
    try {
        const oldVersion = packageContent.build.buildVersion;
        let oldVersionNumber = oldVersion.split('-')[1];
        if (!oldVersionNumber) {
            oldVersionNumber = oldVersion;
        }
        const newVersionNumber = (parseInt(oldVersionNumber) + 1).toString();
        let newVersion = newVersionNumber;
        if (descriptor.length > 0) {
            newVersion = descriptor + '-' + newVersionNumber;
        }
        packageContent.build.buildVersion = newVersion;
        writePackageJson(path, packageContent);
        return newVersion;
    } catch (e) {
        throw 'Unable to find buildVersion in package.json';
    }
};

run();