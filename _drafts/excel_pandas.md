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