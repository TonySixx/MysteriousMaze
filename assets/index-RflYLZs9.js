(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const El="167",$d=0,Pc=1,qd=2,wu=1,Kd=2,Un=3,Hn=0,Bt=1,Sn=2,kn=0,cs=1,ci=2,Ic=3,Lc=4,Yd=5,Ai=100,Jd=101,Zd=102,Qd=103,ef=104,tf=200,nf=201,sf=202,rf=203,Pa=204,Ia=205,of=206,af=207,lf=208,cf=209,hf=210,uf=211,df=212,ff=213,pf=214,mf=0,gf=1,_f=2,co=3,vf=4,xf=5,yf=6,Mf=7,Al=0,Sf=1,bf=2,ai=0,wf=1,Tf=2,Ef=3,Af=4,Rf=5,Cf=6,Pf=7,Dc="attached",If="detached",Tu=300,_s=301,vs=302,La=303,Da=304,So=306,wn=1e3,si=1001,ho=1002,Ot=1003,Eu=1004,qs=1005,Wt=1006,Zr=1007,On=1008,Vn=1009,Au=1010,Ru=1011,ar=1012,Rl=1013,Li=1014,cn=1015,zn=1016,Cl=1017,Pl=1018,xs=1020,Cu=35902,Pu=1021,Iu=1022,Qt=1023,Lu=1024,Du=1025,hs=1026,ys=1027,Il=1028,Ll=1029,Uu=1030,Dl=1031,Ul=1033,Qr=33776,eo=33777,to=33778,no=33779,Ua=35840,Na=35841,Oa=35842,Fa=35843,Ba=36196,ka=37492,za=37496,Ha=37808,Va=37809,Ga=37810,Wa=37811,ja=37812,Xa=37813,$a=37814,qa=37815,Ka=37816,Ya=37817,Ja=37818,Za=37819,Qa=37820,el=37821,io=36492,tl=36494,nl=36495,Nu=36283,il=36284,sl=36285,rl=36286,Ou=2200,Lf=2201,Df=2202,lr=2300,cr=2301,Wo=2302,rs=2400,os=2401,uo=2402,Nl=2500,Uf=2501,Nf=0,Fu=1,ol=2,Of=3200,Ff=3201,Ol=0,Bf=1,ni="",yt="srgb",Rt="srgb-linear",Fl="display-p3",bo="display-p3-linear",fo="linear",ot="srgb",po="rec709",mo="p3",Bi=7680,Uc=519,kf=512,zf=513,Hf=514,Bu=515,Vf=516,Gf=517,Wf=518,jf=519,al=35044,Nc="300 es",Fn=2e3,go=2001;class Di{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Oc=1234567;const Zs=Math.PI/180,Ms=180/Math.PI;function fn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ct[s&255]+Ct[s>>8&255]+Ct[s>>16&255]+Ct[s>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]).toLowerCase()}function Lt(s,e,t){return Math.max(e,Math.min(t,s))}function Bl(s,e){return(s%e+e)%e}function Xf(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function $f(s,e,t){return s!==e?(t-s)/(e-s):0}function Qs(s,e,t){return(1-t)*s+t*e}function qf(s,e,t,n){return Qs(s,e,1-Math.exp(-t*n))}function Kf(s,e=1){return e-Math.abs(Bl(s,e*2)-e)}function Yf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Jf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Zf(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Qf(s,e){return s+Math.random()*(e-s)}function ep(s){return s*(.5-Math.random())}function tp(s){s!==void 0&&(Oc=s);let e=Oc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function np(s){return s*Zs}function ip(s){return s*Ms}function sp(s){return(s&s-1)===0&&s!==0}function rp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function op(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ap(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ln(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function et(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const lp={DEG2RAD:Zs,RAD2DEG:Ms,generateUUID:fn,clamp:Lt,euclideanModulo:Bl,mapLinear:Xf,inverseLerp:$f,lerp:Qs,damp:qf,pingpong:Kf,smoothstep:Yf,smootherstep:Jf,randInt:Zf,randFloat:Qf,randFloatSpread:ep,seededRandom:tp,degToRad:np,radToDeg:ip,isPowerOfTwo:sp,ceilPowerOfTwo:rp,floorPowerOfTwo:op,setQuaternionFromProperEuler:ap,normalize:et,denormalize:ln};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oe{constructor(e,t,n,i,r,o,a,l,c){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],b=i[1],x=i[4],y=i[7],C=i[2],T=i[5],E=i[8];return r[0]=o*_+a*b+l*C,r[3]=o*m+a*x+l*T,r[6]=o*p+a*y+l*E,r[1]=c*_+h*b+u*C,r[4]=c*m+h*x+u*T,r[7]=c*p+h*y+u*E,r[2]=d*_+f*b+g*C,r[5]=d*m+f*x+g*T,r[8]=d*p+f*y+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(jo.makeScale(e,t)),this}rotate(e){return this.premultiply(jo.makeRotation(-e)),this}translate(e,t){return this.premultiply(jo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const jo=new Oe;function ku(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function hr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function cp(){const s=hr("canvas");return s.style.display="block",s}const Fc={};function us(s){s in Fc||(Fc[s]=!0,console.warn(s))}function hp(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Bc=new Oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),kc=new Oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Os={[Rt]:{transfer:fo,primaries:po,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s,fromReference:s=>s},[yt]:{transfer:ot,primaries:po,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[bo]:{transfer:fo,primaries:mo,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.applyMatrix3(kc),fromReference:s=>s.applyMatrix3(Bc)},[Fl]:{transfer:ot,primaries:mo,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.convertSRGBToLinear().applyMatrix3(kc),fromReference:s=>s.applyMatrix3(Bc).convertLinearToSRGB()}},up=new Set([Rt,bo]),Xe={enabled:!0,_workingColorSpace:Rt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!up.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=Os[e].toReference,i=Os[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Os[s].primaries},getTransfer:function(s){return s===ni?fo:Os[s].transfer},getLuminanceCoefficients:function(s,e=this._workingColorSpace){return s.fromArray(Os[e].luminanceCoefficients)}};function ds(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ki;class dp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ki===void 0&&(ki=hr("canvas")),ki.width=e.width,ki.height=e.height;const n=ki.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ki}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=hr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ds(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ds(t[n]/255)*255):t[n]=ds(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fp=0;class zu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=fn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push($o(i[o].image)):r.push($o(i[o]))}else r=$o(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function $o(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?dp.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let pp=0;class Tt extends Di{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=si,i=si,r=Wt,o=On,a=Qt,l=Vn,c=Tt.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=fn(),this.name="",this.source=new zu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wn:e.x=e.x-Math.floor(e.x);break;case si:e.x=e.x<0?0:1;break;case ho:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wn:e.y=e.y-Math.floor(e.y);break;case si:e.y=e.y<0?0:1;break;case ho:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Tu;Tt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,i=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(f+1)/2,C=(p+1)/2,T=(h+d)/4,E=(u+_)/4,R=(g+m)/4;return x>y&&x>C?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=T/n,r=E/n):y>C?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=T/i,r=R/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=E/r,i=R/r),this.set(n,i,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mp extends Di{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Tt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new zu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pn extends mp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Hu extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gp extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,b=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),T=Math.atan2(C,p*b);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}const y=a*b;if(l=l*m+d*y,c=c*m+f*y,h=h*m+g*y,u=u*m+_*y,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qo.copy(this).projectOnVector(e),this.sub(qo)}reflect(e){return this.sub(qo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qo=new L,zc=new mn;class Gn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,nn):nn.fromBufferAttribute(r,o),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Mr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mr.copy(n.boundingBox)),Mr.applyMatrix4(e.matrixWorld),this.union(Mr)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fs),Sr.subVectors(this.max,Fs),zi.subVectors(e.a,Fs),Hi.subVectors(e.b,Fs),Vi.subVectors(e.c,Fs),jn.subVectors(Hi,zi),Xn.subVectors(Vi,Hi),pi.subVectors(zi,Vi);let t=[0,-jn.z,jn.y,0,-Xn.z,Xn.y,0,-pi.z,pi.y,jn.z,0,-jn.x,Xn.z,0,-Xn.x,pi.z,0,-pi.x,-jn.y,jn.x,0,-Xn.y,Xn.x,0,-pi.y,pi.x,0];return!Ko(t,zi,Hi,Vi,Sr)||(t=[1,0,0,0,1,0,0,0,1],!Ko(t,zi,Hi,Vi,Sr))?!1:(br.crossVectors(jn,Xn),t=[br.x,br.y,br.z],Ko(t,zi,Hi,Vi,Sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Rn=[new L,new L,new L,new L,new L,new L,new L,new L],nn=new L,Mr=new Gn,zi=new L,Hi=new L,Vi=new L,jn=new L,Xn=new L,pi=new L,Fs=new L,Sr=new L,br=new L,mi=new L;function Ko(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){mi.fromArray(s,r);const a=i.x*Math.abs(mi.x)+i.y*Math.abs(mi.y)+i.z*Math.abs(mi.z),l=e.dot(mi),c=t.dot(mi),h=n.dot(mi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const _p=new Gn,Bs=new L,Yo=new L;class xn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):_p.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bs.subVectors(e,this.center);const t=Bs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Bs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bs.copy(e.center).add(Yo)),this.expandByPoint(Bs.copy(e.center).sub(Yo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Cn=new L,Jo=new L,wr=new L,$n=new L,Zo=new L,Tr=new L,Qo=new L;class dr{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Cn.copy(this.origin).addScaledVector(this.direction,t),Cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Jo.copy(e).add(t).multiplyScalar(.5),wr.copy(t).sub(e).normalize(),$n.copy(this.origin).sub(Jo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(wr),a=$n.dot(this.direction),l=-$n.dot(wr),c=$n.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Jo).addScaledVector(wr,d),f}intersectSphere(e,t){Cn.subVectors(e.center,this.origin);const n=Cn.dot(this.direction),i=Cn.dot(Cn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Cn)!==null}intersectTriangle(e,t,n,i,r){Zo.subVectors(t,e),Tr.subVectors(n,e),Qo.crossVectors(Zo,Tr);let o=this.direction.dot(Qo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$n.subVectors(this.origin,e);const l=a*this.direction.dot(Tr.crossVectors($n,Tr));if(l<0)return null;const c=a*this.direction.dot(Zo.cross($n));if(c<0||l+c>o)return null;const h=-a*$n.dot(Qo);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ie{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m){Ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ie().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Gi.setFromMatrixColumn(e,0).length(),r=1/Gi.setFromMatrixColumn(e,1).length(),o=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vp,e,xp)}lookAt(e,t,n){const i=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),qn.crossVectors(n,Ht),qn.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),qn.crossVectors(n,Ht)),qn.normalize(),Er.crossVectors(Ht,qn),i[0]=qn.x,i[4]=Er.x,i[8]=Ht.x,i[1]=qn.y,i[5]=Er.y,i[9]=Ht.y,i[2]=qn.z,i[6]=Er.z,i[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],x=n[7],y=n[11],C=n[15],T=i[0],E=i[4],R=i[8],M=i[12],v=i[1],P=i[5],F=i[9],O=i[13],H=i[2],X=i[6],V=i[10],J=i[14],G=i[3],le=i[7],de=i[11],_e=i[15];return r[0]=o*T+a*v+l*H+c*G,r[4]=o*E+a*P+l*X+c*le,r[8]=o*R+a*F+l*V+c*de,r[12]=o*M+a*O+l*J+c*_e,r[1]=h*T+u*v+d*H+f*G,r[5]=h*E+u*P+d*X+f*le,r[9]=h*R+u*F+d*V+f*de,r[13]=h*M+u*O+d*J+f*_e,r[2]=g*T+_*v+m*H+p*G,r[6]=g*E+_*P+m*X+p*le,r[10]=g*R+_*F+m*V+p*de,r[14]=g*M+_*O+m*J+p*_e,r[3]=b*T+x*v+y*H+C*G,r[7]=b*E+x*P+y*X+C*le,r[11]=b*R+x*F+y*V+C*de,r[15]=b*M+x*O+y*J+C*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,x=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,y=h*_*c-g*u*c+g*a*f-o*_*f-h*a*p+o*u*p,C=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,T=t*b+n*x+i*y+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return e[0]=b*E,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*E,e[2]=(a*m*r-_*l*r+_*i*c-n*m*c-a*i*p+n*l*p)*E,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*E,e[4]=x*E,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*E,e[6]=(g*l*r-o*m*r-g*i*c+t*m*c+o*i*p-t*l*p)*E,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*E,e[8]=y*E,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*E,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*p+t*a*p)*E,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*E,e[12]=C*E,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*E,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*m-t*a*m)*E,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,b=l*c,x=l*h,y=l*u,C=n.x,T=n.y,E=n.z;return i[0]=(1-(_+p))*C,i[1]=(f+y)*C,i[2]=(g-x)*C,i[3]=0,i[4]=(f-y)*T,i[5]=(1-(d+p))*T,i[6]=(m+b)*T,i[7]=0,i[8]=(g+x)*E,i[9]=(m-b)*E,i[10]=(1-(d+_))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Gi.set(i[0],i[1],i[2]).length();const o=Gi.set(i[4],i[5],i[6]).length(),a=Gi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],sn.copy(this);const c=1/r,h=1/o,u=1/a;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,t.setFromRotationMatrix(sn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Fn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(a===Fn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===go)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Fn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,f=(n+i)*h;let g,_;if(a===Fn)g=(o+r)*u,_=-2*u;else if(a===go)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Gi=new L,sn=new Ie,vp=new L(0,0,0),xp=new L(1,1,1),qn=new L,Er=new L,Ht=new L,Hc=new Ie,Vc=new mn;class vn{constructor(e=0,t=0,n=0,i=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vc.setFromEuler(this),this.setFromQuaternion(Vc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class kl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yp=0;const Gc=new L,Wi=new mn,Pn=new Ie,Ar=new L,ks=new L,Mp=new L,Sp=new mn,Wc=new L(1,0,0),jc=new L(0,1,0),Xc=new L(0,0,1),$c={type:"added"},bp={type:"removed"},ji={type:"childadded",child:null},ea={type:"childremoved",child:null};class ct extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ct.DEFAULT_UP.clone();const e=new L,t=new vn,n=new mn,i=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ie},normalMatrix:{value:new Oe}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(Wc,e)}rotateY(e){return this.rotateOnAxis(jc,e)}rotateZ(e){return this.rotateOnAxis(Xc,e)}translateOnAxis(e,t){return Gc.copy(e).applyQuaternion(this.quaternion),this.position.add(Gc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wc,e)}translateY(e){return this.translateOnAxis(jc,e)}translateZ(e){return this.translateOnAxis(Xc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ar.copy(e):Ar.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(ks,Ar,this.up):Pn.lookAt(Ar,ks,this.up),this.quaternion.setFromRotationMatrix(Pn),i&&(Pn.extractRotation(i.matrixWorld),Wi.setFromRotationMatrix(Pn),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($c),ji.child=e,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bp),ea.child=e,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($c),ji.child=e,this.dispatchEvent(ji),ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,Mp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,Sp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ct.DEFAULT_UP=new L(0,1,0);ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new L,In=new L,ta=new L,Ln=new L,Xi=new L,$i=new L,qc=new L,na=new L,ia=new L,sa=new L;class bn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),rn.subVectors(e,t),i.cross(rn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){rn.subVectors(i,t),In.subVectors(n,t),ta.subVectors(e,t);const o=rn.dot(rn),a=rn.dot(In),l=rn.dot(ta),c=In.dot(In),h=In.dot(ta),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ln.x),l.addScaledVector(o,Ln.y),l.addScaledVector(a,Ln.z),l)}static isFrontFacing(e,t,n,i){return rn.subVectors(n,t),In.subVectors(e,t),rn.cross(In).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),rn.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return bn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Xi.subVectors(i,n),$i.subVectors(r,n),na.subVectors(e,n);const l=Xi.dot(na),c=$i.dot(na);if(l<=0&&c<=0)return t.copy(n);ia.subVectors(e,i);const h=Xi.dot(ia),u=$i.dot(ia);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Xi,o);sa.subVectors(e,r);const f=Xi.dot(sa),g=$i.dot(sa);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector($i,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return qc.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(qc,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Xi,o).addScaledVector($i,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function ra(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Xe.workingColorSpace){if(e=Bl(e,1),t=Lt(t,0,1),n=Lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ra(o,r,e+1/3),this.g=ra(o,r,e),this.b=ra(o,r,e-1/3)}return Xe.toWorkingColorSpace(this,i),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=Vu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}copyLinearToSRGB(e){return this.r=Xo(e.r),this.g=Xo(e.g),this.b=Xo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return Xe.fromWorkingColorSpace(Pt.copy(this),e),Math.round(Lt(Pt.r*255,0,255))*65536+Math.round(Lt(Pt.g*255,0,255))*256+Math.round(Lt(Pt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.fromWorkingColorSpace(Pt.copy(this),t);const n=Pt.r,i=Pt.g,r=Pt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=yt){Xe.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,i=Pt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(Rr);const n=Qs(Kn.h,Rr.h,t),i=Qs(Kn.s,Rr.s,t),r=Qs(Kn.l,Rr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new xe;xe.NAMES=Vu;let wp=0;class gn extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=fn(),this.name="",this.type="Material",this.blending=cs,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pa,this.blendDst=Ia,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=co,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Uc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==cs&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==Ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==co&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Uc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class hn extends gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new L,Cr=new Se;class at{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=al,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return us("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXY(t,Cr.x,Cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ln(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ln(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ln(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ln(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ln(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==al&&(e.usage=this.usage),e}}class Gu extends at{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Wu extends at{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ht extends at{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Tp=0;const qt=new Ie,oa=new ct,qi=new L,Vt=new Gn,zs=new Gn,wt=new L;class pt extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=fn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ku(e)?Wu:Gu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Oe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return oa.lookAt(e),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ht(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];zs.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(Vt.min,zs.min),Vt.expandByPoint(wt),wt.addVectors(Vt.max,zs.max),Vt.expandByPoint(wt)):(Vt.expandByPoint(zs.min),Vt.expandByPoint(zs.max))}Vt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)wt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(wt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)wt.fromBufferAttribute(a,c),l&&(qi.fromBufferAttribute(e,c),wt.add(qi)),i=Math.max(i,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new at(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new L,l[R]=new L;const c=new L,h=new L,u=new L,d=new Se,f=new Se,g=new Se,_=new L,m=new L;function p(R,M,v){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[R].add(_),a[M].add(_),a[v].add(_),l[R].add(m),l[M].add(m),l[v].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let R=0,M=b.length;R<M;++R){const v=b[R],P=v.start,F=v.count;for(let O=P,H=P+F;O<H;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const x=new L,y=new L,C=new L,T=new L;function E(R){C.fromBufferAttribute(i,R),T.copy(C);const M=a[R];x.copy(M),x.sub(C.multiplyScalar(C.dot(M))).normalize(),y.crossVectors(T,M);const P=y.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,P)}for(let R=0,M=b.length;R<M;++R){const v=b[R],P=v.start,F=v.count;for(let O=P,H=P+F;O<H;O+=3)E(e.getX(O+0)),E(e.getX(O+1)),E(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new at(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new at(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kc=new Ie,gi=new dr,Pr=new xn,Yc=new L,Ki=new L,Yi=new L,Ji=new L,aa=new L,Ir=new L,Lr=new Se,Dr=new Se,Ur=new Se,Jc=new L,Zc=new L,Qc=new L,Nr=new L,Or=new L;class st extends ct{constructor(e=new pt,t=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Ir.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(aa.fromBufferAttribute(u,e),o?Ir.addScaledVector(aa,h):Ir.addScaledVector(aa.sub(t),h))}t.add(Ir)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Pr.copy(n.boundingSphere),Pr.applyMatrix4(r),gi.copy(e.ray).recast(e.near),!(Pr.containsPoint(gi.origin)===!1&&(gi.intersectSphere(Pr,Yc)===null||gi.origin.distanceToSquared(Yc)>(e.far-e.near)**2))&&(Kc.copy(r).invert(),gi.copy(e.ray).applyMatrix4(Kc),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=b,C=x;y<C;y+=3){const T=a.getX(y),E=a.getX(y+1),R=a.getX(y+2);i=Fr(this,p,e,n,c,h,u,T,E,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),x=a.getX(m+1),y=a.getX(m+2);i=Fr(this,o,e,n,c,h,u,b,x,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=b,C=x;y<C;y+=3){const T=y,E=y+1,R=y+2;i=Fr(this,p,e,n,c,h,u,T,E,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=m,x=m+1,y=m+2;i=Fr(this,o,e,n,c,h,u,b,x,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Ep(s,e,t,n,i,r,o,a){let l;if(e.side===Bt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Hn,a),l===null)return null;Or.copy(a),Or.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Or);return c<t.near||c>t.far?null:{distance:c,point:Or.clone(),object:s}}function Fr(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Ki),s.getVertexPosition(l,Yi),s.getVertexPosition(c,Ji);const h=Ep(s,e,t,n,Ki,Yi,Ji,Nr);if(h){i&&(Lr.fromBufferAttribute(i,a),Dr.fromBufferAttribute(i,l),Ur.fromBufferAttribute(i,c),h.uv=bn.getInterpolation(Nr,Ki,Yi,Ji,Lr,Dr,Ur,new Se)),r&&(Lr.fromBufferAttribute(r,a),Dr.fromBufferAttribute(r,l),Ur.fromBufferAttribute(r,c),h.uv1=bn.getInterpolation(Nr,Ki,Yi,Ji,Lr,Dr,Ur,new Se)),o&&(Jc.fromBufferAttribute(o,a),Zc.fromBufferAttribute(o,l),Qc.fromBufferAttribute(o,c),h.normal=bn.getInterpolation(Nr,Ki,Yi,Ji,Jc,Zc,Qc,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new L,materialIndex:0};bn.getNormal(Ki,Yi,Ji,u.normal),h.face=u}return h}class ui extends pt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(u,2));function g(_,m,p,b,x,y,C,T,E,R,M){const v=y/E,P=C/R,F=y/2,O=C/2,H=T/2,X=E+1,V=R+1;let J=0,G=0;const le=new L;for(let de=0;de<V;de++){const _e=de*P-O;for(let Ge=0;Ge<X;Ge++){const tt=Ge*v-F;le[_]=tt*b,le[m]=_e*x,le[p]=H,c.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[p]=T>0?1:-1,h.push(le.x,le.y,le.z),u.push(Ge/E),u.push(1-de/R),J+=1}}for(let de=0;de<R;de++)for(let _e=0;_e<E;_e++){const Ge=d+_e+X*de,tt=d+_e+X*(de+1),W=d+(_e+1)+X*(de+1),Z=d+(_e+1)+X*de;l.push(Ge,tt,Z),l.push(tt,W,Z),G+=6}a.addGroup(f,G,M),f+=G,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ss(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ut(s){const e={};for(let t=0;t<s.length;t++){const n=Ss(s[t]);for(const i in n)e[i]=n[i]}return e}function Ap(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function ju(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const _o={clone:Ss,merge:Ut};var Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ft extends gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ss(e.uniforms),this.uniformsGroups=Ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Xu extends ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=Fn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new L,eh=new Se,th=new Se;class Nt extends Xu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ms*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ms*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yn.x,Yn.y).multiplyScalar(-e/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-e/Yn.z)}getViewSize(e,t){return this.getViewBounds(e,eh,th),t.subVectors(th,eh)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Zi=-90,Qi=1;class Pp extends ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Nt(Zi,Qi,e,t);i.layers=this.layers,this.add(i);const r=new Nt(Zi,Qi,e,t);r.layers=this.layers,this.add(r);const o=new Nt(Zi,Qi,e,t);o.layers=this.layers,this.add(o);const a=new Nt(Zi,Qi,e,t);a.layers=this.layers,this.add(a);const l=new Nt(Zi,Qi,e,t);l.layers=this.layers,this.add(l);const c=new Nt(Zi,Qi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===go)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class $u extends Tt{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:_s,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ip extends pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new $u(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ui(5,5,5),r=new Ft({name:"CubemapFromEquirect",uniforms:Ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:kn});r.uniforms.tEquirect.value=t;const o=new st(i,r),a=t.minFilter;return t.minFilter===On&&(t.minFilter=Wt),new Pp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const la=new L,Lp=new L,Dp=new Oe;class bi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=la.subVectors(n,t).cross(Lp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(la),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Dp.getNormalMatrix(e),i=this.coplanarPoint(la).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new xn,Br=new L;class wo{constructor(e=new bi,t=new bi,n=new bi,i=new bi,r=new bi,o=new bi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],b=i[13],x=i[14],y=i[15];if(n[0].setComponents(l-r,d-c,m-f,y-p).normalize(),n[1].setComponents(l+r,d+c,m+f,y+p).normalize(),n[2].setComponents(l+o,d+h,m+g,y+b).normalize(),n[3].setComponents(l-o,d-h,m-g,y-b).normalize(),n[4].setComponents(l-a,d-u,m-_,y-x).normalize(),t===Fn)n[5].setComponents(l+a,d+u,m+_,y+x).normalize();else if(t===go)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Br.x=i.normal.x>0?e.max.x:e.min.x,Br.y=i.normal.y>0?e.max.y:e.min.y,Br.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Br)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qu(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Up(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(s.bindBuffer(c,a),u.count===-1&&d.length===0&&s.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class hi extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const b=p*d-o;for(let x=0;x<c;x++){const y=x*u-r;g.push(y,-b,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const x=b+c*p,y=b+c*(p+1),C=b+1+c*(p+1),T=b+1+c*p;f.push(x,y,T),f.push(y,C,T)}this.setIndex(f),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Np=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Op=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$p=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Kp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,em=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,im=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,sm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,om=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,um="gl_FragColor = linearToOutputTexel( gl_FragColor );",dm=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_m=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ym=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Em=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Am=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Rm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Im=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Dm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Um=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Nm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Om=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,km=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$m=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Km=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ym=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Jm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ig=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ug=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Eg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ag=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ug=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ng=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$g=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,t_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,n_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,r_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,c_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,h_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,d_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,f_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:Np,alphahash_pars_fragment:Op,alphamap_fragment:Fp,alphamap_pars_fragment:Bp,alphatest_fragment:kp,alphatest_pars_fragment:zp,aomap_fragment:Hp,aomap_pars_fragment:Vp,batching_pars_vertex:Gp,batching_vertex:Wp,begin_vertex:jp,beginnormal_vertex:Xp,bsdfs:$p,iridescence_fragment:qp,bumpmap_pars_fragment:Kp,clipping_planes_fragment:Yp,clipping_planes_pars_fragment:Jp,clipping_planes_pars_vertex:Zp,clipping_planes_vertex:Qp,color_fragment:em,color_pars_fragment:tm,color_pars_vertex:nm,color_vertex:im,common:sm,cube_uv_reflection_fragment:rm,defaultnormal_vertex:om,displacementmap_pars_vertex:am,displacementmap_vertex:lm,emissivemap_fragment:cm,emissivemap_pars_fragment:hm,colorspace_fragment:um,colorspace_pars_fragment:dm,envmap_fragment:fm,envmap_common_pars_fragment:pm,envmap_pars_fragment:mm,envmap_pars_vertex:gm,envmap_physical_pars_fragment:Am,envmap_vertex:_m,fog_vertex:vm,fog_pars_vertex:xm,fog_fragment:ym,fog_pars_fragment:Mm,gradientmap_pars_fragment:Sm,lightmap_pars_fragment:bm,lights_lambert_fragment:wm,lights_lambert_pars_fragment:Tm,lights_pars_begin:Em,lights_toon_fragment:Rm,lights_toon_pars_fragment:Cm,lights_phong_fragment:Pm,lights_phong_pars_fragment:Im,lights_physical_fragment:Lm,lights_physical_pars_fragment:Dm,lights_fragment_begin:Um,lights_fragment_maps:Nm,lights_fragment_end:Om,logdepthbuf_fragment:Fm,logdepthbuf_pars_fragment:Bm,logdepthbuf_pars_vertex:km,logdepthbuf_vertex:zm,map_fragment:Hm,map_pars_fragment:Vm,map_particle_fragment:Gm,map_particle_pars_fragment:Wm,metalnessmap_fragment:jm,metalnessmap_pars_fragment:Xm,morphinstance_vertex:$m,morphcolor_vertex:qm,morphnormal_vertex:Km,morphtarget_pars_vertex:Ym,morphtarget_vertex:Jm,normal_fragment_begin:Zm,normal_fragment_maps:Qm,normal_pars_fragment:eg,normal_pars_vertex:tg,normal_vertex:ng,normalmap_pars_fragment:ig,clearcoat_normal_fragment_begin:sg,clearcoat_normal_fragment_maps:rg,clearcoat_pars_fragment:og,iridescence_pars_fragment:ag,opaque_fragment:lg,packing:cg,premultiplied_alpha_fragment:hg,project_vertex:ug,dithering_fragment:dg,dithering_pars_fragment:fg,roughnessmap_fragment:pg,roughnessmap_pars_fragment:mg,shadowmap_pars_fragment:gg,shadowmap_pars_vertex:_g,shadowmap_vertex:vg,shadowmask_pars_fragment:xg,skinbase_vertex:yg,skinning_pars_vertex:Mg,skinning_vertex:Sg,skinnormal_vertex:bg,specularmap_fragment:wg,specularmap_pars_fragment:Tg,tonemapping_fragment:Eg,tonemapping_pars_fragment:Ag,transmission_fragment:Rg,transmission_pars_fragment:Cg,uv_pars_fragment:Pg,uv_pars_vertex:Ig,uv_vertex:Lg,worldpos_vertex:Dg,background_vert:Ug,background_frag:Ng,backgroundCube_vert:Og,backgroundCube_frag:Fg,cube_vert:Bg,cube_frag:kg,depth_vert:zg,depth_frag:Hg,distanceRGBA_vert:Vg,distanceRGBA_frag:Gg,equirect_vert:Wg,equirect_frag:jg,linedashed_vert:Xg,linedashed_frag:$g,meshbasic_vert:qg,meshbasic_frag:Kg,meshlambert_vert:Yg,meshlambert_frag:Jg,meshmatcap_vert:Zg,meshmatcap_frag:Qg,meshnormal_vert:e_,meshnormal_frag:t_,meshphong_vert:n_,meshphong_frag:i_,meshphysical_vert:s_,meshphysical_frag:r_,meshtoon_vert:o_,meshtoon_frag:a_,points_vert:l_,points_frag:c_,shadow_vert:h_,shadow_frag:u_,sprite_vert:d_,sprite_frag:f_},ie={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},Mn={basic:{uniforms:Ut([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Ut([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new xe(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Ut([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Ut([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Ut([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new xe(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Ut([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Ut([ie.points,ie.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Ut([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Ut([ie.common,ie.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Ut([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Ut([ie.sprite,ie.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Ut([ie.common,ie.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Ut([ie.lights,ie.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Mn.physical={uniforms:Ut([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const kr={r:0,b:0,g:0},vi=new vn,p_=new Ie;function m_(s,e,t,n,i,r,o){const a=new xe(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?t:e).get(x)),x}function _(b){let x=!1;const y=g(b);y===null?p(a,l):y&&y.isColor&&(p(y,1),x=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(b,x){const y=g(x);y&&(y.isCubeTexture||y.mapping===So)?(h===void 0&&(h=new st(new ui(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:Ss(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),vi.copy(x.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(p_.makeRotationFromEuler(vi)),h.material.toneMapped=Xe.getTransfer(y.colorSpace)!==ot,(u!==y||d!==y.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=s.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new st(new hi(2,2),new Ft({name:"BackgroundMaterial",uniforms:Ss(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Xe.getTransfer(y.colorSpace)!==ot,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,f=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,x){b.getRGB(kr,ju(s)),n.buffers.color.setClear(kr.r,kr.g,kr.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(b,x=1){a.set(b),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:_,addToRenderList:m}}function g_(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(v,P,F,O,H){let X=!1;const V=u(O,F,P);r!==V&&(r=V,c(r.object)),X=f(v,O,F,H),X&&g(v,O,F,H),H!==null&&e.update(H,s.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,y(v,P,F,O),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return s.createVertexArray()}function c(v){return s.bindVertexArray(v)}function h(v){return s.deleteVertexArray(v)}function u(v,P,F){const O=F.wireframe===!0;let H=n[v.id];H===void 0&&(H={},n[v.id]=H);let X=H[P.id];X===void 0&&(X={},H[P.id]=X);let V=X[O];return V===void 0&&(V=d(l()),X[O]=V),V}function d(v){const P=[],F=[],O=[];for(let H=0;H<t;H++)P[H]=0,F[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:O,object:v,attributes:{},index:null}}function f(v,P,F,O){const H=r.attributes,X=P.attributes;let V=0;const J=F.getAttributes();for(const G in J)if(J[G].location>=0){const de=H[G];let _e=X[G];if(_e===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(_e=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(_e=v.instanceColor)),de===void 0||de.attribute!==_e||_e&&de.data!==_e.data)return!0;V++}return r.attributesNum!==V||r.index!==O}function g(v,P,F,O){const H={},X=P.attributes;let V=0;const J=F.getAttributes();for(const G in J)if(J[G].location>=0){let de=X[G];de===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(de=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(de=v.instanceColor));const _e={};_e.attribute=de,de&&de.data&&(_e.data=de.data),H[G]=_e,V++}r.attributes=H,r.attributesNum=V,r.index=O}function _(){const v=r.newAttributes;for(let P=0,F=v.length;P<F;P++)v[P]=0}function m(v){p(v,0)}function p(v,P){const F=r.newAttributes,O=r.enabledAttributes,H=r.attributeDivisors;F[v]=1,O[v]===0&&(s.enableVertexAttribArray(v),O[v]=1),H[v]!==P&&(s.vertexAttribDivisor(v,P),H[v]=P)}function b(){const v=r.newAttributes,P=r.enabledAttributes;for(let F=0,O=P.length;F<O;F++)P[F]!==v[F]&&(s.disableVertexAttribArray(F),P[F]=0)}function x(v,P,F,O,H,X,V){V===!0?s.vertexAttribIPointer(v,P,F,H,X):s.vertexAttribPointer(v,P,F,O,H,X)}function y(v,P,F,O){_();const H=O.attributes,X=F.getAttributes(),V=P.defaultAttributeValues;for(const J in X){const G=X[J];if(G.location>=0){let le=H[J];if(le===void 0&&(J==="instanceMatrix"&&v.instanceMatrix&&(le=v.instanceMatrix),J==="instanceColor"&&v.instanceColor&&(le=v.instanceColor)),le!==void 0){const de=le.normalized,_e=le.itemSize,Ge=e.get(le);if(Ge===void 0)continue;const tt=Ge.buffer,W=Ge.type,Z=Ge.bytesPerElement,pe=W===s.INT||W===s.UNSIGNED_INT||le.gpuType===Rl;if(le.isInterleavedBufferAttribute){const he=le.data,Le=he.stride,Fe=le.offset;if(he.isInstancedInterleavedBuffer){for(let He=0;He<G.locationSize;He++)p(G.location+He,he.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let He=0;He<G.locationSize;He++)m(G.location+He);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let He=0;He<G.locationSize;He++)x(G.location+He,_e/G.locationSize,W,de,Le*Z,(Fe+_e/G.locationSize*He)*Z,pe)}else{if(le.isInstancedBufferAttribute){for(let he=0;he<G.locationSize;he++)p(G.location+he,le.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let he=0;he<G.locationSize;he++)m(G.location+he);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let he=0;he<G.locationSize;he++)x(G.location+he,_e/G.locationSize,W,de,_e*Z,_e/G.locationSize*he*Z,pe)}}else if(V!==void 0){const de=V[J];if(de!==void 0)switch(de.length){case 2:s.vertexAttrib2fv(G.location,de);break;case 3:s.vertexAttrib3fv(G.location,de);break;case 4:s.vertexAttrib4fv(G.location,de);break;default:s.vertexAttrib1fv(G.location,de)}}}}b()}function C(){R();for(const v in n){const P=n[v];for(const F in P){const O=P[F];for(const H in O)h(O[H].object),delete O[H];delete P[F]}delete n[v]}}function T(v){if(n[v.id]===void 0)return;const P=n[v.id];for(const F in P){const O=P[F];for(const H in O)h(O[H].object),delete O[H];delete P[F]}delete n[v.id]}function E(v){for(const P in n){const F=n[P];if(F[v.id]===void 0)continue;const O=F[v.id];for(const H in O)h(O[H].object),delete O[H];delete F[v.id]}}function R(){M(),o=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function __(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function v_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==Qt&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const E=T===zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Vn&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==cn&&!E)}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,C=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:y,maxSamples:C}}function x_(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new bi,a=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const b=r?0:n,x=b*4;let y=p.clippingState||null;l.value=y,y=h(g,d,x,f);for(let C=0;C!==x;++C)y[C]=t[C];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,y=f;x!==_;++x,y+=4)o.copy(u[x]).applyMatrix4(b,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function y_(s){let e=new WeakMap;function t(o,a){return a===La?o.mapping=_s:a===Da&&(o.mapping=vs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===La||a===Da)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ip(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class To extends Xu{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const as=4,nh=[.125,.215,.35,.446,.526,.582],Ri=20,ca=new To,ih=new xe;let ha=null,ua=0,da=0,fa=!1;const wi=(1+Math.sqrt(5))/2,es=1/wi,sh=[new L(-wi,es,0),new L(wi,es,0),new L(-es,0,wi),new L(es,0,wi),new L(0,wi,-es),new L(0,wi,es),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class rh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ha=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),da=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ah(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ha,ua,da),this._renderer.xr.enabled=fa,e.scissorTest=!1,zr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_s||e.mapping===vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ha=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),da=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:zn,format:Qt,colorSpace:Rt,depthBuffer:!1},i=oh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=M_(r)),this._blurMaterial=S_(r,e,t)}return i}_compileMaterial(e){const t=new st(this._lodPlanes[0],e);this._renderer.compile(t,ca)}_sceneToCubeUV(e,t,n,i){const a=new Nt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ih),h.toneMapping=ai,h.autoClear=!1;const f=new hn({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),g=new st(new ui,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(ih),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;zr(i,b*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===_s||e.mapping===vs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=lh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ah());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new st(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;zr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ca)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=sh[(i-r-1)%sh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new st(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ri-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ri;m>Ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ri}`);const p=[];let b=0;for(let E=0;E<Ri;++E){const R=E/_,M=Math.exp(-R*R/2);p.push(M),E===0?b+=M:E<m&&(b+=2*M)}for(let E=0;E<p.length;E++)p[E]=p[E]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const y=this._sizeLods[i],C=3*y*(i>x-as?i-x+as:0),T=4*(this._cubeSize-y);zr(t,C,T,3*y,2*y),l.setRenderTarget(t),l.render(u,ca)}}function M_(s){const e=[],t=[],n=[];let i=s;const r=s-as+1+nh.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-as?l=nh[o-s+as-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*f),x=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,R=T>2?0:-1,M=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];b.set(M,_*g*T),x.set(d,m*g*T);const v=[T,T,T,T,T,T];y.set(v,p*g*T)}const C=new pt;C.setAttribute("position",new at(b,_)),C.setAttribute("uv",new at(x,m)),C.setAttribute("faceIndex",new at(y,p)),e.push(C),i>as&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function oh(s,e,t){const n=new pn(s,e,t);return n.texture.mapping=So,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function S_(s,e,t){const n=new Float32Array(Ri),i=new L(0,1,0);return new Ft({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function ah(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function lh(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function zl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function b_(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===La||l===Da,h=l===_s||l===vs;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new rh(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new rh(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function w_(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&us("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function T_(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const b=f.array;_=f.version;for(let x=0,y=b.length;x<y;x+=3){const C=b[x+0],T=b[x+1],E=b[x+2];d.push(C,T,T,E,E,C)}}else if(g!==void 0){const b=g.array;_=g.version;for(let x=0,y=b.length/3-1;x<y;x+=3){const C=x+0,T=x+1,E=x+2;d.push(C,T,T,E,E,C)}}else return;const m=new(ku(d)?Wu:Gu)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function E_(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b];for(let b=0;b<_.length;b++)t.update(p,n,_[b])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function A_(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function R_(s,e,t){const n=new WeakMap,i=new it;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let x=0;f===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let y=a.attributes.position.count*x,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const T=new Float32Array(y*C*4*u),E=new Hu(T,y,C,u);E.type=cn,E.needsUpdate=!0;const R=x*4;for(let v=0;v<u;v++){const P=m[v],F=p[v],O=b[v],H=y*C*4*v;for(let X=0;X<P.count;X++){const V=X*R;f===!0&&(i.fromBufferAttribute(P,X),T[H+V+0]=i.x,T[H+V+1]=i.y,T[H+V+2]=i.z,T[H+V+3]=0),g===!0&&(i.fromBufferAttribute(F,X),T[H+V+4]=i.x,T[H+V+5]=i.y,T[H+V+6]=i.z,T[H+V+7]=0),_===!0&&(i.fromBufferAttribute(O,X),T[H+V+8]=i.x,T[H+V+9]=i.y,T[H+V+10]=i.z,T[H+V+11]=O.itemSize===4?i.w:1)}}d={count:u,texture:E,size:new Se(y,C)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function C_(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Ku extends Tt{constructor(e,t,n,i,r,o,a,l,c,h=hs){if(h!==hs&&h!==ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===hs&&(n=Li),n===void 0&&h===ys&&(n=xs),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ot,this.minFilter=l!==void 0?l:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Yu=new Tt,ch=new Ku(1,1),Ju=new Hu,Zu=new gp,Qu=new $u,hh=[],uh=[],dh=new Float32Array(16),fh=new Float32Array(9),ph=new Float32Array(4);function Ps(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=hh[i];if(r===void 0&&(r=new Float32Array(i),hh[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Mt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function St(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Eo(s,e){let t=uh[e];t===void 0&&(t=new Int32Array(e),uh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function P_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function I_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;s.uniform2fv(this.addr,e),St(t,e)}}function L_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;s.uniform3fv(this.addr,e),St(t,e)}}function D_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;s.uniform4fv(this.addr,e),St(t,e)}}function U_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;ph.set(n),s.uniformMatrix2fv(this.addr,!1,ph),St(t,n)}}function N_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;fh.set(n),s.uniformMatrix3fv(this.addr,!1,fh),St(t,n)}}function O_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;dh.set(n),s.uniformMatrix4fv(this.addr,!1,dh),St(t,n)}}function F_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function B_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;s.uniform2iv(this.addr,e),St(t,e)}}function k_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;s.uniform3iv(this.addr,e),St(t,e)}}function z_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;s.uniform4iv(this.addr,e),St(t,e)}}function H_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function V_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;s.uniform2uiv(this.addr,e),St(t,e)}}function G_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;s.uniform3uiv(this.addr,e),St(t,e)}}function W_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;s.uniform4uiv(this.addr,e),St(t,e)}}function j_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(ch.compareFunction=Bu,r=ch):r=Yu,t.setTexture2D(e||r,i)}function X_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Zu,i)}function $_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Qu,i)}function q_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ju,i)}function K_(s){switch(s){case 5126:return P_;case 35664:return I_;case 35665:return L_;case 35666:return D_;case 35674:return U_;case 35675:return N_;case 35676:return O_;case 5124:case 35670:return F_;case 35667:case 35671:return B_;case 35668:case 35672:return k_;case 35669:case 35673:return z_;case 5125:return H_;case 36294:return V_;case 36295:return G_;case 36296:return W_;case 35678:case 36198:case 36298:case 36306:case 35682:return j_;case 35679:case 36299:case 36307:return X_;case 35680:case 36300:case 36308:case 36293:return $_;case 36289:case 36303:case 36311:case 36292:return q_}}function Y_(s,e){s.uniform1fv(this.addr,e)}function J_(s,e){const t=Ps(e,this.size,2);s.uniform2fv(this.addr,t)}function Z_(s,e){const t=Ps(e,this.size,3);s.uniform3fv(this.addr,t)}function Q_(s,e){const t=Ps(e,this.size,4);s.uniform4fv(this.addr,t)}function e0(s,e){const t=Ps(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function t0(s,e){const t=Ps(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function n0(s,e){const t=Ps(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function i0(s,e){s.uniform1iv(this.addr,e)}function s0(s,e){s.uniform2iv(this.addr,e)}function r0(s,e){s.uniform3iv(this.addr,e)}function o0(s,e){s.uniform4iv(this.addr,e)}function a0(s,e){s.uniform1uiv(this.addr,e)}function l0(s,e){s.uniform2uiv(this.addr,e)}function c0(s,e){s.uniform3uiv(this.addr,e)}function h0(s,e){s.uniform4uiv(this.addr,e)}function u0(s,e,t){const n=this.cache,i=e.length,r=Eo(t,i);Mt(n,r)||(s.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Yu,r[o])}function d0(s,e,t){const n=this.cache,i=e.length,r=Eo(t,i);Mt(n,r)||(s.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Zu,r[o])}function f0(s,e,t){const n=this.cache,i=e.length,r=Eo(t,i);Mt(n,r)||(s.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Qu,r[o])}function p0(s,e,t){const n=this.cache,i=e.length,r=Eo(t,i);Mt(n,r)||(s.uniform1iv(this.addr,r),St(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Ju,r[o])}function m0(s){switch(s){case 5126:return Y_;case 35664:return J_;case 35665:return Z_;case 35666:return Q_;case 35674:return e0;case 35675:return t0;case 35676:return n0;case 5124:case 35670:return i0;case 35667:case 35671:return s0;case 35668:case 35672:return r0;case 35669:case 35673:return o0;case 5125:return a0;case 36294:return l0;case 36295:return c0;case 36296:return h0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return d0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return p0}}class g0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=K_(t.type)}}class _0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=m0(t.type)}}class v0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const pa=/(\w+)(\])?(\[|\.)?/g;function mh(s,e){s.seq.push(e),s.map[e.id]=e}function x0(s,e,t){const n=s.name,i=n.length;for(pa.lastIndex=0;;){const r=pa.exec(n),o=pa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){mh(t,c===void 0?new g0(a,s,e):new _0(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new v0(a),mh(t,u)),t=u}}}class so{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);x0(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function gh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const y0=37297;let M0=0;function S0(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function b0(s){const e=Xe.getPrimaries(Xe.workingColorSpace),t=Xe.getPrimaries(s);let n;switch(e===t?n="":e===mo&&t===po?n="LinearDisplayP3ToLinearSRGB":e===po&&t===mo&&(n="LinearSRGBToLinearDisplayP3"),s){case Rt:case bo:return[n,"LinearTransferOETF"];case yt:case Fl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function _h(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+S0(s.getShaderSource(e),o)}else return i}function w0(s,e){const t=b0(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function T0(s,e){let t;switch(e){case wf:t="Linear";break;case Tf:t="Reinhard";break;case Ef:t="OptimizedCineon";break;case Af:t="ACESFilmic";break;case Cf:t="AgX";break;case Pf:t="Neutral";break;case Rf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Hr=new L;function E0(){Xe.getLuminanceCoefficients(Hr);const s=Hr.x.toFixed(4),e=Hr.y.toFixed(4),t=Hr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function R0(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function C0(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Ks(s){return s!==""}function vh(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xh(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const P0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ll(s){return s.replace(P0,L0)}const I0=new Map;function L0(s,e){let t=Ne[e];if(t===void 0){const n=I0.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ll(t)}const D0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yh(s){return s.replace(D0,U0)}function U0(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Mh(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function N0(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===wu?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Kd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Un&&(e="SHADOWMAP_TYPE_VSM"),e}function O0(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case _s:case vs:e="ENVMAP_TYPE_CUBE";break;case So:e="ENVMAP_TYPE_CUBE_UV";break}return e}function F0(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case vs:e="ENVMAP_MODE_REFRACTION";break}return e}function B0(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Al:e="ENVMAP_BLENDING_MULTIPLY";break;case Sf:e="ENVMAP_BLENDING_MIX";break;case bf:e="ENVMAP_BLENDING_ADD";break}return e}function k0(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function z0(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=N0(t),c=O0(t),h=F0(t),u=B0(t),d=k0(t),f=A0(t),g=R0(r),_=i.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ks).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ks).join(`
`),p.length>0&&(p+=`
`)):(m=[Mh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),p=[Mh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?Ne.tonemapping_pars_fragment:"",t.toneMapping!==ai?T0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,w0("linearToOutputTexel",t.outputColorSpace),E0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),o=ll(o),o=vh(o,t),o=xh(o,t),a=ll(a),a=vh(a,t),a=xh(a,t),o=yh(o),a=yh(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=b+m+o,y=b+p+a,C=gh(i,i.VERTEX_SHADER,x),T=gh(i,i.FRAGMENT_SHADER,y);i.attachShader(_,C),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(P){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(C).trim(),H=i.getShaderInfoLog(T).trim();let X=!0,V=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,C,T);else{const J=_h(i,C,"vertex"),G=_h(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+J+`
`+G)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(O===""||H==="")&&(V=!1);V&&(P.diagnostics={runnable:X,programLog:F,vertexShader:{log:O,prefix:m},fragmentShader:{log:H,prefix:p}})}i.deleteShader(C),i.deleteShader(T),R=new so(i,_),M=C0(i,_)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(_,y0)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=M0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}let H0=0;class V0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new G0(e),t.set(e,n)),n}}class G0{constructor(e){this.id=H0++,this.code=e,this.usedTimes=0}}function W0(s,e,t,n,i,r,o){const a=new kl,l=new V0,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,v,P,F,O){const H=F.fog,X=O.geometry,V=M.isMeshStandardMaterial?F.environment:null,J=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),G=J&&J.mapping===So?J.image.height:null,le=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const de=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,_e=de!==void 0?de.length:0;let Ge=0;X.morphAttributes.position!==void 0&&(Ge=1),X.morphAttributes.normal!==void 0&&(Ge=2),X.morphAttributes.color!==void 0&&(Ge=3);let tt,W,Z,pe;if(le){const $e=Mn[le];tt=$e.vertexShader,W=$e.fragmentShader}else tt=M.vertexShader,W=M.fragmentShader,l.update(M),Z=l.getVertexShaderID(M),pe=l.getFragmentShaderID(M);const he=s.getRenderTarget(),Le=O.isInstancedMesh===!0,Fe=O.isBatchedMesh===!0,He=!!M.map,ut=!!M.matcap,I=!!J,mt=!!M.aoMap,Qe=!!M.lightMap,nt=!!M.bumpMap,ye=!!M.normalMap,gt=!!M.displacementMap,Ce=!!M.emissiveMap,De=!!M.metalnessMap,A=!!M.roughnessMap,S=M.anisotropy>0,z=M.clearcoat>0,K=M.dispersion>0,Y=M.iridescence>0,q=M.sheen>0,be=M.transmission>0,se=S&&!!M.anisotropyMap,ue=z&&!!M.clearcoatMap,Ue=z&&!!M.clearcoatNormalMap,Q=z&&!!M.clearcoatRoughnessMap,ce=Y&&!!M.iridescenceMap,We=Y&&!!M.iridescenceThicknessMap,Re=q&&!!M.sheenColorMap,fe=q&&!!M.sheenRoughnessMap,Pe=!!M.specularMap,Be=!!M.specularColorMap,lt=!!M.specularIntensityMap,D=be&&!!M.transmissionMap,ee=be&&!!M.thicknessMap,j=!!M.gradientMap,$=!!M.alphaMap,ne=M.alphaTest>0,Te=!!M.alphaHash,je=!!M.extensions;let _t=ai;M.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(_t=s.toneMapping);const Et={shaderID:le,shaderType:M.type,shaderName:M.name,vertexShader:tt,fragmentShader:W,defines:M.defines,customVertexShaderID:Z,customFragmentShaderID:pe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&O._colorsTexture!==null,instancing:Le,instancingColor:Le&&O.instanceColor!==null,instancingMorph:Le&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?s.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Rt,alphaToCoverage:!!M.alphaToCoverage,map:He,matcap:ut,envMap:I,envMapMode:I&&J.mapping,envMapCubeUVHeight:G,aoMap:mt,lightMap:Qe,bumpMap:nt,normalMap:ye,displacementMap:d&&gt,emissiveMap:Ce,normalMapObjectSpace:ye&&M.normalMapType===Bf,normalMapTangentSpace:ye&&M.normalMapType===Ol,metalnessMap:De,roughnessMap:A,anisotropy:S,anisotropyMap:se,clearcoat:z,clearcoatMap:ue,clearcoatNormalMap:Ue,clearcoatRoughnessMap:Q,dispersion:K,iridescence:Y,iridescenceMap:ce,iridescenceThicknessMap:We,sheen:q,sheenColorMap:Re,sheenRoughnessMap:fe,specularMap:Pe,specularColorMap:Be,specularIntensityMap:lt,transmission:be,transmissionMap:D,thicknessMap:ee,gradientMap:j,opaque:M.transparent===!1&&M.blending===cs&&M.alphaToCoverage===!1,alphaMap:$,alphaTest:ne,alphaHash:Te,combine:M.combine,mapUv:He&&_(M.map.channel),aoMapUv:mt&&_(M.aoMap.channel),lightMapUv:Qe&&_(M.lightMap.channel),bumpMapUv:nt&&_(M.bumpMap.channel),normalMapUv:ye&&_(M.normalMap.channel),displacementMapUv:gt&&_(M.displacementMap.channel),emissiveMapUv:Ce&&_(M.emissiveMap.channel),metalnessMapUv:De&&_(M.metalnessMap.channel),roughnessMapUv:A&&_(M.roughnessMap.channel),anisotropyMapUv:se&&_(M.anisotropyMap.channel),clearcoatMapUv:ue&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Ue&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:We&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:fe&&_(M.sheenRoughnessMap.channel),specularMapUv:Pe&&_(M.specularMap.channel),specularColorMapUv:Be&&_(M.specularColorMap.channel),specularIntensityMapUv:lt&&_(M.specularIntensityMap.channel),transmissionMapUv:D&&_(M.transmissionMap.channel),thicknessMapUv:ee&&_(M.thicknessMap.channel),alphaMapUv:$&&_(M.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(ye||S),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!X.attributes.uv&&(He||$),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:O.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Ge,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:_t,decodeVideoTexture:He&&M.map.isVideoTexture===!0&&Xe.getTransfer(M.map.colorSpace)===ot,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Sn,flipSided:M.side===Bt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:je&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(je&&M.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Et.vertexUv1s=c.has(1),Et.vertexUv2s=c.has(2),Et.vertexUv3s=c.has(3),c.clear(),Et}function p(M){const v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)v.push(P),v.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(b(v,M),x(v,M),v.push(s.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function b(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function x(M,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.skinning&&a.enable(4),v.morphTargets&&a.enable(5),v.morphNormals&&a.enable(6),v.morphColors&&a.enable(7),v.premultipliedAlpha&&a.enable(8),v.shadowMapEnabled&&a.enable(9),v.doubleSided&&a.enable(10),v.flipSided&&a.enable(11),v.useDepthPacking&&a.enable(12),v.dithering&&a.enable(13),v.transmission&&a.enable(14),v.sheen&&a.enable(15),v.opaque&&a.enable(16),v.pointsUvs&&a.enable(17),v.decodeVideoTexture&&a.enable(18),v.alphaToCoverage&&a.enable(19),M.push(a.mask)}function y(M){const v=g[M.type];let P;if(v){const F=Mn[v];P=_o.clone(F.uniforms)}else P=M.uniforms;return P}function C(M,v){let P;for(let F=0,O=h.length;F<O;F++){const H=h[F];if(H.cacheKey===v){P=H,++P.usedTimes;break}}return P===void 0&&(P=new z0(s,v,M,r),h.push(P)),P}function T(M){if(--M.usedTimes===0){const v=h.indexOf(M);h[v]=h[h.length-1],h.pop(),M.destroy()}}function E(M){l.remove(M)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:C,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:R}}function j0(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function X0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Sh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function bh(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||X0),n.length>1&&n.sort(d||Sh),i.length>1&&i.sort(d||Sh)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function $0(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new bh,s.set(n,[o])):i>=r.length?(o=new bh,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function q0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new xe};break;case"SpotLight":t={position:new L,direction:new L,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function K0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Y0=0;function J0(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Z0(s){const e=new q0,t=K0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const i=new L,r=new Ie,o=new Ie;function a(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,b=0,x=0,y=0,C=0,T=0,E=0;c.sort(J0);for(let M=0,v=c.length;M<v;M++){const P=c[M],F=P.color,O=P.intensity,H=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=F.r*O,u+=F.g*O,d+=F.b*O;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],O);E++}else if(P.isDirectionalLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const J=P.shadow,G=t.get(P);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=P.shadow.matrix,b++}n.directional[f]=V,f++}else if(P.isSpotLight){const V=e.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(F).multiplyScalar(O),V.distance=H,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[_]=V;const J=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,J.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=J.matrix,P.castShadow){const G=t.get(P);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=X,y++}_++}else if(P.isRectAreaLight){const V=e.get(P);V.color.copy(F).multiplyScalar(O),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=V,m++}else if(P.isPointLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const J=P.shadow,G=t.get(P);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=P.shadow.matrix,x++}n.point[g]=V,g++}else if(P.isHemisphereLight){const V=e.get(P);V.skyColor.copy(P.color).multiplyScalar(O),V.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[p]=V,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==b||R.numPointShadows!==x||R.numSpotShadows!==y||R.numSpotMaps!==C||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,R.directionalLength=f,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=b,R.numPointShadows=x,R.numSpotShadows=y,R.numSpotMaps=C,R.numLightProbes=E,n.version=Y0++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const x=c[p];if(x.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),u++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function wh(s){const e=new Z0(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Q0(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new wh(s),e.set(i,[a])):r>=o.length?(a=new wh(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class ev extends gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Of,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tv extends gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const nv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function sv(s,e,t){let n=new wo;const i=new Se,r=new Se,o=new it,a=new ev({depthPacking:Ff}),l=new tv,c={},h=t.maxTextureSize,u={[Hn]:Bt,[Bt]:Hn,[Sn]:Sn},d=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:nv,fragmentShader:iv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new pt;g.setAttribute("position",new at(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new st(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wu;let p=this.type;this.render=function(T,E,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const M=s.getRenderTarget(),v=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),F=s.state;F.setBlending(kn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=p!==Un&&this.type===Un,H=p===Un&&this.type!==Un;for(let X=0,V=T.length;X<V;X++){const J=T[X],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const le=G.getFrameExtents();if(i.multiply(le),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/le.x),i.x=r.x*le.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/le.y),i.y=r.y*le.y,G.mapSize.y=r.y)),G.map===null||O===!0||H===!0){const _e=this.type!==Un?{minFilter:Ot,magFilter:Ot}:{};G.map!==null&&G.map.dispose(),G.map=new pn(i.x,i.y,_e),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const de=G.getViewportCount();for(let _e=0;_e<de;_e++){const Ge=G.getViewport(_e);o.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),F.viewport(o),G.updateMatrices(J,_e),n=G.getFrustum(),y(E,R,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===Un&&b(G,R),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,v,P)};function b(T,E){const R=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new pn(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(E,null,R,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(E,null,R,f,_,null)}function x(T,E,R,M){let v=null;const P=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)v=P;else if(v=R.isPointLight===!0?l:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const F=v.uuid,O=E.uuid;let H=c[F];H===void 0&&(H={},c[F]=H);let X=H[O];X===void 0&&(X=v.clone(),H[O]=X,E.addEventListener("dispose",C)),v=X}if(v.visible=E.visible,v.wireframe=E.wireframe,M===Un?v.side=E.shadowSide!==null?E.shadowSide:E.side:v.side=E.shadowSide!==null?E.shadowSide:u[E.side],v.alphaMap=E.alphaMap,v.alphaTest=E.alphaTest,v.map=E.map,v.clipShadows=E.clipShadows,v.clippingPlanes=E.clippingPlanes,v.clipIntersection=E.clipIntersection,v.displacementMap=E.displacementMap,v.displacementScale=E.displacementScale,v.displacementBias=E.displacementBias,v.wireframeLinewidth=E.wireframeLinewidth,v.linewidth=E.linewidth,R.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const F=s.properties.get(v);F.light=R}return v}function y(T,E,R,M,v){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&v===Un)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const O=e.update(T),H=T.material;if(Array.isArray(H)){const X=O.groups;for(let V=0,J=X.length;V<J;V++){const G=X[V],le=H[G.materialIndex];if(le&&le.visible){const de=x(T,le,M,v);T.onBeforeShadow(s,T,E,R,O,de,G),s.renderBufferDirect(R,null,O,de,T,G),T.onAfterShadow(s,T,E,R,O,de,G)}}}else if(H.visible){const X=x(T,H,M,v);T.onBeforeShadow(s,T,E,R,O,X,null),s.renderBufferDirect(R,null,O,X,T,null),T.onAfterShadow(s,T,E,R,O,X,null)}}const F=T.children;for(let O=0,H=F.length;O<H;O++)y(F[O],E,R,M,v)}function C(T){T.target.removeEventListener("dispose",C);for(const R in c){const M=c[R],v=T.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}function rv(s){function e(){let D=!1;const ee=new it;let j=null;const $=new it(0,0,0,0);return{setMask:function(ne){j!==ne&&!D&&(s.colorMask(ne,ne,ne,ne),j=ne)},setLocked:function(ne){D=ne},setClear:function(ne,Te,je,_t,Et){Et===!0&&(ne*=_t,Te*=_t,je*=_t),ee.set(ne,Te,je,_t),$.equals(ee)===!1&&(s.clearColor(ne,Te,je,_t),$.copy(ee))},reset:function(){D=!1,j=null,$.set(-1,0,0,0)}}}function t(){let D=!1,ee=null,j=null,$=null;return{setTest:function(ne){ne?pe(s.DEPTH_TEST):he(s.DEPTH_TEST)},setMask:function(ne){ee!==ne&&!D&&(s.depthMask(ne),ee=ne)},setFunc:function(ne){if(j!==ne){switch(ne){case mf:s.depthFunc(s.NEVER);break;case gf:s.depthFunc(s.ALWAYS);break;case _f:s.depthFunc(s.LESS);break;case co:s.depthFunc(s.LEQUAL);break;case vf:s.depthFunc(s.EQUAL);break;case xf:s.depthFunc(s.GEQUAL);break;case yf:s.depthFunc(s.GREATER);break;case Mf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=ne}},setLocked:function(ne){D=ne},setClear:function(ne){$!==ne&&(s.clearDepth(ne),$=ne)},reset:function(){D=!1,ee=null,j=null,$=null}}}function n(){let D=!1,ee=null,j=null,$=null,ne=null,Te=null,je=null,_t=null,Et=null;return{setTest:function($e){D||($e?pe(s.STENCIL_TEST):he(s.STENCIL_TEST))},setMask:function($e){ee!==$e&&!D&&(s.stencilMask($e),ee=$e)},setFunc:function($e,An,yn){(j!==$e||$!==An||ne!==yn)&&(s.stencilFunc($e,An,yn),j=$e,$=An,ne=yn)},setOp:function($e,An,yn){(Te!==$e||je!==An||_t!==yn)&&(s.stencilOp($e,An,yn),Te=$e,je=An,_t=yn)},setLocked:function($e){D=$e},setClear:function($e){Et!==$e&&(s.clearStencil($e),Et=$e)},reset:function(){D=!1,ee=null,j=null,$=null,ne=null,Te=null,je=null,_t=null,Et=null}}}const i=new e,r=new t,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,b=null,x=null,y=null,C=null,T=new xe(0,0,0),E=0,R=!1,M=null,v=null,P=null,F=null,O=null;const H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,V=0;const J=s.getParameter(s.VERSION);J.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(J)[1]),X=V>=1):J.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),X=V>=2);let G=null,le={};const de=s.getParameter(s.SCISSOR_BOX),_e=s.getParameter(s.VIEWPORT),Ge=new it().fromArray(de),tt=new it().fromArray(_e);function W(D,ee,j,$){const ne=new Uint8Array(4),Te=s.createTexture();s.bindTexture(D,Te),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let je=0;je<j;je++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(ee,0,s.RGBA,1,1,$,0,s.RGBA,s.UNSIGNED_BYTE,ne):s.texImage2D(ee+je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ne);return Te}const Z={};Z[s.TEXTURE_2D]=W(s.TEXTURE_2D,s.TEXTURE_2D,1),Z[s.TEXTURE_CUBE_MAP]=W(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[s.TEXTURE_2D_ARRAY]=W(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Z[s.TEXTURE_3D]=W(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),pe(s.DEPTH_TEST),r.setFunc(co),nt(!1),ye(Pc),pe(s.CULL_FACE),mt(kn);function pe(D){c[D]!==!0&&(s.enable(D),c[D]=!0)}function he(D){c[D]!==!1&&(s.disable(D),c[D]=!1)}function Le(D,ee){return h[D]!==ee?(s.bindFramebuffer(D,ee),h[D]=ee,D===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=ee),D===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=ee),!0):!1}function Fe(D,ee){let j=d,$=!1;if(D){j=u.get(ee),j===void 0&&(j=[],u.set(ee,j));const ne=D.textures;if(j.length!==ne.length||j[0]!==s.COLOR_ATTACHMENT0){for(let Te=0,je=ne.length;Te<je;Te++)j[Te]=s.COLOR_ATTACHMENT0+Te;j.length=ne.length,$=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,$=!0);$&&s.drawBuffers(j)}function He(D){return f!==D?(s.useProgram(D),f=D,!0):!1}const ut={[Ai]:s.FUNC_ADD,[Jd]:s.FUNC_SUBTRACT,[Zd]:s.FUNC_REVERSE_SUBTRACT};ut[Qd]=s.MIN,ut[ef]=s.MAX;const I={[tf]:s.ZERO,[nf]:s.ONE,[sf]:s.SRC_COLOR,[Pa]:s.SRC_ALPHA,[hf]:s.SRC_ALPHA_SATURATE,[lf]:s.DST_COLOR,[of]:s.DST_ALPHA,[rf]:s.ONE_MINUS_SRC_COLOR,[Ia]:s.ONE_MINUS_SRC_ALPHA,[cf]:s.ONE_MINUS_DST_COLOR,[af]:s.ONE_MINUS_DST_ALPHA,[uf]:s.CONSTANT_COLOR,[df]:s.ONE_MINUS_CONSTANT_COLOR,[ff]:s.CONSTANT_ALPHA,[pf]:s.ONE_MINUS_CONSTANT_ALPHA};function mt(D,ee,j,$,ne,Te,je,_t,Et,$e){if(D===kn){g===!0&&(he(s.BLEND),g=!1);return}if(g===!1&&(pe(s.BLEND),g=!0),D!==Yd){if(D!==_||$e!==R){if((m!==Ai||x!==Ai)&&(s.blendEquation(s.FUNC_ADD),m=Ai,x=Ai),$e)switch(D){case cs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ci:s.blendFunc(s.ONE,s.ONE);break;case Ic:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Lc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case cs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ci:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ic:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Lc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}p=null,b=null,y=null,C=null,T.set(0,0,0),E=0,_=D,R=$e}return}ne=ne||ee,Te=Te||j,je=je||$,(ee!==m||ne!==x)&&(s.blendEquationSeparate(ut[ee],ut[ne]),m=ee,x=ne),(j!==p||$!==b||Te!==y||je!==C)&&(s.blendFuncSeparate(I[j],I[$],I[Te],I[je]),p=j,b=$,y=Te,C=je),(_t.equals(T)===!1||Et!==E)&&(s.blendColor(_t.r,_t.g,_t.b,Et),T.copy(_t),E=Et),_=D,R=!1}function Qe(D,ee){D.side===Sn?he(s.CULL_FACE):pe(s.CULL_FACE);let j=D.side===Bt;ee&&(j=!j),nt(j),D.blending===cs&&D.transparent===!1?mt(kn):mt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),i.setMask(D.colorWrite);const $=D.stencilWrite;o.setTest($),$&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ce(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?pe(s.SAMPLE_ALPHA_TO_COVERAGE):he(s.SAMPLE_ALPHA_TO_COVERAGE)}function nt(D){M!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),M=D)}function ye(D){D!==$d?(pe(s.CULL_FACE),D!==v&&(D===Pc?s.cullFace(s.BACK):D===qd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):he(s.CULL_FACE),v=D}function gt(D){D!==P&&(X&&s.lineWidth(D),P=D)}function Ce(D,ee,j){D?(pe(s.POLYGON_OFFSET_FILL),(F!==ee||O!==j)&&(s.polygonOffset(ee,j),F=ee,O=j)):he(s.POLYGON_OFFSET_FILL)}function De(D){D?pe(s.SCISSOR_TEST):he(s.SCISSOR_TEST)}function A(D){D===void 0&&(D=s.TEXTURE0+H-1),G!==D&&(s.activeTexture(D),G=D)}function S(D,ee,j){j===void 0&&(G===null?j=s.TEXTURE0+H-1:j=G);let $=le[j];$===void 0&&($={type:void 0,texture:void 0},le[j]=$),($.type!==D||$.texture!==ee)&&(G!==j&&(s.activeTexture(j),G=j),s.bindTexture(D,ee||Z[D]),$.type=D,$.texture=ee)}function z(){const D=le[G];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Y(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function be(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function se(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ue(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ue(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ce(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(D){Ge.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),Ge.copy(D))}function fe(D){tt.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),tt.copy(D))}function Pe(D,ee){let j=l.get(ee);j===void 0&&(j=new WeakMap,l.set(ee,j));let $=j.get(D);$===void 0&&($=s.getUniformBlockIndex(ee,D.name),j.set(D,$))}function Be(D,ee){const $=l.get(ee).get(D);a.get(ee)!==$&&(s.uniformBlockBinding(ee,$,D.__bindingPointIndex),a.set(ee,$))}function lt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},G=null,le={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,b=null,x=null,y=null,C=null,T=new xe(0,0,0),E=0,R=!1,M=null,v=null,P=null,F=null,O=null,Ge.set(0,0,s.canvas.width,s.canvas.height),tt.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:pe,disable:he,bindFramebuffer:Le,drawBuffers:Fe,useProgram:He,setBlending:mt,setMaterial:Qe,setFlipSided:nt,setCullFace:ye,setLineWidth:gt,setPolygonOffset:Ce,setScissorTest:De,activeTexture:A,bindTexture:S,unbindTexture:z,compressedTexImage2D:K,compressedTexImage3D:Y,texImage2D:ce,texImage3D:We,updateUBOMapping:Pe,uniformBlockBinding:Be,texStorage2D:Ue,texStorage3D:Q,texSubImage2D:q,texSubImage3D:be,compressedTexSubImage2D:se,compressedTexSubImage3D:ue,scissor:Re,viewport:fe,reset:lt}}function Th(s,e,t,n){const i=ov(n);switch(t){case Pu:return s*e;case Lu:return s*e;case Du:return s*e*2;case Il:return s*e/i.components*i.byteLength;case Ll:return s*e/i.components*i.byteLength;case Uu:return s*e*2/i.components*i.byteLength;case Dl:return s*e*2/i.components*i.byteLength;case Iu:return s*e*3/i.components*i.byteLength;case Qt:return s*e*4/i.components*i.byteLength;case Ul:return s*e*4/i.components*i.byteLength;case Qr:case eo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case to:case no:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Na:case Fa:return Math.max(s,16)*Math.max(e,8)/4;case Ua:case Oa:return Math.max(s,8)*Math.max(e,8)/2;case Ba:case ka:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case za:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Va:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Xa:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case $a:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case qa:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Ka:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Za:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Qa:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case el:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case io:case tl:case nl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Nu:case il:return Math.ceil(s/4)*Math.ceil(e/4)*8;case sl:case rl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ov(s){switch(s){case Vn:case Au:return{byteLength:1,components:1};case ar:case Ru:case zn:return{byteLength:2,components:1};case Cl:case Pl:return{byteLength:2,components:4};case Li:case Rl:case cn:return{byteLength:4,components:1};case Cu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function av(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Se,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return f?new OffscreenCanvas(A,S):hr("canvas")}function _(A,S,z){let K=1;const Y=De(A);if((Y.width>z||Y.height>z)&&(K=z/Math.max(Y.width,Y.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const q=Math.floor(K*Y.width),be=Math.floor(K*Y.height);u===void 0&&(u=g(q,be));const se=S?g(q,be):u;return se.width=q,se.height=be,se.getContext("2d").drawImage(A,0,0,q,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+q+"x"+be+")."),se}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),A;return A}function m(A){return A.generateMipmaps&&A.minFilter!==Ot&&A.minFilter!==Wt}function p(A){s.generateMipmap(A)}function b(A,S,z,K,Y=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=S;if(S===s.RED&&(z===s.FLOAT&&(q=s.R32F),z===s.HALF_FLOAT&&(q=s.R16F),z===s.UNSIGNED_BYTE&&(q=s.R8)),S===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(q=s.R8UI),z===s.UNSIGNED_SHORT&&(q=s.R16UI),z===s.UNSIGNED_INT&&(q=s.R32UI),z===s.BYTE&&(q=s.R8I),z===s.SHORT&&(q=s.R16I),z===s.INT&&(q=s.R32I)),S===s.RG&&(z===s.FLOAT&&(q=s.RG32F),z===s.HALF_FLOAT&&(q=s.RG16F),z===s.UNSIGNED_BYTE&&(q=s.RG8)),S===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(q=s.RG8UI),z===s.UNSIGNED_SHORT&&(q=s.RG16UI),z===s.UNSIGNED_INT&&(q=s.RG32UI),z===s.BYTE&&(q=s.RG8I),z===s.SHORT&&(q=s.RG16I),z===s.INT&&(q=s.RG32I)),S===s.RGB&&z===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),S===s.RGBA){const be=Y?fo:Xe.getTransfer(K);z===s.FLOAT&&(q=s.RGBA32F),z===s.HALF_FLOAT&&(q=s.RGBA16F),z===s.UNSIGNED_BYTE&&(q=be===ot?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(A,S){let z;return A?S===null||S===Li||S===xs?z=s.DEPTH24_STENCIL8:S===cn?z=s.DEPTH32F_STENCIL8:S===ar&&(z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Li||S===xs?z=s.DEPTH_COMPONENT24:S===cn?z=s.DEPTH_COMPONENT32F:S===ar&&(z=s.DEPTH_COMPONENT16),z}function y(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ot&&A.minFilter!==Wt?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function C(A){const S=A.target;S.removeEventListener("dispose",C),E(S),S.isVideoTexture&&h.delete(S)}function T(A){const S=A.target;S.removeEventListener("dispose",T),M(S)}function E(A){const S=n.get(A);if(S.__webglInit===void 0)return;const z=A.source,K=d.get(z);if(K){const Y=K[S.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&R(A),Object.keys(K).length===0&&d.delete(z)}n.remove(A)}function R(A){const S=n.get(A);s.deleteTexture(S.__webglTexture);const z=A.source,K=d.get(z);delete K[S.__cacheKey],o.memory.textures--}function M(A){const S=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let Y=0;Y<S.__webglFramebuffer[K].length;Y++)s.deleteFramebuffer(S.__webglFramebuffer[K][Y]);else s.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)s.deleteFramebuffer(S.__webglFramebuffer[K]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=A.textures;for(let K=0,Y=z.length;K<Y;K++){const q=n.get(z[K]);q.__webglTexture&&(s.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(z[K])}n.remove(A)}let v=0;function P(){v=0}function F(){const A=v;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),v+=1,A}function O(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function H(A,S){const z=n.get(A);if(A.isVideoTexture&&gt(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(z,A,S);return}}t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+S)}function X(A,S){const z=n.get(A);if(A.version>0&&z.__version!==A.version){tt(z,A,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+S)}function V(A,S){const z=n.get(A);if(A.version>0&&z.__version!==A.version){tt(z,A,S);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+S)}function J(A,S){const z=n.get(A);if(A.version>0&&z.__version!==A.version){W(z,A,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+S)}const G={[wn]:s.REPEAT,[si]:s.CLAMP_TO_EDGE,[ho]:s.MIRRORED_REPEAT},le={[Ot]:s.NEAREST,[Eu]:s.NEAREST_MIPMAP_NEAREST,[qs]:s.NEAREST_MIPMAP_LINEAR,[Wt]:s.LINEAR,[Zr]:s.LINEAR_MIPMAP_NEAREST,[On]:s.LINEAR_MIPMAP_LINEAR},de={[kf]:s.NEVER,[jf]:s.ALWAYS,[zf]:s.LESS,[Bu]:s.LEQUAL,[Hf]:s.EQUAL,[Wf]:s.GEQUAL,[Vf]:s.GREATER,[Gf]:s.NOTEQUAL};function _e(A,S){if(S.type===cn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Wt||S.magFilter===Zr||S.magFilter===qs||S.magFilter===On||S.minFilter===Wt||S.minFilter===Zr||S.minFilter===qs||S.minFilter===On)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,G[S.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,G[S.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,G[S.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,le[S.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,le[S.minFilter]),S.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,de[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ot||S.minFilter!==qs&&S.minFilter!==On||S.type===cn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Ge(A,S){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",C));const K=S.source;let Y=d.get(K);Y===void 0&&(Y={},d.set(K,Y));const q=O(S);if(q!==A.__cacheKey){Y[q]===void 0&&(Y[q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Y[q].usedTimes++;const be=Y[A.__cacheKey];be!==void 0&&(Y[A.__cacheKey].usedTimes--,be.usedTimes===0&&R(S)),A.__cacheKey=q,A.__webglTexture=Y[q].texture}return z}function tt(A,S,z){let K=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=s.TEXTURE_3D);const Y=Ge(A,S),q=S.source;t.bindTexture(K,A.__webglTexture,s.TEXTURE0+z);const be=n.get(q);if(q.version!==be.__version||Y===!0){t.activeTexture(s.TEXTURE0+z);const se=Xe.getPrimaries(Xe.workingColorSpace),ue=S.colorSpace===ni?null:Xe.getPrimaries(S.colorSpace),Ue=S.colorSpace===ni||se===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let Q=_(S.image,!1,i.maxTextureSize);Q=Ce(S,Q);const ce=r.convert(S.format,S.colorSpace),We=r.convert(S.type);let Re=b(S.internalFormat,ce,We,S.colorSpace,S.isVideoTexture);_e(K,S);let fe;const Pe=S.mipmaps,Be=S.isVideoTexture!==!0,lt=be.__version===void 0||Y===!0,D=q.dataReady,ee=y(S,Q);if(S.isDepthTexture)Re=x(S.format===ys,S.type),lt&&(Be?t.texStorage2D(s.TEXTURE_2D,1,Re,Q.width,Q.height):t.texImage2D(s.TEXTURE_2D,0,Re,Q.width,Q.height,0,ce,We,null));else if(S.isDataTexture)if(Pe.length>0){Be&&lt&&t.texStorage2D(s.TEXTURE_2D,ee,Re,Pe[0].width,Pe[0].height);for(let j=0,$=Pe.length;j<$;j++)fe=Pe[j],Be?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,fe.width,fe.height,ce,We,fe.data):t.texImage2D(s.TEXTURE_2D,j,Re,fe.width,fe.height,0,ce,We,fe.data);S.generateMipmaps=!1}else Be?(lt&&t.texStorage2D(s.TEXTURE_2D,ee,Re,Q.width,Q.height),D&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Q.width,Q.height,ce,We,Q.data)):t.texImage2D(s.TEXTURE_2D,0,Re,Q.width,Q.height,0,ce,We,Q.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Be&&lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ee,Re,Pe[0].width,Pe[0].height,Q.depth);for(let j=0,$=Pe.length;j<$;j++)if(fe=Pe[j],S.format!==Qt)if(ce!==null)if(Be){if(D)if(S.layerUpdates.size>0){const ne=Th(fe.width,fe.height,S.format,S.type);for(const Te of S.layerUpdates){const je=fe.data.subarray(Te*ne/fe.data.BYTES_PER_ELEMENT,(Te+1)*ne/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,Te,fe.width,fe.height,1,ce,je,0,0)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,fe.width,fe.height,Q.depth,ce,fe.data,0,0)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,Re,fe.width,fe.height,Q.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?D&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,fe.width,fe.height,Q.depth,ce,We,fe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,j,Re,fe.width,fe.height,Q.depth,0,ce,We,fe.data)}else{Be&&lt&&t.texStorage2D(s.TEXTURE_2D,ee,Re,Pe[0].width,Pe[0].height);for(let j=0,$=Pe.length;j<$;j++)fe=Pe[j],S.format!==Qt?ce!==null?Be?D&&t.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,fe.width,fe.height,ce,fe.data):t.compressedTexImage2D(s.TEXTURE_2D,j,Re,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,fe.width,fe.height,ce,We,fe.data):t.texImage2D(s.TEXTURE_2D,j,Re,fe.width,fe.height,0,ce,We,fe.data)}else if(S.isDataArrayTexture)if(Be){if(lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ee,Re,Q.width,Q.height,Q.depth),D)if(S.layerUpdates.size>0){const j=Th(Q.width,Q.height,S.format,S.type);for(const $ of S.layerUpdates){const ne=Q.data.subarray($*j/Q.data.BYTES_PER_ELEMENT,($+1)*j/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,Q.width,Q.height,1,ce,We,ne)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ce,We,Q.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Re,Q.width,Q.height,Q.depth,0,ce,We,Q.data);else if(S.isData3DTexture)Be?(lt&&t.texStorage3D(s.TEXTURE_3D,ee,Re,Q.width,Q.height,Q.depth),D&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ce,We,Q.data)):t.texImage3D(s.TEXTURE_3D,0,Re,Q.width,Q.height,Q.depth,0,ce,We,Q.data);else if(S.isFramebufferTexture){if(lt)if(Be)t.texStorage2D(s.TEXTURE_2D,ee,Re,Q.width,Q.height);else{let j=Q.width,$=Q.height;for(let ne=0;ne<ee;ne++)t.texImage2D(s.TEXTURE_2D,ne,Re,j,$,0,ce,We,null),j>>=1,$>>=1}}else if(Pe.length>0){if(Be&&lt){const j=De(Pe[0]);t.texStorage2D(s.TEXTURE_2D,ee,Re,j.width,j.height)}for(let j=0,$=Pe.length;j<$;j++)fe=Pe[j],Be?D&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,ce,We,fe):t.texImage2D(s.TEXTURE_2D,j,Re,ce,We,fe);S.generateMipmaps=!1}else if(Be){if(lt){const j=De(Q);t.texStorage2D(s.TEXTURE_2D,ee,Re,j.width,j.height)}D&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce,We,Q)}else t.texImage2D(s.TEXTURE_2D,0,Re,ce,We,Q);m(S)&&p(K),be.__version=q.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function W(A,S,z){if(S.image.length!==6)return;const K=Ge(A,S),Y=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+z);const q=n.get(Y);if(Y.version!==q.__version||K===!0){t.activeTexture(s.TEXTURE0+z);const be=Xe.getPrimaries(Xe.workingColorSpace),se=S.colorSpace===ni?null:Xe.getPrimaries(S.colorSpace),ue=S.colorSpace===ni||be===se?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Ue=S.isCompressedTexture||S.image[0].isCompressedTexture,Q=S.image[0]&&S.image[0].isDataTexture,ce=[];for(let $=0;$<6;$++)!Ue&&!Q?ce[$]=_(S.image[$],!0,i.maxCubemapSize):ce[$]=Q?S.image[$].image:S.image[$],ce[$]=Ce(S,ce[$]);const We=ce[0],Re=r.convert(S.format,S.colorSpace),fe=r.convert(S.type),Pe=b(S.internalFormat,Re,fe,S.colorSpace),Be=S.isVideoTexture!==!0,lt=q.__version===void 0||K===!0,D=Y.dataReady;let ee=y(S,We);_e(s.TEXTURE_CUBE_MAP,S);let j;if(Ue){Be&&lt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ee,Pe,We.width,We.height);for(let $=0;$<6;$++){j=ce[$].mipmaps;for(let ne=0;ne<j.length;ne++){const Te=j[ne];S.format!==Qt?Re!==null?Be?D&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne,0,0,Te.width,Te.height,Re,Te.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne,Pe,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?D&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne,0,0,Te.width,Te.height,Re,fe,Te.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne,Pe,Te.width,Te.height,0,Re,fe,Te.data)}}}else{if(j=S.mipmaps,Be&&lt){j.length>0&&ee++;const $=De(ce[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ee,Pe,$.width,$.height)}for(let $=0;$<6;$++)if(Q){Be?D&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ce[$].width,ce[$].height,Re,fe,ce[$].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Pe,ce[$].width,ce[$].height,0,Re,fe,ce[$].data);for(let ne=0;ne<j.length;ne++){const je=j[ne].image[$].image;Be?D&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne+1,0,0,je.width,je.height,Re,fe,je.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne+1,Pe,je.width,je.height,0,Re,fe,je.data)}}else{Be?D&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Re,fe,ce[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Pe,Re,fe,ce[$]);for(let ne=0;ne<j.length;ne++){const Te=j[ne];Be?D&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne+1,0,0,Re,fe,Te.image[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,ne+1,Pe,Re,fe,Te.image[$])}}}m(S)&&p(s.TEXTURE_CUBE_MAP),q.__version=Y.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Z(A,S,z,K,Y,q){const be=r.convert(z.format,z.colorSpace),se=r.convert(z.type),ue=b(z.internalFormat,be,se,z.colorSpace);if(!n.get(S).__hasExternalTextures){const Q=Math.max(1,S.width>>q),ce=Math.max(1,S.height>>q);Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?t.texImage3D(Y,q,ue,Q,ce,S.depth,0,be,se,null):t.texImage2D(Y,q,ue,Q,ce,0,be,se,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),ye(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,Y,n.get(z).__webglTexture,0,nt(S)):(Y===s.TEXTURE_2D||Y>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,Y,n.get(z).__webglTexture,q),t.bindFramebuffer(s.FRAMEBUFFER,null)}function pe(A,S,z){if(s.bindRenderbuffer(s.RENDERBUFFER,A),S.depthBuffer){const K=S.depthTexture,Y=K&&K.isDepthTexture?K.type:null,q=x(S.stencilBuffer,Y),be=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=nt(S);ye(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,se,q,S.width,S.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,se,q,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,q,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,A)}else{const K=S.textures;for(let Y=0;Y<K.length;Y++){const q=K[Y],be=r.convert(q.format,q.colorSpace),se=r.convert(q.type),ue=b(q.internalFormat,be,se,q.colorSpace),Ue=nt(S);z&&ye(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ue,ue,S.width,S.height):ye(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ue,ue,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,ue,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function he(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);const K=n.get(S.depthTexture).__webglTexture,Y=nt(S);if(S.depthTexture.format===hs)ye(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0);else if(S.depthTexture.format===ys)ye(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Le(A){const S=n.get(A),z=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");he(S.__webglFramebuffer,A)}else if(z){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]=s.createRenderbuffer(),pe(S.__webglDepthbuffer[K],A,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=s.createRenderbuffer(),pe(S.__webglDepthbuffer,A,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Fe(A,S,z){const K=n.get(A);S!==void 0&&Z(K.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Le(A)}function He(A){const S=A.texture,z=n.get(A),K=n.get(S);A.addEventListener("dispose",T);const Y=A.textures,q=A.isWebGLCubeRenderTarget===!0,be=Y.length>1;if(be||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=S.version,o.memory.textures++),q){z.__webglFramebuffer=[];for(let se=0;se<6;se++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[se]=[];for(let ue=0;ue<S.mipmaps.length;ue++)z.__webglFramebuffer[se][ue]=s.createFramebuffer()}else z.__webglFramebuffer[se]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let se=0;se<S.mipmaps.length;se++)z.__webglFramebuffer[se]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(be)for(let se=0,ue=Y.length;se<ue;se++){const Ue=n.get(Y[se]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=s.createTexture(),o.memory.textures++)}if(A.samples>0&&ye(A)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let se=0;se<Y.length;se++){const ue=Y[se];z.__webglColorRenderbuffer[se]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[se]);const Ue=r.convert(ue.format,ue.colorSpace),Q=r.convert(ue.type),ce=b(ue.internalFormat,Ue,Q,ue.colorSpace,A.isXRRenderTarget===!0),We=nt(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,We,ce,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+se,s.RENDERBUFFER,z.__webglColorRenderbuffer[se])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),pe(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(q){t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),_e(s.TEXTURE_CUBE_MAP,S);for(let se=0;se<6;se++)if(S.mipmaps&&S.mipmaps.length>0)for(let ue=0;ue<S.mipmaps.length;ue++)Z(z.__webglFramebuffer[se][ue],A,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+se,ue);else Z(z.__webglFramebuffer[se],A,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(S)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let se=0,ue=Y.length;se<ue;se++){const Ue=Y[se],Q=n.get(Ue);t.bindTexture(s.TEXTURE_2D,Q.__webglTexture),_e(s.TEXTURE_2D,Ue),Z(z.__webglFramebuffer,A,Ue,s.COLOR_ATTACHMENT0+se,s.TEXTURE_2D,0),m(Ue)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let se=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(se=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(se,K.__webglTexture),_e(se,S),S.mipmaps&&S.mipmaps.length>0)for(let ue=0;ue<S.mipmaps.length;ue++)Z(z.__webglFramebuffer[ue],A,S,s.COLOR_ATTACHMENT0,se,ue);else Z(z.__webglFramebuffer,A,S,s.COLOR_ATTACHMENT0,se,0);m(S)&&p(se),t.unbindTexture()}A.depthBuffer&&Le(A)}function ut(A){const S=A.textures;for(let z=0,K=S.length;z<K;z++){const Y=S[z];if(m(Y)){const q=A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,be=n.get(Y).__webglTexture;t.bindTexture(q,be),p(q),t.unbindTexture()}}}const I=[],mt=[];function Qe(A){if(A.samples>0){if(ye(A)===!1){const S=A.textures,z=A.width,K=A.height;let Y=s.COLOR_BUFFER_BIT;const q=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=n.get(A),se=S.length>1;if(se)for(let ue=0;ue<S.length;ue++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ue=0;ue<S.length;ue++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Y|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Y|=s.STENCIL_BUFFER_BIT)),se){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[ue]);const Ue=n.get(S[ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ue,0)}s.blitFramebuffer(0,0,z,K,0,0,z,K,Y,s.NEAREST),l===!0&&(I.length=0,mt.length=0,I.push(s.COLOR_ATTACHMENT0+ue),A.depthBuffer&&A.resolveDepthBuffer===!1&&(I.push(q),mt.push(q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,mt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,I))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),se)for(let ue=0;ue<S.length;ue++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,be.__webglColorRenderbuffer[ue]);const Ue=n.get(S[ue]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,Ue,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const S=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function nt(A){return Math.min(i.maxSamples,A.samples)}function ye(A){const S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function gt(A){const S=o.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function Ce(A,S){const z=A.colorSpace,K=A.format,Y=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==Rt&&z!==ni&&(Xe.getTransfer(z)===ot?(K!==Qt||Y!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function De(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=P,this.setTexture2D=H,this.setTexture2DArray=X,this.setTexture3D=V,this.setTextureCube=J,this.rebindTextures=Fe,this.setupRenderTarget=He,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=ye}function lv(s,e){function t(n,i=ni){let r;const o=Xe.getTransfer(i);if(n===Vn)return s.UNSIGNED_BYTE;if(n===Cl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Pl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Cu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Au)return s.BYTE;if(n===Ru)return s.SHORT;if(n===ar)return s.UNSIGNED_SHORT;if(n===Rl)return s.INT;if(n===Li)return s.UNSIGNED_INT;if(n===cn)return s.FLOAT;if(n===zn)return s.HALF_FLOAT;if(n===Pu)return s.ALPHA;if(n===Iu)return s.RGB;if(n===Qt)return s.RGBA;if(n===Lu)return s.LUMINANCE;if(n===Du)return s.LUMINANCE_ALPHA;if(n===hs)return s.DEPTH_COMPONENT;if(n===ys)return s.DEPTH_STENCIL;if(n===Il)return s.RED;if(n===Ll)return s.RED_INTEGER;if(n===Uu)return s.RG;if(n===Dl)return s.RG_INTEGER;if(n===Ul)return s.RGBA_INTEGER;if(n===Qr||n===eo||n===to||n===no)if(o===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Qr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===to)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Qr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===eo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===to)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===no)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ua||n===Na||n===Oa||n===Fa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ua)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Na)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ba||n===ka||n===za)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ba||n===ka)return o===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===za)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ha||n===Va||n===Ga||n===Wa||n===ja||n===Xa||n===$a||n===qa||n===Ka||n===Ya||n===Ja||n===Za||n===Qa||n===el)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ha)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Va)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ga)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wa)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ja)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xa)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$a)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qa)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ka)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ya)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ja)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Za)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Qa)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===el)return o===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===io||n===tl||n===nl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===io)return o===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===tl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nu||n===il||n===sl||n===rl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===io)return r.COMPRESSED_RED_RGTC1_EXT;if(n===il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===sl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class cv extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class un extends ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hv={type:"move"};class ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(hv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new un;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const uv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class fv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Tt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ft({vertexShader:uv,fragmentShader:dv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new hi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pv extends Di{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new fv,m=t.getContextAttributes();let p=null,b=null;const x=[],y=[],C=new Se;let T=null;const E=new Nt;E.layers.enable(1),E.viewport=new it;const R=new Nt;R.layers.enable(2),R.viewport=new it;const M=[E,R],v=new cv;v.layers.enable(1),v.layers.enable(2);let P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Z=x[W];return Z===void 0&&(Z=new ma,x[W]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(W){let Z=x[W];return Z===void 0&&(Z=new ma,x[W]=Z),Z.getGripSpace()},this.getHand=function(W){let Z=x[W];return Z===void 0&&(Z=new ma,x[W]=Z),Z.getHandSpace()};function O(W){const Z=y.indexOf(W.inputSource);if(Z===-1)return;const pe=x[Z];pe!==void 0&&(pe.update(W.inputSource,W.frame,c||o),pe.dispatchEvent({type:W.type,data:W.inputSource}))}function H(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",X);for(let W=0;W<x.length;W++){const Z=y[W];Z!==null&&(y[W]=null,x[W].disconnect(Z))}P=null,F=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,b=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",H),i.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(C),i.renderState.layers===void 0){const Z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Z),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new pn(f.framebufferWidth,f.framebufferHeight,{format:Qt,type:Vn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Z=null,pe=null,he=null;m.depth&&(he=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=m.stencil?ys:hs,pe=m.stencil?xs:Li);const Le={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Le),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new pn(d.textureWidth,d.textureHeight,{format:Qt,type:Vn,depthTexture:new Ku(d.textureWidth,d.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(W){for(let Z=0;Z<W.removed.length;Z++){const pe=W.removed[Z],he=y.indexOf(pe);he>=0&&(y[he]=null,x[he].disconnect(pe))}for(let Z=0;Z<W.added.length;Z++){const pe=W.added[Z];let he=y.indexOf(pe);if(he===-1){for(let Fe=0;Fe<x.length;Fe++)if(Fe>=y.length){y.push(pe),he=Fe;break}else if(y[Fe]===null){y[Fe]=pe,he=Fe;break}if(he===-1)break}const Le=x[he];Le&&Le.connect(pe)}}const V=new L,J=new L;function G(W,Z,pe){V.setFromMatrixPosition(Z.matrixWorld),J.setFromMatrixPosition(pe.matrixWorld);const he=V.distanceTo(J),Le=Z.projectionMatrix.elements,Fe=pe.projectionMatrix.elements,He=Le[14]/(Le[10]-1),ut=Le[14]/(Le[10]+1),I=(Le[9]+1)/Le[5],mt=(Le[9]-1)/Le[5],Qe=(Le[8]-1)/Le[0],nt=(Fe[8]+1)/Fe[0],ye=He*Qe,gt=He*nt,Ce=he/(-Qe+nt),De=Ce*-Qe;Z.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(De),W.translateZ(Ce),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const A=He+Ce,S=ut+Ce,z=ye-De,K=gt+(he-De),Y=I*ut/S*A,q=mt*ut/S*A;W.projectionMatrix.makePerspective(z,K,Y,q,A,S),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function le(W,Z){Z===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Z.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;_.texture!==null&&(W.near=_.depthNear,W.far=_.depthFar),v.near=R.near=E.near=W.near,v.far=R.far=E.far=W.far,(P!==v.near||F!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),P=v.near,F=v.far,E.near=P,E.far=F,R.near=P,R.far=F,E.updateProjectionMatrix(),R.updateProjectionMatrix(),W.updateProjectionMatrix());const Z=W.parent,pe=v.cameras;le(v,Z);for(let he=0;he<pe.length;he++)le(pe[he],Z);pe.length===2?G(v,E,R):v.projectionMatrix.copy(E.projectionMatrix),de(W,v,Z)};function de(W,Z,pe){pe===null?W.matrix.copy(Z.matrixWorld):(W.matrix.copy(pe.matrixWorld),W.matrix.invert(),W.matrix.multiply(Z.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Z.projectionMatrix),W.projectionMatrixInverse.copy(Z.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ms*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let _e=null;function Ge(W,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const pe=h.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let he=!1;pe.length!==v.cameras.length&&(v.cameras.length=0,he=!0);for(let Fe=0;Fe<pe.length;Fe++){const He=pe[Fe];let ut=null;if(f!==null)ut=f.getViewport(He);else{const mt=u.getViewSubImage(d,He);ut=mt.viewport,Fe===0&&(e.setRenderTargetTextures(b,mt.colorTexture,d.ignoreDepthValues?void 0:mt.depthStencilTexture),e.setRenderTarget(b))}let I=M[Fe];I===void 0&&(I=new Nt,I.layers.enable(Fe),I.viewport=new it,M[Fe]=I),I.matrix.fromArray(He.transform.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale),I.projectionMatrix.fromArray(He.projectionMatrix),I.projectionMatrixInverse.copy(I.projectionMatrix).invert(),I.viewport.set(ut.x,ut.y,ut.width,ut.height),Fe===0&&(v.matrix.copy(I.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),he===!0&&v.cameras.push(I)}const Le=i.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const Fe=u.getDepthInformation(pe[0]);Fe&&Fe.isValid&&Fe.texture&&_.init(e,Fe,i.renderState)}}for(let pe=0;pe<x.length;pe++){const he=y[pe],Le=x[pe];he!==null&&Le!==void 0&&Le.update(he,Z,c||o)}_e&&_e(W,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const tt=new qu;tt.setAnimationLoop(Ge),this.setAnimationLoop=function(W){_e=W},this.dispose=function(){}}}const xi=new vn,mv=new Ie;function gv(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ju(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),x=b.envMap,y=b.envMapRotation;x&&(m.envMap.value=x,xi.copy(y),xi.x*=-1,xi.y*=-1,xi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),m.envMapRotation.value.setFromMatrix4(mv.makeRotationFromEuler(xi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function _v(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const y=x.program;n.uniformBlockBinding(b,y)}function c(b,x){let y=i[b.id];y===void 0&&(g(b),y=h(b),i[b.id]=y,b.addEventListener("dispose",m));const C=x.program;n.updateUBOMapping(b,C);const T=e.render.frame;r[b.id]!==T&&(d(b),r[b.id]=T)}function h(b){const x=u();b.__bindingPointIndex=x;const y=s.createBuffer(),C=b.__size,T=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,C,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,y),y}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const x=i[b.id],y=b.uniforms,C=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let T=0,E=y.length;T<E;T++){const R=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,v=R.length;M<v;M++){const P=R[M];if(f(P,T,M,C)===!0){const F=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let X=0;X<O.length;X++){const V=O[X],J=_(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,F+H,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,H),H+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(b,x,y,C){const T=b.value,E=x+"_"+y;if(C[E]===void 0)return typeof T=="number"||typeof T=="boolean"?C[E]=T:C[E]=T.clone(),!0;{const R=C[E];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return C[E]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(b){const x=b.uniforms;let y=0;const C=16;for(let E=0,R=x.length;E<R;E++){const M=Array.isArray(x[E])?x[E]:[x[E]];for(let v=0,P=M.length;v<P;v++){const F=M[v],O=Array.isArray(F.value)?F.value:[F.value];for(let H=0,X=O.length;H<X;H++){const V=O[H],J=_(V),G=y%C,le=G%J.boundary,de=G+le;y+=le,de!==0&&C-de<J.storage&&(y+=C-de),F.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=J.storage}}}const T=y%C;return T>0&&(y+=C-T),b.__size=y,b.__cache={},this}function _(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const b in i)s.deleteBuffer(i[b]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class vv{constructor(e={}){const{canvas:t=cp(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yt,this.toneMapping=ai,this.toneMappingExposure=1;const x=this;let y=!1,C=0,T=0,E=null,R=-1,M=null;const v=new it,P=new it;let F=null;const O=new xe(0);let H=0,X=t.width,V=t.height,J=1,G=null,le=null;const de=new it(0,0,X,V),_e=new it(0,0,X,V);let Ge=!1;const tt=new wo;let W=!1,Z=!1;const pe=new Ie,he=new L,Le=new it,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function ut(){return E===null?J:1}let I=n;function mt(w,U){return t.getContext(w,U)}try{const w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${El}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",$,!1),t.addEventListener("webglcontextcreationerror",ne,!1),I===null){const U="webgl2";if(I=mt(U,w),I===null)throw mt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Qe,nt,ye,gt,Ce,De,A,S,z,K,Y,q,be,se,ue,Ue,Q,ce,We,Re,fe,Pe,Be,lt;function D(){Qe=new w_(I),Qe.init(),Pe=new lv(I,Qe),nt=new v_(I,Qe,e,Pe),ye=new rv(I),gt=new A_(I),Ce=new j0,De=new av(I,Qe,ye,Ce,nt,Pe,gt),A=new y_(x),S=new b_(x),z=new Up(I),Be=new g_(I,z),K=new T_(I,z,gt,Be),Y=new C_(I,K,z,gt),We=new R_(I,nt,De),Ue=new x_(Ce),q=new W0(x,A,S,Qe,nt,Be,Ue),be=new gv(x,Ce),se=new $0,ue=new Q0(Qe),ce=new m_(x,A,S,ye,Y,d,l),Q=new sv(x,Y,nt),lt=new _v(I,gt,nt,ye),Re=new __(I,Qe,gt),fe=new E_(I,Qe,gt),gt.programs=q.programs,x.capabilities=nt,x.extensions=Qe,x.properties=Ce,x.renderLists=se,x.shadowMap=Q,x.state=ye,x.info=gt}D();const ee=new pv(x,I);this.xr=ee,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=Qe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Qe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(w){w!==void 0&&(J=w,this.setSize(X,V,!1))},this.getSize=function(w){return w.set(X,V)},this.setSize=function(w,U,B=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=w,V=U,t.width=Math.floor(w*J),t.height=Math.floor(U*J),B===!0&&(t.style.width=w+"px",t.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(X*J,V*J).floor()},this.setDrawingBufferSize=function(w,U,B){X=w,V=U,J=B,t.width=Math.floor(w*B),t.height=Math.floor(U*B),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(v)},this.getViewport=function(w){return w.copy(de)},this.setViewport=function(w,U,B,k){w.isVector4?de.set(w.x,w.y,w.z,w.w):de.set(w,U,B,k),ye.viewport(v.copy(de).multiplyScalar(J).round())},this.getScissor=function(w){return w.copy(_e)},this.setScissor=function(w,U,B,k){w.isVector4?_e.set(w.x,w.y,w.z,w.w):_e.set(w,U,B,k),ye.scissor(P.copy(_e).multiplyScalar(J).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(w){ye.setScissorTest(Ge=w)},this.setOpaqueSort=function(w){G=w},this.setTransparentSort=function(w){le=w},this.getClearColor=function(w){return w.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor.apply(ce,arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha.apply(ce,arguments)},this.clear=function(w=!0,U=!0,B=!0){let k=0;if(w){let N=!1;if(E!==null){const te=E.texture.format;N=te===Ul||te===Dl||te===Ll}if(N){const te=E.texture.type,oe=te===Vn||te===Li||te===ar||te===xs||te===Cl||te===Pl,me=ce.getClearColor(),ge=ce.getClearAlpha(),Ee=me.r,Ae=me.g,we=me.b;oe?(f[0]=Ee,f[1]=Ae,f[2]=we,f[3]=ge,I.clearBufferuiv(I.COLOR,0,f)):(g[0]=Ee,g[1]=Ae,g[2]=we,g[3]=ge,I.clearBufferiv(I.COLOR,0,g))}else k|=I.COLOR_BUFFER_BIT}U&&(k|=I.DEPTH_BUFFER_BIT),B&&(k|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",$,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),se.dispose(),ue.dispose(),Ce.dispose(),A.dispose(),S.dispose(),Y.dispose(),Be.dispose(),lt.dispose(),q.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",yn),ee.removeEventListener("sessionend",bc),fi.stop()};function j(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const w=gt.autoReset,U=Q.enabled,B=Q.autoUpdate,k=Q.needsUpdate,N=Q.type;D(),gt.autoReset=w,Q.enabled=U,Q.autoUpdate=B,Q.needsUpdate=k,Q.type=N}function ne(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Te(w){const U=w.target;U.removeEventListener("dispose",Te),je(U)}function je(w){_t(w),Ce.remove(w)}function _t(w){const U=Ce.get(w).programs;U!==void 0&&(U.forEach(function(B){q.releaseProgram(B)}),w.isShaderMaterial&&q.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,B,k,N,te){U===null&&(U=Fe);const oe=N.isMesh&&N.matrixWorld.determinant()<0,me=Gd(w,U,B,k,N);ye.setMaterial(k,oe);let ge=B.index,Ee=1;if(k.wireframe===!0){if(ge=K.getWireframeAttribute(B),ge===void 0)return;Ee=2}const Ae=B.drawRange,we=B.attributes.position;let qe=Ae.start*Ee,dt=(Ae.start+Ae.count)*Ee;te!==null&&(qe=Math.max(qe,te.start*Ee),dt=Math.min(dt,(te.start+te.count)*Ee)),ge!==null?(qe=Math.max(qe,0),dt=Math.min(dt,ge.count)):we!=null&&(qe=Math.max(qe,0),dt=Math.min(dt,we.count));const ft=dt-qe;if(ft<0||ft===1/0)return;Be.setup(N,k,me,B,ge);let kt,Ke=Re;if(ge!==null&&(kt=z.get(ge),Ke=fe,Ke.setIndex(kt)),N.isMesh)k.wireframe===!0?(ye.setLineWidth(k.wireframeLinewidth*ut()),Ke.setMode(I.LINES)):Ke.setMode(I.TRIANGLES);else if(N.isLine){let ve=k.linewidth;ve===void 0&&(ve=1),ye.setLineWidth(ve*ut()),N.isLineSegments?Ke.setMode(I.LINES):N.isLineLoop?Ke.setMode(I.LINE_LOOP):Ke.setMode(I.LINE_STRIP)}else N.isPoints?Ke.setMode(I.POINTS):N.isSprite&&Ke.setMode(I.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Ke.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Qe.get("WEBGL_multi_draw"))Ke.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const ve=N._multiDrawStarts,At=N._multiDrawCounts,Ye=N._multiDrawCount,tn=ge?z.get(ge).bytesPerElement:1,Fi=Ce.get(k).currentProgram.getUniforms();for(let zt=0;zt<Ye;zt++)Fi.setValue(I,"_gl_DrawID",zt),Ke.render(ve[zt]/tn,At[zt])}else if(N.isInstancedMesh)Ke.renderInstances(qe,ft,N.count);else if(B.isInstancedBufferGeometry){const ve=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,At=Math.min(B.instanceCount,ve);Ke.renderInstances(qe,ft,At)}else Ke.render(qe,ft)};function Et(w,U,B){w.transparent===!0&&w.side===Sn&&w.forceSinglePass===!1?(w.side=Bt,w.needsUpdate=!0,yr(w,U,B),w.side=Hn,w.needsUpdate=!0,yr(w,U,B),w.side=Sn):yr(w,U,B)}this.compile=function(w,U,B=null){B===null&&(B=w),m=ue.get(B),m.init(U),b.push(m),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),w!==B&&w.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights();const k=new Set;return w.traverse(function(N){const te=N.material;if(te)if(Array.isArray(te))for(let oe=0;oe<te.length;oe++){const me=te[oe];Et(me,B,N),k.add(me)}else Et(te,B,N),k.add(te)}),b.pop(),m=null,k},this.compileAsync=function(w,U,B=null){const k=this.compile(w,U,B);return new Promise(N=>{function te(){if(k.forEach(function(oe){Ce.get(oe).currentProgram.isReady()&&k.delete(oe)}),k.size===0){N(w);return}setTimeout(te,10)}Qe.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let $e=null;function An(w){$e&&$e(w)}function yn(){fi.stop()}function bc(){fi.start()}const fi=new qu;fi.setAnimationLoop(An),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(w){$e=w,ee.setAnimationLoop(w),w===null?fi.stop():fi.start()},ee.addEventListener("sessionstart",yn),ee.addEventListener("sessionend",bc),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(U),U=ee.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,U,E),m=ue.get(w,b.length),m.init(U),b.push(m),pe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),tt.setFromProjectionMatrix(pe),Z=this.localClippingEnabled,W=Ue.init(this.clippingPlanes,Z),_=se.get(w,p.length),_.init(),p.push(_),ee.enabled===!0&&ee.isPresenting===!0){const te=x.xr.getDepthSensingMesh();te!==null&&zo(te,U,-1/0,x.sortObjects)}zo(w,U,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(G,le),He=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,He&&ce.addToRenderList(_,w),this.info.render.frame++,W===!0&&Ue.beginShadows();const B=m.state.shadowsArray;Q.render(B,w,U),W===!0&&Ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=_.opaque,N=_.transmissive;if(m.setupLights(),U.isArrayCamera){const te=U.cameras;if(N.length>0)for(let oe=0,me=te.length;oe<me;oe++){const ge=te[oe];Tc(k,N,w,ge)}He&&ce.render(w);for(let oe=0,me=te.length;oe<me;oe++){const ge=te[oe];wc(_,w,ge,ge.viewport)}}else N.length>0&&Tc(k,N,w,U),He&&ce.render(w),wc(_,w,U);E!==null&&(De.updateMultisampleRenderTarget(E),De.updateRenderTargetMipmap(E)),w.isScene===!0&&w.onAfterRender(x,w,U),Be.resetDefaultState(),R=-1,M=null,b.pop(),b.length>0?(m=b[b.length-1],W===!0&&Ue.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function zo(w,U,B,k){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||tt.intersectsSprite(w)){k&&Le.setFromMatrixPosition(w.matrixWorld).applyMatrix4(pe);const oe=Y.update(w),me=w.material;me.visible&&_.push(w,oe,me,B,Le.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||tt.intersectsObject(w))){const oe=Y.update(w),me=w.material;if(k&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Le.copy(w.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Le.copy(oe.boundingSphere.center)),Le.applyMatrix4(w.matrixWorld).applyMatrix4(pe)),Array.isArray(me)){const ge=oe.groups;for(let Ee=0,Ae=ge.length;Ee<Ae;Ee++){const we=ge[Ee],qe=me[we.materialIndex];qe&&qe.visible&&_.push(w,oe,qe,B,Le.z,we)}}else me.visible&&_.push(w,oe,me,B,Le.z,null)}}const te=w.children;for(let oe=0,me=te.length;oe<me;oe++)zo(te[oe],U,B,k)}function wc(w,U,B,k){const N=w.opaque,te=w.transmissive,oe=w.transparent;m.setupLightsView(B),W===!0&&Ue.setGlobalState(x.clippingPlanes,B),k&&ye.viewport(v.copy(k)),N.length>0&&xr(N,U,B),te.length>0&&xr(te,U,B),oe.length>0&&xr(oe,U,B),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function Tc(w,U,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[k.id]===void 0&&(m.state.transmissionRenderTarget[k.id]=new pn(1,1,{generateMipmaps:!0,type:Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float")?zn:Vn,minFilter:On,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace}));const te=m.state.transmissionRenderTarget[k.id],oe=k.viewport||v;te.setSize(oe.z,oe.w);const me=x.getRenderTarget();x.setRenderTarget(te),x.getClearColor(O),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear(),He&&ce.render(B);const ge=x.toneMapping;x.toneMapping=ai;const Ee=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),m.setupLightsView(k),W===!0&&Ue.setGlobalState(x.clippingPlanes,k),xr(w,B,k),De.updateMultisampleRenderTarget(te),De.updateRenderTargetMipmap(te),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let we=0,qe=U.length;we<qe;we++){const dt=U[we],ft=dt.object,kt=dt.geometry,Ke=dt.material,ve=dt.group;if(Ke.side===Sn&&ft.layers.test(k.layers)){const At=Ke.side;Ke.side=Bt,Ke.needsUpdate=!0,Ec(ft,B,k,kt,Ke,ve),Ke.side=At,Ke.needsUpdate=!0,Ae=!0}}Ae===!0&&(De.updateMultisampleRenderTarget(te),De.updateRenderTargetMipmap(te))}x.setRenderTarget(me),x.setClearColor(O,H),Ee!==void 0&&(k.viewport=Ee),x.toneMapping=ge}function xr(w,U,B){const k=U.isScene===!0?U.overrideMaterial:null;for(let N=0,te=w.length;N<te;N++){const oe=w[N],me=oe.object,ge=oe.geometry,Ee=k===null?oe.material:k,Ae=oe.group;me.layers.test(B.layers)&&Ec(me,U,B,ge,Ee,Ae)}}function Ec(w,U,B,k,N,te){w.onBeforeRender(x,U,B,k,N,te),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),N.transparent===!0&&N.side===Sn&&N.forceSinglePass===!1?(N.side=Bt,N.needsUpdate=!0,x.renderBufferDirect(B,U,k,N,w,te),N.side=Hn,N.needsUpdate=!0,x.renderBufferDirect(B,U,k,N,w,te),N.side=Sn):x.renderBufferDirect(B,U,k,N,w,te),w.onAfterRender(x,U,B,k,N,te)}function yr(w,U,B){U.isScene!==!0&&(U=Fe);const k=Ce.get(w),N=m.state.lights,te=m.state.shadowsArray,oe=N.state.version,me=q.getParameters(w,N.state,te,U,B),ge=q.getProgramCacheKey(me);let Ee=k.programs;k.environment=w.isMeshStandardMaterial?U.environment:null,k.fog=U.fog,k.envMap=(w.isMeshStandardMaterial?S:A).get(w.envMap||k.environment),k.envMapRotation=k.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Ee===void 0&&(w.addEventListener("dispose",Te),Ee=new Map,k.programs=Ee);let Ae=Ee.get(ge);if(Ae!==void 0){if(k.currentProgram===Ae&&k.lightsStateVersion===oe)return Rc(w,me),Ae}else me.uniforms=q.getUniforms(w),w.onBeforeCompile(me,x),Ae=q.acquireProgram(me,ge),Ee.set(ge,Ae),k.uniforms=me.uniforms;const we=k.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(we.clippingPlanes=Ue.uniform),Rc(w,me),k.needsLights=jd(w),k.lightsStateVersion=oe,k.needsLights&&(we.ambientLightColor.value=N.state.ambient,we.lightProbe.value=N.state.probe,we.directionalLights.value=N.state.directional,we.directionalLightShadows.value=N.state.directionalShadow,we.spotLights.value=N.state.spot,we.spotLightShadows.value=N.state.spotShadow,we.rectAreaLights.value=N.state.rectArea,we.ltc_1.value=N.state.rectAreaLTC1,we.ltc_2.value=N.state.rectAreaLTC2,we.pointLights.value=N.state.point,we.pointLightShadows.value=N.state.pointShadow,we.hemisphereLights.value=N.state.hemi,we.directionalShadowMap.value=N.state.directionalShadowMap,we.directionalShadowMatrix.value=N.state.directionalShadowMatrix,we.spotShadowMap.value=N.state.spotShadowMap,we.spotLightMatrix.value=N.state.spotLightMatrix,we.spotLightMap.value=N.state.spotLightMap,we.pointShadowMap.value=N.state.pointShadowMap,we.pointShadowMatrix.value=N.state.pointShadowMatrix),k.currentProgram=Ae,k.uniformsList=null,Ae}function Ac(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=so.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Rc(w,U){const B=Ce.get(w);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function Gd(w,U,B,k,N){U.isScene!==!0&&(U=Fe),De.resetTextureUnits();const te=U.fog,oe=k.isMeshStandardMaterial?U.environment:null,me=E===null?x.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Rt,ge=(k.isMeshStandardMaterial?S:A).get(k.envMap||oe),Ee=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ae=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),we=!!B.morphAttributes.position,qe=!!B.morphAttributes.normal,dt=!!B.morphAttributes.color;let ft=ai;k.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(ft=x.toneMapping);const kt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ke=kt!==void 0?kt.length:0,ve=Ce.get(k),At=m.state.lights;if(W===!0&&(Z===!0||w!==M)){const $t=w===M&&k.id===R;Ue.setState(k,w,$t)}let Ye=!1;k.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==At.state.version||ve.outputColorSpace!==me||N.isBatchedMesh&&ve.batching===!1||!N.isBatchedMesh&&ve.batching===!0||N.isBatchedMesh&&ve.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&ve.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&ve.instancing===!1||!N.isInstancedMesh&&ve.instancing===!0||N.isSkinnedMesh&&ve.skinning===!1||!N.isSkinnedMesh&&ve.skinning===!0||N.isInstancedMesh&&ve.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&ve.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&ve.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&ve.instancingMorph===!1&&N.morphTexture!==null||ve.envMap!==ge||k.fog===!0&&ve.fog!==te||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Ue.numPlanes||ve.numIntersection!==Ue.numIntersection)||ve.vertexAlphas!==Ee||ve.vertexTangents!==Ae||ve.morphTargets!==we||ve.morphNormals!==qe||ve.morphColors!==dt||ve.toneMapping!==ft||ve.morphTargetsCount!==Ke)&&(Ye=!0):(Ye=!0,ve.__version=k.version);let tn=ve.currentProgram;Ye===!0&&(tn=yr(k,U,N));let Fi=!1,zt=!1,Ho=!1;const vt=tn.getUniforms(),Wn=ve.uniforms;if(ye.useProgram(tn.program)&&(Fi=!0,zt=!0,Ho=!0),k.id!==R&&(R=k.id,zt=!0),Fi||M!==w){vt.setValue(I,"projectionMatrix",w.projectionMatrix),vt.setValue(I,"viewMatrix",w.matrixWorldInverse);const $t=vt.map.cameraPosition;$t!==void 0&&$t.setValue(I,he.setFromMatrixPosition(w.matrixWorld)),nt.logarithmicDepthBuffer&&vt.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&vt.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,zt=!0,Ho=!0)}if(N.isSkinnedMesh){vt.setOptional(I,N,"bindMatrix"),vt.setOptional(I,N,"bindMatrixInverse");const $t=N.skeleton;$t&&($t.boneTexture===null&&$t.computeBoneTexture(),vt.setValue(I,"boneTexture",$t.boneTexture,De))}N.isBatchedMesh&&(vt.setOptional(I,N,"batchingTexture"),vt.setValue(I,"batchingTexture",N._matricesTexture,De),vt.setOptional(I,N,"batchingIdTexture"),vt.setValue(I,"batchingIdTexture",N._indirectTexture,De),vt.setOptional(I,N,"batchingColorTexture"),N._colorsTexture!==null&&vt.setValue(I,"batchingColorTexture",N._colorsTexture,De));const Vo=B.morphAttributes;if((Vo.position!==void 0||Vo.normal!==void 0||Vo.color!==void 0)&&We.update(N,B,tn),(zt||ve.receiveShadow!==N.receiveShadow)&&(ve.receiveShadow=N.receiveShadow,vt.setValue(I,"receiveShadow",N.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Wn.envMap.value=ge,Wn.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&U.environment!==null&&(Wn.envMapIntensity.value=U.environmentIntensity),zt&&(vt.setValue(I,"toneMappingExposure",x.toneMappingExposure),ve.needsLights&&Wd(Wn,Ho),te&&k.fog===!0&&be.refreshFogUniforms(Wn,te),be.refreshMaterialUniforms(Wn,k,J,V,m.state.transmissionRenderTarget[w.id]),so.upload(I,Ac(ve),Wn,De)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(so.upload(I,Ac(ve),Wn,De),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&vt.setValue(I,"center",N.center),vt.setValue(I,"modelViewMatrix",N.modelViewMatrix),vt.setValue(I,"normalMatrix",N.normalMatrix),vt.setValue(I,"modelMatrix",N.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const $t=k.uniformsGroups;for(let Go=0,Xd=$t.length;Go<Xd;Go++){const Cc=$t[Go];lt.update(Cc,tn),lt.bind(Cc,tn)}}return tn}function Wd(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function jd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(w,U,B){Ce.get(w.texture).__webglTexture=U,Ce.get(w.depthTexture).__webglTexture=B;const k=Ce.get(w);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const B=Ce.get(w);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,B=0){E=w,C=U,T=B;let k=!0,N=null,te=!1,oe=!1;if(w){const ge=Ce.get(w);ge.__useDefaultFramebuffer!==void 0?(ye.bindFramebuffer(I.FRAMEBUFFER,null),k=!1):ge.__webglFramebuffer===void 0?De.setupRenderTarget(w):ge.__hasExternalTextures&&De.rebindTextures(w,Ce.get(w.texture).__webglTexture,Ce.get(w.depthTexture).__webglTexture);const Ee=w.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(oe=!0);const Ae=Ce.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ae[U])?N=Ae[U][B]:N=Ae[U],te=!0):w.samples>0&&De.useMultisampledRTT(w)===!1?N=Ce.get(w).__webglMultisampledFramebuffer:Array.isArray(Ae)?N=Ae[B]:N=Ae,v.copy(w.viewport),P.copy(w.scissor),F=w.scissorTest}else v.copy(de).multiplyScalar(J).floor(),P.copy(_e).multiplyScalar(J).floor(),F=Ge;if(ye.bindFramebuffer(I.FRAMEBUFFER,N)&&k&&ye.drawBuffers(w,N),ye.viewport(v),ye.scissor(P),ye.setScissorTest(F),te){const ge=Ce.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,ge.__webglTexture,B)}else if(oe){const ge=Ce.get(w.texture),Ee=U||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,ge.__webglTexture,B||0,Ee)}R=-1},this.readRenderTargetPixels=function(w,U,B,k,N,te,oe){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=Ce.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&oe!==void 0&&(me=me[oe]),me){ye.bindFramebuffer(I.FRAMEBUFFER,me);try{const ge=w.texture,Ee=ge.format,Ae=ge.type;if(!nt.textureFormatReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-k&&B>=0&&B<=w.height-N&&I.readPixels(U,B,k,N,Pe.convert(Ee),Pe.convert(Ae),te)}finally{const ge=E!==null?Ce.get(E).__webglFramebuffer:null;ye.bindFramebuffer(I.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(w,U,B,k,N,te,oe){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=Ce.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&oe!==void 0&&(me=me[oe]),me){ye.bindFramebuffer(I.FRAMEBUFFER,me);try{const ge=w.texture,Ee=ge.format,Ae=ge.type;if(!nt.textureFormatReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-k&&B>=0&&B<=w.height-N){const we=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,we),I.bufferData(I.PIXEL_PACK_BUFFER,te.byteLength,I.STREAM_READ),I.readPixels(U,B,k,N,Pe.convert(Ee),Pe.convert(Ae),0),I.flush();const qe=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);await hp(I,qe,4);try{I.bindBuffer(I.PIXEL_PACK_BUFFER,we),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,te)}finally{I.deleteBuffer(we),I.deleteSync(qe)}return te}}finally{const ge=E!==null?Ce.get(E).__webglFramebuffer:null;ye.bindFramebuffer(I.FRAMEBUFFER,ge)}}},this.copyFramebufferToTexture=function(w,U=null,B=0){w.isTexture!==!0&&(us("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const k=Math.pow(2,-B),N=Math.floor(w.image.width*k),te=Math.floor(w.image.height*k),oe=U!==null?U.x:0,me=U!==null?U.y:0;De.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,B,0,0,oe,me,N,te),ye.unbindTexture()},this.copyTextureToTexture=function(w,U,B=null,k=null,N=0){w.isTexture!==!0&&(us("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1],U=arguments[2],N=arguments[3]||0,B=null);let te,oe,me,ge,Ee,Ae;B!==null?(te=B.max.x-B.min.x,oe=B.max.y-B.min.y,me=B.min.x,ge=B.min.y):(te=w.image.width,oe=w.image.height,me=0,ge=0),k!==null?(Ee=k.x,Ae=k.y):(Ee=0,Ae=0);const we=Pe.convert(U.format),qe=Pe.convert(U.type);De.setTexture2D(U,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const dt=I.getParameter(I.UNPACK_ROW_LENGTH),ft=I.getParameter(I.UNPACK_IMAGE_HEIGHT),kt=I.getParameter(I.UNPACK_SKIP_PIXELS),Ke=I.getParameter(I.UNPACK_SKIP_ROWS),ve=I.getParameter(I.UNPACK_SKIP_IMAGES),At=w.isCompressedTexture?w.mipmaps[N]:w.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,At.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,At.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,me),I.pixelStorei(I.UNPACK_SKIP_ROWS,ge),w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,N,Ee,Ae,te,oe,we,qe,At.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,N,Ee,Ae,At.width,At.height,we,At.data):I.texSubImage2D(I.TEXTURE_2D,N,Ee,Ae,te,oe,we,qe,At),I.pixelStorei(I.UNPACK_ROW_LENGTH,dt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ft),I.pixelStorei(I.UNPACK_SKIP_PIXELS,kt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ke),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ve),N===0&&U.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),ye.unbindTexture()},this.copyTextureToTexture3D=function(w,U,B=null,k=null,N=0){w.isTexture!==!0&&(us("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,w=arguments[2],U=arguments[3],N=arguments[4]||0);let te,oe,me,ge,Ee,Ae,we,qe,dt;const ft=w.isCompressedTexture?w.mipmaps[N]:w.image;B!==null?(te=B.max.x-B.min.x,oe=B.max.y-B.min.y,me=B.max.z-B.min.z,ge=B.min.x,Ee=B.min.y,Ae=B.min.z):(te=ft.width,oe=ft.height,me=ft.depth,ge=0,Ee=0,Ae=0),k!==null?(we=k.x,qe=k.y,dt=k.z):(we=0,qe=0,dt=0);const kt=Pe.convert(U.format),Ke=Pe.convert(U.type);let ve;if(U.isData3DTexture)De.setTexture3D(U,0),ve=I.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)De.setTexture2DArray(U,0),ve=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const At=I.getParameter(I.UNPACK_ROW_LENGTH),Ye=I.getParameter(I.UNPACK_IMAGE_HEIGHT),tn=I.getParameter(I.UNPACK_SKIP_PIXELS),Fi=I.getParameter(I.UNPACK_SKIP_ROWS),zt=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ft.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ft.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ge),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ee),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ae),w.isDataTexture||w.isData3DTexture?I.texSubImage3D(ve,N,we,qe,dt,te,oe,me,kt,Ke,ft.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(ve,N,we,qe,dt,te,oe,me,kt,ft.data):I.texSubImage3D(ve,N,we,qe,dt,te,oe,me,kt,Ke,ft),I.pixelStorei(I.UNPACK_ROW_LENGTH,At),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ye),I.pixelStorei(I.UNPACK_SKIP_PIXELS,tn),I.pixelStorei(I.UNPACK_SKIP_ROWS,Fi),I.pixelStorei(I.UNPACK_SKIP_IMAGES,zt),N===0&&U.generateMipmaps&&I.generateMipmap(ve),ye.unbindTexture()},this.initRenderTarget=function(w){Ce.get(w).__webglFramebuffer===void 0&&De.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?De.setTextureCube(w,0):w.isData3DTexture?De.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?De.setTexture2DArray(w,0):De.setTexture2D(w,0),ye.unbindTexture()},this.resetState=function(){C=0,T=0,E=null,ye.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Fl?"display-p3":"srgb",t.unpackColorSpace=Xe.workingColorSpace===bo?"display-p3":"srgb"}}class Hl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new xe(e),this.density=t}clone(){return new Hl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xv extends ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class yv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=al,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=fn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return us("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new L;class Vl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ln(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ln(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ln(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ln(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ln(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new at(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Vl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Eh=new L,Ah=new it,Rh=new it,Mv=new L,Ch=new Ie,Vr=new L,ga=new xn,Ph=new Ie,_a=new dr;class Sv extends st{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Dc,this.bindMatrix=new Ie,this.bindMatrixInverse=new Ie,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Gn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Vr),this.boundingBox.expandByPoint(Vr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new xn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Vr),this.boundingSphere.expandByPoint(Vr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ga.copy(this.boundingSphere),ga.applyMatrix4(i),e.ray.intersectsSphere(ga)!==!1&&(Ph.copy(i).invert(),_a.copy(e.ray).applyMatrix4(Ph),!(this.boundingBox!==null&&_a.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,_a)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new it,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Dc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===If?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ah.fromBufferAttribute(i.attributes.skinIndex,e),Rh.fromBufferAttribute(i.attributes.skinWeight,e),Eh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Rh.getComponent(r);if(o!==0){const a=Ah.getComponent(r);Ch.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Mv.copy(Eh).applyMatrix4(Ch),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class ed extends ct{constructor(){super(),this.isBone=!0,this.type="Bone"}}class td extends Tt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Ot,h=Ot,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ih=new Ie,bv=new Ie;class Gl{constructor(e=[],t=[]){this.uuid=fn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ie)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ie;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:bv;Ih.multiplyMatrices(a,t[r]),Ih.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Gl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new td(t,e,e,Qt,cn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new ed),this.bones.push(o),this.boneInverses.push(new Ie().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class cl extends at{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ts=new Ie,Lh=new Ie,Gr=[],Dh=new Gn,wv=new Ie,Hs=new st,Vs=new xn;class Tv extends st{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new cl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,wv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Gn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ts),Dh.copy(e.boundingBox).applyMatrix4(ts),this.boundingBox.union(Dh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ts),Vs.copy(e.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Vs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Hs.geometry=this.geometry,Hs.material=this.material,Hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vs.copy(this.boundingSphere),Vs.applyMatrix4(n),e.ray.intersectsSphere(Vs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ts),Lh.multiplyMatrices(n,ts),Hs.matrixWorld=Lh,Hs.raycast(e,Gr);for(let o=0,a=Gr.length;o<a;o++){const l=Gr[o];l.instanceId=r,l.object=this,t.push(l)}Gr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new cl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new td(new Float32Array(i*this.count),i,this.count,Il,cn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class nd extends gn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const vo=new L,xo=new L,Uh=new Ie,Gs=new dr,Wr=new xn,va=new L,Nh=new L;class Wl extends ct{constructor(e=new pt,t=new nd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)vo.fromBufferAttribute(t,i-1),xo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=vo.distanceTo(xo);e.setAttribute("lineDistance",new ht(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wr.copy(n.boundingSphere),Wr.applyMatrix4(i),Wr.radius+=r,e.ray.intersectsSphere(Wr)===!1)return;Uh.copy(i).invert(),Gs.copy(e.ray).applyMatrix4(Uh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),b=h.getX(_+1),x=jr(this,e,Gs,l,p,b);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=jr(this,e,Gs,l,_,m);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=jr(this,e,Gs,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=jr(this,e,Gs,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function jr(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(vo.fromBufferAttribute(o,i),xo.fromBufferAttribute(o,r),t.distanceSqToSegment(vo,xo,va,Nh)>n)return;va.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(va);if(!(l<e.near||l>e.far))return{distance:l,point:Nh.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}const Oh=new L,Fh=new L;class Ev extends Wl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Oh.fromBufferAttribute(t,i),Fh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Oh.distanceTo(Fh);e.setAttribute("lineDistance",new ht(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Av extends Wl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class di extends gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bh=new Ie,hl=new dr,Xr=new xn,$r=new L;class Ui extends ct{constructor(e=new pt,t=new di){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(i),Xr.radius+=r,e.ray.intersectsSphere(Xr)===!1)return;Bh.copy(i).invert(),hl.copy(e.ray).applyMatrix4(Bh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);$r.fromBufferAttribute(u,m),kh($r,m,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)$r.fromBufferAttribute(u,g),kh($r,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function kh(s,e,t,n,i,r,o){const a=hl.distanceSqToPoint(s);if(a<t){const l=new L;hl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class jl extends pt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;b(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ht(u,3)),this.setAttribute("normal",new ht(d,3)),this.setAttribute("uv",new ht(f,2));function b(){const y=new L,C=new L;let T=0;const E=(t-e)/n;for(let R=0;R<=r;R++){const M=[],v=R/r,P=v*(t-e)+e;for(let F=0;F<=i;F++){const O=F/i,H=O*l+a,X=Math.sin(H),V=Math.cos(H);C.x=P*X,C.y=-v*n+m,C.z=P*V,u.push(C.x,C.y,C.z),y.set(X,E,V).normalize(),d.push(y.x,y.y,y.z),f.push(O,1-v),M.push(g++)}_.push(M)}for(let R=0;R<i;R++)for(let M=0;M<r;M++){const v=_[M][R],P=_[M+1][R],F=_[M+1][R+1],O=_[M][R+1];h.push(v,P,O),h.push(P,F,O),T+=6}c.addGroup(p,T,0),p+=T}function x(y){const C=g,T=new Se,E=new L;let R=0;const M=y===!0?e:t,v=y===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,m*v,0),d.push(0,v,0),f.push(.5,.5),g++;const P=g;for(let F=0;F<=i;F++){const H=F/i*l+a,X=Math.cos(H),V=Math.sin(H);E.x=M*V,E.y=m*v,E.z=M*X,u.push(E.x,E.y,E.z),d.push(0,v,0),T.x=X*.5+.5,T.y=V*.5*v+.5,f.push(T.x,T.y),g++}for(let F=0;F<i;F++){const O=C+F,H=P+F;y===!0?h.push(H,H+1,O):h.push(H+1,H,O),R+=3}c.addGroup(p,R,y===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fr extends pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new ht(r,3)),this.setAttribute("normal",new ht(r.slice(),3)),this.setAttribute("uv",new ht(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const x=new L,y=new L,C=new L;for(let T=0;T<t.length;T+=3)f(t[T+0],x),f(t[T+1],y),f(t[T+2],C),l(x,y,C,b)}function l(b,x,y,C){const T=C+1,E=[];for(let R=0;R<=T;R++){E[R]=[];const M=b.clone().lerp(y,R/T),v=x.clone().lerp(y,R/T),P=T-R;for(let F=0;F<=P;F++)F===0&&R===T?E[R][F]=M:E[R][F]=M.clone().lerp(v,F/P)}for(let R=0;R<T;R++)for(let M=0;M<2*(T-R)-1;M++){const v=Math.floor(M/2);M%2===0?(d(E[R][v+1]),d(E[R+1][v]),d(E[R][v])):(d(E[R][v+1]),d(E[R+1][v+1]),d(E[R+1][v]))}}function c(b){const x=new L;for(let y=0;y<r.length;y+=3)x.x=r[y+0],x.y=r[y+1],x.z=r[y+2],x.normalize().multiplyScalar(b),r[y+0]=x.x,r[y+1]=x.y,r[y+2]=x.z}function h(){const b=new L;for(let x=0;x<r.length;x+=3){b.x=r[x+0],b.y=r[x+1],b.z=r[x+2];const y=m(b)/2/Math.PI+.5,C=p(b)/Math.PI+.5;o.push(y,1-C)}g(),u()}function u(){for(let b=0;b<o.length;b+=6){const x=o[b+0],y=o[b+2],C=o[b+4],T=Math.max(x,y,C),E=Math.min(x,y,C);T>.9&&E<.1&&(x<.2&&(o[b+0]+=1),y<.2&&(o[b+2]+=1),C<.2&&(o[b+4]+=1))}}function d(b){r.push(b.x,b.y,b.z)}function f(b,x){const y=b*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function g(){const b=new L,x=new L,y=new L,C=new L,T=new Se,E=new Se,R=new Se;for(let M=0,v=0;M<r.length;M+=9,v+=6){b.set(r[M+0],r[M+1],r[M+2]),x.set(r[M+3],r[M+4],r[M+5]),y.set(r[M+6],r[M+7],r[M+8]),T.set(o[v+0],o[v+1]),E.set(o[v+2],o[v+3]),R.set(o[v+4],o[v+5]),C.copy(b).add(x).add(y).divideScalar(3);const P=m(C);_(T,v+0,b,P),_(E,v+2,x,P),_(R,v+4,y,P)}}function _(b,x,y,C){C<0&&b.x===1&&(o[x]=b.x-1),y.x===0&&y.z===0&&(o[x]=C/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fr(e.vertices,e.indices,e.radius,e.details)}}class Xl extends fr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Xl(e.radius,e.detail)}}class $l extends fr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $l(e.radius,e.detail)}}class pr extends pt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,d=new L,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const b=[],x=p/n;let y=0;p===0&&o===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const T=C/t;u.x=-e*Math.cos(i+T*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+T*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(T+y,1-x),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const x=h[p][b+1],y=h[p][b],C=h[p+1][b],T=h[p+1][b+1];(p!==0||o>0)&&f.push(x,y,T),(p!==n-1||l<Math.PI)&&f.push(y,C,T)}this.setIndex(f),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ql extends fr{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ql(e.radius,e.detail)}}class Kl extends pt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,b=(i+1)*f+g;o.push(_,m,b),o.push(m,p,b)}this.setIndex(o),this.setAttribute("position",new ht(a,3)),this.setAttribute("normal",new ht(l,3)),this.setAttribute("uv",new ht(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Xt extends gn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ol,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tn extends Xt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Rv extends gn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new xe(16777215),this.specular=new xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ol,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function qr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Cv(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Pv(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function zh(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function id(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class mr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Iv extends mr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:rs,endingEnd:rs}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case os:r=e,a=2*t-n;break;case uo:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case os:o=e,l=2*n-t;break;case uo:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,b=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-f)*m+(1.5+f)*_+.5*g,y=f*m-f*_;for(let C=0;C!==a;++C)r[C]=p*o[h+C]+b*o[c+C]+x*o[l+C]+y*o[u+C];return r}}class sd extends mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class Lv extends mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class En{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qr(t,this.TimeBufferType),this.values=qr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qr(e.times,Array),values:qr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Lv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new sd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Iv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case lr:t=this.InterpolantFactoryMethodDiscrete;break;case cr:t=this.InterpolantFactoryMethodLinear;break;case Wo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return lr;case this.InterpolantFactoryMethodLinear:return cr;case this.InterpolantFactoryMethodSmooth:return Wo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Cv(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Wo,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=cr;class Is extends En{constructor(e,t,n){super(e,t,n)}}Is.prototype.ValueTypeName="bool";Is.prototype.ValueBufferType=Array;Is.prototype.DefaultInterpolation=lr;Is.prototype.InterpolantFactoryMethodLinear=void 0;Is.prototype.InterpolantFactoryMethodSmooth=void 0;class rd extends En{}rd.prototype.ValueTypeName="color";class bs extends En{}bs.prototype.ValueTypeName="number";class Dv extends mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)mn.slerpFlat(r,0,o,c-a,o,c,l);return r}}class ws extends En{InterpolantFactoryMethodLinear(e){return new Dv(this.times,this.values,this.getValueSize(),e)}}ws.prototype.ValueTypeName="quaternion";ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Ls extends En{constructor(e,t,n){super(e,t,n)}}Ls.prototype.ValueTypeName="string";Ls.prototype.ValueBufferType=Array;Ls.prototype.DefaultInterpolation=lr;Ls.prototype.InterpolantFactoryMethodLinear=void 0;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;class Ts extends En{}Ts.prototype.ValueTypeName="vector";class ul{constructor(e="",t=-1,n=[],i=Nl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=fn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Nv(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(En.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=Pv(l);l=zh(l,1,h),c=zh(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new bs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];id(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let b=0;b!==d[g].morphTargets.length;++b){const x=d[g];m.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new bs(".morphTargetInfluence["+_+"]",m,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(Ts,f+".position",d,"pos",i),n(ws,f+".quaternion",d,"rot",i),n(Ts,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Uv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return bs;case"vector":case"vector2":case"vector3":case"vector4":return Ts;case"color":return rd;case"quaternion":return ws;case"bool":case"boolean":return Is;case"string":return Ls}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Nv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Uv(s.type);if(s.times===void 0){const t=[],n=[];id(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const ri={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Ov{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Fv=new Ov;class Ds{constructor(e){this.manager=e!==void 0?e:Fv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ds.DEFAULT_MATERIAL_NAME="__DEFAULT";const Dn={};class Bv extends Error{constructor(e,t){super(e),this.response=t}}class od extends Ds{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ri.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Dn[e]!==void 0){Dn[e].push({onLoad:t,onProgress:n,onError:i});return}Dn[e]=[],Dn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Dn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){b();function b(){u.read().then(({done:x,value:y})=>{if(x)p.close();else{_+=y.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let T=0,E=h.length;T<E;T++){const R=h[T];R.onProgress&&R.onProgress(C)}p.enqueue(y),b()}},x=>{p.error(x)})}}});return new Response(m)}else throw new Bv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{ri.add(e,c);const h=Dn[e];delete Dn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Dn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Dn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class kv extends Ds{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ri.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=hr("img");function l(){h(),ri.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Yl extends Ds{constructor(e){super(e)}load(e,t,n,i){const r=new Tt,o=new kv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Ao extends ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const xa=new Ie,Hh=new L,Vh=new L;class Jl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wo,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Hh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hh),Vh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vh),t.updateMatrixWorld(),xa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class zv extends Jl{constructor(){super(new Nt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ms*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Hv extends Ao{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new zv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Gh=new Ie,Ws=new L,ya=new L;class Vv extends Jl{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Se(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ws.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ws),ya.copy(n.position),ya.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ya),n.updateMatrixWorld(),i.makeTranslation(-Ws.x,-Ws.y,-Ws.z),Gh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gh)}}class ad extends Ao{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Vv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Gv extends Jl{constructor(){super(new To(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wv extends Ao{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.shadow=new Gv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class jv extends Ao{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class er{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Xv extends Ds{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ri.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ri.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ri.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ri.add(e,l),r.manager.itemStart(e)}}class Zl{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Wh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Wh(){return(typeof performance>"u"?Date:performance).now()}class $v{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){mn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;mn.multiplyQuaternionsFlat(e,o,e,t,e,n),mn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const Ql="\\[\\]\\.:\\/",qv=new RegExp("["+Ql+"]","g"),ec="[^"+Ql+"]",Kv="[^"+Ql.replace("\\.","")+"]",Yv=/((?:WC+[\/:])*)/.source.replace("WC",ec),Jv=/(WCOD+)?/.source.replace("WCOD",Kv),Zv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ec),Qv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ec),ex=new RegExp("^"+Yv+Jv+Zv+Qv+"$"),tx=["material","materials","bones","map"];class nx{constructor(e,t,n){const i=n||Je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Je{constructor(e,t,n){this.path=t,this.parsedPath=n||Je.parseTrackName(t),this.node=Je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Je.Composite(e,t,n):new Je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qv,"")}static parseTrackName(e){const t=ex.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);tx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Je.Composite=nx;Je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Je.prototype.GetterByBindingType=[Je.prototype._getValue_direct,Je.prototype._getValue_array,Je.prototype._getValue_arrayElement,Je.prototype._getValue_toArray];Je.prototype.SetterByBindingTypeAndVersioning=[[Je.prototype._setValue_direct,Je.prototype._setValue_direct_setNeedsUpdate,Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_array,Je.prototype._setValue_array_setNeedsUpdate,Je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_arrayElement,Je.prototype._setValue_arrayElement_setNeedsUpdate,Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_fromArray,Je.prototype._setValue_fromArray_setNeedsUpdate,Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class ix{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:rs,endingEnd:rs};for(let c=0;c!==o;++c){const h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Lf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Uf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Nl:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===Df;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Ou){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=os,i.endingEnd=os):(e?i.endingStart=this.zeroSlopeAtStart?os:rs:i.endingStart=uo,t?i.endingEnd=this.zeroSlopeAtEnd?os:rs:i.endingEnd=uo)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}const sx=new Float32Array(1);class rx extends Di{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;g=new $v(Je.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new sd(new Float32Array(2),new Float32Array(2),1,sx),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?ul.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Nl),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new ix(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?ul.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const jh=new Ie;class ox{constructor(e,t,n=0,i=1/0){this.ray=new dr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new kl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return jh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jh),this}intersectObject(e,t=!0,n=[]){return dl(e,this,n,t),n.sort(Xh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)dl(e[i],this,n,t);return n.sort(Xh),n}}function Xh(s,e){return s.distance-e.distance}function dl(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)dl(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:El}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=El);var bt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ax(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}function ld(s){if(s.__esModule)return s;var e=s.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(s).forEach(function(n){var i=Object.getOwnPropertyDescriptor(s,n);Object.defineProperty(t,n,i.get?i:{enumerable:!0,get:function(){return s[n]}})}),t}var tc={exports:{}};tc.exports;(function(s){(function(e,t,n){function i(l){var c=this,h=a();c.next=function(){var u=2091639*c.s0+c.c*23283064365386963e-26;return c.s0=c.s1,c.s1=c.s2,c.s2=u-(c.c=u|0)},c.c=1,c.s0=h(" "),c.s1=h(" "),c.s2=h(" "),c.s0-=h(l),c.s0<0&&(c.s0+=1),c.s1-=h(l),c.s1<0&&(c.s1+=1),c.s2-=h(l),c.s2<0&&(c.s2+=1),h=null}function r(l,c){return c.c=l.c,c.s0=l.s0,c.s1=l.s1,c.s2=l.s2,c}function o(l,c){var h=new i(l),u=c&&c.state,d=h.next;return d.int32=function(){return h.next()*4294967296|0},d.double=function(){return d()+(d()*2097152|0)*11102230246251565e-32},d.quick=d,u&&(typeof u=="object"&&r(u,h),d.state=function(){return r(h,{})}),d}function a(){var l=4022871197,c=function(h){h=String(h);for(var u=0;u<h.length;u++){l+=h.charCodeAt(u);var d=.02519603282416938*l;l=d>>>0,d-=l,d*=l,l=d>>>0,d-=l,l+=d*4294967296}return(l>>>0)*23283064365386963e-26};return c}t&&t.exports?t.exports=o:this.alea=o})(bt,s)})(tc);var lx=tc.exports,nc={exports:{}};nc.exports;(function(s){(function(e,t,n){function i(a){var l=this,c="";l.x=0,l.y=0,l.z=0,l.w=0,l.next=function(){var u=l.x^l.x<<11;return l.x=l.y,l.y=l.z,l.z=l.w,l.w^=l.w>>>19^u^u>>>8},a===(a|0)?l.x=a:c+=a;for(var h=0;h<c.length+64;h++)l.x^=c.charCodeAt(h)|0,l.next()}function r(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l}function o(a,l){var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(typeof h=="object"&&r(h,c),u.state=function(){return r(c,{})}),u}t&&t.exports?t.exports=o:this.xor128=o})(bt,s)})(nc);var cx=nc.exports,ic={exports:{}};ic.exports;(function(s){(function(e,t,n){function i(a){var l=this,c="";l.next=function(){var u=l.x^l.x>>>2;return l.x=l.y,l.y=l.z,l.z=l.w,l.w=l.v,(l.d=l.d+362437|0)+(l.v=l.v^l.v<<4^(u^u<<1))|0},l.x=0,l.y=0,l.z=0,l.w=0,l.v=0,a===(a|0)?l.x=a:c+=a;for(var h=0;h<c.length+64;h++)l.x^=c.charCodeAt(h)|0,h==c.length&&(l.d=l.x<<10^l.x>>>4),l.next()}function r(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l.v=a.v,l.d=a.d,l}function o(a,l){var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(typeof h=="object"&&r(h,c),u.state=function(){return r(c,{})}),u}t&&t.exports?t.exports=o:this.xorwow=o})(bt,s)})(ic);var hx=ic.exports,sc={exports:{}};sc.exports;(function(s){(function(e,t,n){function i(a){var l=this;l.next=function(){var h=l.x,u=l.i,d,f;return d=h[u],d^=d>>>7,f=d^d<<24,d=h[u+1&7],f^=d^d>>>10,d=h[u+3&7],f^=d^d>>>3,d=h[u+4&7],f^=d^d<<7,d=h[u+7&7],d=d^d<<13,f^=d^d<<9,h[u]=f,l.i=u+1&7,f};function c(h,u){var d,f=[];if(u===(u|0))f[0]=u;else for(u=""+u,d=0;d<u.length;++d)f[d&7]=f[d&7]<<15^u.charCodeAt(d)+f[d+1&7]<<13;for(;f.length<8;)f.push(0);for(d=0;d<8&&f[d]===0;++d);for(d==8?f[7]=-1:f[d],h.x=f,h.i=0,d=256;d>0;--d)h.next()}c(l,a)}function r(a,l){return l.x=a.x.slice(),l.i=a.i,l}function o(a,l){a==null&&(a=+new Date);var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(h.x&&r(h,c),u.state=function(){return r(c,{})}),u}t&&t.exports?t.exports=o:this.xorshift7=o})(bt,s)})(sc);var ux=sc.exports,rc={exports:{}};rc.exports;(function(s){(function(e,t,n){function i(a){var l=this;l.next=function(){var h=l.w,u=l.X,d=l.i,f,g;return l.w=h=h+1640531527|0,g=u[d+34&127],f=u[d=d+1&127],g^=g<<13,f^=f<<17,g^=g>>>15,f^=f>>>12,g=u[d]=g^f,l.i=d,g+(h^h>>>16)|0};function c(h,u){var d,f,g,_,m,p=[],b=128;for(u===(u|0)?(f=u,u=null):(u=u+"\0",f=0,b=Math.max(b,u.length)),g=0,_=-32;_<b;++_)u&&(f^=u.charCodeAt((_+32)%u.length)),_===0&&(m=f),f^=f<<10,f^=f>>>15,f^=f<<4,f^=f>>>13,_>=0&&(m=m+1640531527|0,d=p[_&127]^=f+m,g=d==0?g+1:0);for(g>=128&&(p[(u&&u.length||0)&127]=-1),g=127,_=4*128;_>0;--_)f=p[g+34&127],d=p[g=g+1&127],f^=f<<13,d^=d<<17,f^=f>>>15,d^=d>>>12,p[g]=f^d;h.w=m,h.X=p,h.i=g}c(l,a)}function r(a,l){return l.i=a.i,l.w=a.w,l.X=a.X.slice(),l}function o(a,l){a==null&&(a=+new Date);var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(h.X&&r(h,c),u.state=function(){return r(c,{})}),u}t&&t.exports?t.exports=o:this.xor4096=o})(bt,s)})(rc);var dx=rc.exports,oc={exports:{}};oc.exports;(function(s){(function(e,t,n){function i(a){var l=this,c="";l.next=function(){var u=l.b,d=l.c,f=l.d,g=l.a;return u=u<<25^u>>>7^d,d=d-f|0,f=f<<24^f>>>8^g,g=g-u|0,l.b=u=u<<20^u>>>12^d,l.c=d=d-f|0,l.d=f<<16^d>>>16^g,l.a=g-u|0},l.a=0,l.b=0,l.c=-1640531527,l.d=1367130551,a===Math.floor(a)?(l.a=a/4294967296|0,l.b=a|0):c+=a;for(var h=0;h<c.length+20;h++)l.b^=c.charCodeAt(h)|0,l.next()}function r(a,l){return l.a=a.a,l.b=a.b,l.c=a.c,l.d=a.d,l}function o(a,l){var c=new i(a),h=l&&l.state,u=function(){return(c.next()>>>0)/4294967296};return u.double=function(){do var d=c.next()>>>11,f=(c.next()>>>0)/4294967296,g=(d+f)/(1<<21);while(g===0);return g},u.int32=c.next,u.quick=u,h&&(typeof h=="object"&&r(h,c),u.state=function(){return r(c,{})}),u}t&&t.exports?t.exports=o:this.tychei=o})(bt,s)})(oc);var fx=oc.exports,cd={exports:{}};const px={},mx=Object.freeze(Object.defineProperty({__proto__:null,default:px},Symbol.toStringTag,{value:"Module"})),gx=ld(mx);(function(s){(function(e,t,n){var i=256,r=6,o=52,a="random",l=n.pow(i,r),c=n.pow(2,o),h=c*2,u=i-1,d;function f(y,C,T){var E=[];C=C==!0?{entropy:!0}:C||{};var R=p(m(C.entropy?[y,x(t)]:y??b(),3),E),M=new g(E),v=function(){for(var P=M.g(r),F=l,O=0;P<c;)P=(P+O)*i,F*=i,O=M.g(1);for(;P>=h;)P/=2,F/=2,O>>>=1;return(P+O)/F};return v.int32=function(){return M.g(4)|0},v.quick=function(){return M.g(4)/4294967296},v.double=v,p(x(M.S),t),(C.pass||T||function(P,F,O,H){return H&&(H.S&&_(H,M),P.state=function(){return _(M,{})}),O?(n[a]=P,F):P})(v,R,"global"in C?C.global:this==n,C.state)}function g(y){var C,T=y.length,E=this,R=0,M=E.i=E.j=0,v=E.S=[];for(T||(y=[T++]);R<i;)v[R]=R++;for(R=0;R<i;R++)v[R]=v[M=u&M+y[R%T]+(C=v[R])],v[M]=C;(E.g=function(P){for(var F,O=0,H=E.i,X=E.j,V=E.S;P--;)F=V[H=u&H+1],O=O*i+V[u&(V[H]=V[X=u&X+F])+(V[X]=F)];return E.i=H,E.j=X,O})(i)}function _(y,C){return C.i=y.i,C.j=y.j,C.S=y.S.slice(),C}function m(y,C){var T=[],E=typeof y,R;if(C&&E=="object")for(R in y)try{T.push(m(y[R],C-1))}catch{}return T.length?T:E=="string"?y:y+"\0"}function p(y,C){for(var T=y+"",E,R=0;R<T.length;)C[u&R]=u&(E^=C[u&R]*19)+T.charCodeAt(R++);return x(C)}function b(){try{var y;return d&&(y=d.randomBytes)?y=y(i):(y=new Uint8Array(i),(e.crypto||e.msCrypto).getRandomValues(y)),x(y)}catch{var C=e.navigator,T=C&&C.plugins;return[+new Date,e,T,e.screen,x(t)]}}function x(y){return String.fromCharCode.apply(0,y)}if(p(n.random(),t),s.exports){s.exports=f;try{d=gx}catch{}}else n["seed"+a]=f})(typeof self<"u"?self:bt,[],Math)})(cd);var _x=cd.exports,vx=lx,xx=cx,yx=hx,Mx=ux,Sx=dx,bx=fx,Ni=_x;Ni.alea=vx;Ni.xor128=xx;Ni.xorwow=yx;Ni.xorshift7=Mx;Ni.xor4096=Sx;Ni.tychei=bx;var wx=Ni;const Ro=ax(wx);function $h(s,e){if(e===Nf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ol||e===Fu){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===ol)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class Co extends Ds{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Cx(t)}),this.register(function(t){return new Px(t)}),this.register(function(t){return new kx(t)}),this.register(function(t){return new zx(t)}),this.register(function(t){return new Hx(t)}),this.register(function(t){return new Lx(t)}),this.register(function(t){return new Dx(t)}),this.register(function(t){return new Ux(t)}),this.register(function(t){return new Nx(t)}),this.register(function(t){return new Rx(t)}),this.register(function(t){return new Ox(t)}),this.register(function(t){return new Ix(t)}),this.register(function(t){return new Bx(t)}),this.register(function(t){return new Fx(t)}),this.register(function(t){return new Ex(t)}),this.register(function(t){return new Vx(t)}),this.register(function(t){return new Gx(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=er.extractUrlBase(e);o=er.resolveURL(c,this.path)}else o=er.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new od(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===hd){try{o[ze.KHR_BINARY_GLTF]=new Wx(e)}catch(u){i&&i(u);return}r=JSON.parse(o[ze.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new iy(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ze.KHR_MATERIALS_UNLIT:o[u]=new Ax;break;case ze.KHR_DRACO_MESH_COMPRESSION:o[u]=new jx(r,this.dracoLoader);break;case ze.KHR_TEXTURE_TRANSFORM:o[u]=new Xx;break;case ze.KHR_MESH_QUANTIZATION:o[u]=new $x;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Tx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const ze={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ex{constructor(e){this.parser=e,this.name=ze.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new xe(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Rt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Wv(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ad(h),c.distance=u;break;case"spot":c=new Hv(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Nn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Ax{constructor(){this.name=ze.KHR_MATERIALS_UNLIT}getMaterialType(){return hn}extendParams(e,t,n){const i=[];e.color=new xe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Rt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,yt))}return Promise.all(i)}}class Rx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Cx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Se(a,a)}return Promise.all(r)}}class Px{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Ix{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class Lx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new xe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Rt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,yt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Dx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Ux{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new xe().setRGB(a[0],a[1],a[2],Rt),Promise.all(r)}}class Nx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Ox{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new xe().setRGB(a[0],a[1],a[2],Rt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,yt)),Promise.all(r)}}class Fx{constructor(e){this.parser=e,this.name=ze.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class Bx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class kx{constructor(e){this.parser=e,this.name=ze.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class zx{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Hx{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Vx{constructor(e){this.name=ze.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class Gx{constructor(e){this.name=ze.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Yt.TRIANGLES&&c.mode!==Yt.TRIANGLE_STRIP&&c.mode!==Yt.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Ie,m=new L,p=new mn,b=new L(1,1,1),x=new Tv(g.geometry,g.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&b.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,_.compose(m,p,b));for(const y in l)if(y==="_COLOR_0"){const C=l[y];x.instanceColor=new cl(C.array,C.itemSize,C.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);ct.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const hd="glTF",js=12,qh={JSON:1313821514,BIN:5130562};class Wx{constructor(e){this.name=ze.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,js),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==hd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-js,r=new DataView(e,js);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===qh.JSON){const c=new Uint8Array(e,js+o,a);this.content=n.decode(c)}else if(l===qh.BIN){const c=js+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class jx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ze.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=fl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=fl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=fs[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},a,c,Rt,d)})})}}class Xx{constructor(){this.name=ze.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class $x{constructor(){this.name=ze.KHR_MESH_QUANTIZATION}}class ud extends mr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,b=1-m,x=p-d+u;for(let y=0;y!==a;y++){const C=o[_+y+a],T=o[_+y+l]*h,E=o[g+y+a],R=o[g+y]*h;r[y]=b*C+x*T+m*E+p*R}return r}}const qx=new mn;class Kx extends ud{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return qx.fromArray(r).normalize().toArray(r),r}}const Yt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},fs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Kh={9728:Ot,9729:Wt,9984:Eu,9985:Zr,9986:qs,9987:On},Yh={33071:si,33648:ho,10497:wn},Ma={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},fl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Jn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Yx={CUBICSPLINE:void 0,LINEAR:cr,STEP:lr},Sa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Jx(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Xt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Hn})),s.DefaultMaterial}function yi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Nn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Zx(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Qx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ey(s){let e;const t=s.extensions&&s.extensions[ze.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ba(t.attributes):e=s.indices+":"+ba(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+ba(s.targets[n]);return e}function ba(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function pl(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ty(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const ny=new Ie;class iy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Tx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new Yl(this.options.manager):this.textureLoader=new Xv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new od(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return yi(r,a,i),Nn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ze.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(er.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Ma[i.type],a=fs[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new at(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Ma[i.type],c=fs[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(b);x||(_=new c(a,p*f,i.count*f/h),x=new yv(_,f/h),t.cache.add(b,x)),m=new Vl(x,l,d%f/h,g)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),m=new at(_,l,g);if(i.sparse!==void 0){const p=Ma.SCALAR,b=fs[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,C=new b(o[1],x,i.sparse.count*p),T=new c(o[2],y,i.sparse.count*l);a!==null&&(m=new at(m.array.slice(),m.itemSize,m.normalized));for(let E=0,R=C.length;E<R;E++){const M=C[E];if(m.setX(M,T[E*l]),l>=2&&m.setY(M,T[E*l+1]),l>=3&&m.setZ(M,T[E*l+2]),l>=4&&m.setW(M,T[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Kh[d.magFilter]||Wt,h.minFilter=Kh[d.minFilter]||On,h.wrapS=Yh[d.wrapS]||wn,h.wrapT=Yh[d.wrapT]||wn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Tt(_);m.needsUpdate=!0,d(m)}),t.load(er.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Nn(u,o),u.userData.mimeType=o.mimeType||ty(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[ze.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[ze.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[ze.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new di,gn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new nd,gn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Xt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[ze.KHR_MATERIALS_UNLIT]){const u=i[ze.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new xe(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Rt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,yt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Sn);const h=r.alphaMode||Sa.OPAQUE;if(h===Sa.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Sa.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==hn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Se(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==hn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==hn){const u=r.emissiveFactor;a.emissive=new xe().setRGB(u[0],u[1],u[2],Rt)}return r.emissiveTexture!==void 0&&o!==hn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,yt)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),Nn(u,r),t.associations.set(u,{materials:e}),r.extensions&&yi(i,u,r),u})}createUniqueName(e){const t=Je.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Jh(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=ey(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[ze.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Jh(new pt,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?Jx(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=o[f];let p;const b=c[f];if(m.mode===Yt.TRIANGLES||m.mode===Yt.TRIANGLE_STRIP||m.mode===Yt.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Sv(_,b):new st(_,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Yt.TRIANGLE_STRIP?p.geometry=$h(p.geometry,Fu):m.mode===Yt.TRIANGLE_FAN&&(p.geometry=$h(p.geometry,ol));else if(m.mode===Yt.LINES)p=new Ev(_,b);else if(m.mode===Yt.LINE_STRIP)p=new Wl(_,b);else if(m.mode===Yt.LINE_LOOP)p=new Av(_,b);else if(m.mode===Yt.POINTS)p=new Ui(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Qx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Nn(p,r),m.extensions&&yi(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&yi(i,u[0],r),u[0];const d=new un;r.extensions&&yi(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nt(lp.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new To(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Nn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Ie;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Gl(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,b=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let b=0,x=d.length;b<x;b++){const y=d[b],C=f[b],T=g[b],E=_[b],R=m[b];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const M=n._createAnimationTracks(y,C,T,E,R);if(M)for(let v=0;v<M.length;v++)p.push(M[v])}return new ul(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,ny)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new ed:c.length>1?h=new un:c.length===1?h=c[0]:h=new ct,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Nn(h,r),r.extensions&&yi(n,h,r),r.matrix!==void 0){const u=new Ie;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new un;n.name&&(r.name=i.createUniqueName(n.name)),Nn(r,n),n.extensions&&yi(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof gn||d instanceof Tt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];Jn[r.path]===Jn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Jn[r.path]){case Jn.weights:c=bs;break;case Jn.rotation:c=ws;break;case Jn.position:case Jn.scale:c=Ts;break;default:switch(n.itemSize){case 1:c=bs;break;case 2:case 3:default:c=Ts;break}break}const h=i.interpolation!==void 0?Yx[i.interpolation]:cr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+Jn[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=pl(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ws?Kx:ud;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function sy(s,e,t){const n=e.attributes,i=new Gn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),a.normalized){const h=pl(fs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new L,l=new L;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=pl(fs[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new xn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Jh(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=fl[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return Xe.workingColorSpace!==Rt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xe.workingColorSpace}" not supported.`),Nn(s,e),sy(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Zx(s,e.targets,t):s})}const ry="modulepreload",oy=function(s){return"/MysteriousMaze/"+s},Zh={},Es=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),o=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));i=Promise.all(t.map(a=>{if(a=oy(a),a in Zh)return;Zh[a]=!0;const l=a.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${c}`))return;const h=document.createElement("link");if(h.rel=l?"stylesheet":ry,l||(h.as="script",h.crossOrigin=""),h.href=a,o&&h.setAttribute("nonce",o),document.head.appendChild(h),l)return new Promise((u,d)=>{h.addEventListener("load",u),h.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${a}`)))})}))}return i.then(()=>e()).catch(r=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r})},ay=s=>{let e;return s?e=s:typeof fetch>"u"?e=(...t)=>Es(async()=>{const{default:n}=await Promise.resolve().then(()=>Us);return{default:n}},void 0).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)};class ac extends Error{constructor(e,t="FunctionsError",n){super(e),this.name=t,this.context=n}}class ly extends ac{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class cy extends ac{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class hy extends ac{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var ml;(function(s){s.Any="any",s.ApNortheast1="ap-northeast-1",s.ApNortheast2="ap-northeast-2",s.ApSouth1="ap-south-1",s.ApSoutheast1="ap-southeast-1",s.ApSoutheast2="ap-southeast-2",s.CaCentral1="ca-central-1",s.EuCentral1="eu-central-1",s.EuWest1="eu-west-1",s.EuWest2="eu-west-2",s.EuWest3="eu-west-3",s.SaEast1="sa-east-1",s.UsEast1="us-east-1",s.UsWest1="us-west-1",s.UsWest2="us-west-2"})(ml||(ml={}));var uy=function(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):i(h.value).then(a,l)}c((n=n.apply(s,e||[])).next())})};class dy{constructor(e,{headers:t={},customFetch:n,region:i=ml.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=ay(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var n;return uy(this,void 0,void 0,function*(){try{const{headers:i,method:r,body:o}=t;let a={},{region:l}=t;l||(l=this.region),l&&l!=="any"&&(a["x-region"]=l);let c;o&&(i&&!Object.prototype.hasOwnProperty.call(i,"Content-Type")||!i)&&(typeof Blob<"u"&&o instanceof Blob||o instanceof ArrayBuffer?(a["Content-Type"]="application/octet-stream",c=o):typeof o=="string"?(a["Content-Type"]="text/plain",c=o):typeof FormData<"u"&&o instanceof FormData?c=o:(a["Content-Type"]="application/json",c=JSON.stringify(o)));const h=yield this.fetch(`${this.url}/${e}`,{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},a),this.headers),i),body:c}).catch(g=>{throw new ly(g)}),u=h.headers.get("x-relay-error");if(u&&u==="true")throw new cy(h);if(!h.ok)throw new hy(h);let d=((n=h.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),f;return d==="application/json"?f=yield h.json():d==="application/octet-stream"?f=yield h.blob():d==="text/event-stream"?f=h:d==="multipart/form-data"?f=yield h.formData():f=yield h.text(),{data:f,error:null}}catch(i){return{data:null,error:i}}})}}var Zt={},lc={},Po={},gr={},Io={},Lo={},fy=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},As=fy();const py=As.fetch,dd=As.fetch.bind(As),fd=As.Headers,my=As.Request,gy=As.Response,Us=Object.freeze(Object.defineProperty({__proto__:null,Headers:fd,Request:my,Response:gy,default:dd,fetch:py},Symbol.toStringTag,{value:"Module"})),_y=ld(Us);var cc={};Object.defineProperty(cc,"__esModule",{value:!0});class vy extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}}cc.default=vy;var pd=bt&&bt.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(Lo,"__esModule",{value:!0});const xy=pd(_y),yy=pd(cc);let My=class{constructor(e){this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=e.headers,this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle,e.fetch?this.fetch=e.fetch:typeof fetch>"u"?this.fetch=xy.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}then(e,t){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");const n=this.fetch;let i=n(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{var o,a,l;let c=null,h=null,u=null,d=r.status,f=r.statusText;if(r.ok){if(this.method!=="HEAD"){const p=await r.text();p===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?h=p:h=JSON.parse(p))}const _=(o=this.headers.Prefer)===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),m=(a=r.headers.get("content-range"))===null||a===void 0?void 0:a.split("/");_&&m&&m.length>1&&(u=parseInt(m[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(h)&&(h.length>1?(c={code:"PGRST116",details:`Results contain ${h.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},h=null,u=null,d=406,f="Not Acceptable"):h.length===1?h=h[0]:h=null)}else{const _=await r.text();try{c=JSON.parse(_),Array.isArray(c)&&r.status===404&&(h=[],c=null,d=200,f="OK")}catch{r.status===404&&_===""?(d=204,f="No Content"):c={message:_}}if(c&&this.isMaybeSingle&&(!((l=c==null?void 0:c.details)===null||l===void 0)&&l.includes("0 rows"))&&(c=null,d=200,f="OK"),c&&this.shouldThrowOnError)throw new yy.default(c)}return{error:c,data:h,count:u,status:d,statusText:f}});return this.shouldThrowOnError||(i=i.catch(r=>{var o,a,l;return{error:{message:`${(o=r==null?void 0:r.name)!==null&&o!==void 0?o:"FetchError"}: ${r==null?void 0:r.message}`,details:`${(a=r==null?void 0:r.stack)!==null&&a!==void 0?a:""}`,hint:"",code:`${(l=r==null?void 0:r.code)!==null&&l!==void 0?l:""}`},data:null,count:null,status:0,statusText:""}})),i.then(e,t)}};Lo.default=My;var Sy=bt&&bt.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(Io,"__esModule",{value:!0});const by=Sy(Lo);let wy=class extends by.default{select(e){let t=!1;const n=(e??"*").split("").map(i=>/\s/.test(i)&&!t?"":(i==='"'&&(t=!t),i)).join("");return this.url.searchParams.set("select",n),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:i,referencedTable:r=i}={}){const o=r?`${r}.order`:"order",a=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${a?`${a},`:""}${e}.${t?"asc":"desc"}${n===void 0?"":n?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){const i=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(i,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:i=n}={}){const r=typeof i>"u"?"offset":`${i}.offset`,o=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(r,`${e}`),this.url.searchParams.set(o,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:i=!1,wal:r=!1,format:o="text"}={}){var a;const l=[e?"analyze":null,t?"verbose":null,n?"settings":null,i?"buffers":null,r?"wal":null].filter(Boolean).join("|"),c=(a=this.headers.Accept)!==null&&a!==void 0?a:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${o}; for="${c}"; options=${l};`,o==="json"?this:this}rollback(){var e;return((e=this.headers.Prefer)!==null&&e!==void 0?e:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}};Io.default=wy;var Ty=bt&&bt.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(gr,"__esModule",{value:!0});const Ey=Ty(Io);let Ay=class extends Ey.default{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}in(e,t){const n=Array.from(new Set(t)).map(i=>typeof i=="string"&&new RegExp("[,()]").test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(e,`in.(${n})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:n,type:i}={}){let r="";i==="plain"?r="pl":i==="phrase"?r="ph":i==="websearch"&&(r="w");const o=n===void 0?"":`(${n})`;return this.url.searchParams.append(e,`${r}fts${o}.${t}`),this}match(e){return Object.entries(e).forEach(([t,n])=>{this.url.searchParams.append(t,`eq.${n}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){const i=n?`${n}.or`:"or";return this.url.searchParams.append(i,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}};gr.default=Ay;var Ry=bt&&bt.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(Po,"__esModule",{value:!0});const Xs=Ry(gr);let Cy=class{constructor(e,{headers:t={},schema:n,fetch:i}){this.url=e,this.headers=t,this.schema=n,this.fetch=i}select(e,{head:t=!1,count:n}={}){const i=t?"HEAD":"GET";let r=!1;const o=(e??"*").split("").map(a=>/\s/.test(a)&&!r?"":(a==='"'&&(r=!r),a)).join("");return this.url.searchParams.set("select",o),n&&(this.headers.Prefer=`count=${n}`),new Xs.default({method:i,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(e,{count:t,defaultToNull:n=!0}={}){const i="POST",r=[];if(this.headers.Prefer&&r.push(this.headers.Prefer),t&&r.push(`count=${t}`),n||r.push("missing=default"),this.headers.Prefer=r.join(","),Array.isArray(e)){const o=e.reduce((a,l)=>a.concat(Object.keys(l)),[]);if(o.length>0){const a=[...new Set(o)].map(l=>`"${l}"`);this.url.searchParams.set("columns",a.join(","))}}return new Xs.default({method:i,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:i,defaultToNull:r=!0}={}){const o="POST",a=[`resolution=${n?"ignore":"merge"}-duplicates`];if(t!==void 0&&this.url.searchParams.set("on_conflict",t),this.headers.Prefer&&a.push(this.headers.Prefer),i&&a.push(`count=${i}`),r||a.push("missing=default"),this.headers.Prefer=a.join(","),Array.isArray(e)){const l=e.reduce((c,h)=>c.concat(Object.keys(h)),[]);if(l.length>0){const c=[...new Set(l)].map(h=>`"${h}"`);this.url.searchParams.set("columns",c.join(","))}}return new Xs.default({method:o,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}update(e,{count:t}={}){const n="PATCH",i=[];return this.headers.Prefer&&i.push(this.headers.Prefer),t&&i.push(`count=${t}`),this.headers.Prefer=i.join(","),new Xs.default({method:n,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}delete({count:e}={}){const t="DELETE",n=[];return e&&n.push(`count=${e}`),this.headers.Prefer&&n.unshift(this.headers.Prefer),this.headers.Prefer=n.join(","),new Xs.default({method:t,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}};Po.default=Cy;var Do={},Uo={};Object.defineProperty(Uo,"__esModule",{value:!0});Uo.version=void 0;Uo.version="0.0.0-automated";Object.defineProperty(Do,"__esModule",{value:!0});Do.DEFAULT_HEADERS=void 0;const Py=Uo;Do.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${Py.version}`};var md=bt&&bt.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(lc,"__esModule",{value:!0});const Iy=md(Po),Ly=md(gr),Dy=Do;let Uy=class gd{constructor(e,{headers:t={},schema:n,fetch:i}={}){this.url=e,this.headers=Object.assign(Object.assign({},Dy.DEFAULT_HEADERS),t),this.schemaName=n,this.fetch=i}from(e){const t=new URL(`${this.url}/${e}`);return new Iy.default(t,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(e){return new gd(this.url,{headers:this.headers,schema:e,fetch:this.fetch})}rpc(e,t={},{head:n=!1,get:i=!1,count:r}={}){let o;const a=new URL(`${this.url}/rpc/${e}`);let l;n||i?(o=n?"HEAD":"GET",Object.entries(t).filter(([h,u])=>u!==void 0).map(([h,u])=>[h,Array.isArray(u)?`{${u.join(",")}}`:`${u}`]).forEach(([h,u])=>{a.searchParams.append(h,u)})):(o="POST",l=t);const c=Object.assign({},this.headers);return r&&(c.Prefer=`count=${r}`),new Ly.default({method:o,url:a,headers:c,schema:this.schemaName,body:l,fetch:this.fetch,allowEmpty:!1})}};lc.default=Uy;var _r=bt&&bt.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(Zt,"__esModule",{value:!0});Zt.PostgrestBuilder=Zt.PostgrestTransformBuilder=Zt.PostgrestFilterBuilder=Zt.PostgrestQueryBuilder=Zt.PostgrestClient=void 0;const _d=_r(lc);Zt.PostgrestClient=_d.default;const vd=_r(Po);Zt.PostgrestQueryBuilder=vd.default;const xd=_r(gr);Zt.PostgrestFilterBuilder=xd.default;const yd=_r(Io);Zt.PostgrestTransformBuilder=yd.default;const Md=_r(Lo);Zt.PostgrestBuilder=Md.default;var Ny=Zt.default={PostgrestClient:_d.default,PostgrestQueryBuilder:vd.default,PostgrestFilterBuilder:xd.default,PostgrestTransformBuilder:yd.default,PostgrestBuilder:Md.default};const{PostgrestClient:Oy,PostgrestQueryBuilder:Ub,PostgrestFilterBuilder:Nb,PostgrestTransformBuilder:Ob,PostgrestBuilder:Fb}=Ny,Fy="2.10.2",By={"X-Client-Info":`realtime-js/${Fy}`},ky="1.0.0",Sd=1e4,zy=1e3;var ps;(function(s){s[s.connecting=0]="connecting",s[s.open=1]="open",s[s.closing=2]="closing",s[s.closed=3]="closed"})(ps||(ps={}));var Gt;(function(s){s.closed="closed",s.errored="errored",s.joined="joined",s.joining="joining",s.leaving="leaving"})(Gt||(Gt={}));var an;(function(s){s.close="phx_close",s.error="phx_error",s.join="phx_join",s.reply="phx_reply",s.leave="phx_leave",s.access_token="access_token"})(an||(an={}));var gl;(function(s){s.websocket="websocket"})(gl||(gl={}));var Ci;(function(s){s.Connecting="connecting",s.Open="open",s.Closing="closing",s.Closed="closed"})(Ci||(Ci={}));class Hy{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t(typeof e=="string"?JSON.parse(e):{})}_binaryDecode(e){const t=new DataView(e),n=new TextDecoder;return this._decodeBroadcast(e,t,n)}_decodeBroadcast(e,t,n){const i=t.getUint8(1),r=t.getUint8(2);let o=this.HEADER_LENGTH+2;const a=n.decode(e.slice(o,o+i));o=o+i;const l=n.decode(e.slice(o,o+r));o=o+r;const c=JSON.parse(n.decode(e.slice(o,e.byteLength)));return{ref:null,topic:a,event:l,payload:c}}}class bd{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var rt;(function(s){s.abstime="abstime",s.bool="bool",s.date="date",s.daterange="daterange",s.float4="float4",s.float8="float8",s.int2="int2",s.int4="int4",s.int4range="int4range",s.int8="int8",s.int8range="int8range",s.json="json",s.jsonb="jsonb",s.money="money",s.numeric="numeric",s.oid="oid",s.reltime="reltime",s.text="text",s.time="time",s.timestamp="timestamp",s.timestamptz="timestamptz",s.timetz="timetz",s.tsrange="tsrange",s.tstzrange="tstzrange"})(rt||(rt={}));const Qh=(s,e,t={})=>{var n;const i=(n=t.skipTypes)!==null&&n!==void 0?n:[];return Object.keys(e).reduce((r,o)=>(r[o]=Vy(o,s,e,i),r),{})},Vy=(s,e,t,n)=>{const i=e.find(a=>a.name===s),r=i==null?void 0:i.type,o=t[s];return r&&!n.includes(r)?wd(r,o):_l(o)},wd=(s,e)=>{if(s.charAt(0)==="_"){const t=s.slice(1,s.length);return Xy(e,t)}switch(s){case rt.bool:return Gy(e);case rt.float4:case rt.float8:case rt.int2:case rt.int4:case rt.int8:case rt.numeric:case rt.oid:return Wy(e);case rt.json:case rt.jsonb:return jy(e);case rt.timestamp:return $y(e);case rt.abstime:case rt.date:case rt.daterange:case rt.int4range:case rt.int8range:case rt.money:case rt.reltime:case rt.text:case rt.time:case rt.timestamptz:case rt.timetz:case rt.tsrange:case rt.tstzrange:return _l(e);default:return _l(e)}},_l=s=>s,Gy=s=>{switch(s){case"t":return!0;case"f":return!1;default:return s}},Wy=s=>{if(typeof s=="string"){const e=parseFloat(s);if(!Number.isNaN(e))return e}return s},jy=s=>{if(typeof s=="string")try{return JSON.parse(s)}catch(e){return console.log(`JSON parse error: ${e}`),s}return s},Xy=(s,e)=>{if(typeof s!="string")return s;const t=s.length-1,n=s[t];if(s[0]==="{"&&n==="}"){let r;const o=s.slice(1,t);try{r=JSON.parse("["+o+"]")}catch{r=o?o.split(","):[]}return r.map(a=>wd(e,a))}return s},$y=s=>typeof s=="string"?s.replace(" ","T"):s,Td=s=>{let e=s;return e=e.replace(/^ws/i,"http"),e=e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),e.replace(/\/+$/,"")};class wa{constructor(e,t,n={},i=Sd){this.channel=e,this.event=t,this.payload=n,this.timeout=i,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var n;return this._hasReceived(e)&&t((n=this.receivedResp)===null||n===void 0?void 0:n.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(n=>n.status===e).forEach(n=>n.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var eu;(function(s){s.SYNC="sync",s.JOIN="join",s.LEAVE="leave"})(eu||(eu={}));class tr{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const n=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel._joinRef(),this.state=tr.syncState(this.state,i,r,o),this.pendingDiffs.forEach(l=>{this.state=tr.syncDiff(this.state,l,r,o)}),this.pendingDiffs=[],a()}),this.channel._on(n.diff,{},i=>{const{onJoin:r,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(i):(this.state=tr.syncDiff(this.state,i,r,o),a())}),this.onJoin((i,r,o)=>{this.channel._trigger("presence",{event:"join",key:i,currentPresences:r,newPresences:o})}),this.onLeave((i,r,o)=>{this.channel._trigger("presence",{event:"leave",key:i,currentPresences:r,leftPresences:o})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,n,i){const r=this.cloneDeep(e),o=this.transformState(t),a={},l={};return this.map(r,(c,h)=>{o[c]||(l[c]=h)}),this.map(o,(c,h)=>{const u=r[c];if(u){const d=h.map(m=>m.presence_ref),f=u.map(m=>m.presence_ref),g=h.filter(m=>f.indexOf(m.presence_ref)<0),_=u.filter(m=>d.indexOf(m.presence_ref)<0);g.length>0&&(a[c]=g),_.length>0&&(l[c]=_)}else a[c]=h}),this.syncDiff(r,{joins:a,leaves:l},n,i)}static syncDiff(e,t,n,i){const{joins:r,leaves:o}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return n||(n=()=>{}),i||(i=()=>{}),this.map(r,(a,l)=>{var c;const h=(c=e[a])!==null&&c!==void 0?c:[];if(e[a]=this.cloneDeep(l),h.length>0){const u=e[a].map(f=>f.presence_ref),d=h.filter(f=>u.indexOf(f.presence_ref)<0);e[a].unshift(...d)}n(a,h,l)}),this.map(o,(a,l)=>{let c=e[a];if(!c)return;const h=l.map(u=>u.presence_ref);c=c.filter(u=>h.indexOf(u.presence_ref)<0),e[a]=c,i(a,c,l),c.length===0&&delete e[a]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{const i=e[n];return"metas"in i?t[n]=i.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):t[n]=i,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var tu;(function(s){s.ALL="*",s.INSERT="INSERT",s.UPDATE="UPDATE",s.DELETE="DELETE"})(tu||(tu={}));var nu;(function(s){s.BROADCAST="broadcast",s.PRESENCE="presence",s.POSTGRES_CHANGES="postgres_changes"})(nu||(nu={}));var iu;(function(s){s.SUBSCRIBED="SUBSCRIBED",s.TIMED_OUT="TIMED_OUT",s.CLOSED="CLOSED",s.CHANNEL_ERROR="CHANNEL_ERROR"})(iu||(iu={}));class hc{constructor(e,t={config:{}},n){this.topic=e,this.params=t,this.socket=n,this.bindings={},this.state=Gt.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:""},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new wa(this,an.join,this.params,this.timeout),this.rejoinTimer=new bd(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=Gt.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=Gt.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=Gt.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=Gt.errored,this.rejoinTimer.scheduleTimeout())}),this._on(an.reply,{},(i,r)=>{this._trigger(this._replyEventName(r),i)}),this.presence=new tr(this),this.broadcastEndpointURL=Td(this.socket.endPoint)+"/api/broadcast"}subscribe(e,t=this.timeout){var n,i;if(this.socket.isConnected()||this.socket.connect(),this.joinedOnce)throw"tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";{const{config:{broadcast:r,presence:o,private:a}}=this.params;this._onError(h=>e&&e("CHANNEL_ERROR",h)),this._onClose(()=>e&&e("CLOSED"));const l={},c={broadcast:r,presence:o,postgres_changes:(i=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(h=>h.filter))!==null&&i!==void 0?i:[],private:a};this.socket.accessToken&&(l.access_token=this.socket.accessToken),this.updateJoinPayload(Object.assign({config:c},l)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",({postgres_changes:h})=>{var u;if(this.socket.accessToken&&this.socket.setAuth(this.socket.accessToken),h===void 0){e&&e("SUBSCRIBED");return}else{const d=this.bindings.postgres_changes,f=(u=d==null?void 0:d.length)!==null&&u!==void 0?u:0,g=[];for(let _=0;_<f;_++){const m=d[_],{filter:{event:p,schema:b,table:x,filter:y}}=m,C=h&&h[_];if(C&&C.event===p&&C.schema===b&&C.table===x&&C.filter===y)g.push(Object.assign(Object.assign({},m),{id:C.id}));else{this.unsubscribe(),e&&e("CHANNEL_ERROR",new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=g,e&&e("SUBSCRIBED");return}}).receive("error",h=>{e&&e("CHANNEL_ERROR",new Error(JSON.stringify(Object.values(h).join(", ")||"error")))}).receive("timeout",()=>{e&&e("TIMED_OUT")})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,n){return this._on(e,t,n)}async send(e,t={}){var n,i;if(!this._canPush()&&e.type==="broadcast"){const{event:r,payload:o}=e,a={method:"POST",headers:{Authorization:this.socket.accessToken?`Bearer ${this.socket.accessToken}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:o}]})};try{const l=await this._fetchWithTimeout(this.broadcastEndpointURL,a,(n=t.timeout)!==null&&n!==void 0?n:this.timeout);return await((i=l.body)===null||i===void 0?void 0:i.cancel()),l.ok?"ok":"error"}catch(l){return l.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var o,a,l;const c=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&r("ok"),c.receive("ok",()=>r("ok")),c.receive("error",()=>r("error")),c.receive("timeout",()=>r("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=Gt.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(an.close,"leave",this._joinRef())};return this.rejoinTimer.reset(),this.joinPush.destroy(),new Promise(n=>{const i=new wa(this,an.leave,{},e);i.receive("ok",()=>{t(),n("ok")}).receive("timeout",()=>{t(),n("timed out")}).receive("error",()=>{n("error")}),i.send(),this._canPush()||i.trigger("ok",{})})}async _fetchWithTimeout(e,t,n){const i=new AbortController,r=setTimeout(()=>i.abort(),n),o=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:i.signal}));return clearTimeout(r),o}_push(e,t,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let i=new wa(this,e,t,n);return this._canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}_onMessage(e,t,n){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,n){var i,r;const o=e.toLocaleLowerCase(),{close:a,error:l,leave:c,join:h}=an;if(n&&[a,l,c,h].indexOf(o)>=0&&n!==this._joinRef())return;let d=this._onMessage(o,t,n);if(t&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(o)?(i=this.bindings.postgres_changes)===null||i===void 0||i.filter(f=>{var g,_,m;return((g=f.filter)===null||g===void 0?void 0:g.event)==="*"||((m=(_=f.filter)===null||_===void 0?void 0:_.event)===null||m===void 0?void 0:m.toLocaleLowerCase())===o}).map(f=>f.callback(d,n)):(r=this.bindings[o])===null||r===void 0||r.filter(f=>{var g,_,m,p,b,x;if(["broadcast","presence","postgres_changes"].includes(o))if("id"in f){const y=f.id,C=(g=f.filter)===null||g===void 0?void 0:g.event;return y&&((_=t.ids)===null||_===void 0?void 0:_.includes(y))&&(C==="*"||(C==null?void 0:C.toLocaleLowerCase())===((m=t.data)===null||m===void 0?void 0:m.type.toLocaleLowerCase()))}else{const y=(b=(p=f==null?void 0:f.filter)===null||p===void 0?void 0:p.event)===null||b===void 0?void 0:b.toLocaleLowerCase();return y==="*"||y===((x=t==null?void 0:t.event)===null||x===void 0?void 0:x.toLocaleLowerCase())}else return f.type.toLocaleLowerCase()===o}).map(f=>{if(typeof d=="object"&&"ids"in d){const g=d.data,{schema:_,table:m,commit_timestamp:p,type:b,errors:x}=g;d=Object.assign(Object.assign({},{schema:_,table:m,commit_timestamp:p,eventType:b,new:{},old:{},errors:x}),this._getPayloadRecords(g))}f.callback(d,n)})}_isClosed(){return this.state===Gt.closed}_isJoined(){return this.state===Gt.joined}_isJoining(){return this.state===Gt.joining}_isLeaving(){return this.state===Gt.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,n){const i=e.toLocaleLowerCase(),r={type:i,filter:t,callback:n};return this.bindings[i]?this.bindings[i].push(r):this.bindings[i]=[r],this}_off(e,t){const n=e.toLocaleLowerCase();return this.bindings[n]=this.bindings[n].filter(i=>{var r;return!(((r=i.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===n&&hc.isEqual(i.filter,t))}),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(e[n]!==t[n])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(an.close,{},e)}_onError(e){this._on(an.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=Gt.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=Qh(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=Qh(e.columns,e.old_record)),t}}const qy=()=>{},Ky=typeof WebSocket<"u";class Yy{constructor(e,t){var n;this.accessToken=null,this.apiKey=null,this.channels=[],this.endPoint="",this.httpEndpoint="",this.headers=By,this.params={},this.timeout=Sd,this.heartbeatIntervalMs=3e4,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.ref=0,this.logger=qy,this.conn=null,this.sendBuffer=[],this.serializer=new Hy,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this._resolveFetch=r=>{let o;return r?o=r:typeof fetch>"u"?o=(...a)=>Es(async()=>{const{default:l}=await Promise.resolve().then(()=>Us);return{default:l}},void 0).then(({default:l})=>l(...a)):o=fetch,(...a)=>o(...a)},this.endPoint=`${e}/${gl.websocket}`,this.httpEndpoint=Td(e),t!=null&&t.transport?this.transport=t.transport:this.transport=null,t!=null&&t.params&&(this.params=t.params),t!=null&&t.headers&&(this.headers=Object.assign(Object.assign({},this.headers),t.headers)),t!=null&&t.timeout&&(this.timeout=t.timeout),t!=null&&t.logger&&(this.logger=t.logger),t!=null&&t.heartbeatIntervalMs&&(this.heartbeatIntervalMs=t.heartbeatIntervalMs);const i=(n=t==null?void 0:t.params)===null||n===void 0?void 0:n.apikey;i&&(this.accessToken=i,this.apiKey=i),this.reconnectAfterMs=t!=null&&t.reconnectAfterMs?t.reconnectAfterMs:r=>[1e3,2e3,5e3,1e4][r-1]||1e4,this.encode=t!=null&&t.encode?t.encode:(r,o)=>o(JSON.stringify(r)),this.decode=t!=null&&t.decode?t.decode:this.serializer.decode.bind(this.serializer),this.reconnectTimer=new bd(async()=>{this.disconnect(),this.connect()},this.reconnectAfterMs),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!this.conn){if(this.transport){this.conn=new this.transport(this._endPointURL(),void 0,{headers:this.headers});return}if(Ky){this.conn=new WebSocket(this._endPointURL()),this.setupConnection();return}this.conn=new Jy(this._endPointURL(),void 0,{close:()=>{this.conn=null}}),Es(async()=>{const{default:e}=await import("./browser-B-89cYLH.js").then(t=>t.b);return{default:e}},[]).then(({default:e})=>{this.conn=new e(this._endPointURL(),void 0,{headers:this.headers}),this.setupConnection()})}}disconnect(e,t){this.conn&&(this.conn.onclose=function(){},e?this.conn.close(e,t??""):this.conn.close(),this.conn=null,this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.reset())}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.disconnect(),e}log(e,t,n){this.logger(e,t,n)}connectionState(){switch(this.conn&&this.conn.readyState){case ps.connecting:return Ci.Connecting;case ps.open:return Ci.Open;case ps.closing:return Ci.Closing;default:return Ci.Closed}}isConnected(){return this.connectionState()===Ci.Open}channel(e,t={config:{}}){const n=new hc(`realtime:${e}`,t,this);return this.channels.push(n),n}push(e){const{topic:t,event:n,payload:i,ref:r}=e,o=()=>{this.encode(e,a=>{var l;(l=this.conn)===null||l===void 0||l.send(a)})};this.log("push",`${t} ${n} (${r})`,i),this.isConnected()?o():this.sendBuffer.push(o)}setAuth(e){this.accessToken=e,this.channels.forEach(t=>{e&&t.updateJoinPayload({access_token:e}),t.joinedOnce&&t._isJoined()&&t._push(an.access_token,{access_token:e})})}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(n=>n.topic===e&&(n._isJoined()||n._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t._joinRef()!==e._joinRef())}setupConnection(){this.conn&&(this.conn.binaryType="arraybuffer",this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_endPointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:ky}))}_onConnMessage(e){this.decode(e.data,t=>{let{topic:n,event:i,payload:r,ref:o}=t;(o&&o===this.pendingHeartbeatRef||i===(r==null?void 0:r.type))&&(this.pendingHeartbeatRef=null),this.log("receive",`${r.status||""} ${n} ${i} ${o&&"("+o+")"||""}`,r),this.channels.filter(a=>a._isMember(n)).forEach(a=>a._trigger(i,r,o)),this.stateChangeCallbacks.message.forEach(a=>a(t))})}_onConnOpen(){this.log("transport",`connected to ${this._endPointURL()}`),this._flushSendBuffer(),this.reconnectTimer.reset(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this._sendHeartbeat(),this.heartbeatIntervalMs),this.stateChangeCallbacks.open.forEach(e=>e())}_onConnClose(e){this.log("transport","close",e),this._triggerChanError(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(t=>t(e))}_onConnError(e){this.log("transport",e.message),this._triggerChanError(),this.stateChangeCallbacks.error.forEach(t=>t(e))}_triggerChanError(){this.channels.forEach(e=>e._trigger(an.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const n=e.match(/\?/)?"&":"?",i=new URLSearchParams(t);return`${e}${n}${i}`}_flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_sendHeartbeat(){var e;if(this.isConnected()){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),(e=this.conn)===null||e===void 0||e.close(zy,"hearbeat timeout");return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.setAuth(this.accessToken)}}}class Jy{constructor(e,t,n){this.binaryType="arraybuffer",this.onclose=()=>{},this.onerror=()=>{},this.onmessage=()=>{},this.onopen=()=>{},this.readyState=ps.connecting,this.send=()=>{},this.url=null,this.url=e,this.close=n.close}}class uc extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function It(s){return typeof s=="object"&&s!==null&&"__isStorageError"in s}class Zy extends uc{constructor(e,t){super(e),this.name="StorageApiError",this.status=t}toJSON(){return{name:this.name,message:this.message,status:this.status}}}class su extends uc{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}var Qy=function(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):i(h.value).then(a,l)}c((n=n.apply(s,e||[])).next())})};const Ed=s=>{let e;return s?e=s:typeof fetch>"u"?e=(...t)=>Es(async()=>{const{default:n}=await Promise.resolve().then(()=>Us);return{default:n}},void 0).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)},eM=()=>Qy(void 0,void 0,void 0,function*(){return typeof Response>"u"?(yield Es(()=>Promise.resolve().then(()=>Us),void 0)).Response:Response});var Ns=function(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):i(h.value).then(a,l)}c((n=n.apply(s,e||[])).next())})};const Ta=s=>s.msg||s.message||s.error_description||s.error||JSON.stringify(s),tM=(s,e)=>Ns(void 0,void 0,void 0,function*(){const t=yield eM();s instanceof t?s.json().then(n=>{e(new Zy(Ta(n),s.status||500))}).catch(n=>{e(new su(Ta(n),n))}):e(new su(Ta(s),s))}),nM=(s,e,t,n)=>{const i={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json"},e==null?void 0:e.headers),i.body=JSON.stringify(n),Object.assign(Object.assign({},i),t))};function No(s,e,t,n,i,r){return Ns(this,void 0,void 0,function*(){return new Promise((o,a)=>{s(t,nM(e,n,i,r)).then(l=>{if(!l.ok)throw l;return n!=null&&n.noResolveJson?l:l.json()}).then(l=>o(l)).catch(l=>tM(l,a))})})}function vl(s,e,t,n){return Ns(this,void 0,void 0,function*(){return No(s,"GET",e,t,n)})}function ei(s,e,t,n,i){return Ns(this,void 0,void 0,function*(){return No(s,"POST",e,n,i,t)})}function iM(s,e,t,n,i){return Ns(this,void 0,void 0,function*(){return No(s,"PUT",e,n,i,t)})}function Ad(s,e,t,n,i){return Ns(this,void 0,void 0,function*(){return No(s,"DELETE",e,n,i,t)})}var Kt=function(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):i(h.value).then(a,l)}c((n=n.apply(s,e||[])).next())})};const sM={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},ru={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class rM{constructor(e,t={},n,i){this.url=e,this.headers=t,this.bucketId=n,this.fetch=Ed(i)}uploadOrUpdate(e,t,n,i){return Kt(this,void 0,void 0,function*(){try{let r;const o=Object.assign(Object.assign({},ru),i),a=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(o.upsert)});typeof Blob<"u"&&n instanceof Blob?(r=new FormData,r.append("cacheControl",o.cacheControl),r.append("",n)):typeof FormData<"u"&&n instanceof FormData?(r=n,r.append("cacheControl",o.cacheControl)):(r=n,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType);const l=this._removeEmptyFolders(t),c=this._getFinalPath(l),h=yield this.fetch(`${this.url}/object/${c}`,Object.assign({method:e,body:r,headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{})),u=yield h.json();return h.ok?{data:{path:l,id:u.Id,fullPath:u.Key},error:null}:{data:null,error:u}}catch(r){if(It(r))return{data:null,error:r};throw r}})}upload(e,t,n){return Kt(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,n)})}uploadToSignedUrl(e,t,n,i){return Kt(this,void 0,void 0,function*(){const r=this._removeEmptyFolders(e),o=this._getFinalPath(r),a=new URL(this.url+`/object/upload/sign/${o}`);a.searchParams.set("token",t);try{let l;const c=Object.assign({upsert:ru.upsert},i),h=Object.assign(Object.assign({},this.headers),{"x-upsert":String(c.upsert)});typeof Blob<"u"&&n instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),l.append("",n)):typeof FormData<"u"&&n instanceof FormData?(l=n,l.append("cacheControl",c.cacheControl)):(l=n,h["cache-control"]=`max-age=${c.cacheControl}`,h["content-type"]=c.contentType);const u=yield this.fetch(a.toString(),{method:"PUT",body:l,headers:h}),d=yield u.json();return u.ok?{data:{path:r,fullPath:d.Key},error:null}:{data:null,error:d}}catch(l){if(It(l))return{data:null,error:l};throw l}})}createSignedUploadUrl(e,t){return Kt(this,void 0,void 0,function*(){try{let n=this._getFinalPath(e);const i=Object.assign({},this.headers);t!=null&&t.upsert&&(i["x-upsert"]="true");const r=yield ei(this.fetch,`${this.url}/object/upload/sign/${n}`,{},{headers:i}),o=new URL(this.url+r.url),a=o.searchParams.get("token");if(!a)throw new uc("No token returned by API");return{data:{signedUrl:o.toString(),path:e,token:a},error:null}}catch(n){if(It(n))return{data:null,error:n};throw n}})}update(e,t,n){return Kt(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,n)})}move(e,t,n){return Kt(this,void 0,void 0,function*(){try{return{data:yield ei(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n==null?void 0:n.destinationBucket},{headers:this.headers}),error:null}}catch(i){if(It(i))return{data:null,error:i};throw i}})}copy(e,t,n){return Kt(this,void 0,void 0,function*(){try{return{data:{path:(yield ei(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n==null?void 0:n.destinationBucket},{headers:this.headers})).Key},error:null}}catch(i){if(It(i))return{data:null,error:i};throw i}})}createSignedUrl(e,t,n){return Kt(this,void 0,void 0,function*(){try{let i=this._getFinalPath(e),r=yield ei(this.fetch,`${this.url}/object/sign/${i}`,Object.assign({expiresIn:t},n!=null&&n.transform?{transform:n.transform}:{}),{headers:this.headers});const o=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${o}`)},{data:r,error:null}}catch(i){if(It(i))return{data:null,error:i};throw i}})}createSignedUrls(e,t,n){return Kt(this,void 0,void 0,function*(){try{const i=yield ei(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),r=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return{data:i.map(o=>Object.assign(Object.assign({},o),{signedUrl:o.signedURL?encodeURI(`${this.url}${o.signedURL}${r}`):null})),error:null}}catch(i){if(It(i))return{data:null,error:i};throw i}})}download(e,t){return Kt(this,void 0,void 0,function*(){const i=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),o=r?`?${r}`:"";try{const a=this._getFinalPath(e);return{data:yield(yield vl(this.fetch,`${this.url}/${i}/${a}${o}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(a){if(It(a))return{data:null,error:a};throw a}})}getPublicUrl(e,t){const n=this._getFinalPath(e),i=[],r=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";r!==""&&i.push(r);const a=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",l=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});l!==""&&i.push(l);let c=i.join("&");return c!==""&&(c=`?${c}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}${c}`)}}}remove(e){return Kt(this,void 0,void 0,function*(){try{return{data:yield Ad(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(It(t))return{data:null,error:t};throw t}})}list(e,t,n){return Kt(this,void 0,void 0,function*(){try{const i=Object.assign(Object.assign(Object.assign({},sM),t),{prefix:e||""});return{data:yield ei(this.fetch,`${this.url}/object/list/${this.bucketId}`,i,{headers:this.headers},n),error:null}}catch(i){if(It(i))return{data:null,error:i};throw i}})}_getFinalPath(e){return`${this.bucketId}/${e}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const oM="2.6.0",aM={"X-Client-Info":`storage-js/${oM}`};var ns=function(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):i(h.value).then(a,l)}c((n=n.apply(s,e||[])).next())})};class lM{constructor(e,t={},n){this.url=e,this.headers=Object.assign(Object.assign({},aM),t),this.fetch=Ed(n)}listBuckets(){return ns(this,void 0,void 0,function*(){try{return{data:yield vl(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(It(e))return{data:null,error:e};throw e}})}getBucket(e){return ns(this,void 0,void 0,function*(){try{return{data:yield vl(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(It(t))return{data:null,error:t};throw t}})}createBucket(e,t={public:!1}){return ns(this,void 0,void 0,function*(){try{return{data:yield ei(this.fetch,`${this.url}/bucket`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(It(n))return{data:null,error:n};throw n}})}updateBucket(e,t){return ns(this,void 0,void 0,function*(){try{return{data:yield iM(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(It(n))return{data:null,error:n};throw n}})}emptyBucket(e){return ns(this,void 0,void 0,function*(){try{return{data:yield ei(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(It(t))return{data:null,error:t};throw t}})}deleteBucket(e){return ns(this,void 0,void 0,function*(){try{return{data:yield Ad(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(It(t))return{data:null,error:t};throw t}})}}class cM extends lM{constructor(e,t={},n){super(e,t,n)}from(e){return new rM(this.url,this.headers,e,this.fetch)}}const hM="2.45.1";let Ys="";typeof Deno<"u"?Ys="deno":typeof document<"u"?Ys="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Ys="react-native":Ys="node";const uM={"X-Client-Info":`supabase-js-${Ys}/${hM}`},dM={headers:uM},fM={schema:"public"},pM={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},mM={};var gM=function(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):i(h.value).then(a,l)}c((n=n.apply(s,e||[])).next())})};const _M=s=>{let e;return s?e=s:typeof fetch>"u"?e=dd:e=fetch,(...t)=>e(...t)},vM=()=>typeof Headers>"u"?fd:Headers,xM=(s,e,t)=>{const n=_M(t),i=vM();return(r,o)=>gM(void 0,void 0,void 0,function*(){var a;const l=(a=yield e())!==null&&a!==void 0?a:s;let c=new i(o==null?void 0:o.headers);return c.has("apikey")||c.set("apikey",s),c.has("Authorization")||c.set("Authorization",`Bearer ${l}`),n(r,Object.assign(Object.assign({},o),{headers:c}))})};var yM=function(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):i(h.value).then(a,l)}c((n=n.apply(s,e||[])).next())})};function MM(s){return s.replace(/\/$/,"")}function SM(s,e){const{db:t,auth:n,realtime:i,global:r}=s,{db:o,auth:a,realtime:l,global:c}=e,h={db:Object.assign(Object.assign({},o),t),auth:Object.assign(Object.assign({},a),n),realtime:Object.assign(Object.assign({},l),i),global:Object.assign(Object.assign({},c),r),accessToken:()=>yM(this,void 0,void 0,function*(){return""})};return s.accessToken?h.accessToken=s.accessToken:delete h.accessToken,h}const Rd="2.64.4",bM="http://localhost:9999",wM="supabase.auth.token",TM={"X-Client-Info":`gotrue-js/${Rd}`},ou=10,xl="X-Supabase-Api-Version",Cd={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}};function EM(s){return Math.round(Date.now()/1e3)+s}function AM(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(s){const e=Math.random()*16|0;return(s=="x"?e:e&3|8).toString(16)})}const on=()=>typeof document<"u",Mi={tested:!1,writable:!1},nr=()=>{if(!on())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Mi.tested)return Mi.writable;const s=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(s,s),globalThis.localStorage.removeItem(s),Mi.tested=!0,Mi.writable=!0}catch{Mi.tested=!0,Mi.writable=!1}return Mi.writable};function Ea(s){const e={},t=new URL(s);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((i,r)=>{e[r]=i})}catch{}return t.searchParams.forEach((n,i)=>{e[i]=n}),e}const Pd=s=>{let e;return s?e=s:typeof fetch>"u"?e=(...t)=>Es(async()=>{const{default:n}=await Promise.resolve().then(()=>Us);return{default:n}},void 0).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)},RM=s=>typeof s=="object"&&s!==null&&"status"in s&&"ok"in s&&"json"in s&&typeof s.json=="function",Id=async(s,e,t)=>{await s.setItem(e,JSON.stringify(t))},Kr=async(s,e)=>{const t=await s.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},Aa=async(s,e)=>{await s.removeItem(e)};function CM(s){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";let t="",n,i,r,o,a,l,c,h=0;for(s=s.replace("-","+").replace("_","/");h<s.length;)o=e.indexOf(s.charAt(h++)),a=e.indexOf(s.charAt(h++)),l=e.indexOf(s.charAt(h++)),c=e.indexOf(s.charAt(h++)),n=o<<2|a>>4,i=(a&15)<<4|l>>2,r=(l&3)<<6|c,t=t+String.fromCharCode(n),l!=64&&i!=0&&(t=t+String.fromCharCode(i)),c!=64&&r!=0&&(t=t+String.fromCharCode(r));return t}class Oo{constructor(){this.promise=new Oo.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Oo.promiseConstructor=Promise;function au(s){const e=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i,t=s.split(".");if(t.length!==3)throw new Error("JWT is not valid: not a JWT structure");if(!e.test(t[1]))throw new Error("JWT is not valid: payload is not in base64url format");const n=t[1];return JSON.parse(CM(n))}async function PM(s){return await new Promise(e=>{setTimeout(()=>e(null),s)})}function IM(s,e){return new Promise((n,i)=>{(async()=>{for(let r=0;r<1/0;r++)try{const o=await s(r);if(!e(r,null,o)){n(o);return}}catch(o){if(!e(r,o)){i(o);return}}})()})}function LM(s){return("0"+s.toString(16)).substr(-2)}function DM(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=t.length;let i="";for(let r=0;r<56;r++)i+=t.charAt(Math.floor(Math.random()*n));return i}return crypto.getRandomValues(e),Array.from(e,LM).join("")}async function UM(s){const t=new TextEncoder().encode(s),n=await crypto.subtle.digest("SHA-256",t),i=new Uint8Array(n);return Array.from(i).map(r=>String.fromCharCode(r)).join("")}function NM(s){return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function OM(s){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),s;const t=await UM(s);return NM(t)}async function is(s,e,t=!1){const n=DM();let i=n;t&&(i+="/PASSWORD_RECOVERY"),await Id(s,`${e}-code-verifier`,i);const r=await OM(n);return[r,n===r?"plain":"s256"]}const FM=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function BM(s){const e=s.headers.get(xl);if(!e||!e.match(FM))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}class dc extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=n}}function ke(s){return typeof s=="object"&&s!==null&&"__isAuthError"in s}class kM extends dc{constructor(e,t,n){super(e,t,n),this.name="AuthApiError",this.status=t,this.code=n}}function zM(s){return ke(s)&&s.name==="AuthApiError"}class Ld extends dc{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class Oi extends dc{constructor(e,t,n,i){super(e,n,i),this.name=t,this.status=n}}class Si extends Oi{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}class Ra extends Oi{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Yr extends Oi{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Jr extends Oi{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class lu extends Oi{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class yl extends Oi{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function Ca(s){return ke(s)&&s.name==="AuthRetryableFetchError"}class cu extends Oi{constructor(e,t,n){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=n}}var HM=function(s,e){var t={};for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&e.indexOf(n)<0&&(t[n]=s[n]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(s);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(s,n[i])&&(t[n[i]]=s[n[i]]);return t};const Ti=s=>s.msg||s.message||s.error_description||s.error||JSON.stringify(s),VM=[502,503,504];async function hu(s){var e;if(!RM(s))throw new yl(Ti(s),0);if(VM.includes(s.status))throw new yl(Ti(s),s.status);let t;try{t=await s.json()}catch(r){throw new Ld(Ti(r),r)}let n;const i=BM(s);if(i&&i.getTime()>=Cd["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?n=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(n=t.error_code),n){if(n==="weak_password")throw new cu(Ti(t),s.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[])}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((r,o)=>r&&typeof o=="string",!0))throw new cu(Ti(t),s.status,t.weak_password.reasons);throw new kM(Ti(t),s.status||500,n)}const GM=(s,e,t,n)=>{const i={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),i.body=JSON.stringify(n),Object.assign(Object.assign({},i),t))};async function Ve(s,e,t,n){var i;const r=Object.assign({},n==null?void 0:n.headers);r[xl]||(r[xl]=Cd["2024-01-01"].name),n!=null&&n.jwt&&(r.Authorization=`Bearer ${n.jwt}`);const o=(i=n==null?void 0:n.query)!==null&&i!==void 0?i:{};n!=null&&n.redirectTo&&(o.redirect_to=n.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await WM(s,e,t+a,{headers:r,noResolveJson:n==null?void 0:n.noResolveJson},{},n==null?void 0:n.body);return n!=null&&n.xform?n==null?void 0:n.xform(l):{data:Object.assign({},l),error:null}}async function WM(s,e,t,n,i,r){const o=GM(e,n,i,r);let a;try{a=await s(t,Object.assign({},o))}catch(l){throw console.error(l),new yl(Ti(l),0)}if(a.ok||await hu(a),n!=null&&n.noResolveJson)return a;try{return await a.json()}catch(l){await hu(l)}}function Qn(s){var e;let t=null;qM(s)&&(t=Object.assign({},s),s.expires_at||(t.expires_at=EM(s.expires_in)));const n=(e=s.user)!==null&&e!==void 0?e:s;return{data:{session:t,user:n},error:null}}function uu(s){const e=Qn(s);return!e.error&&s.weak_password&&typeof s.weak_password=="object"&&Array.isArray(s.weak_password.reasons)&&s.weak_password.reasons.length&&s.weak_password.message&&typeof s.weak_password.message=="string"&&s.weak_password.reasons.reduce((t,n)=>t&&typeof n=="string",!0)&&(e.data.weak_password=s.weak_password),e}function ii(s){var e;return{data:{user:(e=s.user)!==null&&e!==void 0?e:s},error:null}}function jM(s){return{data:s,error:null}}function XM(s){const{action_link:e,email_otp:t,hashed_token:n,redirect_to:i,verification_type:r}=s,o=HM(s,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:t,hashed_token:n,redirect_to:i,verification_type:r},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function $M(s){return s}function qM(s){return s.access_token&&s.refresh_token&&s.expires_in}var KM=function(s,e){var t={};for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&e.indexOf(n)<0&&(t[n]=s[n]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(s);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(s,n[i])&&(t[n[i]]=s[n[i]]);return t};class YM{constructor({url:e="",headers:t={},fetch:n}){this.url=e,this.headers=t,this.fetch=Pd(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t="global"){try{return await Ve(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(n){if(ke(n))return{data:null,error:n};throw n}}async inviteUserByEmail(e,t={}){try{return await Ve(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:ii})}catch(n){if(ke(n))return{data:{user:null},error:n};throw n}}async generateLink(e){try{const{options:t}=e,n=KM(e,["options"]),i=Object.assign(Object.assign({},n),t);return"newEmail"in n&&(i.new_email=n==null?void 0:n.newEmail,delete i.newEmail),await Ve(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:XM,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(ke(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await Ve(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:ii})}catch(t){if(ke(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,n,i,r,o,a,l;try{const c={nextPage:null,lastPage:0,total:0},h=await Ve(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&n!==void 0?n:"",per_page:(r=(i=e==null?void 0:e.perPage)===null||i===void 0?void 0:i.toString())!==null&&r!==void 0?r:""},xform:$M});if(h.error)throw h.error;const u=await h.json(),d=(o=h.headers.get("x-total-count"))!==null&&o!==void 0?o:0,f=(l=(a=h.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return f.length>0&&(f.forEach(g=>{const _=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),m=JSON.parse(g.split(";")[1].split("=")[1]);c[`${m}Page`]=_}),c.total=parseInt(d)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(ke(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){try{return await Ve(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:ii})}catch(t){if(ke(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){try{return await Ve(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:ii})}catch(n){if(ke(n))return{data:{user:null},error:n};throw n}}async deleteUser(e,t=!1){try{return await Ve(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:ii})}catch(n){if(ke(n))return{data:{user:null},error:n};throw n}}async _listFactors(e){try{const{data:t,error:n}=await Ve(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:i=>({data:{factors:i},error:null})});return{data:t,error:n}}catch(t){if(ke(t))return{data:null,error:t};throw t}}async _deleteFactor(e){try{return{data:await Ve(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(ke(t))return{data:null,error:t};throw t}}}const JM={getItem:s=>nr()?globalThis.localStorage.getItem(s):null,setItem:(s,e)=>{nr()&&globalThis.localStorage.setItem(s,e)},removeItem:s=>{nr()&&globalThis.localStorage.removeItem(s)}};function du(s={}){return{getItem:e=>s[e]||null,setItem:(e,t)=>{s[e]=t},removeItem:e=>{delete s[e]}}}function ZM(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}const ss={debug:!!(globalThis&&nr()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Dd extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class QM extends Dd{}async function eS(s,e,t){ss.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",s,e);const n=new globalThis.AbortController;return e>0&&setTimeout(()=>{n.abort(),ss.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",s)},e),await globalThis.navigator.locks.request(s,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async i=>{if(i){ss.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",s,i.name);try{return await t()}finally{ss.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",s,i.name)}}else{if(e===0)throw ss.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",s),new QM(`Acquiring an exclusive Navigator LockManager lock "${s}" immediately failed`);if(ss.debug)try{const r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}})}ZM();const tS={url:bM,storageKey:wM,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:TM,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1},$s=30*1e3,fu=3;async function pu(s,e,t){return await t()}class ur{constructor(e){var t,n;this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=ur.nextInstanceID,ur.nextInstanceID+=1,this.instanceID>0&&on()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");const i=Object.assign(Object.assign({},tS),e);if(this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.persistSession=i.persistSession,this.storageKey=i.storageKey,this.autoRefreshToken=i.autoRefreshToken,this.admin=new YM({url:i.url,headers:i.headers,fetch:i.fetch}),this.url=i.url,this.headers=i.headers,this.fetch=Pd(i.fetch),this.lock=i.lock||pu,this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,i.lock?this.lock=i.lock:on()&&(!((t=globalThis==null?void 0:globalThis.navigator)===null||t===void 0)&&t.locks)?this.lock=eS:this.lock=pu,this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?i.storage?this.storage=i.storage:nr()?this.storage=JM:(this.memoryStorage={},this.storage=du(this.memoryStorage)):(this.memoryStorage={},this.storage=du(this.memoryStorage)),on()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${Rd}) ${new Date().toISOString()}`,...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){try{const e=on()?await this._isPKCEFlow():!1;if(this._debug("#_initialize()","begin","is PKCE flow",e),e||this.detectSessionInUrl&&this._isImplicitGrantFlow()){const{data:t,error:n}=await this._getSessionFromURL(e);if(n)return this._debug("#_initialize()","error detecting session from URL",n),(n==null?void 0:n.message)==="Identity is already linked"||(n==null?void 0:n.message)==="Identity is already linked to another user"?{error:n}:(await this._removeSession(),{error:n});const{session:i,redirectType:r}=t;return this._debug("#_initialize()","detected session in URL",i,"redirect type",r),await this._saveSession(i),setTimeout(async()=>{r==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return ke(e)?{error:e}:{error:new Ld("Unexpected error during initialization",e)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,n,i;try{const r=await Ve(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.captchaToken}},xform:Qn}),{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(ke(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(e){var t,n,i;try{let r;if("email"in e){const{email:h,password:u,options:d}=e;let f=null,g=null;this.flowType==="pkce"&&([f,g]=await is(this.storage,this.storageKey)),r=await Ve(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d==null?void 0:d.emailRedirectTo,body:{email:h,password:u,data:(t=d==null?void 0:d.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},code_challenge:f,code_challenge_method:g},xform:Qn})}else if("phone"in e){const{phone:h,password:u,options:d}=e;r=await Ve(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:h,password:u,data:(n=d==null?void 0:d.data)!==null&&n!==void 0?n:{},channel:(i=d==null?void 0:d.channel)!==null&&i!==void 0?i:"sms",gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken}},xform:Qn})}else throw new Yr("You must provide either an email or phone number and a password");const{data:o,error:a}=r;if(a||!o)return{data:{user:null,session:null},error:a};const l=o.session,c=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(r){if(ke(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(e){try{let t;if("email"in e){const{email:r,password:o,options:a}=e;t=await Ve(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:uu})}else if("phone"in e){const{phone:r,password:o,options:a}=e;t=await Ve(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:uu})}else throw new Yr("You must provide either an email or phone number and a password");const{data:n,error:i}=t;return i?{data:{user:null,session:null},error:i}:!n||!n.session||!n.user?{data:{user:null,session:null},error:new Ra}:(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),{data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:i})}catch(t){if(ke(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOAuth(e){var t,n,i,r;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(n=e.options)===null||n===void 0?void 0:n.scopes,queryParams:(i=e.options)===null||i===void 0?void 0:i.queryParams,skipBrowserRedirect:(r=e.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async _exchangeCodeForSession(e){const t=await Kr(this.storage,`${this.storageKey}-code-verifier`),[n,i]=(t??"").split("/"),{data:r,error:o}=await Ve(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:n},xform:Qn});return await Aa(this.storage,`${this.storageKey}-code-verifier`),o?{data:{user:null,session:null,redirectType:null},error:o}:!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new Ra}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:i??null}),error:o})}async signInWithIdToken(e){try{const{options:t,provider:n,token:i,access_token:r,nonce:o}=e,a=await Ve(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:i,access_token:r,nonce:o,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:Qn}),{data:l,error:c}=a;return c?{data:{user:null,session:null},error:c}:!l||!l.session||!l.user?{data:{user:null,session:null},error:new Ra}:(l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),{data:l,error:c})}catch(t){if(ke(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOtp(e){var t,n,i,r,o;try{if("email"in e){const{email:a,options:l}=e;let c=null,h=null;this.flowType==="pkce"&&([c,h]=await is(this.storage,this.storageKey));const{error:u}=await Ve(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(n=l==null?void 0:l.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:h},redirectTo:l==null?void 0:l.emailRedirectTo});return{data:{user:null,session:null},error:u}}if("phone"in e){const{phone:a,options:l}=e,{data:c,error:h}=await Ve(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(i=l==null?void 0:l.data)!==null&&i!==void 0?i:{},create_user:(r=l==null?void 0:l.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(o=l==null?void 0:l.channel)!==null&&o!==void 0?o:"sms"}});return{data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:h}}throw new Yr("You must provide either an email or phone number.")}catch(a){if(ke(a))return{data:{user:null,session:null},error:a};throw a}}async verifyOtp(e){var t,n;try{let i,r;"options"in e&&(i=(t=e.options)===null||t===void 0?void 0:t.redirectTo,r=(n=e.options)===null||n===void 0?void 0:n.captchaToken);const{data:o,error:a}=await Ve(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:i,xform:Qn});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,c=o.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),{data:{user:c,session:l},error:null}}catch(i){if(ke(i))return{data:{user:null,session:null},error:i};throw i}}async signInWithSSO(e){var t,n,i;try{let r=null,o=null;return this.flowType==="pkce"&&([r,o]=await is(this.storage,this.storageKey)),await Ve(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(n=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&n!==void 0?n:void 0}),!((i=e==null?void 0:e.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:o}),headers:this.headers,xform:jM})}catch(r){if(ke(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new Si;const{error:i}=await Ve(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:i}})}catch(e){if(ke(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:n,type:i,options:r}=e,{error:o}=await Ve(this.fetch,"POST",t,{headers:this.headers,body:{email:n,type:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},redirectTo:r==null?void 0:r.emailRedirectTo});return{data:{user:null,session:null},error:o}}else if("phone"in e){const{phone:n,type:i,options:r}=e,{data:o,error:a}=await Ve(this.fetch,"POST",t,{headers:this.headers,body:{phone:n,type:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}}});return{data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:a}}throw new Yr("You must provide either an email or phone number and a type")}catch(t){if(ke(t))return{data:{user:null,session:null},error:t};throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),i=(async()=>(await n,await t()))();return this.pendingInLock.push((async()=>{try{await i}catch{}})()),i}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const n=t();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){const i=[...this.pendingInLock];await Promise.all(i),this.pendingInLock.splice(0,i.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await Kr(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const n=e.expires_at?e.expires_at<=Date.now()/1e3:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",e.expires_at),!n){if(this.storage.isServer){let o=this.suppressGetSessionWarning;e=new Proxy(e,{get:(l,c,h)=>(!o&&c==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),o=!0,this.suppressGetSessionWarning=!0),Reflect.get(l,c,h))})}return{data:{session:e},error:null}}const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{session:null},error:r}:{data:{session:i},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(e){try{return e?await Ve(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:ii}):await this._useSession(async t=>{var n,i,r;const{data:o,error:a}=t;if(a)throw a;return!(!((n=o.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Si}:await Ve(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(i=o.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0,xform:ii})})}catch(t){if(ke(t))return{data:{user:null},error:t};throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async n=>{const{data:i,error:r}=n;if(r)throw r;if(!i.session)throw new Si;const o=i.session;let a=null,l=null;this.flowType==="pkce"&&e.email!=null&&([a,l]=await is(this.storage,this.storageKey));const{data:c,error:h}=await Ve(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:a,code_challenge_method:l}),jwt:o.access_token,xform:ii});if(h)throw h;return o.user=c.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),{data:{user:o.user},error:null}})}catch(n){if(ke(n))return{data:{user:null},error:n};throw n}}_decodeJWT(e){return au(e)}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new Si;const t=Date.now()/1e3;let n=t,i=!0,r=null;const o=au(e.access_token);if(o.exp&&(n=o.exp,i=n<=t),i){const{session:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return{data:{user:null,session:null},error:l};if(!a)return{data:{user:null,session:null},error:null};r=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)throw l;r={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:n-t,expires_at:n},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(t){if(ke(t))return{data:{session:null,user:null},error:t};throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var n;if(!e){const{data:o,error:a}=t;if(a)throw a;e=(n=o.session)!==null&&n!==void 0?n:void 0}if(!(e!=null&&e.refresh_token))throw new Si;const{session:i,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{user:null,session:null},error:r}:i?{data:{user:i.user,session:i},error:null}:{data:{user:null,session:null},error:null}})}catch(t){if(ke(t))return{data:{user:null,session:null},error:t};throw t}}async _getSessionFromURL(e){try{if(!on())throw new Jr("No browser detected.");if(this.flowType==="implicit"&&!this._isImplicitGrantFlow())throw new Jr("Not a valid implicit grant flow url.");if(this.flowType=="pkce"&&!e)throw new lu("Not a valid PKCE flow url.");const t=Ea(window.location.href);if(e){if(!t.code)throw new lu("No code detected.");const{data:b,error:x}=await this._exchangeCodeForSession(t.code);if(x)throw x;const y=new URL(window.location.href);return y.searchParams.delete("code"),window.history.replaceState(window.history.state,"",y.toString()),{data:{session:b.session,redirectType:null},error:null}}if(t.error||t.error_description||t.error_code)throw new Jr(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});const{provider_token:n,provider_refresh_token:i,access_token:r,refresh_token:o,expires_in:a,expires_at:l,token_type:c}=t;if(!r||!a||!o||!c)throw new Jr("No session defined in URL");const h=Math.round(Date.now()/1e3),u=parseInt(a);let d=h+u;l&&(d=parseInt(l));const f=d-h;f*1e3<=$s&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${f}s, should have been closer to ${u}s`);const g=d-u;h-g>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",g,d,h):h-g<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clok for skew",g,d,h);const{data:_,error:m}=await this._getUser(r);if(m)throw m;const p={provider_token:n,provider_refresh_token:i,access_token:r,expires_in:u,expires_at:d,refresh_token:o,token_type:c,user:_.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:p,redirectType:t.type},error:null}}catch(t){if(ke(t))return{data:{session:null,redirectType:null},error:t};throw t}}_isImplicitGrantFlow(){const e=Ea(window.location.href);return!!(on()&&(e.access_token||e.error_description))}async _isPKCEFlow(){const e=Ea(window.location.href),t=await Kr(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var n;const{data:i,error:r}=t;if(r)return{error:r};const o=(n=i.session)===null||n===void 0?void 0:n.access_token;if(o){const{error:a}=await this.admin.signOut(o,e);if(a&&!(zM(a)&&(a.status===404||a.status===401||a.status===403)))return{error:a}}return e!=="others"&&(await this._removeSession(),await Aa(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{error:null}})}onAuthStateChange(e){const t=AM(),n={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,n),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{var n,i;try{const{data:{session:r},error:o}=t;if(o)throw o;await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(r){await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",r),console.error(r)}})}async resetPasswordForEmail(e,t={}){let n=null,i=null;this.flowType==="pkce"&&([n,i]=await is(this.storage,this.storageKey,!0));try{return await Ve(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:i,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(r){if(ke(r))return{data:null,error:r};throw r}}async getUserIdentities(){var e;try{const{data:t,error:n}=await this.getUser();if(n)throw n;return{data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null}}catch(t){if(ke(t))return{data:null,error:t};throw t}}async linkIdentity(e){var t;try{const{data:n,error:i}=await this._useSession(async r=>{var o,a,l,c,h;const{data:u,error:d}=r;if(d)throw d;const f=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await Ve(this.fetch,"GET",f,{headers:this.headers,jwt:(h=(c=u.session)===null||c===void 0?void 0:c.access_token)!==null&&h!==void 0?h:void 0})});if(i)throw i;return on()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),{data:{provider:e.provider,url:n==null?void 0:n.url},error:null}}catch(n){if(ke(n))return{data:{provider:e.provider,url:null},error:n};throw n}}async unlinkIdentity(e){try{return await this._useSession(async t=>{var n,i;const{data:r,error:o}=t;if(o)throw o;return await Ve(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(i=(n=r.session)===null||n===void 0?void 0:n.access_token)!==null&&i!==void 0?i:void 0})})}catch(t){if(ke(t))return{data:null,error:t};throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const n=Date.now();return await IM(async i=>(i>0&&await PM(200*Math.pow(2,i-1)),this._debug(t,"refreshing attempt",i),await Ve(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Qn})),(i,r)=>{const o=200*Math.pow(2,i);return r&&Ca(r)&&Date.now()+o-n<$s})}catch(n){if(this._debug(t,"error",n),ke(n))return{data:{session:null,user:null},error:n};throw n}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const n=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",n),on()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n},error:null}}async _recoverAndRefresh(){var e;const t="#_recoverAndRefresh()";this._debug(t,"begin");try{const n=await Kr(this.storage,this.storageKey);if(this._debug(t,"session from storage",n),!this._isValidSession(n)){this._debug(t,"session is not valid"),n!==null&&await this._removeSession();return}const i=Math.round(Date.now()/1e3),r=((e=n.expires_at)!==null&&e!==void 0?e:1/0)<i+ou;if(this._debug(t,`session has${r?"":" not"} expired with margin of ${ou}s`),r){if(this.autoRefreshToken&&n.refresh_token){const{error:o}=await this._callRefreshToken(n.refresh_token);o&&(console.error(o),Ca(o)||(this._debug(t,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(t,"error",n),console.error(n);return}finally{this._debug(t,"end")}}async _callRefreshToken(e){var t,n;if(!e)throw new Si;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const i=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(i,"begin");try{this.refreshingDeferred=new Oo;const{data:r,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!r.session)throw new Si;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);const a={session:r.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(r){if(this._debug(i,"error",r),ke(r)){const o={session:null,error:r};return Ca(r)||(await this._removeSession(),await this._notifyAllSubscribers("SIGNED_OUT",null)),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(o),o}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(r),r}finally{this.refreshingDeferred=null,this._debug(i,"end")}}async _notifyAllSubscribers(e,t,n=!0){const i=`#_notifyAllSubscribers(${e})`;this._debug(i,"begin",t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});const r=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,t)}catch(l){r.push(l)}});if(await Promise.all(o),r.length>0){for(let a=0;a<r.length;a+=1)console.error(r[a]);throw r[0]}}finally{this._debug(i,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await Id(this.storage,this.storageKey,e)}async _removeSession(){this._debug("#_removeSession()"),await Aa(this.storage,this.storageKey)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&on()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),$s);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((n.expires_at*1e3-e)/$s);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${$s}ms, refresh threshold is ${fu} ticks`),i<=fu&&await this._callRefreshToken(n.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof Dd)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!on()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){const i=[`provider=${encodeURIComponent(t)}`];if(n!=null&&n.redirectTo&&i.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n!=null&&n.scopes&&i.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){const[r,o]=await is(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(o)}`});i.push(a.toString())}if(n!=null&&n.queryParams){const r=new URLSearchParams(n.queryParams);i.push(r.toString())}return n!=null&&n.skipBrowserRedirect&&i.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${e}?${i.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var n;const{data:i,error:r}=t;return r?{data:null,error:r}:await Ve(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token})})}catch(t){if(ke(t))return{data:null,error:t};throw t}}async _enroll(e){try{return await this._useSession(async t=>{var n,i;const{data:r,error:o}=t;if(o)return{data:null,error:o};const{data:a,error:l}=await Ve(this.fetch,"POST",`${this.url}/factors`,{body:{friendly_name:e.friendlyName,factor_type:e.factorType,issuer:e.issuer},headers:this.headers,jwt:(n=r==null?void 0:r.session)===null||n===void 0?void 0:n.access_token});return l?{data:null,error:l}:(!((i=a==null?void 0:a.totp)===null||i===void 0)&&i.qr_code&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),{data:a,error:null})})}catch(t){if(ke(t))return{data:null,error:t};throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var n;const{data:i,error:r}=t;if(r)return{data:null,error:r};const{data:o,error:a}=await Ve(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token});return a?{data:null,error:a}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),{data:o,error:a})})}catch(t){if(ke(t))return{data:null,error:t};throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var n;const{data:i,error:r}=t;return r?{data:null,error:r}:await Ve(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token})})}catch(t){if(ke(t))return{data:null,error:t};throw t}})}async _challengeAndVerify(e){const{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?{data:null,error:n}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){const{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};const n=(e==null?void 0:e.factors)||[],i=n.filter(r=>r.factor_type==="totp"&&r.status==="verified");return{data:{all:n,totp:i},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async e=>{var t,n;const{data:{session:i},error:r}=e;if(r)return{data:null,error:r};if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const o=this._decodeJWT(i.access_token);let a=null;o.aal&&(a=o.aal);let l=a;((n=(t=i.user.factors)===null||t===void 0?void 0:t.filter(u=>u.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(l="aal2");const h=o.amr||[];return{data:{currentLevel:a,nextLevel:l,currentAuthenticationMethods:h},error:null}}))}}ur.nextInstanceID=0;const nS=ur;class iS extends nS{constructor(e){super(e)}}var sS=function(s,e,t,n){function i(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{c(n.next(h))}catch(u){o(u)}}function l(h){try{c(n.throw(h))}catch(u){o(u)}}function c(h){h.done?r(h.value):i(h.value).then(a,l)}c((n=n.apply(s,e||[])).next())})};class rS{constructor(e,t,n){var i,r,o;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");const a=MM(e);this.realtimeUrl=`${a}/realtime/v1`.replace(/^http/i,"ws"),this.authUrl=`${a}/auth/v1`,this.storageUrl=`${a}/storage/v1`,this.functionsUrl=`${a}/functions/v1`;const l=`sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`,c={db:fM,realtime:mM,auth:Object.assign(Object.assign({},pM),{storageKey:l}),global:dM},h=SM(n??{},c);this.storageKey=(i=h.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=h.global.headers)!==null&&r!==void 0?r:{},h.accessToken?(this.accessToken=h.accessToken,this.auth=new Proxy({},{get:(u,d)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(d)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((o=h.auth)!==null&&o!==void 0?o:{},this.headers,h.global.fetch),this.fetch=xM(t,this._getAccessToken.bind(this),h.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers},h.realtime)),this.rest=new Oy(`${a}/rest/v1`,{headers:this.headers,schema:h.db.schema,fetch:this.fetch}),h.accessToken||this._listenForAuthEvents()}get functions(){return new dy(this.functionsUrl,{headers:this.headers,customFetch:this.fetch})}get storage(){return new cM(this.storageUrl,this.headers,this.fetch)}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return sS(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();const{data:n}=yield this.auth.getSession();return(t=(e=n.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:null})}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:i,storageKey:r,flowType:o,lock:a,debug:l},c,h){var u;const d={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new iS({url:this.authUrl,headers:Object.assign(Object.assign({},d),c),storageKey:r,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:i,flowType:o,lock:a,debug:l,fetch:h,hasCustomAuthorizationHeader:(u="Authorization"in this.headers)!==null&&u!==void 0?u:!1})}_initRealtimeClient(e){return new Yy(this.realtimeUrl,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,n)=>{this._handleTokenChanged(t,"CLIENT",n==null?void 0:n.access_token)})}_handleTokenChanged(e,t,n){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==n?(this.realtime.setAuth(n??null),this.changedAccessToken=n):e==="SIGNED_OUT"&&(this.realtime.setAuth(this.supabaseKey),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}}const oS=(s,e,t)=>new rS(s,e,t),Ud={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class vr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const aS=new To(-1,1,1,-1,0,1);class lS extends pt{constructor(){super(),this.setAttribute("position",new ht([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ht([0,2,0,0,2,0],2))}}const cS=new lS;class Nd{constructor(e){this._mesh=new st(cS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,aS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class hS extends vr{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Ft?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=_o.clone(e.uniforms),this.material=new Ft({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Nd(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class mu extends vr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class uS extends vr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class dS{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Se);this._width=n.width,this._height=n.height,t=new pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:zn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new hS(Ud),this.copyPass.material.blending=kn,this.clock=new Zl}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}mu!==void 0&&(o instanceof mu?n=!0:o instanceof uS&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class fS extends vr{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new xe}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const pS={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new xe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Rs extends vr{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new Se(e.x,e.y):new Se(256,256),this.clearColor=new xe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new pn(r,o,{type:zn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new pn(r,o,{type:zn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new pn(r,o,{type:zn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=pS;this.highPassUniforms=_o.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ft({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Se(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Ud;this.copyUniforms=_o.clone(h.uniforms),this.blendMaterial=new Ft({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:ci,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new xe,this.oldClearAlpha=1,this.basic=new hn,this.fsQuad=new Nd(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Se(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Rs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Rs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ft({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Se(.5,.5)},direction:{value:new Se(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Ft({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Rs.BlurDirectionX=new Se(1,0);Rs.BlurDirectionY=new Se(0,1);const mS="https://olhgutdozhdvniefmltx.supabase.co",gS="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9saGd1dGRvemhkdm5pZWZtbHR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NzYwNTgsImV4cCI6MjAzODQ1MjA1OH0.RmahBsbb4QnO0xpTH-Bpe8f9vJFypcq6z5--e4s0MJI",fc=oS(mS,gS);let ti="",ms=1/0;const _S=new Yl,vS=_S.load("cihly.jpg");vS.colorSpace=yt;const gu=[{wallTexture:"wall.jpg",ceilingTexture:"wall.jpg",specialTextures:["wall-sign-1.jpg","wall-sign-2.jpg","wall-sign-3.jpg"]},{wallTexture:"wall-egypt.jpg",ceilingTexture:"wall-egypt.jpg",specialTextures:["wall-egypt-sign-1.jpg","wall-egypt-sign-2.jpg","wall-egypt-sign-3.jpg"]},{wallTexture:"wall-crystal.jpg",ceilingTexture:"wall-crystal.jpg",specialTextures:["wall-crystal-sign-1.jpg","wall-crystal-sign-2.jpg","wall-crystal-sign-3.jpg"]}];let Me,en,Js,Jt,Ze,pc,Od,oi=0,re=20,Cs=3;const dn=2.6,ae=2.4;let jt=[],li=100,Ii=100;const Ml=100,xS=.5;let mc=!1,gc=!1,_c=!1,vc=!1,Sl=0,Zn=new L,_u=0;const yS=1e3;let ir=null;const Fd=[];let sr,yo;const MS=10;let gs,ro;const bl=2;let Bn,Ei=[],Pi=[],_n=[],wl=0,oo=!1,ls="",xc=!1;var vu=setInterval(Hd,15e3),Bd;let rr,Tl;async function SS(){Me=new xv,en=new Nt(75,window.innerWidth/window.innerHeight,.1,1600),Js=new vv({alpha:!0}),Js.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(Js.domElement);try{await ab(),await lb(),await ob(),Fo(),Bo(),ES(),Sc(),ti=localStorage.getItem("playerName"),ti?document.getElementById("playerName").textContent=ti:Mb(),document.addEventListener("keydown",VS),document.addEventListener("keyup",GS),document.addEventListener("mousemove",WS,!1),document.addEventListener("click",jS,!1),document.addEventListener("mousedown",AS),window.addEventListener("resize",cb),document.getElementById("submitName").addEventListener("click",()=>{ti=document.getElementById("playerNameInput").value,localStorage.setItem("playerName",ti),document.getElementById("playerName").textContent=ti,Sb()}),document.getElementById("mazeSearchInput").addEventListener("input",Cb),document.querySelector("#scoreModal .close").addEventListener("click",Su),document.addEventListener("keydown",t=>{if(t.key==="c"||t.key==="C"){const n=document.activeElement;n.tagName==="INPUT"||n.tagName==="TEXTAREA"||(document.getElementById("scoreModal").style.display==="block"?Su():(bb(),Tb().then(Rb)))}}),sr=new dS(Js);const s=new fS(Me,en);sr.addPass(s);const e=new Rs(new Se(window.innerWidth,window.innerHeight),1.5,.4,.85);e.threshold=.2,e.strength=.6,e.radius=0,sr.addPass(e),Vd()}catch(s){console.error("Failed to load key model:",s)}}function bS(s){switch(s.toLowerCase()){case"ghost":wS();break;case"walk":TS();break;default:console.log("Neznámý příkaz:",s);break}}function wS(){xc=!0,console.log("Ghost mode activated!")}function TS(){xc=!1,console.log("Ghost mode deactivated!")}function ES(){Bn&&(Bn.position.set(.3,-.2,-.5),Bn.rotation.set(0,Math.PI/2,0),en.add(Bn))}function AS(s){s.button===0&&IS()}function RS(s){for(let t=Pi.length-1;t>=0;t--){const n=Pi[t];n.position.add(n.velocity.clone().multiplyScalar(s*40));var e={...Ze.position};e.y=1,n.position.distanceTo(e)<.5&&(li-=30,ko(),li<=0&&PS(),or(n.position,n.material.color.getHex()),Me.remove(n),Pi.splice(t,1));for(let i=0;i<jt.length;i++){const r=jt[i];if(n.position.distanceTo(r.position)<ae/2){or(n.position,n.material.color.getHex()),Me.remove(n),Pi.splice(t,1);break}}n.userData.lifeTime=(n.userData.lifeTime||0)+s,n.userData.lifeTime>5&&(Me.remove(n),Pi.splice(t,1))}}function CS(s,e){return new ox(s,new L().subVectors(e,s).normalize()).intersectObjects(jt).length===0}function PS(){Fo(document.getElementById("mazeInput").value),Bo(),oi=0,li=100,ko(),Mo(),document.getElementById("timeCount").textContent="0:00",Sc()}function IS(){if(Ii>=20){Ii-=20,Mc();const s=US(),e=new L;Bn.getWorldPosition(e),s.position.copy(e),s.position.y+=.3,NS(e);const t=new L;en.getWorldDirection(t),s.velocity=t.multiplyScalar(.25),Me.add(s),Ei.push(s)}else console.log("Not enough mana to cast fireball.")}function LS(s){Ii<Ml&&(Ii=Math.min(Ii+xS*(s*40),Ml),Mc())}function DS(s){li<100&&(li=Math.min(li+.05*(s*40),100),ko())}function US(){const s=new un,e=new pr(.2,32,32),t=new Xt({color:16729344,emissive:16729344,emissiveIntensity:2}),n=new st(e,t);s.add(n);const i=50,r=new Ui(new pt,new di({color:16737792,size:.05,blending:ci,transparent:!0})),o=new Float32Array(i*3);for(let a=0;a<i;a++)o[a*3]=(Math.random()-.5)*.45,o[a*3+1]=(Math.random()-.5)*.45,o[a*3+2]=(Math.random()-.5)*.45;return r.geometry.setAttribute("position",new at(o,3)),s.add(r),s.userData.animate=function(){const a=r.geometry.attributes.position.array;for(let l=0;l<a.length;l+=3)a[l]+=(Math.random()-.5)*.02,a[l+1]+=(Math.random()-.5)*.01,a[l+2]+=(Math.random()-.5)*.04;r.geometry.attributes.position.needsUpdate=!0},s}function NS(s){const e=new un,t=30,n=new Ui(new pt,new di({color:16753920,size:.02,blending:ci,transparent:!0})),i=new Float32Array(t*3);for(let r=0;r<t;r++)i[r*3]=(Math.random()-.5)*.2,i[r*3+1]=(Math.random()-.5)*.2,i[r*3+2]=(Math.random()-.5)*.2;return n.geometry.setAttribute("position",new at(i,3)),e.add(n),e.position.copy(s),e.position.y+=.3,Me.add(e),e.userData.animate=function(){const r=n.geometry.attributes.position.array;for(let o=0;o<r.length;o+=3)r[o]+=(Math.random()-.5)*.01,r[o+1]+=(Math.random()-.5)*.01,r[o+2]+=(Math.random()-.5)*.01;n.geometry.attributes.position.needsUpdate=!0},setTimeout(()=>{Me.remove(e)},500),e}function or(s,e=16729344){const t=new un,n=100,i=new Ui(new pt,new di({color:e,size:.1,blending:ci,transparent:!0})),r=new Float32Array(n*3),o=new Float32Array(n*3);for(let a=0;a<n;a++)r[a*3]=(Math.random()-.5)*.5,r[a*3+1]=(Math.random()-.5)*.5,r[a*3+2]=(Math.random()-.5)*.5,o[a*3]=(Math.random()-.5)*.2,o[a*3+1]=(Math.random()-.5)*.2,o[a*3+2]=(Math.random()-.5)*.2;return i.geometry.setAttribute("position",new at(r,3)),i.geometry.setAttribute("velocity",new at(o,3)),t.add(i),t.position.copy(s),Me.add(t),t.userData.animate=function(){const a=i.geometry.attributes.position.array,l=i.geometry.attributes.velocity.array;for(let c=0;c<a.length;c+=3)a[c]+=l[c],a[c+1]+=l[c+1],a[c+2]+=l[c+2],l[c]*=.95,l[c+1]*=.95,l[c+2]*=.95;i.geometry.attributes.position.needsUpdate=!0},setTimeout(()=>{Me.remove(t)},1e3),t}function Fo(s=""){const e=document.getElementById("bossHealthContainer");for(;e.firstChild;)e.removeChild(e.firstChild);for(_n=[],wl=0,_n=[],wl=0,rr&&Me.remove(rr),Me.fog=null,yo=new pb(Me,MS),jt=[];Me.children.length>0;)Me.remove(Me.children[0]);const t=yc(s);let n=new Ro(t);const i=Math.floor(n()*gu.length),r=gu[i],o=new Yl,a=o.load("cihly.jpg");a.colorSpace=yt;const l=o.load(r.wallTexture),c=o.load(r.ceilingTexture);l.colorSpace=yt,c.colorSpace=yt;const h=r.specialTextures.map(R=>o.load(R));h.forEach(R=>R.colorSpace=yt),re=Math.max(20,Math.min(50,20+Math.floor(n()*31))),Cs=Math.max(3,Math.min(10,3+Math.floor(n()*8)));const u=Math.max(1,Math.min(3,1+Math.floor(n()*3))),d=new hi(re*ae,re*ae),f=new Xt({color:9208960,map:a});a.wrapS=wn,a.wrapT=wn,a.repeat.set(re,re);const g=new st(d,f);g.rotation.x=-Math.PI/2,Me.add(g);const _=new hi(re*ae,re*ae);c.wrapS=wn,c.wrapT=wn,c.repeat.set(re,re);const m=new Xt({map:c,color:6511190}),p=new st(_,m);p.rotation.x=Math.PI/2,p.position.y=dn,Me.add(p),Jt=zS(re,re,t);const b=new ui(ae,dn,ae),x=new Xt({map:l});for(let R=0;R<re;R++)for(let M=0;M<re;M++)if(Jt[R][M]===1){const v=new st(b,x);v.position.set((R-re/2+.5)*ae,dn/2,(M-re/2+.5)*ae),Me.add(v),jt.push(v)}kS(n,h);const y=Math.floor(re*re*.02);for(let R=0;R<y;R++){let M,v;do M=Math.floor(n()*re),v=Math.floor(n()*re);while(Jt[M][v]!==0);Jt[M][v]=bl}for(let R=0;R<re;R++)for(let M=0;M<re;M++)if(Jt[R][M]===bl){const v=HS(l);v.position.set((R-re/2+.5)*ae,dn/2,(M-re/2+.5)*ae),Me.add(v),jt.push(v)}const C=[16711680,65280,255,16711935,16776960,65535];for(let R=0;R<u;R++){const M=xu(C[R]);M.userData.isTeleport=!0,M.userData.pairIndex=R,ao(M,n),Me.add(M);const v=xu(C[R]);v.userData.isTeleport=!0,v.userData.pairIndex=R,ao(v,n),Me.add(v)}OS(n),mb(jt,Jt,ae,re);const T=ro.clone();T.userData.isGoal=!0,ao(T,n),Me.add(T);const E=new jv(16777215,.2);Me.add(E),Tl=xb(),vb(),Me.fog=new Hl(0,.05),oi=0,Mo(),clearInterval(vu),clearTimeout(Bd),minimap.style.display="none",vu=setInterval(Hd,15e3),li=100,Ii=Ml,ko(),Mc(),console.log("Maze created"),console.log("lights "+yo.lights.length),console.log("bosses "+_n.length)}function yc(s){let e=0;for(let t=0;t<s.length;t++){const n=s.charCodeAt(t);e=(e<<5)-e+n,e=e&e}return Math.abs(e)}function OS(s){if(!gs){console.error("Key model not loaded");return}const e=_n.length,t=Cs-e;if(t<0){console.error("Počet klíčů přiřazených bossům přesahuje celkový počet klíčů.");return}for(let n=0;n<t;n++){const i=gs.clone();i.userData.isKey=!0,i.traverse(r=>{r.isMesh&&(r.material=new Xt({color:16766720,metalness:.6,roughness:.1}))}),i.rotation.y=Math.PI/4,ao(i,s),Me.add(i)}}function FS(s){Me.children.forEach(e=>{e.userData.isKey&&(e.rotation.y+=1*s)})}function BS(s){Me.children.forEach(e=>{if(e.userData.isGoal){e.rotation.y+=1*s;const t=.5,n=Date.now()*.001,i=Math.sin(n*t)*.1;e.position.y=.5+i}})}function kS(s,e){const t=Math.min(5,Math.floor(s()*5)+1),n=[];for(let i=0;i<t;i++){const r=Math.floor(s()*e.length),o=e[r];n.push(o)}for(let i=0;i<n.length;i++){const r=new ui(ae,dn,ae),o=new Xt({map:n[i]});let a=!1;for(;!a;){const l=Math.floor(s()*re),c=Math.floor(s()*re);if(Jt[l][c]===1){const h=new st(r,o);h.position.set((l-re/2+.5)*ae,dn/2,(c-re/2+.5)*ae),Me.add(h),jt.push(h),a=!0}}}}function zS(s,e,t){let n=new Ro(t),i=Array(e).fill().map(()=>Array(s).fill(1));function r(c,h){const u=[[0,-1],[1,0],[0,1],[-1,0]];u.sort(()=>n()-.5),i[h][c]=0;for(let[d,f]of u){let g=c+d*2,_=h+f*2;g>=0&&g<s&&_>=0&&_<e&&i[_][g]===1&&(i[h+f][c+d]=0,r(g,_))}}r(1,1);const o=.008+n()*(.02-.008),a=2+Math.floor(n()*3),l=.8;for(let c=1;c<re-a;c+=a){for(let h=1;h<re-a;h+=a)if(n()<o){for(let d=0;d<a;d++)for(let f=0;f<a;f++)i[c+d][h+f]=0;let u=[[0,-1],[1,0],[0,1],[-1,0]];for(let[d,f]of u){let g=h+d*a,_=c+f*a;g>=0&&g<re&&_>=0&&_<re&&(i[c+f*Math.floor(a/2)][h+d*Math.floor(a/2)]=0)}n()<l&&db(i,n)}document.getElementById("bossHealthContainer").style="display:block",_n.length===0&&(document.getElementById("bossHealthContainer").style="display:none;")}if(i[e-1][s-1]===1){let c=s-1,h=e-1;for(;i[h][c]===1;)i[h][c]=0,c>0&&i[h][c-1]===0?c--:h>0&&i[h-1][c]===0?h--:c>1?(i[h][c-1]=0,c-=2):h>1&&(i[h-1][c]=0,h-=2)}return i}function ao(s,e){let t=[];for(let i=0;i<re;i++)for(let r=0;r<re;r++)Jt[i][r]===0&&t.push({x:i,z:r});let n=.5;if(s.userData.isTeleport&&(n=1),t.length>0){let i=t[Math.floor(e()*t.length)];s.position.set((i.x-re/2+.5)*ae,n,(i.z-re/2+.5)*ae)}else console.error("Nepodařilo se najít volnou buňku pro umístění objektu.")}function HS(s){const e=new ui(ae,dn,ae),t=new Xt({map:s,emissive:16724736,emissiveIntensity:1.5}),n=new st(e,t),i=new Ui(new pt,new di({color:16724736,size:.2,blending:ci,transparent:!0})),r=0,o=new Float32Array(r*3);for(let a=0;a<r;a++)o[a*3]=(Math.random()-.5)*ae,o[a*3+1]=Math.random()*dn,o[a*3+2]=(Math.random()-.5)*ae;return i.geometry.setAttribute("position",new at(o,3)),n.add(i),n.userData.isBlockingWall=!0,n}function xu(s){const e=new Kl(.8,.1,32,64),t=new Xt({color:s,transparent:!0,opacity:.7}),n=new st(e,t),i=new pt,r=100,o=new Float32Array(r*3);for(let u=0;u<r;u++)o[u*3]=(Math.random()-.5)*n.scale.x*2,o[u*3+1]=(Math.random()-.5)*n.scale.y*2,o[u*3+2]=(Math.random()-.5)*n.scale.z*2;i.setAttribute("position",new at(o,3));const a=new di({color:s,size:.1,transparent:!0,opacity:.7}),l=new Ui(i,a);n.add(l);const c=new Zl;function h(){const u=c.getDelta();l.rotation.x+=.01*u,l.rotation.y+=.01*u,l.scale.x=1+.1*Math.sin(performance.now()*.005),l.scale.y=1+.1*Math.sin(performance.now()*.005),l.scale.z=1+.1*Math.sin(performance.now()*.005),requestAnimationFrame(h)}return h(),n}function Bo(){Ze=new un,en.position.set(0,1.6,0),Ze.add(en),Me.add(Ze);const s=yc(document.getElementById("mazeInput").value);let e=new Ro(s),t=[];for(let n=0;n<re;n++)for(let i=0;i<re;i++)Jt[n][i]===0&&t.push({x:n,z:i});if(t.length>0){let n=t[Math.floor(e()*t.length)];Ze.position.set((n.x-re/2+.5)*ae,0,(n.z-re/2+.5)*ae)}else console.error("Nepodařilo se najít volnou buňku pro umístění hráče.")}function VS(s){switch(s.code){case"KeyW":mc=!0;break;case"KeyS":gc=!0;break;case"KeyA":_c=!0;break;case"KeyD":vc=!0;break;case"KeyF":ir&&YS(ir);break}}function GS(s){switch(s.code){case"KeyW":mc=!1;break;case"KeyS":gc=!1;break;case"KeyA":_c=!1;break;case"KeyD":vc=!1;break}}function WS(s){if(document.pointerLockElement===document.body){const e=s.movementX||s.mozMovementX||s.webkitMovementX||0,t=s.movementY||s.mozMovementY||s.webkitMovementY||0;Sl-=e*.002,Ze.rotation.y=Sl;const n=en.rotation.x-t*.002;en.rotation.x=Math.max(Math.min(n,Math.PI/2),-Math.PI/2)}}function jS(){document.pointerLockElement!==document.body&&document.body.requestPointerLock()}function kd(){if(xc)return!1;const s=.3,e=.2;for(let t of jt){const n=Ze.position.x-t.position.x,i=Ze.position.z-t.position.z;if(Math.sqrt(n*n+i*i)<ae/2+s+e){const o=Math.atan2(i,n);return Ze.position.x=t.position.x+Math.cos(o)*(ae/2+s+e),Ze.position.z=t.position.z+Math.sin(o)*(ae/2+s+e),!0}}return!1}function ko(){const s=document.getElementById("playerHealthFill");s.style.width=`${li}%`}function Mc(){const s=document.getElementById("playerManaFill");s.style.width=`${Ii}%`}function XS(s){Zn.set(0,0,0);const e=6.5;mc&&(Zn.z-=e*s),gc&&(Zn.z+=e*s),_c&&(Zn.x-=e*s),vc&&(Zn.x+=e*s),Zn.applyAxisAngle(new L(0,1,0),Sl);const t=Ze.position.clone();Ze.position.add(Zn),kd()?Ze.position.copy(t):Zn.length()>0,Ze.position.x=Math.max(Math.min(Ze.position.x,re*ae/2),-re*ae/2),Ze.position.z=Math.max(Math.min(Ze.position.z,re*ae/2),-re*ae/2),zd()}let yu=!1;function zd(){performance.now(),ir=null,Me.children.forEach(s=>{if(s.userData.isKey||s.userData.isTeleport||s.userData.isGoal){const e=Ze.position.distanceTo(s.position);s.userData.isKey&&e<.7?(console.log("Sbírám klíč"),Me.remove(s),oi++,Mo(),$S()):s.userData.isTeleport&&e<1.5?(ir=s,JS()):s.userData.isGoal&&e<1.5&&(oi===Cs?(console.log("Dosaženo cíle"),qS(),eb(),Fo(document.getElementById("mazeInput").value),Bo(),oi=0,Mo()):yu||(console.log("Musíte nasbírat všechny kouzelné klíče, než dosáhnete cíle!"),KS(oi,Cs),yu=!0))}}),ir||nb()}function $S(){const s=document.getElementById("keyMessage");s.style.display="block",setTimeout(()=>{s.style.display="none"},2500)}function qS(){const s=document.getElementById("finishMessage");s.style.display="block",setTimeout(()=>{s.style.display="none"},2500)}function KS(s,e){const t=document.getElementById("goalMessage");t.textContent=`Musíte nasbírat všechny kouzelné klíče, než dosáhnete cíle! (${s}/${e})`,t.style.display="block",setTimeout(()=>{t.style.display="none"},4e3)}function YS(s){const e=performance.now();if(e-_u>yS){console.log("Teleportuji se");const t=Me.children.find(n=>n instanceof st&&n.userData.isTeleport&&n.userData.pairIndex===s.userData.pairIndex&&n!==s);if(t)for(Ze.position.set(t.position.x,0,t.position.z),_u=e;kd();)Ze.position.set((Math.random()-.5)*re*ae,0,(Math.random()-.5)*re*ae)}}function JS(){let s=document.getElementById("teleportPrompt");s||(s=document.createElement("div"),s.id="teleportPrompt",s.style.position="absolute",s.style.top="50%",s.style.left="50%",s.style.transform="translate(-50%, -50%)",s.style.color="white",s.style.fontSize="20px",document.body.appendChild(s)),s.textContent='Stiskněte "F" pro použití teleportu.',s.style.display="block"}async function ZS(){const s=document.getElementById("mazeInput").value;await QS(s),Fo(s),Bo(),oi=0,document.getElementById("timeCount").textContent="0:00",en.position.set(0,1.6,0),Sc()}async function QS(s){try{const{data:e,error:t}=await fc.from("maze_score").select("time_score").eq("playername",ti).eq("levelname",s).order("time_score",{ascending:!0}).limit(1);if(t)throw t;e.length>0?ms=e[0].time_score:ms=1/0}catch(e){console.error("Error fetching best time:",e.message),ms=1/0}}function Mo(){document.getElementById("keyCount").textContent=`${oi}/${Cs}`}function Sc(){pc=Date.now(),Od=setInterval(tb,1e3)}async function eb(){clearInterval(Od);const s=Math.floor((Date.now()-pc)/1e3);s<ms&&(ms=s,await wb(document.getElementById("mazeInput").value,ms))}function tb(){const s=Date.now()-pc,e=Math.floor(s/6e4),t=Math.floor(s%6e4/1e3);document.getElementById("timeCount").textContent=`${e}:${t<10?"0":""}${t}`}function nb(){const s=document.getElementById("teleportPrompt");s&&(s.style.display="none")}function ib(s,e,t,n,i){s.save(),s.translate(e,t),s.rotate(n),s.beginPath(),s.moveTo(-i/2,-i/2),s.lineTo(i/2,0),s.lineTo(-i/2,i/2),s.lineTo(0,0),s.closePath(),s.fill(),s.restore()}function sb(){const s=document.getElementById("minimap"),e=s.getContext("2d"),t=s.width/(re*ae);e.clearRect(0,0,s.width,s.height),e.fillStyle="#6e6e6e",e.fillRect(0,0,s.width,s.height);for(let o=0;o<re;o++)for(let a=0;a<re;a++)Jt[o][a]===1?(e.fillStyle="black",e.fillRect(o*ae*t,a*ae*t,ae*t,ae*t)):Jt[o][a]===bl&&(e.fillStyle="orange",e.fillRect(o*ae*t,a*ae*t,ae*t,ae*t));Me.children.forEach(o=>{o.userData.isTeleport&&(e.fillStyle=o.material.color.getStyle(),e.beginPath(),e.arc((o.position.x+re/2*ae)*t,(o.position.z+re/2*ae)*t,ae*t/3,0,2*Math.PI),e.fill())}),Me.children.forEach(o=>{o.userData.isKey&&(e.fillStyle="yellow",e.beginPath(),e.arc((o.position.x+re/2*ae)*t,(o.position.z+re/2*ae)*t,ae*t/4,0,2*Math.PI),e.fill())}),Me.children.forEach(o=>{o.userData.isGoal&&(e.fillStyle="cyan",e.beginPath(),e.arc((o.position.x+re/2*ae)*t,(o.position.z+re/2*ae)*t,ae*t/2,0,2*Math.PI),e.fill())}),_n.forEach(o=>{const a=(o.position.x+re/2*ae)*t,l=(o.position.z+re/2*ae)*t;e.strokeStyle="white",e.lineWidth=2,e.beginPath(),e.moveTo(a-5,l-5),e.lineTo(a+5,l+5),e.moveTo(a+5,l-5),e.lineTo(a-5,l+5),e.stroke()}),e.fillStyle="blue";const n=(Ze.position.x+re/2*ae)*t,i=(Ze.position.z+re/2*ae)*t,r=-Ze.rotation.y-Math.PI/2;ib(e,n,i,r,ae*t)}function rb(){return Math.max(5,Math.min(10,re/5))}function Hd(){sb();const s=document.getElementById("minimap");s.style.display="block",Bd=setTimeout(()=>{s.style.display="none"},rb()*1e3)}async function ob(){return new Promise((s,e)=>{new Co().load("Staff.glb",n=>{Bn=n.scene,Bn.traverse(i=>{i.isMesh&&i.name=="Staff_04_Circle011-Mesh_2"&&(i.material=new Xt({emissive:16729344,emissiveIntensity:1.5,metalness:1,roughness:.5}))}),Bn.scale.set(.1,.1,.1),s(Bn)},n=>{console.log(n.loaded/n.total*100+"% loaded")},n=>{console.error("Error loading staff model:",n),e(n)})})}function ab(){return new Promise((s,e)=>{console.log("Starting to load key model"),new Co().load("Key.glb",n=>{console.log("GLTF loaded successfully",n),gs=n.scene,gs.scale.set(.3,.3,.3),console.log("Key model processed"),s(gs)},n=>{console.log(n.loaded/n.total*100+"% loaded")},n=>{console.error("Error loading model:",n),e(n)})})}async function lb(){return new Promise((s,e)=>{console.log("Starting to load treasure model"),new Co().load("TreasureChest.glb",n=>{console.log("Treasure model loaded successfully",n),ro=n.scene,ro.scale.set(.5,.5,.5),console.log("Treasure model processed"),s(ro)},n=>{console.log(n.loaded/n.total*100+"% loaded")},n=>{console.error("Error loading treasure model:",n),e(n)})})}function cb(){en.aspect=window.innerWidth/window.innerHeight,en.updateProjectionMatrix(),Js.setSize(window.innerWidth,window.innerHeight),sr.setSize(window.innerWidth,window.innerHeight)}function hb(s){Me.children.forEach(e=>{e.userData.isTeleport&&(e.rotation.y+=1*s)})}class ub{constructor(e,t,n){this.id=t,this.maxHealth=Math.floor(n()*1500)+1e3,this.health=this.maxHealth,this.position=e,this.attackCooldown=n()*.5+.5;const i=[new xe(255),new xe(65280),new xe(16776960),new xe(16711935)];this.attackColor=i[Math.floor(n()*i.length)],this.model=null,this.healthBar=null,this.healthBarContainer=null,this.mixer=null,this.idleAction=null,this.attackAction=null,this.clock=new Zl,this.lastAttackTime=0,this.moveDirection=new L,this.rng=n,this.loadModel(),this.changeDirection(),this.createHealthUI()}loadModel(){new Co().load("Dragon.glb",t=>{this.model=t.scene,this.model.position.copy(this.position),this.model.scale.set(.5,.5,.5),Me.add(this.model),this.animations=t.animations,this.mixer=new rx(this.model),this.idleAction=this.mixer.clipAction(this.animations.find(n=>n.name==="CharacterArmature|Flying_Idle")),this.attackAction=this.mixer.clipAction(this.animations.find(n=>n.name==="CharacterArmature|Punch")),this.idleAction.play(),this.createHealthBar()})}createHealthBar(){const e=new hi(2,.2),t=new hn({color:0});this.healthBarContainer=new st(e,t),this.healthBarContainer.position.set(0,3,0),this.model.add(this.healthBarContainer);const n=new hi(2,.2),i=new hn({color:16711680});this.healthBar=new st(n,i),this.healthBar.position.set(-1,0,.01);const r=this.health/this.maxHealth;this.healthBar.scale.x=r,this.healthBar.position.x=-1+r,this.healthBarContainer.add(this.healthBar)}createHealthUI(){const e=document.getElementById("bossHealthContainer"),t=document.createElement("div");t.id=`boss-${this.id}`,t.className="boss-health",t.style.margin="10px",t.style.color="white",t.style.fontSize="18px",e.appendChild(t),this.updateHealthUI()}updateHealthUI(){const e=document.getElementById(`boss-${this.id}`);e&&(e.textContent=`Boss ${this.id}: ${Math.max(this.health,0)}/${this.maxHealth} HP`)}updateHealthBar(){if(this.healthBar){const e=this.health/this.maxHealth;this.healthBar.scale.x=e,this.healthBar.position.x=-1+e}this.updateHealthUI()}takeDamage(e){this.health-=e,this.health<=0&&this.die(),this.updateHealthBar()}die(){this.model&&Me.remove(this.model);const e=gs.clone();e.userData.isKey=!0,e.position.copy(this.position),Me.add(e),_n=_n.filter(n=>n!==this);const t=document.getElementById(`boss-${this.id}`);t&&t.remove()}attack(){const e=performance.now();e-this.lastAttackTime>=this.attackCooldown*1e3&&(this.health<this.maxHealth/2&&this.rng()<.3?this.specialAttack():this.performStandardAttack(),this.lastAttackTime=e)}performStandardAttack(){this.attackAction&&(this.attackAction.reset().play(),this.attackAction.clampWhenFinished=!0,this.attackAction.setLoop(Ou));const e=this.createMagicBall(this.position,Ze.position);Me.add(e),Pi.push(e)}specialAttack(){for(let e=0;e<3;e++){const t=(e-1)*Math.PI/8,n=new L().subVectors(Ze.position,this.position).normalize().applyAxisAngle(new L(0,1,0),t),i=this.createMagicBall(this.position,this.position.clone().add(n));Me.add(i),Pi.push(i)}}createMagicBall(e,t){const n=new pr(.2,32,32),i=new hn({color:this.attackColor}),r=new st(n,i);r.position.copy(e),r.position.y+=1;const o=new L().subVectors(t,e).normalize(),a=.2+this.rng()*.1;return r.velocity=o.multiplyScalar(a),r}changeDirection(){const e=Math.random()*2*Math.PI;this.moveDirection.set(Math.cos(e),0,Math.sin(e))}move(e){this.moveDirection.length()===0&&this.changeDirection();const n=this.moveDirection.clone().multiplyScalar(5*e),i=this.position.clone().add(n);this.checkCollision(i)?this.changeDirection():(this.position.add(n),this.model.position.copy(this.position))}checkCollision(e){for(let t of jt)if(e.distanceTo(t.position)<ae/2+.8)return!0;return!1}update(e){this.mixer&&this.mixer.update(e),this.model&&this.model.lookAt(Ze.position),CS(this.position,Ze.position)&&this.position.distanceTo(Ze.position)<20?this.attack():this.move(e)}}function db(s,e){let t=[];for(let n=0;n<re;n++)for(let i=0;i<re;i++)s[n][i]===0&&t.push({x:n,z:i});if(t.length>0){let n=t[Math.floor(e()*t.length)];const i=new L((n.x-re/2+.5)*ae,.5,(n.z-re/2+.5)*ae),r=new ub(i,++wl,e);_n.push(r),Cs++}else console.error("Nepodařilo se najít volnou buňku pro umístění bosse.")}function fb(s){_n.forEach(e=>e.update(s))}class pb{constructor(e,t,n=2){this.scene=e,this.maxVisibleLights=t,this.lights=[],this.tolerance=n}addLight(e){this.lights.push(e),this.scene.add(e),e.visible=!1}update(e,t){const n=new wo,i=new Ie;t.updateMatrixWorld(),i.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(i),this.lights.forEach(o=>{o.visible=!1});const r=this.lights.map(o=>({light:o,distance:o.position.distanceTo(e),inView:n.intersectsSphere(new xn(o.position,this.tolerance))})).filter(o=>o.inView).sort((o,a)=>o.distance-a.distance);for(let o=0;o<Math.min(this.maxVisibleLights,r.length);o++)r[o].light.visible=!0}}function mb(s,e,t,n){const i=new jl(.04,.1,.65,8),r=new Rv({color:9127187}),o=new Ro(yc(document.getElementById("mazeInput").value)),a=Array(n).fill().map(()=>Array(n).fill(!1));for(let l=0;l<n;l++)for(let c=0;c<n;c++)e[l][c]===0&&[{dx:1,dz:0},{dx:-1,dz:0},{dx:0,dz:1},{dx:0,dz:-1}].forEach(u=>{const d=l+u.dx,f=c+u.dz;if(d>=0&&d<n&&f>=0&&f<n&&e[d][f]===1&&!a[l][c]&&o()<.3){const g=new st(i,r);g.position.set((l-n/2+.5)*t+u.dx*t*.5,dn/2,(c-n/2+.5)*t+u.dz*t*.5),g.rotateZ(Math.PI/1),Me.add(g);const _=gb();_.position.copy(g.position).add(new L(0,.25,0)),Me.add(_);const m=new ad(16753920,1.5,t*4);m.position.set((l-n/2+.5)*t+u.dx*t*.18,dn/2+.25,(c-n/2+.5)*t+u.dz*t*.18),yo.addLight(m),Fd.push({torch:g,fire:_,light:m}),a[l][c]=!0}})}function gb(){const e=new pt,t=new Float32Array(12*3),n=new Float32Array(12*3),i=new Float32Array(12);for(let o=0;o<12;o++)t[o*3]=(Math.random()-.5)*.1,t[o*3+1]=Math.random()*.3,t[o*3+2]=(Math.random()-.5)*.1,n[o*3]=1.5,n[o*3+1]=.5+Math.random()*.5,n[o*3+2]=0,i[o]=.1+Math.random()*.1;e.setAttribute("position",new at(t,3)),e.setAttribute("color",new at(n,3)),e.setAttribute("size",new at(i,1));const r=new di({size:.1,vertexColors:!0,blending:ci,transparent:!0,depthWrite:!1});return new Ui(e,r)}function _b(s){Fd.forEach(({fire:e})=>{const t=e.geometry.attributes.position.array;for(let n=0;n<t.length;n+=3)t[n]+=(Math.random()-.5)*.01*(s*50),t[n+1]+=.01*(s*50)+Math.random()*.02*(s*50),t[n+2]+=(Math.random()-.5)*.01*(s*50),t[n+1]>.6&&(t[n]=(Math.random()-.5)*.1,t[n+1]=0,t[n+2]=(Math.random()-.5)*.1);e.geometry.attributes.position.needsUpdate=!0})}let lo=[];function vb(){lo.forEach(e=>Me.remove(e)),lo=[];const s=[new ql(.5),new $l(.5),new Xl(.5)];for(let e=0;e<100;e++){const t=s[Math.floor(Math.random()*s.length)],n=new Xt({color:Math.random()*16777215,metalness:.7,roughness:.3}),i=new st(t,n);i.position.set((Math.random()-.5)*re*ae*3,Math.random()*re*ae,(Math.random()-.5)*re*ae*3),i.rotation.set(Math.random()*2*Math.PI,Math.random()*2*Math.PI,Math.random()*2*Math.PI),i.userData.rotationSpeed={x:(Math.random()-.5)*.02,y:(Math.random()-.5)*.02,z:(Math.random()-.5)*.02},i.userData.floatSpeed=(Math.random()-.5)*.05,Me.add(i),lo.push(i)}}function xb(){const s=new pr(1500,32,32),e=new Ft({uniforms:{time:{value:0}},vertexShader:`
      varying vec3 vNormal;
      void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float time;
      varying vec3 vNormal;
      void main() {
        vec3 color = 0.5 + 0.5 * cos(time * 0.2 + vNormal.xyx + vec3(0,2,4));
        gl_FragColor = vec4(color, 0.3);
      }
    `,side:Bt,transparent:!0});return rr=new st(s,e),Me.add(rr),{material:e,object:rr}}function yb(s){for(let e=Ei.length-1;e>=0;e--){const t=Ei[e];t.position.add(t.velocity.clone().multiplyScalar(s*40)),t.userData.animate();for(let n of _n)if(n.model&&t.position.distanceTo(n.model.position)<1){or(t.position),n.takeDamage(100),Me.remove(t),Ei.splice(e,1);break}if(t.position.y<=0||t.position.y>=dn){console.log("Collision detected with floor or ceiling at",t.position),or(t.position),Me.remove(t),Ei.splice(e,1);continue}for(let n=jt.length-1;n>=0;n--){const i=jt[n];if(t.position.distanceTo(i.position)<ae/2){if(console.log("Collision detected with wall at",i.position),or(t.position),Me.remove(t),Ei.splice(e,1),i.userData.isBlockingWall){console.log("Destroying blocking wall at",i.position),Me.remove(i),jt.splice(n,1);const r=Math.round(i.position.x/ae+re/2-.5),o=Math.round(i.position.z/ae+re/2-.5);Jt[r][o]=0}break}}t.position.distanceTo(Ze.position)>re*ae&&(Me.remove(t),Ei.splice(e,1))}}let Mu=performance.now();function Vd(){const s=performance.now(),e=(s-Mu)/1e3;Mu=s,requestAnimationFrame(Vd),XS(e),zd(),FS(e),BS(e),hb(e),_b(e),yb(e),fb(e),RS(e),LS(e),DS(e),lo.forEach(t=>{t.rotation.x+=t.userData.rotationSpeed.x*(e*30),t.rotation.y+=t.userData.rotationSpeed.y*(e*50),t.rotation.z+=t.userData.rotationSpeed.z*(e*30),t.position.y+=t.userData.floatSpeed*(e*30),(t.position.y>re*ae||t.position.y<0)&&(t.userData.floatSpeed*=-1)}),Me.children.forEach(t=>{t.userData.animate&&t.userData.animate(e*30)}),Tl&&(Tl.material.uniforms.time.value+=e*1),yo.update(Ze.position,en),sr.render()}function Mb(){document.getElementById("nameModal").style.display="block"}function Sb(){document.getElementById("nameModal").style.display="none"}function bb(){document.getElementById("scoreModal").style.display="block"}function Su(){document.getElementById("scoreModal").style.display="none"}async function wb(s,e){try{const{data:t,error:n}=await fc.from("maze_score").upsert([{playername:ti,levelname:s,time_score:e}],{onConflict:["playername","levelname"]});if(n)throw n;console.log("Score submitted successfully")}catch(t){console.error("Error submitting score:",t.message)}}async function Tb(){try{const{data:s,error:e}=await fc.from("maze_score").select("*").order("levelname",{ascending:!0}).order("time_score",{ascending:!0});if(e)throw e;return s}catch(s){return console.error("Error fetching scores:",s.message),[]}}function Eb(s){const e=Math.floor(s/3600),t=Math.floor(s%3600/60),n=s%60;return`${e.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}`}function Ab(s){const e={};return s.forEach(t=>{e[t.levelname]||(e[t.levelname]=[]),e[t.levelname].push(t)}),Object.values(e).forEach(t=>{t.sort((n,i)=>n.time_score-i.time_score)}),e}function Rb(s){const e=document.querySelector("#scoreTable tbody");e.innerHTML="";const t=Ab(s);Object.entries(t).forEach(([n,i])=>{const o=e.insertRow().insertCell(0);o.colSpan=3,o.textContent=n,o.style.fontWeight="bold",o.style.backgroundColor="#34495e",i.forEach((a,l)=>{const c=e.insertRow();c.insertCell(0).textContent="",c.insertCell(1).textContent=a.playername,c.insertCell(2).textContent=Eb(a.time_score)})})}function Cb(){const s=document.getElementById("mazeSearchInput").value.toLowerCase(),e=document.querySelectorAll("#scoreTable tbody tr");let t="";e.forEach(n=>{n.cells[0].colSpan===3&&(t=n.cells[0].textContent.toLowerCase()),n.style.display=t.includes(s)?"":"none"})}function bu(){const s=document.getElementById("gameConsole");if(oo=!oo,oo){ls="";debugger;s.value="",s.style.display="block",s.focus()}else s.style.display="none",ls="",s.value=""}document.addEventListener("keydown",s=>{debugger;s.key===";"?bu():oo&&(s.key==="Enter"?(bS(ls),bu()):s.key==="Backspace"?ls=ls.slice(0,-1):ls+=s.key)});document.getElementById("generateMaze").addEventListener("click",ZS);SS();export{ax as g};
