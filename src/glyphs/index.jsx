import { Text } from "@mantine/core";

const TextGlyph = ({ text }) => {
    return (
        <Text>{text}</Text>
    );
};

const Plus = () => {
    return <TextGlyph text="+" />
}

const Minus = () => {
    return <TextGlyph text="-" />
}

const Dot = () => {
    return <TextGlyph text="." />
}

const OpenParen = () => {
    return <TextGlyph text="(" />
}

const CloseParen = () => {
    return <TextGlyph text=")" />
}

export {
    TextGlyph,
    Plus,
    Minus,
    Dot,
    OpenParen,
    CloseParen,
};
