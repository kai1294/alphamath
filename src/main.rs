#![feature(try_trait_v2)]

use context::Context;
use iced::{Application, executor, Command, Settings, Element, widget::{container, column, text, Row}, Length};
use node::Node;
use statement::{Statement, StatementType};

pub mod node;
pub mod context;
pub mod statement;
pub mod condition;

#[derive(Debug, Clone)]
pub enum Message {
    
}

pub fn main() -> iced::Result {
    AlphaMath::run(Settings {
        antialiasing: true,
        default_text_size: 50.,
        window: iced::window::Settings {
            size: (750, 300),
            ..Default::default()
        },
        ..Default::default()
    })
}

pub struct AlphaMath {
    pub ctx: Context,
}

impl Default for AlphaMath {
    fn default() -> Self {
        let a = Statement(Node::Literal(1.), StatementType::Equals, Node::Literal(1.));

        Self {
            ctx: Context {
                statements: vec![
                    a
                ]
            }
        }
    }
}

impl Application for AlphaMath {
    type Executor = executor::Default;
    type Message = Message;
    type Theme = iced::Theme;
    type Flags = ();

    fn new(_flags: Self::Flags) -> (Self, Command<Message>) {
        (AlphaMath::default(), Command::none())
    }

    fn title(&self) -> String {
        String::from("AlphaMath")
    }

    fn update(&mut self, message: Self::Message) -> Command<Message> {
        match message {}

        Command::none()
    }

    fn view(&self) -> Element<Message> {
        let content = column(self.ctx.statements.iter().map(|s| {
            Row::with_children(vec![
                node_to_element(&s.0),
                text(s.1.to_string())
                    .into(),
                node_to_element(&s.2),
            ]).into()
        }).collect());

        container(content)
            .width(Length::Fill)
            .height(Length::Fill)
            .center_x()
            .center_y()
            .into()
    }
}

pub fn node_to_element(node: &Node) -> Element<Message> {
    match node {
        Node::Literal(f) => text(f.to_string()).into(),
        Node::Variable(v) => text(v).into(),
        Node::Absolute(n) => {
            Row::with_children(vec![
                text("|").into(),
                node_to_element(n.as_ref()),
                text("|").into(),
            ]).into()
        }
        _ => todo!(),
    }
}
