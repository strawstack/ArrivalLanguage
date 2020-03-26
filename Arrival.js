class Arrival {
    constructor(_d3, _config, _alphabet) {
        this.d3 = _d3;
        this.svg = this.d3.select("svg");
        this.config = _config;
        this.alphabet = _alphabet;
    }
    renderWord(word) {
        this.showNoise();
        word = word.toLowerCase();
        // Render a word
        this.renderFoundation(word);
        let fz = this.letterFz(word);
        for (let k in fz) {
            this.renderCharacter(k, fz[k]);
        }
        this.showWord(word);
    }
    showNoise() {
        let count = 24;
        let radius = 10;
        let numberPoints = 7;
        let length = 5;
        let jitter = 5;
        for (let i = 0; i < count; i++) {
            let x = Math.random() * (config.width - 40) + 20;
            let y = Math.random() * (config.height - 40) + 20;
            if (Math.random() < 0.3) {
                this.noiseBlob(x, y, radius, numberPoints, jitter);
            } else {
                let lineWidth = [3, 1];
                let width = lineWidth[Math.floor(Math.random() * lineWidth.length)];
                this.noiseLine(x, y, length, width, numberPoints, jitter);
            }
        }
    }
    noiseBlob(bx, by, radius, points, jitter) {
        let _cp = this.circlePoints(radius, points, jitter);
        let cp = this.shiftPoints(_cp, {x: bx, y: by});

        let lineGenerator = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasisClosed); // curveCatmullRom

        this.svg.append("path")
            .datum(cp)
            .attr("class", "line")
            .attr("d", lineGenerator)
            .attr("fill", "#555");
    }
    noiseLine(x, y, length, lineWidth, numberPoints, jitter) {
        let _cp = this.linePoints(Math.random() * 360, length, numberPoints, jitter);

        // Shift the line to the correct location
        let cp = this.shiftPoints(_cp, {x: x, y: y});

        let lineGenerator = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveCatmullRom); // curveBasisClosed

        this.svg.append("path")
            .datum(cp)
            .attr("class", "line")
            .attr("d", lineGenerator)
            .attr("fill", "transparent")
            .attr("stroke", "#555")
            .attr("stroke-width", lineWidth)
            .attr("stroke-linecap", "round");
    }
    letterFz(word) {
        let map = {};
        for (let c of word) {
            if (!(c in map)) map[c] = 0;
            map[c] += 1;
        }
        return map;
    }
    showWord(word) {
        document.querySelector(".text-area").innerHTML = word;
    }
    renderFoundation(word) {
        // Render circular foundation for the word
        let count = 3;
        let lineWidth = [10, 5, 3];
        let startAngle = this.angleForCharacter(word[0]);
        while (count > 0) {
            let _cp = this.circlePoints(config.radius, 24, 15, startAngle);
            let cp = this.shiftPoints(_cp, config.center);

            let gapSize = word.length;
            while (gapSize > 0) {
                cp.pop(0);
                gapSize -= 1;
            }

            let lineGenerator = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveCatmullRom);

            this.svg.append("path")
                .datum(cp)
                .attr("class", "foundation")
                .attr("d", lineGenerator)
                .attr("fill", "transparent")
                .attr("stroke", "#333")
                .attr("stroke-width", lineWidth[count-1])
                .attr("stroke-linecap", "round");

            count -= 1;
        }

    }
    renderBlob(deg, radius, radiusOffset) {
        // Render blob with jitter
        // deg and radius are numbers

        if (radiusOffset === undefined) radiusOffset = 0;

        // Calc jitter and number points
        let jitter = radius * 0.4;
        let numberPoints = 10;

        // Get a circle of points
        let _cp = this.circlePoints(radius, numberPoints, jitter);

        // Shift the circle to the right location
        let xc = (config.radius + radiusOffset) * Math.cos(H.rad(deg));
        let yc = (config.radius + radiusOffset) * -1 * Math.sin(H.rad(deg));
        _cp = this.shiftPoints(_cp, config.center);
        let cp = this.shiftPoints(_cp, {x: xc, y: yc});

        let lineGenerator = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasisClosed); // curveCatmullRom

        this.svg.append("path")
            .datum(cp)
            .attr("class", "line")
            .attr("d", lineGenerator)
            .attr("fill", "#333");
            //.attr("stroke", "#333")
            //.attr("stroke-width", "3");
    }
    renderBlobEllipse(deg, xRadius, yRadius, radiusOffset) {
        // Render blob with jitter
        // deg and radius are numbers

        if (radiusOffset === undefined) radiusOffset = 0;

        // Calc jitter and number points
        let jitter = yRadius * 0.4;
        let numberPoints = 10;

        // Get a circle of points
        let _cp = this.ellipsePoints(xRadius, yRadius, numberPoints, jitter);

        // Shift the shape to the right location
        let xc = (config.radius + radiusOffset) * Math.cos(H.rad(deg));
        let yc = (config.radius + radiusOffset) * -1 * Math.sin(H.rad(deg));
        _cp = this.rotatePoints(_cp, -deg + 90);
        _cp = this.shiftPoints(_cp, config.center);
        let cp = this.shiftPoints(_cp, {x: xc, y: yc});

        let lineGenerator = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasisClosed); // curveCatmullRom

        this.svg.append("path")
            .datum(cp)
            .attr("class", "line")
            .attr("d", lineGenerator)
            .attr("fill", "#333");
            //.attr("stroke", "#333")
            //.attr("stroke-width", "3");
    }
    renderStroke(deg, length, angle) {
        // Render line with jitter
        // deg and length are numbers

        // Calc jitter and number of points
        let jitter = length * 0.3;
        let numberPoints = 9;
        let lineWidth = [8, 4, 2];
        let count = 3;

        // Get a line of points
        let _cp = this.linePoints(angle, length, numberPoints, jitter);

        // Shift the line to the correct location
        let xc = config.radius * Math.cos(H.rad(deg));
        let yc = config.radius * -1 * Math.sin(H.rad(deg));
        _cp = this.shiftPoints(_cp, config.center);
        let cp = this.shiftPoints(_cp, {x: xc, y: yc});

        while (count > 0) {

            // Rejitter points
            cp = this.reJitter(cp, deg, 30);

            let lineGenerator = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveCatmullRom); // curveBasisClosed

            this.svg.append("path")
                .datum(cp)
                .attr("class", "line")
                .attr("d", lineGenerator)
                .attr("fill", "transparent")
                .attr("stroke", "#333")
                .attr("stroke-width", lineWidth[count - 1])
                .attr("stroke-linecap", "round");
            count -= 1;
        }
    }
    reJitter(points, deg, _jitter) {
        // Return points with jitter
        let jitter = () => this.rand(-1 * _jitter/2, _jitter/2);
        let jitterVec2 = () => {
            let xc = jitter() * Math.cos(H.rad(deg + 90));
            let yc = jitter() * -1 * Math.sin(H.rad(deg + 90));
            return {x: xc, y: yc};
        };
        return points.map((p, i) => {
            if (i == 0) return p; // Don't jitter first point in line
            let j = jitterVec2();
            return {
                x: p.x + j.x,
                y: p.y + j.y
            };
        });
    }
    linePoints(deg, length, numberPoints, _jitter) {
        // Returns [Point{x:,y:}] an array of points
        // origin zero in direction of angle
        // with a numberPoints and a point at each end

        if (_jitter === undefined) _jitter = 0;
        let jitter = () => this.rand(-1 * _jitter/2, _jitter/2);
        let jitterVec2 = () => {
            let xc = jitter() * Math.cos(H.rad(deg + 90));
            let yc = jitter() * -1 * Math.sin(H.rad(deg + 90));
            return {x: xc, y: yc};
        };

        let segment = length/(numberPoints - 1);
        let currentLength = 0;
        let linePoints = [];
        let prev = {x: 0, y: 0};
        for (let i = 0; i < numberPoints; i++) {
            let j = this.addVec(prev, jitterVec2());
            if (i == 0) j = {x: 0, y: 0}; // No jitter on first point
            prev = j;
            let xc = currentLength * Math.cos(H.rad(deg)) + j.x;
            let yc = currentLength * -1 * Math.sin(H.rad(deg)) + j.y;
            linePoints.push({x: xc, y: yc});
            currentLength += segment;
        }
        return linePoints;
    }
    addVec(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y
        };
    }
    renderCharacter(char, fz) {
        // Render given character
        let charData = this.alphabet[char];
        for (let data of charData) {
            if (data.type === H.shape.blob) {
                let deg = data.deg;
                let radius = data.radius;
                let radiusOffset = data.radiusOffset;
                this.renderBlob(deg, radius, radiusOffset);
                this.renderFz(deg, fz);

            } else if (data.type === H.shape.stroke) {
                let deg = data.deg;
                let length = data.length;
                let angle = data.angle;
                this.renderStroke(deg, length, angle);
                this.renderFz(deg, fz);

            } else if (data.type === H.shape.blobEllipse) {
                let deg = data.deg;
                let xRadius = data.xRadius;
                let yRadius = data.yRadius;
                let radiusOffset = data.radiusOffset;
                this.renderBlobEllipse(deg, xRadius, yRadius, radiusOffset);
                this.renderFz(deg, fz);

            } else {
                console.log("Char type not recognized");
            }
        }
    }
    renderFz(deg, fz) {
        if (fz == 2) {
            this.renderStroke(deg, config.strokeLength, deg + 180);

        } else if (fz >= 3) {
            this.renderStroke(deg, config.strokeLength, deg + 180);
            this.renderStroke(deg, config.strokeLength, deg + 210);

        } else {
            console.log("Use dots to indicate 4 or more");
        }
    }
    circlePoints(radius, number, _jitter, startAngle) {
        // Returns type [Point{x:,y:}] of evenly spaced
        // Points that make a circle

        // Optional parameters
        if (startAngle === undefined) startAngle = 0;

        // Calculate jitter
        if (_jitter === undefined) _jitter = 0;
        let jitter = () => this.rand(-1 * _jitter/2, _jitter/2);

        // Build array of Points
        let points = [];
        let angle = 360 / number;
        let currentAngle = startAngle;
        for (let i = 0; i < number; i++) {
            let xc = (radius + jitter()) * Math.cos(H.rad(currentAngle));
            let yc = (radius + jitter()) * -1 * Math.sin(H.rad(currentAngle));
            points.push({
                x: xc, y: yc
            });
            currentAngle += angle;
        }
        return points;
    }
    ellipsePoints(xRad, yRad, number, _jitter) {
        // Returns type [Point{x:,y:}] of evenly spaced
        // Points that make an ellipse

        // Calculate jitter
        if (_jitter === undefined) _jitter = 0;
        let jitter = () => this.rand(-1 * _jitter/2, _jitter/2);

        // Build array of Points
        let points = [];
        let angle = 360 / number;
        let currentAngle = 0;
        for (let i = 0; i < number; i++) {
            let xc = (xRad + jitter()) * Math.cos(H.rad(currentAngle));
            let yc = (yRad + jitter()) * -1 * Math.sin(H.rad(currentAngle));
            points.push({
                x: xc, y: yc
            });
            currentAngle += angle;
        }
        return points;
    }
    shiftPoints(points, shift) {
        // Return list with all points are moved by amount given in `shift`
        return points.map(p => {
            return {x: p.x + shift.x, y: p.y + shift.y}
        });
    }
    rotatePoints(points, deg) {
        return points.map(p => {
            return {
                x: p.x * Math.cos(H.rad(deg)) - p.y * Math.sin(H.rad(deg)),
                y: p.y * Math.cos(H.rad(deg)) + p.x * Math.sin(H.rad(deg))
            }
        });
    }
    rand(lo, hi) {
        if (lo === 0 && hi === 0) return 0;
        // Return random number [lo, hi)
        return Math.random() * (hi - lo) + lo;
    }
    angleForCharacter(char) {
        // Return angle given a character
        let baseValue = 97;
        return (char.charCodeAt(0) - baseValue) * 25;
    }
}
class H {
    // Helper functions
    constructor() {}
}
H.deg = v => v / Math.PI * 180;
H.rad = v => v / 180 * Math.PI;
H.shape = {
    blob: 0,
    stroke: 1,
    blobEllipse: 2
};
