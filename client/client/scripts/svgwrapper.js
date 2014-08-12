(function(jQuery){
  function svgWrapper(el) {
    this._svgEl = el;
    this.__proto__ = el;
    Object.defineProperty(this, "className", {
      get:  function(){ return this._svgEl.className.baseVal; },
      set: function(value){    this._svgEl.className.baseVal = value; }
    });
    Object.defineProperty(this, "width", {
      get:  function(){ return this._svgEl.width.baseVal.value; },
      set: function(value){    this._svgEl.width.baseVal.value = value; }
});
    Object.defineProperty(this, "height", {
      get:  function(){ return this._svgEl.height.baseVal.value; },
      set: function(value){    this._svgEl.height.baseVal.value = value; }
    });
    Object.defineProperty(this, "x", {
      get:  function(){ return this._svgEl.x.baseVal.value; },
      set: function(value){    this._svgEl.x.baseVal.value = value; }
    });
    Object.defineProperty(this, "y", {
      get:  function(){ return this._svgEl.y.baseVal.value; },
      set: function(value){    this._svgEl.y.baseVal.value = value; }
    });
    Object.defineProperty(this, "offsetWidth", {
      get:  function(){ return this._svgEl.width.baseVal.value; },
      set: function(value){    this._svgEl.width.baseVal.value = value; }
    });
    Object.defineProperty(this, "offsetHeight", {
      get:  function(){ return this._svgEl.height.baseVal.value; },
      set: function(value){    this._svgEl.height.baseVal.value = value; }
    });
  };

jQuery.fn.wrapSvg = function() {
  return this.map(function(i, el) {
   if (el.namespaceURI == "http://www.w3.org/2000/svg" && !('_svgEl' in el)) {
     return new svgWrapper(el);
   } else {
     return el;
    }
   });
 };
})(window.jQuery);
