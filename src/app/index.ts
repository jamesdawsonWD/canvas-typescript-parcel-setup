import '../sass/app.scss';
// import {Canvas} from '../public/js/particles/canvas';
import { StyledMenu } from '../public/js/modules/styled-menu/canvas'
import '../public/assets/mountain-cave.svg';

// function importHTML(filename: string){
//     const link = document.createElement('link');
//     link.rel = 'import';
//     link.href = 'file.html';
//     //link.setAttribute('async', ''); // make it async!
//     // link.onload = function(e) {...};
//     // link.onerror = function(e) {...};
//     document.head.appendChild(link);
// }

// const s = new XMLSerializer();
// document.getElementsByClassName('content')[0].innerHTML =  s.serializeToString(svg);

function init() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    new StyledMenu(canvas);
}

init();
