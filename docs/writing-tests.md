<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Writing Tests](#writing-tests)
  - [Test Case Lifecycle: setUp() and tearDown()](#test-case-lifecycle-setup-and-teardown)
  - [Asynchronous Testing](#asynchronous-testing)
  - [Timeouts](#timeouts)
  - [Assertions](#assertions)
  - [Running Tests Manually](#running-tests-manually)
  - [Test Case Example](#test-case-example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Writing Tests

impTest looks for classes inherited from the `ImpUnitTestCase` and treats them as test cases.

Methods named as _test..._ are considered to be the test methods, or, simply _tests_.

The simplest test case looks like:

```squirrel
class MyTestCase extends ImpUnitTestCase {
  function testSomething() {
    this.assertTrue(true);
  }
}
```

### Test Case Lifecycle: setUp() and tearDown()

Each test case has __setUp()__ and __tearDown()__ methods for instantiating the environment and cleaning-up afterwards.

### Asynchronous Testing

Every test method (as well as __setUp()__ and __tearDown()__) can either be synchronous or asynchronous.

Method should return the instance of [__Promise__](https://github.com/electricimp/Promise) to notify that it needs to do some work asynchronously.

The resolution means test all test were successful, rejection denotes a failure.

For example:

```squirrel
function testSomethingAsyncronously() {
  return Promise(function (resolve, reject){
    resolve("'s all good, man!");
  });
}
```

### Timeouts

__timeout__ parameter on ImpUnitRunner instance sets the timeout after which the tests will fail. Async tests will be interrupted

### Assertions

The following assertions are available:

* `this.assertTrue(value, [message]);`
* `this.assertEqual(expected, actual, [message]);`
* `this.assertClose(expected, actual, maxDifference, [message]);`

### Running Tests Manually

Tests can be executed manually with human-readable output with the following bootstrapping procedure:

```squirrel
testRunner <- ImpTestRunner();
testRunner.timeout = 1 /* [seconds] */;
testRunner.readableOutput = true;
testRunner.stopOnFailure = true;
testRunner.run();
```

### Test Case Example

```squirrel
class TestCase1 extends ImpUnitTestCase {

  /**
   * (optional) Async version, can also be synchronous
   */
  function setUp() {
    return Promise(function (resolve, reject){
      resolve("we're ready");
    }.bindenv(this));
  }

  /**
   * Sync test method
   */
  function testSomethingSync() {
     this.assertTrue(true); // ok
     this.assertTrue(false); // fails
  }

  /**
   * Async test method
   */
  function testSomethingAsync() {
    return Promise(function (resolve, reject){

      // return in 2 seconds
      imp.wakeup(2 /* 2 seconds */, function () {
        resolve("something useful");
      }.bindenv(this));

    }.bindenv(this));
  }

  /**
   * (optional) Teardown method - cleans up after the test
   */
  function tearDown() {
  }

}
```