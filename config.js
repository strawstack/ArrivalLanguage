let f = 1.5;

let config = {
    width: 1024,
    height: 1024,
    center: {x: 512, y: 512}, // center of character
    radius: 300, // Radius of character,
    blobRadius: {
        small: 20 * f,
        medium: 40 * f,
        large: 80 * f,
        xlarge: 100 * f
    },
    strokeLength: (100 * f) + 10
};
