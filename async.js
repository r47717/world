function sequence(funcs, value, callback) {
  let result = value;

  function executor(arr) {
    if (arr.length === 0) {
      callback(result);
      return;
    }
    const func = arr.shift();
    func(result, function(newVal) {
      result = newVal;
      executor(arr);
    });
  }

  executor(funcs.slice());
}

function all(funcs, values, callback) {
  const results = new Array(funcs.length);
  let done = 0;

  for (let i = 0; i < funcs.length; i++) {
    funcs[i](values[i], function(result) {
      results[i] = result;
      done += 1;
      if (done === funcs.length) {
        callback(results);
      }
    });
  }
}

function race(funcs, values, callback) {
  let done = false;

  for (let i = 0; i < funcs.length; i++) {
    funcs[i](values[i], function(result) {
      if (!done) {
        done = true;
        callback(result);
      }
    });
  }
}

// tests

if (require.main === module) {
  function f1(v, callback) {
    setTimeout(callback, 500, v + 1);
  }

  function f2(v, callback) {
    setTimeout(callback, 1000, v * 2);
  }

  function f3(v, callback) {
    setTimeout(callback, 50, v + 20);
  }

  sequence([f1, f2, f3], 10, function(val) {
    console.log('sequence result: ', val);
  });

  all([f1, f2, f3], [1, 1, 1], function(vals) {
    console.log('all result: ', vals);
  });

  race([f1, f2, f3], [1, 1, 1], function(val) {
    console.log('race result: ', val);
  });
}
