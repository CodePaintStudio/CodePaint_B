import {useState} from "react";
import {Select, Row} from "antd";

import Blog from "../components/Blog.jsx";
import Activities from "../components/Activities.jsx";
import UiWork from "../components/UiWork.jsx";

export default function ArticlesCate() {
    const [tableType, setTableType] = useState('activities');

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
                    defaultValue={"activities"}
                    options={[
                        {value: 'activities', label: '活动'},
                        {value: 'ui', label: 'UI作品'},
                        {value: 'blog', label: '博客'}
                    ]}
                />
            </Row>
            {
                tableType === 'activities' ? <Activities/> :
                    tableType === "ui" ? <UiWork/> :
                        <Blog/>
            }
        </>
    );
}
