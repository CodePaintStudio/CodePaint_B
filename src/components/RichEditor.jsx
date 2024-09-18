import {useRef, useState, useEffect} from "react";
import {Editor} from '@toast-ui/react-editor';
import {Button, message} from "antd";

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

export default function RichEditor() {
    const [content, setContent] = useState(null);
    const editorRef = useRef();

    function addHandle() {
        const rich_content = editorRef.current.getInstance().getHTML();
        if (rich_content === "<p><br></p>") {
            return message.warning("请输入内容！");
        }
        setContent(rich_content);
        message.success("保存成功！");
    }

    useEffect(() => {
        if (content !== null) {
            console.log(content);
        }
    }, [content]);

    return (
        <>
            <Button onClick={addHandle}>保存</Button>
            <Editor
                initialValue="hello, CodePainter ~"
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                usageStatistics={false}
                ref={editorRef}
                language='zh-CN'
                plugins={[
                    [codeSyntaxHighlight, { highlighter: Prism }]
                ]}
            />
        </>
    );
}
