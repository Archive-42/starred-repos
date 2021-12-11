# 2021-08-06_Mini-Review-Of-SQL-For-PostgreSQL-W-Node---Express-f34676f3802b

# Mini Review Of SQL For PostgreSQL W Node & Express

What is a Query?

---

### Mini Review Of SQL For PostgreSQL W Node & Express

### **What is a Query?**

![https://cdn-images-1.medium.com/max/800/0*LU-Sn7CDRHyY78nD.jpeg](https://cdn-images-1.medium.com/max/800/0*LU-Sn7CDRHyY78nD.jpeg)

### Using Select

**What is a Query?**

- `Query` : A question we're asking a database, aiming to get a response back.
- `psql -U postgres`
- Let’s us access the postgres server as the user ‘postgres’
- `U` stands for 'user'.
- `\q` is used to quit postgres at any time.

```
create table puppies (
  name VARCHAR(100),
  age_yrs NUMERIC(2,1),
  breed VARCHAR(100),
  weight_lbs INT,
  microchipped BOOLEAN
);
```

```
insert into puppies
values
('Cooper', 1, 'Miniature Schnauzer', 18, 'yes');
```

```
insert into puppies
values
('Indie', 0.5, 'Yorkshire Terrier', 13, 'yes'),
('Kota', 0.7, 'Australian Shepherd', 26, 'no'),
('Zoe', 0.8, 'Korean Jindo', 32, 'yes'),
('Charley', 1.5, 'Basset Hound', 25, 'no'),
('Ladybird', 0.6, 'Labradoodle', 20, 'yes'),
('Callie', 0.9, 'Corgi', 16, 'no'),
('Jaxson', 0.4, 'Beagle', 19, 'yes'),
('Leinni', 1, 'Miniature Schnauzer', 25, 'yes' ),
('Max', 1.6, 'German Shepherd', 65, 'no');
```

- SQL Data Types listed here:
- `varchar(n)` : variable length char, n represents the limit.
- `numeric(p, s)` : floating point number, with _p_ digits and _s_ number of places after the decimal point.
- `int` : 4 byte integer.
- `boolean` : regular boolean value.
- `SELECT Query` : Query used to get results back from a table.
- Syntax `SELECT [columns] FROM [table]`.
- You can use `SELECT *` to get all rows back in a given table.
- To select multiple columns you could use:

```
SELECT name , age_yrs , weight_lbs FROM puppies;
```

- It is recommended to perform queries with multi-line formatting because column selection can become very long.
- Also if you format it like this you can easily comment out certain columns with double dash.

[https://cdn-images-1.medium.com/max/800/0\*tj99LLWFAJYMoZIf](https://cdn-images-1.medium.com/max/800/0*tj99LLWFAJYMoZIf)

---

### USING WHERE

**Using SELECT and WHERE**

- We can filter our information from our SELECT queries by using WHERE.

**WHERE clause for a single value**

```
SELECT name, breed FROM puppies
  WHERE breed = 'Corgi';
```

- Note that the string must use single quotation marks because PostgreSQL will convert all names to lowercase unless DOUBLE quoted.

**WHERE clause for a list of values**

```
SELECT name, breed FROM puppies
  WHERE breed IN ('Corgi', 'Beagle', 'Yorkshire Terrier');
```

- Use the structure WHERE [col] IN (‘val’, ‘val2’…)

**WHERE clause for a range of values**

```
SELECT name, breed, age_yrs FROM puppies
  WHERE age_yrs BETWEEN 0 AND 0.6;
```

**ORDER BY**

- You can use `Order By` to get back your data in a specified way.

```
SELECT name, breed
FROM puppies
ORDER BY age_yrs DESC;
```

**LIMIT and OFFSET**

- You can limit the amount of rows returned by using the LIMIT keyword.

```
SELECT name, breed
FROM puppies
ORDER BY age_yrs
LIMIT 100 OFFSET 100;
```

- You can on the OFFSET keyword after LIMIT to retrieve the next 100 after the LIMIT clause.

**SQL operators**

![https://cdn-images-1.medium.com/max/800/0*u9zQKiyH8RiwHczk.png](https://cdn-images-1.medium.com/max/800/0*u9zQKiyH8RiwHczk.png)

```
SELECT name, breed FROM puppies
  WHERE breed NOT IN ('Miniature Schnauzer', 'Basset Hound', 'Labradoodle')
    AND breed NOT LIKE '%Shepherd';
```

- Example of a query with a WHERE clause using several logical operators.
- The % is a wildcard.

![https://cdn-images-1.medium.com/max/800/0*662qwyPcdX2fxy6Q.png](https://cdn-images-1.medium.com/max/800/0*662qwyPcdX2fxy6Q.png)

- You can also use mathematical operators in WHERE clauses.

```
SELECT name, breed, age_yrs FROM puppies
  WHERE age_yrs * 10 = 6;
```

![https://cdn-images-1.medium.com/max/800/0*FbpEHXEfQGBl9B2w.png](https://cdn-images-1.medium.com/max/800/0*FbpEHXEfQGBl9B2w.png)

- You can also use comparison operators.

```
SELECT name, breed, weight_lbs FROM puppies
  WHERE weight_lbs > 50;
```

---

### Using INSERT

- Used to add data into a table.

```
INSERT INTO table_name
VALUES
  (column1_value, colum2_value, column3_value);
```

```
INSERT INTO friends (first_name, last_name)
VALUES
('Rose', 'Tyler'),
('Martha', 'Jones'),
('Donna', 'Noble'),
('River', 'Song');
```

- Note the use of single quotation marks for string values.
- DEFAULT can be used in lieu of our SERIAL pseudo type.
- You can do multiple insert by first specifying the column names and the adding in the data wrapped in parenthesis seperated by a comma.

### Using INNER JOIN

- Relationships are key in RD’s.
- We create table associations through _foreign keys_ and _primary keys_.

```
SELECT * FROM puppies
INNER JOIN breeds ON (puppies.breed_id = breeds.id);
```

---

### Using Seed Files

**Writing And Running A Seed File In PSQL**

- Seeding is the act of populating a database with data.

**Creating a seed file**

- Start by making a seed file in your IDE with `.sql` file type.

```
CREATE TABLE pies (
  flavor VARCHAR(255) PRIMARY KEY,
  price FLOAT
);
```

```
INSERT INTO pies VALUES('Apple', 19.95);
INSERT INTO pies VALUES('Caramel Apple Crumble', 20.53);
INSERT INTO pies VALUES('Blueberry', 19.31);
INSERT INTO pies VALUES('Blackberry', 22.86);
INSERT INTO pies VALUES('Cherry', 22.32);
INSERT INTO pies VALUES('Peach', 20.45);
INSERT INTO pies VALUES('Raspberry', 20.99);
INSERT INTO pies VALUES('Mixed Berry', 21.45);
```

**Populating a database via < (“left caret”)**

- Syntax :`psql -d [database] < [path_to_file/file.sql]psql -d bakery < path_to_my_file/seed-data.sql`

**Populating the database via | (“pipe”)**

- Syntax :`cat [path_to_file/file.sql] | psql -d [database]cat path_to_my_file/seed-data.sql | psql -d postgres`

### Relational Database Design

### Creating a Schema For Relational Database Design

- Schemas allow us to easily visualize database tables and their relationships to one another.

**What is Relational Database Design?**

- **RDD** : Relational Database Design differs from other Databases because data is organized into tables and all types of data access are carried out via controlled transactions.
- Remember: Tables = Entities, Rows = Records, Columns = Fields.

**Stages of Relational Database Design**

1. `Define the purpose & entitites of the Relational DB.`

- Why is the database being created?
- What problem is it solving?
- What is the data used for?

1. `Identify the Primary keys.`

- Identify the PK of each table.

1. `Establish Table Relationships.`

- There are theee types of relational database table relationships:

1. **One-To-One**

- One record in a table is associated with only one record in another table.
- The least common type of table relationship.

1. **One-To-Many**

- Each record in a table is associated with multiple records in another table.

1. **Many-To-Many**

- Multiple records in one table are associated with multiple records in another table.
- Usually we would create a third table for this relationship called a `join table`

1. `Apply Normalization Rules.`

- `Normalization` : Process of optimizing the database structure so that redundancy and confusion are eliminated.
- Rules are called ‘normal forms’

1. First normal form.

- Eliminate repeating groups in tables.
- Create sep. table for each set of related data.
- ID each set of related data with a primary key.

1. Second normal form.

- Create sep. tables for sets of values that apply to multiple records.
- Related these tables with a foreign key.

1. Third normal form.

- Eliminate fields that do not depend on the table’s key.

1. Boyce-Codd normal form.
2. Fifth normal form.

- The first three are widely used in practice and the fourth/fifth less so.

---

### Transactions

- Using Transactions allow us to make changes to a SQL database in a consistent and durable way, and it is considered best practice to use them regularly.
- `Transaction` : Single unit of work, which can contain multiple operations, performed on a database.
- Bundles multiple steps into a single, all-or-nothing operation.

**Implicit vs. explicit transactions**

- Technically every SQL statement is a transaction.

```
INSERT INTO hobbits(name,purpose)
  VALUES('Frodo','Destroy the One Ring of power.');
```

- This statement would be a `implicit` transaction.
- On the flip side `explicit` transactions will allow us to create save points and roll back to whatever point in time we choose.

**PostgreSQL transactional commands**

- `BEGIN` : Initiates a transaction block. All Statements after a BEGIN command will be executed in a single transaction until COMMIT or ROLLBACK is called.

```
BEGIN;
  INSERT INTO hobbits(name,purpose)
    VALUES('Frodo','Destroy the One Ring of power.');
```

- `COMMIT` : Commits a current transaction, all changes made by this transaction become visible to others and are guaranteed to be durable if a crash occurs.

```
BEGIN;
  INSERT INTO hobbits(name,purpose)
    VALUES('Frodo','Destroy the One Ring of power.');
COMMIT;
```

- `ROLLBACK` : Rolls back current transaction and removes all updates made by the transaction.

```
BEGIN;
  INSERT INTO hobbits(name,purpose)
    VALUES('Frodo','Destroy the One Ring of power.');
ROLLBACK;
```

- `SAVEPOINT` : Establishes a new save point within the current transaction.

```
BEGIN;
  DELETE FROM fellowship
    WHERE age > 100;
  SAVEPOINT first_savepoint;
  DELETE FROM fellowship
    WHERE age > 80;
  DELETE FROM fellowship
    WHERE age >= 40;
  ROLLBACK TO first_savepoint;
COMMIT;
```

- `SET TRANSACTION` : Sets the characteristics of the current transaction.

```
BEGIN;
  SET TRANSACTION READ ONLY;
  ...
COMMIT;
```

**When to use transactions and why**

- Good to use when making any updates, insertions, or deletions to a database.
- Help us deal with crashes, failures, data consistency, and error handling.
- `Atomicity` is another feature that is a benefit of transactions.

**Transaction properties: ACID**

- A SQL transaction has four properties known collectively as `ACID` (Atomic, Consistent, Isolated, and Durable)
- `Atomicity` : All changes to data are performed as if they are a single operation.
- You can also refer to the A as ‘Abortability’
- I.E. if an app transfers funds from one account to another, the atomic nature of transactions will ensure that if a debt is successfully made, the credit will be properly transferred.
- `Consistency` : Data is in a consistent start when a transaction starts and ends.
- I.E. if a transfer is scheduled, this prop ensures total value of funds in both accounts is the same at the start and end of a transaction.
- `Isolation` : Intermediate state of a transaction is invisible to othe rtransactioned, they appear to be serialized.
- I.E. continuing our money transfer example, when a transfer occurs this prop ensures that transactions can see funds in one account or the other BUT NOT both NOR neither.
- `Durable` : After a transaction successfully completes, changes to data persists and are not undone even in system failure.
- I.E. this prop ensures our transaction will success and cannot be reversed in the event of a failure.

**Banking transaction example**

```
BEGIN;
  UPDATE accounts SET balance = balance - 100.00
      WHERE name = 'Alice';
  UPDATE branches SET balance = balance - 100.00
      WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Alice');
  UPDATE accounts SET balance = balance + 100.00
      WHERE name = 'Bob';
  UPDATE branches SET balance = balance + 100.00
      WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Bob');
COMMIT;
```

---

### Subqueries and JOINs

**Joins vs. SubqueriesWhat is a JOIN?**

- JOIN allows us to retrieve rows from multiple tables.

```
SELECT * FROM puppies
INNER JOIN breeds ON (puppies.breed_id = breeds.id);
```

- There are a few different types of JOIN operations:
- `Inner Join` : Returns results containing rows in the left table that match rows in the right table.
- `Left Join` : Returns a set of results containing all rows from the left table with the matching rows from the right table. If there is no match, the right side will have null values.
- `Right Join` : Returns a set of results containing all rows from the right table with the matching rows from the left table. If there is no match, the left side will have null values.
- `Full Outer Join` : Returns a set of results containing all rows from both the left and right tables, with matching rows from both sides where avail. If there is no match the missing side contains null values.
- `Self-Join` : Query in which a table is joined to itslef, useful for comparing values in a column of rows within the same table.

**What is a subquery?**

- A SELECT statement nested inside another SELECT statement.

```
postgres=# SELECT * FROM puppies;
 id |   name   | age_yrs | breed_id | weight_lbs | microchipped
----+----------+---------+----------+------------+--------------
  1 | Cooper   |     1.0 |        8 |         18 | t
  2 | Indie    |     0.5 |        9 |         13 | t
  3 | Kota     |     0.7 |        1 |         26 | f
  4 | Zoe      |     0.8 |        6 |         32 | t
  5 | Charley  |     1.5 |        2 |         25 | f
  6 | Ladybird |     0.6 |        7 |         20 | t
  7 | Callie   |     0.9 |        4 |         16 | f
  8 | Jaxson   |     0.4 |        3 |         19 | t
  9 | Leinni   |     1.0 |        8 |         25 | t
 10 | Max      |     1.6 |        5 |         65 | f
(10 rows)
```

```
SELECT
  puppies.name,
  age_yrs,
  breeds.name
FROM
  puppies
INNER JOIN
  breeds ON (breeds.id = puppies.breed_id)
WHERE
  age_yrs > (
    SELECT
      AVG (age_yrs)
    FROM
      puppies
  );
```

**Multiple-row subquery**

```
SELECT *
FROM friends
WHERE
  puppy_id IN (
    SELECT puppy_id
    FROM puppies
    WHERE
      age_yrs < 0.6
  );
```

- We can also use a JOIN operation instead of the WHERE clause like in the above example.

```
SELECT *
FROM friends
INNER JOIN puppies ON (puppies.puppy_id = friends.puppy_id)
WHERE
  puppies.age_yrs < 0.6;
```

**Should I use a JOIN or a subquery?**

- Joins are better when you want to combine rows from one or more tables based on a match condition.
- Subqueries work great when you’re only returning a single value.
- When returning multiple rows, you could go with either subQ’s or joins.

---

### Indexes and Performance Analysis

- `PostgreSQL Index` : Works similarly like an index in the back of a book, they provide special lookup tables to let us make faster database queries.
- The Syntax for creating index is as follows:

```
CREATE INDEX index_name ON table_name (column_name);
```

```
CREATE INDEX addresses_phone_index ON addresses (phone_number);
```

```
DROP INDEX addresses_phone_index;
```

**Types of indexes**

There are several types of indexes use in Postgres: B-tree, Hash, GiST, and GIN.

- `Single-Column Indexes` Uses only one table column.
- `CREATE INDEX addresses_phone_index ON addresses (phone_number);`
- `Multiple-Column Indexes` Uses more than one table column.
- `CREATE INDEX idx_addresses_city_post_code ON table_name (city_id, postal_code);`
- `Partial Indexes` Uses subset of a table defined by a conditional expression.
- `CREATE INDEX addresses_phone_index ON addresses (phone_number) WHERE (city_id = 2);`

**When to use an index**

- Overall DB indexes are known to enhance performance when performing queries, however there are certain situations where it is not recommended:
- When working with small tables.
- When table has large batch updates or insert operations.
- When working with columns that have many NULL values.
- When working with columns that are frequently manipulated.
- Using EXPLAIN and ANALYZE keywords can give us performance data of our queries.

```
EXPLAIN ANALYZE SELECT *
FROM tenk1 t1, tenk2 t2
WHERE t1.unique1 < 100 AND t1.unique2 = t2.unique2;
```

```
                                                            QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------
 Nested Loop  (cost=2.37..553.11 rows=106 width=488) (actual time=1.392..12.700 rows=100 loops=1)
   ->  Bitmap Heap Scan on tenk1 t1  (cost=2.37..232.35 rows=106 width=244) (actual time=0.878..2.367 rows=100 loops=1)
         Recheck Cond: (unique1 < 100)
         ->  Bitmap Index Scan on tenk1_unique1  (cost=0.00..2.37 rows=106 width=0) (actual time=0.546..0.546 rows=100 loops=1)
               Index Cond: (unique1 < 100)
   ->  Index Scan using tenk2_unique2 on tenk2 t2  (cost=0.00..3.01 rows=1 width=244) (actual time=0.067..0.078 rows=1 loops=100)
         Index Cond: (unique2 = t1.unique2)
 Total runtime: 14.452 ms
```

---

### Accessing Data from Node.js

**Node-Postgres And Prepared Statements**

- The **node-postgres** library is the library used for node apps to connect to postgres applications.

**Connecting**

- Use a POOL of client objects to connect to the database.

![https://cdn-images-1.medium.com/max/800/0*CVhxtep5CrAqP_rN.png](https://cdn-images-1.medium.com/max/800/0*CVhxtep5CrAqP_rN.png)

```
const { Pool } = require("pg");
```

```
const pool = new Pool({
  user: "application_user",
  password: "iy7qTEcZ",
});
```

```
const results = await pool.query(`
  SELECT id, name, age_yrs
  FROM puppies;
`);
```

```
console.log(results);
```

**Prepared Statement**

- Prepared Statements are SQL statements that parameters in them that you can substitute values.

```
in inside an array.
```

```
await pool.query(`
  INSERT INTO puppies (name, age_yrs, breed, weight_lbs, microchipped)
  VALUES ($1, $2, $3, $4, $5);
`, [name, age, breedName, weight, isMicrochipped]);
```

```
const { Pool } = require("pg");
```

```
const allPuppiesSql = `
  SELECT id, name, age_yrs, breed, weight_lbs, microchipped
  FROM puppies;
`;
```

```
const pool = new Pool({
  database: "«database name»",
});
```

```
async function selectAllPuppies() {
  const results = await pool.query(allPuppiesSql);
  console.log(results.rows);
  pool.end();
}
```

```
const id = Number.parseInt(process.argv[2]);
selectOnePuppy(id);
```

By [Bryan Guner](https://medium.com/@bryanguner) on [August 6, 2021](https://medium.com/p/f34676f3802b).

[Canonical link](https://medium.com/@bryanguner/mini-review-of-sql-for-postgresql-w-node-express-f34676f3802b)

Exported from [Medium](https://medium.com/) on August 10, 2021.
