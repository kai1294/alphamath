import React from "react";
import { IGlobalTransform } from "./types";

const GlobalTransform = React.createContext<IGlobalTransform>({
    x: 0,
    y: 0,
    scale: 0,
});

export {
    GlobalTransform,
}
