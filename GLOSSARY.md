# Todos

A single-context learning app: the user manages a personal list of todos entirely in the browser. Todos are added, edited, completed, and removed by hand — there is no AI, no backend, and no accounts.

## Language

**Todo**:
A single task the user wants to track, identified by a title and a completed flag.
_Avoid_: Task, item, entry

**Completed**:
A flag on a Todo that is true once the user has finished the task it describes. A Todo with `completed: false` has no special name — it is just a Todo.
_Avoid_: Done, active, finished
