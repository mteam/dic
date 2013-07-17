function DIContainer() {
  this.factories = {};
  this.services = {};
}

DIContainer.prototype.add = function(name, cls, opts) {
  this.factories[name] = function() {
    var deps = cls.requires ? cls.requires.map(this.get, this) : [];
    var args = (opts && opts.args) || [];

    var ctor = function() {};
    ctor.prototype = cls.prototype;
    var instance = new ctor;
    cls.apply(instance, [].concat(deps, args));

    return instance;
  };
};

DIContainer.prototype.create = function(name) {
  var factory = this.factories[name];

  if (factory == null) {
    throw Error('No service with name ' + name + ' registered');
  }

  return factory.call(this);
};

DIContainer.prototype.get = function(name) {
  if (this.services[name] == null) {
    this.services[name] = this.create(name);
  }

  return this.services[name];
};

module.exports = DIContainer;
