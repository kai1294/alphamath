use bevy::prelude::*;
use bevy_pancam::{PanCam, PanCamPlugin};

fn main() {
    App::new()
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
}

fn update(
    mut gizmos: Gizmos,
    pos: Query<&GlobalTransform, With<Camera2d>>,
    mut t: Query<&mut Text>,
    text_style: Res<TextRes>,
) {
    let pos = pos.single();
    let mut text = t.single_mut();

    *text = Text::from_section(format!("cam pos: {}", pos.translation().to_string()), text_style.0.clone());

    for x in 0..100 {
        for y in 0..100 {
            gizmos.line_2d(
                Vec2::from_array([(x * 100) as f32, (y * 100) as f32]),
                Vec2::from_array([((x + 1) * 100) as f32, (y * 100) as f32]),
                Color::DARK_GRAY
            );
            gizmos.line_2d(
                Vec2::from_array([(x * 100) as f32, (y * 100) as f32]),
                Vec2::from_array([((x) * 100) as f32, ((y + 1) * 100) as f32]),
                Color::DARK_GRAY
            );
        }
    }
}
