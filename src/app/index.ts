import '../sass/app.scss';
import {Canvas} from '../public/js/canvas';

function init() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    new Canvas(canvas);
}

init();
