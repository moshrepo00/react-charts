import React from "react";
export default function Test(props: any) {
    return (
        <div>
            {props.arr.map((item: string) => {
                return item;
            })}
        </div>
    );
}
