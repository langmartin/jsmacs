function main (expr) {
  var current = elisp.global.main;
  while (true) {
    try {
      current = current();
    } catch (err) {
      throw err;
    }
  }
}

elisp.global = {
  "+" : function (k, env, args) {
    var result = 0;
    for (var ii = 0; ii < args.length; ii++) {
      result = result + evaluate(env, val);
    }
    return [k, env, result];
  }
};

elisp.global.main = function () {
  return this.function["+"].call(this, this.variable.foo, 2);
};
