'use strict';

describe('Service: TeamFactory', function () {

  // load the service's module
  beforeEach(module('draktoversiktApp'));

  // instantiate service
  var TeamFactory;
  beforeEach(inject(function (_TeamFactory_) {
    TeamFactory = _TeamFactory_;
  }));

  it('should do something', function () {
    expect(!!TeamFactory).toBe(true);
  });

});
