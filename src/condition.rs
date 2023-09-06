use std::ops::ControlFlow;

#[derive(Debug, Clone, PartialEq, Default)]
pub enum Possibility {
    True,
    False,
    #[default]
    Maybe
}

impl From<bool> for Possibility {
    fn from(value: bool) -> Self {
        if value {
            Possibility::True
        } else {
            Possibility::False
        }
    }
}

impl From<Option<bool>> for Possibility {
    fn from(value: Option<bool>) -> Self {
        if let Some(b) = value {
            Self::from(b)
        } else {
            Possibility::Maybe
        }
    }
}

impl std::ops::Try for Possibility {
    type Output = bool;
    type Residual = Possibility;

    fn from_output(output: Self::Output) -> Self {
        Self::from(output)
    }

    fn branch(self) -> ControlFlow<Self::Residual, Self::Output> {
        match self {
            Possibility::True => ControlFlow::Continue(true),
            Possibility::False => ControlFlow::Continue(false),
            Possibility::Maybe => ControlFlow::Break(Possibility::Maybe)
        }
    }
}

impl std::ops::FromResidual<Possibility> for Possibility {
    fn from_residual(_: Possibility) -> Self {
        Possibility::Maybe
    }
}

#[derive(Debug, Clone, PartialEq, Default)]
pub struct SignProbability {
    pub positive: Possibility,
    pub negative: Possibility,
}

impl From<f32> for SignProbability {
    fn from(value: f32) -> Self {
        if value == 0. || value == -0. {
            Self::zero()
        } else if value.is_sign_negative() {
            Self::neg()
        } else if value.is_sign_positive() {
            Self::pos()
        } else {
            unreachable!()
        }
    }
}

impl SignProbability {
    pub fn pos() -> Self {
        Self {
            positive: Possibility::True,
            negative: Possibility::False,
        }
    }

    pub fn neg() -> Self {
        Self {
            positive: Possibility::False,
            negative: Possibility::True,
        }
    }

    pub fn zero() -> Self {
        Self {
            positive: Possibility::False,
            negative: Possibility::False,
        }
    }

    pub fn is_zero(&self) -> Possibility {
        match (&self.positive, &self.negative) {
            // is zero if not positive and negative
            (Possibility::False, Possibility::False) => Possibility::True,
            // if we know for sure its either positive or negative, its not zero
            (Possibility::True, Possibility::False)
            | (Possibility::False, Possibility::True) => Possibility::False,
            // if positivity and/or negativity are Maybe then we dont know
            _ => Possibility::Maybe,
        }
    }
}
