const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
// ffmpeg -f mjpeg -i http://192.168.0.210/stream file.mp4
module.exports = async() => {
  console.log(__dirname + '/../../../frontend/build/manifests/manifest.mpd')
  let stream = ffmpeg('http://192.168.0.210/stream',{ timeout: 5000 })
  .inputFormat('mjpeg')
  .addOptions([
    '-f dash',
    '-window_size 10',
    '-remove_at_exit 1',
    '-hls_playlist 1',
  ])
  .on('end', () => {
    console.log('end')
  }).
  on('error', (err) => {
    console.log(err)
  })
  .save(__dirname + '/../../../frontend/build/manifests/manifest.mpd')
}

const execAsync = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve({ stdout, stderr });
    })
  })
}