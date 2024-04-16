

var tangarVertex = `#version 300 es
in vec4 a_position;
in vec2 a_texcoord;

uniform vec2 u_screenSize;
uniform float u_zoom;
uniform vec2 u_camera;

out vec2 v_texcoord;

void main() {


	gl_Position = vec4(0.0,0.0,0.0,0.5);
	gl_Position.xy=  (a_position.xy*32.0-u_camera.xy)*u_zoom / u_screenSize;
	gl_PointSize = 32.0 * u_zoom;
	v_texcoord = vec2(a_texcoord[0]*32.0/4096.0,a_texcoord[1]*32.0/4096.0);
	gl_Position.z=0.09;
}
`;

var tangarFragment = `#version 300 es

precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_sampler;

out vec4 outColor;
//0.0078125
void main() {
	outColor = texture(u_sampler,vec2(gl_PointCoord[0]*0.00781 + v_texcoord[0],gl_PointCoord[1]*0.00781 + v_texcoord[1]));
	if(outColor.a<0.2){
		discard;
	}
	
}
`;

var tangarVertexShader = createShader(gl, gl.VERTEX_SHADER, tangarVertex);
var tangarFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, tangarFragment);
var tangarProgram = createProgram(gl, tangarVertexShader, tangarFragmentShader);

tangarShaderProgram = {
	attributes : {
		position : gl.getAttribLocation(tangarProgram, "a_position"),	
		texture : gl.getAttribLocation(tangarProgram, "a_texcoord"),
	},
	
	uniforms : {
		screenSize : gl.getUniformLocation(tangarProgram, "u_screenSize"),
		sampler : gl.getUniformLocation(tangarProgram, "u_sampler"),
		zoom : gl.getUniformLocation(tangarProgram, "u_zoom"),
		camera : gl.getUniformLocation(tangarProgram,"u_camera"),
	},
}






var tangarUIVertex = `#version 300 es
in vec4 a_position;
in vec3 a_color;

uniform vec2 u_screenSize;
uniform float u_zoom;
uniform vec2 u_camera;

out vec3 v_color;

void main() {


	gl_Position = vec4(0.0,0.0,0.0,0.5);
	gl_Position.xy=  (a_position.xy*32.0-u_camera.xy)*u_zoom / u_screenSize;
	gl_Position.z=0.05;
	gl_PointSize = 10.0 * u_zoom;
	v_color = a_color;
	
}
`;

var tangarUIFragment = `#version 300 es

precision highp float;

in vec3 v_color;

uniform sampler2D u_sampler;

out vec4 outColor;


void main() {
	outColor.rgb = v_color;
	outColor.a = 0.65;
	
}
`;

var tangarUIVertexShader = createShader(gl, gl.VERTEX_SHADER, tangarUIVertex);
var tangarUIFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, tangarUIFragment);
var tangarUIProgram = createProgram(gl, tangarUIVertexShader, tangarUIFragmentShader);

tangarUIShaderProgram = {
	attributes : {
		position : gl.getAttribLocation(tangarUIProgram, "a_position"),	
		color : gl.getAttribLocation(tangarUIProgram, "a_color"),
	},
	
	uniforms : {
		screenSize : gl.getUniformLocation(tangarUIProgram, "u_screenSize"),
		zoom : gl.getUniformLocation(tangarUIProgram, "u_zoom"),
		camera : gl.getUniformLocation(tangarUIProgram,"u_camera"),
	},
}


