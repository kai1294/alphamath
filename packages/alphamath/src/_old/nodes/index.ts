import actions from "./actions";
import { v4 } from "uuid";

const createNode = (type, data) => ({ type, data, uuid: v4() });
const Nodes = {
    /**
     * @param {Number} n
     * @returns {MathNode}
    */
    Number: (n) => createNode("Number", n),
    /**
     * @param {string} v
     * @returns {MathNode}
    */
    Variable: (v) => createNode("Variable", v),
    /**
     * @param {MathNode[]} n
     * @returns {MathNode}
    */
    Addition: (n) => createNode("Addition", n),
    /**
     * @param {MathNode} n
     * @returns {MathNode}
    */
    Negated: (n) => createNode("Negated", n),
    /**
     * @param {MathNode[]} n
     * @returns {MathNode}
    */
    Multiplication: (n) => createNode("Multiplication", n),
    /**
     * @param {[MathNode, MathNode]} n
     * @returns {MathNode}
    */
    Division: (n) => createNode("Division", n),
    /**
     * @param {[MathNode, MathNode]} n
     * @returns {MathNode}
    */
    Exponentiation: (n) => createNode("Exponentiation", n),
    /**
     * @param {[MathNode, MathNode]} n
     * @returns {MathNode}
    */
    Root: (n) => createNode("Root", n),
    /**
     * @param {string} name
     * @param {MathNode[]} args
    */
    Function: (name, args) => createNode("Function", { name, args }),
}

export {
    Nodes,
    actions,
};
