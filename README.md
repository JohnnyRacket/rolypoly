# RolyPoly

A pattern for handling rollbacks when committing to multiple data repositories. This repo has a basic Typescript microservice implementation.


## The Pattern

When you are comitting data to multiple data stores you need to ensure that your data writes are atomic. For this there are a few ways you can accomplish this task. This pattern and implementation focuses on storing information required to rollback data if something does go wrong.

## Implement this pattern:

The orchestrator has no knowledge of this service and only handles rollback-keys given to it by the services it interacts with. In turn those services talk to this service and store the information they need to roll-back any change and get a key back from that information. They hand this key back to the orchestrator and the orchestorator can later call a `rollback` endpoint on the service using that key if it needs to. When this endpoint is called the service will use that key to fetch the information it needs from the rollback service and perform the rollback.
