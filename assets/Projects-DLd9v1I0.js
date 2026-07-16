import{r as u,j as e,L as N}from"./react-vendor-CF08uh4t.js";import{g}from"./gsap-DjKJqAo0.js";import{k as S,l as E,m as T,W as L,n as W,S as M,h as P,V as R}from"./three-C6eJ00YS.js";import{p as j,R as O,a as A,r as C}from"./index-DvpQo--b.js";import"./framer-Dwu6B6OR.js";const d={imageOne:"/images/imageOne.jpeg",imageTwo:"/images/imageTwo.jpeg",imageThree:"/images/imageThree.jpeg",imageFour:"/images/imageFour.jpeg"};var F=`uniform sampler2D uTexture;
uniform vec2 uOffset;
varying vec2 vUv;

float M_PI = 3.1415926535897932384626433832795;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
}

void main() {
    vUv = uv;
    vec3 newPosition = deformationCurve(position, uv, uOffset);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}`,H=`uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec2 uOffset;
varying vec2 vUv;

vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 offset) {
    float r = texture2D(textureimage, uv + offset).r;
    vec2 gb = texture2D(textureimage, uv).gb;
    return vec3(r, gb);
}

void main() {
    vec3 color = rgbShift(uTexture, vUv, uOffset);
    gl_FragColor = vec4(color, uAlpha);
}`;const _=()=>(u.useEffect(()=>{let r=0,s=0;const m=document.querySelector(".projects-section");if(!m)return;const h=[...document.querySelectorAll(".projects-list li")];if(h.length===0)return;const a=new S,x=[a.load(d.imageOne),a.load(d.imageTwo),a.load(d.imageThree),a.load(d.imageFour)],v=new E,l=new T(50,window.innerWidth/window.innerHeight,.1,1e3);l.position.z=1e3;const o=new L({alpha:!0});o.setSize(window.innerWidth,window.innerHeight),m.appendChild(o.domElement);const t={uTexture:{value:x[0]},uAlpha:{value:0},uOffset:{value:new R(0,0)}},b=new W(250,350,20,20),y=new M({uniforms:t,vertexShader:F,fragmentShader:H,transparent:!0}),i=new P(b,y);v.add(i);function p(n){r=n.clientX-window.innerWidth/2,s=-n.clientY+window.innerHeight/2}function f(){i.position.x+=(r-i.position.x)*.1,i.position.y+=(s-i.position.y)*.1,t.uOffset.value.set((r-i.position.x)*5e-4,-(s-i.position.y)*5e-4),o.render(v,l),requestAnimationFrame(f)}h.forEach((n,c)=>{n.addEventListener("mouseenter",()=>{t.uTexture.value=x[c],t.uAlpha.value=1}),n.addEventListener("mouseleave",()=>{t.uAlpha.value=0})}),window.addEventListener("mousemove",p),f();const w=()=>{const n=window.innerWidth,c=window.innerHeight;o.setSize(n,c),l.aspect=n/c,l.updateProjectionMatrix()};return window.addEventListener("resize",w),()=>{m.removeChild(o.domElement),window.removeEventListener("mousemove",p),window.removeEventListener("resize",w)}},[]),null),k=r=>String(r).padStart(2,"0"),q=()=>{const r=u.useRef(null);return u.useEffect(()=>{const s=g.context(()=>{g.fromTo(".works-row",{y:36,opacity:0},{y:0,opacity:1,duration:.8,ease:"power3.out",stagger:.08,delay:.15})});return()=>s.revert()},[]),e.jsxs("section",{className:"works projects-section",children:[e.jsxs("header",{className:"works-head section-shell",ref:r,children:[e.jsx("p",{className:"eyebrow",children:"The index"}),e.jsxs("h1",{className:"works-title",children:["Built and ",e.jsx("em",{children:"cut."})]}),e.jsx("p",{className:"works-intro",children:"Web builds first, film cuts after. Every entry here was designed, coded, or edited by one pair of hands. Hover a title to preview, click through for the detail."}),e.jsxs("ul",{className:"works-stats mono","aria-label":"Index totals",children:[e.jsxs("li",{children:[e.jsx("span",{children:"Web"}),e.jsx("b",{children:k(j.length)})]}),e.jsxs("li",{children:[e.jsx("span",{children:"Film"}),e.jsx("b",{children:k(C.length)})]}),e.jsxs("li",{children:[e.jsx("span",{children:"Range"}),e.jsx("b",{children:"2023 / 25"})]})]})]}),e.jsx("div",{className:"works-block section-shell",children:e.jsxs("div",{className:"section-index",children:[e.jsx("span",{className:"section-index-no mono",children:"01"}),e.jsx("span",{className:"eyebrow",children:"Web builds"}),e.jsx("span",{className:"section-index-rule","aria-hidden":"true"})]})}),e.jsx("ul",{className:"works-list projects-list section-shell",children:j.map(s=>e.jsx("li",{className:"works-row",children:e.jsxs(N,{to:`/works/${s.slug}`,className:"works-link",children:[e.jsx("span",{className:"works-index mono",children:s.index}),e.jsx("span",{className:"works-name",children:e.jsx("h2",{children:s.title})}),e.jsx("span",{className:"works-discipline mono",children:s.discipline}),e.jsx("span",{className:"works-year mono",children:s.year}),e.jsx("span",{className:"works-go","aria-hidden":"true",children:"→"})]})},s.slug))}),e.jsxs("div",{className:"works-block works-block--film section-shell",children:[e.jsxs("div",{className:"section-index",children:[e.jsx("span",{className:"section-index-no mono",children:"02"}),e.jsx("span",{className:"eyebrow",children:"Film cuts"}),e.jsx("span",{className:"section-index-rule","aria-hidden":"true"}),e.jsx("span",{className:"works-block-note mono",children:"Instagram Reels · 9:16"})]}),e.jsx(O,{as:"p",className:"works-block-sub",children:"Shot, cut, and graded by me. Hover to grade a frame in; click for sound."})]}),e.jsx(A,{embedded:!0}),e.jsx(_,{})]})};export{q as default};
