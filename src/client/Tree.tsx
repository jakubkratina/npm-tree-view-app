import * as React from 'react';
import {Package} from "../server/packages/package";

class Tree extends React.Component<ITreeProps, ITreeState> {

    constructor(props: ITreeProps) {
        super(props);

        this.state = {
            pck: props.pck,
        };

    }

    render() {
        return (
            <>
                <h2>{this.state.pck.name}</h2>
                <em>{this.state.pck.version}</em>

                <ul>
                    {Object.keys(this.props.pck.dependencies).map((name: string) => {
                        return (<li key={name}>{name}: {this.props.pck.dependencies[name]}</li>)
                    })}

                    {/*
                    The tree part here instead of the <li>.
                     <Package pck={...}>, inside each dependency a fetch
                     part to fetch dependencies etc. recursively
                */}
                </ul>
            </>
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
