class InMemoryDB {
    constructor() {
        this.mainState = {};
        this.transactionState = null;
        this.transactionActive = false;
    }

    get(key) {
        if (this.transactionActive) {
            if (key in this.transactionState) {
                return null; // Uncommitted changes are invisible
            }
        }
        return this.mainState[key] || null;
    }

    put(key, value) {
        if (!this.transactionActive) {
            throw new Error("No transaction is active. Use begin_transaction() first.");
        }
        this.transactionState[key] = value;
    }

    begin_transaction() {
        if (this.transactionActive) {
            throw new Error("A transaction is already active.");
        }
        this.transactionActive = true;
        this.transactionState = {};
    }

    commit() {
        if (!this.transactionActive) {
            throw new Error("No transaction to commit.");
        }
        Object.assign(this.mainState, this.transactionState);
        this.transactionState = null;
        this.transactionActive = false;
    }

    rollback() {
        if (!this.transactionActive) {
            throw new Error("No transaction to rollback.");
        }
        this.transactionState = null;
        this.transactionActive = false;
    }
}


// Testing the functionality

const db = new InMemoryDB();

console.log("Test 1: Get non-existent key:");
console.log(db.get("A")); 

console.log("\nTest 2: Put without transaction (should throw error):");
try {
    db.put("A", 5);
} catch (e) {
    console.error(e.message); 
}

console.log("\nTest 3: Start transaction and put value:");
db.begin_transaction();
db.put("A", 5);
console.log(db.get("A")); 

console.log("\nTest 4: Commit transaction:");
db.commit();
console.log(db.get("A")); 

console.log("\nTest 5: Rollback transaction:");
db.begin_transaction();
db.put("B", 10);
db.rollback();
console.log(db.get("B")); 

