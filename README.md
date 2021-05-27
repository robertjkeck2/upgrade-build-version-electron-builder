# Bump buildVersion in package.json for electron-builder

This action increases the current `buildVersion` in the `package.json` of an Electron project using `electron-builder`.

## Inputs

### `path`

**Required** The path where the `package.json` is located. Default `"./"`.

## Outputs

### `version`

The new `buildVersion` for the current bundle.

## Example usage

uses: robertjkeck2/upgrade-build-version-electron-builder
with:
  path: './'