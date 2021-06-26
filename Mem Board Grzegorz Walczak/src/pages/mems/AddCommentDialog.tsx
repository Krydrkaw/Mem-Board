import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextareaAutosize} from "@material-ui/core";

export interface AddCommentDialogProp {
    open: boolean;
    onCloseDialog: () => void;
    onAddNew: (text: string) => void;
}

export default function AddCommentDialog(prop: AddCommentDialogProp) {

    let [text, setText] = React.useState('');

    const handleClose = () => {
        prop.onCloseDialog();
    };

    const handleAdd = () => {
        setText('');
        prop.onAddNew(text);
    };

    return (
        <div>
            <Dialog fullWidth={true} open={prop.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Dodaj nowy komentarz</DialogTitle>
                <TextareaAutosize
                    style={{margin: '20px'}}
                    autoFocus
                    id="text"
                    rowsMin={3}
                    onChange={event => setText(event.target.value)}
                    value={text}
                />
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
