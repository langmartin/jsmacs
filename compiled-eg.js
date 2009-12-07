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

elisp.global.main = function () {
  return this.function["+"].call(this, this.variable.foo, 2);
};
