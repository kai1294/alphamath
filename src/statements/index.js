const Statement = {
    Eq: (left, right) => ({ type: "stmt", variant: "eq", left, right }),
}

export {
    Statement,
};
