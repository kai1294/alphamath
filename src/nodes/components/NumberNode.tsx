import { useContext } from "react";
import { NodeContext } from "../../contexts";
import { TextGlyph } from "../../glyphs";

const NumberNode = () => {
    let { value } = useContext(NodeContext);

    return (
        <TextGlyph text={value.data} />
    );
}

export default NumberNode;
