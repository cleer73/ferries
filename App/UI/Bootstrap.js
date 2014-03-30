var ferryScheduleApp = angular.module('ferryScheduleApp', []);

var config = {
  currentRoute: {
    departs: 'baindridge',
    arrives: 'seattle'
  },
  terminals: {
    bainbridge:  '3',
    seattle:     '7',
    kingston:   '12',
    edmonds:     '8',
    clinton:    '14',
    mukilteo:    '5',
    bremerton:   '4'
  }
}

var Storage = {
  set: function (key, value) {
    key = this.name(key);
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  get: function (key) {
    key = this.name(key);
    value = localStorage.getItem(key);
    return JSON.parse(value);
  },
  name: function (key) {
    return [
      'default',
      key,
      config.currentRoute.departs,
      config.currentRoute.arrives
    ].join('_').toLowerCase();
  }
};
