lowp vec4 premultiply(lowp vec4 color) {
    return vec4(
        color.r * color.a,
        color.g * color.a,
        color.b * color.a,
        color.a
    );
}
