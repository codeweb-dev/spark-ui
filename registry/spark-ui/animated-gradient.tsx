"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AnimatedGradientProps {
  className?: string;
  variant?: "mist" | "lava" | "vortex";
  speed?: number;
  opacity?: number;
  children?: React.ReactNode;
}


const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const MIST_SHADER = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;

  #define TWO_PI 6.28318530718
  #define PI 3.14159265358979323846

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    float x1 = mix(a, b, u.x);
    float x2 = mix(c, d, u.x);
    return mix(x1, x2, u.y);
  }

  void main() {
      vec2 uv = v_uv;

      // Mist preset timing parameters: speed = 39, offset = -235
      float t = u_time * 0.975 - 1.175;

      // Mist preset scale parameter: scale = 0.48
      float noise_scale = 0.00338; // .0005 + .006 * 0.48

      uv -= 0.5;
      uv *= (noise_scale * u_resolution);
      uv /= 1.5; // pixel ratio normalization
      uv += 0.5;

      // 70% Same: Distortion & Swirl loops preserved exactly for perfect motion fidelity
      // Distortion: distortion = 4 (u_distortion = 0.08)
      float n1 = noise(uv * 1.0 + t);
      float n2 = noise(uv * 2.0 - t);
      float angle = n1 * TWO_PI;
      uv.x += 0.32 * n2 * cos(angle);
      uv.y += 0.32 * n2 * sin(angle);

      // Swirl: swirl = 65, swirlIterations = 5
      for (int i = 1; i <= 5; i++) {
          float fi = float(i);
          uv.x += 0.65 / fi * cos(t + fi * 1.5 * uv.y);
          uv.y += 0.65 / fi * cos(t + fi * 1.0 * uv.x);
      }

      // Edge shape shape-mixer calculation (shapeSize = 48, proportion = 33)
      float sh = 1.0 - uv.y;
      sh -= 0.5;
      sh /= (noise_scale * u_resolution.y);
      sh += 0.5;

      float shape_scaling = 0.104; // 0.2 * (1.0 - 0.48)
      float shape = smoothstep(0.45 - shape_scaling, 0.55 + shape_scaling, sh + 0.3 * (0.33 - 0.5));
      float mixer = shape;

      // 30% Premium Upgrade: Highly classy Parallax Fog & Cinematic Sweeping God Rays with Focused Ribbon
      vec3 bg = vec3(0.0196, 0.0196, 0.0196);          // Obsidian background (#050505)
      vec3 pink = vec3(1.0, 0.4, 0.7215);              // Pure elegant magenta core (#FF66B8)

      // Exponent-sine bell curve to isolate mist into a beautiful center ribbon splaying dynamically
      float mistFocus = pow(sin(mixer * PI), 4.2);

      // Double-layer parallax mist density (blending broad background flow and fine parallax foreground)
      float fineMist = noise(uv * 3.5 - t * 1.3) * 0.4 + noise(uv * 1.5 + t * 0.85) * 0.6;
      float combinedDensity = mix(mixer, fineMist, 0.28) * mistFocus;

      // Smooth constant-color gradient mapping
      vec3 col = mix(bg, pink, smoothstep(0.0, 0.85, combinedDensity));

      // Foreground parallax highlight glow, strictly bounded by the mist focus ribbon
      float highlight = smoothstep(0.42, 0.88, fineMist) * smoothstep(0.12, 0.9, mixer) * mistFocus;
      col = mix(col, pink * 1.15, highlight * 0.35);

      // Sweeping Crepuscular God Rays (light shafts filtering through the moving fog ribbon)
      vec2 raySource = vec2(0.2, 1.25); // light source positioned above the upper-left viewport
      vec2 rayDir = normalize(v_uv - raySource);
      float rayAngle = atan(rayDir.y, rayDir.x);
      
      // Sweep modulation using multiple low-frequency time-shifted sines
      float rays = sin(rayAngle * 6.5 + t * 0.35) * 0.35 +
                   sin(rayAngle * 12.0 - t * 0.22) * 0.25 +
                   sin(rayAngle * 24.0 + t * 0.15) * 0.15;
      rays = smoothstep(0.15, 0.82, rays * 0.5 + 0.5);

      // Volumetric crepuscular light soft overlay, masked by fog density and center focus ribbon
      float rayGlow = rays * smoothstep(0.15, 0.9, combinedDensity) * (1.1 - v_uv.y) * mistFocus * 0.7;
      col += pink * rayGlow * 0.38;

      // Cinematic Haze: micro-fine glowing particulate dust in illuminated center areas
      float grain = random(gl_FragCoord.xy * 0.15 + t * 0.05);
      float particles = step(0.988, grain) * smoothstep(0.2, 0.9, combinedDensity);
      col += pink * particles * 0.32;

      // Final contrast optimization
      col = pow(col, vec3(0.92));

      gl_FragColor = vec4(col, 1.0);
  }
`;

const LAVA_SHADER = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;

  #define PI 3.14159265359

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // Limited to 2 octaves to eliminate jagged details and ensure broad, glassy waves
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 2; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    
    // Smooth upward animation speed
    float t = u_time * 0.22;
    
    // Slow gentle sideways sway of the flame body
    float sway = sin(uv.x * 2.5 + u_time * 0.45) * 0.07;
    
    // Domain warping noise layers (wider waves for blurry glass look)
    vec2 q = vec2(0.0);
    q.x = fbm(uv * 2.0 + vec2(0.0, -t));
    q.y = fbm(uv * 2.0 + vec2(t * 0.35, -t * 0.85));
    
    vec2 r = vec2(0.0);
    r.x = fbm(uv * 2.2 + 2.8 * q + vec2(1.7, -t * 1.5));
    r.y = fbm(uv * 2.2 + 2.8 * q + vec2(8.3, -t * 1.25));
    
    // Soft low-frequency noise (completely smoothed out)
    float f = fbm(uv * 1.05 + 1.65 * r);
    
    // Vertical flame base offset with swaying peaks (lowered base multiplier from 1.35 to 1.15)
    float fire = (1.0 - (uv.y + sway)) * 1.15; 
    
    // Volumetric flame thresholds with extremely wide smoothstep windows for a blurry look
    // Scale noise by (1.1 - uv.y) to suppress height and create gorgeous dark spots/channels at the top
    float noiseGlow = f * 1.65 * (1.1 - uv.y);
    float flameIntensity = fire + noiseGlow - 0.78;
    
    float flame = smoothstep(-0.25, 0.95, flameIntensity);
    float orangeGlow = smoothstep(0.12, 0.98, flameIntensity);
    float goldCore = smoothstep(0.38, 1.0, fire + f * 0.75 * (1.1 - uv.y) - 0.42);
    
    // Soft glowing volumetric smoke tips
    float smoke = smoothstep(-0.3, 0.45, flameIntensity) * (1.0 - smoothstep(0.45, 0.95, flameIntensity));
    
    // Warm fire color definitions (no harsh bright yellows or whites!)
    vec3 black = vec3(0.0, 0.0, 0.0);
    vec3 deepRed = vec3(0.55, 0.015, 0.0);
    vec3 brightOrange = vec3(0.92, 0.25, 0.0);
    vec3 goldenOrange = vec3(0.96, 0.42, 0.02);
    
    // Blending volumetric color layers for a blurry glass bonfire effect
    vec3 col = mix(black, deepRed, flame);
    col = mix(col, brightOrange, orangeGlow);
    col = mix(col, goldenOrange, goldCore);
    
    // Volumetric smoke tip glow for glowing depth
    col += deepRed * smoke * 0.35;
    
    // Edge hot glow edge highlighting (wider transition for blurry glow)
    float edge = smoothstep(0.25, 0.55, f) * (1.0 - smoothstep(0.55, 0.85, f));
    col += edge * brightOrange * 0.18 * (1.0 - uv.y);
    
    // Contrast boost
    col = pow(col, vec3(0.85));
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

const VORTEX_SHADER = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_dark;

  #define PI 3.14159265358979323846

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // Limited to 2 octaves to eliminate jagged details and ensure broad, unbroken, glassy silk waves
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 2; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    
    // Smooth fluid motion speed
    float t = u_time * 0.55;
    
    // Center of the vortex
    vec2 center = vec2(0.5);
    vec2 st = uv - center;
    st.x *= aspect;
    
    float dist = length(st);
    float angle = atan(st.y, st.x);
    
    // Natural fluid vortex swirl physics: decays smoothly away from center, damped at the absolute core to prevent breaking
    float swirl = 3.2 / (dist + 0.3);
    angle += swirl * 0.6 * smoothstep(0.04, 0.25, dist) + t * 0.3;
    
    // Smooth fluid radial ripples: damped near the center to prevent high-frequency coordinate tearing
    float rippleMask = smoothstep(0.08, 0.35, dist);
    dist += sin(angle * 2.0 - t * 1.2) * 0.015 * rippleMask * (1.0 - smoothstep(0.0, 0.9, dist));
    
    // Reconstruct twisted coordinates
    vec2 twisted = vec2(cos(angle), sin(angle)) * dist;
    twisted.x /= aspect;
    twisted += center;
    
    // Scale coordinates for large, beautiful topography waves
    vec2 flowCoord = twisted * 1.5;
    
    // Domain warping for natural marble fluid veins
    vec2 q = vec2(
      fbm(flowCoord - t * 0.04),
      fbm(flowCoord + vec2(5.2, 1.3) + t * 0.02)
    );
    
    vec2 r = flowCoord + q * 0.35;
    float f = fbm(r);
    
    // Generate continuous, unbroken contour lines with beautiful dense spacing to avoid empty areas
    float contour = sin(f * 18.0 - t * 1.2);
    
    // Pure monochrome black & white color scheme (no greys, vignettes, or halos)
    // u_dark = 1.0 -> White lines on Solid Black background
    // u_dark = 0.0 -> Black lines on Solid White background
    vec3 bgColor = mix(vec3(1.0), vec3(0.0), u_dark);
    vec3 lineColor = mix(vec3(0.0), vec3(1.0), u_dark);
    
    // Draw highly anti-aliased thin elegant lines (making them significantly thinner and sharper)
    float line = smoothstep(0.965, 0.985, abs(contour));
    
    // Blend strictly between background and line color
    vec3 col = mix(bgColor, lineColor, line);
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

const FRAGMENT_SHADERS = {
  mist: MIST_SHADER,
  lava: LAVA_SHADER,
  vortex: VORTEX_SHADER,
} as const;

export function AnimatedGradient({
  className,
  variant = "mist",
  speed = 1,
  opacity = 1,
  children,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShaderSource =
      FRAGMENT_SHADERS[variant] || FRAGMENT_SHADERS.mist;
    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const darkLocation = gl.getUniformLocation(program, "u_dark");

    const startTime = Date.now();

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      gl.uniform1f(timeLocation, elapsed * speed);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      if (darkLocation) {
        const isDark =
          document.documentElement.classList.contains("dark") ||
          document.documentElement.getAttribute("data-theme") === "dark" ||
          (!document.documentElement.classList.contains("light") &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);
        gl.uniform1f(darkLocation, isDark ? 1.0 : 0.0);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [variant, speed]);

  return (
    <div className={cn("relative overflow-hidden bg-white dark:bg-black", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity }} />
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
}
