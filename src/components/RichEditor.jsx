import React, {useRef, useState, useImperativeHandle, forwardRef} from "react";
import {Editor} from '@toast-ui/react-editor';
import {Button, message} from "antd";
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import {uploadFileServer} from "../api/uploadFile.js";
import {baseURL} from "../utils/baseURL.js";

const RichEditor = forwardRef((props, ref) => {
    const [content, setContent] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const editorRef = useRef();

    useImperativeHandle(ref, () => ({
        getContent: () => content,
        isSaved: () => isSaved,
        editorRef: editorRef,
        clearContent: () => {
            if (editorRef.current) {
                const editorInstance = editorRef.current.getInstance();
                editorInstance.setHTML('');
                setContent(null);
                setIsSaved(false);
            }
        }
    }));

    function addHandle() {
        const rich_content = editorRef.current.getInstance().getHTML();
        if (rich_content === "<p><br></p>") {
            return message.warning("请输入内容！");
        }
        setContent(rich_content);
        setIsSaved(true);
        message.success("保存成功！");
    }

    const handleImageUpload = async (file, callback) => {
        try {
            const result = await uploadFileServer(file)
            callback(`${baseURL}/${result.data.data}`, 'image');
            URL.revokeObjectURL(file);
        } catch (error) {
            message.warning("上传失败")
        }
    };

    return (
        <>
            <Button
                type="primary"
                onClick={addHandle}
                style={{
                    width: '20%',
                    marginBottom: 10,
                    fontWeight: "bold"
                }}
            >保存内容</Button>
            <div
                style={{
                    boxSizing: "border-box",
                    width: "100%",
                    padding: 10,
                    paddingLeft: 0
                }}
            >
                <Editor
                    previewStyle="vertical"
                    height="450px"
                    initialEditType="markdown"
                    usageStatistics={false}
                    ref={editorRef}
                    language='zh-CN'
                    plugins={[
                        [codeSyntaxHighlight, {highlighter: Prism}]
                    ]}
                    hooks={{
                        addImageBlobHook: handleImageUpload,
                    }}
                    onChange={() => setIsSaved(false)}
                />
            </div>
        </>
    );
});

export default RichEditor;
