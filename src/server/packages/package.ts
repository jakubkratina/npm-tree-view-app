export interface Package {
    name: string;
    description: string;
    version: string;
    dependencies: {
        [name: string]: string
    }
}
