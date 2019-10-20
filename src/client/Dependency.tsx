import * as React from 'react';
import {Package} from "../server/packages/package";
import Tree from "./Tree";

class Dependency extends React.Component<IDependencyProps, IDependencyState> {

    constructor(props: IDependencyProps) {
        super(props);

        this.state = {
            name: props.name,
            version: props.version,
            loading: true
        };

        this.fetchPackageInfo(props.name, props.version);
    }

    fetchPackageInfo = async (name: string, version: string) => {
        let response = await fetch(`/api/packages/${name}/${version}`);

        const pck = await response.json();

        if (pck) {
            this.setState({package: pck});
        }

        this.setState({loading: false});
    };

    render() {

        return (
            <>
                <li>
                    {this.state.name}: {this.state.version}

                    {this.state.loading && (<em>&nbsp;(loading...)</em>)}

                    {this.state.package && this.state.package.dependencies && (
                        <Tree pck={this.state.package} />
                    )}
                </li>
            </>
        )
    }
}

export interface IDependencyProps {
    name: string;
    version: string;
}

export interface IDependencyState {
    name: string;
    version: string;
    package?: Package;
    loading: boolean;
}

export default Dependency;
