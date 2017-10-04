import m from "./m.m.js"
import anime from './a.m.js'

import wifi from './w.svg'
import shield from './s.svg'
var svg = require('./a.svg');

var InputField = {
  oninit: function(vnode){
    vnode.state = {
      ssid: '',
      password: '',
      onClickListener: this.onClickListener,
      buttonLabel: 'Save Configuration',
      buttonClass: 'clickable',
      slabelClass: 'clickable',
      disabled: false
    };
  },
  view: function(vnode) {
    return(
      <div className="inputField">
      <div>
        <div className='first'><img src={wifi} className="icon" alt="wifi ssid" /></div>
        <input type="text"  name="ssid" id="ssid" 
          value={vnode.state.ssid} 
          onChange={this.onChangeListener} 
          placeholder="Enter Network SSID"
          className={`first ${vnode.state.slabelClass}`}
          onFocus={this.onFocusListener}
          disabled={vnode.state.disabled}/>
      </div>
      <div>
        <div className='second'><img src={shield} className="icon" alt="wifi password" /></div>
        <input type="password" name="password" id="password" 
          value={vnode.state.password} 
          onChange={this.onChangeListener} 
          placeholder="Enter Wifi Password"
          className={`second ${vnode.state.plabelClass}`}
          onFocus={this.onFocusListener}
          disabled={vnode.state.disabled}/>
      </div>
      <input type="button" 
          className={vnode.state.buttonClass}
          value={vnode.state.buttonLabel} 
          onClick={vnode.state.onClickListener}
          disabled={vnode.state.disabled}/>
      </div>
    );
  }
}

var Notify = {
  view: function(vnode) {
    console.log(vnode);
    return(
      <div className="notify">
        You are already connected to "{vnode.attrs.ssid}".
      </div>
    );
  }
}

var Logo = {
  view: function(vnode) {
    return(
      <div className="logo">
        {m.trust(svg)}
      </div>
    );
  }
}

var App = {  
  oninit: function(vnode){
    console.log("--oninit--");
    console.log(vnode);

    vnode.state = {
      connected: false,
      initializing: true,
      ssid:'janmir'
    };
  },

  oncreate: function(vnode) {
    console.log("--oncreate--");
    console.log(vnode);
    
    let progress = { loading: 0 };
    let el = document.querySelector('#counter');
    var load_animation = anime({
      targets: progress,
      loading: 100,
      round: 1,
      easing: 'linear',
      duration: 2000,
      update: function() {
        el.innerHTML = progress.loading + "%";
      },
      complete: function(anim) {
        vnode.state.initializing = false;
        m.redraw();
      }
    });
  },

  view: function(vnode) {
    console.log("--view--");
    console.log(vnode);
    
    if(vnode.state.initializing){
      return(
        <div className="app center">
          <Logo/>
          <div id="counter"></div>
        </div>
      );
    }else{
      if(vnode.state.connected){
        return(
          <div className="app center">
            <Logo/>
            <Notify ssid={vnode.state.ssid}/>
          </div>
        );
      }else{
        return(
          <div className="app center">
            <Logo/>
            <InputField/>
          </div>
        );
      }
    }
  }
}

m.mount(document.getElementById("root"), App);