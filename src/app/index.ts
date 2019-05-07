// tslint:disable-next-line:no-import-side-effect
import '../public/js/canvas';
// tslint:disable-next-line:no-import-side-effect
import '../sass/app.scss';
import {Canvas} from '../public/js/canvas';

function init() {
    const canvas = document.querySelector("canvas");
    new Canvas(canvas);
}

init();