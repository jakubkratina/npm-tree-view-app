import {Package} from "./package";

/**
 * In a production app, let's image here a redis or mongo storage.
 * The idea is that you'll save a package's name and version pair.
 * Once you ask for the package & version, it'll check in the persistent storage
 * and if a package exists, return.
 *
 * Otherwise, it'll download the latest version of the package and save to the storage.
 */
export interface Storage {
    [name: string]: {
        [version: string]: Package
    }
}

const storage: Storage = {};

const hasPackage = (pck: string): boolean => storage.hasOwnProperty(pck);

const hasVersion = (pck: string, version: string) => storage[pck].hasOwnProperty(version);

export const add = (pck: Package): Storage => {
    return {
        ...storage, ...{
            [pck.name]: {
                [pck.version]: {
                    'name': pck.name,
                    'description': pck.description,
                    'version': pck.version,
                    'dependencies': pck.dependencies
                }
            }
        }
    };
};

export const get = (pck: string, version: string): Package => {
    if (!hasPackage(pck) || !hasVersion(pck, version)) {
        return null;
    }

    return storage[pck][version];
};

export const getLatest = (pck: string, version?: string): Package => {
    if (!hasPackage(pck)) {
        return null;
    }

    if (version) {
        return storage[pck][version];
    }

    return storage[pck][Object.keys(storage[pck])[0]];
};
