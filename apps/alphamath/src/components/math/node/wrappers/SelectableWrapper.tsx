import { Selectable } from "../../select/Selectable";
import { NodeComponentWrapper } from "../Wrappers";

export const SelectableWrapper: NodeComponentWrapper = ({ node, children }) => {
    return (
        <Selectable value={node}>
            {children}
        </Selectable>
    )
}
