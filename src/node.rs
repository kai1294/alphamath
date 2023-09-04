
pub enum Node {
    Literal(f64),
    Variable(String),

    Add(Vec<Node>),
    Multiply(Vec<Node>),
    Negate(Box<Node>),

    Divide(Box<Node>, Box<Node>),
    Fraction(Box<Node>, Box<Node>),
    Exponentiate(Box<Node>, Box<Node>),
    Root(Box<Node>, Box<Node>),
    Absolute(Box<Node>),
}

impl ToString for Node {
    fn to_string(&self) -> String {
        match self {
            Self::Literal(int) => int.to_string(),
            Self::Variable(v) => v.clone(),

            Self::Divide(a, b) | Self::Fraction(a, b) => format!("({} / {})", a.as_ref().to_string(), b.as_ref().to_string()),
            Self::Exponentiate(a, b) => format!("({} ^ {})", a.as_ref().to_string(), b.as_ref().to_string()),
            Self::Root(a, b) => format!("{}√{}", a.as_ref().to_string(), b.as_ref().to_string()),
            Self::Absolute(a) => format!("|{}|", a.as_ref().to_string()),

            _=> todo!(),
        }
    }
}
