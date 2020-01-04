const ProgressBar = require('progress');

module.exports = {
  make_bar: function(total, total_ticks = 100) {
    const tick_size = Math.round(total / total_ticks);
    const bar = new ProgressBar(':bar :percent :elapsed :ramMB', {
      total: total_ticks,
      complete: "=",
      incomplete: "-"
    });

    const original_tick = bar.tick.bind(bar);

    let count = 0;
    bar.tick = (options) => {
      if (++count >= tick_size) {
        original_tick(options);
        count = 0;
      }
    };

    return bar;
  }
};

