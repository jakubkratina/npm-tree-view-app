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

                {this.state.pck && (
                    <ul>
                        <li>
                            {this.state.pck.name}: {this.state.pck.version}

                            {this.state.pck.dependencies && <Tree pck={this.state.pck} />}
                        </li>
                    </ul>
                )}
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
