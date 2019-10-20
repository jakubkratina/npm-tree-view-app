import * as React from 'react';

class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);

        this.state = {
            name: null,
            error: null,
            loading: false
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = (e: any) => {
        e.preventDefault();

        this.setState({loading: true});

        const data = new FormData(e.target);

        if (!data.get('package')) {
            this.setState({error: 'Please choose a package username.'});

            return;
        }

        this.setState({error: null});

        this.fetchPackageInfo(data.get('package').toString());
    };

    fetchPackageInfo = async (name: string) => {
        try {
            let response = await fetch(`/api/packages/${name}`);

            const pck = await response.json();

            if (response.status === 200) {
                this.props.onFetchHandler(pck);

            } else {
                this.setState({error: 'The package has not been found.'});
            }
        } catch (error) {
            this.setState({error: error});
        }

        this.setState({loading: false});
    };

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="package">Package name</label>
                    <input type="name" className="form-control" id="package" name="package"/>

                    {this.state.error && <div className="invalid-feedback">
                        {this.state.error}
                    </div>}
                </div>

                <button type="submit" className={`btn btn-primary${this.state.loading ? ' disabled' : ''}`}>Submit</button>
            </form>
        )
    }
}

export interface IFormProps {
    onFetchHandler: Function;
}

export interface IFormState {
    name: string;
    error?: string;
    loading: boolean;
}

export default Form;
