use bevy::prelude::*;
use bevy_pancam::{PanCam, PanCamPlugin};

pub mod node;

fn main() {
    App::new()
        .insert_resource(ClearColor(Color::rgb(0., 0., 0.)))
        .add_plugins((
            DefaultPlugins,
            PanCamPlugin::default(),
        ))
        .add_systems(Startup, setup)
        .add_systems(Update, update)
        .run();
}

#[derive(Resource)]
pub struct TextRes(TextStyle);


fn setup(mut commands: Commands, asset_server: Res<AssetServer>) {
    let font = asset_server.load("fonts/Roboto-Regular.ttf");
    let text_style = TextStyle {
        font: font.clone(),
        font_size: 60.0,
        color: Color::WHITE,
    };

    commands.insert_resource(TextRes(text_style.clone()));

    commands.spawn((
        Camera2dBundle::default(),
        PanCam::default()
    ));

    commands.spawn(
        Text2dBundle {
            text: Text::from_section("AlphaMath", text_style.clone()),
            ..default()
        }
    );

    commands.spawn(
        Text2dBundle {
            text: Text::from_sections([
                TextSection::new("1", text_style.clone()),
                TextSection::new("=", text_style.clone()),
                TextSection::new("1", text_style.clone()),
            ]),
            transform: Transform::from_xyz(0., -10., 0.),
            ..default()
        }
    );
}

fn update(
    mut t: Query<&mut Text>,
    text_style: Res<TextRes>,
) {
    
}
