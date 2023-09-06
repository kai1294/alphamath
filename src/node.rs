use std::str::FromStr;

#[derive(Debug, Clone, PartialEq)]
pub enum Node {
    Literal(f32),
    Variable(String),

    Add(Vec<Node>),
    Multiply(Vec<Node>),
    Negate(Box<Node>),

    Fraction(Box<Node>, Box<Node>),
    Exponentiate(Box<Node>, Box<Node>),
    Root(Box<Node>, Box<Node>),
    Absolute(Box<Node>),
    Factorial(Box<Node>),
}

impl Node {
    pub fn squared(self) -> Self {
        Self::Exponentiate(Box::new(self), Box::new(Self::Literal(2.)))
    }

    pub fn sqrt(node: Self) -> Self {
        Self::Root(Box::new(Self::Literal(2.)), Box::new(node))
    }
}

impl FromStr for Node {
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        todo!()
    }
}

impl ToString for Node {
    fn to_string(&self) -> String {
        match self {
            Self::Literal(int) => int.to_string(),
            Self::Variable(v) => v.clone(),

            Self::Add(nodes) => format!("({})", nodes.iter().map(ToString::to_string).collect::<Vec<_>>().join(" + ")),
            Self::Multiply(nodes) => format!("({})", nodes.iter().map(ToString::to_string).collect::<Vec<_>>().join(" * ")),
            Self::Negate(a) => format!("-{}", a.as_ref().to_string()),

            Self::Fraction(a, b) => format!("({} / {})", a.as_ref().to_string(), b.as_ref().to_string()),
            Self::Exponentiate(a, b) => format!("({} ^ {})", a.as_ref().to_string(), b.as_ref().to_string()),
            Self::Root(a, b) => format!("{}√{}", a.as_ref().to_string(), b.as_ref().to_string()),
            Self::Absolute(a) => format!("|{}|", a.as_ref().to_string()),
            Self::Factorial(a) => format!("{}!", a.as_ref().to_string()),
        }
    }
}

impl std::ops::Add for Node {
    type Output = Self;

    fn add(self, rhs: Self) -> Self::Output {
        match (self, rhs) {
            (Self::Add(a), Self::Add(b)) => {
                let mut v = vec![];
                for n in a {
                    v.push(n);
                }

                for n in b {
                    v.push(n);
                }

                Self::Add(v)
            },
            (Self::Add(a), any) => {
                let mut v = vec![];
                for n in a {
                    v.push(n);
                }
                v.push(any);
                Self::Add(v)
            },
            (any, Self::Add(a)) => {
                let mut v = vec![
                    any
                ];
                for n in a {
                    v.push(n);
                }
                Self::Add(v)
            },
            (a, b) => {
                Self::Add(vec![a, b])
            },
        }
    }
}

impl std::ops::Div for Node {
    type Output = Self;

    fn div(self, rhs: Self) -> Self::Output {
        Self::Fraction(Box::new(self), Box::new(rhs))
    }
}

impl std::ops::Mul for Node {
    type Output = Self;

    fn mul(self, rhs: Self) -> Self::Output {
        Self::Multiply(vec![self, rhs])
    }
}
