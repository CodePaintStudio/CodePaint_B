import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { Editor } from '@toast-ui/react-editor';
import { Button, message } from "antd";
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import { uploadFileServer } from "../api/uploadFile.js";

const RichEditor = forwardRef((props, ref) => {
    const [content, setContent] = useState("");
    const [isSaved, setIsSaved] = useState(true);
    const editorRef = useRef();

    useImperativeHandle(ref, () => ({
        getContent: () => content,
        isSaved: () => isSaved,
        editorRef: editorRef,
        saveContent: addHandle
    }));

    function addHandle() {
        const rich_content = editorRef.current.getInstance().getHTML();
        if (rich_content === "<p><br></p>") {
            message.warning("请输入内容！");
            return false;
        }
        setContent(rich_content);
        setIsSaved(true);
        message.success("保存成功！");
        return true;
    }

    const handleImageUpload = async (file, callback) => {
        try {
            const result = await uploadFileServer(file)
            callback(result.url, 'image');
            URL.revokeObjectURL(file);
        } catch (error) {
            message.warning("上传失败")
        }
    };

    useEffect(() => {
        const instance = editorRef.current.getInstance();
        instance.on('change', () => {
            setIsSaved(false);
        });
    }, []);

    return (
        <>
            <Button onClick={addHandle}>保存</Button>
            <Editor
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                usageStatistics={false}
                ref={editorRef}
                language='zh-CN'
                plugins={[
                    [codeSyntaxHighlight, {highlighter: Prism}]
                ]}
                hooks={{
                    addImageBlobHook: handleImageUpload,
                }}
            />
        </>
    );
});

export default RichEditor;