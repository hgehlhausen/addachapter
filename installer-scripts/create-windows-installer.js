const path = require('path');
const { createWindowsInstaller } = require('electron-winstaller');

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error = {}) => {
    console.error(error.message || error);
    process.exit(1);
  });

function getInstallerConfig() {
  console.log('creating windows installer');
  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'dist', 'installers');

  return Promise.resolve({
    appDirectory: path.join(outPath, 'add-a-chapter-win32-x64'),
    authors: 'Heath Gehlhausen',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'add-a-chapter.exe',
    setupIcon: path.join(rootPath, 'src', 'common', 'icon.ico'),
  });
}
