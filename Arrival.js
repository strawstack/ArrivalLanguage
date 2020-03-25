class Arrival {
    constructor(_d3, _config, _alphabet) {
        this.d3 = _d3;
        this.svg = this.d3.select("svg");
        this.config = _config;
        this.alphabet = _alphabet;
    }
    renderWord(word) {
        // Render a word
        this.renderFoundation(word);
        for (let c of word) {
            this.renderCharacter(c);
        }
    }
    renderFoundation(word) {
        // Render circular foundation for the word
        let _cp = this.circlePoints(300, 12, 100);
        let cp = this.shiftPoints(_cp, {x: 512, y: 512});

        /*
        let circles = this.svg
            .selectAll(".circle")
            .data(cp);

        let circlesEnter = circles.enter()
            .append("circle")
            .attr("class", "circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 10)
            .attr("fill", "#555");
        circles.merge(circlesEnter); */

        let lineGenerator = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveCatmullRom);

        this.svg.append("path")
            .datum(cp)
            .attr("class", "line")
            .attr("d", lineGenerator)
            .attr("fill", "#333");

    }
    renderCharacter(char) {
        // Render one character

    }
    circlePoints(radius, number, _jitter) {
        // Returns type [Point{x:,y:}] of evenly spaced
        // Points that make a circle

        // Calculate jitter
        if (_jitter === undefined) _jitter = 0;
        let jitter = () => this.rand(-1 * _jitter/2, _jitter/2);

        // Build array of Points
        let points = [];
        let angle = 360 / number;
        let currentAngle = 0;
        for (let i = 0; i < number; i++) {
            let xc = (radius + jitter()) * Math.cos(H.rad(currentAngle));
            let yc = (radius + jitter()) * Math.sin(H.rad(currentAngle));
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
    rand(lo, hi) {
        if (lo === 0 && hi === 0) return 0;
        // Return random number [lo, hi)
        return Math.random() * (hi - lo) + lo;
    }
}
class H {
    // Helper functions
    constructor() {}
}
H.deg = v => v / Math.PI * 180;
H.rad = v => v / 180 * Math.PI;
