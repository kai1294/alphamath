use crate::statement::Statement;

#[derive(Debug, Clone, Default, PartialEq)]
pub struct Context {
    pub statements: Vec<Statement>,
}

impl Context {

}
