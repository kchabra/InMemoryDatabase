# In-Memory Database with Transactions

## Description
This project is an in-memory key-value database with transactional support. It:
- Starts a new transaction (`begin_transaction`)
- Adds or updates key-value pairs in active transactions (`put`)
- Gets the value of a key, ignoring uncommitted changes (`get`)
- Commits changes to make them visible (`commit`)
- Reverts changes in the current transaction (`rollback`)

## How to Run
 Clone this repository:
   ```bash
   git clone https://github.com/kchabra/InMemoryDatabase.git
   cd InMemoryDatabase
   node DBMemory.js
   ```
## Suggestions for Future Improvements
- Add more functions such as delete(key)
- To make it a more comprehensive assignment, this could be turned into a web-dev assigment that requires a frontend as well and have it be a 100 point end of semester HW assignment

