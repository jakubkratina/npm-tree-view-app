import * as React from 'react';
import {Package} from "../server/packages/package";
import Dependency from "./Dependency";

class Tree extends React.Component<ITreeProps, ITreeState> {

    constructor(props: ITreeProps) {
        super(props);

        this.state = {
            pck: props.pck,
        };
    }

    version = (name: string): string => this.props.pck.dependencies[name]

    render() {
        return (
            <ul>
                {Object.keys(this.props.pck.dependencies)
                    .map(name => <Dependency key={name} name={name} version={this.version(name)}/>)}
            </ul>
        )
    }
}

export interface ITreeProps {
    pck: Package;
}

export interface ITreeState {
    pck: Package;
}

export default Tree;
