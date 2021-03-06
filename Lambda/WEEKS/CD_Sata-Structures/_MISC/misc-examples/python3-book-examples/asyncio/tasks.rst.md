# Executing Tasks Concurrently

Tasks are one of the primary ways to interact with the event loop. Tasks wrap coroutines and track when they are complete. Tasks are subclasses of `Future`, so other coroutines can wait for them and each has a result that can be retrieved after the task completes.

## Starting a Task

To start a task, use `create_task()` to create a `Task` instance. The resulting task will run as part of the concurrent operations managed by the event loop as long as the loop is running and the coroutine does not return.

::: {.literalinclude caption="" start-after="#end_pymotw_header"} asyncio_create_task.py :::

This example waits for the task to return a result before the `main()` function exits.

```{.sourceCode .none}
$ python3 asyncio_create_task.py

creating task
waiting for <Task pending coro=<task_func() running at
asyncio_create_task.py:12>>
in task_func
task completed <Task finished coro=<task_func() done, defined at
asyncio_create_task.py:12> result='the result'>
return value: 'the result'
```

## Canceling a Task

By retaining the `Task` object returned from `create_task()`, it is possible to cancel the operation of the task before it completes.

::: {.literalinclude caption="" start-after="#end_pymotw_header"} asyncio_cancel_task.py :::

This example creates and then cancels a task before starting the event loop. The result is a `CancelledError` exception from `run_until_complete()`.

```{.sourceCode .none}
$ python3 asyncio_cancel_task.py

creating task
canceling task
canceled task <Task cancelling coro=<task_func() running at
asyncio_cancel_task.py:12>>
caught error from canceled task
```

If a task is canceled while it is waiting for another concurrent operation, the task is notified of its cancellation by having a `CancelledError` exception raised at the point where it is waiting.

::: {.literalinclude caption="" start-after="#end_pymotw_header"} asyncio_cancel_task2.py :::

Catching the exception provides an opportunity to clean up work already done, if necessary.

```{.sourceCode .none}
$ python3 asyncio_cancel_task2.py

creating task
in task_func, sleeping
in task_canceller
canceled the task
task_func was canceled
main() also sees task as canceled
```

## Creating Tasks from Coroutines

The `ensure_future()` function returns a `Task` tied to the execution of a coroutine. That `Task` instance can then be passed to other code, which can wait for it without knowing how the original coroutine was constructed or called.

::: {.literalinclude caption="" start-after="#end_pymotw_header"} asyncio_ensure_future.py :::

Note that the coroutine given to `ensure_future()` is not started until something uses `await` to allow it to be executed.

```{.sourceCode .none}
$ python3 asyncio_ensure_future.py

entering event loop
starter: creating task
starter: waiting for inner
inner: starting
inner: waiting for <Task pending coro=<wrapped() running at
asyncio_ensure_future.py:12>>
wrapped
inner: task returned 'result'
starter: inner returned
```
