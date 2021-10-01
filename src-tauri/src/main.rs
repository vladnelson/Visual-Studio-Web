#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::fs;
fn main() {
  let paths = fs::read_dir("C:/Users/didim/Documents/INTECH").unwrap();

  for path in paths {
      println!("Name: {}", path.unwrap().path().display())
  }

  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
