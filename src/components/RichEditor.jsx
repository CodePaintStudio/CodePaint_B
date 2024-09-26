import React, { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Editor } from '@toast-ui/react-editor';
import { Button, message } from "antd";
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import { uploadFileServer } from "../api/uploadFile.js";

const RichEditor = forwardRef((props, ref) => {
    const [content, setContent] = useState(null);
    const [isSaved, setIsSaved] = useState(false);//用于显示当前内容是否保存
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
            callback(result.url, 'image');
            URL.revokeObjectURL(file);
        } catch (error) {
            message.warning("上传失败")
        }
    };

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
                onChange={() => setIsSaved(false)}//当输入内容时，重置isSaved，提醒保存
            />
        </>
    );
});

export default RichEditor;