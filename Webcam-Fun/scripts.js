const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localVideoStream => {
            video.srcObject = localVideoStream;
            video.play();
        })
        .catch((e) => { console.error(e) }
        )
};

getVideo();

function paintCanvas() {
    const height = video.videoHeight;
    const width = video.videoWidth;
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = redEffect(pixels);
        // pixels = rgSplit(pixels);
        pixels = removePixels(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 20);
}

video.addEventListener("canplay", paintCanvas);

function takeSnap() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'photo');
    link.innerHTML = `<img src="${data}" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i]; // red 
        pixels.data[i + 1] = pixels.data[i + 1] - 10; // green
        pixels.data[i + 2] = pixels.data[i + 2] - 10; // blue
    }
    return pixels;
}


function rgSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i]; // red 
        pixels.data[i + 100] = pixels.data[i + 1]; // green
        pixels.data[i - 150] = pixels.data[i + 2]; // blue
    }
    return pixels;
}

function removePixels(pixels) {
    let level = {};
    document.querySelectorAll('.rgb input').forEach(input => {
        level[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i += 4) {
        const red = pixels.data[i];
        const green = pixels.data[i + 1];
        const blue = pixels.data[i + 2];
        const alpha = pixels.data[i + 3];

        if (red >= level.rmin && red <= level.rmax
            && green >= level.gmin && green <= level.gmax
            && blue >= level.bmin && blue <= level.bmax) {
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}