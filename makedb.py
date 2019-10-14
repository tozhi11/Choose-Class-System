import sqlite3
import time
import os

conn = sqlite3.connect('choose-class-system.db')
c = conn.cursor()
print ("Opened database successfully")
c = conn.cursor()
c.execute('''CREATE TABLE PEOPLE
       (ID          CHAR(10) PRIMARY KEY     NOT NULL,
        PASSWORD    CHAR(50)                 NOT NULL,
        NAME        CHAR(50)                 NOT NULL,
        POSITION    INT                      NOT NULL,
        TELEPHONE   CHAR(50)                         ,
        COLLEGE     CHAR(50)                         ,
        YEAR        CHAR(10)                         ,
        COURSE      CHAR(50));''')

c.execute('''CREATE TABLE CLASS
        (CLASSID    INTEGER PRIMARY KEY     AUTOINCREMENT,
         CLASSNAME  CHAR(50)                 NOT NULL,
         CLASSTIME  CHAR(50)                 NOT NULL,
         ADDRESS    CHAR(50)                 NOT NULL,
         TEACHER    CHAR(50)                 NOT NULL,
         COMMENTS   CHAR(150)                         ,
         COUNT      INT                      NOT NULL,
         POINT      INT                      NOT NULL,
         SCORE      FLOAT                                                         
        );''')
        
c.execute('''CREATE TABLE PEOPLETOCLASS(
        ID          INTEGER   PRIMARY KEY   AUTOINCREMENT,
        PEOPLEID    CHAR(50)                NOT NULL,
        CLASSID     CHAR(50)                NOT NULL

);''')

print ("Table created successfully")
conn.commit()
conn.close()