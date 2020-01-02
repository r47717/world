const ProgressBar = require('progress');

module.exports = {
  make_bar: function(total, total_ticks = 100) {
    const tick_size = Math.round(total / total_ticks);
    const bar = new ProgressBar(':bar :percent :elapsed', {
      total: total_ticks,
      complete: "=",
      incomplete: "-"
    });

    const original_tick = bar.tick.bind(bar);

    let count = 0;
    bar.tick = () => {
      if (++count >= tick_size) {
        original_tick();
        count = 0;
      }
    };

    return bar;
  }
};

