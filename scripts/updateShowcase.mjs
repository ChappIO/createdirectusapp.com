#!/usr/bin/env node
import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';

function getTitle(packageName) {
    let result = packageName;
    if (result.startsWith('directus-extension-')) {
        result = result.substring('directus-extension-'.length);
    }
    result = result
        .split('-')
        .map(part => part[0].toUpperCase() + part.substring(1))
        .join(' ');
    return result;
}

function updateShowcase(packageName, readmeUrl) {
    const title = getTitle(packageName);
    fetch(readmeUrl)
        .then(response => {
            if (response.ok) {
                return response.text()
            } else {
                throw new Error(response.status + ': ' + response.text());
            }
        })
        .then(readme => {
            return writeFile(
                join('content', 'extension-showcase', packageName + '.md'),
                `+++
menuTitle = "${title}"
+++
` + readme
            );
        });
}

updateShowcase('directus-extension-models', 'https://raw.githubusercontent.com/ChappIO/directus-extension-models/main/README.md');
updateShowcase('directus-extension-prometheus', 'https://raw.githubusercontent.com/ChappIO/directus-extension-prometheus/main/README.md');
