function drawCube(x, y, wx, wy, h, color) {
    // top side
    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.closePath();

    ctx.fillStyle = darkenColor(color, darkening[0]);
    ctx.strokeStyle = darkenColor(color, darkening[0]);
    ctx.stroke();
    ctx.fill();  

    // left side
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - wx, y - wx * 0.5);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();

    ctx.fillStyle = darkenColor(color, darkening[1]);
    ctx.strokeStyle = darkenColor(color, darkening[1]);
    ctx.stroke();
    ctx.fill();

    // right side
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + wy, y - wy * 0.5);
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();

    ctx.fillStyle = darkenColor(color, darkening[2]);
    ctx.strokeStyle = darkenColor(color, darkening[2]);
    ctx.stroke();
    ctx.fill();
}

function darkenColor(color, darkening) {
    const newRed = Math.round(color.r * (1 - darkening/100));
    const newGreen = Math.round(color.g * (1 - darkening/100));
    const newBlue = Math.round(color.b * (1 - darkening/100));

    return `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}