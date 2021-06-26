import React from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileBase64, {FileObject} from "../component/FileBase64";
import {MemCardInformation} from "../mems/MemsPage";
import { v4 as uuidv4 } from 'uuid';
import {Api, createNowDate} from "../../common/FakeApi";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface NewMemState {
    nazwa: string;
    podpis: string;
    src: string;
    file?: FileObject;
}

export interface AddMemProp extends RouteComponentProps<any> {
}

class AddMemPage extends React.Component<AddMemProp, NewMemState> {

    constructor(props: AddMemProp) {
        super(props);
        this.state = {file: undefined, nazwa: '', podpis: '', src: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();

        const mem: MemCardInformation = {
            id: uuidv4(),
            nazwa: this.state.nazwa,
            data: createNowDate(),
            podpis: this.state.podpis,
            base64: this.state.file?.base64 as 'string',
            komentarze: []
        };
        Api.addNewMem(mem);

        this.props.history.push("/mems");
    }


    setFilesInState(files: FileObject) {
        this.setState({file: files})
    }


    render() {

        let preview;
        if (this.state.file && typeof this.state.file.base64 === "string") {
            preview = <img className="margin-bot" src={this.state.file.base64}/>;
        } else {
            preview = <div/>
        }

        return (
            <div className="App-header add-container" style={{marginTop: "100px"}}>
                <h2>Dodawanie nowego mema</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">

                    <Form.Group>
                        <Form.Control
                            size="lg"
                            required
                            name="nazwa"
                            value={this.state.nazwa}
                            placeholder="Nazwa mema"
                            onChange={event => this.setState({nazwa: event.target.value})}
                        />
                    </Form.Group>

                    <div className="margin-bot">
                        <FileBase64 onDone={this.setFilesInState.bind(this)}/>
                    </div>

                    {preview}

                    <Form.Group style={{marginTop: "20px"}}>
                        <Form.Control
                            name="podpis"
                            value={this.state.podpis}
                            onChange={event => this.setState({podpis: event.target.value})}
                            placeholder="Podpis pod memem"
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button
                            disabled={!this.state.file}
                            variant="secondary"
                            type="submit"
                            className="login-form-button">Dodaj</Button>
                    </Form.Group>
                </Form>

            </div>
        );
    }

}

export default withRouter(AddMemPage);
