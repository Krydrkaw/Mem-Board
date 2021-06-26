import React from 'react';

export interface FileBase64Prop {
    onDone: (f: FileObject) => void;
}

export interface FileObject {
    name: string;
    type: string;
    size: string;
    base64: string | ArrayBuffer | null;
    file: any;
}

export default class FileBase64 extends React.Component<FileBase64Prop, any> {

    handleChange(e: { target: { files: any; }; }) {
        let files = e.target.files;
        let allFiles: FileObject[] = [];

        for (let file of files) {
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                let fileInfo: FileObject = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };
                allFiles.push(fileInfo);
                if (allFiles.length === files.length) {
                    this.props.onDone(allFiles[0]);
                }
            }
        }

    }

    render() {
        return (
            <input
                type="file"
                onChange={this.handleChange.bind(this)}
                multiple={false}/>
        );
    }
}
