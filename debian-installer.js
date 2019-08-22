const installer = require('electron-installer-debian');

const options = {
  src: 'packaged/add-a-chapter-linux-x64/',
  dest: 'dist/installers/',
  arch: 'amd64',
};

async function main(options) {
  console.log('Creating Package');
  try {
    await installer(options);
  } catch (err) {
    console.error(err, err.stack);
    process.exit(1);
  } finally {
    console.log(`Successfully created package at ${options.dest}`);
  }
}

main(options);
