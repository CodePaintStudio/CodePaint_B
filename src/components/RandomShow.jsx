import {useEffect, useState} from "react";
const Data = [
    {
        id: 1,
        type: "unhappy",
        content: "忌工作、适合休息。"
    },
    {
        id: 2,
        type: "happy",
        content: "宜多喝水。"
    },
    {
        id: 3,
        type: "normal",
        content: "是个躺平的好日子~"
    },
    {
        id: 4,
        type: "happy",
        content: "幸运指数爆棚~"
    },
    {
        id: 5,
        type: "happy",
        content: "做事效率超级高~"
    },
    {
        id: 6,
        type: "normal",
        content: "是平平无奇的一天。"
    },
    {
        id: 7,
        type: "unhappy",
        content: "不宜远出，宅家最舒服。"
    }
];

export default function RandomShow() {
    const [randomNumber, setRandomNumber] = useState(0);

    function getRandomNumber() {
        return new Date().getDate() % 6;
    }

    useEffect(() => {
        const number = getRandomNumber();
        setRandomNumber(number);
    }, []);

    const happy = {
        color: "rgb(107, 172, 163)"
    };
    const normal = {
        color: "rgba(0, 24, 123, 0.5)"
    };
    const unhappy = {
        color: "rgb(0, 24, 123)"
    };

    const style = {
        fontWeight: "bold",
        fontSize: "larger",
        color: Data[randomNumber]?.type === "happy" ? happy.color :
            Data[randomNumber]?.type === "normal" ? normal.color :
                Data[randomNumber]?.type === "unhappy" ? unhappy.color : "black"
    };

    return (
        <div style={style}>
      <span>
        今日{Data[randomNumber]?.content}
      </span>
        </div>
    );
}
