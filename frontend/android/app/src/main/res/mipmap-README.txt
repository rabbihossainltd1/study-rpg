Place ic_launcher.png and ic_launcher_round.png in each mipmap folder:
mipmap-mdpi: 48x48
mipmap-hdpi: 72x72
mipmap-xhdpi: 96x96
mipmap-xxhdpi: 144x144
mipmap-xxxhdpi: 192x192

GitHub Actions will use a default launcher icon if these are missing.
Run: npx capacitor-assets generate --assetPath assets/icon.png
after adding a 1024x1024 icon.png in frontend/assets/
