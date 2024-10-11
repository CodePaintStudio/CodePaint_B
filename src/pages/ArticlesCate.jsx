import {useState} from "react";
import {Select, Row} from "antd";

import Blog from "../components/Blog.jsx";
import Activities from "../components/Activities.jsx";
import UiWork from "../components/UiWork.jsx";

export default function ArticlesCate() {
    const [tableType, setTableType] = useState('blog');

    return (
        <>
            <Row>
                <Select
                    size={"large"}
                    style={{
                        margin: 20,
                        marginBottom: 0,
                        width: 150,
                        height: 50
                    }}
                    onChange={(value) => setTableType(value)}
                    defaultValue={"blog"}
                    options={[
                        {value: 'blog', label: '博客'},
                        {value: 'ui', label: 'UI作品'},
                        {value: 'activities', label: '活动'},
                    ]}
                />
            </Row>
            {
                tableType === 'blog' ? <Blog/> :
                    tableType === "ui" ? <UiWork/> :
                        <Activities/>
            }
        </>
    );
}
