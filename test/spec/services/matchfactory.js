'use strict';

describe('Service: MatchFactory', function () {

  // load the service's module
  beforeEach(module('draktoversiktApp'));

  // instantiate service
  var MatchFactory;
  beforeEach(inject(function (_MatchFactory_) {
    MatchFactory = _MatchFactory_;
  }));

  it('should do something', function () {
    expect(!!MatchFactory).toBe(true);
  });

});
