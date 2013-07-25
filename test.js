var assert = require('assert'),
    DIContainer = require('dic');

describe('DI container', function() {

  it('creates instances', function() {
    var dic = new DIContainer();
    function Foo() {}

    dic.add('foo', Foo);

    assert(dic.get('foo') instanceof Foo);
  });

  it('autowires dependencies', function() {
    var dic = new DIContainer();

    function Foo() {}

    Bar.requires = ['foo'];
    function Bar(foo) {
      assert(foo instanceof Foo);
    }

    dic.add('foo', Foo);
    dic.add('bar', Bar);

    assert(dic.get('bar') instanceof Bar);
  });

  it('passes arguments to the constructor', function() {
    var dic = new DIContainer();

    Foo.requires = ['bar'];
    function Foo(bar, arg) {
      assert(arg == 123);
    }

    function Bar(one, two) {
      assert(one == 321);
      assert(two == 123);
    }

    dic.add('foo', Foo, [123]);
    dic.add('bar', Bar, [321, 123]);

    assert(dic.get('foo') instanceof Foo);
    assert(dic.get('bar') instanceof Bar);
  });

});
