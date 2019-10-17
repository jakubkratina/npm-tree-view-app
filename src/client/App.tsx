import * as React from 'react';
import Form, {IFormProps} from "./Form";
import {Package} from "../server/packages/package";
import Tree from "./Tree";

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IFormProps) {
        super(props);

        this.state = {
            pck: null,
        };
    }

    render() {
        return (
            <main className="container my-5">
                <h1 className="text-primary">NPM tree view app</h1>

                <Form onFetchHandler={(pck: Package) => this.setState({pck})}/>

                {this.state.pck && <Tree pck={this.state.pck}/>}
            </main>
        )
    }
}

export interface IAppProps {
}

export interface IAppState {
    pck?: Package;
}

export default App;
