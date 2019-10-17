import {Package} from './package';
import * as Storage from './storage';

const axios = require('axios');
const registry = process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org'; // ideally in a config, not sure about a solution

export const fetch = async (name: string) => {
    let pck = Storage.getLatest(name);

    if (!pck) {
        pck = await fetchPackageInformation(name);

        Storage.add(pck);
    }

    return pck;
};

const buildRegistryUrl = (name: string) => `${registry}/${name}/latest`;

const fetchPackageInformation = async (name: string): Promise<Package> => {
    const response = await axios.get(buildRegistryUrl(name));

    return response.data;
};
