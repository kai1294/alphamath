import React from "react";

export interface IGlobalTransform {
    x: number;
    y: number;
    scale: number;
}

export interface ITransform {
    x: number;
    y: number;
    setX: React.Dispatch<React.SetStateAction<number>>;
    setY: React.Dispatch<React.SetStateAction<number>>;
};

export interface ISize {
    w: number;
    h: number;
}
