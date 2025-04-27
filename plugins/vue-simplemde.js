import Vue from 'vue';
import SimpleMDE from 'vue-simplemde';
import 'simplemde/dist/simplemde.min.css';
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/edit/continuelist';
import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/selection/mark-selection';

Vue.component('SimpleMde', SimpleMDE);
Vue.component('CodeMirror', CodeMirror);
