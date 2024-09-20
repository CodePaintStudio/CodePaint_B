import {Drawer} from "antd";
import {useEffect} from "react";


export default function BlogDetail({onClose, open, selectedBlogId}) {

    useEffect(()=> {

    })
    return (
        <Drawer
            width={640}
            placement="right"
            closable={true}
            onClose={onClose}
            open={open}
            maskClosable={false}
            title={"博客详情"}
        >
            <h1>ID:{selectedBlogId}</h1>
        </Drawer>
    )
}