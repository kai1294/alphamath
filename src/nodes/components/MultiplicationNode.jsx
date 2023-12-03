import { useContext } from "react";
import { NodeComponent } from './Node';
import { NodeContext } from "../../contexts";
import { Dot } from "../../glyphs";
import { SortableContainer } from "./common/SortableContainer";

const MultiplicationNode = () => {
    let { value, setValue } = useContext(NodeContext);
    
    let elements = [];

    let prev;
    for (let idx = 0; idx < value.data.length; idx++) {
        let node = value.data[idx];

        if (prev) {
            elements.push(<Dot />);
        }

        elements.push(<NodeComponent
            value={node}
            onChange={(v) => setValue({
                type: value.type,
                data: value.data.map((t, i) => i == idx ? v : t)
            })} />);

        prev = node;
    }

    return (
        <SortableContainer
            elements={elements}
            items={value.data.map((n) => n.uuid)}
            />
    );
};

export default MultiplicationNode;
