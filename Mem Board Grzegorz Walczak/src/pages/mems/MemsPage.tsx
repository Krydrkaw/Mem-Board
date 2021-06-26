import React from "react";
import {List, ListItem} from "@material-ui/core";
import MemCard from "./MemCard";
import {Api} from "../../common/FakeApi";
import AddCommentDialog from "./AddCommentDialog";
import {Col, Row} from "react-bootstrap";

export interface MemBoardProp {
    isAuthenticated: boolean;
}

export interface MemBoardState {
    isOpen: boolean;
    mem?: MemCardInformation;
}

export interface MemCardInformation {
    id: string;
    nazwa: string;
    data: string;
    podpis: string;
    base64?: string;
    komentarze: string[];
}

export default class MemsPage extends React.Component<MemBoardProp, MemBoardState> {

    private mems: MemCardInformation[] = [];

    constructor(props: MemBoardProp) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.mems = Api.getAllMems();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddCommment = this.handleAddCommment.bind(this);
        this.handleAddNewComment = this.handleAddNewComment.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    componentDidMount() {
        this.mems = Api.getAllMems();
    }

    handleDelete() {
        this.mems = Api.getAllMems();
        this.forceUpdate();
    }

    handleCloseDialog() {
        this.setState({isOpen: false})
    }

    handleAddCommment(mem: MemCardInformation) {
        this.setState({isOpen: true, mem})
    }

    handleAddNewComment(text: string) {
        if (text && this.state.mem?.id) {
            Api.addNewComment(this.state.mem.id, text);

            this.setState({isOpen: false})

            this.mems = Api.getAllMems();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <Row>
                <Col/>
                <Col>
                    <Row>
                        <List style={{marginTop: "80px"}}>
                            {this.mems.map((mem, i) =>
                                <ListItem style={{marginTop: "50px", justifyContent: 'center'}} key={i}>
                                    <MemCard mem={mem}
                                             onDelete={this.handleDelete}
                                             onAddComment={memInfo => this.handleAddCommment(memInfo)}
                                             isAuthenticated={this.props.isAuthenticated}/>
                                </ListItem>
                            )}
                        </List>

                        <AddCommentDialog
                            onCloseDialog={this.handleCloseDialog}
                            onAddNew={text => this.handleAddNewComment(text)}
                            open={this.state.isOpen}/>

                    </Row>
                </Col>
                <Col/>
            </Row>
        );
    }

}
