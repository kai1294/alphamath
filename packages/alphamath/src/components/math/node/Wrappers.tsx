import { MathNode } from "@/types/model/node";
import { WithSetters } from "@/types/utils";
import { ComponentType, createContext, PropsWithChildren, useContext } from "react";

export type NodeComponentWrapper = ComponentType<WithSetters<{ node: MathNode }> & PropsWithChildren>;

export const WrappersContext = createContext<NodeComponentWrapper[]>([]);

export const WithWrappers = ({
    children,
    node,
    setNode,
}: PropsWithChildren & WithSetters<{ node: MathNode }>) => {
    const wrappers = useContext(WrappersContext);

    return (
        <>
            {wrappers.reduceRight((acc, Wrap) => (
                <Wrap {...{ node, setNode }}>
                    {acc}
                </Wrap>
            ), children)}
        </>
    )
}



