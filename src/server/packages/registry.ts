import {Package} from './package';
import * as Storage from './storage';

const axios = require('axios');
const registry = process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org'; // ideally in a config, not sure about a solution

export const fetch = async (name: string, version?: string) => {
    let pck = Storage.getLatest(name, version);

    if (!pck) {
        pck = await fetchPackageInformation(name, version);

        Storage.add(pck);
    }

    return pck;
};

const buildRegistryUrl = (name: string, version: string = 'latest') => `${registry}/${name}/${normalizeVersion(version)}`;

const normalizeVersion = (version: string) => version.replace('~', '');

const fetchPackageInformation = async (name: string, version?: string): Promise<Package> => {
    const response = await axios.get(buildRegistryUrl(name, version || 'latest'));

    return response.data;
};
