import {TwingWebLoader} from '@noelelias/twing';

ready(()=>{
    console.log('start loader');
    //demo data
    const template = `
    shouldBeTemplate1[<strong>{% include 'template1.twing' %}</strong>]<br>
    shouldBeTemplate2[<strong>{% include 'template2.twing' %}</strong>]<br>
    shouldNotKnowTemplate3[<strong>{% include 'template3.twing' %}</strong>]<br>
    templateWithSub[<strong>{% include 'templateWithSub.twing' %}</strong>]<br>
    dom pong => ping[<strong>{{ pong|dom('pong.n1') }}</strong>]<br>
    dom pong => ping[<strong>{{ pong|dom('pongN2') }}</strong>]
    <testbtn>change</testbtn>
    `;
    const data = {pong:'the old pong'};
    const webLoader = (path:string)=>{
        return new Promise<string>((resolve)=>{
            switch(path){
                case 'template1.twing':
                    resolve('template1 loaded');
                    break;
                case 'template2.twing':
                    resolve('template2 loaded');
                    break;
                case 'templateWithSub.twing':
                    resolve('templateWithSub loaded [{% include "templateSub.twing" %}]');
                    break;
                case 'templateSub.twing':
                    resolve('sub template loaded');
                    break;
                default:
                    resolve('dont know this template');
            }
        });
    }
    let loader = TwingWebLoader.getNewInstance(webLoader,template,data);

    loader((loader)=>{
        var env = loader.domPreCompile();
        var res = env.createTemplate(template, 'main').render(data);

        require('incremental-dom').patch(document.querySelectorAll('body')[0], ()=>{
            let domTree = loader.domRender(res, document);
            domTree.pong.n1('this is pong.n1');
            domTree.pongN2('this is pongN2');
            (<any>window).domTree = domTree;
            addEvents();
        });
    });

    function addEvents(){
        document.querySelectorAll('testbtn')[0].addEventListener('click',()=>{
            (<any>window).domTree.pong.n1('clicked the button to change pong n1');
        });
    }

});

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}