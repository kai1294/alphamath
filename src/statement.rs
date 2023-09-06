use crate::node::Node;

#[derive(Debug, Clone, PartialEq)]
pub struct Statement(pub Node, pub StatementType, pub Node);

#[derive(Debug, Clone, PartialEq)]
pub enum StatementType {
    Equals,
    NotEq,
    GreaterThan,
    GreaterThanOrEq,
    LessThan,
    LessThanOrEq,
}

impl ToString for StatementType {
    fn to_string(&self) -> String {
        match self {
            Self::Equals => String::from("="),
            Self::GreaterThan => String::from(">"),
            Self::GreaterThanOrEq => String::from(">="),
            Self::LessThan => String::from("<"),
            Self::LessThanOrEq => String::from("<="),
            Self::NotEq => String::from("!="),
        }
    }
}
