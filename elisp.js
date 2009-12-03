(function () {
   function environment (env) {
     var frame = {};
     frame.__proto__ = env;
     return frame;
   }

   function atomp (obj) {
     return typeof obj != "object";
   }

   var syntax = {
     lambda: lambdabody,
     if: _if_,
     defmacro: defmacro,
     defun: defun,
     set: set
   };

   function lambda (expr) {
     return cons("lambda", expr);
   }

   function _if_ (env, expr) {
     return (evaluate(env, expr.car()))
       ? evaluate(env, expr.cadr())
       : evaluate(env, expr.caddr());
   }

   function defmacro (env, expr) {
     syntax[car(expr)] = evaluate(env, lambda(cdr(expr)));
     return unspecified;
   }

   function set (env, expr) {
     var name = evaluate(env, car(expr));
     env[name] = evaluate(env, cdr(expr));
     return unspecified;
   }

   function defun (env, expr) {
     evaluate(
       env,
       cons("set",
            cons(car(expr),
                 lambda(cdr(expr))))
     );
   }
     
   function evaluate (env, expr) {
     if (atomp(expr)) return expr;
     if (car(expr) == "lambda") return analyse(expr);
     if (lambdap(expr)) return analyse(expr);
     if (formp(expr)) {
       return evaluate(env, expand(env, expr));
     }
     else throw new TypeError("Invalid expression.");
   }

   function main (proc) {
     var env = environment({});
     while (proc) {
       proc = apply(proc, arguments);
     }
   }

})();
