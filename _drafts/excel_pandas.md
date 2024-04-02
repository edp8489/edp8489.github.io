---
layout: post
title: Python/Pandas Tricks for Handling Excel Files
date: 2022-12-23
---

As I've mentioned before, I have a love/hate relationship with Excel. I acknowledge it's a convenient way to visualize/format/manage tabular data, but I <i>hate</i> using it for complex calculations. I've been using Python + Pandas to import and process fairly simple spreadsheet data for years, but have recently been trying to force myself to learn how to automate some of the more repetitive cut/paste/drag manual tasks.

The most common type of data I have to deal with is some form of 2D lookup using either `HLOOKUP` or `INDEX( MATCH ( ... ) )`. I know that once the data is actually imported, a Pandas MultiIndex is the perfect way to access the data. But how do you "stack" the columns without manually cut/pasting columns 2:n and then copying the first index column <i>n-1</i> times? Turns out the answer is via `pandas.melt( )`.

For example, say the data you're importing has some form of ID as the first column (primary index) and additional columns 

\* this is a contrived example. NY and NJ have graduated income tax rates, so the values presented are for a $100k salary. A more advanced example would result in either a 3-level MultiIndex or two separate tables.

|State|Income Tax|Sales Tax| 
|:---:|:---:|:---:|
|MA|5%|6.25%|
|NJ| |6.625%|
|NY| |4%|
|WA|0%|10%|


```python
df = df.melt(id_vars=['State'], var_name="TaxType", value_name="Rate (%)")
```

These types of lookups are also perfect for SQL syntax. Once imported into a Pandas DataFrame, it's easy to create a SQLite table that can either be saved to a file or run in memory.

```python
import sqlite3
from contextlib import closing
import pandas as pd

# specify whether database is saved to a file or kept in memory
# dbname = "some_file.db"
dbname = ":memory:"

# database operations
# automatically close connection when script ends
with closing(sqlite3.connect(dbname)) as connection:
  # cursor object is used to interact with database
  with closing(connection.cursor()) as cursor:
    # export DataFrame contents to sql table
    df.to_sql(name="Table1",con=connection)

    row = cursor.execute("SELECT * FROM Table1 WHERE (State = :state AND TaxType = :tax);",{"state":"NJ","tax":"sales"}).fetchone()
 
```

## Comparing datasets with unevenly spaced points
I recently had to try and correlate results between two separate finite element models of the same geometry. 
The reference model had a different mesh density than mine and was from an external customer. What I received was a
spreadsheet containing four columns: node coordinates (x and y) and node displacements in the x and y directions.

I would rather quit than impment a jumbled mess of Index(Match()) queries inside Excel. In theory I know this is what
SQL perfect for. In practice... well, it was time to learn how.

First, let's create some sample data sets that represent the format I described. The geometry is the surface of a parabaloid
over the range [0, 50). The result at each node (stress, displacement, etc...) is a random integer in the range [0, 1000).

```python
import pandas as pd
import numpy as np
import sqlite3

# create points along y = x**2 for two mesh densities with random noise
# along with junk data - random integer between 0-1000
# load each into a Pandas DataFrame
x1 = [xi + (np.random.random()/10) for xi in np.arange(0,50,0.5)]
y1 = np.power(x1,2)
data1 = [np.random.randint(1000) for i in np.arange(len(x1))]
t1_df = pd.DataFrame(data={"x1": x1, "y1":y1, "data1":data1})

x2 = [xii + (np.random.random()/10) for xii in np.arange(0,50,0.18)]
y2 = np.power(x2,2)
data2 = [np.random.randint(1000) for i in np.arange(len(x2))]
t2_df = pd.DataFrame(data={"x2": x2, "y2":y2, "data2":data2})
```

As you can see, the two datasets have vastly different lengths, unevenly spaced points, and no obvious overlap
between of node locations.

```bash

```

Now, let's set up our search parameters. We'll treat the first dataset as the reference points and search within a certain 
radius of each point for a match in the second dataset.

```python
# add search tolerance columns to table 1
search_tol = 0.03
t1_df["x_low"] = t1_df["x1"] - search_tol
t1_df["x_high"] = t1_df["x1"] + search_tol
t1_df["y_low"] = t1_df["y1"] - search_tol
t1_df["y_high"] = t1_df["y1"] + search_tol
```

This is where the fun begins. Create a new `sqlite` database in memory and load the two dataframes as tables. The `db_conn` object 
is the connection to the database; the `cursor` object is used to execute search queries.

```python
# create sqilte database in memory and load dataframes as tables
dbname = ":memory:"
db_conn = sqlite3.connect(dbname)
cursor = db_conn.cursor()

t1_df.to_sql(name="Table1",con=db_conn)
t2_df.to_sql(name="Table2",con=db_conn)
```

Our query performs an inner join of the two tables, returning the columns from both tables. Only the rows from Table2 whose 
x and y coordinates fall within the search radius are returned.

```python
SQL_QUERY = """SELECT * from Table1
INNER JOIN Table2 ON (
Table2.x2 BETWEEN Table1.x_low AND Table1.x_high
AND
Table2.y2 BETWEEN Table1.y_low AND Table1.y_high);
"""

query = cursor.execute(SQL_QUERY).fetchall()
results_df = pd.DataFrame(data=query)

# assign column headings to help decipher results
results_header = ["t1_index"] + [*t1_df.columns] + ["t2_index"] + [*t2_df.columns]
results_df.columns = results_header
```

We can calculate the percent difference between the two models with a single line.

```python
# add a column calculating the % difference between the two models
result_df["Percent Difference"] = 100*(result_df["data2"]/result_df["data1"] - 1)
result_df.head()
```