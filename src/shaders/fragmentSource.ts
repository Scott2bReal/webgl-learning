export const fragmentSource = `#version 300 es

precision highp float;

in vec2 fragCoord;
out vec4 fragColor;

uniform vec2 iResolution; // Screen size
uniform float iTime;      // Time uniform

vec3 pal( in float t )
{
    vec3 colA = vec3(0.1, 0.7, 0.2);
    vec3 colB = vec3(0.4, 1.2, 0.3);
    vec3 colC = vec3(0.5, 0.7, 1.3);
    vec3 colD = vec3(0.34, 0.35, 1.239);

    return colA + colB * cos( 6.28318 * (colC * t + colD) );
}

float sdEquilateralTriangle( in vec2 p, in float r )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x + k * p.y > 0.0 ) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
    p.x -= clamp( p.x, -2.0 * r, 0.0 );
    return -length(p) * sign(p.y);
}

void main()
{
    // Normalize fragCoord to range [-1, 1], correcting for aspect ratio
    vec2 uv = (fragCoord / iResolution) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y; // Adjust for aspect ratio
    vec2 uv0 = uv;

    vec3 finalColor = vec3(0, 0, 0);

    for (float i = 1.0; i < 4.0; i++) {
      uv *= 1.473820;
      uv = fract(uv);
      uv -= 0.5;

      float d = length(uv);
      vec3 col = pal(sdEquilateralTriangle(uv0, d) + iTime / 4.0);

      d = tan(d * 7.0 + iTime) / 7.0;
      d = abs(d);

      d = 0.02 / d;

      finalColor += col * d;
    }

    // Output final color
    fragColor = vec4(finalColor, 1.0);
}
`;
