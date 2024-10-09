import {useState} from "react";
import {Tabs} from "antd";

import BlogAdd from "../components/BlogAdd";
import UiWorkAdd from "../components/UiWorkAdd";
import ActivitesAdd from "../components/ActivitesAdd";

const {TabPane} = Tabs;

export default function ArticlesCate() {
    const [activeKey, setActiveKey] = useState('blog');

    const handleTabChange = (key) => {
        setActiveKey(key);
    };

    return (
        <div style={{
            paddingLeft: 20,
            paddingRight: 20
        }}>
            <Tabs onChange={handleTabChange} activeKey={activeKey}>
                <TabPane tab="博客" key="blog">
                    <BlogAdd/>
                </TabPane>
                <TabPane tab="UI 作品" key="ui">
                    <UiWorkAdd/>
                </TabPane>
                <TabPane tab="活动" key="activities">
                    <ActivitesAdd/>
                </TabPane>
            </Tabs>
        </div>
    );
}
