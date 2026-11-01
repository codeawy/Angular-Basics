# Todos

A single-context learning app: the user manages a personal list of todos entirely in the browser. Todos are added, edited, completed, and removed by hand — there is no AI, no backend, and no accounts.

Access is gated by a client-side login: a session must exist before the todo list is visible. Authentication is faked locally against a seeded demo account; there is no server.

## Language

**User**:
An account identified by its email address.
_Avoid_: Account, profile, customer

**Session**:
The signed-in state: proof that a User presented valid Credentials, persisting across page refreshes until logged out.
_Avoid_: Login (the act, not the state), token, auth

**Credentials**:
The email/password pair a User presents at login to establish a Session.
_Avoid_: Password (covers only half), login details

**Todo**:
A single task the user wants to track, identified by a title and a completed flag.
_Avoid_: Task, item, entry

**Completed**:
A flag on a Todo that is true once the user has finished the task it describes. A Todo with `completed: false` has no special name — it is just a Todo.
_Avoid_: Done, active, finished
